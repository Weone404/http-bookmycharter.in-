#!/usr/bin/env node
/**
 * Airport position, elevation and runway length for Indian aerodromes.
 *
 *   npm run geo
 *
 * Source: OurAirports (https://ourairports.com/data/), released into the
 * public domain. The India rows of airports.csv and runways.csv are kept in
 * scripts/data/ so the build is reproducible offline; refresh them with
 * `npm run geo` after replacing those two files.
 *
 * Joined to our own airport list by ICAO code. Writes
 * src/data/airport-geo.generated.ts. Only open runways count toward the
 * longest runway; an aerodrome with no runway row gets `null`, never a guess.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DATA = join(ROOT, 'scripts/data');
const OUT = join(ROOT, 'src/data/airport-geo.generated.ts');
const SOURCE_DATE = '2026-09-28';

/** Minimal CSV parser: quoted fields, commas inside quotes, no newlines in fields. */
function parse(text) {
  const [head, ...lines] = text.trim().split(/\r?\n/);
  const split = (line) => {
    const out = [];
    let cur = '';
    let quoted = false;
    for (let i = 0; i < line.length; i += 1) {
      const c = line[i];
      if (c === '"') {
        if (quoted && line[i + 1] === '"') {
          cur += '"';
          i += 1;
        } else quoted = !quoted;
      } else if (c === ',' && !quoted) {
        out.push(cur);
        cur = '';
      } else cur += c;
    }
    out.push(cur);
    return out;
  };
  const keys = split(head);
  return lines.map((line) => Object.fromEntries(split(line).map((v, i) => [keys[i], v])));
}

const airports = parse(readFileSync(join(DATA, 'ourairports-in-airports.csv'), 'utf8'));
const runways = parse(readFileSync(join(DATA, 'ourairports-in-runways.csv'), 'utf8'));

const generated = readFileSync(join(ROOT, 'src/data/airports.generated.ts'), 'utf8');
const ours = new Set([...generated.matchAll(/"icao": "([A-Z]{4})"/g)].map((m) => m[1]));

const records = {};
for (const a of airports) {
  const icao = a.icao_code || (/^[A-Z]{4}$/.test(a.gps_code) ? a.gps_code : '') || a.ident;
  if (!ours.has(icao)) continue;
  const open = runways.filter((r) => r.airport_ref === a.id && r.closed !== '1' && r.length_ft);
  const longest = open.reduce((max, r) => Math.max(max, Number(r.length_ft) || 0), 0);
  records[icao] = {
    lat: Number(Number(a.latitude_deg).toFixed(4)),
    lon: Number(Number(a.longitude_deg).toFixed(4)),
    elevationFt: a.elevation_ft === '' ? null : Number(a.elevation_ft),
    longestRunwayFt: longest > 0 ? longest : null,
  };
}

const count = Object.keys(records).length;
writeFileSync(
  OUT,
  `// GENERATED FILE — do not edit by hand. Run \`npm run geo\`.
//
// Position, elevation and longest open runway for ${count} of our ${ours.size} aerodromes with an
// ICAO code. Source: OurAirports (public domain), India rows as of ${SOURCE_DATE}.

export interface AirportGeo {
  readonly lat: number;
  readonly lon: number;
  readonly elevationFt: number | null;
  readonly longestRunwayFt: number | null;
}

export const GEO_SOURCE = {
  name: 'OurAirports',
  url: 'https://ourairports.com/data/',
  licence: 'Public domain',
  dated: '${SOURCE_DATE}',
} as const;

export const AIRPORT_GEO: Readonly<Record<string, AirportGeo>> = ${JSON.stringify(records, null, 2)};
`,
);
console.log(`geo: ${count} of ${ours.size} aerodromes matched`);
