import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types/service';
import type { AircraftCategory } from '@/types/aircraft';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { GlanceCard, IntroLayout } from '@/components/content/GlanceCard';
import { PointList, Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';
import { aircraftByCategory, formatRange } from '@/data/aircraft';
import { AircraftGlyph } from '@/components/ui/AircraftGlyph';

/**
 * One template, many service pages — but the CONTENT differs entirely per page,
 * which is the distinction that matters. A shared template is good engineering;
 * shared paragraphs with the nouns swapped is the duplicate-content pattern this
 * rebuild removed.
 *
 * Metadata, canonical, breadcrumbs and JSON-LD are part of the template rather
 * than something added to pages afterwards, so a new service page cannot ship
 * without them.
 */
const CATEGORY_LABEL: Record<AircraftCategory, string> = {
  helicopter: 'Helicopters',
  'private-jet': 'Private jets',
  turboprop: 'Turboprops',
  'executive-airliner': 'Regional aircraft',
  'group-charter': 'Group aircraft',
};

const CATEGORY_HREF: Partial<Record<AircraftCategory, string>> = {
  helicopter: '/aircraft/helicopters',
  'private-jet': '/aircraft/private-jets',
  turboprop: '/aircraft/turboprops',
};

export function ServicePageTemplate({ service }: { service: Service }) {
  const path = service.canonical;
  // Counted from the real fleet data, so the panel cannot claim a type that
  // is not listed further down the same page.
  const typeCount = service.suitableCategories.reduce(
    (total, category) => total + aircraftByCategory(category).length,
    0,
  );

  return (
    <>
      <Section ground="ivory" width="wide">
        {/* Two columns from lg up. The single-column version left the right
            half of the page empty and opened every service with three dense
            paragraphs and nothing to look at — which is the "it's all text"
            problem. The panel is orientation, not decoration: what flies it,
            how many types, and the action. */}
        <IntroLayout
          aside={
            <GlanceCard
              categories={service.suitableCategories}
              categoryLabel={CATEGORY_LABEL}
              stats={[
                { label: 'Aircraft types listed', value: typeCount },
                { label: 'Cost drivers', value: service.pricingFactors.length },
                { label: 'Steps to fly', value: service.howItWorks.length },
                { label: 'Questions answered', value: service.faqs.length },
              ]}
              secondaryHref="/pricing"
              secondaryLabel="How pricing works"
            />
          }
          intro={<PageIntro path={path} title={service.name} summary={service.summary} />}
        >
          <Prose paragraphs={service.definition} />
        </IntroLayout>
      </Section>

      <Section ground="surface" width="wide">
        <div className="grid gap-12 lg:grid-cols-2">
          <PointList heading="Who it is for" points={service.whoItIsFor} />
          <PointList heading="When to use it" points={service.whenToUseIt} />
        </div>
      </Section>

      <Section ground="ivory" width="wide">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          How it works
        </h2>
        <ol className="mt-8 grid gap-px border-t border-[var(--color-ink)]/15 sm:grid-cols-2 lg:grid-cols-4">
          {service.howItWorks.map((step, index) => (
            <li key={step.title} className="border-b border-[var(--color-ink)]/15 py-6 pr-6">
              <span className="numeric text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-[length:var(--text-h3)] font-medium leading-snug">
                {step.title}
              </h3>
              <p className="mt-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Suitable aircraft — the link into the fleet cluster, with real counts
          rather than a decorative list. */}
      <Section ground="ivory" width="wide" className="pt-0">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          Aircraft that suit this
        </h2>
        <div className="mt-8 grid gap-px border-t border-[var(--color-ink)]/15 sm:grid-cols-2 lg:grid-cols-4">
          {service.suitableCategories.map((category) => {
            const types = aircraftByCategory(category);
            const href = CATEGORY_HREF[category];
            const seats = types
              .map((t) => t.specs.passengers)
              .filter((p): p is { min: number; max: number } => p !== null);
            const capacity =
              seats.length > 0
                ? formatRange({
                    min: Math.min(...seats.map((s) => s.min)),
                    max: Math.max(...seats.map((s) => s.max)),
                  })
                : null;

            const body = (
              <>
                <AircraftGlyph
                  category={category}
                  className="mb-3 h-7 w-auto text-[var(--color-accent-strong)]"
                />
                <h3 className="text-[length:var(--text-h3)] font-medium">
                  {CATEGORY_LABEL[category]}
                </h3>
                {types.length > 0 ? (
                  <p className="mt-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                    {types.length} types
                    {capacity ? <> · {capacity} passengers</> : null}
                  </p>
                ) : null}
              </>
            );

            return (
              <div key={category} className="border-b border-[var(--color-ink)]/15 py-6 pr-6">
                {href ? (
                  <Link href={href} className="group block">
                    {body}
                    <ArrowRight
                      className="mt-4 h-4 w-4 text-[var(--color-accent-strong)] transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                ) : (
                  body
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
          Capacity figures are typical for each type and vary with configuration, baggage, altitude
          and temperature on the day.
        </p>
      </Section>

      {/* White, not midnight: three dark bands on one page made every service
          page read as heavy. The final call to action keeps the one dark band. */}
      <Section ground="surface" width="wide">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <PointList heading="What to know before you book" points={service.considerations} />
          <div>
            <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
              What drives the cost
            </h2>
            <dl className="mt-5 divide-y divide-[var(--color-hairline)] border-t border-[var(--color-hairline)]">
              {service.pricingFactors.map((item) => (
                <div key={item.factor} className="py-4">
                  <dt className="font-medium">{item.factor}</dt>
                  <dd className="mt-1 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                    {item.explanation}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section ground="ivory" width="default">
        <FaqSection faqs={service.faqs} />
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks links={service.related} />
      </Section>

      <Section ground="midnight" width="wide">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="max-w-[40ch] text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
            Tell us the route, the date and how many are travelling.
          </h2>
          <Button href="/request-a-charter">
            Request a Charter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: service.name, description: service.summary, path }),
          serviceSchema({ name: service.name, description: service.summary, path }),
          breadcrumbSchema(path),
          faqSchema(service.faqs, path),
        ])}
      />
    </>
  );
}
