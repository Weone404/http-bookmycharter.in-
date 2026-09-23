'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavLink } from '@/lib/navigation';

/** True when `pathname` is `path` or a page beneath it. */
export function isCurrent(pathname: string, path: string): boolean {
  return pathname === path || pathname.startsWith(`${path}/`);
}

/**
 * The service links in the header bar. Client-side only to mark the section
 * the visitor is in — knowing where you are is half of not feeling lost.
 */
export function HeaderLinks({ links }: { links: readonly NavLink[] }) {
  const pathname = usePathname() ?? '/';
  return (
    <>
      {links.map((item) => {
        const current = isCurrent(pathname, item.path);
        return (
          <li key={item.path}>
            <Link
              href={item.path}
              {...(current ? { 'aria-current': 'page' as const } : {})}
              className={`block whitespace-nowrap rounded-[var(--radius-pill)] px-3.5 py-2 text-[length:var(--text-small)] font-medium transition-colors duration-[var(--duration-fast)] ${
                current
                  ? 'bg-[var(--color-ivory)] text-[var(--color-accent-strong)]'
                  : 'text-[var(--color-ink)] hover:bg-[var(--color-ivory)]'
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}
