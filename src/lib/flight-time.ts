/**
 * The flying-time rule, on its own so client widgets can use it without the
 * aircraft data. The route pages state it; the quote form applies it live.
 * - Flown distance is the straight-line distance plus 10% (ROUTING_FACTOR).
 * - Flying time is flown distance ÷ typical cruise speed, plus 25 minutes for
 *   taxi, climb and descent.
 * - Helicopters are shown only for legs up to 300 km straight-line.
 */
export const ROUTING_FACTOR = 1.1;
export const FIXED_MINUTES = 25;
export const HELICOPTER_MAX_KM = 300;
export const KM_PER_NM = 1.852;

/** Rounded to the nearest 5 minutes, as "1 h 45 min". */
export function formatDuration(hours: number): string {
  const minutes = Math.round((hours * 60) / 5) * 5;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

/** "1 h 55 min – 2 h 5 min" for a straight-line distance and a cruise-speed range in knots. */
export function flyingTime(km: number, cruiseKts: { min: number; max: number }): string {
  const nm = (km / KM_PER_NM) * ROUTING_FACTOR;
  const quick = formatDuration(nm / cruiseKts.max + FIXED_MINUTES / 60);
  const slow = formatDuration(nm / cruiseKts.min + FIXED_MINUTES / 60);
  return quick === slow ? quick : `${quick} – ${slow}`;
}
