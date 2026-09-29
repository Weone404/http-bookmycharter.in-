import { MessageCircle, Phone } from 'lucide-react';
import { CONTACT, whatsappLink } from '@/lib/site';
import { classCruise } from '@/lib/route-math';
import { QuickCharterForm, type Cruise, type QuotePreset } from './QuickCharterForm';

/** Typical cruise speeds per aircraft choice, from the spec sheet (computed once). */
const CRUISE: Cruise = {
  jet: classCruise('midsize-jets'),
  turboprop: classCruise('turboprops'),
  helicopter: classCruise('helicopters'),
};

/**
 * The booking block every charter hero carries: the four-field quote form,
 * then call and WhatsApp for anyone who would rather talk. The same block on
 * the home page and on every service page, so a visitor who lands deep from
 * search can start a request without scrolling past a single paragraph.
 *
 * `preset` carries the page's context (a helicopter page presets
 * "Helicopter") into /request-a-charter, so it is not asked for again.
 */
export function HeroBooking({
  heading = 'Request a charter quote',
  preset,
  whatsappMessage = 'Hello, I would like to enquire about a charter.',
}: {
  heading?: string;
  preset?: QuotePreset;
  whatsappMessage?: string;
}) {
  return (
    <>
      <div className="mt-8 rounded-[var(--radius-card)] border border-white/10 bg-[var(--color-midnight-950)]/70 p-4 backdrop-blur-sm sm:p-6">
        <h2 className="text-[length:var(--text-micro)] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-inverse-muted)]">
          {heading}
        </h2>
        <div className="mt-5">
          <QuickCharterForm cruise={CRUISE} {...(preset ? { preset } : {})} />
        </div>
      </div>

      <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[length:var(--text-small)] text-[var(--color-ink-inverse-muted)]">
        <span>Prefer to talk?</span>
        <a
          href={`tel:${CONTACT.phone}`}
          data-track="call_click"
          className="inline-flex items-center gap-1.5 font-medium text-[var(--color-ink-inverse)] hover:text-[var(--color-accent)]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span className="numeric">{CONTACT.phoneDisplay}</span>
        </a>
        <a
          href={whatsappLink(whatsappMessage)}
          data-track="whatsapp_click"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 font-medium text-[var(--color-ink-inverse)] hover:text-[var(--color-accent)]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
      </p>
    </>
  );
}
