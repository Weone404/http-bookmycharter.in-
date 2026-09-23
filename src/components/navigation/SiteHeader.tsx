import Link from 'next/link';
import { Phone } from 'lucide-react';
import { primaryNav } from '@/lib/routes';
import { CONTACT } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/ui/Wordmark';
import { MobileNav } from './MobileNav';

/**
 * Server Component. Only the drawer below is client-side, so the navigation is
 * in the initial HTML and costs almost nothing to hydrate.
 *
 * Light, not midnight. A solid dark bar across the top of every page is the
 * single heaviest thing on the site and it was there on all forty-seven of
 * them; it made every page announce itself before saying anything. White with
 * a hairline underneath gives the navigation to the reader without taking the
 * page's first 72 pixels for decoration, and it leaves the cyan CTA as the
 * only saturated thing in the bar — which is the whole point of having one
 * accent colour.
 */
export function SiteHeader() {
  const items = primaryNav();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-surface)]/88 text-[var(--color-ink)] backdrop-blur-md">
      <Container width="wide">
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="text-[length:var(--text-h3)] shrink-0" aria-label="Book My Charter, home">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-6 xl:gap-7">
              {items.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="whitespace-nowrap text-[length:var(--text-small)] text-[var(--color-ink-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-ink)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${CONTACT.phone}`}
              data-track="call_click"
              className="hidden items-center gap-2 whitespace-nowrap text-[length:var(--text-small)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] sm:inline-flex xl:hidden 2xl:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="numeric">{CONTACT.phoneDisplay}</span>
            </a>
            <Link
              href="/request-a-charter"
              className="hidden whitespace-nowrap xl:inline-flex items-center rounded-[var(--radius-pill)] bg-[var(--color-midnight)] px-5 py-2.5 text-[length:var(--text-small)] font-semibold tracking-[0.02em] text-[var(--color-ink-inverse)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-midnight-800)]"
            >
              Request a Charter
            </Link>
            <MobileNav items={items} />
          </div>
        </div>
      </Container>
    </header>
  );
}
