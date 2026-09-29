#!/usr/bin/env node
/**
 * App icons from the brand mark (public/brand/mark.svg):
 *   src/app/icon.png        512 × 512, rounded tile on transparent
 *   src/app/apple-icon.png  180 × 180, full-bleed (iOS rounds the corners)
 *   src/app/favicon.ico     16, 32, 48 px
 *
 *   node scripts/build-icons.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync('public/brand/mark.svg', 'utf8');
const fullBleed = svg.replace('rx="14"', 'rx="0"');
const render = (source, size) =>
  sharp(Buffer.from(source), { density: 1200 }).resize(size, size).png().toBuffer();

writeFileSync('src/app/icon.png', await render(svg, 512));
writeFileSync('src/app/apple-icon.png', await render(fullBleed, 180));

// ICO with PNG entries (supported by every current browser).
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => render(svg, s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
writeFileSync('src/app/favicon.ico', Buffer.concat([header, ...entries, ...images]));
console.log('icons: icon.png 512, apple-icon.png 180, favicon.ico 16/32/48');
