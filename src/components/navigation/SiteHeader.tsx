import Link from 'next/link';
import { Phone } from 'lucide-react';
import { CONTACT } from '@/lib/site';
import { DRAWER_GROUPS, HEADER_SERVICES, MORE_GROUPS } from '@/lib/navigation';
import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/ui/Wordmark';
import { HeaderLinks } from './HeaderLinks';
import { MoreMenu } from './MoreMenu';
import { MobileNav } from './MobileNav';

/**
 * The header leads with the five services people come for — private jets,
 * helicopters, Char Dham, empty legs and corporate — instead of the site's
 * own filing categories. Everything else is one click behind "More", so any
 * page is reachable from any page in two clicks at most.
 *
 * Server Component; only the active-link marker, the "More" panel and the
 * mobile drawer run on the client.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-surface)]/92 text-[var(--color-ink)] backdrop-blur-md">
      <Container width="wide">
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            className="shrink-0 text-[length:var(--text-h3)]"
            aria-label="Book My Charter, home"
          >
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              <HeaderLinks links={HEADER_SERVICES} />
              <li>
                <MoreMenu groups={MORE_GROUPS} />
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${CONTACT.phone}`}
              data-track="call_click"
              className="hidden items-center gap-2 whitespace-nowrap text-[length:var(--text-small)] font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] sm:inline-flex xl:hidden 2xl:inline-flex"
            >
              <Phone className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
              <span className="numeric">{CONTACT.phoneDisplay}</span>
            </a>
            <Link
              href="/request-a-charter"
              className="hidden items-center whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-5 py-2.5 text-[length:var(--text-small)] font-semibold text-[var(--color-on-accent)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-accent-strong)] xl:inline-flex"
            >
              Request a Charter
            </Link>
            <MobileNav groups={DRAWER_GROUPS} />
          </div>
        </div>
      </Container>
    </header>
  );
}
