import type { Metadata } from 'next';
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
    question: 'Why don’t you publish flight times for charter routes in India?',
    answer:
      'We publish a route’s distance and typical flight time only once verified, because people plan their day around a flight time and an estimate could mislead them.',
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

      <Section ground="midnight" width="wide">
        <div className="grid gap-12 lg:grid-cols-2">
          <PointList
            heading="What we check before publishing a route page"
            points={[
              'Verified distance for the city pair',
              'Verified typical flight time by aircraft category',
              'The aerodromes actually used at each end',
              'Charter points specific to that city pair',
              'Whether a one-way flight makes practical sense on it',
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
        <FaqSection faqs={ROUTE_FAQS} heading="Charter routes: common questions" />
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
              'We publish a page for a city pair only once its distance and typical flight time are verified. An estimated figure would be worse than none, because people plan their day around a flight time.',
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
