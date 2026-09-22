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
              note="No headline rate is published here, because a rate that omits positioning, handling and ground time is not the price of a trip."
              primaryLabel="Get a broken-down quote"
              secondaryHref="/insights/how-private-jet-charter-pricing-works-in-india"
              secondaryLabel="Read the long version"
            />
          }
          intro={
            <PageIntro
              path={PATH}
              title="What a charter costs, and why"
              summary="The cost of a private jet or helicopter charter in India depends primarily on aircraft category, total block hours, positioning of the aircraft to your departure point, landing and parking charges, ground handling, crew duty requirements, waiting time, taxes, and any international permits the route requires."
            />
          }
        >
        <div className="mt-10">
          <Prose
            paragraphs={[
              'We publish the method rather than a headline figure. A "from" price that omits positioning, handling and ground time is not the price of a trip — it is one component of it, chosen to look attractive in a search result. Two operators quoting the same aircraft on the same route can differ substantially, and almost always the difference is in what the quote includes rather than in the aircraft.',
              'Below is every component that goes into a real quote, what moves each one, and the parts that most often surprise people. Read together, they let you compare two quotes properly instead of comparing two numbers.',
            ]}
          />
        </div>
        </IntroLayout>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          The components of a charter quote
        </h2>
        <div className="mt-10 space-y-12">
          {COST_COMPONENTS.map((component, index) => (
            <article key={component.name} className="border-t border-[var(--color-ink)]/15 pt-6">
              <div className="grid gap-6 lg:grid-cols-[0.55fr_1.45fr]">
                <div>
                  <span className="numeric text-[length:var(--text-small)] font-semibold text-[var(--color-cyan-deep)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-[length:var(--text-h3)] font-semibold tracking-tight">
                    {component.name}
                  </h3>
                </div>
                <div className="max-w-[66ch]">
                  <p>{component.whatItIs}</p>
                  <h4 className="mt-5 text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
                    What moves it
                  </h4>
                  <ul className="mt-3 space-y-2 text-[length:var(--text-small)]">
                    {component.whatMovesIt.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-3.5 shrink-0 bg-[var(--color-cyan-accent)]" />
                        <span className="text-[var(--color-ink-muted)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {component.typicalSurprise ? (
                    <p className="mt-5 border-l-2 border-[var(--color-cyan-accent)] pl-4 text-[length:var(--text-small)]">
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
            How to compare two quotes
          </h2>
          <ol className="mt-8 space-y-5">
            {[
              'Ask where the aircraft is based. Positioning is the most common reason two quotes for the same aircraft differ.',
              'Ask whether positioning both ways is included, or only the outbound.',
              'Ask what ground waiting is assumed, and what happens if the day runs long.',
              'Ask whether handling, landing and parking at every stop are in the figure.',
              'Ask what is excluded and what would be charged afterwards.',
              'Compare the complete figures. A lower incomplete quote is not a cheaper trip.',
            ].map((step, index) => (
              <li key={step} className="flex gap-5">
                <span className="numeric shrink-0 font-semibold text-[var(--color-cyan-accent)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[var(--color-ink-inverse-muted)]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section ground="ivory" width="default">
        <FaqSection faqs={PRICING_FAQS} heading="Charter cost questions" />
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks
          links={[
            { label: 'Private Jet Charter', href: '/private-charter/private-jet-charter', description: 'Cabin classes and sector fit' },
            { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'Where waiting time dominates' },
            { label: 'Empty Legs', href: '/empty-leg-charter', description: 'When positioning works for you' },
            { label: 'Aircraft & Fleet', href: '/aircraft', description: 'Types and typical figures' },
            { label: 'How It Works', href: '/how-it-works', description: 'From enquiry to departure' },
            { label: 'Positioning explained', href: '/insights/how-aircraft-positioning-affects-charter-pricing', description: 'The component that moves the number most' },
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
