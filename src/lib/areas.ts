import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Path } from '@/types/common';
import INDEX from '@/data/areas/index.json';
import { AIRPORTS, type AirportRecord } from '@/data/airports.generated';
import { AIRPORT_GEO } from '@/data/airport-geo.generated';
import { classFits } from '@/lib/route-math';

/**
 * Every state, district, pincode and locality in India, for the /charter
 * pages. Built by scripts/build-areas.mjs from the India Post pincode
 * directory. What a page says about a place is computed from that data and
 * from airport coordinates: nothing is claimed about operations there.
 */
export interface DistrictSummary {
  readonly slug: string;
  readonly name: string;
  readonly pins: number;
  readonly areas: number;
  readonly lat: number | null;
  readonly lon: number | null;
}
export interface StateSummary {
  readonly slug: string;
  readonly name: string;
  readonly districts: readonly DistrictSummary[];
}
export interface PinArea {
  readonly pin: string;
  readonly areas: readonly string[];
  readonly lat: number | null;
  readonly lon: number | null;
}
export interface District {
  readonly slug: string;
  readonly name: string;
  readonly lat: number | null;
  readonly lon: number | null;
  readonly pins: readonly PinArea[];
}

export const AREA_SOURCE = INDEX.source;
export const STATES: readonly StateSummary[] = INDEX.states;

export function stateBySlug(slug: string): StateSummary | undefined {
  return STATES.find((s) => s.slug === slug);
}

const cache = new Map<string, readonly District[]>();
/** A state's districts with all their pincodes. Read at build time only. */
export function districtsOf(stateSlug: string): readonly District[] {
  const hit = cache.get(stateSlug);
  if (hit) return hit;
  if (!/^[a-z0-9-]+$/.test(stateSlug)) return [];
  const file = join(process.cwd(), 'src/data/areas', `${stateSlug}.json`);
  const data = JSON.parse(readFileSync(file, 'utf8')) as { districts: District[] };
  cache.set(stateSlug, data.districts);
  return data.districts;
}

export function districtBySlug(stateSlug: string, districtSlug: string): District | undefined {
  return districtsOf(stateSlug).find((d) => d.slug === districtSlug);
}

export const stateHref = (s: { slug: string }) => `/charter/${s.slug}` as Path;
export const districtHref = (s: { slug: string }, d: { slug: string }) =>
  `/charter/${s.slug}/${d.slug}` as Path;

export const totals = {
  states: STATES.length,
  districts: STATES.reduce((n, s) => n + s.districts.length, 0),
  pins: STATES.reduce((n, s) => n + s.districts.reduce((m, d) => m + d.pins, 0), 0),
  areas: STATES.reduce((n, s) => n + s.districts.reduce((m, d) => m + d.areas, 0), 0),
};

// ----------------------------------------------------------------- geography
const R = 6371.0088;
const rad = (d: number) => (d * Math.PI) / 180;
export function kmBetween(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const h =
    Math.sin(rad(bLat - aLat) / 2) ** 2 +
    Math.cos(rad(aLat)) * Math.cos(rad(bLat)) * Math.sin(rad(bLon - aLon) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
/** Compass bearing in degrees, 0 = north. */
export function bearing(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const y = Math.sin(rad(bLon - aLon)) * Math.cos(rad(bLat));
  const x =
    Math.cos(rad(aLat)) * Math.sin(rad(bLat)) -
    Math.sin(rad(aLat)) * Math.cos(rad(bLat)) * Math.cos(rad(bLon - aLon));
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}
const POINTS = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];
export const compassWord = (deg: number) => POINTS[Math.round(deg / 45) % 8] ?? 'north';

export interface NearAirport {
  readonly record: AirportRecord;
  readonly icao: string;
  readonly km: number;
  readonly bearing: number;
  readonly runwayFt: number | null;
}

/**
 * Airports a charter jet would normally use: operational international and
 * domestic airports with coordinates and, where the runway is recorded, at
 * least 4,500 ft of it. State, private and military-run fields (Safdarjung,
 * for example) are left out, because access to them cannot be assumed.
 */
const JET_MIN_RUNWAY_FT = 4500;
const PLOTTABLE = AIRPORTS.filter((a) => {
  if (!a.operational || !a.icao || !AIRPORT_GEO[a.icao]) return false;
  if (a.kind !== 'international-airport' && a.kind !== 'domestic-airport') return false;
  const runway = AIRPORT_GEO[a.icao]?.longestRunwayFt;
  return runway === null || runway === undefined || runway >= JET_MIN_RUNWAY_FT;
});

export function nearestAirports(lat: number, lon: number, count = 3): readonly NearAirport[] {
  return PLOTTABLE.map((a) => {
    const g = AIRPORT_GEO[a.icao as string]!;
    return {
      record: a,
      icao: a.icao as string,
      km: kmBetween(lat, lon, g.lat, g.lon),
      bearing: bearing(lat, lon, g.lat, g.lon),
      runwayFt: g.longestRunwayFt,
    };
  })
    .sort((a, b) => a.km - b.km)
    .slice(0, count);
}

export const METROS = [
  { city: 'Delhi', icao: 'VIDP' },
  { city: 'Mumbai', icao: 'VABB' },
  { city: 'Bengaluru', icao: 'VOBL' },
  { city: 'Hyderabad', icao: 'VOHS' },
  { city: 'Chennai', icao: 'VOMM' },
  { city: 'Kolkata', icao: 'VECC' },
] as const;

export interface MetroLeg {
  readonly city: string;
  readonly km: number;
  readonly jet: string | null;
  readonly turboprop: string | null;
}

/** Estimated flying time from an airport to each metro (same rule as the route pages). */
export function metroLegs(fromIcao: string): readonly MetroLeg[] {
  const from = AIRPORT_GEO[fromIcao];
  if (!from) return [];
  return METROS.flatMap((m) => {
    const to = AIRPORT_GEO[m.icao];
    if (!to || m.icao === fromIcao) return [];
    const km = kmBetween(from.lat, from.lon, to.lat, to.lon);
    if (km < 60) return [];
    const fits = classFits(km);
    const jet = fits.find((f) => f.id === 'midsize-jets')?.time ?? null;
    const turboprop = fits.find((f) => f.id === 'turboprops')?.time ?? null;
    return [{ city: m.city, km, jet, turboprop }];
  });
}

/** Nearest other districts in the same state, by centre. */
export function nearbyDistricts(state: StateSummary, d: DistrictSummary, count = 6) {
  if (d.lat === null || d.lon === null) return state.districts.filter((x) => x.slug !== d.slug).slice(0, count);
  const { lat, lon } = d;
  return state.districts
    .filter((x) => x.slug !== d.slug && x.lat !== null && x.lon !== null)
    .map((x) => ({ ...x, km: kmBetween(lat, lon, x.lat as number, x.lon as number) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count);
}
