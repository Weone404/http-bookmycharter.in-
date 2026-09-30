import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CHARTER_ROUTES, routeHref } from '@/data/charter-routes';
import { formatKm, greatCircleKm } from '@/lib/route-math';
import { metadataForRoute } from '@/lib/metadata';
import { getRoute } from '@/lib/routes';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';
import type { Faq } from '@/types/faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroBooking } from '@/components/booking/HeroBooking';
import { PointList, Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';

const PATH = '/routes' as const;

export const metadata: Metadata = metadataForRoute(PATH);

const ROUTE_FAQS: readonly Faq[] = [
  {
    question: 'Is a charter route the same as an airline route?',
    answer:
      'No. An airline route is a scheduled service, while a charter route is any city pair you want to fly and exists only when a trip is booked.',
  },
  {
    question: 'Why does a one-way charter cost more than half a return?',
    answer:
      'A one-way charter costs more than half a return because the aircraft must still fly to you and usually back to base, so you pay for flights with no passengers.',
  },
  {
    question: 'Does the same charter route always cost the same?',
    answer:
      'No. The aircraft category, where that aircraft is based, the airports used at each end and the ground time all change the price for the same city pair.',
  },
  {
    question: 'How do you work out flight times for charter routes in India?',
    answer:
      'Each route page takes the straight-line distance between the two airports, adds 10% for airways, divides by each aircraft’s typical cruise speed and adds 25 minutes for taxi, climb and descent, so it is an estimate, not a schedule.',
  },
];

export default function RoutesPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Routes route missing from the registry.');

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={PATH}
          title="Charter Routes in India"
          summary="Charter routes in India are city pairs, not scheduled services. Each one depends on the airport at each end, which aircraft can use both, and where that aircraft is before your trip."
          action={<HeroBooking heading="Get a quote for your route" />}
        />
      </Section>

      {/* Every route page, one tap each. */}
      <Section ground="surface" width="wide">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          Popular charter routes
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHARTER_ROUTES.map((r) => {
            const km = greatCircleKm(r.from.icao, r.to.icao);
            return (
              <li key={r.slug}>
                <Link
                  href={routeHref(r)}
                  className="group flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-accent)]"
                >
                  <span>
                    <span className="block font-semibold group-hover:text-[var(--color-accent-strong)]">
                      {r.from.city} to {r.to.city}
                    </span>
                    {km ? (
                      <span className="numeric text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                        {formatKm(km)}
                      </span>
                    ) : null}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-[var(--color-accent-strong)] transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section ground="midnight" width="wide">
        <div className="grid gap-12 lg:grid-cols-2">
          <PointList
            heading="What every route page shows"
            points={[
              'Distance: straight line between the two airports, from public airport data',
              'Flying time: an estimate for jets, turboprops and, on short legs, helicopters',
              'Aircraft: which classes and types can fly it nonstop',
              'Airports: codes, elevation and longest runway at each end',
              'Notes: charter points specific to that city pair',
            ]}
          />
          <PointList
            heading="What changes the cost of one route"
            points={[
              'Aircraft category, the largest single factor',
              'Which airport is used at each end',
              'Where the aircraft is based before the trip',
              'One-way versus return',
              'Ground time at the far end',
              'Time of day, and whether the day runs past crew duty limits',
            ]}
          />
        </div>
      </Section>

      <Section ground="ivory" width="default">
        <FaqSection faqs={ROUTE_FAQS} heading="Charter route FAQs" />
      </Section>

      {/* UX first: the long explanation is kept whole, but after the
          parts a booker scans. */}
      <Section ground="surface" width="default">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          How a charter route is planned
        </h2>
        <div className="mt-6">
          <Prose
            paragraphs={[
              'A charter route is any two places you want to connect. Airlines publish routes because they fly them again and again to a timetable. Charter has no timetable.',
              'That matters for two reasons. Charter can serve a city pair no airline flies. And the same city pair can cost very different amounts on two different days.',
              'Three things decide a charter route. First, the aerodrome (airport or airfield) at each end: its runway, facilities and hours decide which aircraft can use it. Second, the distance, which decides whether a turboprop or a jet makes sense. Third, positioning (flying the aircraft to your city): where the aircraft is before your trip, and where it must go afterwards.',
              'Each route page shows its working: the distance comes from public airport coordinates, and the flying time is an estimate from each aircraft’s typical speed. The operator’s flight plan on the day is what counts.',
            ]}
          />
        </div>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks
          links={[
            { label: 'Destinations', href: '/destinations', description: 'Airport access by city' },
            {
              label: 'Charter Pricing',
              href: '/pricing',
              description: 'How a charter quote is built',
            },
            {
              label: 'Positioning explained',
              href: '/insights/how-aircraft-positioning-affects-charter-pricing',
              description: 'Why the same route can cost more or less',
            },
            {
              label: 'Aircraft & Fleet',
              href: '/aircraft',
              description: 'Which aircraft suits which flight',
            },
          ]}
        />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: route.title, description: route.description, path: PATH }),
          breadcrumbSchema(PATH),
          faqSchema(ROUTE_FAQS, PATH),
        ])}
      />
    </>
  );
}
