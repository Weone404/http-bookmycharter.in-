/**
 * Small, dependency-free geography shared by server pages and client widgets:
 * great-circle distance, compass bearing and its eight-point name.
 */
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
