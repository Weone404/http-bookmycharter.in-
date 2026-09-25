import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Path } from '@/types/common';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { AIRCRAFT_SPEC_SOURCE } from '@/data/aircraft.generated';
import {
  PUBLISHED_AIRCRAFT,
  aircraftByCategory,
  aircraftBySlug,
  formatRange,
} from '@/data/aircraft';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroActions } from '@/components/booking/HeroActions';

import { heroImageForCategory } from '@/lib/page-images';
import { PointList, Prose } from '@/components/content/Prose';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { AircraftTable } from '@/components/aircraft/AircraftTable';
import { AircraftPhoto } from '@/components/aircraft/AircraftPhoto';

/** Aircraft values the request form's select understands. */
const QUOTE_AIRCRAFT = new Set(['private-jet', 'helicopter', 'turboprop', 'group-charter']);

/**
 * Only aircraft marked `publish` get a URL. Every other type is a row in the
 * comparison table on its category page, which is more useful to a reader
 * choosing between them and does not add fifty near-identical pages to the index.
 */
export function generateStaticParams() {
  return PUBLISHED_AIRCRAFT.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

const CATEGORY_HUB: Record<string, { label: string; href: Path }> = {
  helicopter: { label: 'Helicopters', href: '/aircraft/helicopters' },
  'private-jet': { label: 'Private jets', href: '/aircraft/private-jets' },
  turboprop: { label: 'Turboprops', href: '/aircraft/turboprops' },
  'executive-airliner': { label: 'Aircraft', href: '/aircraft' },
  'group-charter': { label: 'Aircraft', href: '/aircraft' },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const aircraft = aircraftBySlug(slug);
  if (!aircraft?.curated) return {};
  // Built only from the spec figures we hold; falls back to the summary when either is missing.
  const seats = formatRange(aircraft.specs.passengers);
  const range = formatRange(aircraft.specs.rangeNm, 'nm');
  return pageMetadata({
    title: `${aircraft.name} Charter in India`,
    description:
      seats && range
        ? `Charter the ${aircraft.name} in India: ${seats} seats and ${range} range, typical for the type. See what it suits best and when to pick another aircraft.`
        : aircraft.curated.summary,
    path: aircraft.href,
  });
}

export default async function AircraftDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const aircraft = aircraftBySlug(slug);
  if (!aircraft?.published || !aircraft.curated) notFound();

  const curated = aircraft.curated;
  const hub = CATEGORY_HUB[aircraft.category] ?? { label: 'Aircraft', href: '/aircraft' as Path };
  const siblings = aircraftByCategory(aircraft.category).filter((a) => a.slug !== aircraft.slug);

  const specs: { label: string; value: string | null }[] = [
    { label: 'Passengers', value: formatRange(aircraft.specs.passengers) },
    { label: 'Range', value: formatRange(aircraft.specs.rangeNm, 'nm') },
    { label: 'Cruise speed', value: formatRange(aircraft.specs.cruiseKts, 'kts') },
    { label: 'Flight crew', value: formatRange(aircraft.specs.crew) },
    { label: 'Baggage', value: aircraft.specs.baggageNote },
  ];

  return (
    <>
      <Section ground="ivory" width="wide">
        <PageIntro
          path={aircraft.href}
          dynamic={{ path: aircraft.href, label: aircraft.name, parent: hub.href }}
          {...(curated.manufacturer ? { eyebrow: curated.manufacturer } : {})}
          title={aircraft.name}
          summary={curated.summary}
          image={heroImageForCategory(aircraft.category)}
          action={
            <HeroActions
              href={
                QUOTE_AIRCRAFT.has(aircraft.category)
                  ? `/request-a-charter?aircraft=${aircraft.category}`
                  : '/request-a-charter'
              }
              label={`Get a ${aircraft.name} quote`}
            />
          }
        />
        {/* Renders nothing until a credited Commons photo of this exact type is confirmed. */}
        <AircraftPhoto
          slug={aircraft.slug}
          name={aircraft.name}
          priority
          sizes="(min-width: 1280px) 72rem, 100vw"
          className="mt-10 max-w-5xl"
        />
      </Section>

      <Section ground="midnight" width="wide">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
              Seats, range and speed (typical figures)
            </h2>
            <dl className="mt-5 divide-y divide-white/10 border-t border-white/10">
              {/* A specification we do not have is omitted entirely. There is no
                  placeholder value and no inferred figure. */}
              {specs
                .filter((spec) => spec.value !== null)
                .map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-6 py-3.5">
                    <dt className="text-[var(--color-ink-inverse-muted)]">{spec.label}</dt>
                    <dd className="numeric text-right font-medium">{spec.value}</dd>
                  </div>
                ))}
            </dl>
            <p className="mt-5 text-[length:var(--text-small)] text-[var(--color-ink-inverse-muted)]">
              Typical for the type, not for one specific aircraft. Figures vary with variant,
              options, weight, altitude and temperature. Source: {AIRCRAFT_SPEC_SOURCE.document}.
            </p>
          </div>

          <div className="space-y-10">
            <PointList heading="Best for" points={curated.idealFor} />
            {curated.limitations ? (
              <PointList heading="When to choose another aircraft" points={curated.limitations} />
            ) : null}
          </div>
        </div>
      </Section>

      {siblings.length > 0 ? (
        <Section ground="ivory" width="wide">
          <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
            Compare with other {hub.label.toLowerCase()} for charter
          </h2>
          <div className="mt-8">
            <AircraftTable aircraft={siblings} />
          </div>
        </Section>
      ) : null}

      {/* UX first: specs and fit come first; the longer write-up follows. */}
      <Section ground="ivory" width="default">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          About the {aircraft.name}
        </h2>
        <div className="mt-6">
          <Prose paragraphs={curated.narrative ?? []} />
        </div>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks
          links={[
            { label: hub.label, href: hub.href, description: 'All types in this category' },
            {
              label: 'Charter Pricing',
              href: '/pricing',
              description: 'What drives the cost of a trip',
            },
            {
              label: 'How It Works',
              href: '/how-it-works',
              description: 'From enquiry to departure',
            },
            {
              label: 'Request a Charter',
              href: '/request-a-charter',
              description: 'Route, date, passengers',
            },
          ]}
        />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({
            name: `${aircraft.name} Charter in India`,
            description: curated.summary,
            path: aircraft.href,
          }),
          breadcrumbSchema(aircraft.href, {
            path: aircraft.href,
            label: aircraft.name,
            parent: hub.href,
          }),
        ])}
      />
    </>
  );
}
