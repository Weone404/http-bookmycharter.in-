'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { AIRPORT_COUNT, searchAirports, type AirportOption } from '@/lib/airport-search';

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
export function AirportField({
  id,
  name,
  label,
  placeholder,
  defaultValue = '',
  tone = 'dark',
  required = true,
}: {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly placeholder: string;
  readonly defaultValue?: string;
  readonly tone?: 'dark' | 'light';
  readonly required?: boolean;
}) {
  const listId = useId();
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchAirports(value), [value]);

  // Close on a click anywhere else. Pointerdown rather than click, so the
  // list is already gone before a click on the page behind it resolves.
  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  function choose(option: AirportOption) {
    setValue(option.label);
    setOpen(false);
    setActive(0);
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
        if (next < 0) return results.length - 1;
        if (next >= results.length) return 0;
        return next;
      });
      return;
    }
    if (event.key === 'Enter' && open) {
      const option = results[active];
      if (option) {
        event.preventDefault();
        choose(option);
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
    ? 'w-full bg-transparent border-b border-white/25 py-3 pr-2 pl-6 text-[var(--color-ink-inverse)] placeholder:text-[var(--color-ink-inverse-muted)] focus:border-[var(--color-cyan-accent)] focus:outline-none'
    : 'w-full rounded-[var(--radius-control)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-3 pr-3 pl-9 text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-cyan-deep)] focus:outline-none';

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
            dark ? 'left-0 text-[var(--color-ink-inverse-muted)]' : 'left-3 text-[var(--color-ink-muted)]'
          }`}
          aria-hidden="true"
        />
        <input
          id={id}
          name={name}
          value={value}
          required={required}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          placeholder={placeholder}
          className={field}
          onChange={(event) => {
            setValue(event.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
      </div>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={`${label} airport suggestions`}
          className="absolute top-full right-0 left-0 z-50 mt-2 max-h-72 overflow-y-auto overscroll-contain rounded-[var(--radius-card)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-1 shadow-[0_18px_40px_-12px_rgba(7,26,43,0.35)]"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
              No match in the {AIRPORT_COUNT} aerodromes listed. You can still type a helipad or
              airstrip by name — we will confirm it.
            </li>
          ) : (
            results.map((option, index) => (
              <li key={option.id} role="none">
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
                    choose(option);
                  }}
                  onMouseEnter={() => setActive(index)}
                  className={`block w-full px-4 py-2.5 text-left ${
                    index === active ? 'bg-[var(--color-ivory)]' : ''
                  }`}
                >
                  <span className="block text-[length:var(--text-small)] font-medium text-[var(--color-ink)]">
                    {option.city}
                    {option.iata ? (
                      <span className="numeric ml-1.5 text-[var(--color-cyan-deep)]">
                        {option.iata}
                      </span>
                    ) : null}
                  </span>
                  <span className="block text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                    {option.name} · {option.state}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}

      <span className="sr-only" aria-live="polite">
        {open ? `${results.length} suggestions` : ''}
      </span>
    </div>
  );
}
