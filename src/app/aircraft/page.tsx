import type { Metadata } from 'next';
import Link from 'next/link';
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
import { Prose } from '@/components/content/Prose';
import { AircraftTable } from '@/components/aircraft/AircraftTable';
import { AircraftGlyph } from '@/components/ui/AircraftGlyph';
import { FleetShowroomMount } from '@/components/fleet/FleetShowroomMount';

const PATH = '/aircraft' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function AircraftHubPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Aircraft route missing from the registry.');

  const airliners = aircraftByCategory('executive-airliner');

  return (
    <>
      <Section ground="ivory" width="wide">
        <PageIntro
          path={PATH}
          title="Aircraft available for charter"
          summary="Charter aircraft fall into four working groups — helicopters, turboprops, private jets and regional aircraft — and the right group is decided by the airfield, the sector length and the size of the party, in that order."
        />
        <div className="mt-10">
          <Prose
            paragraphs={[
              'Most people start by choosing an aircraft and then discover it cannot use the destination. It is faster the other way round. Runway length and site access remove options first, sector length decides whether speed is worth paying for, and passenger and baggage load sets the floor on cabin size. What is left is usually a choice between two or three types rather than fifty.',
              `${AIRCRAFT.length} types are catalogued here with their typical figures. ${PUBLISHED_AIRCRAFT.length} of them have pages of their own, where there is something type-specific worth explaining; the rest are best compared in the tables on each category page.`,
            ]}
          />
        </div>
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
              Browse the fleet
            </h2>
            <p className="text-[length:var(--text-small)] text-[var(--color-ink-inverse-muted)]">
              Use the arrows, the aircraft list, or the left and right arrow keys.
            </p>
          </div>
        </Container>
        <FleetShowroomMount />
      </section>

      <Section ground="ivory" width="wide">
        <div className="grid gap-px border-t border-[var(--color-ink)]/15 sm:grid-cols-2 lg:grid-cols-3">
          {AIRCRAFT_CATEGORY_PAGES.map((category) => {
            const types = aircraftByCategory(category.category);
            return (
              <Link
                key={category.slug}
                href={category.canonical}
                className="group flex flex-col border-b border-[var(--color-ink)]/15 py-7 pr-7"
              >
                <AircraftGlyph
                  category={category.category}
                  className="mb-4 h-8 w-auto text-[var(--color-accent-strong)]"
                />
                <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
                  {category.title}
                </h2>
                <p className="numeric mt-1 text-[length:var(--text-small)] text-[var(--color-accent-strong)]">
                  {types.length} types
                </p>
                <p className="mt-3 flex-1 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                  {category.summary}
                </p>
                <ArrowRight
                  className="mt-5 h-4 w-4 text-[var(--color-accent-strong)] transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </Section>

      {airliners.length > 0 ? (
        <Section ground="midnight" width="wide">
          <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
            Regional aircraft for large groups
          </h2>
          <p className="mt-4 max-w-[68ch] text-[var(--color-ink-inverse-muted)]">
            Above roughly twenty passengers the conversation moves from business aircraft to regional
            airliners. These carry delegations, event parties and corporate offsites in one movement,
            and need substantially more lead time than a business jet.
          </p>
          <div className="mt-8">
            <AircraftTable aircraft={airliners} />
          </div>
        </Section>
      ) : null}

      <Section ground="ivory" width="wide">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="max-w-[44ch] text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
            Not sure which aircraft fits? Describe the trip instead.
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
