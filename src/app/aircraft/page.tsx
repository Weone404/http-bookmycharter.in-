import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { getRoute } from '@/lib/routes';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { AIRCRAFT } from '@/data/aircraft';
import { FLEET_CLASS_META, fleetClasses, listItems } from '@/data/fleet-classes';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroActions } from '@/components/booking/HeroActions';
import { Prose } from '@/components/content/Prose';
import { FleetCarousel } from '@/components/fleet/FleetCarousel';
import { AircraftList } from '@/components/aircraft/AircraftList';

const PATH = '/aircraft' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function AircraftHubPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Aircraft route missing from the registry.');

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

      {/* 1. Choose a class in the 3D carousel. */}
      <Section ground="surface" width="wide">
        <h2
          id="classes-heading"
          className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight"
        >
          Choose your aircraft
        </h2>
        <p className="mt-3 max-w-[60ch] text-[var(--color-ink-muted)]">
          Swipe or tap a class to see its seats, range and speed. Then get a quote or view every
          type in it.
        </p>
        <div className="mt-8">
          <FleetCarousel classes={fleetClasses()} headingId="classes-heading" />
        </div>
      </Section>

      {/* 2. Every type, compact, filterable, one tap to its page. */}
      <Section ground="ivory" width="wide" id="types">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          All {AIRCRAFT.length} aircraft types
        </h2>
        <div className="mt-6">
          <AircraftList
            items={listItems(AIRCRAFT)}
            classes={FLEET_CLASS_META.map(({ id, label }) => ({ id, label }))}
            searchable
          />
        </div>
      </Section>

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
              `${AIRCRAFT.length} types are listed here with typical figures for each type, and every one has its own page with its full specification.`,
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
