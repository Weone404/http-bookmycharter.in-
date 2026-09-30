import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, Hash, MapPin, Plane } from 'lucide-react';
import type { Path } from '@/types/common';
import type { Faq } from '@/types/faq';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';
import { airportByIcao } from '@/lib/airport-search';
import { formatKm, HELICOPTER_MAX_KM } from '@/lib/route-math';
import {
  STATES,
  areaHref,
  compassWord,
  districtBySlug,
  districtHref,
  nearbyDistricts,
  pinHref,
  placeFacts,
  stateBySlug,
  stateHref,
} from '@/lib/areas';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroBooking } from '@/components/booking/HeroBooking';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { AreaFilter } from '@/components/areas/AreaFilter';
import { AreaSearch } from '@/components/areas/AreaSearch';
import {
  FlyingTimes,
  H2,
  NearestAirports,
  SourceNote,
  StatGrid,
  fitDescription,
  fitTitle,
} from '@/components/areas/PlaceSections';

export function generateStaticParams() {
  return STATES.flatMap((s) => s.districts.map((d) => ({ state: s.slug, district: d.slug })));
}
export const dynamicParams = false;

/** The page title, also its H1: unique across the site (the state is added unless the district name already says it). */
function districtTitle(state: { name: string }, district: { name: string }) {
  const place = district.name.includes(state.name) ? district.name : `${district.name}, ${state.name}`;
  return fitTitle([
    `Private Jet & Helicopter Charter in ${place}`,
    `Private Jet Charter in ${place}`,
    `Charter in ${place}`,
    `Private Jet Charter in ${district.name}`,
    `Charter in ${district.name}`,
  ]);
}

async function load(stateSlug: string, districtSlug: string) {
  const state = stateBySlug(stateSlug);
  const district = state ? await districtBySlug(stateSlug, districtSlug) : undefined;
  if (!state || !district) return null;
  return { state, district, ...placeFacts(district.lat, district.lon) };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; district: string }>;
}): Promise<Metadata> {
  const { state: s, district: d } = await params;
  const data = await load(s, d);
  if (!data) return {};
  const { state, district, main } = data;
  const first = district.pins[0]?.pin;
  const last = district.pins[district.pins.length - 1]?.pin;
  const pinText = first === last ? `pincode ${first}` : `pincodes ${first}–${last}`;
  const air = main ? `: nearest airport ${main.record.iata ?? main.icao}, ${Math.round(main.km)} km` : '';
  const names = district.pins.flatMap((p) => p.areas.map((a) => a[0]));
  const base = `Private jet & helicopter charter in ${district.name}, ${state.name}${air}. All ${pinText}`;
  return pageMetadata({
    ...districtTitle(state, district),
    description: fitDescription([
      `${base}, incl. ${names.slice(0, 3).join(', ')}. Get a quote.`,
      `${base}, incl. ${names.slice(0, 2).join(', ')}. Get a quote.`,
      `${base}, incl. ${names[0]}. Get a quote.`,
      `${base}. Get a quote.`,
      `${base}.`,
    ]),
    path: districtHref(state, district),
  });
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ state: string; district: string }>;
}) {
  const { state: s, district: d } = await params;
  const data = await load(s, d);
  if (!data) notFound();
  const { state, district, near, main, legs } = data;

  const path = districtHref(state, district);
  const place = `${district.name}, ${state.name}`;
  const option = main ? airportByIcao(main.icao) : undefined;
  const mainName = main ? `${main.record.name}${main.record.iata ? ` (${main.record.iata})` : ''}` : '';
  const areaCount = district.pins.reduce((n, p) => n + p.areas.length, 0);
  const firstLeg = legs[0];
  const summary = `Book a private jet or helicopter charter in ${place}.${
    main
      ? ` The nearest airport for a private jet is ${mainName}, about ${formatKm(main.km)} ${compassWord(main.bearing)} of the district centre.`
      : ''
  } A helicopter can land at an approved helipad or open ground closer to you. Pick your pincode or area below for its own page.`;

  const sample = district.pins.flatMap((p) => p.areas.map((a) => a[0])).slice(0, 5).join(', ');
  const delhiOrMumbai = legs.find((l) => l.city === 'Delhi') ?? legs.find((l) => l.city === 'Mumbai');
  const faqs: Faq[] = [
    ...(main
      ? [
          {
            question: `Which is the nearest airport for a private jet in ${district.name}?`,
            answer: `The nearest airport to ${district.name} for a private jet is ${mainName}, about ${formatKm(main.km)} in a straight line from the district centre${
              near[1] ? `; the next is ${near[1].record.name}, about ${formatKm(near[1].km)}` : ''
            }.`,
          },
        ]
      : []),
    {
      question: `Can a helicopter land in ${district.name}?`,
      answer: `Yes, a helicopter can land in ${district.name} at a licensed helipad or an open site with a clear approach, once the site and the local permission are confirmed before the date.`,
    },
    ...(delhiOrMumbai && main
      ? [
          {
            question: `How long is a private jet from ${district.name} to ${delhiOrMumbai.city}?`,
            answer: `About ${delhiOrMumbai.jet} by midsize jet from ${mainName}, for ${formatKm(delhiOrMumbai.km)} in a straight line, plus the drive from your area to the airport.`,
          },
        ]
      : []),
    {
      question: `Which pincodes and areas in ${district.name} can book a charter?`,
      answer: `All ${district.pins.length.toLocaleString('en-IN')} pincodes in ${district.name} (${district.pins[0]?.pin}${
        district.pins.length > 1 ? ` to ${district.pins[district.pins.length - 1]?.pin}` : ''
      }), including ${sample}, each with its own page listing its nearest airports.`,
    },
    {
      question: `How much does a private jet charter from ${district.name} cost?`,
      answer: `A private jet charter from ${district.name} is quoted per trip: the aircraft’s hourly rate times the flying hours, plus positioning to ${
        main ? (main.record.iata ?? main.record.name) : 'your airport'
      }, airport and handling fees, crew costs and GST.`,
    },
  ];

  const summaryRow = state.districts.find((x) => x.slug === district.slug);
  const nearby = summaryRow ? nearbyDistricts(state, summaryRow) : [];
  const crumbs = { path, label: district.name, parent: '/charter' as Path, between: [{ path: stateHref(state), label: state.name }] };

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={path}
          dynamic={crumbs}
          eyebrow={`${state.name} · ${district.pins.length} pincodes`}
          image={main && main.km <= HELICOPTER_MAX_KM ? 'band-helicopter-charter' : 'band-private-charter'}
          title={districtTitle(state, district).title}
          summary={summary}
          action={
            <HeroBooking
              heading={`Get a charter quote from ${district.name}`}
              {...(option ? { preset: { from: option.label } } : {})}
              whatsappMessage={`Hello, I would like a charter quote from ${place}.`}
            />
          }
        />
      </Section>

      <StatGrid
        stats={[
          {
            icon: Plane,
            label: 'Nearest airport',
            value: main ? formatKm(main.km) : '—',
            sub: main ? `${main.record.iata ?? main.icao} · straight line` : 'none on record',
          },
          { icon: Hash, label: 'Pincodes', value: district.pins.length.toLocaleString('en-IN'), sub: `in ${district.name}` },
          { icon: MapPin, label: 'Areas', value: areaCount.toLocaleString('en-IN'), sub: 'each with its own page' },
          {
            icon: Clock,
            label: firstLeg ? `Jet to ${firstLeg.city}` : 'By jet',
            value: firstLeg?.jet ?? '—',
            sub: firstLeg ? `from ${main?.record.iata ?? main?.icao}, estimated` : 'estimated flying time',
          },
        ]}
      />

      {/* The reason most people land here: find their own pincode or area. */}
      <Section ground="ivory" width="wide">
        <h2 className={H2}>Pincodes and areas in {district.name}</h2>
        <p className="mt-3 max-w-[65ch] text-[var(--color-ink-muted)]">
          Tap a pincode or an area for its own page: nearest airports, distances and a quote.
        </p>
        <div className="mt-6">
          <AreaFilter target="pin-list" placeholder={`Search ${district.name} by pincode or area`} total={district.pins.length} noun="pincodes" />
        </div>
        <ul id="pin-list" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {district.pins.map((p) => (
            <li
              key={p.pin}
              id={`pin-${p.pin}`}
              data-q={`${p.pin} ${p.areas.map((a) => a[0]).join(' ')}`.toLowerCase()}
              className="scroll-mt-24 rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-4 transition-shadow hover:shadow-[0_8px_24px_rgba(11,23,38,0.08)] target:ring-2 target:ring-[var(--color-accent)]"
            >
              <h3 className="flex items-baseline justify-between gap-3">
                <Link
                  href={pinHref(state, district, p.pin)}
                  className="group inline-flex items-center gap-1.5 text-[1.125rem] font-semibold hover:text-[var(--color-accent-strong)]"
                >
                  <span className="numeric">{p.pin}</span>
                  <ArrowRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <span className="text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                  {p.areas.length} {p.areas.length === 1 ? 'area' : 'areas'}
                </span>
              </h3>
              <p className="mt-2 text-[length:var(--text-small)] leading-relaxed">
                {p.areas.map((a, i) => (
                  <span key={a[1]}>
                    {i > 0 ? <span aria-hidden="true" className="text-[var(--color-ink-muted)]"> · </span> : null}
                    <Link href={areaHref(state, district, p.pin, a)} className="hover:text-[var(--color-accent-strong)] hover:underline">
                      {a[0]}
                    </Link>
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <NearestAirports place={district.name} near={near} />
      <FlyingTimes place={district.name} airport={mainName} legs={legs} />

      <Section ground="surface" width="default">
        <FaqSection heading={`${district.name} charter FAQs`} faqs={faqs} />
      </Section>

      <Section ground="midnight" width="wide">
        <AreaSearch label="Looking for another area? Search any pincode in India" />
      </Section>

      <Section ground="ivory" width="wide">
        <RelatedLinks
          links={[
            ...nearby.map((n) => ({
              label: `Charter in ${n.name}`,
              href: districtHref(state, n),
              description: 'km' in n ? `${Math.round(n.km as number)} km away` : state.name,
            })),
            { label: `Charter in ${state.name}`, href: stateHref(state), description: 'Every district in the state' },
            { label: 'Charter routes', href: '/routes' as Path, description: 'Distance and flying time by city pair' },
          ]}
        />
        <SourceNote />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: `Private Jet & Helicopter Charter in ${district.name}`, description: summary, path }),
          serviceSchema({
            name: `Private jet and helicopter charter in ${district.name}`,
            description: summary,
            path,
            area: {
              '@type': 'AdministrativeArea',
              name: district.name,
              containedInPlace: { '@type': 'State', name: state.name },
            },
          }),
          breadcrumbSchema(path, crumbs),
          faqSchema(faqs, path),
        ])}
      />
    </>
  );
}
