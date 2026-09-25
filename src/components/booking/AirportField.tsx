'use client';

import { useCallback, useId, useMemo, useRef, useState } from 'react';
import { LocateFixed, MapPin, PenLine } from 'lucide-react';
import { searchAirports, type AirportOption } from '@/lib/airport-search';
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
  const results = useMemo(() => searchAirports(value, helicopter ? 6 : 10), [value, helicopter]);

  // Extra rows around the airports. "Use as typed" appears once something is
  // typed that is not an airport already chosen, because a helipad, venue or
  // farm is a valid place to ask for. It goes first only when no airport
  // matches, so "Delh" + Enter still picks Delhi. Helicopter mode adds "use my
  // current location" at the top of an empty field.
  const typed = value.trim();
  const exact = results.some((r) => r.label === value);
  type Row =
    { kind: 'gps' } | { kind: 'custom'; text: string } | { kind: 'airport'; option: AirportOption };
  const rows: Row[] = [
    ...(helicopter && !typed ? [{ kind: 'gps' as const }] : []),
    ...(typed.length >= 2 && !exact && results.length === 0
      ? [{ kind: 'custom' as const, text: typed }]
      : []),
    ...results.map((option) => ({ kind: 'airport' as const, option })),
    ...(typed.length >= 2 && !exact && results.length > 0
      ? [{ kind: 'custom' as const, text: typed }]
      : []),
  ];
  const shownPlaceholder = helicopter ? 'City, helipad or any place' : placeholder;

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

  function choose(option: AirportOption) {
    setValue(option.label);
    setOpen(false);
    setActive(0);
  }

  function acceptTyped(text: string) {
    setValue(text);
    setOpen(false);
    setActive(0);
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
        setValue(`My location (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`);
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
            setValue(event.target.value);
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
                Start typing a city, airport or code. A helipad or airstrip can be typed by name.
              </li>
            ) : (
              rows.map((row, index) => (
                <li key={row.kind === 'airport' ? row.option.id : row.kind} role="none">
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
                    {row.kind === 'airport' ? (
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
                            {row.kind === 'gps' ? 'Use my current location' : `Use “${row.text}”`}
                          </span>
                          <span className="block text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                            {row.kind === 'gps'
                              ? 'Pick-up from where you are now'
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
