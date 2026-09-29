import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import type { Path } from '@/types/common';
import { formatKm } from '@/lib/route-math';
import { AREA_SOURCE, compassWord, type MetroLeg, type NearAirport } from '@/lib/areas';
import { GEO_SOURCE } from '@/data/airport-geo.generated';
import { Section } from '@/components/ui/Section';
import { AirportCompass } from './AirportCompass';

/**
 * The building blocks shared by the district, pincode and area pages. Every
 * figure in them is computed from the place's own position, so two pages only
 * share a block's layout, never its numbers.
 */
export const H2 = 'text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight';

export function StatGrid({
  stats,
}: {
  stats: readonly { icon: LucideIcon; label: string; value: string; sub: string }[];
}) {
  return (
    <Section ground="surface" width="wide">
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((st) => (
          <div
            key={st.label}
            className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-ivory)] p-4 transition-transform duration-200 hover:-translate-y-0.5 sm:p-5"
          >
            <dt className="flex items-center gap-1.5 text-[length:var(--text-micro)] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
              <st.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {st.label}
            </dt>
            <dd className="numeric mt-2 text-[1.125rem] font-semibold leading-tight sm:text-[1.375rem]">
              {st.value}
            </dd>
            <dd className="mt-1 text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">{st.sub}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function NearestAirports({ place, near }: { place: string; near: readonly NearAirport[] }) {
  if (near.length === 0) return null;
  return (
    <Section ground="ivory" width="wide">
      <h2 className={H2}>Nearest airports to {place}</h2>
      <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <div className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-4 text-[var(--color-ink)]">
          <AirportCompass place={place} airports={near} />
        </div>
        <ul className="grid gap-3">
          {near.map((a, i) => (
            <li
              key={a.icao}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-4 sm:p-5"
            >
              <div className="min-w-0">
                <p className="text-[length:var(--text-micro)] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                  {i === 0 ? 'Nearest' : `Option ${i + 1}`} · {compassWord(a.bearing)}
                </p>
                <h3 className="mt-1 font-semibold leading-snug">{a.record.name}</h3>
                <p className="text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                  {a.record.city}, {a.record.state} · {[a.record.iata, a.icao].filter(Boolean).join(' / ')}
                  {a.runwayFt ? ` · runway ${a.runwayFt.toLocaleString('en-IN')} ft` : ''}
                </p>
              </div>
              <p className="numeric text-[1.25rem] font-semibold">{formatKm(a.km)}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function FlyingTimes({
  place,
  airport,
  legs,
}: {
  place: string;
  airport: string;
  legs: readonly MetroLeg[];
}) {
  if (legs.length === 0) return null;
  return (
    <Section ground="surface" width="wide">
      <h2 className={H2}>Private jet flying times from {place}</h2>
      <p className="mt-3 max-w-[60ch] text-[var(--color-ink-muted)]">
        From {airport}, the nearest airport. Estimated flying time, not a schedule.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {legs.map((l) => (
          <li
            key={l.city}
            className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-ivory)] p-5 transition-colors hover:border-[var(--color-accent)]"
          >
            <h3 className="font-semibold">
              {place} to {l.city}
            </h3>
            <dl className="mt-3 grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-1 text-[length:var(--text-small)]">
              <dt className="text-[var(--color-ink-muted)]">Distance</dt>
              <dd className="numeric font-medium">{formatKm(l.km)}</dd>
              <dt className="text-[var(--color-ink-muted)]">By jet</dt>
              <dd className="numeric font-medium">{l.jet ?? '—'}</dd>
              <dt className="text-[var(--color-ink-muted)]">Turboprop</dt>
              <dd className="numeric font-medium">{l.turboprop ?? 'Not nonstop'}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Pill links, e.g. the other areas in a pincode. */
export function LinkChips({
  heading,
  intro,
  links,
  ground = 'ivory',
}: {
  heading: string;
  intro?: string;
  links: readonly { label: string; href: Path; meta?: string }[];
  ground?: 'ivory' | 'surface';
}) {
  if (links.length === 0) return null;
  return (
    <Section ground={ground} width="wide">
      <h2 className={H2}>{heading}</h2>
      {intro ? <p className="mt-3 max-w-[65ch] text-[var(--color-ink-muted)]">{intro}</p> : null}
      <ul className="mt-6 flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] px-4 py-2 text-[length:var(--text-small)] font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)]"
            >
              {l.label}
              {l.meta ? (
                <span className="numeric text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">{l.meta}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function SourceNote({ extra }: { extra?: string }) {
  return (
    <p className="mt-8 text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
      Pincodes and areas: {AREA_SOURCE.primary}; additional locality names from the{' '}
      {AREA_SOURCE.secondary.split(' for ')[0]}. Airport positions and runways: {GEO_SOURCE.name} (
      {GEO_SOURCE.licence.toLowerCase()}). Distances are straight-line.{extra ? ` ${extra}` : ''}
    </p>
  );
}

/** First option that fits a search-result title line; the brand only if it still fits. */
export function fitTitle(options: readonly string[]) {
  const title = options.find((t) => t.length <= 60) ?? options[options.length - 1] ?? '';
  return { title, brand: title.length + 18 <= 62 };
}

/** Longest candidate description within 160 characters. */
export function fitDescription(options: readonly string[]) {
  return options.find((d) => d.length <= 160) ?? (options[options.length - 1] ?? '').slice(0, 160);
}
