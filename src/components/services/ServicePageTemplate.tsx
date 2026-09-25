import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types/service';
import type { AircraftCategory } from '@/types/aircraft';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroBooking } from '@/components/booking/HeroBooking';
import type { QuotePreset } from '@/components/booking/QuickCharterForm';
import { PointList, Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';
import { aircraftByCategory, formatRange } from '@/data/aircraft';
import { SiteImageFill } from '@/components/ui/SiteImageFill';
import { CATEGORY_IMAGE } from '@/data/category-images';

/**
 * UX first: a visitor who lands here came to book, so the page opens with the
 * quote form, then the aircraft to choose from, then how it works and what it
 * costs in short scannable blocks. The long explanation still lives on the
 * page, in full and open, but at the end, for readers and search engines who
 * want it, not in front of everyone else.
 *
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

/** The aircraft values the request form's select understands. */
const QUOTE_AIRCRAFT: Partial<Record<AircraftCategory, QuotePreset['aircraft']>> = {
  helicopter: 'helicopter',
  'private-jet': 'private-jet',
  turboprop: 'turboprop',
  'group-charter': 'group-charter',
};

/** What each page hands forward to /request-a-charter. */
function presetFor(service: Service): QuotePreset {
  const only = service.suitableCategories.length === 1 ? service.suitableCategories[0] : undefined;
  const aircraft =
    service.slug === 'private-jet-charter'
      ? 'private-jet'
      : only
        ? QUOTE_AIRCRAFT[only]
        : undefined;
  const purpose: QuotePreset['purpose'] =
    service.slug === 'corporate-charter' ? 'corporate' : undefined;
  return { ...(aircraft ? { aircraft } : {}), ...(purpose ? { purpose } : {}) };
}

function quoteHref(aircraft?: QuotePreset['aircraft']): string {
  return aircraft ? `/request-a-charter?aircraft=${aircraft}` : '/request-a-charter';
}

const GRID_COLS: Record<number, string> = {
  2: 'lg:max-w-4xl',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

function seatRange(
  types: readonly { specs: { passengers: { min: number; max: number } | null } }[],
) {
  const seats = types
    .map((t) => t.specs.passengers)
    .filter((p): p is { min: number; max: number } => p !== null);
  return seats.length > 0
    ? formatRange({
        min: Math.min(...seats.map((x) => x.min)),
        max: Math.max(...seats.map((x) => x.max)),
      })
    : null;
}

/**
 * A service flown by one kind of aircraft (every helicopter page) gets one
 * wide card listing the actual types, so the choice is visible at a glance
 * instead of one lonely tile in a four-column grid.
 */
function SingleCategory({ category }: { category: AircraftCategory }) {
  const types = aircraftByCategory(category);
  const href = CATEGORY_HREF[category];
  const capacity = seatRange(types);
  return (
    <div className="mt-8 grid overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] lg:grid-cols-[0.9fr_1.1fr]">
      {CATEGORY_IMAGE[category] ? (
        <SiteImageFill
          name={CATEGORY_IMAGE[category]}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="aspect-[3/2] lg:aspect-auto lg:h-full"
        />
      ) : null}
      <div className="p-5 sm:p-8">
        <h3 className="text-[length:var(--text-h3)] font-semibold">{CATEGORY_LABEL[category]}</h3>
        <p className="mt-1 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
          {types.length} types{capacity ? <> · {capacity} passengers</> : null}
        </p>
        <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
          {types.map((type) => {
            const seats = type.specs.passengers ? formatRange(type.specs.passengers) : null;
            const label = (
              <>
                <span className="font-medium">{type.name}</span>
                {seats ? (
                  <span className="numeric text-[var(--color-ink-muted)]"> · {seats} seats</span>
                ) : null}
              </>
            );
            return (
              <li
                key={type.slug}
                className="border-b border-[var(--color-hairline)] py-2.5 text-[length:var(--text-small)]"
              >
                {type.published ? (
                  <Link href={type.href} className="hover:text-[var(--color-accent-strong)]">
                    {label}
                  </Link>
                ) : (
                  label
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[length:var(--text-small)] font-semibold">
          <Link
            href={quoteHref(QUOTE_AIRCRAFT[category])}
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-4 py-2 text-[var(--color-on-accent)] hover:bg-[var(--color-accent-strong)]"
          >
            Get a quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {href ? (
            <Link
              href={href}
              className="text-[var(--color-accent-strong)] underline-offset-4 hover:underline"
            >
              Compare seats, range and speed
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const H2 = 'text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight';

export function ServicePageTemplate({ service }: { service: Service }) {
  const path = service.canonical;
  const topic = service.keyword ?? service.name.toLowerCase();
  const Topic = topic.charAt(0).toUpperCase() + topic.slice(1);
  const single =
    service.suitableCategories.length === 1 ? service.suitableCategories[0] : undefined;

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={path}
          title={service.headline ?? service.name}
          summary={service.summary}
          action={<HeroBooking heading={`Get a ${topic} quote`} preset={presetFor(service)} />}
        />
      </Section>

      {/* 1. Choose the aircraft: the second thing a booker wants to see. */}
      <Section ground="surface" width="wide">
        <h2 className={H2}>Best aircraft for {topic}</h2>
        {single ? (
          <SingleCategory category={single} />
        ) : (
          <div
            className={`mt-8 grid gap-5 sm:grid-cols-2 ${GRID_COLS[service.suitableCategories.length] ?? 'lg:grid-cols-4'}`}
          >
            {service.suitableCategories.map((category) => {
              const types = aircraftByCategory(category);
              const href = CATEGORY_HREF[category];
              const seats = types
                .map((t) => t.specs.passengers)
                .filter((p): p is { min: number; max: number } => p !== null);
              const capacity =
                seats.length > 0
                  ? formatRange({
                      min: Math.min(...seats.map((x) => x.min)),
                      max: Math.max(...seats.map((x) => x.max)),
                    })
                  : null;
              return (
                <div
                  key={category}
                  className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)]"
                >
                  {CATEGORY_IMAGE[category] ? (
                    <SiteImageFill
                      name={CATEGORY_IMAGE[category]}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[3/2]"
                    />
                  ) : null}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[length:var(--text-h3)] font-semibold">
                      {CATEGORY_LABEL[category]}
                    </h3>
                    {types.length > 0 ? (
                      <p className="mt-1 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                        {types.length} types
                        {capacity ? <> · {capacity} passengers</> : null}
                      </p>
                    ) : null}
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-[length:var(--text-small)] font-semibold">
                      <Link
                        href={quoteHref(QUOTE_AIRCRAFT[category])}
                        className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-4 py-2 text-[var(--color-on-accent)] hover:bg-[var(--color-accent-strong)]"
                      >
                        Get a quote
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      {href ? (
                        <Link
                          href={href}
                          className="text-[var(--color-accent-strong)] underline-offset-4 hover:underline"
                        >
                          Compare types
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <p className="mt-5 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
          Seats are typical for each type and change with layout, baggage, altitude and temperature
          on the day.
        </p>
      </Section>

      {/* 2. How it works, in four short steps. */}
      <Section ground="ivory" width="wide">
        <h2 className={H2}>How {topic} works</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {service.howItWorks.map((step, index) => (
            <li
              key={step.title}
              className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-5"
            >
              <span className="numeric inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)] text-[length:var(--text-small)] font-semibold text-[var(--color-on-accent)]">
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold leading-snug">{step.title}</h3>
              <p className="mt-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 3. Cost, as scannable cards rather than a long list. */}
      <Section ground="surface" width="wide">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className={H2}>{Topic} cost: what you pay for</h2>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)] hover:underline"
          >
            Full pricing guide
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.pricingFactors.map((item) => (
            <div
              key={item.factor}
              className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] p-5"
            >
              <dt className="font-semibold">{item.factor}</dt>
              <dd className="mt-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                {item.explanation}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* 4. Is it right for me: three short lists side by side. */}
      <Section ground="ivory" width="wide">
        <div className="grid gap-12 lg:grid-cols-3">
          <PointList heading={`Who ${topic} is for`} points={service.whoItIsFor} />
          <PointList heading={`When to choose ${topic}`} points={service.whenToUseIt} />
          <PointList heading={`Before you book ${topic}`} points={service.considerations} />
        </div>
      </Section>

      <Section ground="surface" width="default">
        <FaqSection heading={`${Topic}: common questions`} faqs={service.faqs} />
      </Section>

      {/* 5. The full explanation: kept whole, placed last. */}
      <Section ground="ivory" width="default">
        <h2 className={H2}>{Topic} explained</h2>
        <div className="mt-6">
          <Prose paragraphs={service.definition} />
        </div>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks links={service.related} />
      </Section>

      <Section ground="midnight" width="wide">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="max-w-[40ch] text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
            Get a {topic} quote. Share your route, date and number of passengers.
          </h2>
          <Button href={quoteHref(presetFor(service).aircraft)}>
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
