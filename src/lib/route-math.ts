import { AIRCRAFT } from '@/data/aircraft';
import { AIRPORT_GEO } from '@/data/airport-geo.generated';
import { FLEET_CLASS_META, classOf, type FleetClassId } from '@/data/fleet-classes';

/**
 * Route arithmetic. Everything here is computed from two public inputs:
 * airport coordinates (OurAirports) and the typical range and cruise speed of
 * each type (our spec sheet). Nothing is looked up from a timetable, and the
 * page says how each figure was worked out.
 *
 * Planning rules, stated on every route page:
 * - Flown distance is the straight-line distance plus 10% for airways and
 *   approaches (ROUTING_FACTOR).
 * - "Nonstop": a type counts if 80% of its upper typical range covers the
 *   flown distance. The 20% stands in for reserves and winds. A rule of
 *   thumb, not an operator's flight plan.
 * - Flying time: flown distance ÷ typical cruise speed, plus 25 minutes for
 *   taxi, climb and descent.
 * - Helicopters are shown only for legs up to 300 km straight-line; beyond
 *   that a helicopter is slow and costly next to a plane, whatever its range.
 */
import {
  FIXED_MINUTES,
  HELICOPTER_MAX_KM,
  KM_PER_NM,
  ROUTING_FACTOR,
  formatDuration,
} from '@/lib/flight-time';

export { FIXED_MINUTES, HELICOPTER_MAX_KM, ROUTING_FACTOR, formatDuration };
export const RANGE_MARGIN = 0.8;

export function greatCircleKm(fromIcao: string, toIcao: string): number | null {
  const a = AIRPORT_GEO[fromIcao];
  const b = AIRPORT_GEO[toIcao];
  if (!a || !b) return null;
  const R = 6371.0088;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function kmToNm(km: number): number {
  return km / KM_PER_NM;
}

export interface ClassFit {
  readonly id: FleetClassId;
  readonly label: string;
  readonly singular: string;
  /** Types in the class that can fly the leg nonstop under the planning rule. */
  readonly nonstop: readonly { slug: string; name: string; href: string }[];
  readonly total: number;
  /** Estimated flying time, fastest to slowest type that fits, e.g. "1 h 40 min – 2 h 5 min". */
  readonly time: string | null;
}

export function classFits(distanceKm: number): readonly ClassFit[] {
  const nm = kmToNm(distanceKm) * ROUTING_FACTOR;
  return FLEET_CLASS_META.map((meta) => {
    const members = AIRCRAFT.filter((a) => classOf(a) === meta.id);
    const tooFarForHelicopter = meta.id === 'helicopters' && distanceKm > HELICOPTER_MAX_KM;
    const fit = tooFarForHelicopter
      ? []
      : members.filter((a) => a.specs.rangeNm && a.specs.rangeNm.max * RANGE_MARGIN >= nm);
    const speeds = fit
      .map((a) => a.specs.cruiseKts)
      .filter((s): s is { min: number; max: number } => s !== null);
    let time: string | null = null;
    if (speeds.length > 0) {
      const fastest = Math.max(...speeds.map((s) => s.max));
      const slowest = Math.min(...speeds.map((s) => s.min));
      const quick = nm / fastest + FIXED_MINUTES / 60;
      const slow = nm / slowest + FIXED_MINUTES / 60;
      const a = formatDuration(quick);
      const b = formatDuration(slow);
      time = a === b ? a : `${a} – ${b}`;
    }
    return {
      id: meta.id,
      label: meta.label,
      singular: meta.singular,
      nonstop: fit.map((a) => ({ slug: a.slug, name: a.name, href: a.href })),
      total: members.length,
      time,
    };
  });
}

export function formatKm(km: number): string {
  return `${Math.round(km).toLocaleString('en-IN')} km`;
}
export function formatNm(km: number): string {
  return `${Math.round(kmToNm(km)).toLocaleString('en-IN')} nm`;
}
export function feetToMetres(ft: number): number {
  return Math.round(ft * 0.3048);
}

/** Typical cruise-speed range (knots) of a class, fastest and slowest type, for the quote form. */
export function classCruise(id: FleetClassId): { min: number; max: number } | null {
  const speeds = AIRCRAFT.filter((a) => classOf(a) === id)
    .map((a) => a.specs.cruiseKts)
    .filter((s): s is { min: number; max: number } => s !== null);
  if (speeds.length === 0) return null;
  return { min: Math.min(...speeds.map((s) => s.min)), max: Math.max(...speeds.map((s) => s.max)) };
}
