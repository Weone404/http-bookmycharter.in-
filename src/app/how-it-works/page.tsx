import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { getRoute } from '@/lib/routes';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { voice } from '@/lib/business-model';
import { HOW_IT_WORKS } from '@/data/home';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { GlanceCard, IntroLayout } from '@/components/content/GlanceCard';
import { PointList, Prose } from '@/components/content/Prose';
import { RelatedLinks } from '@/components/content/RelatedLinks';

const PATH = '/how-it-works' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function HowItWorksPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('How it works route missing from the registry.');

  return (
    <>
      <Section ground="ivory" width="wide">
        <IntroLayout
          aside={
            <GlanceCard
              heading="What you need to start"
              stats={[
                { label: 'Steps from enquiry to flight', value: HOW_IT_WORKS.length },
                { label: 'Details needed to begin', value: 3 },
              ]}
              note="Route, date and passenger count is enough. Runway length, range, duty limits and permissions are checked for you."
              primaryLabel="Start an enquiry"
              secondaryHref="/pricing"
              secondaryLabel="How pricing works"
            />
          }
          intro={
            <PageIntro
              path={PATH}
              title="How charter booking works"
              summary="A charter enquiry becomes a flight in five steps: you describe the trip, suitable aircraft are identified against the real constraints, you receive options with the cost broken down, you choose, and the journey is coordinated."
            />
          }
        >
          <Prose
            paragraphs={[
              `${voice().whatWeDo} Charter is planned rather than booked, and the planning is the part that is invisible from outside — which is why the first enquiry feels harder to send than it should.`,
              'Nothing below requires you to know anything about aviation. Route, date and passenger count is enough to begin, and the constraints that matter — runway length, range, duty limits, permissions — are ours to check, not yours to anticipate.',
            ]}
          />
        </IntroLayout>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <ol className="space-y-0 divide-y divide-[var(--color-ink)]/15 border-t border-[var(--color-ink)]/15">
          {HOW_IT_WORKS.map((step) => (
            <li key={step.step} className="grid gap-4 py-8 lg:grid-cols-[0.3fr_1.7fr]">
              <span className="numeric text-[length:var(--text-h2)] font-semibold leading-none text-[var(--color-cyan-deep)]">
                {step.step}
              </span>
              <div className="max-w-[66ch]">
                <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">{step.title}</h2>
                <p className="mt-3 text-[var(--color-ink-muted)]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section ground="midnight" width="wide">
        <div className="grid gap-12 lg:grid-cols-2">
          <PointList
            heading="What we check that you do not have to"
            points={[
              'Whether both aerodromes can take the aircraft, and at the times you need',
              'Whether the aircraft has the range and the field performance for the sector',
              'Whether the day fits inside crew duty limits',
              'Whether passengers and baggage fit the aircraft in the conditions expected',
              'What permissions the route or the landing site requires, and how long they take',
            ]}
          />
          <PointList
            heading="What we need from you"
            points={[
              'Where you are going, and from where',
              'The date, and how firm it is',
              'How many people are travelling',
              'Anything that cannot move — a meeting, a ceremony, a connection',
              'Baggage or equipment beyond normal luggage',
            ]}
          />
        </div>
        <div className="mt-10">
          <Button href="/request-a-charter">
            Request a Charter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Section>

      <Section ground="ivory" width="wide">
        <RelatedLinks
          links={[
            { label: 'Charter Pricing', href: '/pricing', description: 'What the quote is made of' },
            { label: 'Private Charter', href: '/private-charter', description: 'Whole-aircraft hire' },
            { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'Site-based operations' },
            { label: 'Aircraft & Fleet', href: '/aircraft', description: 'Choosing the right type' },
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
