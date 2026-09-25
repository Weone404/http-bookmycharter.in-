import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { getRoute } from '@/lib/routes';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { AIRCRAFT, PUBLISHED_AIRCRAFT, aircraftByCategory } from '@/data/aircraft';
import { AIRCRAFT_CATEGORY_PAGES } from '@/data/aircraft-categories';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroActions } from '@/components/booking/HeroActions';
import { Prose } from '@/components/content/Prose';
import { AircraftGroupCard } from '@/components/aircraft/AircraftGroupCard';
import { AircraftTable } from '@/components/aircraft/AircraftTable';
import { FleetShowroomMount } from '@/components/fleet/FleetShowroomMount';

const PATH = '/aircraft' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function AircraftHubPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Aircraft route missing from the registry.');

  const airliners = aircraftByCategory('executive-airliner');

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={PATH}
          title="Charter Aircraft in India"
          summary="Charter aircraft in India fall into four groups: helicopters, turboprops, private jets and regional airliners. The right one depends on the airfield, the trip length and the group size, in that order."
          action={<HeroActions />}
        />
      </Section>

      {/* Fleet showroom. One shared WebGL canvas, lazily mounted. The aircraft
          names, specifications and links below are server-rendered and are the
          authoritative layer. */}
      {/* The showroom needs its own <h2>: it now server-renders, and its panel
          uses <h3> for the aircraft name, which would otherwise be the first
          heading after the <h1>. Caught by the heading-hierarchy check. */}
      <section aria-labelledby="showroom-heading" className="on-dark bg-[var(--color-midnight)]">
        <Container width="wide">
          <div className="flex flex-wrap items-baseline justify-between gap-3 pt-10 text-[var(--color-ink-inverse)]">
            <h2
              id="showroom-heading"
              className="text-[length:var(--text-h3)] font-semibold tracking-tight"
            >
              Browse aircraft types
            </h2>
            <p className="text-[length:var(--text-small)] text-[var(--color-ink-inverse-muted)]">
              Use the arrows, the aircraft list, or your left and right arrow keys.
            </p>
          </div>
        </Container>
        <FleetShowroomMount />
      </section>

      <Section ground="ivory" width="wide">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          Compare private jets, helicopters and turboprops
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AIRCRAFT_CATEGORY_PAGES.map((category) => (
            <li key={category.slug}>
              <AircraftGroupCard
                title={category.title.replace(/ for Charter$/, '')}
                category={category.category}
                href={category.canonical}
                summary={category.summary}
              />
            </li>
          ))}
        </ul>
      </Section>

      {airliners.length > 0 ? (
        <Section ground="midnight" width="wide">
          <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
            Regional aircraft for large groups
          </h2>
          <p className="mt-4 max-w-[68ch] text-[var(--color-ink-inverse-muted)]">
            Above roughly twenty passengers, you move from business aircraft to regional airliners.
            These carry delegations, event groups and corporate offsites in one trip. They need much
            more notice than a business jet.
          </p>
          <div className="mt-8">
            <AircraftTable aircraft={airliners} />
          </div>
        </Section>
      ) : null}

      {/* UX first: the long explanation is kept whole, but after the
          parts a booker scans. */}
      <Section ground="surface" width="default">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          Choosing a charter aircraft, explained
        </h2>
        <div className="mt-6">
          <Prose
            paragraphs={[
              'In plain terms, a helicopter lands at a helipad or site with no runway. A turboprop is a propeller plane that suits short runways and flights under about an hour. A private jet is faster on longer trips. Jets range from light jets for four to six people, where you cannot stand up inside, to large-cabin jets for long flights.',
              'Start with the destination, not the aircraft. Many people pick an aircraft first, then find it cannot use the destination. Runway length and site access rule out options first. Trip length decides whether speed is worth paying for. Passenger and baggage load sets the smallest cabin you can use. What is left is usually two or three types, not fifty.',
              `${AIRCRAFT.length} types are listed here with typical figures for each type. ${PUBLISHED_AIRCRAFT.length} of them have their own page, where there is something specific worth explaining. Compare the rest in the tables on each category page.`,
            ]}
          />
        </div>
      </Section>

      <Section ground="ivory" width="wide">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="max-w-[44ch] text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
            Not sure which aircraft you need? Describe your trip instead.
          </h2>
          <Button href="/request-a-charter">
            Request a Charter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
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
