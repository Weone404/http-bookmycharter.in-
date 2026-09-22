'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, Phone, TriangleAlert } from 'lucide-react';
import type { CharterRequestErrors, SubmissionState } from '@/types/charter-request';
import { CONTACT, whatsappLink } from '@/lib/site';
import { track } from '@/lib/analytics';

/**
 * The full charter request.
 *
 * Stage one is prefilled from the home-page form via the query string, so
 * nothing already typed is asked for twice. Everything beyond the essentials
 * sits behind a disclosure, because a wall of optional fields at first contact
 * loses more requests than it qualifies.
 *
 * Submission posts to /api/charter-request, which validates server-side and
 * delivers through the configured adapter. **It never reports success unless
 * the server confirmed delivery.** When no destination is configured the API
 * answers 503 and this form says so plainly and offers the phone and WhatsApp
 * routes that do work — a form that claims "request received" and drops the
 * enquiry is worse than one that is honestly switched off, because the person
 * waits for a call that is never coming.
 */
const LABEL =
  'block text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]';
const FIELD =
  'mt-2 w-full rounded-[var(--radius-control)] border border-[var(--color-ink)]/20 bg-white px-3.5 py-3 focus:border-[var(--color-cyan-deep)] focus:outline-none';
const FIELD_ERROR = 'border-[#b3261e]';

interface ApiResponse {
  ok: boolean;
  reference?: string;
  error?: string;
  errors?: CharterRequestErrors;
  unavailable?: boolean;
  duplicate?: boolean;
}

function FieldError({ message, id }: { message: string | undefined; id: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[length:var(--text-small)] text-[#b3261e]">
      {message}
    </p>
  );
}

export function CharterRequestForm() {
  const [showDetails, setShowDetails] = useState(false);
  const [state, setState] = useState<SubmissionState>({ status: 'idle' });
  const [errors, setErrors] = useState<CharterRequestErrors>({});
  const [unavailable, setUnavailable] = useState(false);
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    track('charter_form_viewed', { path: '/request-a-charter' });
  }, []);

  /**
   * Prefill from the query string after hydration.
   *
   * Read from `window.location` rather than `useSearchParams`, deliberately.
   * `useSearchParams` forces the component behind a Suspense boundary and the
   * server then renders only the fallback — a grep of the built HTML found
   * zero labels, zero inputs and zero required attributes on this page. The
   * primary conversion path had no server-rendered markup at all.
   *
   * Reading it here keeps the page statically prerendered AND keeps the whole
   * form in the HTML, while still carrying across what was typed on the home
   * page. The inputs are uncontrolled, so this sets their value once.
   */
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const query = new URLSearchParams(window.location.search);
    for (const [param, field] of [
      ['from', 'from'],
      ['to', 'to'],
      ['date', 'date'],
      ['passengers', 'passengers'],
    ] as const) {
      const value = query.get(param);
      if (!value) continue;
      const input = form.elements.namedItem(field);
      if (input instanceof HTMLInputElement) input.value = value;
    }
  }, []);

  /** Fired once, on the first real interaction rather than on mount. */
  const onFirstInput = useCallback(() => {
    if (started.current) return;
    started.current = true;
    track('charter_form_started', { path: '/request-a-charter' });
  }, []);

  const toggleDetails = useCallback(() => {
    setShowDetails((open) => {
      if (!open) track('charter_form_details_opened');
      return !open;
    });
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status === 'submitting') return;

    const data = new FormData(event.currentTarget);
    const payload = {
      from: data.get('from'),
      to: data.get('to'),
      departureDate: data.get('date'),
      passengers: data.get('passengers'),
      name: data.get('name'),
      phone: data.get('phone'),
      email: data.get('email'),
      tripType: data.get('tripType') || undefined,
      returnDate: data.get('returnDate') || undefined,
      aircraftPreference: data.get('aircraftPreference') || undefined,
      purpose: data.get('purpose') || undefined,
      flexibleDates: data.get('flexibleDates') === 'on',
      additionalRequirements: data.get('additionalRequirements') || undefined,
      website: data.get('website'),
      sourcePath: '/request-a-charter',
    };

    setErrors({});
    setUnavailable(false);
    setState({ status: 'submitting' });

    try {
      const response = await fetch('/api/charter-request', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as ApiResponse;

      if (result.ok && result.reference) {
        setState({ status: 'success', reference: result.reference });
        track('charter_request_submitted', { path: '/request-a-charter' });
        return;
      }

      if (result.errors) setErrors(result.errors);
      if (result.unavailable) {
        setUnavailable(true);
        track('charter_request_unavailable');
      } else {
        track('charter_request_failed', { reason: String(response.status) });
      }

      setState({
        status: 'error',
        message: result.error ?? 'Something went wrong. Please call or message us.',
        // A 422 is the person's to fix; a 503 or 502 is not.
        retryable: response.status === 422 || response.status === 429,
      });
    } catch {
      track('charter_request_failed', { reason: 'network' });
      setState({
        status: 'error',
        message: 'We could not reach the server. Please check your connection, or call us.',
        retryable: true,
      });
    }
  }

  // Move focus to the outcome so a screen reader and a keyboard user both
  // land on the result rather than back at the top of the form.
  useEffect(() => {
    if (state.status === 'success' || state.status === 'error') {
      resultRef.current?.focus();
    }
  }, [state.status]);

  if (state.status === 'success') {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        className="max-w-[46rem] rounded-[var(--radius-card)] border border-[var(--color-cyan-deep)]/30 bg-white p-7"
      >
        <Check className="h-6 w-6 text-[var(--color-cyan-deep)]" aria-hidden="true" />
        <h2 className="mt-4 text-[length:var(--text-h3)] font-semibold tracking-tight">
          Request received
        </h2>
        <p className="mt-3 text-[var(--color-ink-muted)]">
          Your reference is{' '}
          <span className="numeric font-medium text-[var(--color-ink)]">{state.reference}</span>. We
          will confirm what can operate your trip and what it involves, and come back to you with
          aircraft options and the cost broken down rather than a single figure.
        </p>
        <p className="mt-4 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
          If your plans are time-critical, call{' '}
          <a href={`tel:${CONTACT.phone}`} data-track="call_click" className="numeric font-medium">
            {CONTACT.phoneDisplay}
          </a>{' '}
          and quote that reference.
        </p>
      </div>
    );
  }

  const busy = state.status === 'submitting';

  return (
    <form ref={formRef} onSubmit={onSubmit} onInput={onFirstInput} className="max-w-[46rem]" noValidate>
      <fieldset className="border-0 p-0" disabled={busy}>
        <legend className="sr-only">Trip</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="from" className={LABEL}>
              From
            </label>
            <input
              id="from"
              name="from"
              required
              aria-invalid={errors.from ? true : undefined}
              aria-describedby={errors.from ? 'err-from' : undefined}
              className={`${FIELD} ${errors.from ? FIELD_ERROR : ''}`}
            />
            <FieldError id="err-from" message={errors.from} />
          </div>
          <div>
            <label htmlFor="to" className={LABEL}>
              To
            </label>
            <input
              id="to"
              name="to"
              required
              aria-invalid={errors.to ? true : undefined}
              aria-describedby={errors.to ? 'err-to' : undefined}
              className={`${FIELD} ${errors.to ? FIELD_ERROR : ''}`}
            />
            <FieldError id="err-to" message={errors.to} />
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
              aria-invalid={errors.departureDate ? true : undefined}
              aria-describedby={errors.departureDate ? 'err-date' : undefined}
              className={`${FIELD} numeric ${errors.departureDate ? FIELD_ERROR : ''}`}
            />
            <FieldError id="err-date" message={errors.departureDate} />
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
              defaultValue="2"
              aria-invalid={errors.passengers ? true : undefined}
              aria-describedby={errors.passengers ? 'err-pax' : undefined}
              className={`${FIELD} numeric ${errors.passengers ? FIELD_ERROR : ''}`}
            />
            <FieldError id="err-pax" message={errors.passengers} />
          </div>
        </div>
      </fieldset>

      <button
        type="button"
        onClick={toggleDetails}
        aria-expanded={showDetails}
        aria-controls="trip-details"
        className="mt-6 text-[length:var(--text-small)] font-medium text-[var(--color-cyan-deep)] underline underline-offset-4"
      >
        {showDetails ? 'Hide trip details' : 'Add trip details (optional)'}
      </button>

      <fieldset id="trip-details" hidden={!showDetails} className="mt-6 border-0 p-0" disabled={busy}>
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
            <input
              id="returnDate"
              name="returnDate"
              type="date"
              aria-invalid={errors.returnDate ? true : undefined}
              aria-describedby={errors.returnDate ? 'err-return' : undefined}
              className={`${FIELD} numeric ${errors.returnDate ? FIELD_ERROR : ''}`}
            />
            <FieldError id="err-return" message={errors.returnDate} />
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
            maxLength={1200}
            className={FIELD}
            placeholder="Baggage, timing constraints, accessibility, catering, ground transfers"
          />
        </div>
      </fieldset>

      <fieldset className="mt-8 border-0 p-0" disabled={busy}>
        <legend className="text-[length:var(--text-h3)] font-medium">How we reach you</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="name" className={LABEL}>
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'err-name' : undefined}
              className={`${FIELD} ${errors.name ? FIELD_ERROR : ''}`}
            />
            <FieldError id="err-name" message={errors.name} />
          </div>
          <div>
            <label htmlFor="phone" className={LABEL}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? 'err-phone' : undefined}
              className={`${FIELD} ${errors.phone ? FIELD_ERROR : ''}`}
            />
            <FieldError id="err-phone" message={errors.phone} />
          </div>
          <div>
            <label htmlFor="email" className={LABEL}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'err-email' : undefined}
              className={`${FIELD} ${errors.email ? FIELD_ERROR : ''}`}
            />
            <FieldError id="err-email" message={errors.email} />
          </div>
        </div>
      </fieldset>

      {/* Honeypot. Hidden from people, irresistible to bots. Not `display:none`
          — some bots skip those — and excluded from the tab order. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-[var(--color-cyan-accent)] px-7 py-3.5 text-[length:var(--text-small)] font-semibold uppercase tracking-[0.08em] text-[var(--color-midnight)] hover:bg-[var(--color-cyan-bright)] disabled:opacity-60"
      >
        {busy ? 'Sending…' : 'Send charter request'}
        {busy ? null : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </button>

      <div ref={resultRef} tabIndex={-1} aria-live="polite" className="mt-5 outline-none">
        {state.status === 'error' ? (
          <div className="max-w-[44rem] border-l-2 border-[#b3261e] pl-4">
            <p className="flex items-start gap-2.5 text-[length:var(--text-small)]">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#b3261e]" aria-hidden="true" />
              <span>{state.message}</span>
            </p>
            {unavailable ? (
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[length:var(--text-small)]">
                <a
                  href={`tel:${CONTACT.phone}`}
                  data-track="call_click"
                  className="inline-flex items-center gap-2 font-medium"
                >
                  <Phone className="h-4 w-4 text-[var(--color-cyan-deep)]" aria-hidden="true" />
                  <span className="numeric">{CONTACT.phoneDisplay}</span>
                </a>
                <a
                  href={whatsappLink('Hello, I would like to request a charter.')}
                  data-track="whatsapp_click"
                  className="font-medium underline underline-offset-4"
                >
                  Send the details on WhatsApp
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}
