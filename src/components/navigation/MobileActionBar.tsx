'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { MessageCircle, Phone, Send } from 'lucide-react';
import { CONTACT, whatsappLink } from '@/lib/site';

/**
 * Call, WhatsApp and Request, fixed to the bottom of the screen below the
 * desktop breakpoint — the three things a visitor on a phone actually wants,
 * always one tap away.
 *
 * Hidden on the request page itself: that page is the form, and a bar fixed
 * over the bottom of a phone screen sits on top of the fields while the
 * keyboard is open. Publishes its height as --bottom-reserved so popovers
 * (airport list, calendar, time list) do not open underneath it.
 */
export function MobileActionBar() {
  const pathname = usePathname() ?? '/';
  const bar = useRef<HTMLDivElement>(null);
  const hidden = pathname === '/request-a-charter';

  useEffect(() => {
    const root = document.documentElement;
    const node = bar.current;
    if (hidden || !node) {
      root.style.removeProperty('--bottom-reserved');
      return;
    }
    const publish = () => {
      // Zero when the bar is display:none at the desktop breakpoint.
      root.style.setProperty('--bottom-reserved', `${node.offsetHeight}px`);
    };
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(node);
    return () => {
      observer.disconnect();
      root.style.removeProperty('--bottom-reserved');
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      ref={bar}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-hairline)] bg-[var(--color-surface)]/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md xl:hidden"
    >
      <nav
        aria-label="Quick contact"
        className="mx-auto grid max-w-xl grid-cols-[1fr_1fr_1.4fr] gap-2"
      >
        <a
          href={`tel:${CONTACT.phone}`}
          data-track="call_click"
          className="inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] py-2.5 text-sm font-semibold text-[var(--color-ink)]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </a>
        <a
          href={whatsappLink('Hello, I would like to enquire about a charter.')}
          data-track="whatsapp_click"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] py-2.5 text-sm font-semibold text-[var(--color-ink)]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
        <Link
          href="/request-a-charter"
          className="inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--color-accent)] py-2.5 text-sm font-semibold text-[var(--color-on-accent)]"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Request
        </Link>
      </nav>
    </div>
  );
}
