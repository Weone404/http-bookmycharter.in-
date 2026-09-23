'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { NavGroup } from '@/lib/navigation';
import { isCurrent } from './HeaderLinks';

/**
 * "More": a disclosure button and a grouped panel of links (the WAI-ARIA
 * disclosure navigation pattern, not a `role="menu"` — these are ordinary
 * links, and screen readers should announce them as such).
 *
 * Closes on Escape (returning focus to the button), on a pointer press
 * outside, on focus leaving the panel, and on navigation.
 */
export function MoreMenu({ groups }: { groups: readonly NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  const wrapper = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const inside = groups.some((group) => group.links.some((l) => isCurrent(pathname, l.path)));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div
      ref={wrapper}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-[var(--radius-pill)] px-3.5 py-2 text-[length:var(--text-small)] font-medium transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-ivory)] ${
          inside || open ? 'text-[var(--color-accent-strong)]' : 'text-[var(--color-ink)]'
        } ${open ? 'bg-[var(--color-ivory)]' : ''}`}
      >
        More
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-[var(--duration-fast)] ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute right-0 top-full mt-3 w-[36rem] rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-6 shadow-[0_18px_48px_-12px_rgba(11,23,38,0.22)]"
      >
        <div className="grid grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.heading}>
              <p className="text-[length:var(--text-micro)] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
                {group.heading}
              </p>
              <ul className="mt-3 space-y-1">
                {group.links.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      {...(pathname === item.path ? { 'aria-current': 'page' as const } : {})}
                      className="-mx-2 block rounded-[var(--radius-control)] px-2 py-1.5 text-[length:var(--text-small)] text-[var(--color-ink)] hover:bg-[var(--color-ivory)] hover:text-[var(--color-accent-strong)] aria-[current=page]:text-[var(--color-accent-strong)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
