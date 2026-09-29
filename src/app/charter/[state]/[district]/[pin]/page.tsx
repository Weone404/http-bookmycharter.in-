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
  areaHref,
  compassWord,
  districtBySlug,
  districtHref,
  nearbyPins,
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
import { AreaSearch } from '@/components/areas/AreaSearch';
import {
  FlyingTimes,
  H2,
  LinkChips,
  NearestAirports,
  SourceNote,
  StatGrid,
  fitDescription,
  fitTitle,
} from '@/components/areas/PlaceSections';

/**
 * One page per pincode (19,300 of them). Rendered on first request and then
 * served from the cache, rather than all at build time.
 */
export function generateStaticParams() {
  return [];
}
export const dynamicParams = true;
export const revalidate = false;

async function load(s: string, d: string, pinCode: string) {
  if (!/^\d{6}$/.test(pinCode)) return null;
  const state = stateBySlug(s);
  const district = state ? await districtBySlug(s, d) : undefined;
  const pin = district?.pins.find((p) => p.pin === pinCode);
  if (!state || !district || !pin) return null;
  return { state, district, pin, ...placeFacts(pin.lat, pin.lon) };
}

type Params = Promise<{ state: string; district: string; pin: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { state: s, district: d, pin: p } = await params;
  const data = await load(s, d, p);
  if (!data) return {};
  const { state, district, pin, main } = data;
  const names = pin.areas.map((a) => a[0]);
  const air = main ? ` Nearest airport ${main.record.iata ?? main.icao}, ${Math.round(main.km)} km.` : '';
  const head = `Private jet & helicopter charter in ${pin.pin}, ${district.name}, ${state.name}`;
  return pageMetadata({
    ...fitTitle([
      `Private Jet & Helicopter Charter in ${pin.pin}, ${district.name}`,
      `Private Jet Charter in ${pin.pin}, ${district.name}`,
      `Private Jet & Helicopter Charter in ${pin.pin}`,
      `Charter in ${pin.pin}, ${district.name}`,
    ]),
    description: fitDescription([
      `${head}: ${names.slice(0, 3).join(', ')}.${air} Get a quote.`,
      `${head}: ${names.slice(0, 2).join(', ')}.${air} Get a quote.`,
      `${head}: ${names[0] ?? ''}.${air}`,
      `${head}.${air}`,
      `${head}.`,
    ]),
    path: pinHref(state, district, pin.pin),
  });
}

export default async function PinPage({ params }: { params: Params }) {
  const { state: s, district: d, pin: p } = await params;
  const data = await load(s, d, p);
  if (!data) notFound();
  const { state, district, pin, near, main, legs } = data;

  const path = pinHref(state, district, pin.pin);
  const names = pin.areas.map((a) => a[0]);
  const option = main ? airportByIcao(main.icao) : undefined;
  const mainName = main ? `${main.record.name}${main.record.iata ? ` (${main.record.iata})` : ''}` : '';
  const list = names.length > 4 ? `${names.slice(0, 4).join(', ')} and ${names.length - 4} more` : names.join(', ');
  const summary = `Book a private jet or helicopter charter from pincode ${pin.pin} in ${district.name}, ${state.name}${
    names.length ? `, covering ${list}` : ''
  }.${main ? ` The nearest airport for a private jet is ${mainName}, about ${formatKm(main.km)} ${compassWord(main.bearing)}.` : ''}`;

  const firstLeg = legs[0];
  const faqs: Faq[] = [
    {
      question: `Which areas come under pincode ${pin.pin}?`,
      answer: `Pincode ${pin.pin} in ${district.name}, ${state.name} covers ${names.join(', ')}.`,
    },
    ...(main
      ? [
          {
            question: `Which is the nearest airport to pincode ${pin.pin}?`,
            answer: `The nearest airport to pincode ${pin.pin} for a private jet is ${mainName}, about ${formatKm(main.km)} in a straight line${
              near[1] ? `; the next is ${near[1].record.name}, about ${formatKm(near[1].km)}` : ''
            }.`,
          },
        ]
      : []),
    {
      question: `Can a helicopter pick me up in ${pin.pin}?`,
      answer: `Yes, a helicopter can pick you up near ${pin.pin} from a licensed helipad or an approved open site, once the site and the local permission are confirmed before the date.`,
    },
    ...(firstLeg && main
      ? [
          {
            question: `How long is a private jet from ${pin.pin} to ${firstLeg.city}?`,
            answer: `About ${firstLeg.jet} by midsize jet from ${mainName}, plus the drive from your area to the airport.`,
          },
        ]
      : []),
  ];

  const nearby = nearbyPins(district, pin);
  const crumbs = {
    path,
    label: pin.pin,
    parent: '/charter' as Path,
    between: [
      { path: districtHref(state, district), label: district.name },
      { path: stateHref(state), label: state.name },
    ],
  };

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={path}
          dynamic={crumbs}
          eyebrow={`${district.name}, ${state.name}`}
          image={main && main.km <= HELICOPTER_MAX_KM ? 'band-helicopter-charter' : 'band-private-charter'}
          title={`Private Jet & Helicopter Charter in ${pin.pin}`}
          summary={summary}
          action={
            <HeroBooking
              heading={`Get a charter quote from ${pin.pin}`}
              {...(option ? { preset: { from: option.label } } : {})}
              whatsappMessage={`Hello, I would like a charter quote from ${names[0] ? `${names[0]}, ` : ''}${pin.pin}, ${district.name}.`}
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
          { icon: MapPin, label: 'Areas', value: String(names.length), sub: `under ${pin.pin}` },
          { icon: Hash, label: 'District', value: district.name, sub: state.name },
          {
            icon: Clock,
            label: firstLeg ? `Jet to ${firstLeg.city}` : 'By jet',
            value: firstLeg?.jet ?? '—',
            sub: 'estimated flying time',
          },
        ]}
      />

      <Section ground="ivory" width="wide">
        <h2 className={H2}>Areas under pincode {pin.pin}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pin.areas.map((a) => (
            <li key={a[1]}>
              <Link
                href={areaHref(state, district, pin.pin, a)}
                className="group flex h-full items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_12px_32px_rgba(11,23,38,0.10)]"
              >
                <span>
                  <span className="block font-semibold leading-snug">Charter in {a[0]}</span>
                  <span className="numeric text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                    {pin.pin} · {district.name}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[var(--color-accent-strong)] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <NearestAirports place={pin.pin} near={near} />
      <FlyingTimes place={pin.pin} airport={mainName} legs={legs} />

      <LinkChips
        heading={`Pincodes near ${pin.pin}`}
        ground="ivory"
        links={nearby.map((n) => ({
          label: n.pin.pin,
          href: pinHref(state, district, n.pin.pin),
          ...(n.km !== null ? { meta: `${Math.round(n.km)} km` } : {}),
        }))}
      />

      <Section ground="surface" width="default">
        <FaqSection heading={`Charter in ${pin.pin}: common questions`} faqs={faqs} />
      </Section>

      <Section ground="midnight" width="wide">
        <AreaSearch label="Search another pincode or area" />
      </Section>

      <Section ground="ivory" width="wide">
        <RelatedLinks
          links={[
            { label: `Charter in ${district.name}`, href: districtHref(state, district), description: 'Every pincode in the district' },
            { label: `Charter in ${state.name}`, href: stateHref(state), description: 'Every district in the state' },
            { label: 'Helicopter Charter', href: '/helicopter-charter' as Path, description: 'Land where there is no runway' },
          ]}
        />
        <SourceNote />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: `Private Jet & Helicopter Charter in ${pin.pin}`, description: summary, path }),
          serviceSchema({
            name: `Private jet and helicopter charter in ${pin.pin}`,
            description: summary,
            path,
            area: {
              '@type': 'Place',
              name: `${pin.pin}, ${district.name}`,
              address: {
                '@type': 'PostalAddress',
                postalCode: pin.pin,
                addressLocality: district.name,
                addressRegion: state.name,
                addressCountry: 'IN',
              },
              ...(pin.lat !== null && pin.lon !== null
                ? { geo: { '@type': 'GeoCoordinates', latitude: pin.lat, longitude: pin.lon } }
                : {}),
            },
          }),
          breadcrumbSchema(path, crumbs),
          faqSchema(faqs, path),
        ])}
      />
    </>
  );
}
