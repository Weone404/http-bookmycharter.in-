import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';
import { getRoute } from '@/lib/routes';
import { voice } from '@/lib/business-model';
import { CHARTER_CATEGORIES, HOW_IT_WORKS, PRICING_FACTORS } from '@/data/home';
import { HOME_FAQS } from '@/data/faqs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FaqSection } from '@/components/content/FaqSection';
import { QuickCharterForm } from '@/components/booking/QuickCharterForm';
import { HeroVisual } from '@/components/3d/HeroVisual';
import { AircraftGlyph } from '@/components/ui/AircraftGlyph';

const PATH = '/' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function HomePage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Home route missing from the registry.');

  return (
    <>
      {/* ---------------------------------------------------------------- HERO
          Critical content is plain HTML and paints immediately. The 3D layer
          mounts into the slot behind it later and never blocks this text. */}
      <section className="relative overflow-hidden bg-[var(--color-midnight)] text-[var(--color-ink-inverse)]">
        {/* The 3D layer sits behind the copy and is pointer-transparent. It
            carries no information: everything below is server-rendered HTML
            and is fully usable before, during and without WebGL. */}
        <HeroVisual />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(7,26,43,0.94)_0%,rgba(7,26,43,0.72)_46%,rgba(7,26,43,0.15)_100%)]"
        />
        <Container width="wide">
          <div className="relative py-[clamp(3rem,2rem+4.5vw,5.5rem)]">
            <p className="text-[length:var(--text-micro)] uppercase tracking-[0.2em] text-[var(--color-cyan-accent)]">
              Private aviation · India
            </p>
            <h1 className="mt-5 max-w-[18ch] text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-[-0.02em]">
              Private aviation, planned around you.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[length:var(--text-lead)] text-[var(--color-ink-inverse-muted)]">
              Private jets, helicopters and aircraft charter arranged around your route, schedule and
              passenger requirements — with the cost of the trip explained before you are asked to
              commit to anything.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/request-a-charter">
                Request a Charter
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/aircraft" variant="secondary">
                Explore Aircraft
              </Button>
            </div>
          </div>
        </Container>

        {/* ------------------------------------------------ CHARTER REQUEST */}
        <div className="relative border-t border-white/[0.09] bg-[var(--color-midnight-950)]/60">
          <Container width="wide">
            <div className="py-10">
              <h2 className="text-[length:var(--text-micro)] uppercase tracking-[0.16em] text-[var(--color-ink-inverse-muted)]">
                Start a charter request
              </h2>
              <div className="mt-6">
                <QuickCharterForm />
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ------------------------------------------------- CHARTER CATEGORIES */}
      <Section ground="ivory" width="wide">
        <div className="max-w-[60ch]">
          <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
            What you can charter
          </h2>
          <p className="mt-4 text-[length:var(--text-lead)] text-[var(--color-ink-muted)]">
            {voice().whatWeDo} Four routes into the same question — what suits your trip, and what it
            will cost.
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-[var(--color-ink)]/10 sm:grid-cols-2 lg:grid-cols-4">
          {CHARTER_CATEGORIES.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group flex flex-col bg-[var(--color-ivory)] p-7 transition-colors duration-[var(--duration-fast)] hover:bg-white"
            >
              {category.glyph ? (
                <AircraftGlyph
                  category={category.glyph}
                  className="mb-4 h-7 w-auto text-[var(--color-cyan-deep)]"
                />
              ) : null}
              <h3 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
                {category.title}
              </h3>
              <p className="mt-3 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                {category.summary}
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-[length:var(--text-small)]">
                {category.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-[var(--color-cyan-accent)]" />
                    <span className="text-[var(--color-ink-muted)]">{point}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-[length:var(--text-small)] font-medium text-[var(--color-cyan-deep)]">
                Read more
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------- HOW IT WORKS */}
      <Section ground="midnight" width="wide" id="how-it-works">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
              How a charter is arranged
            </h2>
            <p className="mt-4 text-[length:var(--text-lead)] text-[var(--color-ink-inverse-muted)]">
              Five steps, none of them hidden. Knowing what happens after you send an enquiry is most
              of what makes the first one easy to send.
            </p>
            <div className="mt-8">
              <Button href="/how-it-works" variant="secondary">
                The full process
              </Button>
            </div>
          </div>

          <ol className="space-y-0 divide-y divide-white/10 border-t border-white/10">
            {HOW_IT_WORKS.map((step) => (
              <li key={step.step} className="flex gap-6 py-6">
                <span className="numeric shrink-0 text-[length:var(--text-h3)] font-semibold text-[var(--color-cyan-accent)]">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-[length:var(--text-h3)] font-medium leading-snug">{step.title}</h3>
                  <p className="mt-2 text-[var(--color-ink-inverse-muted)]">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* -------------------------------------------------------------- PRICING */}
      <Section ground="ivory" width="wide" id="pricing">
        <div className="max-w-[65ch]">
          <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
            What a charter actually costs
          </h2>
          {/* Answer-first: this paragraph is written to be quotable on its own. */}
          <p className="mt-5 text-[length:var(--text-lead)]">
            The cost of a private jet or helicopter charter in India depends primarily on aircraft
            category, total flight hours, positioning of the aircraft to your departure point,
            landing and parking charges, ground handling, crew requirements, waiting time, taxes and
            any additional services requested.
          </p>
          <p className="mt-4 text-[var(--color-ink-muted)]">
            We publish the method rather than a headline figure, because a &ldquo;from&rdquo; price
            that ignores positioning and handling is not a price — it is a number chosen to win a
            search result. Here is every component that goes into a real quote.
          </p>
        </div>

        <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_FACTORS.map((item) => (
            <div key={item.factor}>
              <dt className="border-t border-[var(--color-ink)]/15 pt-4 text-[length:var(--text-h3)] font-medium tracking-tight">
                {item.factor}
              </dt>
              <dd className="mt-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                {item.explanation}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <Button href="/pricing" variant="secondary">
            Charter pricing in full
          </Button>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ FAQ */}
      <Section ground="ivory" width="default" className="pt-0">
        <FaqSection faqs={HOME_FAQS} />
      </Section>

      {/* ------------------------------------------------------------ FINAL CTA */}
      <Section ground="midnight" width="wide">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-[46ch]">
            <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
              Tell us where you need to go.
            </h2>
            <p className="mt-4 text-[var(--color-ink-inverse-muted)]">
              Route, date and passenger count is enough to start. You will get aircraft options with
              the cost broken down, not a single figure with no explanation behind it.
            </p>
          </div>
          <Button href="/request-a-charter">
            Request a Charter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: route.title, description: route.description, path: PATH }),
          breadcrumbSchema(PATH),
          faqSchema(HOME_FAQS, PATH),
        ])}
      />
    </>
  );
}
