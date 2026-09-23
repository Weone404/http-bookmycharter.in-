import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { AircraftCategory } from '@/types/aircraft';

/**
 * The orientation rail that sits beside a page's opening paragraphs.
 *
 * Every inner page opened the same way: an H1, a lead sentence, then three
 * dense paragraphs across a single column, with the right half of a desktop
 * viewport empty. Read quickly, that is indistinguishable from every other
 * page — which is the "there's only text inside the other tabs" problem.
 *
 * A white card on the ivory ground, separated by a hairline. It was midnight
 * when the rest of the site was, and when the page went light it became the
 * one remaining dark slab — which is exactly the heaviness this pass exists to
 * remove.
 *
 * This is the fix, and it is deliberately not decoration. It carries the three
 * things a reader wants before committing to the prose: what kind of aircraft
 * the page concerns, how much of each thing the page actually contains, and
 * the action. Every number it shows is a count of real content on the same
 * page — nothing here is authored separately, so it cannot drift out of date
 * and it cannot assert anything the page does not already support.
 */

export interface GlanceStat {
  readonly label: string;
  /** A count of something real on the page. Never an unverified claim. */
  readonly value: number | string;
}

export function GlanceCard({
  heading = 'At a glance',
  categories,
  categoryLabel,
  stats,
  note,
  primaryHref = '/request-a-charter',
  primaryLabel = 'Request a Charter',
  secondaryHref,
  secondaryLabel,
  children,
}: {
  heading?: string;
  categories?: readonly AircraftCategory[];
  categoryLabel?: Readonly<Partial<Record<AircraftCategory, string>>>;
  stats?: readonly GlanceStat[];
  note?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-5 text-[var(--color-ink)] sm:p-7">
      <h2 className="text-[length:var(--text-micro)] uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">
        {heading}
      </h2>

      {categories && categories.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {categories.map((category) => (
            <li
              key={category}
              className="rounded-[var(--radius-pill)] bg-[var(--color-ivory)] px-3.5 py-1.5 text-[length:var(--text-small)] font-medium"
            >
              {categoryLabel?.[category] ?? category}
            </li>
          ))}
        </ul>
      ) : null}

      {children}

      {stats && stats.length > 0 ? (
        <dl
          className={`text-[length:var(--text-small)] ${
            categories || children ? 'mt-7 border-t border-[var(--color-hairline)] pt-5' : 'mt-6'
          }`}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex justify-between gap-4 py-1.5">
              <dt className="text-[var(--color-ink-muted)]">{stat.label}</dt>
              <dd className="numeric font-medium">{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {note ? (
        <p className="mt-5 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">{note}</p>
      ) : null}

      <Link
        href={primaryHref}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-5 py-3.5 text-[length:var(--text-small)] font-semibold tracking-[0.02em] text-[var(--color-on-accent)] transition-colors hover:bg-[var(--color-accent-strong)]"
      >
        {primaryLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>

      {secondaryHref && secondaryLabel ? (
        <Link
          href={secondaryHref}
          className="mt-3 block text-center text-[length:var(--text-small)] text-[var(--color-ink-muted)] underline underline-offset-4 hover:text-[var(--color-ink)]"
        >
          {secondaryLabel}
        </Link>
      ) : null}
    </div>
  );
}

/**
 * The two-column opening: prose on the left, the rail on the right.
 *
 * Below `lg` it collapses to one column with the rail between the summary and
 * the prose, so a phone gets the orientation before the text rather than
 * after it.
 */
export function IntroLayout({
  intro,
  aside,
  children,
}: {
  /** The page's H1 and answer-first summary. */
  intro: ReactNode;
  /** The orientation rail. */
  aside: ReactNode;
  /** The opening prose, which the rail sits beside on a wide viewport. */
  children: ReactNode;
}) {
  // The three slots are in reading order in the DOM — heading, rail, prose —
  // so a phone shows the rail immediately under the summary rather than after
  // several hundred words of text. That ordering is the point: the first
  // mobile screenshot of this page was heading-then-wall-of-text, which is
  // what made the phone layout feel like a different site from the desktop one.
  //
  // From `lg` up, explicit row and column placement puts the prose back under
  // the heading and lets the rail span both rows on the right. No duplicated
  // markup, and nothing is hidden at any width.
  // The intro (the full-width hero) spans the row; on wide screens the card
  // is pulled up to overlap the hero's lower edge, and the hero leaves room
  // for it (.intro-with-aside in globals.css). On phones the order is hero,
  // card, prose, with no overlap.
  return (
    <div className="intro-with-aside lg:grid lg:grid-cols-[1.35fr_0.65fr] lg:gap-x-12">
      <div className="lg:col-span-2 lg:row-start-1">{intro}</div>
      <div className="relative z-10 mt-8 lg:col-start-2 lg:row-start-2 lg:-mt-[var(--hero-overlap)]">
        {aside}
      </div>
      <div className="mt-10 lg:col-start-1 lg:row-start-2">{children}</div>
    </div>
  );
}
