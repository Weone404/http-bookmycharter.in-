'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { track } from '@/lib/analytics';
import { AIRPORT_COUNT } from '@/lib/airport-search';
import { AirportField } from './AirportField';
import { PassengerField } from './PassengerField';

/**
 * Stage one of the charter request.
 *
 * Progressive disclosure is the whole point. A long form at first contact is
 * the largest single drop-off in this funnel, so everything else — trip type,
 * return date, aircraft preference, purpose, requirements — is collected on
 * /request-a-charter once the person has already started.
 *
 * Every value is carried forward in the URL so nothing typed here has to be
 * typed again.
 *
 * Departure time is here because charter has no timetable: the whole product
 * is that the aircraft leaves when the customer wants it to, and a date
 * without a time cannot be quoted — crew duty, slot availability and night
 * operations at the destination all turn on it. It is optional rather than
 * required, because someone who has not decided should not be blocked at the
 * first field.
 */
const LABEL = 'block text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-ink-inverse-muted)]';
const FIELD =
  'w-full bg-transparent border-b border-white/25 py-3 pr-2 pl-6 text-[var(--color-ink-inverse)] placeholder:text-[var(--color-ink-inverse-muted)] focus:border-[var(--color-cyan-accent)] focus:outline-none';

export function QuickCharterForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    // The funnel starts here, not on /request-a-charter: this is where most
    // people first commit a route and a date.
    track('charter_form_started', { path: '/', label: 'hero' });
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const key of ['from', 'to', 'date', 'time', 'passengers'] as const) {
      const value = data.get(key);
      if (typeof value === 'string' && value.trim() !== '') params.set(key, value.trim());
    }
    router.push(`/request-a-charter?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      data-track="charter_form_start"
      className="grid gap-x-6 gap-y-5 sm:grid-cols-2 xl:grid-cols-[1.15fr_1.15fr_0.8fr_0.6fr_0.75fr_auto] xl:items-end"
      aria-label="Start a charter request"
    >
      <AirportField id="from" name="from" label="From" placeholder="City, airport or code" />
      <AirportField id="to" name="to" label="To" placeholder="City, airport or code" />

      <div>
        <label htmlFor="date" className={LABEL}>
          Departure
        </label>
        <div className="relative">
          <CalendarDays
            className="pointer-events-none absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-inverse-muted)]"
            aria-hidden="true"
          />
          <input id="date" name="date" type="date" required className={`${FIELD} numeric`} />
        </div>
      </div>

      <div>
        <label htmlFor="time" className={LABEL}>
          Time
        </label>
        <div className="relative">
          <Clock
            className="pointer-events-none absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-inverse-muted)]"
            aria-hidden="true"
          />
          <input id="time" name="time" type="time" className={`${FIELD} numeric`} />
        </div>
      </div>

      <PassengerField id="passengers" name="passengers" />

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-cyan-accent)] px-7 py-3.5 text-[length:var(--text-small)] font-semibold tracking-[0.02em] text-[var(--color-midnight)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-cyan-bright)] disabled:opacity-60 sm:col-span-2 xl:col-span-1"
      >
        {submitting ? 'Opening…' : 'Continue'}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      <p className="text-[length:var(--text-micro)] text-[var(--color-ink-inverse-muted)] sm:col-span-2 xl:col-span-6">
        {AIRPORT_COUNT} operational Indian aerodromes are listed. Helipads and private airstrips
        are not on that list and can be typed in directly — we will confirm the landing point with
        you.
      </p>
    </form>
  );
}
