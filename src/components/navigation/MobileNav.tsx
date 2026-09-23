'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import type { NavGroup } from '@/lib/navigation';
import { CONTACT, whatsappLink } from '@/lib/site';
import { Wordmark } from '@/components/ui/Wordmark';

/**
 * The mobile drawer. Grouped — Charter first, then Aircraft, Plan a trip and
 * Company — so a visitor scans four short headings instead of one long list.
 * The call, WhatsApp and request actions sit at the bottom where a thumb
 * reaches them. The page behind cannot scroll while it is open, Escape
 * closes it, and focus returns to the button that opened it.
 */
export function MobileNav({ groups }: { groups: readonly NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  const opener = useRef<HTMLButtonElement>(null);
  const closer = useRef<HTMLButtonElement>(null);
  // The drawer is portalled to <body>. Rendered inside the header it was
  // positioned against the header, not the screen: the header's
  // backdrop-filter makes it the containing block for fixed descendants, so
  // `fixed inset-0` produced a 72px-tall drawer with the links spilling over
  // the page.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closer.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        opener.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        ref={opener}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="-mr-2 p-2 text-[var(--color-ink)] xl:hidden"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {mounted
        ? createPortal(
            <div
              hidden={!open}
              className="fixed inset-0 z-50 bg-[var(--color-surface)] text-[var(--color-ink)] xl:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="flex h-full flex-col">
                <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-[var(--color-hairline)] px-[var(--spacing-gutter)]">
                  <Wordmark className="text-lg" />
                  <button
                    ref={closer}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      opener.current?.focus();
                    }}
                    aria-label="Close menu"
                    className="-mr-2 p-2"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <nav
                  aria-label="Site"
                  className="flex-1 overflow-y-auto px-[var(--spacing-gutter)] py-6"
                >
                  <div className="grid gap-8 sm:grid-cols-2">
                    {groups.map((group) => (
                      <div key={group.heading}>
                        <p className="text-[length:var(--text-micro)] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
                          {group.heading}
                        </p>
                        <ul className="mt-2">
                          {group.links.map((item) => (
                            <li key={item.path}>
                              <Link
                                href={item.path}
                                onClick={() => setOpen(false)}
                                {...(pathname === item.path
                                  ? { 'aria-current': 'page' as const }
                                  : {})}
                                className="block border-b border-[var(--color-hairline)] py-3 text-[1.0625rem] font-medium aria-[current=page]:text-[var(--color-accent-strong)]"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </nav>

                <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-[var(--color-hairline)] px-[var(--spacing-gutter)] pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
                  <a
                    href={`tel:${CONTACT.phone}`}
                    data-track="call_click"
                    className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] py-3 text-sm font-semibold"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call
                  </a>
                  <a
                    href={whatsappLink('Hello, I would like to enquire about a charter.')}
                    data-track="whatsapp_click"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] py-3 text-sm font-semibold"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                  <Link
                    href="/request-a-charter"
                    onClick={() => setOpen(false)}
                    className="col-span-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] py-3.5 text-center text-sm font-semibold text-[var(--color-on-accent)]"
                  >
                    Request a Charter
                  </Link>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
