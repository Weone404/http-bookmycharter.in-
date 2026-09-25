'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Gauge,
  Plane,
  Search,
  SlidersHorizontal,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { SITE_IMAGES } from '@/data/site-images.generated';
import type { AircraftListItem, FleetClassId } from '@/data/fleet-classes';

type SortKey = 'recommended' | 'seats' | 'range' | 'name';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'recommended', label: 'Recommended' },
  { key: 'seats', label: 'Most seats' },
  { key: 'range', label: 'Longest range' },
  { key: 'name', label: 'Name A–Z' },
];

const CHIP =
  'whitespace-nowrap rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] px-3.5 py-1.5 text-[length:var(--text-small)] font-medium aria-pressed:border-[var(--color-accent)] aria-pressed:bg-[var(--color-accent)] aria-pressed:text-[var(--color-on-accent)]';

/**
 * The fleet browser: every type as an interactive card, filterable by class.
 *
 * Mobile first. On a phone: a sticky bar of class chips, then search and sort,
 * then one card per row. From sm, two cards a row; from lg, a sticky filter
 * panel on the left (checkboxes with counts), and the cards beside it.
 *
 * The whole card opens the aircraft's page (the title link is stretched over
 * the card), and "Get a quote" sits above that layer so it stays its own
 * button. Each card shows what people choose by, in everyday units first:
 * seats, speed in km/h, pilots, and a range bar scaled against the longest
 * range in the list, so "how far can it go" is visible at a glance.
 *
 * Class arrives from the URL (?class=light-jets) so "View all" in the
 * carousel lands pre-filtered. Pictures are the class illustration, not a
 * photograph of the type.
 */
export function AircraftList({
  items,
  classes,
  searchable = false,
}: {
  items: readonly AircraftListItem[];
  classes: readonly { id: FleetClassId; label: string }[];
  searchable?: boolean;
}) {
  const [selected, setSelected] = useState<readonly FleetClassId[]>([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('recommended');

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('class');
    if (wanted && classes.some((c) => c.id === wanted)) setSelected([wanted as FleetClassId]);
  }, [classes]);

  function sync(next: readonly FleetClassId[]) {
    setSelected(next);
    const url = new URL(window.location.href);
    if (next.length === 1 && next[0]) url.searchParams.set('class', next[0]);
    else url.searchParams.delete('class');
    window.history.replaceState(null, '', url);
  }

  const toggle = (id: FleetClassId) =>
    sync(selected.includes(id) ? selected.filter((c) => c !== id) : [...selected, id]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of items) map.set(item.classId, (map.get(item.classId) ?? 0) + 1);
    return map;
  }, [items]);
  const chips = classes.filter((c) => counts.get(c.id));

  const needle = query.trim().toLowerCase();
  const visible = items
    .filter(
      (item) =>
        (selected.length === 0 || selected.includes(item.classId)) &&
        (!needle || item.name.toLowerCase().includes(needle)),
    )
    .slice()
    .sort((a, b) => {
      if (sort === 'seats') return (b.seatsMax ?? 0) - (a.seatsMax ?? 0);
      if (sort === 'range') return (b.rangePct ?? 0) - (a.rangePct ?? 0);
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  const showFilters = chips.length > 1;
  const filtered = selected.length > 0 || needle !== '';
  const clear = () => {
    sync([]);
    setQuery('');
  };

  return (
    <div className={showFilters ? 'lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8' : ''}>
      {/* Desktop: a sticky filter panel. */}
      {showFilters ? (
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-[1.25rem] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-5">
            <p className="font-semibold">Filter by</p>
            <fieldset className="mt-4 border-t border-[var(--color-hairline)] pt-4">
              <legend className="sr-only">Aircraft type</legend>
              <p
                aria-hidden="true"
                className="text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]"
              >
                Aircraft type
              </p>
              <ul className="mt-3 space-y-1">
                {chips.map((chip) => (
                  <li key={chip.id}>
                    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[var(--radius-control)] px-2 py-2 text-[length:var(--text-small)] hover:bg-[var(--color-ivory)]">
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selected.includes(chip.id)}
                          onChange={() => toggle(chip.id)}
                          className="h-4 w-4 accent-[#1f5fd6]"
                        />
                        {chip.label}
                      </span>
                      <span className="numeric text-[var(--color-ink-muted)]">
                        {counts.get(chip.id)}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
            {filtered ? (
              <button
                type="button"
                onClick={clear}
                className="mt-4 inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)] hover:underline"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clear filters
              </button>
            ) : null}
          </div>
        </aside>
      ) : null}

      <div className="min-w-0">
        {/* Phone and tablet: chips stick under the header while scrolling. */}
        {showFilters ? (
          <div className="sticky top-[4.5rem] z-20 -mx-[var(--spacing-gutter)] border-b border-[var(--color-hairline)] bg-[var(--color-ivory)]/95 py-3 backdrop-blur lg:hidden">
            <div className="overflow-x-auto px-[var(--spacing-gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <ul className="flex w-max gap-2" aria-label="Filter by aircraft type">
                <li>
                  <button
                    type="button"
                    aria-pressed={selected.length === 0}
                    onClick={() => sync([])}
                    className={CHIP}
                  >
                    All <span className="numeric ml-1 font-normal">{items.length}</span>
                  </button>
                </li>
                {chips.map((chip) => (
                  <li key={chip.id}>
                    <button
                      type="button"
                      aria-pressed={selected.includes(chip.id)}
                      onClick={() => toggle(chip.id)}
                      className={CHIP}
                    >
                      {chip.label}{' '}
                      <span className="numeric ml-1 font-normal">{counts.get(chip.id)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        <div className="mt-4 flex items-center gap-2 lg:mt-0">
          {searchable ? (
            <label className="relative block min-w-0 flex-1">
              <span className="sr-only">Find an aircraft by name</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-muted)]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search, e.g. Citation"
                className="w-full rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-2.5 pl-9 pr-3 text-[length:var(--text-small)] focus:border-[var(--color-accent-strong)] focus:outline-none"
              />
            </label>
          ) : (
            <span className="flex-1" />
          )}
          <label className="relative flex shrink-0 items-center">
            <span className="sr-only">Sort aircraft</span>
            <SlidersHorizontal
              className="pointer-events-none absolute left-3 h-4 w-4 text-[var(--color-ink-muted)]"
              aria-hidden="true"
            />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="appearance-none rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-2.5 pl-9 pr-4 text-[length:var(--text-small)] font-medium focus:border-[var(--color-accent-strong)] focus:outline-none"
            >
              {SORTS.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p
          className="mt-4 text-[length:var(--text-small)] text-[var(--color-ink-muted)]"
          aria-live="polite"
        >
          Showing {visible.length} of {items.length}. Tap a card for full details.
        </p>

        {visible.length === 0 ? (
          <div className="mt-4 rounded-[1.25rem] border border-dashed border-[var(--color-hairline-strong)] p-8 text-center">
            <p className="font-semibold">No aircraft match.</p>
            <button
              type="button"
              onClick={clear}
              className="mt-3 text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : null}

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5 2xl:grid-cols-3">
          {visible.map((item, index) => (
            <li key={item.slug}>
              <AircraftCard item={item} index={index} />
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
          Figures are typical for each type, not for one specific aircraft, and vary with layout,
          weight, altitude and temperature. Pictures are illustrations, not the listed aircraft.
        </p>
      </div>
    </div>
  );
}

export function AircraftCard({ item, index }: { item: AircraftListItem; index: number }) {
  const image = SITE_IMAGES[item.image];
  const rangeShare = item.rangePct ?? 0;
  const stats = [
    { icon: Users, label: 'Seats', value: item.seats, unit: null },
    { icon: Gauge, label: 'Speed', value: item.speedKmhValue, unit: 'km/h' },
    { icon: UserRound, label: 'Pilots', value: item.crew, unit: null },
  ];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[var(--color-hairline)] bg-[var(--color-surface)] shadow-[0_1px_2px_rgba(11,23,38,0.04)] transition-[transform,box-shadow,border-color] duration-300 ease-out focus-within:border-[var(--color-accent)] hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_22px_45px_-22px_rgba(11,23,38,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-midnight)]">
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(min-width: 1536px) 22rem, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
          style={{
            objectPosition: index % 3 === 1 ? '40% 50%' : index % 3 === 2 ? '60% 50%' : '50% 50%',
            ...(item.mirror ? { transform: 'scaleX(-1)' } : {}),
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,14,24,0.75)_0%,rgba(6,14,24,0)_55%)]"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-white/95 px-2.5 py-1 text-[length:var(--text-micro)] font-semibold text-[#0b1726]">
          <Plane className="h-3.5 w-3.5 text-[#1a4fb5]" aria-hidden="true" />
          {item.classLabel}
        </span>
        {item.seatsMax ? (
          <span className="numeric absolute bottom-3 left-3 text-[length:var(--text-small)] font-semibold text-white">
            Up to {item.seatsMax} passengers
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-[1.125rem] font-semibold leading-snug tracking-tight">
          {/* Stretched link: the whole card opens the aircraft page. */}
          <Link
            href={item.href}
            className="after:absolute after:inset-0 after:z-0 after:content-[''] focus:outline-none group-hover:text-[var(--color-accent-strong)]"
          >
            {item.name}
          </Link>
        </h3>
        {item.blurb ? (
          <p className="mt-1.5 line-clamp-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
            {item.blurb}
          </p>
        ) : null}

        <dl className="mt-4 grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="min-w-0 rounded-[var(--radius-control)] bg-[var(--color-ivory)] px-2.5 py-2"
            >
              <dt className="flex items-center gap-1 text-[length:var(--text-micro)] uppercase tracking-[0.08em] text-[var(--color-ink-muted)]">
                <stat.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {stat.label}
              </dt>
              <dd className="numeric mt-0.5 text-[length:var(--text-small)] font-semibold leading-tight">
                {stat.value ?? '—'}
                {stat.value && stat.unit ? (
                  <span className="block text-[length:var(--text-micro)] font-normal text-[var(--color-ink-muted)]">
                    {stat.unit}
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        {item.rangeKm ? (
          <div className="mt-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-[length:var(--text-micro)]">
              <span className="uppercase tracking-[0.08em] text-[var(--color-ink-muted)]">
                Range
              </span>
              <span className="numeric text-[length:var(--text-small)] font-semibold">
                {item.rangeKm}
                <span className="ml-1 font-normal text-[var(--color-ink-muted)]">
                  ({item.range})
                </span>
              </span>
            </div>
            <div
              className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-ivory-dim)]"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#1f5fd6,#6f9bff)]"
                style={{ width: `${rangeShare}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)]">
            View details
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </span>
          <Link
            href={`/request-a-charter?aircraft=${item.quote}`}
            className="relative z-10 inline-flex items-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-4 py-2 text-[length:var(--text-small)] font-semibold text-[var(--color-on-accent)] hover:bg-[var(--color-accent-strong)]"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * A swipeable row of the same cards, for a page that shows one class of
 * aircraft (every helicopter page). Native horizontal scroll with snapping;
 * the last tile leads to the full list.
 */
export function AircraftRail({
  items,
  viewAllHref,
  viewAllLabel,
}: {
  items: readonly AircraftListItem[];
  viewAllHref: string;
  viewAllLabel: string;
}) {
  return (
    <div className="-mx-[var(--spacing-gutter)]">
      <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--spacing-gutter)] pb-4 pt-1 [scrollbar-width:thin] sm:gap-5">
        {items.map((item, index) => (
          <li
            key={item.slug}
            className="w-[82vw] max-w-[22rem] shrink-0 snap-start scroll-ml-[var(--spacing-gutter)]"
          >
            <AircraftCard item={item} index={index} />
          </li>
        ))}
        <li className="w-[60vw] max-w-[16rem] shrink-0 snap-start">
          <Link
            href={viewAllHref}
            className="flex h-full min-h-[12rem] flex-col items-center justify-center gap-3 rounded-[1.25rem] border border-dashed border-[var(--color-hairline-strong)] bg-[var(--color-surface)] p-6 text-center font-semibold text-[var(--color-accent-strong)] hover:border-[var(--color-accent)]"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-accent)] text-[var(--color-on-accent)]">
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </span>
            {viewAllLabel}
          </Link>
        </li>
      </ul>
    </div>
  );
}
