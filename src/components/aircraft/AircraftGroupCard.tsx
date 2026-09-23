import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Path } from '@/types/common';
import type { AircraftCategory } from '@/types/aircraft';
import { aircraftByCategory, categorySpan, formatRange } from '@/data/aircraft';
import { SiteImageFill } from '@/components/ui/SiteImageFill';
import { CATEGORY_IMAGE } from '@/data/category-images';

/**
 * One aircraft group as a spec card: seats, range and cruise speed, as the
 * span across every type listed in the group. Computed from the fleet data,
 * so no figure here is absent from a type's own row. An unknown figure is a
 * dash, never a guess. Renders nothing for an empty group.
 *
 * Shared by the home page and the aircraft hub so the two cannot drift.
 */
export function AircraftGroupCard({
  title,
  category,
  href,
  summary,
}: {
  readonly title: string;
  readonly category: AircraftCategory;
  readonly href: Path;
  readonly summary?: string;
}) {
  const count = aircraftByCategory(category).length;
  if (count === 0) return null;
  const stats = [
    { label: 'Seats', value: formatRange(categorySpan(category, 'passengers')) },
    { label: 'Range', value: formatRange(categorySpan(category, 'rangeNm'), 'nm') },
    { label: 'Cruise', value: formatRange(categorySpan(category, 'cruiseKts'), 'kts') },
  ];

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] text-[var(--color-ink)] transition-[border-color,box-shadow] duration-[var(--duration-fast)] hover:border-[var(--color-accent)] hover:shadow-[0_10px_30px_-12px_rgba(31,95,214,0.35)]"
    >
      {CATEGORY_IMAGE[category] ? (
        <SiteImageFill
          name={CATEGORY_IMAGE[category]}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[3/2] transition-transform duration-[var(--duration-base)] ease-[var(--ease-flight)] group-hover:scale-[1.02]"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-[length:var(--text-h3)] font-semibold tracking-tight">{title}</h3>
        <p className="numeric text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
          {count} types
        </p>
        {summary ? (
          <p className="mt-3 text-[length:var(--text-small)] leading-relaxed text-[var(--color-ink-muted)]">
            {summary}
          </p>
        ) : null}
        <dl className="mt-5 grid flex-1 grid-cols-3 content-start gap-2 border-t border-[var(--color-hairline)] pt-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-[length:var(--text-micro)] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                {stat.label}
              </dt>
              <dd className="numeric mt-1 text-[length:var(--text-small)] font-semibold">
                {stat.value ?? '—'}
              </dd>
            </div>
          ))}
        </dl>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)]">
          Compare {title.toLowerCase()}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
