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
import { GlanceCard, IntroLayout } from '@/components/content/GlanceCard';
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
        <IntroLayout
          intro={
            <PageIntro
              path={PATH}
              title="About Book My Charter"
              summary="Book My Charter is a private jet and helicopter charter service based in Dwarka, Delhi, that arranges charter flights across India. We explain how charter works and what it costs, so you can decide before you commit."
            />
          }
          aside={
            <GlanceCard
              heading="Get in touch"
              secondaryHref="/contact"
              secondaryLabel="Contact Book My Charter"
            >
              <address className="mt-5 not-italic text-[length:var(--text-small)] leading-relaxed text-[var(--color-ink-muted)]">
                {ADDRESS.street}
                <br />
                {ADDRESS.locality}
                <br />
                {ADDRESS.region} {ADDRESS.postalCode}, India
              </address>
              <div className="mt-4 flex flex-col gap-1.5 text-[length:var(--text-small)] font-medium">
                <a
                  href={`tel:${CONTACT.phone}`}
                  data-track="call_click"
                  className="numeric hover:text-[var(--color-accent-strong)]"
                >
                  {CONTACT.phoneDisplay}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-[var(--color-accent-strong)]"
                >
                  {CONTACT.email}
                </a>
              </div>
            </GlanceCard>
          }
        >
          <Prose
            paragraphs={[
              `${voice().whatWeDo} Our job is planning, not selling. We work out which aircraft can fly your trip and what it will really cost once positioning and ground time are counted. If the first answer does not fit, we show you what would need to change.`,
              'Most of this website explains rather than sells, and that is on purpose. Charter is new to most people who need it. Prices look random until you know what goes into them, and many quotes leave things out. Once you understand positioning (flying the aircraft to you) and block time (engine start to engine stop), you can check whether any quote is complete, including ours.',
            ]}
          />
        </IntroLayout>
      </Section>

      <Section ground="midnight" width="wide">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-[66ch]">
            <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
              What we do and do not claim
            </h2>
            <p className="mt-5 text-[var(--color-ink-inverse-muted)]">
              We only publish facts we can back up with a dated source. Many aviation websites show
              numbers nobody can check, such as passengers carried, years in operation, safety
              records and certifications. If a reader could check it, we need a dated source for it,
              or it stays off the page.
            </p>
            <p className="mt-4 text-[var(--color-ink-inverse-muted)]">
              That is why you will not see a fleet count, a passenger total or a certification badge
              here. We have not published anything we cannot back up with a document. We would
              rather have a plainer page than one you cannot verify.
            </p>
          </div>
          <PointList
            heading="What this means for you"
            points={[
              'Aircraft specifications are typical for the type, not for one specific aircraft',
              'Prices are only published once verified',
              'Availability is never shown as live unless it is',
              'Testimonials and ratings only appear once they can be attributed',
              'Unknown facts are left out, not guessed',
            ]}
          />
        </div>
      </Section>

      <Section ground="ivory" width="wide">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
              Our office in Delhi
            </h2>
            <address className="mt-5 not-italic leading-relaxed text-[var(--color-ink-muted)]">
              {ADDRESS.street}
              <br />
              {ADDRESS.locality}
              <br />
              {ADDRESS.region} {ADDRESS.postalCode}, India
            </address>
            <p className="mt-4">
              <a
                href={`tel:${CONTACT.phone}`}
                data-track="call_click"
                className="numeric font-medium"
              >
                {CONTACT.phoneDisplay}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
              Char Dham pilgrimage flights
            </h2>
            <p className="mt-5 text-[var(--color-ink-muted)]">
              Char Dham and Kedarnath pilgrimage services, including seat-based flights, packages
              and travel information, are handled by{' '}
              <a href={SISTER_SITE.url} className="underline underline-offset-2">
                {SISTER_SITE.name}
              </a>
              . This site covers chartering a whole aircraft. That site covers the yatra.
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
            {
              label: 'How It Works',
              href: '/how-it-works',
              description: 'How to book a charter',
            },
            {
              label: 'Charter Pricing',
              href: '/pricing',
              description: 'What a charter costs, and why',
            },
            { label: 'Contact', href: '/contact', description: 'Phone, WhatsApp and email' },
            {
              label: 'Aviation Insights',
              href: '/insights',
              description: 'Private aviation guides',
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
