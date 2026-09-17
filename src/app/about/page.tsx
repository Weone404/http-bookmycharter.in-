import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { getRoute } from '@/lib/routes';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { voice } from '@/lib/business-model';
import { ADDRESS, CONTACT, SISTER_SITE } from '@/lib/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { PointList, Prose } from '@/components/content/Prose';
import { RelatedLinks } from '@/components/content/RelatedLinks';

const PATH = '/about' as const;

export const metadata: Metadata = metadataForRoute(PATH);

/**
 * No team, no certifications, no counts, no years in operation.
 *
 * Every one of those is a checkable claim and none has a dated source
 * (docs/BUSINESS-DATA-REQUIRED H1, H2 and H5). The previous version of this
 * codebase carried named staff with military ranks and flight-hour figures,
 * an empanelment badge and an ISO certification, all unevidenced. They were
 * stripped, and they are not coming back without documents.
 *
 * What this page does instead is state how we handle claims. That is both
 * honest and, as it happens, more persuasive than an unverifiable badge.
 */
export default function AboutPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('About route missing from the registry.');

  return (
    <>
      <Section ground="ivory" width="wide">
        <PageIntro
          path={PATH}
          title="About Book My Charter"
          summary="Book My Charter arranges private jet, helicopter and aircraft charter across India, and publishes how charter works and what it costs so that the decision can be made before anyone is asked to commit."
        />
        <div className="mt-10">
          <Prose
            paragraphs={[
              `${voice().whatWeDo} The work is planning rather than selling: establishing what can actually operate a given trip, what it will genuinely cost once positioning and ground time are counted, and what would have to change if the first answer does not fit.`,
              'Most of this website is explanation rather than promotion. That is deliberate. Charter is unfamiliar to most people who need it, the pricing looks arbitrary until you know what builds it, and the industry has a habit of quoting incomplete numbers. Someone who understands positioning and block time can read any quote, including ours, and tell whether it is complete.',
            ]}
          />
        </div>
      </Section>

      <Section ground="midnight" width="wide">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-[66ch]">
            <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
              How we handle claims
            </h2>
            <p className="mt-5 text-[var(--color-ink-inverse-muted)]">
              Aviation websites are full of numbers nobody can check — passengers carried, years in
              operation, safety records, certifications. We hold ourselves to a rule that is easy to
              state and inconvenient to follow: anything a reader could verify has to have a dated
              source behind it, or it does not go on the page.
            </p>
            <p className="mt-4 text-[var(--color-ink-inverse-muted)]">
              That is why you will not find a fleet count, a passenger total or a certification badge
              here. It is not modesty. It is that we have not published anything we cannot produce a
              document for, and we would rather have a plainer page than an unverifiable one.
            </p>
          </div>
          <PointList
            heading="What that means in practice"
            points={[
              'Aircraft specifications are shown as typical for the type, not as tail-specific',
              'No price is published that has not been verified',
              'No availability is shown as live unless it is',
              'No testimonial or rating appears until it can be attributed',
              'Where a fact is unknown, the page omits it rather than estimating',
            ]}
          />
        </div>
      </Section>

      <Section ground="ivory" width="wide">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">Where we are</h2>
            <address className="mt-5 not-italic leading-relaxed text-[var(--color-ink-muted)]">
              {ADDRESS.street}
              <br />
              {ADDRESS.locality}
              <br />
              {ADDRESS.region} {ADDRESS.postalCode}, India
            </address>
            <p className="mt-4">
              <a href={`tel:${CONTACT.phone}`} data-track="call_click" className="numeric font-medium">
                {CONTACT.phoneDisplay}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
              The pilgrimage side
            </h2>
            <p className="mt-5 text-[var(--color-ink-muted)]">
              Char Dham and Kedarnath pilgrimage services — seat-based flights, packages and travel
              information — are handled by{' '}
              <a href={SISTER_SITE.url} className="underline underline-offset-2">
                {SISTER_SITE.name}
              </a>
              . This site covers chartering the aircraft; that one covers the yatra.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Button href="/request-a-charter">
            Request a Charter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks
          links={[
            { label: 'How It Works', href: '/how-it-works', description: 'From enquiry to departure' },
            { label: 'Charter Pricing', href: '/pricing', description: 'What a trip costs, and why' },
            { label: 'Contact', href: '/contact', description: 'Phone, WhatsApp and email' },
            { label: 'Aviation Insights', href: '/insights', description: 'Guides to how charter works' },
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
