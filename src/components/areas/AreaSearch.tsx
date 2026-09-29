'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { LocateFixed, MapPin, Search } from 'lucide-react';

/**
 * Find any pincode or locality in India and jump to its district page.
 *
 * The index is split into small static files under /area-search (built by
 * scripts/build-areas.mjs), fetched only for what is typed: three digits of a
 * pincode, or the first two letters of a place name.
 */
type DistrictRow = [stateSlug: string, districtSlug: string, district: string, state: string];
type PinBucket = Record<string, [number, ...string[]]>;
type NameRow = [name: string, pin: string, districtId: number, slug: string];

interface Result {
  readonly key: string;
  readonly title: string;
  readonly pin: string;
  readonly detail: string;
  readonly href: string;
}

const files = new Map<string, Promise<unknown>>();
function load<T>(path: string): Promise<T | null> {
  if (!files.has(path)) {
    files.set(
      path,
      fetch(path)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    );
  }
  return files.get(path) as Promise<T | null>;
}
const norm = (t: string) => t.toUpperCase().replace(/[^A-Z0-9]/g, '');

async function find(query: string): Promise<Result[]> {
  const q = query.trim();
  const districts = await load<DistrictRow[]>('/area-search/districts.json');
  if (!districts) return [];
  const where = (id: number) => districts[id];

  if (/^\d{3,6}$/.test(q)) {
    const bucket = await load<PinBucket>(`/area-search/pin/${q.slice(0, 3)}.json`);
    if (!bucket) return [];
    return Object.entries(bucket)
      .filter(([pin]) => pin.startsWith(q))
      .slice(0, 12)
      .flatMap(([pin, [id, ...areas]]) => {
        const d = where(id);
        if (!d) return [];
        const shown = areas.slice(0, 4).join(', ');
        return [
          {
            key: pin,
            title: `${pin} · ${d[2]}`,
            pin,
            detail: `${shown}${areas.length > 4 ? ` and ${areas.length - 4} more` : ''} · ${d[3]}`,
            href: `/charter/${d[0]}/${d[1]}/${pin}`,
          },
        ];
      });
  }

  const k = norm(q);
  if (k.length < 2 || /^\d/.test(k)) return [];
  const rows = await load<NameRow[]>(`/area-search/name/${k.slice(0, 2).toLowerCase()}.json`);
  if (!rows) return [];
  const starts = rows.filter((r) => norm(r[0]).startsWith(k));
  const inside = starts.length < 12 ? rows.filter((r) => !norm(r[0]).startsWith(k) && norm(r[0]).includes(k)) : [];
  return [...starts, ...inside].slice(0, 12).flatMap(([name, pin, id, slug]) => {
    const d = where(id);
    if (!d) return [];
    return [
      {
        key: `${name}-${pin}`,
        title: name,
        pin,
        detail: `${d[2]}, ${d[3]}`,
        href: `/charter/${d[0]}/${d[1]}/${pin}/${slug}`,
      },
    ];
  });
}

type PinGeo = [pin: string, districtId: number, lat: number, lon: number];

/** The pincode nearest to the visitor, from the browser's location (asked for on tap only). */
function locate(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) return reject(new Error('Location is not available in this browser.'));
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const [pins, districts] = await Promise.all([
          load<PinGeo[]>('/area-search/pins-geo.json'),
          load<DistrictRow[]>('/area-search/districts.json'),
        ]);
        if (!pins || !districts) return reject(new Error('Could not load the pincode list.'));
        const cos = Math.cos((coords.latitude * Math.PI) / 180);
        let best: PinGeo | undefined;
        let bestD = Infinity;
        for (const p of pins) {
          const dLat = p[2] - coords.latitude;
          const dLon = (p[3] - coords.longitude) * cos;
          const dist = dLat * dLat + dLon * dLon;
          if (dist < bestD) {
            bestD = dist;
            best = p;
          }
        }
        const d = best ? districts[best[1]] : undefined;
        // About 1° of latitude is 111 km; beyond ~100 km the visitor is not in India.
        if (!best || !d || Math.sqrt(bestD) > 0.9) return reject(new Error('Your location looks to be outside India.'));
        resolve(`/charter/${d[0]}/${d[1]}/${best[0]}`);
      },
      () => reject(new Error('Location permission was not given. Type your pincode instead.')),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    );
  });
}

export function AreaSearch({ label = 'Find your area' }: { label?: string }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [searched, setSearched] = useState(false);
  const [active, setActive] = useState(-1);
  const id = useId();
  const listId = `${id}-list`;
  const latest = useRef('');
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState('');

  useEffect(() => {
    const q = query.trim();
    latest.current = q;
    if (q.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    const timer = setTimeout(() => {
      void find(q).then((r) => {
        if (latest.current !== q) return;
        setResults(r);
        setSearched(true);
        setActive(-1);
      });
    }, 120);
    return () => clearTimeout(timer);
  }, [query]);

  const open = query.trim().length >= 2 && searched;

  return (
    <div className="relative">
      <label htmlFor={id} className="text-[length:var(--text-micro)] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-inverse-muted)]">
        {label}
      </label>
      <div className="mt-3 flex scroll-mt-24 items-center gap-3 rounded-[var(--radius-pill)] border border-white/15 bg-white px-5 py-3.5 text-[#0b1726] shadow-[0_12px_40px_rgba(0,0,0,0.25)] focus-within:ring-2 focus-within:ring-[var(--color-accent)]">
        <Search className="h-5 w-5 shrink-0 text-[#4a5566]" aria-hidden="true" />
        <input
          id={id}
          type="search"
          inputMode="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={(e) => {
            // On a phone the keyboard covers the results; lift the box to the top.
            if (window.innerWidth < 768) e.currentTarget.parentElement?.scrollIntoView({ block: 'start', behavior: 'smooth' });
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === 'Enter') {
              const pick = results[active >= 0 ? active : 0];
              if (pick) window.location.assign(pick.href);
            }
          }}
          placeholder="Pincode or area name"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          {...(active >= 0 ? { 'aria-activedescendant': `${listId}-${active}` } : {})}
          className="min-w-0 flex-1 bg-transparent text-[1rem] text-[#0b1726] outline-none placeholder:text-[#5b6675] focus:outline-none"
        />
      </div>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="mt-2 max-h-[min(26rem,60vh)] overflow-y-auto rounded-[var(--radius-card)] border border-[#dfe4ec] bg-white p-2 text-[#0b1726] shadow-[0_24px_60px_rgba(0,0,0,0.3)]"
        >
          {results.length === 0 ? (
            <li className="px-3 py-3 text-[length:var(--text-small)] text-[#4a5566]">
              No match. Try the 6-digit pincode, or the first word of the area.
            </li>
          ) : (
            results.map((r, i) => (
              <li key={r.key} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                <Link
                  href={r.href}
                  className={`flex items-start gap-3 rounded-[calc(var(--radius-card)-4px)] px-3 py-2.5 hover:bg-[#eef3fb] ${
                    i === active ? 'bg-[#eef3fb]' : ''
                  }`}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1a4fb5]" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block font-semibold leading-snug text-[#0b1726]">
                      {r.title}{' '}
                      {r.title.startsWith(r.pin) ? null : (
                        <span className="numeric ml-1 rounded-[var(--radius-pill)] bg-[#eef1f5] px-2 py-0.5 text-[length:var(--text-micro)] font-medium text-[#3d4757]">
                          {r.pin}
                        </span>
                      )}
                    </span>
                    <span className="block text-[length:var(--text-small)] text-[#4a5566]">{r.detail}</span>
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}
      <button
        type="button"
        onClick={() => {
          setLocError('');
          setLocating(true);
          locate()
            .then((href) => window.location.assign(href))
            .catch((e: Error) => setLocError(e.message))
            .finally(() => setLocating(false));
        }}
        className="mt-3 inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-white/25 px-4 py-2 text-[length:var(--text-small)] font-semibold text-[var(--color-ink-inverse)] transition-colors hover:border-white/60 disabled:opacity-60"
        disabled={locating}
      >
        <LocateFixed className="h-4 w-4" aria-hidden="true" />
        {locating ? 'Finding your pincode…' : 'Use my current location'}
      </button>
      {locError ? (
        <p role="status" className="mt-2 text-[length:var(--text-small)] text-[var(--color-ink-inverse-muted)]">
          {locError}
        </p>
      ) : null}
    </div>
  );
}
