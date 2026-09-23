#!/usr/bin/env node
/**
 * Aircraft photo ingestion.
 *
 *   npm run photos
 *
 * Reads `assets-incoming/aircraft-photos/credits.csv` and the image files
 * beside it, and produces:
 *
 *   public/aircraft/<slug>.jpg                   — resized, metadata stripped
 *   src/data/aircraft-photos.generated.ts        — one record per photo, with credit
 *
 * The rules this enforces are the reason it exists. It refuses to build rather
 * than warn, because every one of them is a legal or a truthfulness problem
 * that nobody notices until someone else does:
 *
 * - A photo is published only when its row says `status=confirmed`. The row is
 *   confirmed by a person who has opened the Commons page and read the licence,
 *   because that cannot be verified from here.
 * - The licence must be on an allow-list of licences that permit commercial
 *   use: CC0, public domain, CC BY and CC BY-SA. NonCommercial and NoDerivs
 *   licences are rejected — this is a site that sells charter.
 * - Every photo needs an author and a Commons file URL, because CC BY and
 *   CC BY-SA require attribution and the page renders it next to the image.
 * - One photo per variant, strictly. A slug is either photographed or it is
 *   not; there is no fallback to a sibling variant's photo, because a Citation
 *   XLS photo captioned "Citation XLS+" is a wrong statement about the aircraft.
 * - A source narrower than MIN_WIDTH is rejected. A 275px thumbnail is not
 *   usable at page size, and it is also the tell of an image lifted from a
 *   search engine rather than taken from its source.
 * - A file with no row, or a row naming a slug that is not in the fleet data,
 *   is an error — it means a name has drifted somewhere.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
const INCOMING = join(ROOT, 'assets-incoming/aircraft-photos');
const OUT_DIR = join(ROOT, 'public/aircraft');
const OUT_TS = join(ROOT, 'src/data/aircraft-photos.generated.ts');
const FLEET_TS = join(ROOT, 'src/data/aircraft.generated.ts');

const MIN_WIDTH = 1000;
const OUT_WIDTH = 1600;
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

/** Commercial use permitted. Names as Wikimedia Commons writes them. */
const LICENCES = {
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
  'Public domain': 'https://commons.wikimedia.org/wiki/Commons:Copyright_tags/Public_domain',
  'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
  'CC BY 2.5': 'https://creativecommons.org/licenses/by/2.5/',
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/',
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY-SA 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/',
  'CC BY-SA 2.5': 'https://creativecommons.org/licenses/by-sa/2.5/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
};

/**
 * Jurisdiction ports of CC BY / CC BY-SA 2.0–3.0 (e.g. "CC BY-SA 3.0 AU", common
 * on Australian airport photos) carry the same commercial-use terms as the
 * unported licence. Anything else — NC, ND, GFDL-only — stays rejected.
 */
function licenceUrl(licence) {
  if (licence in LICENCES) return LICENCES[licence];
  const port = /^CC (BY|BY-SA) (2\.0|2\.5|3\.0) ([A-Z]{2})$/.exec(licence);
  if (!port) return undefined;
  return `https://creativecommons.org/licenses/${port[1].toLowerCase()}/${port[2]}/${port[3].toLowerCase()}/`;
}

const errors = [];
const fail = (message) => errors.push(message);

// ------------------------------------------------------------------ fleet
const fleetSource = readFileSync(FLEET_TS, 'utf8');
const fleet = new Map(
  [...fleetSource.matchAll(/"slug": "([^"]+)",\s*"name": "([^"]+)"/g)].map((m) => [m[1], m[2]]),
);
if (fleet.size === 0) {
  console.error('photos: could not read any aircraft from aircraft.generated.ts');
  process.exit(1);
}

// -------------------------------------------------------------------- csv
/** RFC 4180: quoted fields may contain commas, newlines and doubled quotes. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      if (row.some((cell) => cell.trim() !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((cell) => cell.trim() !== '')) rows.push(row);
  return rows;
}

const csvPath = join(INCOMING, 'credits.csv');
if (!existsSync(csvPath)) {
  console.error(`photos: ${csvPath} is missing`);
  process.exit(1);
}
const [header, ...body] = parseCsv(readFileSync(csvPath, 'utf8'));
const col = Object.fromEntries(header.map((name, index) => [name.trim(), index]));
for (const required of ['slug', 'name', 'commons_file_url', 'author', 'licence', 'alt', 'status']) {
  if (!(required in col)) fail(`credits.csv has no "${required}" column`);
}
const get = (row, name) => (row[col[name]] ?? '').trim();

// ------------------------------------------------------------------ files
const files = new Map();
for (const file of existsSync(INCOMING) ? readdirSync(INCOMING) : []) {
  const ext = extname(file).toLowerCase();
  if (!IMAGE_EXT.has(ext)) continue;
  const slug = basename(file, extname(file));
  if (files.has(slug)) fail(`two image files for "${slug}" — keep one`);
  files.set(slug, join(INCOMING, file));
}

// ------------------------------------------------------------------- rows
const seen = new Set();
const confirmed = [];
for (const row of body) {
  const slug = get(row, 'slug');
  if (!slug) continue;
  if (seen.has(slug)) fail(`credits.csv lists "${slug}" twice`);
  seen.add(slug);
  if (!fleet.has(slug)) {
    fail(`credits.csv row "${slug}" is not an aircraft in the fleet data`);
    continue;
  }
  const status = get(row, 'status').toLowerCase();
  if (status !== 'confirmed') {
    if (files.has(slug)) {
      console.warn(
        `photos: ${slug} has a file but status is "${status || 'empty'}" — not published`,
      );
    }
    continue;
  }

  const url = get(row, 'commons_file_url');
  const author = get(row, 'author');
  const licence = get(row, 'licence');
  const alt = get(row, 'alt') || fleet.get(slug);
  const file = files.get(slug);

  if (!file)
    fail(
      `${slug}: confirmed, but no image file named ${slug}.jpg (or .png/.webp) in assets-incoming/aircraft-photos`,
    );
  if (!/^https:\/\/commons\.wikimedia\.org\/wiki\/File:.+/.test(url)) {
    fail(
      `${slug}: commons_file_url must be a https://commons.wikimedia.org/wiki/File:… page, got "${url}"`,
    );
  }
  if (!author) fail(`${slug}: author is empty — CC licences require attribution`);
  if (!licenceUrl(licence)) {
    fail(
      `${slug}: licence "${licence}" is not allowed. Allowed: ${Object.keys(LICENCES).join(', ')}, ` +
        'or a country port such as "CC BY-SA 3.0 AU"',
    );
  }
  if (file && author && licenceUrl(licence)) {
    confirmed.push({ slug, name: fleet.get(slug), url, author, licence, alt, file });
  }
}
for (const slug of files.keys()) {
  if (!seen.has(slug)) fail(`image file "${slug}" has no row in credits.csv`);
}

// ---------------------------------------------------------------- process
// Check every source before writing any output, so a failed run leaves
// public/aircraft exactly as it was.
for (const photo of confirmed) {
  const meta = await sharp(photo.file).metadata();
  const width = meta.orientation && meta.orientation >= 5 ? meta.height : meta.width;
  if (!width || width < MIN_WIDTH) {
    fail(`${photo.slug}: source is ${width ?? '?'}px wide; at least ${MIN_WIDTH}px is required`);
  }
}
if (errors.length > 0) {
  console.error(`\nphotos: ${errors.length} problem(s), nothing written:\n`);
  for (const message of errors) console.error(`  - ${message}`);
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
const records = [];
for (const photo of confirmed) {
  const outPath = join(OUT_DIR, `${photo.slug}.jpg`);
  // rotate() applies EXIF orientation before the metadata is stripped; sharp
  // drops EXIF (including any GPS position) unless asked to keep it.
  const info = await sharp(photo.file)
    .rotate()
    .resize({ width: OUT_WIDTH, withoutEnlargement: true })
    .toColourspace('srgb')
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outPath);
  records.push({
    slug: photo.slug,
    src: `/aircraft/${photo.slug}.jpg`,
    width: info.width,
    height: info.height,
    alt: photo.alt,
    author: photo.author,
    licence: photo.licence,
    licenceUrl: licenceUrl(photo.licence),
    sourceUrl: photo.url,
  });
  console.log(
    `photos: ${photo.slug} -> ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`,
  );
}

// Remove outputs for slugs no longer confirmed, so an unpublished photo is not
// still served from public/ just because a page stopped linking to it.
const keep = new Set(records.map((r) => `${r.slug}.jpg`));
for (const file of readdirSync(OUT_DIR)) {
  if (!keep.has(file)) {
    rmSync(join(OUT_DIR, file));
    console.log(`photos: removed stale public/aircraft/${file}`);
  }
}

records.sort((a, b) => a.slug.localeCompare(b.slug));
const ts = `// GENERATED FILE — do not edit by hand.
// Run \`npm run photos\` to regenerate from assets-incoming/aircraft-photos/credits.csv.
//
// ${records.length} of ${fleet.size} aircraft types have a confirmed photo.
// Every photo is a representative image of the TYPE, sourced from Wikimedia
// Commons under a licence that permits commercial use, and is shown with its
// credit. None of them is a photo of an aircraft offered for charter.

export interface AircraftPhotoRecord {
  readonly slug: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly author: string;
  readonly licence: string;
  readonly licenceUrl: string;
  /** The Wikimedia Commons file page. */
  readonly sourceUrl: string;
}

export const AIRCRAFT_PHOTOS: Readonly<Record<string, AircraftPhotoRecord>> = ${JSON.stringify(
  Object.fromEntries(records.map((r) => [r.slug, r])),
  null,
  2,
)};
`;
writeFileSync(OUT_TS, ts);
console.log(`\nphotos: ${records.length} of ${fleet.size} aircraft types have a confirmed photo.`);
const total = records.reduce((sum, r) => sum + statSync(join(ROOT, 'public', r.src)).size, 0);
console.log(`photos: ${(total / 1048576).toFixed(1)} MB served in public/aircraft`);
