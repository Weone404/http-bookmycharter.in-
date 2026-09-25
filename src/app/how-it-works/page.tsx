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
              note="Your route, date and number of passengers is enough. We check runway length, range, crew duty limits and permissions for you."
              primaryLabel="Request a charter quote"
              secondaryHref="/pricing"
              secondaryLabel="How pricing works"
            />
          }
          intro={
            <PageIntro
              path={PATH}
              title="How to Book a Private Jet or Helicopter"
              summary="You can book a private jet or helicopter in India in five steps: share your trip, we find aircraft that fit, you get a charter quote with the cost broken down, you choose, and we coordinate the journey."
            />
          }
        >
          <Prose
            paragraphs={[
              `${voice().whatWeDo} A charter is planned, not just booked. Most of that planning happens out of sight, which is why a first enquiry can feel harder to send than it is.`,
              'You do not need to know anything about aviation. Your route, date and number of passengers is enough to begin. We check the things that matter, such as runway length, range, crew duty limits and permissions.',
            ]}
          />
        </IntroLayout>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <ol className="space-y-0 divide-y divide-[var(--color-ink)]/15 border-t border-[var(--color-ink)]/15">
          {HOW_IT_WORKS.map((step) => (
            <li key={step.step} className="grid gap-4 py-8 lg:grid-cols-[0.3fr_1.7fr]">
              <span className="numeric text-[length:var(--text-h2)] font-semibold leading-none text-[var(--color-accent-strong)]">
                {step.step}
              </span>
              <div className="max-w-[66ch]">
                <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
                  {step.title}
                </h2>
                <p className="mt-3 text-[var(--color-ink-muted)]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section ground="midnight" width="wide">
        <div className="grid gap-12 lg:grid-cols-2">
          <PointList
            heading="What we check for you"
            points={[
              'Airports: whether both ends can take the aircraft at the times you need',
              'Range and runway: whether the aircraft can fly the distance and use both runways',
              'Crew duty: whether your day fits inside crew duty limits',
              'Weight: whether passengers and baggage fit the aircraft in the expected conditions',
              'Permissions: what the route or landing site needs, and how long approval takes',
            ]}
          />
          <PointList
            heading="What we need from you"
            points={[
              'Route: where you are flying from and to',
              'Date: when you want to fly, and how firm that is',
              'Passengers: how many people are travelling',
              'Fixed times: anything that cannot move, like a meeting, ceremony or connection',
              'Baggage: any equipment or luggage beyond the normal',
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
            {
              label: 'Charter Pricing',
              href: '/pricing',
              description: 'What goes into a charter quote',
            },
            {
              label: 'Private Charter',
              href: '/private-charter',
              description: 'Hire a whole aircraft',
            },
            {
              label: 'Helicopter Charter',
              href: '/helicopter-charter',
              description: 'Book a helicopter in India',
            },
            {
              label: 'Aircraft & Fleet',
              href: '/aircraft',
              description: 'Choose the right aircraft',
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
