import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { InternalLink } from '@/types/common';

/**
 * The related-links block every page carries.
 *
 * This is the internal-link graph made concrete: no page is a dead end, and
 * every page participates in the cluster it belongs to.
 */
export function RelatedLinks({
  links,
  heading = 'Related',
}: {
  links: readonly InternalLink[];
  heading?: string;
}) {
  if (links.length === 0) return null;

  return (
    <nav aria-label={heading}>
      <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">{heading}</h2>
      <ul className="mt-6 grid gap-px border-t border-current/15 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex h-full flex-col justify-between gap-3 border-b border-current/15 py-5 pr-6"
            >
              <span className="font-medium">{link.label}</span>
              {link.description ? (
                <span className="text-[length:var(--text-small)] opacity-70">{link.description}</span>
              ) : null}
              <ArrowRight
                className="h-4 w-4 text-[var(--color-accent-strong)] transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
