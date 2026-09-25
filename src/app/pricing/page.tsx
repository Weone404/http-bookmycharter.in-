import type { Metadata } from 'next';
import { metadataForRoute } from '@/lib/metadata';
import { getRoute } from '@/lib/routes';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';
import { COST_COMPONENTS, PRICING_FAQS } from '@/data/pricing';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { GlanceCard, IntroLayout } from '@/components/content/GlanceCard';
import { Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';

const PATH = '/pricing' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function PricingPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Pricing route missing from the registry.');

  return (
    <>
      <Section ground="ivory" width="wide">
        {/* Answer-first. This paragraph is written to be quoted on its own by a
            search result or an answer engine, and to be the first useful thing a
            reader sees. */}
        <IntroLayout
          aside={
            <GlanceCard
              heading="What this page covers"
              stats={[
                { label: 'Cost components explained', value: COST_COMPONENTS.length },
                { label: 'Questions answered', value: PRICING_FAQS.length },
              ]}
              note="We don’t publish a headline rate. A rate without positioning, handling and ground time is not the price of a trip."
              primaryLabel="Get an itemised quote"
              secondaryHref="/insights/how-private-jet-charter-pricing-works-in-india"
              secondaryLabel="Read the full pricing guide"
            />
          }
          intro={
            <PageIntro
              path={PATH}
              title="Private Jet and Helicopter Charter Cost in India"
              summary="Private jet charter cost in India depends on the aircraft type, billed hours, positioning to your city, airport and handling fees, crew overnights, waiting time and taxes. Helicopter charter cost works the same way."
            />
          }
        >
          <div className="mt-10">
            <Prose
              paragraphs={[
                'In simple terms, the price is the aircraft’s hourly rate times the billed hours. Then add positioning, airport and handling fees, crew overnights, waiting time and taxes. A trip abroad also adds permits.',
                'We explain the method instead of showing a headline figure. A "from" price that leaves out positioning, handling and ground time is not the price of a trip. It is one part of it, chosen to look good in a search result.',
                'Two operators can quote the same aircraft on the same route and be far apart. The gap is almost always in what each quote includes, not in the aircraft.',
                'Below is each part of a real charter quote, what makes it go up or down, and what most often surprises people. Use it to compare two quotes item by item, not just two totals.',
              ]}
            />
          </div>
        </IntroLayout>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          What goes into a charter quote
        </h2>
        <div className="mt-10 space-y-12">
          {COST_COMPONENTS.map((component, index) => (
            <article key={component.name} className="border-t border-[var(--color-ink)]/15 pt-6">
              <div className="grid gap-6 lg:grid-cols-[0.55fr_1.45fr]">
                <div>
                  <span className="numeric text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-[length:var(--text-h3)] font-semibold tracking-tight">
                    {component.name}
                  </h3>
                </div>
                <div className="max-w-[66ch]">
                  <p>{component.whatItIs}</p>
                  <h4 className="mt-5 text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
                    What changes it
                  </h4>
                  <ul className="mt-3 space-y-2 text-[length:var(--text-small)]">
                    {component.whatMovesIt.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] h-px w-3.5 shrink-0 bg-[var(--color-accent)]"
                        />
                        <span className="text-[var(--color-ink-muted)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {component.typicalSurprise ? (
                    <p className="mt-5 border-l-2 border-[var(--color-accent)] pl-4 text-[length:var(--text-small)]">
                      {component.typicalSurprise}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section ground="midnight" width="wide">
        <div className="max-w-[68ch]">
          <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
            How to compare two charter quotes
          </h2>
          <ol className="mt-8 space-y-5">
            {[
              'Ask where the aircraft is based. Positioning is the most common reason two quotes for the same aircraft differ.',
              'Ask if positioning is included both ways, or only on the way out.',
              'Ask how much waiting time is assumed, and what happens if the day runs long.',
              'Ask if handling, landing and parking at every stop are included.',
              'Ask what is left out and what could be charged later.',
              'Compare complete totals. A lower quote that leaves things out is not a cheaper trip.',
            ].map((step, index) => (
              <li key={step} className="flex gap-5">
                <span className="numeric shrink-0 font-semibold text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[var(--color-ink-inverse-muted)]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section ground="ivory" width="default">
        <FaqSection faqs={PRICING_FAQS} heading="Charter cost: common questions" />
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks
          links={[
            {
              label: 'Private Jet Charter',
              href: '/private-charter/private-jet-charter',
              description: 'Cabin classes and which trips suit each',
            },
            {
              label: 'Helicopter Charter',
              href: '/helicopter-charter',
              description: 'Where waiting time drives the cost',
            },
            {
              label: 'Empty Legs',
              href: '/empty-leg-charter',
              description: 'When positioning works in your favour',
            },
            {
              label: 'Aircraft & Fleet',
              href: '/aircraft',
              description: 'Types and typical figures',
            },
            {
              label: 'How It Works',
              href: '/how-it-works',
              description: 'From enquiry to departure',
            },
            {
              label: 'Positioning explained',
              href: '/insights/how-aircraft-positioning-affects-charter-pricing',
              description: 'The part that changes the price most',
            },
          ]}
        />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: route.title, description: route.description, path: PATH }),
          breadcrumbSchema(PATH),
          faqSchema(PRICING_FAQS, PATH),
        ])}
      />
    </>
  );
}
