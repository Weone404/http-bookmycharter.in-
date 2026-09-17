import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { getRoute } from '@/lib/routes';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';
import {
  AVAILABLE_EMPTY_LEGS,
  EMPTY_LEG_CONDITIONS,
  EMPTY_LEG_DOES_NOT_SUIT,
  EMPTY_LEG_EXPLAINER,
  EMPTY_LEG_FAQS,
  EMPTY_LEG_SUITS,
} from '@/data/empty-legs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { PointList, Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';

const PATH = '/empty-leg-charter' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function EmptyLegPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Empty leg route missing from the registry.');

  return (
    <>
      <Section ground="ivory" width="wide">
        <PageIntro
          path={PATH}
          title="Empty leg flights"
          summary="An empty leg is a charter aircraft repositioning without passengers — flying out to collect a client, or returning to base afterwards — which an operator may sell at a reduced rate because the flight is happening either way."
        />
        <div className="mt-10">
          <Prose paragraphs={EMPTY_LEG_EXPLAINER} />
        </div>
      </Section>

      {/* Availability.
          There is no verified feed of operator availability yet, so this renders
          an honest empty state rather than invented rows. Publishing fabricated
          inventory would be a false availability claim; when a real feed exists
          this section becomes the live table with no template change. */}
      <Section ground="midnight" width="wide" id="availability">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          Current availability
        </h2>
        {AVAILABLE_EMPTY_LEGS.length === 0 ? (
          <div className="mt-6 max-w-[68ch] border-l-2 border-[var(--color-cyan-accent)] pl-5">
            <p>
              We do not publish a standing list of empty legs, because a list is out of date almost
              as soon as it is written — availability is created by other people&rsquo;s bookings and
              disappears when those bookings change.
            </p>
            <p className="mt-4 text-[var(--color-ink-inverse-muted)]">
              Tell us the direction you want to travel and the window you could move in, and we will
              match it against repositioning flights as they come up. A standing request with a
              flexible window catches far more than checking a page.
            </p>
          </div>
        ) : null}
        <div className="mt-8">
          <Button href="/request-a-charter">
            Register a flexible route
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Section>

      <Section ground="ivory" width="wide">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          How empty-leg availability behaves
        </h2>
        <div className="mt-8">
          <PointList heading="What governs it" points={EMPTY_LEG_CONDITIONS} />
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <PointList heading="Who they suit" points={EMPTY_LEG_SUITS} />
          <PointList heading="Who they do not suit" points={EMPTY_LEG_DOES_NOT_SUIT} />
        </div>
      </Section>

      <Section ground="ivory" width="default" className="pt-0">
        <FaqSection faqs={EMPTY_LEG_FAQS} heading="Empty leg questions" />
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks
          links={[
            { label: 'What is an empty leg?', href: '/insights/what-is-an-empty-leg-flight', description: 'The longer explanation' },
            { label: 'Charter Pricing', href: '/pricing', description: 'Why positioning costs what it does' },
            { label: 'Private Charter', href: '/private-charter', description: 'When you need your own schedule' },
            { label: 'Aircraft & Fleet', href: '/aircraft', description: 'Types and capacity' },
          ]}
        />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: route.title, description: route.description, path: PATH }),
          breadcrumbSchema(PATH),
          faqSchema(EMPTY_LEG_FAQS, PATH),
        ])}
      />
    </>
  );
}
