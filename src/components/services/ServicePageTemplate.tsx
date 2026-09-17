import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types/service';
import type { AircraftCategory } from '@/types/aircraft';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { PointList, Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';
import { aircraftByCategory, formatRange } from '@/data/aircraft';

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

  return (
    <>
      <Section ground="ivory" width="wide">
        <PageIntro path={path} title={service.name} summary={service.summary} />
        <div className="mt-10">
          <Prose paragraphs={service.definition} />
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/request-a-charter">
            Request a Charter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="/pricing" variant="secondary">
            How pricing works
          </Button>
        </div>
      </Section>

      <Section ground="midnight" width="wide">
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
              <span className="numeric text-[length:var(--text-small)] font-semibold text-[var(--color-cyan-deep)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-[length:var(--text-h3)] font-medium leading-snug">{step.title}</h3>
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
                <h3 className="text-[length:var(--text-h3)] font-medium">{CATEGORY_LABEL[category]}</h3>
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
                      className="mt-4 h-4 w-4 text-[var(--color-cyan-deep)] transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
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

      <Section ground="midnight" width="wide">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <PointList heading="What to know before you book" points={service.considerations} />
          <div>
            <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
              What drives the cost
            </h2>
            <dl className="mt-5 divide-y divide-white/10 border-t border-white/10">
              {service.pricingFactors.map((item) => (
                <div key={item.factor} className="py-4">
                  <dt className="font-medium">{item.factor}</dt>
                  <dd className="mt-1 text-[length:var(--text-small)] text-[var(--color-ink-inverse-muted)]">
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
