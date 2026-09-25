'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Clock } from 'lucide-react';
import { TIME_SLOTS, formatSlot, parseIso, slotMinutes, toIso, today } from '@/lib/date-time';
import { popoverSide, usePopover } from '@/lib/use-popover';

/**
 * Departure time as a list of quarter hours.
 *
 * It replaces `<input type="time">` because Safari on macOS gives that control
 * no picker at all — the only way in is to click the hours, type, tab to the
 * minutes, type, and then find the AM/PM segment. Nobody discovers that, and
 * the field reads as broken.
 *
 * Built to the ARIA select-only combobox pattern: the trigger is a real button
 * with role="combobox", the list is a listbox driven by aria-activedescendant,
 * and arrows, Home, End, Enter, Space and Escape all work without a mouse. On
 * open the list scrolls to the current choice, or to 9 AM if there is none,
 * rather than starting at midnight.
 *
 * The first option is "Flexible", because the time is genuinely optional — an
 * undecided traveller should be able to say so rather than being made to pick
 * an hour they do not mean. When the chosen date is today, slots that have
 * already passed are disabled.
 */
const FLEXIBLE = '';
const DEFAULT_ANCHOR = '09:00';

export function TimeField({
  id,
  name,
  label = 'Time',
  defaultValue = '',
  date = '',
  tone = 'dark',
  error,
}: {
  readonly id: string;
  readonly name: string;
  readonly label?: string;
  readonly defaultValue?: string;
  /** The selected departure date, `YYYY-MM-DD`, so past slots today can be disabled. */
  readonly date?: string;
  readonly tone?: 'dark' | 'light';
  readonly error?: string | undefined;
}) {
  const listId = useId();
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const options = useMemo(() => [FLEXIBLE, ...TIME_SLOTS], []);
  const [value, setValue] = useState(TIME_SLOTS.includes(defaultValue) ? defaultValue : FLEXIBLE);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const placement = usePopover({
    open,
    onClose: close,
    anchor: trigger,
    container,
    popover: list,
    preferredHeight: 320,
  });

  // Slots earlier than now are not offered for a same-day departure. Worked
  // out on every render rather than memoised — it is one Date call — so a
  // page left open past a slot catches up the next time the list opens.
  const pastCutoff = (() => {
    const picked = parseIso(date);
    if (!picked || toIso(picked) !== toIso(today())) return -1;
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  })();

  const isDisabled = useCallback(
    (slot: string) => slot !== FLEXIBLE && pastCutoff >= 0 && slotMinutes(slot) <= pastCutoff,
    [pastCutoff],
  );

  // A date change that makes the chosen time impossible clears it.
  useEffect(() => {
    if (value !== FLEXIBLE && isDisabled(value)) setValue(FLEXIBLE);
  }, [isDisabled, value]);

  // Keep the active option in view as it moves — by scrolling the LIST, never
  // the page. The first version used scrollIntoView, which scrolls every
  // scrollable ancestor: opening the time list jerked the whole page upward,
  // and the rows sliding under a resting cursor then stole the highlight.
  useEffect(() => {
    if (!open) return;
    const box = list.current;
    const node = box?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if (!box || !node) return;
    if (node.offsetTop < box.scrollTop) box.scrollTop = node.offsetTop;
    else if (node.offsetTop + node.offsetHeight > box.scrollTop + box.clientHeight) {
      box.scrollTop = node.offsetTop + node.offsetHeight - box.clientHeight;
    }
  }, [open, active]);

  function openList() {
    const current = options.indexOf(value);
    let start = value === FLEXIBLE ? options.indexOf(DEFAULT_ANCHOR) : current;
    // Skip forward past slots that have already gone today.
    while (start < options.length - 1 && isDisabled(options[start] ?? '')) start++;
    setActive(start < 0 ? 0 : start);
    setOpen(true);
    // Centre the starting point once, on open, inside the list only.
    requestAnimationFrame(() => {
      const box = list.current;
      const node = box?.querySelector<HTMLElement>(`[data-index="${start}"]`);
      if (box && node) {
        box.scrollTop = node.offsetTop - box.clientHeight / 2 + node.offsetHeight / 2;
      }
    });
  }

  function choose(index: number) {
    const slot = options[index];
    if (slot === undefined || isDisabled(slot)) return;
    setValue(slot);
    setOpen(false);
    trigger.current?.focus();
  }

  function step(from: number, delta: number): number {
    let next = from;
    for (let i = 0; i < options.length; i++) {
      next = Math.min(options.length - 1, Math.max(0, next + delta));
      if (!isDisabled(options[next] ?? '')) return next;
      if (next === 0 || next === options.length - 1) break;
    }
    return from;
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openList();
      }
      return;
    }
    const keys: Record<string, () => void> = {
      ArrowDown: () => setActive((i) => step(i, 1)),
      ArrowUp: () => setActive((i) => step(i, -1)),
      PageDown: () => setActive((i) => step(i, 4)),
      PageUp: () => setActive((i) => step(i, -4)),
      Home: () => setActive(0),
      End: () => setActive(step(options.length, -1)),
      Enter: () => choose(active),
      ' ': () => choose(active),
      Escape: () => setOpen(false),
      Tab: () => setOpen(false),
    };
    const action = keys[event.key];
    if (action) {
      if (event.key !== 'Tab') event.preventDefault();
      action();
    }
  }

  const dark = tone === 'dark';
  const triggerClass = dark
    ? `w-full border-b bg-transparent py-3 pr-2 pl-6 text-left ${
        error ? 'border-[#ff8a80]' : 'border-white/25'
      } focus:border-[var(--color-accent)] focus:outline-none`
    : `w-full rounded-[var(--radius-control)] border bg-[var(--color-surface)] py-3 pr-3 pl-9 text-left ${
        error ? 'border-[#b3261e]' : 'border-[var(--color-hairline-strong)]'
      } focus:border-[var(--color-accent-strong)] focus:outline-none`;

  const shown = value === FLEXIBLE ? 'Flexible' : formatSlot(value);

  return (
    <div ref={container} className="relative">
      <label
        htmlFor={id}
        className={`block text-[length:var(--text-micro)] tracking-[0.14em] uppercase ${
          dark ? 'text-[var(--color-ink-inverse-muted)]' : 'text-[var(--color-ink-muted)]'
        }`}
      >
        {label}
      </label>

      <div className="relative">
        <Clock
          className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 ${
            dark
              ? 'left-0 text-[var(--color-ink-inverse-muted)]'
              : 'left-3 text-[var(--color-ink-muted)]'
          }`}
          aria-hidden="true"
        />
        <button
          ref={trigger}
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open ? `${listId}-${active}` : undefined}
          aria-invalid={error ? true : undefined}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onKeyDown}
          className={triggerClass}
        >
          <span
            className={`numeric ${
              value === FLEXIBLE
                ? dark
                  ? 'text-[var(--color-ink-inverse-muted)]'
                  : 'text-[var(--color-ink-muted)]'
                : dark
                  ? 'text-[var(--color-ink-inverse)]'
                  : 'text-[var(--color-ink)]'
            }`}
          >
            {shown}
          </span>
        </button>
        <input type="hidden" name={name} value={value} />

        {open ? (
          <ul
            ref={list}
            id={listId}
            role="listbox"
            aria-label={`${label} options`}
            style={{ maxHeight: placement.maxHeight }}
            className={`popover-light absolute left-0 z-50 w-full min-w-[11rem] overflow-y-auto overscroll-contain rounded-[var(--radius-card)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] py-1 shadow-[0_18px_40px_-12px_rgba(7,26,43,0.35)] ${popoverSide(placement)}`}
          >
            {options.map((slot, index) => {
              const disabled = isDisabled(slot);
              const selected = slot === value;
              return (
                <li
                  key={slot || 'flexible'}
                  id={`${listId}-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={disabled || undefined}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    choose(index);
                  }}
                  onMouseEnter={() => !disabled && setActive(index)}
                  className={`numeric flex cursor-pointer items-center justify-between px-4 py-2.5 text-[length:var(--text-small)] ${
                    disabled
                      ? 'cursor-not-allowed text-[var(--color-ink-muted)]/35'
                      : selected
                        ? 'font-semibold text-[var(--color-ink)]'
                        : 'text-[var(--color-ink)]'
                  } ${index === active && !disabled ? 'bg-[var(--color-ivory)]' : ''} ${
                    slot === FLEXIBLE ? 'border-b border-[var(--color-hairline)]' : ''
                  }`}
                >
                  <span>{slot === FLEXIBLE ? 'Flexible — decide later' : formatSlot(slot)}</span>
                  {selected ? (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-strong)]"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      {error ? (
        <p
          role="alert"
          className={`mt-1.5 text-[length:var(--text-micro)] ${dark ? 'text-[#ff8a80]' : 'text-[#b3261e]'}`}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
