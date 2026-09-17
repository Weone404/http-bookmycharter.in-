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
 */
export function SiteHeader() {
  const items = primaryNav();

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-midnight)]/95 backdrop-blur-md text-[var(--color-ink-inverse)] border-b border-white/[0.07]">
      <Container width="wide">
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="text-[length:var(--text-h3)] shrink-0" aria-label="Book My Charter, home">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {items.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-[length:var(--text-small)] tracking-[0.04em] text-[var(--color-ink-inverse-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-ink-inverse)]"
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
              className="hidden sm:inline-flex items-center gap-2 text-[length:var(--text-small)] text-[var(--color-ink-inverse-muted)] hover:text-[var(--color-ink-inverse)]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="numeric">{CONTACT.phoneDisplay}</span>
            </a>
            <Link
              href="/request-a-charter"
              className="hidden lg:inline-flex items-center rounded-[var(--radius-control)] bg-[var(--color-cyan-accent)] px-5 py-2.5 text-[length:var(--text-small)] font-semibold uppercase tracking-[0.08em] text-[var(--color-midnight)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-cyan-bright)]"
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
