import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { getRoute } from '@/lib/routes';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';
import type { Faq } from '@/types/faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { PointList, Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';

const PATH = '/routes' as const;

export const metadata: Metadata = metadataForRoute(PATH);

const ROUTE_FAQS: readonly Faq[] = [
  {
    question: 'Is a charter route the same as an airline route?',
    answer:
      'No. An airline route is a scheduled service between two airports; a charter route is simply a city pair somebody wants to fly, and it exists only when a trip is arranged.',
  },
  {
    question: 'Why is a one-way route not half the price of a return?',
    answer:
      'Because the aircraft still has to reach your departure point and usually has to return to base afterwards, so a one-way trip often involves the same number of flown sectors with passengers on only one of them.',
  },
  {
    question: 'Does the same route always cost the same?',
    answer:
      'No — the aircraft category, where that aircraft happens to be based, the airports chosen at each end and the ground time all change the figure for an identical city pair.',
  },
];

export default function RoutesPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Routes route missing from the registry.');

  return (
    <>
      <Section ground="ivory" width="wide">
        <PageIntro
          path={PATH}
          title="Charter routes"
          summary="A charter route is a city pair rather than a scheduled service, so what governs it is the airport at each end, the aircraft that can use both, and where that aircraft happens to be before your trip starts."
        />
        <div className="mt-10">
          <Prose
            paragraphs={[
              'Airlines publish routes because they fly them repeatedly to a timetable. Charter has no timetable, so a "route" is just a pair of places somebody wants to connect. That sounds like a technicality, and it is not: it is why charter can serve a city pair no airline touches, and why the same pair can cost very different amounts on two different days.',
              'Three things decide a route. First, the aerodrome at each end — runway, facilities and hours, which between them select the aircraft. Second, the distance, which decides whether a turboprop or a jet is the sensible answer. Third, positioning: where the aircraft is before your trip begins, and where it must be afterwards.',
              'Individual route pages are published here only where the distance and typical flight time have been verified for the pair. Publishing a figure that was estimated would be worse than publishing nothing, because a flight time is the kind of number people plan a day around.',
            ]}
          />
        </div>
        <div className="mt-10">
          <Button href="/request-a-charter">
            Price a specific route
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Section>

      <Section ground="midnight" width="wide">
        <div className="grid gap-12 lg:grid-cols-2">
          <PointList
            heading="What a route page needs before it is published"
            points={[
              'Verified distance for the city pair',
              'Verified typical flight time by aircraft category',
              'The aerodromes actually used at each end',
              'The charter considerations specific to that pair',
              'Whether a one-way makes operational sense on it',
            ]}
          />
          <PointList
            heading="What changes the cost of the same route"
            points={[
              'Aircraft category — the largest single factor',
              'Which airport is used at each end',
              'Where the aircraft is based before the trip',
              'One-way versus return',
              'Ground time at the far end',
              'Time of day, and whether the day exceeds crew duty limits',
            ]}
          />
        </div>
      </Section>

      <Section ground="ivory" width="default">
        <FaqSection faqs={ROUTE_FAQS} heading="Route questions" />
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks
          links={[
            { label: 'Destinations', href: '/destinations', description: 'Airport access by city' },
            { label: 'Charter Pricing', href: '/pricing', description: 'How a quote is built' },
            { label: 'Positioning explained', href: '/insights/how-aircraft-positioning-affects-charter-pricing', description: 'Why the same route varies' },
            { label: 'Aircraft & Fleet', href: '/aircraft', description: 'What can fly which sector' },
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
