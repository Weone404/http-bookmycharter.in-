'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Stage one of the charter request: four fields.
 *
 * Progressive disclosure is the whole point. A long form at first contact is
 * the largest single drop-off in this funnel, so everything else — trip type,
 * return date, aircraft preference, purpose, requirements — is collected on
 * /request-a-charter once the person has already started.
 *
 * The four values are carried forward in the URL so nothing typed here has to
 * be typed again.
 */
const FIELD =
  'w-full bg-transparent border-b border-white/25 px-0 py-3 text-[var(--color-ink-inverse)] placeholder:text-[var(--color-ink-inverse-muted)] focus:border-[var(--color-cyan-accent)] focus:outline-none';

export function QuickCharterForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const key of ['from', 'to', 'date', 'passengers'] as const) {
      const value = data.get(key);
      if (typeof value === 'string' && value.trim() !== '') params.set(key, value.trim());
    }
    router.push(`/request-a-charter?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      data-track="charter_form_start"
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_0.7fr_auto] lg:items-end"
      aria-label="Start a charter request"
    >
      <div>
        <label htmlFor="from" className="block text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-ink-inverse-muted)]">
          From
        </label>
        <input id="from" name="from" required autoComplete="off" placeholder="Delhi" className={FIELD} />
      </div>
      <div>
        <label htmlFor="to" className="block text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-ink-inverse-muted)]">
          To
        </label>
        <input id="to" name="to" required autoComplete="off" placeholder="Mumbai" className={FIELD} />
      </div>
      <div>
        <label htmlFor="date" className="block text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-ink-inverse-muted)]">
          Departure
        </label>
        <input id="date" name="date" type="date" required className={`${FIELD} numeric`} />
      </div>
      <div>
        <label htmlFor="passengers" className="block text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-ink-inverse-muted)]">
          Passengers
        </label>
        <input
          id="passengers"
          name="passengers"
          type="number"
          min={1}
          max={200}
          defaultValue={2}
          required
          className={`${FIELD} numeric`}
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--color-cyan-accent)] px-7 py-3.5 text-[length:var(--text-small)] font-semibold uppercase tracking-[0.08em] text-[var(--color-midnight)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-cyan-bright)] disabled:opacity-60 sm:col-span-2 lg:col-span-1"
      >
        {submitting ? 'Opening…' : 'Continue'}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
