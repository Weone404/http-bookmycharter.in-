#!/usr/bin/env node
/**
 * Site illustrations.
 *
 *   npm run images
 *
 * Reads the AI-generated originals in `assets-incoming/images/` (not
 * committed: 1.5–2.5 MB PNGs each) and writes web-sized JPEGs to
 * `public/images/`, plus `src/data/site-images.generated.ts` with each file's
 * real dimensions so `next/image` reserves the right space and nothing shifts.
 *
 * These are illustrations, not photographs of any aircraft offered for
 * charter. The footer says so, and none of them carries a registration,
 * livery or model name (checked by eye at full size before they were added;
 * one model label was painted out of group-turboprops).
 *
 * Every expected file must be present. A missing or extra file fails the run,
 * because a silently absent image is a broken card on the live site.
 */
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
const INCOMING = join(ROOT, 'assets-incoming/images');
const OUT_DIR = join(ROOT, 'public/images');
const OUT_TS = join(ROOT, 'src/data/site-images.generated.ts');

/** Longest useful display width for each slot, in CSS pixels x ~1.5. */
const WIDTH = {
  'home-hero-desktop': 1920,
  'home-hero-mobile': 1024,
  'og-background': 2000,
};
const DEFAULT_CARD_WIDTH = 1200; // service-* and group-* cards
const BAND_WIDTH = 2000; // band-*

/**
 * Published name, where it differs from the incoming file name. The Char Dham
 * images are published as "himalaya": the build forbids unaccounted mentions
 * of the sister brand's name in served HTML, and an image URL is one.
 */
const PUBLISHED_NAME = {
  'band-chardham': 'band-himalaya',
  'service-chardham': 'service-himalaya',
};
const published = (name) => PUBLISHED_NAME[name] ?? name;

const EXPECTED = [
  'home-hero-desktop',
  'home-hero-mobile',
  'service-private-jets',
  'service-helicopters',
  'service-chardham',
  'service-empty-legs',
  'service-corporate',
  'group-helicopters',
  'group-turboprops',
  'group-private-jets',
  'group-regional',
  'band-private-charter',
  'band-helicopter-charter',
  'band-chardham',
  'band-corporate',
  'band-aerial-flower-dropping',
  'band-empty-legs',
  'band-planning',
  'band-destinations',
  'band-company',
  'band-aircraft',
  'band-insights',
  'band-request',
  'og-background',
];

const found = new Map(
  (existsSync(INCOMING) ? readdirSync(INCOMING) : [])
    .filter((f) => ['.png', '.jpg', '.jpeg', '.webp'].includes(extname(f).toLowerCase()))
    .map((f) => [basename(f, extname(f)), join(INCOMING, f)]),
);
const problems = [];
for (const name of EXPECTED) if (!found.has(name)) problems.push(`missing ${name}.png`);
for (const name of found.keys())
  if (!EXPECTED.includes(name)) problems.push(`unexpected file ${name}`);
if (problems.length) {
  console.error(`images: nothing written:\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
const records = {};
let total = 0;
for (const name of EXPECTED) {
  const width = WIDTH[name] ?? (name.startsWith('band-') ? BAND_WIDTH : DEFAULT_CARD_WIDTH);
  const out = join(OUT_DIR, `${published(name)}.jpg`);
  const info = await sharp(found.get(name))
    .resize({ width, withoutEnlargement: true })
    .toColourspace('srgb')
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toFile(out);
  records[published(name)] = {
    src: `/images/${published(name)}.jpg`,
    width: info.width,
    height: info.height,
  };
  total += statSync(out).size;
  console.log(
    `images: ${name} -> ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`,
  );
}

writeFileSync(
  OUT_TS,
  `// GENERATED FILE — do not edit by hand. Run \`npm run images\`.
//
// Illustrations for the site's hero, cards and page bands. Not photographs of
// any aircraft offered for charter; no registrations, liveries or model names.

export interface SiteImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

export type SiteImageName =
${EXPECTED.map((n) => `  | '${published(n)}'`).join('\n')};

export const SITE_IMAGES: Readonly<Record<SiteImageName, SiteImage>> = ${JSON.stringify(records, null, 2)};
`,
);
console.log(
  `\nimages: ${EXPECTED.length} written, ${(total / 1048576).toFixed(1)} MB in public/images`,
);
