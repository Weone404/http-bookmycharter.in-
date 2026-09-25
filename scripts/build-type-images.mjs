#!/usr/bin/env node
/**
 * One illustration per aircraft type.
 *
 *   npm run images
 *
 * Reads `assets-incoming/aircraft-types/<slug>.png|jpg|webp` (AI-generated
 * illustrations of the type, made from docs/AIRCRAFT-IMAGE-PROMPTS.md) and
 * writes web-sized JPEGs to `public/images/types/<slug>.jpg`, plus
 * `src/data/type-images.generated.ts` with each file's real size.
 *
 * Optional per type: a type without a file keeps its class illustration, so
 * images can arrive a few at a time. A file whose name is not a known slug
 * fails the run, because it would silently never appear.
 *
 * These are illustrations, not photographs of an aircraft offered for
 * charter, and not /public/aircraft (reserved for credited Commons photos).
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
const INCOMING = join(ROOT, 'assets-incoming/aircraft-types');
const OUT_DIR = join(ROOT, 'public/images/types');
const OUT_TS = join(ROOT, 'src/data/type-images.generated.ts');

const generated = readFileSync(join(ROOT, 'src/data/aircraft.generated.ts'), 'utf8');
const SLUGS = new Set([...generated.matchAll(/"slug": "([^"]+)"/g)].map((m) => m[1]));

const files = existsSync(INCOMING)
  ? readdirSync(INCOMING).filter((f) =>
      ['.png', '.jpg', '.jpeg', '.webp'].includes(extname(f).toLowerCase()),
    )
  : [];
const unknown = files.map((f) => basename(f, extname(f))).filter((s) => !SLUGS.has(s));
if (unknown.length) {
  console.error(
    `type images: nothing written. Unknown file names (must be an aircraft slug):\n  - ${unknown.join('\n  - ')}`,
  );
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
const records = {};
for (const file of files.sort()) {
  const slug = basename(file, extname(file));
  const out = join(OUT_DIR, `${slug}.jpg`);
  const info = await sharp(join(INCOMING, file))
    .resize({ width: 1400, withoutEnlargement: true })
    .toColourspace('srgb')
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toFile(out);
  records[slug] = { src: `/images/types/${slug}.jpg`, width: info.width, height: info.height };
  console.log(
    `type images: ${slug} -> ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`,
  );
}

writeFileSync(
  OUT_TS,
  `// GENERATED FILE — do not edit by hand. Run \`npm run images\`.
//
// One illustration per aircraft type (${Object.keys(records).length} of ${SLUGS.size}). Illustrations of
// the type, not photographs of any aircraft offered for charter.

import type { SiteImage } from './site-images.generated';

export const TYPE_IMAGES: Readonly<Record<string, SiteImage>> = ${JSON.stringify(records, null, 2)};
`,
);
console.log(
  `\ntype images: ${Object.keys(records).length} of ${SLUGS.size} types have their own illustration`,
);
