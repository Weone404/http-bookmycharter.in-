import Link from 'next/link';
import { ADDRESS, CONTACT, SITE, SISTER_SITE } from '@/lib/site';
import { ROUTES, type RouteCluster } from '@/lib/routes';
import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/ui/Wordmark';

/**
 * Entity-rich footer.
 *
 * Built from the route registry, so a page that exists is linked and a page
 * that does not exist cannot be linked by mistake — `status: 'planned'` routes
 * are filtered out. The address block is the real office, stated once.
 */
const COLUMNS: { heading: string; clusters: RouteCluster[] }[] = [
  { heading: 'Private Charter', clusters: ['private-charter'] },
  { heading: 'Helicopter Charter', clusters: ['helicopter-charter'] },
  { heading: 'Aircraft & Services', clusters: ['aircraft', 'services'] },
  {
    heading: 'Plan Your Charter',
    clusters: ['pricing', 'empty-leg', 'destinations', 'routes', 'chardham', 'insights'],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  const company = ROUTES.filter((r) => r.cluster === 'company' && r.status === 'live');
  const legal = ROUTES.filter((r) => r.cluster === 'legal' && r.status === 'live');

  return (
    <footer className="on-dark bg-[var(--color-midnight)] pb-[calc(4.25rem+env(safe-area-inset-bottom))] text-[var(--color-ink-inverse-muted)] xl:pb-0">
      <Container width="wide">
        <div className="py-[clamp(3rem,2rem+4vw,5rem)]">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
            <div className="max-w-sm">
              <Link
                href="/"
                className="text-[length:var(--text-h3)] text-[var(--color-ink-inverse)]"
              >
                <Wordmark />
              </Link>
              <p className="mt-4 text-[length:var(--text-small)] leading-relaxed">
                {SITE.description}
              </p>

              <address className="mt-6 not-italic text-[length:var(--text-small)] leading-relaxed">
                {ADDRESS.street}
                <br />
                {ADDRESS.locality}
                <br />
                {ADDRESS.region} {ADDRESS.postalCode}, India
              </address>

              <div className="mt-4 flex flex-col gap-1 text-[length:var(--text-small)]">
                <a
                  href={`tel:${CONTACT.phone}`}
                  data-track="call_click"
                  className="numeric hover:text-[var(--color-ink-inverse)]"
                >
                  {CONTACT.phoneDisplay}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-[var(--color-ink-inverse)]"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>

            {COLUMNS.map((column) => {
              const links = ROUTES.filter(
                (r) =>
                  column.clusters.includes(r.cluster) && r.status === 'live' && r.nav !== 'none',
              );
              if (links.length === 0) return null;
              return (
                <nav key={column.heading} aria-label={column.heading}>
                  <h2 className="text-[length:var(--text-micro)] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-inverse)]">
                    {column.heading}
                  </h2>
                  <ul className="mt-4 space-y-2.5 text-[length:var(--text-small)]">
                    {links.map((link) => (
                      <li key={link.path}>
                        <Link href={link.path} className="hover:text-[var(--color-ink-inverse)]">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              );
            })}
          </div>

          <div className="mt-12 border-t border-white/[0.07] pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4 text-[length:var(--text-small)]">
              <ul className="flex flex-wrap gap-5">
                {[...company, ...legal].map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className="hover:text-[var(--color-ink-inverse)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-[length:var(--text-micro)]">
                © {year} {SITE.legalName}
              </p>
            </div>

            {/*
              The sister property is linked plainly rather than hidden. Two sites,
              two different jobs: this one arranges charter, that one handles the
              pilgrimage. Concealing the relationship would serve nobody.
            */}
            <p className="mt-4 text-[length:var(--text-micro)] leading-relaxed">
              Aircraft shown in page banners and cards are illustrations, not aircraft offered for
              charter. Photos of specific aircraft types are credited where shown.
            </p>
            <p className="mt-2 text-[length:var(--text-micro)] leading-relaxed">
              For {SISTER_SITE.purpose}, see{' '}
              <a
                href={SISTER_SITE.url}
                className="underline underline-offset-2 hover:text-[var(--color-ink-inverse)]"
              >
                {SISTER_SITE.name}
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
