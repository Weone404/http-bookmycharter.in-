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
import { HeroActions } from '@/components/booking/HeroActions';
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
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={PATH}
          title="Private Jet Charter Destinations in India"
          summary="Private jet charter destinations in India depend on the airfield at the far end: its runway, its facilities and its opening hours. So trip planning starts with the airfield, not the aircraft."
          action={<HeroActions />}
        />
      </Section>

      <Section ground="surface" width="wide">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          City charter guides
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
          What decides whether you can fly to a destination
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <ul className="space-y-4 text-[var(--color-ink-inverse-muted)]">
            {[
              'Runway length and surface: the first check, and the one that rules out the most aircraft',
              'Approach aids (equipment that guides landings), which decide what is possible in poor visibility',
              'Opening hours, and whether the airfield is licensed for night flights',
              'Ground handling, fuel and parking, which not every airfield has',
              'For helicopters: a landing site rather than a runway, with an approach path and permission',
            ].map((item) => (
              <li key={item} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="mt-[0.7em] h-px w-4 shrink-0 bg-[var(--color-accent)]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="text-[var(--color-ink-inverse-muted)]">
            <p>
              All of these are checked at both ends of a trip before an aircraft is suggested. This
              is routine work. It is why a charter enquiry gives you options rather than an instant
              price.
            </p>
            <p className="mt-4">
              Source for the airfield data: {AIRPORT_SOURCE.document}, {AIRPORT_SOURCE.dated}.
            </p>
          </div>
        </div>
      </Section>

      {/* UX first: the long explanation is kept whole, but after the
          parts a booker scans. */}
      <Section ground="surface" width="default">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          Charter destinations explained
        </h2>
        <div className="mt-6">
          <Prose
            paragraphs={[
              `India has far more aerodromes (airfields) than airports with scheduled flights. ${AIRPORTS.length} are recorded in the reference below, across ${states.length} states and union territories. Of these, ${CHARTER_AIRPORTS.length} are recorded as operational with an assigned code. Most travellers know only a handful of airports. That gap is the main reason to charter.`,
              'A city guide is published here only when there is something specific and true to say about chartering to or from it. Cities whose operating facts are not yet confirmed are left out on purpose. A page that just swaps in a new city name helps nobody, and that is what the previous version of this site did.',
            ]}
          />
        </div>
      </Section>

      <Section ground="ivory" width="wide">
        <RelatedLinks
          links={[
            { label: 'Charter Routes', href: '/routes', description: 'How a city pair is planned' },
            {
              label: 'Aircraft & Fleet',
              href: '/aircraft',
              description: 'Which aircraft can use which airfield',
            },
            {
              label: 'Aircraft Charter',
              href: '/private-charter/aircraft-charter',
              description: 'Turboprops for short runways',
            },
            {
              label: 'Charter Pricing',
              href: '/pricing',
              description: 'How airport charges enter the quote',
            },
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
