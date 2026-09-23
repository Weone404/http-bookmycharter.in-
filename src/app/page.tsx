import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeftRight,
  ArrowRight,
  Briefcase,
  MessageCircle,
  Mountain,
  Phone,
} from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';
import { getRoute } from '@/lib/routes';
import { CONTACT, whatsappLink } from '@/lib/site';
import {
  HOME_AIRCRAFT_GROUPS,
  HOME_SERVICES,
  HOW_IT_WORKS,
  PRICING_FACTORS,
  type HomeService,
} from '@/data/home';
import { aircraftByCategory, categorySpan, formatRange } from '@/data/aircraft';
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

function ServiceIcon({ icon }: { icon: HomeService['icon'] }) {
  const className = 'h-7 w-auto text-[var(--color-accent)]';
  if (icon === 'private-jet' || icon === 'helicopter') {
    return <AircraftGlyph category={icon} className={className} />;
  }
  const Icon = icon === 'mountain' ? Mountain : icon === 'empty-leg' ? ArrowLeftRight : Briefcase;
  return (
    <Icon className="h-7 w-7 text-[var(--color-accent)]" strokeWidth={1.6} aria-hidden="true" />
  );
}

const WHATSAPP_MESSAGE = 'Hello, I would like to enquire about a charter.';

export default function HomePage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Home route missing from the registry.');

  return (
    <>
      {/* ---------------------------------------------------------------- HERO
          One job: start a request. Headline, one sentence, the form, and a
          line for people who would rather talk. Critical content is plain
          HTML; the 3D layer mounts behind it later and never blocks it. */}
      {/* No overflow-hidden on the section itself: the airport list is an
          absolute popover inside the form and extends below the hero by
          design. Only the background layers are clipped, in the wrapper. */}
      <section className="on-dark relative bg-[var(--color-midnight)] text-[var(--color-ink-inverse)]">
        <div className="absolute inset-0 overflow-hidden">
          <HeroVisual />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(11,23,38,0.95)_0%,rgba(11,23,38,0.75)_48%,rgba(11,23,38,0.2)_100%)]"
          />
        </div>
        <Container width="wide">
          <div className="relative pb-10 pt-[clamp(2.5rem,1.5rem+4vw,4.5rem)]">
            <h1 className="max-w-[20ch] text-[length:var(--text-h1)] font-semibold leading-[1.05] tracking-[-0.02em]">
              Private jet &amp; helicopter charter across India
            </h1>
            <p className="mt-4 max-w-[54ch] text-[length:var(--text-lead)] text-[var(--color-ink-inverse-muted)]">
              Tell us the route, date and passengers. You get aircraft options with the cost broken
              down before you commit to anything.
            </p>

            {/* Below the desktop breakpoint the header has no service links,
                and the form fills the first screen — so the five services
                are repeated here as one row of chips, one tap each. */}
            <div className="-mx-[var(--spacing-gutter)] mt-6 overflow-x-auto xl:hidden">
              <ul className="flex w-max gap-2 px-[var(--spacing-gutter)]">
                {HOME_SERVICES.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="block whitespace-nowrap rounded-[var(--radius-pill)] border border-white/20 px-4 py-2 text-[length:var(--text-small)] font-medium hover:border-white/50"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-[var(--radius-card)] border border-white/10 bg-[var(--color-midnight-950)]/70 p-5 backdrop-blur-sm sm:p-6">
              <h2 className="text-[length:var(--text-micro)] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-inverse-muted)]">
                Start a charter request
              </h2>
              <div className="mt-5">
                <QuickCharterForm />
              </div>
            </div>

            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[length:var(--text-small)] text-[var(--color-ink-inverse-muted)]">
              <span>Prefer to talk?</span>
              <a
                href={`tel:${CONTACT.phone}`}
                data-track="call_click"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--color-ink-inverse)] hover:text-[var(--color-accent)]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="numeric">{CONTACT.phoneDisplay}</span>
              </a>
              <a
                href={whatsappLink(WHATSAPP_MESSAGE)}
                data-track="whatsapp_click"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--color-ink-inverse)] hover:text-[var(--color-accent)]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </p>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ SERVICES
          The five services, one click each, directly under the hero and in
          the same order as the header. */}
      <Section ground="surface" width="wide" className="py-[clamp(2.5rem,1.5rem+3vw,4rem)]!">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          What would you like to book?
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {HOME_SERVICES.map((service, index) => (
            <li
              key={service.href}
              className={index === HOME_SERVICES.length - 1 ? 'col-span-2 sm:col-span-1' : ''}
            >
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-5 transition-[border-color,box-shadow] duration-[var(--duration-fast)] hover:border-[var(--color-accent)] hover:shadow-[0_10px_30px_-12px_rgba(31,95,214,0.35)]"
              >
                <ServiceIcon icon={service.icon} />
                <h3 className="mt-4 text-[1.125rem] font-semibold leading-snug">{service.title}</h3>
                <p className="mt-1.5 flex-1 text-[length:var(--text-small)] leading-relaxed text-[var(--color-ink-muted)]">
                  {service.summary}
                </p>
                <ArrowRight
                  className="mt-4 h-4 w-4 text-[var(--color-accent)] transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------------ AIRCRAFT
          Choose by aircraft: seats, range and cruise speed for each group,
          computed from the fleet data — the spans across every type listed,
          so no figure appears here that is not on a type's own row. */}
      <Section ground="ivory" width="wide" className="py-[clamp(3rem,2rem+4vw,5.5rem)]!">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[60ch]">
            <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
              Choose by aircraft
            </h2>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              The airfield, the distance and the size of your party decide the aircraft, in that
              order.
            </p>
          </div>
          <Link
            href="/aircraft"
            className="inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)] hover:underline"
          >
            All aircraft
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_AIRCRAFT_GROUPS.map((group) => {
            const count = aircraftByCategory(group.category).length;
            if (count === 0) return null;
            const stats = [
              { label: 'Seats', value: formatRange(categorySpan(group.category, 'passengers')) },
              { label: 'Range', value: formatRange(categorySpan(group.category, 'rangeNm'), 'nm') },
              {
                label: 'Cruise',
                value: formatRange(categorySpan(group.category, 'cruiseKts'), 'kts'),
              },
            ];
            return (
              <li key={group.category}>
                <Link
                  href={group.href}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-6 transition-[border-color,box-shadow] duration-[var(--duration-fast)] hover:border-[var(--color-accent)] hover:shadow-[0_10px_30px_-12px_rgba(31,95,214,0.35)]"
                >
                  <AircraftGlyph
                    category={group.category}
                    className="h-9 w-auto self-start text-[var(--color-ink)]"
                  />
                  <h3 className="mt-5 text-[length:var(--text-h3)] font-semibold tracking-tight">
                    {group.title}
                  </h3>
                  <p className="numeric text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                    {count} types
                  </p>
                  <dl className="mt-5 grid flex-1 grid-cols-3 gap-2 border-t border-[var(--color-hairline)] pt-4">
                    {stats.map((stat) => (
                      <div key={stat.label}>
                        <dt className="text-[length:var(--text-micro)] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                          {stat.label}
                        </dt>
                        <dd className="numeric mt-1 text-[length:var(--text-small)] font-semibold">
                          {stat.value ?? '—'}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)]">
                    Compare {group.title.toLowerCase()}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
          Spans across the types listed in each group. Typical figures; they vary with variant,
          load, altitude and temperature.
        </p>
      </Section>

      {/* --------------------------------------------------------- HOW IT WORKS */}
      <Section ground="surface" width="wide" id="how-it-works">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[60ch]">
            <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
              How a charter is arranged
            </h2>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              Five steps, none of them hidden. Knowing what happens after you send an enquiry is
              most of what makes the first one easy to send.
            </p>
          </div>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)] hover:underline"
          >
            The full process
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {HOW_IT_WORKS.map((step) => (
            <li
              key={step.step}
              className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-ivory)] p-5"
            >
              <span className="numeric inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)] text-[length:var(--text-small)] font-semibold text-[var(--color-on-accent)]">
                {Number(step.step)}
              </span>
              <h3 className="mt-4 font-semibold leading-snug">{step.title}</h3>
              <p className="mt-2 text-[length:var(--text-small)] leading-relaxed text-[var(--color-ink-muted)]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
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

        <dl className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_FACTORS.map((item) => (
            <div key={item.factor}>
              <dt className="border-t border-[var(--color-hairline-strong)] pt-4 font-semibold">
                {item.factor}
              </dt>
              <dd className="mt-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                {item.explanation}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10">
          <Button href="/pricing" variant="secondary">
            Charter pricing in full
          </Button>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ FAQ */}
      <Section ground="surface" width="default">
        <FaqSection faqs={HOME_FAQS} />
      </Section>

      {/* ------------------------------------------------------------ FINAL CTA */}
      <Section ground="midnight" width="wide" className="py-[clamp(3rem,2rem+4vw,5.5rem)]!">
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
          <div className="flex flex-wrap gap-3">
            <Button href="/request-a-charter">
              Request a Charter
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <a
              href={whatsappLink(WHATSAPP_MESSAGE)}
              data-track="whatsapp_click"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-current/30 px-6 py-3.5 text-sm font-semibold hover:border-current"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
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
