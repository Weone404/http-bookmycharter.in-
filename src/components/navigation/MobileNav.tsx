'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { RouteEntry } from '@/lib/routes';
import { Wordmark } from '@/components/ui/Wordmark';

/**
 * The only client-side navigation code on the site: a drawer that opens.
 *
 * No mega-menu on small screens. The drawer is a plain list, the conversion
 * action sits at the bottom where a thumb reaches it, and the page behind it
 * cannot scroll while it is open.
 */
export function MobileNav({ items }: { items: readonly RouteEntry[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="p-2 -mr-2 text-[var(--color-ink-inverse)] xl:hidden"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div
        hidden={!open}
        className="fixed inset-0 z-50 bg-[var(--color-midnight)] text-[var(--color-ink-inverse)] xl:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-[var(--spacing-gutter)] py-5">
            <Wordmark className="text-lg" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Primary" className="flex-1 overflow-y-auto px-[var(--spacing-gutter)] py-4">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 text-[length:var(--text-h3)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-[var(--spacing-gutter)] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
            <Link
              href="/request-a-charter"
              onClick={() => setOpen(false)}
              className="block w-full bg-[var(--color-cyan-accent)] py-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-midnight)]"
            >
              Request a Charter
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
