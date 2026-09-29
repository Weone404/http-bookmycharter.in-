import { AIRPORTS, AIRPORT_SOURCE } from '@/data/airports.generated';
import { AIRPORT_GEO } from '@/data/airport-geo.generated';
import { kmBetween } from '@/lib/geo';

/**
 * The airport index behind the search fields.
 *
 * Built from the 216 generated records, narrowed to the ones a charter can
 * actually use. A closed aerodrome offered in a picker is a false availability
 * claim in miniature: the person selects it, sends the enquiry, and finds out
 * from a human that nothing has operated there for years. So `operational`
 * filters the list, and the count is reported rather than rounded.
 */
export interface AirportOption {
  readonly id: string;
  readonly city: string;
  readonly name: string;
  readonly state: string;
  readonly iata: string | null;
  /**
   * What goes into the form field and the enquiry.
   *
   * City, code AND airport name, because the city alone is ambiguous and the
   * ambiguity is not rare: "Delhi NCR" matches both Indira Gandhi
   * International and Safdarjung, and picking the wrong one is the difference
   * between a routine departure and one that needs a permission the customer
   * has never heard of. The enquiry that reaches the operator has to say which
   * field it means.
   */
  readonly label: string;
  /** Lower-cased haystack, precomputed once rather than per keystroke. */
  readonly search: string;
  /** Position (OurAirports), when recorded. */
  readonly lat: number | null;
  readonly lon: number | null;
  /** An airport a charter jet would normally use (see isJetAirport). */
  readonly jet: boolean;
}

/**
 * Airports a charter jet would normally use: operational international and
 * domestic airports and, where the runway is recorded, at least 4,500 ft of
 * it. State, private and military-run fields are left out, because access to
 * them cannot be assumed. One rule for the pages and the form.
 */
export const JET_MIN_RUNWAY_FT = 4500;
export function isJetAirport(record: (typeof AIRPORTS)[number]): boolean {
  if (!record.operational || !record.icao) return false;
  if (record.kind !== 'international-airport' && record.kind !== 'domestic-airport') return false;
  const runway = AIRPORT_GEO[record.icao]?.longestRunwayFt;
  return runway === null || runway === undefined || runway >= JET_MIN_RUNWAY_FT;
}

function toOption(record: (typeof AIRPORTS)[number]): AirportOption {
  const geo = record.icao ? AIRPORT_GEO[record.icao] : undefined;
  const label = record.iata
    ? `${record.city} (${record.iata}) — ${record.name}`
    : `${record.city} — ${record.name}`;
  return {
    id: record.id,
    city: record.city,
    name: record.name,
    state: record.state,
    iata: record.iata,
    label,
    search: [record.city, record.name, record.state, record.iata, record.icao]
      .filter((part): part is string => typeof part === 'string')
      .join(' ')
      .toLowerCase(),
    lat: geo?.lat ?? null,
    lon: geo?.lon ?? null,
    jet: isJetAirport(record),
  };
}

export const AIRPORT_OPTIONS: readonly AirportOption[] = AIRPORTS.filter(
  (record) => record.operational,
)
  .map(toOption)
  .sort((a, b) => a.city.localeCompare(b.city));

export const AIRPORT_COUNT = AIRPORT_OPTIONS.length;
export const AIRPORT_PROVENANCE = AIRPORT_SOURCE;

/**
 * Ranked search.
 *
 * Ranking matters more than filtering here. Typing "del" in an unranked list
 * returns Delhi somewhere below New Delhi's neighbours and a handful of
 * aerodromes with "del" inside a longer word; the person then scrolls a list
 * that already contains what they wanted. So: an exact IATA code wins, then a
 * city that starts with the query, then a city that contains it, then anything
 * else that matches. Ties keep alphabetical order.
 *
 * `limit` exists because a listbox is a menu, not a directory. Ten is enough
 * to show the right answer and short enough to scan without scrolling.
 */
export function searchAirports(query: string, limit = 10): readonly AirportOption[] {
  const q = query.trim().toLowerCase();
  if (q === '') return AIRPORT_OPTIONS.slice(0, limit);

  const scored: { option: AirportOption; rank: number }[] = [];
  for (const option of AIRPORT_OPTIONS) {
    const city = option.city.toLowerCase();
    let rank: number;
    if (option.iata && option.iata.toLowerCase() === q) rank = 0;
    else if (city.startsWith(q)) rank = 1;
    else if (option.name.toLowerCase().startsWith(q)) rank = 2;
    else if (city.includes(q)) rank = 3;
    else if (option.search.includes(q)) rank = 4;
    else continue;
    scored.push({ option, rank });
  }

  scored.sort((a, b) => a.rank - b.rank || a.option.city.localeCompare(b.option.city));
  return scored.slice(0, limit).map((entry) => entry.option);
}

/** The option for one aerodrome, by ICAO code (route pages prefill the form with it). */
export function airportByIcao(icao: string): AirportOption | undefined {
  const record = AIRPORTS.find((a) => a.icao === icao);
  return record ? toOption(record) : undefined;
}

/** Jet-capable airports nearest a point, with straight-line distance. */
export function nearestJetAirports(lat: number, lon: number, count = 2) {
  return AIRPORT_OPTIONS.filter((o) => o.jet && o.lat !== null && o.lon !== null)
    .map((option) => ({ option, km: kmBetween(lat, lon, option.lat as number, option.lon as number) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count);
}

/** The option whose label is exactly this text (a value picked from the list). */
export function optionByLabel(label: string): AirportOption | undefined {
  return AIRPORT_OPTIONS.find((o) => o.label === label);
}
