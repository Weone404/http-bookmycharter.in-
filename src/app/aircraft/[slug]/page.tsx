import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import type { Path } from '@/types/common';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { AIRCRAFT_SPEC_SOURCE } from '@/data/aircraft.generated';
import { AIRCRAFT, aircraftBySlug, formatRange, type ResolvedAircraft } from '@/data/aircraft';
import {
  CLASS_META_BY_ID,
  FLEET_CLASS_META,
  KTS_TO_KMH,
  NM_TO_KM,
  classOf,
  formatSpan,
  inKm,
  listItems,
} from '@/data/fleet-classes';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroActions } from '@/components/booking/HeroActions';
import { heroImageForCategory } from '@/lib/page-images';
import { PointList, Prose } from '@/components/content/Prose';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { AircraftList } from '@/components/aircraft/AircraftList';
import { AircraftPhoto } from '@/components/aircraft/AircraftPhoto';

/**
 * One page per aircraft type, for every type on the sheet.
 *
 * UX first: the hero carries the three numbers people choose by (seats,
 * range, speed, with km beside nm) and the quote button. Then the full
 * specification and who the type suits, then the other types in the same
 * class, then the written narrative where one exists.
 *
 * Types without a curated write-up are built only from the specification
 * sheet and its own description line. Nothing is inferred beyond arithmetic
 * (nm to km).
 */
export function generateStaticParams() {
  return AIRCRAFT.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

const CATEGORY_HUB: Record<string, { label: string; href: Path }> = {
  helicopter: { label: 'Helicopters', href: '/aircraft/helicopters' },
  'private-jet': { label: 'Private jets', href: '/aircraft/private-jets' },
  turboprop: { label: 'Turboprops', href: '/aircraft/turboprops' },
  'executive-airliner': { label: 'Aircraft', href: '/aircraft' },
  'group-charter': { label: 'Aircraft', href: '/aircraft' },
};

function summaryFor(aircraft: ResolvedAircraft): string {
  if (aircraft.curated) return aircraft.curated.summary;
  const meta = CLASS_META_BY_ID.get(classOf(aircraft));
  const seats = formatSpan(aircraft.specs.passengers);
  const range = inKm(aircraft.specs.rangeNm, NM_TO_KM, 'km');
  const kind = meta ? meta.singular.toLowerCase() : 'aircraft';
  const facts = [seats ? `${seats} passengers` : null, range ? `a range of about ${range}` : null]
    .filter(Boolean)
    .join(' and ');
  return `The ${aircraft.name} is a ${kind} for charter in India${facts ? `, with ${facts}` : ''}. ${
    aircraft.sourceDescription ?? ''
  }`.trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const aircraft = aircraftBySlug(slug);
  if (!aircraft) return {};
  // Built only from the spec figures we hold; falls back to the summary when either is missing.
  const seats = formatRange(aircraft.specs.passengers);
  const range = formatRange(aircraft.specs.rangeNm, 'nm');
  return pageMetadata({
    title: `${aircraft.name} Charter in India`,
    description:
      seats && range
        ? `Charter the ${aircraft.name} in India: ${seats} seats and ${range} range, typical for the type. See what it suits best and when to pick another aircraft.`
        : summaryFor(aircraft).slice(0, 155),
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
  if (!aircraft) notFound();

  const curated = aircraft.curated;
  const classId = classOf(aircraft);
  const meta = CLASS_META_BY_ID.get(classId);
  const hub = CATEGORY_HUB[aircraft.category] ?? { label: 'Aircraft', href: '/aircraft' as Path };
  const siblings = AIRCRAFT.filter((a) => a.slug !== aircraft.slug && classOf(a) === classId);
  const summary = summaryFor(aircraft);
  const quote = meta?.quote;

  const seats = formatSpan(aircraft.specs.passengers);
  const range = formatSpan(aircraft.specs.rangeNm, 'nm');
  const rangeKm = inKm(aircraft.specs.rangeNm, NM_TO_KM, 'km');
  const speed = formatSpan(aircraft.specs.cruiseKts, 'kts');
  const speedKmh = inKm(aircraft.specs.cruiseKts, KTS_TO_KMH, 'km/h');
  const crew = formatRange(aircraft.specs.crew);

  const specs: { label: string; value: string | null }[] = [
    { label: 'Class', value: meta?.singular ?? null },
    { label: 'Passengers', value: seats },
    { label: 'Range', value: range && rangeKm ? `${range} (about ${rangeKm})` : range },
    { label: 'Cruise speed', value: speed && speedKmh ? `${speed} (about ${speedKmh})` : speed },
    { label: 'Flight crew', value: crew },
    { label: 'Baggage', value: aircraft.specs.baggageNote },
  ];

  // Plain-language facts for types without a curated "best for" list:
  // restatements of the sheet, nothing more.
  const simpleFacts = [
    seats ? `Carries ${seats} passengers in a typical layout` : null,
    rangeKm ? `Flies up to about ${rangeKm} without a fuel stop, in typical conditions` : null,
    speedKmh ? `Cruises at about ${speedKmh}` : null,
    crew ? `Flown by ${crew} ${crew === '1' ? 'pilot' : 'pilots'}` : null,
    meta ? meta.description : null,
  ].filter((fact): fact is string => fact !== null);

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={aircraft.href}
          dynamic={{ path: aircraft.href, label: aircraft.name, parent: hub.href }}
          eyebrow={[meta?.singular, curated?.manufacturer].filter(Boolean).join(' · ')}
          title={aircraft.name}
          summary={summary}
          image={heroImageForCategory(aircraft.category)}
          action={
            <>
              <dl className="mt-7 grid max-w-2xl grid-cols-3 gap-2 sm:gap-3">
                {[
                  { label: 'Seats', value: seats, sub: 'passengers' },
                  { label: 'Range', value: range, sub: rangeKm },
                  { label: 'Speed', value: speed, sub: speedKmh },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[var(--radius-control)] border border-white/15 bg-white/10 px-3 py-3 backdrop-blur-sm sm:px-4"
                  >
                    <dt className="text-[length:var(--text-micro)] uppercase tracking-[0.12em] text-[var(--color-ink-inverse-muted)]">
                      {stat.label}
                    </dt>
                    <dd className="numeric mt-1 text-[length:var(--text-small)] font-semibold sm:text-base">
                      {stat.value ?? '—'}
                    </dd>
                    {stat.value && stat.sub ? (
                      <dd className="numeric text-[length:var(--text-micro)] text-[var(--color-ink-inverse-muted)]">
                        {stat.sub}
                      </dd>
                    ) : null}
                  </div>
                ))}
              </dl>
              <HeroActions
                href={quote ? `/request-a-charter?aircraft=${quote}` : '/request-a-charter'}
                label={`Get a ${aircraft.name} quote`}
              />
            </>
          }
        />
        {/* Renders nothing until a credited Commons photo of this exact type is confirmed. */}
        <AircraftPhoto
          slug={aircraft.slug}
          name={aircraft.name}
          sizes="(min-width: 1280px) 72rem, 100vw"
          className="mt-10 max-w-5xl"
        />
      </Section>

      <Section ground="midnight" width="wide">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
              {aircraft.name} specifications (typical)
            </h2>
            <dl className="mt-5 divide-y divide-white/10 border-t border-white/10">
              {/* A specification we do not have is omitted entirely. There is no
                  placeholder value and no inferred figure. */}
              {specs
                .filter((spec) => spec.value !== null)
                .map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col gap-1 py-3.5 sm:flex-row sm:justify-between sm:gap-6"
                  >
                    <dt className="text-[var(--color-ink-inverse-muted)]">{spec.label}</dt>
                    <dd className="numeric font-medium sm:text-right">{spec.value}</dd>
                  </div>
                ))}
            </dl>
            <p className="mt-5 text-[length:var(--text-small)] text-[var(--color-ink-inverse-muted)]">
              Typical for the type, not for one specific aircraft. Figures vary with variant,
              options, weight, altitude and temperature. Source: {AIRCRAFT_SPEC_SOURCE.document}.
            </p>
          </div>

          <div className="space-y-10">
            {curated ? (
              <>
                <PointList heading="Best for" points={curated.idealFor} />
                {curated.limitations ? (
                  <PointList
                    heading="When to choose another aircraft"
                    points={curated.limitations}
                  />
                ) : null}
              </>
            ) : (
              <>
                <PointList heading={`The ${aircraft.name} in simple terms`} points={simpleFacts} />
                {aircraft.sourceDescription ? (
                  <div>
                    <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
                      Type overview
                    </h2>
                    <p className="mt-4 text-[var(--color-ink-inverse-muted)]">
                      {aircraft.sourceDescription}
                    </p>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </Section>

      {siblings.length > 0 && meta ? (
        <Section ground="ivory" width="wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
              Other {meta.label.toLowerCase()} for charter
            </h2>
            <Link
              href={meta.listHref}
              className="inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)] hover:underline"
            >
              View all {meta.label.toLowerCase()}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6">
            <AircraftList
              items={listItems(siblings)}
              classes={FLEET_CLASS_META.map(({ id, label }) => ({ id, label }))}
            />
          </div>
        </Section>
      ) : null}

      {curated?.narrative && curated.narrative.length > 0 ? (
        <Section ground="surface" width="default">
          <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
            About the {aircraft.name}
          </h2>
          <div className="mt-6">
            <Prose paragraphs={curated.narrative} />
          </div>
        </Section>
      ) : null}

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
            description: summary,
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
