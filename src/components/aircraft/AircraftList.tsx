'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import type { AircraftListItem, FleetClassId } from '@/data/fleet-classes';

/**
 * The compact aircraft list: every type, one tap to its page.
 *
 * Replaces the wide comparison table, which on a phone showed two columns and
 * hid the rest off-screen. Each row is a card on a phone (name, class, then
 * seats / range / speed in three short cells) and a table-like row from md up,
 * with a header. Filter chips narrow it by class, and the class can arrive in
 * the URL (?class=light-jets) from the carousel's "View all". The full list is
 * server-rendered; filtering only hides rows, so nothing is missing for a
 * crawler or a reader without JavaScript.
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
  const [filter, setFilter] = useState<FleetClassId | 'all'>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('class');
    if (wanted && classes.some((c) => c.id === wanted)) setFilter(wanted as FleetClassId);
  }, [classes]);

  function choose(next: FleetClassId | 'all') {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === 'all') url.searchParams.delete('class');
    else url.searchParams.set('class', next);
    window.history.replaceState(null, '', url);
  }

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of items) map.set(item.classId, (map.get(item.classId) ?? 0) + 1);
    return map;
  }, [items]);

  const needle = query.trim().toLowerCase();
  const visible = (item: AircraftListItem) =>
    (filter === 'all' || item.classId === filter) &&
    (!needle || item.name.toLowerCase().includes(needle));
  const shown = items.filter(visible).length;
  const chips = classes.filter((c) => counts.get(c.id));

  return (
    <div>
      {chips.length > 1 || searchable ? (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {chips.length > 1 ? (
            <div className="-mx-[var(--spacing-gutter)] overflow-x-auto px-[var(--spacing-gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <ul className="flex w-max gap-2" aria-label="Filter by class">
                {[{ id: 'all' as const, label: 'All' }, ...chips].map((chip) => (
                  <li key={chip.id}>
                    <button
                      type="button"
                      aria-pressed={filter === chip.id}
                      onClick={() => choose(chip.id)}
                      className="whitespace-nowrap rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] px-3.5 py-1.5 text-[length:var(--text-small)] font-medium hover:border-[var(--color-accent)] aria-pressed:border-[var(--color-accent)] aria-pressed:bg-[var(--color-accent)] aria-pressed:text-[var(--color-on-accent)]"
                    >
                      {chip.label}
                      <span className="numeric ml-1.5 font-normal">
                        {chip.id === 'all' ? items.length : counts.get(chip.id)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <span />
          )}
          {searchable ? (
            <label className="relative block w-full lg:w-72">
              <span className="sr-only">Find an aircraft by name</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-muted)]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find an aircraft, e.g. Citation"
                className="w-full rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-2.5 pl-9 pr-4 text-[length:var(--text-small)] focus:border-[var(--color-accent-strong)] focus:outline-none"
              />
            </label>
          ) : null}
        </div>
      ) : null}

      <p
        className="mt-4 text-[length:var(--text-small)] text-[var(--color-ink-muted)]"
        aria-live="polite"
      >
        Showing {shown} of {items.length} types. Tap one for its full details.
      </p>

      {/* Column labels, from md up only; on a phone each cell labels itself. */}
      <div
        aria-hidden="true"
        className="mt-3 hidden grid-cols-[2.4fr_0.8fr_1.3fr_1fr_1.5rem] gap-4 border-b border-[var(--color-hairline-strong)] px-4 pb-2 text-[length:var(--text-micro)] uppercase tracking-[0.12em] text-[var(--color-ink-muted)] md:grid"
      >
        <span>Aircraft</span>
        <span>Seats</span>
        <span>Range</span>
        <span>Speed</span>
        <span />
      </div>

      <ul className="mt-3 grid gap-2.5 md:mt-0 md:gap-0">
        {items.map((item) => (
          <li key={item.slug} hidden={!visible(item)}>
            <Link
              href={item.href}
              className="group grid grid-cols-3 items-center gap-x-3 gap-y-3 rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-accent)] md:grid-cols-[2.4fr_0.8fr_1.3fr_1fr_1.5rem] md:gap-4 md:rounded-none md:border-x-0 md:border-t-0 md:bg-transparent md:py-3.5 md:hover:bg-[var(--color-surface)]"
            >
              <span className="col-span-3 flex items-start justify-between gap-3 md:col-span-1 md:block">
                <span>
                  <span className="block font-semibold leading-snug group-hover:text-[var(--color-accent-strong)]">
                    {item.name}
                  </span>
                  <span className="mt-1 inline-block rounded-[var(--radius-pill)] bg-[var(--color-ivory)] px-2 py-0.5 text-[length:var(--text-micro)] font-medium text-[var(--color-ink-muted)]">
                    {item.classLabel}
                  </span>
                </span>
                <ChevronRight
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent-strong)] md:hidden"
                  aria-hidden="true"
                />
              </span>
              {[
                { label: 'Seats', value: item.seats },
                { label: 'Range', value: item.range },
                { label: 'Speed', value: item.speed },
              ].map((cell) => (
                <span key={cell.label} className="min-w-0">
                  <span className="block text-[length:var(--text-micro)] uppercase tracking-[0.1em] text-[var(--color-ink-muted)] md:hidden">
                    {cell.label}
                  </span>
                  <span className="numeric block text-[length:var(--text-small)] font-medium">
                    {cell.value ?? '—'}
                  </span>
                </span>
              ))}
              <ChevronRight
                className="hidden h-5 w-5 text-[var(--color-accent-strong)] transition-transform group-hover:translate-x-0.5 md:block"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
        Typical for each type, not for one specific aircraft. Figures vary with layout, weight,
        altitude and temperature.
      </p>
    </div>
  );
}
