import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Path } from '@/types/common';
import type { Faq } from '@/types/faq';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';
import { AREA_SOURCE, STATES, stateHref, totals } from '@/lib/areas';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { AreaFilter } from '@/components/areas/AreaFilter';
import { AreaSearch } from '@/components/areas/AreaSearch';

const PATH = '/charter' as Path;
const TITLE = 'Private Jet & Helicopter Charter Near Me';
const H2 = 'text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight';

const n = (x: number) => x.toLocaleString('en-IN');
const SUMMARY = `Find private jet and helicopter charter near you in any of India’s ${totals.states} states and union territories, ${n(
  totals.districts,
)} districts and ${n(totals.pins)} pincodes: type your pincode or area to see the nearest airports, distances and flying times.`;

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: `Private jet & helicopter charter near you: search any of ${n(totals.pins)} pincodes or ${n(
    totals.districts,
  )} districts in India for the nearest airport, distance and a quote.`,
  path: PATH,
});

const FAQS: Faq[] = [
  {
    question: 'How do I find a private jet or helicopter charter near me?',
    answer:
      'Type your pincode or area name in the search above, open your district, and you will see the nearest airports, their distance and direction, flying times to the main cities and a quote form.',
  },
  {
    question: 'Can I book a charter from a small town or village?',
    answer:
      'Yes; a private jet flies from the nearest suitable airport, and a helicopter can land at an approved helipad or open site near a town or village once the site and permission are confirmed.',
  },
  {
    question: 'Where does the pincode and area list come from?',
    answer: `From India Post’s All India Pincode Directory, published on data.gov.in, with extra locality names from an older India Post pincode list.`,
  },
];

export default function CharterHub() {
  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={PATH}
          eyebrow="Anywhere in India"
          image="band-destinations"
          title={TITLE}
          summary={SUMMARY}
          action={
            <div className="mt-8 max-w-2xl">
              <AreaSearch label="Search your pincode or area" />
              <p className="mt-4 flex flex-wrap gap-2 text-[length:var(--text-small)] font-medium text-[var(--color-ink-inverse)]">
                Try:
                {[
                  ['110007', '/charter/delhi/north-delhi#pin-110007'],
                  ['Bandra', '/charter/maharashtra/mumbai-suburban#pin-400050'],
                  ['Koramangala', '/charter/karnataka/bengaluru-urban#pin-560034'],
                ].map(([label, href]) => (
                  <Link
                    key={label}
                    href={href as Path}
                    className="rounded-[var(--radius-pill)] border border-white/20 px-3 py-0.5 text-[var(--color-ink-inverse)] hover:border-white/60"
                  >
                    {label}
                  </Link>
                ))}
              </p>
            </div>
          }
        />
      </Section>

      <Section ground="surface" width="wide">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ['States and UTs', totals.states],
            ['Districts', totals.districts],
            ['Pincodes', totals.pins],
            ['Areas', totals.areas],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-ivory)] p-4 sm:p-5">
              <dt className="text-[length:var(--text-micro)] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">{label}</dt>
              <dd className="numeric mt-2 text-[1.375rem] font-semibold">{n(value as number)}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section ground="ivory" width="wide">
        <h2 className={H2}>Charter by state</h2>
        <div className="mt-6">
          <AreaFilter target="state-list" placeholder="Search states and districts" total={STATES.length} noun="states" />
        </div>
        <ul id="state-list" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STATES.map((s) => {
            const pins = s.districts.reduce((m, d) => m + d.pins, 0);
            return (
              <li key={s.slug} data-q={`${s.name} ${s.districts.map((d) => d.name).join(' ')}`.toLowerCase()}>
                <Link
                  href={stateHref(s)}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_12px_32px_rgba(11,23,38,0.10)]"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-semibold leading-snug">{s.name}</span>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-strong)] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                  <span className="numeric mt-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                    {s.districts.length} districts · {n(pins)} pincodes
                  </span>
                  <span className="mt-3 line-clamp-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                    {s.districts.map((d) => d.name).join(', ')}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section ground="surface" width="default">
        <FaqSection heading="Charter near me FAQs" faqs={FAQS} />
      </Section>

      <Section ground="ivory" width="wide">
        <RelatedLinks
          links={[
            { label: 'Charter destinations', href: '/destinations' as Path, description: 'City guides with airport details' },
            { label: 'Charter routes', href: '/routes' as Path, description: 'City pairs, distance and time' },
            { label: 'Helicopter Charter', href: '/helicopter-charter' as Path, description: 'Land where there is no runway' },
          ]}
        />
        <p className="mt-8 text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">Source: {AREA_SOURCE.primary}.</p>
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: TITLE, description: SUMMARY, path: PATH }),
          serviceSchema({
            name: 'Private jet and helicopter charter in India',
            description: SUMMARY,
            path: PATH,
            area: { '@type': 'Country', name: 'India' },
          }),
          breadcrumbSchema(PATH),
          faqSchema(FAQS, PATH),
        ])}
      />
    </>
  );
}
