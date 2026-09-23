/**
 * Build-time transform: fleet-details.md -> src/data/aircraft.generated.ts
 *
 * The source is an internal specification document inherited with the project.
 * It states plainly that its figures are typical for civil/charter
 * configurations and vary by variant, options, weight, altitude and
 * temperature. Every record generated here therefore carries
 * `specsBasis: 'typical-for-type'` and an internal-record source, and every
 * page rendering them says so. A tail-specific figure would need an operator
 * document (docs/BUSINESS-DATA-REQUIRED C2).
 *
 * Ranges are preserved as ranges. Collapsing "5-7 passengers" to "6" would
 * invent a precision the source does not have.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SOURCE = 'fleet-details.md';
const OUTPUT = path.join('src', 'data', 'aircraft.generated.ts');
const SOURCE_DOC = 'fleet-details.md — internal aircraft specification sheet, typical civil/charter configurations';
const SOURCE_DATE = '2026-09-17';

const CATEGORY_BY_HEADING = {
  Helicopters: 'helicopter',
  Turboprops: 'turboprop',
  'Business Jets': 'private-jet',
  'Airliners / Regional Aircraft': 'executive-airliner',
};

function slugify(value) {
  // "+" carries meaning in aircraft names — CJ2 and CJ2+ are different
  // aircraft. Stripping it silently collided three pairs of slugs in the
  // previous fleet data, which is how /fleet/[slug] ended up serving one
  // aircraft under two names.
  return value
    .toLowerCase()
    .replace(/\+/g, '-plus')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Cruise speed in knots. "Cruise Mach 0.78 (~450–460 kts)" used to parse as
 * 0.78 kts, because the first number on the line was taken whatever its unit.
 * A knots figure is used when the line states one; a Mach-only line gives
 * null, since converting Mach to knots needs an altitude the sheet does not
 * give, and a guessed figure is worse than a dash.
 */
function parseSpeed(raw) {
  const kts = /(\d[\d,]*(?:\s*[–—-]\s*\d[\d,]*)?)\s*kts/i.exec(raw);
  if (kts) return parseRange(kts[1]);
  if (/mach/i.test(raw)) return null;
  return parseRange(raw.replace(/cruise/i, ''));
}

/** "5–7" -> {min:5,max:7} · "340" -> {min:340,max:340} · unparseable -> null */
function parseRange(raw) {
  if (!raw) return null;
  const cleaned = raw.replace(/,/g, '').replace(/[–—]/g, '-');
  const match = /(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?/.exec(cleaned);
  if (!match) return null;
  const min = Number(match[1]);
  const max = match[2] === undefined ? min : Number(match[2]);
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  return { min, max };
}

const md = await readFile(SOURCE, 'utf8');

let category = null;
let current = null;
const records = [];

function commit() {
  if (current && current.name) records.push(current);
  current = null;
}

for (const line of md.split('\n')) {
  const h2 = /^##\s+(.+?)\s*$/.exec(line);
  if (h2) {
    commit();
    category = CATEGORY_BY_HEADING[h2[1].trim()] ?? null;
    continue;
  }

  const h3 = /^###\s+(?:\d+\.\s*)?(.+?)\s*$/.exec(line);
  if (h3 && category) {
    commit();
    const name = h3[1].trim();
    current = { slug: slugify(name), name, category, specs: {} };
    continue;
  }

  if (!current) continue;

  const field = /^\*\*(.+?)\*\*:\s*(.+?)\s*$/.exec(line.trim());
  if (!field) continue;

  const key = field[1].toLowerCase();
  const value = field[2].replace(/\s+$/, '');

  if (key === 'description') current.sourceDescription = value;
  else if (key === 'seats') current.specs.passengers = parseRange(value);
  else if (key === 'range') current.specs.rangeNm = parseRange(value);
  else if (key === 'speed') current.specs.cruiseKts = parseSpeed(value);
  else if (key === 'luggage') current.specs.baggageNote = value;
  else if (key === 'pilots') current.specs.crew = parseRange(value);
  else if (key === 'flight attendant') current.specs.cabinCrew = /^yes/i.test(value);
}
commit();

if (records.length === 0) throw new Error(`Parsed 0 aircraft from ${SOURCE}.`);

const slugs = records.map((r) => r.slug);
const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (duplicates.length > 0) {
  throw new Error(`Duplicate aircraft slugs: ${[...new Set(duplicates)].join(', ')}`);
}

const byCategory = records.reduce((acc, r) => {
  acc[r.category] = (acc[r.category] ?? 0) + 1;
  return acc;
}, {});

const body = `// GENERATED FILE — do not edit by hand.
// Run \`npm run aircraft\` to regenerate from ${SOURCE}.
//
// Source: ${SOURCE_DOC}
// Generated: ${SOURCE_DATE}
//
// ${records.length} aircraft types: ${Object.entries(byCategory)
  .map(([k, v]) => `${v} ${k}`)
  .join(', ')}.
//
// Every figure here is TYPICAL FOR THE TYPE, not tail-specific. Pages that
// render these must say so. See docs/BUSINESS-DATA-REQUIRED.md section C.

import type { AircraftCategory } from '@/types/aircraft';
import type { SourceRef } from '@/types/common';

export interface NumericRange {
  readonly min: number;
  readonly max: number;
}

export interface GeneratedSpecs {
  readonly passengers: NumericRange | null;
  readonly rangeNm: NumericRange | null;
  readonly cruiseKts: NumericRange | null;
  readonly crew: NumericRange | null;
  readonly cabinCrew: boolean | null;
  readonly baggageNote: string | null;
}

export interface GeneratedAircraft {
  readonly slug: string;
  readonly name: string;
  readonly category: AircraftCategory;
  readonly sourceDescription: string | null;
  readonly specs: GeneratedSpecs;
}

/** Provenance for every specification figure in this file. */
export const AIRCRAFT_SPEC_SOURCE: SourceRef = {
  kind: 'internal-record',
  document: ${JSON.stringify(SOURCE_DOC)},
  dated: ${JSON.stringify(SOURCE_DATE)},
  note: 'Typical for the type. Varies by variant, options, weight, altitude and temperature.',
};

export const GENERATED_AIRCRAFT: readonly GeneratedAircraft[] = ${JSON.stringify(
  records.map((r) => ({
    slug: r.slug,
    name: r.name,
    category: r.category,
    sourceDescription: r.sourceDescription ?? null,
    specs: {
      passengers: r.specs.passengers ?? null,
      rangeNm: r.specs.rangeNm ?? null,
      cruiseKts: r.specs.cruiseKts ?? null,
      crew: r.specs.crew ?? null,
      cabinCrew: r.specs.cabinCrew ?? null,
      baggageNote: r.specs.baggageNote ?? null,
    },
  })),
  null,
  2,
)};

const BY_SLUG = new Map(GENERATED_AIRCRAFT.map((a) => [a.slug, a]));

export function generatedAircraft(slug: string): GeneratedAircraft | undefined {
  return BY_SLUG.get(slug);
}
`;

await writeFile(OUTPUT, body, 'utf8');
console.log(`aircraft: ${records.length} types -> ${OUTPUT} (${JSON.stringify(byCategory)})`);
