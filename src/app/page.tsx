import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';
import { getRoute } from '@/lib/routes';
import { CONTACT, whatsappLink } from '@/lib/site';
import { HOME_AIRCRAFT_GROUPS, HOME_SERVICES, HOW_IT_WORKS, PRICING_FACTORS } from '@/data/home';
import { AircraftGroupCard } from '@/components/aircraft/AircraftGroupCard';
import { HOME_FAQS } from '@/data/faqs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FaqSection } from '@/components/content/FaqSection';
import { QuickCharterForm } from '@/components/booking/QuickCharterForm';
import { HeroImage } from '@/components/home/HeroImage';
import { SiteImageFill } from '@/components/ui/SiteImageFill';

const PATH = '/' as const;

export const metadata: Metadata = metadataForRoute(PATH);

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
          <HeroImage />
          {/* Below lg the text spans the full width over the aircraft, so the
              scrim is even and strong enough for text anywhere on it. From lg
              the text sits left: dark there, clear on the right where the
              aircraft is. Measured: worst-case text contrast over the image
              at 390, 768, 1440 and 1920 px wide. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,23,38,0.74)_0%,rgba(11,23,38,0.8)_45%,rgba(11,23,38,0.92)_100%)] lg:bg-[linear-gradient(to_right,rgba(11,23,38,0.95)_0%,rgba(11,23,38,0.8)_42%,rgba(11,23,38,0.15)_100%)]"
          />
        </div>
        <Container width="wide">
          <div className="relative pb-10 pt-[clamp(2.5rem,1.5rem+4vw,4.5rem)]">
            <h1 className="max-w-[20ch] text-[length:var(--text-h1)] font-semibold leading-[1.05] tracking-[-0.02em]">
              Private Jet &amp; Helicopter Charter in India
            </h1>
            <p className="mt-4 max-w-[54ch] text-[length:var(--text-lead)] text-[var(--color-ink-inverse)]/85">
              Book My Charter arranges private jet, helicopter and aircraft charter across India,
              planned around your route, date and group size, with a quote you can request below.
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

            <div className="mt-8 rounded-[var(--radius-card)] border border-white/10 bg-[var(--color-midnight-950)]/70 p-4 backdrop-blur-sm sm:p-6">
              <h2 className="text-[length:var(--text-micro)] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-inverse-muted)]">
                Request a charter quote
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
          What would you like to charter?
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {HOME_SERVICES.map((service, index) => (
            <li
              key={service.href}
              className={index === HOME_SERVICES.length - 1 ? 'col-span-2 sm:col-span-1' : ''}
            >
              <Link
                href={service.href}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] transition-[border-color,box-shadow] duration-[var(--duration-fast)] hover:border-[var(--color-accent)] hover:shadow-[0_10px_30px_-12px_rgba(31,95,214,0.35)]"
              >
                <SiteImageFill
                  name={service.image}
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="aspect-[3/2] transition-transform duration-[var(--duration-base)] ease-[var(--ease-flight)] group-hover:scale-[1.03]"
                />
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-[1.125rem] font-semibold leading-snug">{service.title}</h3>
                  <p className="mt-1.5 flex-1 text-[length:var(--text-small)] leading-relaxed text-[var(--color-ink-muted)]">
                    {service.summary}
                  </p>
                  <ArrowRight
                    className="mt-4 h-4 w-4 text-[var(--color-accent)] transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
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
              Which aircraft suits your trip?
            </h2>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              Three things decide the aircraft, in this order: where you land, how far you fly and
              how many people are travelling.
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
          {HOME_AIRCRAFT_GROUPS.map((group) => (
            <li key={group.category}>
              <AircraftGroupCard title={group.title} category={group.category} href={group.href} />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
          Ranges cover the types listed in each group. These are typical figures. They vary with the
          model, load, altitude and temperature.
        </p>
      </Section>

      {/* --------------------------------------------------------- HOW IT WORKS */}
      <Section ground="surface" width="wide" id="how-it-works">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[60ch]">
            <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
              How to book a charter in 5 steps
            </h2>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              Booking a private jet or helicopter takes five clear steps. Here is what happens after
              you send an enquiry.
            </p>
          </div>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)] hover:underline"
          >
            How booking works
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {HOW_IT_WORKS.map((step) => (
            <li
              key={step.step}
              className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-ivory)] p-4 sm:p-5"
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
            How much does a private jet charter cost?
          </h2>
          {/* Answer-first: this paragraph is written to be quotable on its own. */}
          <p className="mt-5 text-[length:var(--text-lead)]">
            Private jet and helicopter charter cost in India depends on the aircraft type, flight
            hours, positioning, landing and parking, ground handling, crew, waiting time and taxes.
          </p>
          <p className="mt-4 text-[var(--color-ink-muted)]">
            We explain how a price is built instead of showing a headline figure. A
            &ldquo;from&rdquo; price that leaves out positioning and handling is not a real price.
            Here is every part of a charter quote. Any extra services you request are added on top.
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
            See charter pricing
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
              Ready to book a private jet or helicopter?
            </h2>
            <p className="mt-4 text-[var(--color-ink-inverse-muted)]">
              Your route, date and number of passengers is enough to start. You get aircraft options
              with the cost broken down, not one unexplained figure.
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
