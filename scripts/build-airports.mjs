/**
 * Build-time transform: India_Airports_List.md -> src/data/airports.generated.ts
 *
 * Replaces the previous runtime Excel parse in /api/airports. Parsing a
 * spreadsheet on every request was both slow and an unnecessary attack surface
 * (the `xlsx` package carries unpatched advisories), and the data changes about
 * once a year.
 *
 * Source: India_Airports_List.md, compiled from Wikipedia's list of airports in
 * India. Every record carries that provenance, so a page can say where the
 * figure came from rather than asserting it.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SOURCE = 'India_Airports_List.md';
const OUTPUT = path.join('src', 'data', 'airports.generated.ts');
const SOURCE_NOTE = 'India_Airports_List.md, compiled from Wikipedia "List of airports in India"';
const SOURCE_DATE = '2026-09-17';

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function classify(type) {
  const t = type.toLowerCase();
  if (t.includes('international')) return 'international-airport';
  if (t.includes('heliport') || t.includes('helipad')) return 'heliport';
  if (t.includes('private')) return 'private-airport';
  if (t.includes('airstrip') || t.includes('airfield')) return 'airstrip';
  return 'domestic-airport';
}

const md = await readFile(SOURCE, 'utf8');
const lines = md.split('\n');

let state = '';
const records = [];
const seen = new Set();

for (const line of lines) {
  const heading = /^##\s+(.+?)\s*$/.exec(line);
  if (heading) {
    state = heading[1].trim();
    continue;
  }
  if (!line.startsWith('|')) continue;

  const cells = line.split('|').slice(1, -1).map((c) => c.trim());
  if (cells.length < 6) continue;
  // Skip the header row and the separator row of each table.
  if (/^-+$/.test(cells[0].replace(/[: ]/g, '')) || cells[0] === 'Area Served') continue;

  const [city, name, iata, icao, type, operational, operator = ''] = cells;
  if (!city || !name) continue;

  const key = `${slugify(city)}--${slugify(name)}`;
  if (seen.has(key)) continue;
  seen.add(key);

  records.push({
    id: key,
    city,
    name,
    state,
    iata: iata || null,
    icao: icao || null,
    kind: classify(type),
    rawType: type,
    operational: /^yes$/i.test(operational),
    operator: operator || null,
  });
}

if (records.length === 0) {
  throw new Error(`Parsed 0 airports from ${SOURCE}. Refusing to write an empty dataset.`);
}

const withIata = records.filter((r) => r.iata).length;
const operational = records.filter((r) => r.operational).length;

const body = `// GENERATED FILE — do not edit by hand.
// Run \`npm run airports\` to regenerate from ${SOURCE}.
//
// Source: ${SOURCE_NOTE}
// Generated: ${SOURCE_DATE}
//
// ${records.length} records · ${withIata} with an IATA code · ${operational} marked operational.

import type { AerodromeKind } from '@/types/destination';

export interface AirportRecord {
  readonly id: string;
  readonly city: string;
  readonly name: string;
  readonly state: string;
  readonly iata: string | null;
  readonly icao: string | null;
  readonly kind: AerodromeKind;
  readonly rawType: string;
  readonly operational: boolean;
  readonly operator: string | null;
}

/** Provenance for every record in this file. */
export const AIRPORT_SOURCE = {
  document: ${JSON.stringify(SOURCE_NOTE)},
  dated: ${JSON.stringify(SOURCE_DATE)},
} as const;

export const AIRPORTS: readonly AirportRecord[] = ${JSON.stringify(records, null, 2)};

/** Airports a charter can realistically use: operational, with a code. */
export const CHARTER_AIRPORTS: readonly AirportRecord[] = AIRPORTS.filter(
  (a) => a.operational && (a.iata !== null || a.icao !== null),
);
`;

await writeFile(OUTPUT, body, 'utf8');
console.log(`airports: ${records.length} records -> ${OUTPUT} (${withIata} IATA, ${operational} operational)`);
