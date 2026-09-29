'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Home, LocateFixed, MapPin, PenLine, Plane } from 'lucide-react';
import {
  nearestJetAirports,
  optionByLabel,
  searchAirports,
  type AirportOption,
} from '@/lib/airport-search';
import { findPlaces, type Place } from '@/lib/place-lookup';
import { popoverSide, usePopover } from '@/lib/use-popover';

/**
 * The departure / arrival field.
 *
 * A combobox, not a select. The reference implementation uses a closed
 * dropdown of every airport in alphabetical order, which means finding Delhi
 * is a scroll rather than three keystrokes — and it also means anything not on
 * the list cannot be requested at all. That second part matters more than it
 * looks: a large share of charter movements are to helipads, airstrips and
 * private fields that appear in no scheduled-airport list. So this filters as
 * you type, ranks the obvious answer first, and still accepts free text.
 *
 * Built to the ARIA combobox pattern rather than to a div that looks like one:
 * `role="combobox"` on the input, `aria-expanded`, `aria-controls`,
 * `aria-activedescendant`, arrow keys, Enter, Escape, and a live count for
 * screen readers. Every part of it works without a mouse.
 */
/** Height of the list when there is room for it: about six suggestions. */
const PREFERRED_HEIGHT = 288;

export function AirportField({
  id,
  name,
  label,
  placeholder,
  defaultValue = '',
  tone = 'dark',
  required = true,
  mode = 'any',
  onResolve,
}: {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly placeholder: string;
  readonly defaultValue?: string;
  readonly tone?: 'dark' | 'light';
  readonly required?: boolean;
  /**
   * 'helicopter': a helicopter needs no airport, so the field leads with
   * "use my current location" and "use this place as typed", and the
   * placeholder says any place works. The site is checked before a quote.
   */
  readonly mode?: 'any' | 'helicopter';
  /**
   * Called whenever the value changes, with its position when known (an
   * airport, a picked locality or the device location), so the form can
   * show the distance and flying time as soon as both ends are known.
   */
  readonly onResolve?: (value: {
    label: string;
    lat: number | null;
    lon: number | null;
    note?: string | null;
  }) => void;
}) {
  const listId = useId();
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState<string | null>(null);
  const helicopter = mode === 'helicopter';
  /** A line under the field explaining a suggestion that was picked. */
  const [hint, setHint] = useState<string | null>(null);
  /** Localities and pincodes matching the text (India Post data). */
  const [places, setPlaces] = useState<Place[]>([]);
  const [placeFor, setPlaceFor] = useState('');

  const typedNow = value.trim();
  const isAirport = useMemo(() => Boolean(optionByLabel(value)), [value]);
  const lookPlaces = typedNow.length >= 3 && !isAirport && !typedNow.startsWith('My location');
  useEffect(() => {
    if (!lookPlaces) return;
    let live = true;
    const timer = setTimeout(() => {
      void findPlaces(typedNow, 5).then((found) => {
        if (!live) return;
        setPlaces(found);
        setPlaceFor(typedNow);
      });
    }, 140);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [typedNow, lookPlaces]);
  const shownPlaces = useMemo(
    () => (lookPlaces && placeFor === typedNow ? places : []),
    [lookPlaces, placeFor, typedNow, places],
  );

  const results = useMemo(
    () => searchAirports(value, helicopter ? 4 : shownPlaces.length ? 5 : 10),
    [value, helicopter, shownPlaces.length],
  );

  // For jets and turboprops, a locality or pincode becomes "the nearest
  // airports to it": two for the best match, one for the next two.
  const near = useMemo(() => {
    if (helicopter) return [];
    const out: { place: Place; option: AirportOption; km: number }[] = [];
    const seenPins = new Set<string>();
    const seenAirports = new Set<string>();
    for (const p of shownPlaces) {
      if (p.lat === null || p.lon === null || seenPins.has(p.pin)) continue;
      seenPins.add(p.pin);
      // A second place only earns a row if it points to a different airport.
      const n = nearestJetAirports(p.lat, p.lon, out.length === 0 ? 2 : 3).filter(
        (x) => !seenAirports.has(x.option.id),
      );
      for (const x of n.slice(0, out.length === 0 ? 2 : 1)) {
        seenAirports.add(x.option.id);
        out.push({ place: p, ...x });
      }
      if (out.length >= 4) break;
    }
    return out;
  }, [helicopter, shownPlaces]);

  // Extra rows around the airports. "Use as typed" appears once something is
  // typed that is not an airport already chosen, because a helipad, venue or
  // farm is a valid place to ask for. It goes first only when no airport
  // matches, so "Delh" + Enter still picks Delhi. Helicopter mode adds "use my
  // current location" at the top of an empty field.
  const typed = value.trim();
  const exact = results.some((r) => r.label === value);
  type Row =
    | { kind: 'gps' }
    | { kind: 'custom'; text: string }
    | { kind: 'airport'; option: AirportOption }
    | { kind: 'near'; place: Place; option: AirportOption; km: number }
    | { kind: 'place'; place: Place };
  const airportRows = results.map((option) => ({ kind: 'airport' as const, option }));
  const nearRows = near.map((n) => ({ kind: 'near' as const, ...n }));
  const placeRows = helicopter ? shownPlaces.map((place) => ({ kind: 'place' as const, place })) : [];
  const customRow = typed.length >= 2 && !exact ? [{ kind: 'custom' as const, text: typed }] : [];
  const rows: Row[] = [
    ...(!typed ? [{ kind: 'gps' as const }] : []),
    // A place name that is not an airport leads with its area suggestions.
    ...(results.length === 0 ? [...placeRows, ...nearRows] : []),
    ...(results.length === 0 && placeRows.length === 0 && nearRows.length === 0 ? customRow : []),
    ...airportRows,
    ...(results.length > 0 ? [...placeRows, ...nearRows] : []),
    ...(results.length > 0 || placeRows.length > 0 || nearRows.length > 0 ? customRow : []),
  ];
  const shownPlaceholder = helicopter ? 'Area, pincode, helipad or any place' : placeholder;

  const close = useCallback(() => setOpen(false), []);
  // Flip-when-cramped and close-on-outside-pointer live in one shared hook,
  // so the airport list, the calendar and the time list behave identically.
  const placement = usePopover({
    open,
    onClose: close,
    anchor: input,
    container: wrapper,
    popover: list,
    preferredHeight: PREFERRED_HEIGHT,
  });

  function set(label: string, lat: number | null, lon: number | null, note: string | null = null) {
    setValue(label);
    setHint(note);
    setOpen(false);
    setActive(0);
    onResolve?.({ label, lat, lon, note });
  }

  function choose(option: AirportOption, note: string | null = null) {
    set(option.label, option.lat, option.lon, note);
  }

  function acceptTyped(text: string) {
    set(text, null, null);
  }

  function locate() {
    setOpen(false);
    if (!('geolocation' in navigator)) {
      setLocateError('Location is not available on this device. Type the place instead.');
      return;
    }
    setLocating(true);
    setLocateError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        const { latitude, longitude } = position.coords;
        if (helicopter) {
          set(`My location (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`, latitude, longitude);
          return;
        }
        // A jet needs an airport: pick the nearest one to where they are.
        const nearest = nearestJetAirports(latitude, longitude, 1)[0];
        if (nearest) choose(nearest.option, `Nearest airport to you, about ${Math.round(nearest.km)} km away.`);
        else setLocateError('No airport found near you. Type the city instead.');
      },
      () => {
        setLocating(false);
        setLocateError('Could not get your location. Type the place instead.');
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function pick(row: Row | undefined) {
    if (!row) return;
    if (row.kind === 'gps') locate();
    else if (row.kind === 'custom') acceptTyped(row.text);
    else if (row.kind === 'near')
      choose(
        row.option,
        `Nearest airport to ${/^\d/.test(typed) ? `${row.place.pin}, ${row.place.district}` : `${row.place.name}, ${row.place.pin}`}: about ${Math.round(row.km)} km.`,
      );
    else if (row.kind === 'place') set(row.place.label, row.place.lat, row.place.lon, 'We confirm the exact landing site near this area.');
    else choose(row.option);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const step = event.key === 'ArrowDown' ? 1 : -1;
      setActive((current) => {
        const next = current + step;
        if (next < 0) return rows.length - 1;
        if (next >= rows.length) return 0;
        return next;
      });
      return;
    }
    if (event.key === 'Enter' && open) {
      const row = rows[active];
      if (row) {
        event.preventDefault();
        pick(row);
      }
      return;
    }
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  const dark = tone === 'dark';
  const field = dark
    ? 'w-full bg-transparent border-b border-white/25 py-3 pr-2 pl-6 text-[var(--color-ink-inverse)] placeholder:text-[var(--color-ink-inverse-muted)] focus:border-[var(--color-accent)] focus:outline-none'
    : 'w-full rounded-[var(--radius-control)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-3 pr-3 pl-9 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-accent-strong)] focus:outline-none';

  return (
    <div ref={wrapper} className="relative">
      <label
        htmlFor={id}
        className={`block text-[length:var(--text-micro)] tracking-[0.14em] uppercase ${
          dark ? 'text-[var(--color-ink-inverse-muted)]' : 'text-[var(--color-ink-muted)]'
        }`}
      >
        {label}
      </label>

      <div className="relative">
        <MapPin
          className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 ${
            dark
              ? 'left-0 text-[var(--color-ink-inverse-muted)]'
              : 'left-3 text-[var(--color-ink-muted)]'
          }`}
          aria-hidden="true"
        />
        <input
          ref={input}
          id={id}
          name={name}
          value={value}
          required={required}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && rows[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          placeholder={locating ? 'Finding your location…' : shownPlaceholder}
          className={field}
          onChange={(event) => {
            setLocateError(null);
            setHint(null);
            setValue(event.target.value);
            onResolve?.({ label: event.target.value, lat: null, lon: null });
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />

        {open ? (
          <ul
            ref={list}
            id={listId}
            role="listbox"
            aria-label={`${label} suggestions`}
            style={{ maxHeight: placement.maxHeight }}
            className={`popover-light absolute right-0 left-0 z-50 min-w-[min(22rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-[var(--radius-card)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-1 shadow-[0_18px_40px_-12px_rgba(7,26,43,0.35)] ${popoverSide(
              placement,
            )}`}
          >
            {rows.length === 0 ? (
              <li className="px-4 py-3 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                Type a city, airport, pincode or area. A helipad or airstrip can be typed by name.
              </li>
            ) : (
              rows.map((row, index) => (
                <li
                  key={
                    row.kind === 'airport'
                      ? row.option.id
                      : row.kind === 'near'
                        ? `near-${row.place.pin}-${row.option.id}`
                        : row.kind === 'place'
                          ? `place-${row.place.pin}-${row.place.name}`
                          : row.kind
                  }
                  role="none"
                >
                  <button
                    type="button"
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={index === active}
                    tabIndex={-1}
                    onPointerDown={(event) => {
                      // Before blur, so the click is not lost to the field
                      // closing underneath it.
                      event.preventDefault();
                      pick(row);
                    }}
                    onMouseEnter={() => setActive(index)}
                    className={`flex w-full items-start gap-3 px-4 py-2.5 text-left ${
                      index === active ? 'bg-[var(--color-ivory)]' : ''
                    }`}
                  >
                    {row.kind === 'near' ? (
                      <>
                        <Plane className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-strong)]" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block text-[length:var(--text-small)] font-semibold text-[var(--color-ink)]">
                            {row.option.city}
                            {row.option.iata ? (
                              <span className="numeric ml-1.5 font-semibold text-[var(--color-accent-strong)]">
                                {row.option.iata}
                              </span>
                            ) : null}
                            <span className="numeric ml-2 rounded-[var(--radius-pill)] bg-[var(--color-ivory-dim)] px-2 py-0.5 text-[length:var(--text-micro)] font-medium text-[var(--color-ink-muted)]">
                              {Math.round(row.km)} km
                            </span>
                          </span>
                          <span className="block text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                            {/^\d/.test(typed)
                              ? `Nearest airport to ${row.place.pin}, ${row.place.district}`
                              : `Nearest airport to ${row.place.name}, ${row.place.pin}`}
                          </span>
                        </span>
                      </>
                    ) : row.kind === 'place' ? (
                      <>
                        <Home className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-strong)]" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block text-[length:var(--text-small)] font-semibold text-[var(--color-ink)]">
                            {row.place.name}
                            <span className="numeric ml-2 rounded-[var(--radius-pill)] bg-[var(--color-ivory-dim)] px-2 py-0.5 text-[length:var(--text-micro)] font-medium text-[var(--color-ink-muted)]">
                              {row.place.pin}
                            </span>
                          </span>
                          <span className="block text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                            {row.place.district}, {row.place.state} · helicopter pick-up area
                          </span>
                        </span>
                      </>
                    ) : row.kind === 'airport' ? (
                      <span className="min-w-0">
                        <span className="block text-[length:var(--text-small)] font-semibold text-[var(--color-ink)]">
                          {row.option.city}
                          {row.option.iata ? (
                            <span className="numeric ml-1.5 font-semibold text-[var(--color-accent-strong)]">
                              {row.option.iata}
                            </span>
                          ) : null}
                        </span>
                        <span className="block text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                          {row.option.name} · {row.option.state}
                        </span>
                      </span>
                    ) : (
                      <>
                        {row.kind === 'gps' ? (
                          <LocateFixed
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-strong)]"
                            aria-hidden="true"
                          />
                        ) : (
                          <PenLine
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-strong)]"
                            aria-hidden="true"
                          />
                        )}
                        <span className="min-w-0">
                          <span className="block text-[length:var(--text-small)] font-semibold text-[var(--color-ink)]">
                            {row.kind === 'gps'
                              ? helicopter
                                ? 'Use my current location'
                                : 'Nearest airport to me'
                              : `Use “${row.text}”`}
                          </span>
                          <span className="block text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                            {row.kind === 'gps'
                              ? helicopter
                                ? 'Pick-up from where you are now'
                                : 'Uses your location once to find the closest airport'
                              : helicopter
                                ? 'A helipad, venue, farm or open ground. We check the site first.'
                                : 'A helipad, airstrip or place not on the list. We will confirm it.'}
                          </span>
                        </span>
                      </>
                    )}
                  </button>
                </li>
              ))
            )}
          </ul>
        ) : null}
      </div>

      {/* A form that takes onResolve shows the note itself, in its own row. */}
      {hint && !locateError && !onResolve ? (
        <p
          className={`mt-1.5 text-[length:var(--text-micro)] ${
            dark ? 'text-[var(--color-ink-inverse-muted)]' : 'text-[var(--color-ink-muted)]'
          }`}
        >
          {hint}
        </p>
      ) : null}
      {locateError ? (
        <p
          className={`mt-1.5 text-[length:var(--text-micro)] ${
            dark ? 'text-[#ffb4a8]' : 'text-[#b42318]'
          }`}
        >
          {locateError}
        </p>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {open ? `${rows.length} suggestions` : locating ? 'Finding your location' : ''}
      </span>
    </div>
  );
}
