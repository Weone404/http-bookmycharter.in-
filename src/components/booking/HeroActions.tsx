import Link from 'next/link';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { CONTACT, whatsappLink } from '@/lib/site';

/**
 * The compact version of HeroBooking, for hub and company pages: one tap to
 * the quote form, one to call, one to WhatsApp. No paragraph in the way.
 */
export function HeroActions({
  href = '/request-a-charter',
  label = 'Request a Charter',
}: {
  href?: string;
  label?: string;
}) {
  const ghost =
    'inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-white/25 px-5 py-3 text-[length:var(--text-small)] font-semibold text-[var(--color-ink-inverse)] hover:border-white/60';
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 py-3 text-[length:var(--text-small)] font-semibold text-[var(--color-on-accent)] hover:bg-[var(--color-accent-strong)]"
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <a href={`tel:${CONTACT.phone}`} data-track="call_click" className={ghost}>
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call
      </a>
      <a
        href={whatsappLink('Hello, I would like to enquire about a charter.')}
        data-track="whatsapp_click"
        target="_blank"
        rel="noopener"
        className={ghost}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}
