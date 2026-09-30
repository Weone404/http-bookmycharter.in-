import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import type { Path } from '@/types/common';
import type { Faq } from '@/types/faq';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';
import { formatKm } from '@/lib/route-math';
import { STATES, districtHref, nearestAirports, stateBySlug, stateHref } from '@/lib/areas';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroBooking } from '@/components/booking/HeroBooking';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { AreaFilter } from '@/components/areas/AreaFilter';
import { AreaSearch } from '@/components/areas/AreaSearch';

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}
export const dynamicParams = false;

const H2 = 'text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight';

function title(name: string) {
  const options = [
    `Private Jet & Helicopter Charter Across ${name}`,
    `Private Jet Charter Across ${name}`,
    `Charter Across ${name}`,
  ];
  const t = options.find((o) => o.length <= 60) ?? `Charter Across ${name}`;
  return { title: t, brand: t.length + 18 <= 62 };
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: slug } = await params;
  const state = stateBySlug(slug);
  if (!state) return {};
  const pins = state.districts.reduce((n, d) => n + d.pins, 0);
  const names = state.districts.slice(0, 3).map((d) => d.name).join(', ');
  const base = `Private jet & helicopter charter in ${state.name}: all ${state.districts.length} districts and ${pins.toLocaleString('en-IN')} pincodes`;
  const withNames = `${base}, incl. ${names}. Nearest airports and a quote.`;
  return pageMetadata({
    ...title(state.name),
    description: withNames.length <= 160 ? withNames : `${base}. Nearest airports and a quote.`.slice(0, 160),
    path: stateHref(state),
  });
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: slug } = await params;
  const state = stateBySlug(slug);
  if (!state) notFound();

  const path = stateHref(state);
  const pins = state.districts.reduce((n, d) => n + d.pins, 0);
  const areas = state.districts.reduce((n, d) => n + d.areas, 0);
  const rows = state.districts.map((d) => {
    const near = d.lat !== null && d.lon !== null ? nearestAirports(d.lat, d.lon, 1)[0] : undefined;
    return { ...d, near };
  });
  const summary = `Book a private jet or helicopter charter anywhere in ${state.name}: all ${state.districts.length} districts, ${pins.toLocaleString(
    'en-IN',
  )} pincodes and ${areas.toLocaleString('en-IN')} areas, each with its nearest airport and distance.`;

  const faqs: Faq[] = [
    {
      question: `Can I book a private jet or helicopter anywhere in ${state.name}?`,
      answer: `Yes, charter can be arranged from any district in ${state.name}: a private jet flies from the nearest suitable airport, and a helicopter can land at an approved helipad or open site closer to you.`,
    },
    {
      question: `How do I find the nearest airport to my area in ${state.name}?`,
      answer: `Open your district below, or type your pincode or area in the search, to see the nearest airports with straight-line distance and direction.`,
    },
    {
      question: `How much does a charter in ${state.name} cost?`,
      answer: `A charter in ${state.name} is quoted per trip from the aircraft’s hourly rate, the flying hours, positioning, airport fees, crew costs and GST.`,
    },
  ];

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={path}
          dynamic={{ path, label: state.name, parent: '/charter' }}
          eyebrow={`${state.districts.length} districts · ${pins.toLocaleString('en-IN')} pincodes`}
          image="band-destinations"
          title={title(state.name).title}
          summary={summary}
          action={
            <div className="mt-8 max-w-2xl">
              <AreaSearch label={`Find your area in ${state.name} or anywhere in India`} />
            </div>
          }
        />
      </Section>

      <Section ground="surface" width="wide">
        <h2 className={H2}>Districts in {state.name}</h2>
        <div className="mt-6">
          <AreaFilter target="district-list" placeholder={`Search districts in ${state.name}`} total={rows.length} noun="districts" />
        </div>
        <ul id="district-list" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((d) => (
            <li key={d.slug} data-q={d.name.toLowerCase()}>
              <Link
                href={districtHref(state, d)}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-ivory)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_12px_32px_rgba(11,23,38,0.10)]"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-semibold leading-snug">Charter in {d.name}</span>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-strong)] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="numeric mt-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                  {d.pins} pincodes · {d.areas.toLocaleString('en-IN')} areas
                </span>
                {d.near ? (
                  <span className="mt-3 text-[length:var(--text-small)]">
                    Nearest airport: <strong className="font-semibold">{d.near.record.iata ?? d.near.icao}</strong>,{' '}
                    <span className="numeric">{formatKm(d.near.km)}</span>
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section ground="midnight" width="default">
        <HeroBooking heading={`Get a charter quote in ${state.name}`} whatsappMessage={`Hello, I would like a charter quote in ${state.name}.`} />
      </Section>

      <Section ground="surface" width="default">
        <FaqSection heading={`${state.name} charter FAQs`} faqs={faqs} />
      </Section>

      <Section ground="ivory" width="wide">
        <RelatedLinks
          links={[
            { label: 'All states', href: '/charter' as Path, description: 'Charter anywhere in India' },
            { label: 'Charter routes', href: '/routes' as Path, description: 'City pairs, distance and time' },
            { label: 'Helicopter Charter', href: '/helicopter-charter' as Path, description: 'Land where there is no runway' },
          ]}
        />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: `Private Jet & Helicopter Charter in ${state.name}`, description: summary, path }),
          serviceSchema({
            name: `Private jet and helicopter charter in ${state.name}`,
            description: summary,
            path,
            area: { '@type': 'State', name: state.name, containedInPlace: { '@type': 'Country', name: 'India' } },
          }),
          breadcrumbSchema(path, { path, label: state.name, parent: '/charter' }),
          faqSchema(faqs, path),
        ])}
      />
    </>
  );
}
