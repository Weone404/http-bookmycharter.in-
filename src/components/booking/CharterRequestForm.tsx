'use client';

import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Check, TriangleAlert } from 'lucide-react';
import type { SubmissionState } from '@/types/charter-request';

/**
 * The full charter request.
 *
 * Stage one is prefilled from the home-page form via the query string, so
 * nothing already typed is asked for twice. Everything beyond the essentials
 * sits behind a disclosure, because a wall of optional fields at first contact
 * loses more requests than it qualifies.
 *
 * Submission is deliberately not wired to a provider yet: where requests should
 * be delivered is an open business question (docs/BUSINESS-DATA-REQUIRED I7).
 * Until it is answered the form validates, states plainly that it is not live,
 * and offers the phone and WhatsApp routes that do work.
 */
const LABEL =
  'block text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]';
const FIELD =
  'mt-2 w-full rounded-[var(--radius-control)] border border-[var(--color-ink)]/20 bg-white px-3.5 py-3 focus:border-[var(--color-cyan-deep)] focus:outline-none';

export function CharterRequestForm() {
  const params = useSearchParams();
  const [showDetails, setShowDetails] = useState(false);
  const [state, setState] = useState<SubmissionState>({ status: 'idle' });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status === 'submitting') return;

    const data = new FormData(event.currentTarget);
    // Honeypot: a real person never fills a hidden field.
    if (typeof data.get('website') === 'string' && data.get('website') !== '') {
      setState({ status: 'success', reference: 'ok' });
      return;
    }

    setState({ status: 'submitting' });
    setState({
      status: 'error',
      message:
        'Online submission is not live yet. Please call or message us on WhatsApp and we will pick this up straight away.',
      retryable: false,
    });
  }

  return (
    <form onSubmit={onSubmit} className="max-w-[46rem]" data-track="charter_form_start">
      <fieldset className="border-0 p-0">
        <legend className="sr-only">Trip</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="from" className={LABEL}>
              From
            </label>
            <input id="from" name="from" required defaultValue={params.get('from') ?? ''} className={FIELD} />
          </div>
          <div>
            <label htmlFor="to" className={LABEL}>
              To
            </label>
            <input id="to" name="to" required defaultValue={params.get('to') ?? ''} className={FIELD} />
          </div>
          <div>
            <label htmlFor="date" className={LABEL}>
              Departure date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              defaultValue={params.get('date') ?? ''}
              className={`${FIELD} numeric`}
            />
          </div>
          <div>
            <label htmlFor="passengers" className={LABEL}>
              Passengers
            </label>
            <input
              id="passengers"
              name="passengers"
              type="number"
              min={1}
              max={200}
              required
              defaultValue={params.get('passengers') ?? '2'}
              className={`${FIELD} numeric`}
            />
          </div>
        </div>
      </fieldset>

      <button
        type="button"
        onClick={() => setShowDetails((v) => !v)}
        aria-expanded={showDetails}
        aria-controls="trip-details"
        className="mt-6 text-[length:var(--text-small)] font-medium text-[var(--color-cyan-deep)] underline underline-offset-4"
      >
        {showDetails ? 'Hide trip details' : 'Add trip details (optional)'}
      </button>

      <fieldset id="trip-details" hidden={!showDetails} className="mt-6 border-0 p-0">
        <legend className="sr-only">Trip details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="tripType" className={LABEL}>
              Trip type
            </label>
            <select id="tripType" name="tripType" className={FIELD} defaultValue="one-way">
              <option value="one-way">One way</option>
              <option value="round-trip">Round trip</option>
              <option value="multi-city">Multi-city</option>
            </select>
          </div>
          <div>
            <label htmlFor="returnDate" className={LABEL}>
              Return date
            </label>
            <input id="returnDate" name="returnDate" type="date" className={`${FIELD} numeric`} />
          </div>
          <div>
            <label htmlFor="aircraftPreference" className={LABEL}>
              Aircraft preference
            </label>
            <select id="aircraftPreference" name="aircraftPreference" className={FIELD} defaultValue="">
              <option value="">No preference</option>
              <option value="private-jet">Private jet</option>
              <option value="helicopter">Helicopter</option>
              <option value="turboprop">Turboprop</option>
              <option value="group-charter">Group aircraft</option>
            </select>
          </div>
          <div>
            <label htmlFor="purpose" className={LABEL}>
              Purpose
            </label>
            <select id="purpose" name="purpose" className={FIELD} defaultValue="">
              <option value="">Not specified</option>
              <option value="corporate">Corporate</option>
              <option value="leisure">Leisure</option>
              <option value="wedding">Wedding</option>
              <option value="medical">Medical</option>
              <option value="film-and-aerial">Film or aerial work</option>
              <option value="pilgrimage">Pilgrimage</option>
              <option value="event">Event</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <label className="mt-5 flex items-center gap-3 text-[length:var(--text-small)]">
          <input type="checkbox" name="flexibleDates" className="h-4 w-4" />
          My dates are flexible — show me empty-leg options too
        </label>

        <div className="mt-5">
          <label htmlFor="additionalRequirements" className={LABEL}>
            Anything else we should know
          </label>
          <textarea
            id="additionalRequirements"
            name="additionalRequirements"
            rows={4}
            className={FIELD}
            placeholder="Baggage, timing constraints, accessibility, catering, ground transfers"
          />
        </div>
      </fieldset>

      <fieldset className="mt-8 border-0 p-0">
        <legend className="text-[length:var(--text-h3)] font-medium">How we reach you</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="name" className={LABEL}>
              Name
            </label>
            <input id="name" name="name" required autoComplete="name" className={FIELD} />
          </div>
          <div>
            <label htmlFor="phone" className={LABEL}>
              Phone
            </label>
            <input id="phone" name="phone" type="tel" required autoComplete="tel" className={FIELD} />
          </div>
          <div>
            <label htmlFor="email" className={LABEL}>
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className={FIELD} />
          </div>
        </div>
      </fieldset>

      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-[var(--color-cyan-accent)] px-7 py-3.5 text-[length:var(--text-small)] font-semibold uppercase tracking-[0.08em] text-[var(--color-midnight)] hover:bg-[var(--color-cyan-bright)] disabled:opacity-60"
      >
        {state.status === 'submitting' ? 'Sending…' : 'Send charter request'}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      <div aria-live="polite" className="mt-5">
        {state.status === 'error' && (
          <p className="flex items-start gap-2.5 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-cyan-deep)]" aria-hidden="true" />
            {state.message}
          </p>
        )}
        {state.status === 'success' && (
          <p className="flex items-start gap-2.5 text-[length:var(--text-small)]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-cyan-deep)]" aria-hidden="true" />
            Request received. We will be in touch shortly.
          </p>
        )}
      </div>
    </form>
  );
}
