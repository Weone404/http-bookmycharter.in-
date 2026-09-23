/**
 * Local-calendar date and time helpers for the booking form.
 *
 * Every function here works in LOCAL calendar components — year, month, day —
 * and none of them goes through `toISOString()`. That is the whole reason this
 * file exists. `new Date(2026, 8, 23).toISOString()` in India is
 * "2026-09-22T18:30:00.000Z": midnight IST is still the previous day in UTC,
 * so the naive way of turning a picked date into `YYYY-MM-DD` silently books
 * the day before. A departure date is a calendar day at the origin, not an
 * instant, and it is handled as one.
 */

export interface DayParts {
  readonly year: number;
  /** 0-11, as JavaScript's Date uses. */
  readonly month: number;
  readonly day: number;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function toIso({ year, month, day }: DayParts): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export function parseIso(value: string): DayParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const check = new Date(year, month, day);
  // Rejects 2026-02-31 and the like rather than letting Date roll it over.
  if (check.getFullYear() !== year || check.getMonth() !== month || check.getDate() !== day) {
    return null;
  }
  return { year, month, day };
}

export function today(): DayParts {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
}

export function addDays(parts: DayParts, delta: number): DayParts {
  const d = new Date(parts.year, parts.month, parts.day + delta);
  return { year: d.getFullYear(), month: d.getMonth(), day: d.getDate() };
}

/** Same day-of-month in the next/previous month, clamped to that month's length. */
export function addMonths(parts: DayParts, delta: number): DayParts {
  const target = new Date(parts.year, parts.month + delta, 1);
  const last = daysInMonth(target.getFullYear(), target.getMonth());
  return { year: target.getFullYear(), month: target.getMonth(), day: Math.min(parts.day, last) };
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** -1, 0 or 1. ISO strings of the same shape compare correctly as text. */
export function compareDays(a: DayParts, b: DayParts): number {
  const x = toIso(a);
  const y = toIso(b);
  return x < y ? -1 : x > y ? 1 : 0;
}

export function sameDay(a: DayParts | null, b: DayParts | null): boolean {
  return a !== null && b !== null && compareDays(a, b) === 0;
}

/**
 * The cells of a month view, in whole weeks — as many as the month needs,
 * usually five. Cells outside the month are null and render empty.
 *
 * Not a fixed six weeks. That was the first version, justified as stopping the
 * Next button moving as the height changed — but the month buttons sit at the
 * TOP of the calendar, so a changing height never moves them. What a fixed six
 * rows did do was add a dead 40px row to most months, which on a phone pushed
 * the Today / Tomorrow shortcuts out of view.
 */
export function monthGrid(year: number, month: number): (DayParts | null)[] {
  const first = new Date(year, month, 1).getDay(); // 0 = Sunday
  const length = daysInMonth(year, month);
  const cells: (DayParts | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let day = 1; day <= length; day++) cells.push({ year, month, day });
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const LONG = new Intl.DateTimeFormat('en-IN', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});
const MONTH = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' });
const FULL = new Intl.DateTimeFormat('en-IN', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const formatDay = (p: DayParts) => LONG.format(new Date(p.year, p.month, p.day));
export const formatMonth = (year: number, month: number) => MONTH.format(new Date(year, month, 1));
/** Spoken form for screen readers: "Wednesday, 23 September 2026". */
export const formatDayFull = (p: DayParts) => FULL.format(new Date(p.year, p.month, p.day));

// --------------------------------------------------------------------- time

/** Every quarter hour of the day as `HH:MM`, 24-hour — the value the API takes. */
export const TIME_SLOTS: readonly string[] = Array.from({ length: 96 }, (_, i) => {
  const minutes = i * 15;
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
});

/** "09:30" -> "9:30 AM". Twelve-hour, which is how most people here say a time. */
export function formatSlot(slot: string): string {
  const [h = 0, m = 0] = slot.split(':').map(Number);
  const suffix = h < 12 ? 'AM' : 'PM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${pad(m)} ${suffix}`;
}

/** Minutes since midnight, for comparing a slot against the current time. */
export function slotMinutes(slot: string): number {
  const [h = 0, m = 0] = slot.split(':').map(Number);
  return h * 60 + m;
}
