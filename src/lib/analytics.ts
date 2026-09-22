/**
 * Conversion measurement.
 *
 * One provider, one event vocabulary, both typed. Event names are a contract:
 * once a name is reporting into a dashboard, renaming it silently breaks
 * months of history, so the union below is the only place they are defined and
 * nothing dispatches a string literal.
 *
 * No second analytics library. Two libraries measuring the same funnel produce
 * two different numbers and an argument about which is right.
 */
export type AnalyticsEvent =
  // Charter request funnel, in order.
  | 'charter_form_viewed'
  | 'charter_form_started'
  | 'charter_form_details_opened'
  | 'charter_request_submitted'
  | 'charter_request_failed'
  | 'charter_request_unavailable'
  // Contact intents.
  | 'cta_click'
  | 'call_click'
  | 'whatsapp_click'
  // Content and product engagement.
  | 'aircraft_view'
  | 'fleet_next'
  | 'fleet_previous'
  | 'fleet_select'
  | 'pricing_engage'
  | 'empty_leg_engage'
  | 'route_engage'
  | 'destination_engage'
  | 'insight_engage';

/** Event parameters. Never carries personal data — no name, phone or email. */
export interface AnalyticsPayload {
  readonly path?: string;
  readonly label?: string;
  readonly aircraft?: string;
  readonly reason?: string;
  readonly value?: number;
}

type GtagFn = (command: string, ...args: unknown[]) => void;

interface AnalyticsWindow extends Window {
  gtag?: GtagFn;
  dataLayer?: unknown[];
}

/**
 * Send an event.
 *
 * Silent when no provider is configured, which is the normal state in
 * development and in any deployment without a measurement ID. It never throws
 * and never blocks: a measurement failure must not break a charter request.
 */
export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as AnalyticsWindow;
  try {
    w.gtag?.('event', event, {
      ...(payload.path ? { page_path: payload.path } : {}),
      ...(payload.label ? { label: payload.label } : {}),
      ...(payload.aircraft ? { aircraft: payload.aircraft } : {}),
      ...(payload.reason ? { reason: payload.reason } : {}),
      ...(payload.value !== undefined ? { value: payload.value } : {}),
    });
  } catch {
    // Measurement is best-effort by design.
  }
}

/**
 * Events that can be expressed declaratively, via `data-track` on an element.
 *
 * The header, footer and contact pages already carry `data-track="call_click"`
 * and `data-track="whatsapp_click"`. One delegated listener reads them, so a
 * new tracked link needs an attribute rather than a handler and a re-render.
 */
export const DELEGATED_EVENTS: readonly AnalyticsEvent[] = [
  'call_click',
  'whatsapp_click',
  'cta_click',
];

export function isDelegatedEvent(value: string): value is AnalyticsEvent {
  return (DELEGATED_EVENTS as readonly string[]).includes(value);
}
