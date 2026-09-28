import type { AirportRecord } from '@/data/airports.generated';
import { AIRPORT_SOURCE } from '@/data/airports.generated';
import { AIRPORT_GEO, GEO_SOURCE } from '@/data/airport-geo.generated';
import { feetToMetres } from '@/lib/route-math';

const KIND_LABEL: Record<string, string> = {
  'international-airport': 'International',
  'domestic-airport': 'Domestic',
  'private-airport': 'State / private',
  airstrip: 'Airstrip',
  heliport: 'Heliport',
  helipad: 'Helipad',
};

/**
 * Facilities as the sources record them, attributed: one card per aerodrome,
 * so it reads on a phone without sideways scrolling (the old table needed
 * 44rem). Codes, type and operator come from our airport list; elevation and
 * longest open runway from OurAirports. A missing figure is a dash, never a
 * guess. Operational aerodromes first.
 */
export function AerodromeTable({ aerodromes }: { aerodromes: readonly AirportRecord[] }) {
  if (aerodromes.length === 0) return null;
  const sorted = [...aerodromes].sort((a, b) => Number(b.operational) - Number(a.operational));

  return (
    <figure className="m-0">
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sorted.map((item) => {
          const geo = item.icao ? AIRPORT_GEO[item.icao] : undefined;
          const cells = [
            { label: 'Codes', value: [item.iata, item.icao].filter(Boolean).join(' / ') || '—' },
            {
              label: 'Elevation',
              value:
                geo?.elevationFt != null ? `${geo.elevationFt.toLocaleString('en-IN')} ft` : '—',
            },
            {
              label: 'Longest runway',
              value: geo?.longestRunwayFt
                ? `${geo.longestRunwayFt.toLocaleString('en-IN')} ft (${feetToMetres(geo.longestRunwayFt).toLocaleString('en-IN')} m)`
                : '—',
            },
          ];
          return (
            <li
              key={item.id}
              className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-[var(--radius-pill)] bg-[var(--color-ivory)] px-2.5 py-0.5 text-[length:var(--text-micro)] font-medium text-[var(--color-ink-muted)]">
                  {KIND_LABEL[item.kind] ?? item.rawType}
                </span>
                <span
                  className={`rounded-[var(--radius-pill)] px-2.5 py-0.5 text-[length:var(--text-micro)] font-medium ${
                    item.operational
                      ? 'bg-[#e6f4ea] text-[#1e6b34]'
                      : 'bg-[var(--color-ivory-dim)] text-[var(--color-ink-muted)]'
                  }`}
                >
                  {item.operational ? 'Operational' : 'Not operational'}
                </span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug">{item.name}</h3>
              <p className="text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                {item.city}, {item.state}
                {item.operator ? ` · ${item.operator}` : ''}
              </p>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-[length:var(--text-small)]">
                {cells.map((c) => (
                  <div key={c.label} className="min-w-0">
                    <dt className="text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                      {c.label}
                    </dt>
                    <dd className="numeric mt-0.5 font-medium">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </li>
          );
        })}
      </ul>
      <figcaption className="mt-4 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
        Sources: our airport list, compiled from Wikipedia’s “List of airports in India” (
        {AIRPORT_SOURCE.dated}); elevation and runways from{' '}
        {GEO_SOURCE.name} ({GEO_SOURCE.licence.toLowerCase()}). Which facility a charter can use
        depends on the aircraft, the handling required and availability on the day.
      </figcaption>
    </figure>
  );
}
