import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { getRoute } from '@/lib/routes';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { AIRPORTS, CHARTER_AIRPORTS, AIRPORT_SOURCE } from '@/data/airports.generated';
import { DESTINATION_PAGES } from '@/data/destinations';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { Prose } from '@/components/content/Prose';
import { RelatedLinks } from '@/components/content/RelatedLinks';

const PATH = '/destinations' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function DestinationsPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Destinations route missing from the registry.');

  const states = [...new Set(AIRPORTS.map((a) => a.state))].sort();

  return (
    <>
      <Section ground="ivory" width="wide">
        <PageIntro
          path={PATH}
          title="Charter destinations and airport access"
          summary="Where a charter can go is decided by the aerodrome at the far end — its runway, its facilities and its operating hours — long before it is decided by the aircraft, which is why destination planning starts with the field and not the fleet."
        />
        <div className="mt-10">
          <Prose
            paragraphs={[
              `India has a great many more aerodromes than it has airports with scheduled service. ${AIRPORTS.length} are recorded in the reference below across ${states.length} states and union territories, of which ${CHARTER_AIRPORTS.length} are recorded as operational with an assigned code. The gap between that number and the handful of airports most travellers know is the whole argument for charter.`,
              'A destination page is published here only when there is something specific and true to say about chartering to or from it. Cities where the operating facts are not yet confirmed are deliberately absent rather than filled with a template — a page that swaps the city name into the same paragraphs helps nobody and is exactly what the previous version of this site did.',
            ]}
          />
        </div>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          Destination guides
        </h2>
        <div className="mt-8 grid gap-px border-t border-[var(--color-ink)]/15 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATION_PAGES.map((destination) => (
            <Link
              key={destination.slug}
              href={destination.canonical}
              className="group flex flex-col border-b border-[var(--color-ink)]/15 py-7 pr-7"
            >
              <h3 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
                {destination.city}
              </h3>
              <p className="mt-3 flex-1 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                {destination.summary}
              </p>
              <ArrowRight
                className="mt-5 h-4 w-4 text-[var(--color-accent-strong)] transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </Section>

      <Section ground="midnight" width="wide">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          What decides whether a destination is reachable
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <ul className="space-y-4 text-[var(--color-ink-inverse-muted)]">
            {[
              'Runway length and surface — the first filter, and the one that removes the most options',
              'Available approach aids, which decide what is possible in poor visibility',
              'Operating hours, and whether the field is licensed for night operations',
              'Ground handling, fuel and parking, which not every airfield has',
              'For helicopters: a site rather than a runway, with an approach path and a permission',
            ].map((item) => (
              <li key={item} className="flex gap-3.5">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-[var(--color-accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="text-[var(--color-ink-inverse-muted)]">
            <p>
              These are checked for both ends of a trip before an aircraft is proposed. It is
              routine work, and it is the reason a charter enquiry produces options rather than an
              instant price.
            </p>
            <p className="mt-4">
              Source for the facility reference: {AIRPORT_SOURCE.document}, {AIRPORT_SOURCE.dated}.
            </p>
          </div>
        </div>
      </Section>

      <Section ground="ivory" width="wide">
        <RelatedLinks
          links={[
            { label: 'Charter Routes', href: '/routes', description: 'How a city pair is planned' },
            { label: 'Aircraft & Fleet', href: '/aircraft', description: 'What can use which field' },
            { label: 'Aircraft Charter', href: '/private-charter/aircraft-charter', description: 'Turboprops for short runways' },
            { label: 'Charter Pricing', href: '/pricing', description: 'How airport charges enter the quote' },
          ]}
        />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: route.title, description: route.description, path: PATH }),
          breadcrumbSchema(PATH),
        ])}
      />
    </>
  );
}
