import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Clock, Hash, MapPin, Plane } from 'lucide-react';
import type { Path } from '@/types/common';
import type { Faq } from '@/types/faq';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';
import { airportByIcao } from '@/lib/airport-search';
import { formatKm, HELICOPTER_MAX_KM } from '@/lib/route-math';
import {
  areaHref,
  areaPoint,
  compassWord,
  districtBySlug,
  districtHref,
  kmBetween,
  nearbyAreas,
  pinHref,
  placeFacts,
  stateBySlug,
  stateHref,
} from '@/lib/areas';
import { HELICOPTER_CITIES, helicopterCityHref } from '@/data/helicopter-cities';
import { AIRPORT_GEO } from '@/data/airport-geo.generated';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroBooking } from '@/components/booking/HeroBooking';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { AreaSearch } from '@/components/areas/AreaSearch';
import {
  FlyingTimes,
  LinkChips,
  NearestAirports,
  SourceNote,
  StatGrid,
  fitDescription,
  fitTitle,
} from '@/components/areas/PlaceSections';

/**
 * One page per locality (about 167,000). Rendered on first request and then
 * cached. Its numbers come from the locality's own post office position when
 * India Post records one, otherwise from its pincode's centre (and it says so).
 */
export function generateStaticParams() {
  return [];
}
export const dynamicParams = true;
export const revalidate = false;

async function load(s: string, d: string, p: string, slug: string) {
  if (!/^\d{6}$/.test(p) || !/^[a-z0-9-]+$/.test(slug)) return null;
  const state = stateBySlug(s);
  const district = state ? await districtBySlug(s, d) : undefined;
  const pin = district?.pins.find((x) => x.pin === p);
  const area = pin?.areas.find((a) => a[1] === slug);
  if (!state || !district || !pin || !area) return null;
  const point = areaPoint(pin, area);
  return { state, district, pin, area, point, ...placeFacts(point.lat, point.lon) };
}

type Params = Promise<{ state: string; district: string; pin: string; area: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { state: s, district: d, pin: p, area: a } = await params;
  const data = await load(s, d, p, a);
  if (!data) return {};
  const { state, district, pin, area, main, legs } = data;
  const name = area[0];
  const air = main
    ? ` Nearest airport ${main.record.iata ?? main.icao}, ${Math.round(main.km)} km ${compassWord(main.bearing)}.`
    : '';
  const leg = legs[0] ? ` Jet to ${legs[0].city} about ${legs[0].jet}.` : '';
  const head = `Private jet & helicopter charter in ${name}, ${district.name} ${pin.pin}`;
  return pageMetadata({
    ...fitTitle([
      `Private Jet & Helicopter Charter in ${name}, ${pin.pin}`,
      `Private Jet Charter in ${name}, ${pin.pin}`,
      `Private Jet & Helicopter Charter in ${name}`,
      `Charter in ${name}, ${pin.pin}`,
      `Charter in ${name}`,
    ]),
    description: fitDescription([
      `${head}.${air}${leg} Get a quote.`,
      `${head}.${air} Get a quote.`,
      `${head}.${air}`,
      `${head}.`,
    ]),
    path: areaHref(state, district, pin.pin, area),
  });
}

export default async function AreaPage({ params }: { params: Params }) {
  const { state: s, district: d, pin: p, area: a } = await params;
  const data = await load(s, d, p, a);
  if (!data) notFound();
  const { state, district, pin, area, point, near, main, legs } = data;

  const name = area[0];
  const path = areaHref(state, district, pin.pin, area);
  const option = main ? airportByIcao(main.icao) : undefined;
  const mainName = main ? `${main.record.name}${main.record.iata ? ` (${main.record.iata})` : ''}` : '';
  const from = point.own ? name : `the centre of pincode ${pin.pin}`;
  const summary = `Book a private jet or helicopter charter in ${name}, ${district.name}, ${state.name} (pincode ${pin.pin}).${
    main ? ` The nearest airport for a private jet is ${mainName}, about ${formatKm(main.km)} ${compassWord(main.bearing)} of ${from}.` : ''
  } A helicopter can pick you up from an approved helipad or open ground nearer to ${name}.`;

  // A helicopter-city page within helicopter range, if there is one.
  const heliCity =
    point.lat !== null && point.lon !== null
      ? HELICOPTER_CITIES.map((c) => {
          const g = AIRPORT_GEO[c.fromIcao];
          return { c, km: g ? kmBetween(point.lat as number, point.lon as number, g.lat, g.lon) : Infinity };
        })
          .filter((x) => x.km <= 100)
          .sort((x, y) => x.km - y.km)[0]
      : undefined;

  const firstLeg = legs[0];
  const siblings = pin.areas.filter((x) => x[1] !== area[1]);
  const faqs: Faq[] = [
    {
      question: `What is the pincode of ${name}?`,
      answer: `The pincode of ${name} is ${pin.pin}, in ${district.name}, ${state.name}.`,
    },
    ...(main
      ? [
          {
            question: `Which is the nearest airport to ${name} for a private jet?`,
            answer: `The nearest airport to ${name} for a private jet is ${mainName}, about ${formatKm(main.km)} ${compassWord(main.bearing)} in a straight line${
              near[1] ? `; the next is ${near[1].record.name}, about ${formatKm(near[1].km)}` : ''
            }.`,
          },
        ]
      : []),
    {
      question: `Can I book a helicopter from ${name}?`,
      answer: `Yes, a helicopter can pick you up near ${name} from a licensed helipad or an approved open site, once the site and the local permission are confirmed before the date.`,
    },
    ...(firstLeg && main
      ? [
          {
            question: `How long is a private jet from ${name} to ${firstLeg.city}?`,
            answer: `About ${firstLeg.jet} by midsize jet from ${mainName}, for ${formatKm(firstLeg.km)} in a straight line, plus the drive from ${name} to the airport.`,
          },
        ]
      : []),
    {
      question: `How much does a private jet charter from ${name} cost?`,
      answer: `A private jet charter from ${name} is quoted per trip: the aircraft’s hourly rate times the flying hours, plus positioning, airport and handling fees, crew costs and GST.`,
    },
  ];

  const nearby = nearbyAreas(district, point.lat, point.lon, pin.pin);
  const crumbs = {
    path,
    label: name,
    parent: '/charter' as Path,
    between: [
      { path: pinHref(state, district, pin.pin), label: pin.pin },
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
          eyebrow={`${pin.pin} · ${district.name}, ${state.name}`}
          image={main && main.km <= HELICOPTER_MAX_KM ? 'band-helicopter-charter' : 'band-private-charter'}
          title={`Private Jet & Helicopter Charter in ${name}`}
          summary={summary}
          action={
            <HeroBooking
              heading={`Get a charter quote from ${name}`}
              {...(option ? { preset: { from: option.label } } : {})}
              whatsappMessage={`Hello, I would like a charter quote from ${name}, ${pin.pin}, ${district.name}.`}
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
            sub: main ? `${main.record.iata ?? main.icao} · ${compassWord(main.bearing)}` : 'none on record',
          },
          { icon: Hash, label: 'Pincode', value: pin.pin, sub: `${pin.areas.length} areas share it` },
          { icon: MapPin, label: 'District', value: district.name, sub: state.name },
          {
            icon: Clock,
            label: firstLeg ? `Jet to ${firstLeg.city}` : 'By jet',
            value: firstLeg?.jet ?? '—',
            sub: 'estimated flying time',
          },
        ]}
      />

      <NearestAirports place={name} near={near} />
      <FlyingTimes place={name} airport={mainName} legs={legs} />

      <LinkChips
        heading={`Other areas in ${pin.pin}`}
        ground="surface"
        links={siblings.map((x) => ({ label: x[0], href: areaHref(state, district, pin.pin, x) }))}
      />
      <LinkChips
        heading={`Areas near ${name}`}
        ground="ivory"
        links={nearby.map((n) => ({
          label: `${n.area[0]} · ${n.pin}`,
          href: areaHref(state, district, n.pin, n.area),
          meta: `${n.km < 1 ? '<1' : Math.round(n.km)} km`,
        }))}
      />

      <Section ground="surface" width="default">
        <FaqSection heading={`Charter in ${name}: common questions`} faqs={faqs} />
      </Section>

      <Section ground="midnight" width="wide">
        <AreaSearch label="Search another pincode or area" />
      </Section>

      <Section ground="ivory" width="wide">
        <RelatedLinks
          links={[
            { label: `Charter in ${pin.pin}`, href: pinHref(state, district, pin.pin), description: 'Every area in the pincode' },
            { label: `Charter in ${district.name}`, href: districtHref(state, district), description: 'Every pincode in the district' },
            ...(heliCity
              ? [
                  {
                    label: `Helicopter Charter in ${heliCity.c.city}`,
                    href: helicopterCityHref(heliCity.c),
                    description: 'Popular helicopter trips',
                  },
                ]
              : [{ label: 'Helicopter Charter', href: '/helicopter-charter' as Path, description: 'Land where there is no runway' }]),
          ]}
        />
        <SourceNote
          extra={point.own ? `Position: ${name} post office.` : `Position: centre of pincode ${pin.pin}.`}
        />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: `Private Jet & Helicopter Charter in ${name}`, description: summary, path }),
          serviceSchema({
            name: `Private jet and helicopter charter in ${name}`,
            description: summary,
            path,
            area: {
              '@type': 'Place',
              name: `${name}, ${district.name}`,
              address: {
                '@type': 'PostalAddress',
                addressLocality: name,
                postalCode: pin.pin,
                addressRegion: state.name,
                addressCountry: 'IN',
              },
              ...(point.lat !== null && point.lon !== null
                ? { geo: { '@type': 'GeoCoordinates', latitude: point.lat, longitude: point.lon } }
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
