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
/** [name, slug, lat, lon]; the position is the post office's, when recorded. */
export type Area = readonly [name: string, slug: string, lat: number | null, lon: number | null];
export interface PinArea {
  readonly pin: string;
  readonly areas: readonly Area[];
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

const cache = new Map<string, Promise<readonly District[]>>();
/**
 * A state's districts with all their pincodes and areas. Imported (not read
 * from disk) so the data ships inside the server bundle: pincode and area
 * pages are rendered on first request, not at build time.
 */
export function districtsOf(stateSlug: string): Promise<readonly District[]> {
  if (!STATES.some((s) => s.slug === stateSlug)) return Promise.resolve([]);
  let hit = cache.get(stateSlug);
  if (!hit) {
    hit = import(`@/data/areas/${stateSlug}.json`).then(
      (m: { default: { districts: District[] } }) => m.default.districts,
    );
    cache.set(stateSlug, hit);
  }
  return hit;
}

export async function districtBySlug(stateSlug: string, districtSlug: string): Promise<District | undefined> {
  return (await districtsOf(stateSlug)).find((d) => d.slug === districtSlug);
}

export const stateHref = (s: { slug: string }) => `/charter/${s.slug}` as Path;
export const districtHref = (s: { slug: string }, d: { slug: string }) =>
  `/charter/${s.slug}/${d.slug}` as Path;
export const pinHref = (s: { slug: string }, d: { slug: string }, pin: string) =>
  `/charter/${s.slug}/${d.slug}/${pin}` as Path;
export const areaHref = (s: { slug: string }, d: { slug: string }, pin: string, area: Area) =>
  `/charter/${s.slug}/${d.slug}/${pin}/${area[1]}` as Path;

export const totals = {
  states: STATES.length,
  districts: STATES.reduce((n, s) => n + s.districts.length, 0),
  pins: STATES.reduce((n, s) => n + s.districts.reduce((m, d) => m + d.pins, 0), 0),
  areas: STATES.reduce((n, s) => n + s.districts.reduce((m, d) => m + d.areas, 0), 0),
};

/** Area pages per sitemap file (the limit is 50,000). */
export const AREAS_PER_SITEMAP = 45_000;
export const AREA_SITEMAP_FILES = Math.ceil(totals.areas / AREAS_PER_SITEMAP);

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

/** Nearest airports and metro flying times for a point. */
export function placeFacts(lat: number | null, lon: number | null) {
  const near = lat !== null && lon !== null ? nearestAirports(lat, lon, 3) : [];
  const main = near[0];
  const legs = main ? metroLegs(main.icao) : [];
  return { near, main, legs };
}

/** Position of an area: its own post office if recorded, else its pincode's centre. */
export function areaPoint(pin: PinArea, area: Area): { lat: number | null; lon: number | null; own: boolean } {
  if (area[2] !== null && area[3] !== null) return { lat: area[2], lon: area[3], own: true };
  return { lat: pin.lat, lon: pin.lon, own: false };
}

/** Closest areas under other pincodes of the same district (its own pincode's areas are listed separately). */
export function nearbyAreas(district: District, lat: number | null, lon: number | null, ownPin: string, count = 8) {
  if (lat === null || lon === null) return [];
  const out: { pin: string; area: Area; km: number }[] = [];
  for (const p of district.pins) {
    if (p.pin === ownPin) continue;
    for (const a of p.areas) {
      if (a[2] === null || a[3] === null) continue;
      out.push({ pin: p.pin, area: a, km: kmBetween(lat, lon, a[2], a[3]) });
    }
  }
  return out.sort((x, y) => x.km - y.km).slice(0, count);
}

/** Closest other pincodes in the same district. */
export function nearbyPins(district: District, pin: PinArea, count = 6) {
  const { lat, lon } = pin;
  const others = district.pins.filter((p) => p.pin !== pin.pin);
  if (lat === null || lon === null) return others.slice(0, count).map((p) => ({ pin: p, km: null as number | null }));
  return others
    .filter((p) => p.lat !== null && p.lon !== null)
    .map((p) => ({ pin: p, km: kmBetween(lat, lon, p.lat as number, p.lon as number) as number | null }))
    .sort((a, b) => (a.km ?? 0) - (b.km ?? 0))
    .slice(0, count);
}
