'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  addDays,
  addMonths,
  compareDays,
  formatDay,
  formatDayFull,
  formatMonth,
  monthGrid,
  parseIso,
  sameDay,
  toIso,
  today as getToday,
  type DayParts,
} from '@/lib/date-time';
import { popoverSide, usePopover } from '@/lib/use-popover';

/**
 * A date picker that looks the same in every browser.
 *
 * It replaces `<input type="date">` because the native control cannot be
 * fixed from here. Safari on macOS draws its calendar as a fixed-size system
 * popup — tiny day cells, no way to resize or restyle it — and every other
 * browser draws its own different one, so the most important field on the
 * page looked different, and worse, depending on who was looking.
 *
 * Built to the ARIA date-picker-dialog pattern: the trigger is a real button
 * with aria-haspopup, the calendar is a grid with a roving tabindex, and the
 * keyboard does what a keyboard user expects — arrows move a day or a week,
 * Page Up / Page Down move a month, Home / End go to the start or end of the
 * week, Enter or Space selects, Escape closes and returns focus to the field.
 *
 * Past days are disabled rather than hidden. The value submitted is
 * `YYYY-MM-DD` built from local calendar parts — see lib/date-time for why
 * that matters in India specifically.
 */
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;
const WEEKDAYS_FULL = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export function DateField({
  id,
  name,
  label,
  placeholder = 'Select date',
  defaultValue = '',
  min,
  tone = 'dark',
  error,
  errorPlacement = 'flow',
  onChange,
}: {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly placeholder?: string;
  readonly defaultValue?: string;
  /** Earliest selectable day, `YYYY-MM-DD`. Defaults to today. */
  readonly min?: string;
  readonly tone?: 'dark' | 'light';
  readonly error?: string | undefined;
  /**
   * `overlay` draws the message below the field without taking up space. Use
   * it in a row whose fields are aligned by their bottom edge — the hero form —
   * where an in-flow message lifted this field out of line with its neighbours
   * the moment the error appeared.
   */
  readonly errorPlacement?: 'flow' | 'overlay';
  readonly onChange?: (value: string) => void;
}) {
  const dialogId = useId();
  const errorId = useId();
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  const floor = useMemo(() => (min ? parseIso(min) : null) ?? getToday(), [min]);
  const [value, setValue] = useState<DayParts | null>(() => parseIso(defaultValue));
  const [open, setOpen] = useState(false);
  // The day that has keyboard focus inside the grid, which also decides the
  // month on screen.
  const [cursor, setCursor] = useState<DayParts>(() => parseIso(defaultValue) ?? floor);

  const close = useCallback(() => setOpen(false), []);
  const placement = usePopover({
    open,
    onClose: close,
    anchor: trigger,
    container,
    popover: dialog,
    preferredHeight: 430,
  });

  // A minimum that moves past the current value (the departure date moving
  // after the return date, say) clears it rather than leaving an impossible
  // selection sitting in the field.
  useEffect(() => {
    if (value && compareDays(value, floor) < 0) {
      setValue(null);
      onChange?.('');
    }
  }, [floor, value, onChange]);

  // Move focus into the grid when it opens, and onto the new day as the
  // cursor moves.
  useEffect(() => {
    if (!open) return;
    const node = grid.current?.querySelector<HTMLButtonElement>(`[data-iso="${toIso(cursor)}"]`);
    node?.focus();
  }, [open, cursor]);

  function openAt() {
    setCursor(value ?? floor);
    setOpen(true);
  }

  function choose(day: DayParts) {
    if (compareDays(day, floor) < 0) return;
    setValue(day);
    onChange?.(toIso(day));
    setOpen(false);
    trigger.current?.focus();
  }

  function move(next: DayParts) {
    setCursor(compareDays(next, floor) < 0 ? floor : next);
  }

  function onGridKey(event: React.KeyboardEvent) {
    const weekday = new Date(cursor.year, cursor.month, cursor.day).getDay();
    const keys: Record<string, () => void> = {
      ArrowLeft: () => move(addDays(cursor, -1)),
      ArrowRight: () => move(addDays(cursor, 1)),
      ArrowUp: () => move(addDays(cursor, -7)),
      ArrowDown: () => move(addDays(cursor, 7)),
      PageUp: () => move(addMonths(cursor, -1)),
      PageDown: () => move(addMonths(cursor, 1)),
      Home: () => move(addDays(cursor, -weekday)),
      End: () => move(addDays(cursor, 6 - weekday)),
      Enter: () => choose(cursor),
      ' ': () => choose(cursor),
      Escape: () => {
        setOpen(false);
        trigger.current?.focus();
      },
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  const cells = monthGrid(cursor.year, cursor.month);
  const todayParts = getToday();
  const atFloorMonth = cursor.year === floor.year && cursor.month === floor.month;
  const dark = tone === 'dark';

  const triggerClass = dark
    ? `w-full border-b bg-transparent py-3 pr-2 pl-6 text-left ${
        error ? 'border-[#ff8a80]' : 'border-white/25'
      } focus:border-[var(--color-cyan-accent)] focus:outline-none`
    : `w-full rounded-[var(--radius-control)] border bg-[var(--color-surface)] py-3 pr-3 pl-9 text-left ${
        error ? 'border-[#b3261e]' : 'border-[var(--color-hairline-strong)]'
      } focus:border-[var(--color-cyan-deep)] focus:outline-none`;

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
        <CalendarDays
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
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={dialogId}
          aria-describedby={error ? errorId : undefined}
          onClick={() => (open ? setOpen(false) : openAt())}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' && !open) {
              event.preventDefault();
              openAt();
            }
          }}
          className={triggerClass}
        >
          <span
            className={`numeric ${
              value
                ? dark
                  ? 'text-[var(--color-ink-inverse)]'
                  : 'text-[var(--color-ink)]'
                : dark
                  ? 'text-[var(--color-ink-inverse-muted)]'
                  : 'text-[var(--color-ink-muted)]'
            }`}
          >
            {value ? formatDay(value) : placeholder}
          </span>
        </button>
        <input type="hidden" name={name} value={value ? toIso(value) : ''} />

        {open ? (
          <div
            ref={dialog}
            id={dialogId}
            role="dialog"
            aria-modal="false"
            aria-label={`Choose ${label.toLowerCase()}`}
            style={{ maxHeight: placement.maxHeight }}
            className={`absolute left-0 z-50 w-[min(21rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-[var(--radius-card)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] p-4 text-[var(--color-ink)] shadow-[0_18px_40px_-12px_rgba(7,26,43,0.35)] ${popoverSide(placement)}`}
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => move(addMonths(cursor, -1))}
                disabled={atFloorMonth}
                aria-label="Previous month"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ivory)] disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="text-[length:var(--text-body)] font-semibold" aria-live="polite">
                {formatMonth(cursor.year, cursor.month)}
              </p>
              <button
                type="button"
                onClick={() => move(addMonths(cursor, 1))}
                aria-label="Next month"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ivory)]"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div
              ref={grid}
              role="grid"
              aria-label={formatMonth(cursor.year, cursor.month)}
              onKeyDown={onGridKey}
              className="mt-3"
            >
              <div role="row" className="grid grid-cols-7">
                {WEEKDAYS.map((day, index) => (
                  <span
                    key={day}
                    role="columnheader"
                    aria-label={WEEKDAYS_FULL[index]}
                    className="py-1.5 text-center text-[length:var(--text-micro)] font-medium tracking-wide text-[var(--color-ink-muted)]"
                  >
                    {day}
                  </span>
                ))}
              </div>

              {Array.from({ length: cells.length / 7 }, (_, week) => (
                <div key={week} role="row" className="grid grid-cols-7">
                  {cells.slice(week * 7, week * 7 + 7).map((cell, index) => {
                    if (!cell) {
                      return (
                        <span key={`e${week}-${index}`} role="gridcell" className="h-11 sm:h-10" />
                      );
                    }
                    const past = compareDays(cell, floor) < 0;
                    const selected = sameDay(cell, value);
                    const isToday = sameDay(cell, todayParts);
                    const focused = sameDay(cell, cursor);
                    return (
                      <span
                        key={toIso(cell)}
                        role="gridcell"
                        aria-selected={selected}
                        className="flex justify-center"
                      >
                        <button
                          type="button"
                          data-iso={toIso(cell)}
                          tabIndex={focused ? 0 : -1}
                          disabled={past}
                          aria-current={isToday ? 'date' : undefined}
                          aria-label={formatDayFull(cell)}
                          onClick={() => choose(cell)}
                          className={`numeric flex h-10 w-10 items-center justify-center rounded-full text-[length:var(--text-small)] transition-colors ${
                            selected
                              ? 'bg-[var(--color-midnight)] font-semibold text-[var(--color-ink-inverse)]'
                              : past
                                ? 'cursor-not-allowed text-[var(--color-ink-muted)]/35'
                                : 'text-[var(--color-ink)] hover:bg-[var(--color-ivory-dim)]'
                          } ${isToday && !selected ? 'ring-1 ring-[var(--color-cyan-deep)] ring-inset' : ''}`}
                        >
                          {cell.day}
                        </button>
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Charter is often short notice; these two are the most common
                answers, one tap each. */}
            <div className="mt-2 flex gap-2 border-t border-[var(--color-hairline)] pt-3">
              {[
                { label: 'Today', day: todayParts },
                { label: 'Tomorrow', day: addDays(todayParts, 1) },
              ].map((option) => {
                const disabled = compareDays(option.day, floor) < 0;
                return (
                  <button
                    key={option.label}
                    type="button"
                    disabled={disabled}
                    onClick={() => choose(option.day)}
                    className="rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] px-3.5 py-1.5 text-[length:var(--text-small)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-cyan-deep)] disabled:opacity-35"
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className={`text-[length:var(--text-micro)] ${
            errorPlacement === 'overlay' ? 'absolute top-full left-0 mt-1.5' : 'mt-1.5'
          } ${dark ? 'text-[#ff8a80]' : 'text-[#b3261e]'}`}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
