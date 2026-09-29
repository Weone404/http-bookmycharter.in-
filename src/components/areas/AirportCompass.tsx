import type { NearAirport } from '@/lib/areas';

/**
 * The nearest airports drawn around the district centre: direction is the
 * true compass bearing, distance is to scale (rings at whole steps of the
 * outer ring). Straight-line distances, labelled as such beside it.
 */
export function AirportCompass({ place, airports }: { place: string; airports: readonly NearAirport[] }) {
  if (airports.length === 0) return null;
  const size = 320;
  const c = size / 2;
  const outer = 104;
  const far = Math.max(...airports.map((a) => a.km));
  const step = far <= 40 ? 10 : far <= 100 ? 25 : far <= 200 ? 50 : far <= 400 ? 100 : far <= 800 ? 200 : 500;
  const max = Math.max(step, Math.ceil(far / step) * step);
  // Rings at whole steps (e.g. 25, 50, 75 km), at most four.
  const rings = Array.from({ length: Math.round(max / step) }, (_, i) => (i + 1) * step);

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Nearest airports to ${place}: ${airports
          .map((a) => `${a.record.name}, ${Math.round(a.km)} km`)
          .join('; ')}`}
        className="mx-auto block h-auto w-full max-w-[22rem]"
      >
        {rings.map((km) => (
          <g key={km}>
            <circle
              cx={c}
              cy={c}
              r={(km / max) * outer}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.14"
              strokeDasharray={km === max ? undefined : '3 4'}
            />
          </g>
        ))}
        {['N', 'E', 'S', 'W'].map((l, i) => {
          const a = (i * Math.PI) / 2;
          return (
            <text
              key={l}
              x={c + Math.sin(a) * (outer + 16)}
              y={c - Math.cos(a) * (outer + 16) + 4}
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              fill="currentColor"
              fillOpacity="0.55"
            >
              {l}
            </text>
          );
        })}
        {airports.map((a, i) => {
          const r = (a.km / max) * outer;
          const t = (a.bearing * Math.PI) / 180;
          const x = c + Math.sin(t) * r;
          const y = c - Math.cos(t) * r;
          const label = `${a.record.iata ?? a.icao} · ${Math.round(a.km)} km`;
          const width = label.length * 7.4;
          // Beside the dot on its own side if it fits; otherwise above (or
          // below, near the top edge) it, centred and kept inside the drawing.
          const side = x >= c ? x + 10 + width <= size - 2 : x - 10 - width >= 2;
          const lx = side
            ? x + (x >= c ? 10 : -10)
            : Math.min(Math.max(x, width / 2 + 2), size - width / 2 - 2);
          const ly = side ? y + 4 : y < 30 ? y + 22 : y - 12;
          const anchor = side ? (x >= c ? 'start' : 'end') : 'middle';
          return (
            <g key={a.icao}>
              <line x1={c} y1={c} x2={x} y2={y} stroke="var(--color-accent-strong)" strokeOpacity="0.45" strokeWidth="1.5" />
              <circle cx={x} cy={y} r={i === 0 ? 7 : 5.5} fill="var(--color-accent-strong)" />
              <text x={lx} y={ly} fontSize="12.5" fontWeight="700" textAnchor={anchor} fill="currentColor">
                {label}
              </text>
            </g>
          );
        })}
        <circle cx={c} cy={c} r="6" fill="currentColor" />
        <circle cx={c} cy={c} r="12" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      </svg>
      <figcaption className="mt-2 text-center text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
        Centre: {place}. Rings every {step} km; straight-line distance and true direction to each airport.
      </figcaption>
    </figure>
  );
}
