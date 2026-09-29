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
  AREA_SOURCE,
  STATES,
  compassWord,
  districtBySlug,
  districtHref,
  metroLegs,
  nearbyDistricts,
  nearestAirports,
  stateBySlug,
  stateHref,
  type District,
  type StateSummary,
} from '@/lib/areas';
import { GEO_SOURCE } from '@/data/airport-geo.generated';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroBooking } from '@/components/booking/HeroBooking';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { AreaFilter } from '@/components/areas/AreaFilter';
import { AreaSearch } from '@/components/areas/AreaSearch';
import { AirportCompass } from '@/components/areas/AirportCompass';

export function generateStaticParams() {
  return STATES.flatMap((s) => s.districts.map((d) => ({ state: s.slug, district: d.slug })));
}
export const dynamicParams = false;

const H2 = 'text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight';

function load(stateSlug: string, districtSlug: string) {
  const state = stateBySlug(stateSlug);
  const district = state ? districtBySlug(stateSlug, districtSlug) : undefined;
  if (!state || !district) return null;
  const near = district.lat !== null && district.lon !== null ? nearestAirports(district.lat, district.lon, 3) : [];
  const main = near[0];
  const legs = main ? metroLegs(main.icao) : [];
  const areas = district.pins.flatMap((p) => p.areas);
  return { state, district, near, main, legs, areas };
}

/** The keyword title (with its state, so same-named districts differ), branded only if it fits. */
function titleFor(state: StateSummary, district: District) {
  const options = [
    `Private Jet & Helicopter Charter in ${district.name}, ${state.name}`,
    `Private Jet Charter in ${district.name}, ${state.name}`,
    `Charter in ${district.name}, ${state.name}`,
    `Private Jet Charter in ${district.name}`,
    `Charter in ${district.name}`,
  ];
  const title = options.find((t) => t.length <= 60) ?? `Charter in ${district.name}, ${state.name}`;
  return { title, brand: title.length + 18 <= 62 };
}

function describe(state: StateSummary, district: District, mainIata: string | null, km: number | null, areas: readonly string[]) {
  const first = district.pins[0]?.pin;
  const last = district.pins[district.pins.length - 1]?.pin;
  const pinText = first === last ? `pincode ${first}` : `pincodes ${first}–${last}`;
  const base = `Private jet & helicopter charter in ${district.name}, ${state.name}${
    mainIata && km !== null ? `: nearest airport ${mainIata}, ${Math.round(km)} km` : ''
  }. All ${pinText}`;
  for (let n = 3; n >= 0; n -= 1) {
    const list = areas.slice(0, n).join(', ');
    const text = `${base}${n ? `, incl. ${list}` : ''}. Get a quote.`;
    if (text.length <= 160) return text;
  }
  return `${base}.`.slice(0, 160);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; district: string }>;
}): Promise<Metadata> {
  const { state: s, district: d } = await params;
  const data = load(s, d);
  if (!data) return {};
  const { title, brand } = titleFor(data.state, data.district);
  return pageMetadata({
    title,
    brand,
    description: describe(data.state, data.district, data.main?.record.iata ?? data.main?.icao ?? null, data.main?.km ?? null, data.areas),
    path: districtHref(data.state, data.district),
  });
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ state: string; district: string }>;
}) {
  const { state: s, district: d } = await params;
  const data = load(s, d);
  if (!data) notFound();
  const { state, district, near, main, legs, areas } = data;

  const path = districtHref(state, district);
  const place = `${district.name}, ${state.name}`;
  const option = main ? airportByIcao(main.icao) : undefined;
  const mainName = main ? `${main.record.name}${main.record.iata ? ` (${main.record.iata})` : ''}` : null;
  const heliReach = main ? main.km <= HELICOPTER_MAX_KM : false;
  const firstLeg = legs[0];
  const summary = `Book a private jet or helicopter charter in ${place}.${
    main
      ? ` The nearest airport for a private jet is ${mainName}, about ${formatKm(main.km)} ${compassWord(main.bearing)} of the district centre.`
      : ''
  } A helicopter can land at an approved helipad or open ground closer to you. Every pincode and area in ${district.name} is listed below.`;

  const stats = [
    {
      icon: Plane,
      label: 'Nearest airport',
      value: main ? formatKm(main.km) : '—',
      sub: main ? (main.record.iata ?? main.icao) + ' · straight line' : 'no operational airport on record',
    },
    { icon: Hash, label: 'Pincodes', value: district.pins.length.toLocaleString('en-IN'), sub: `in ${district.name}` },
    { icon: MapPin, label: 'Areas covered', value: areas.length.toLocaleString('en-IN'), sub: 'localities and post offices' },
    {
      icon: Clock,
      label: firstLeg ? `Jet to ${firstLeg.city}` : 'By jet',
      value: firstLeg?.jet ?? '—',
      sub: firstLeg ? `from ${main?.record.iata ?? main?.icao}, estimated` : 'estimated flying time',
    },
  ];

  const sampleAreas = areas.slice(0, 5).join(', ');
  const delhiOrMumbai = legs.find((l) => l.city === 'Delhi') ?? legs.find((l) => l.city === 'Mumbai');
  const faqs: Faq[] = [
    ...(main
      ? [
          {
            question: `Which is the nearest airport for a private jet in ${district.name}?`,
            answer: `The nearest operational airport to ${district.name} is ${mainName}, about ${formatKm(main.km)} in a straight line from the district centre${
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
      }), including ${sampleAreas}, are listed on this page with every locality under each pincode.`,
    },
    {
      question: `How much does a private jet charter from ${district.name} cost?`,
      answer: `A private jet charter from ${district.name} is quoted per trip: the aircraft’s hourly rate times the flying hours, plus positioning to ${
        main ? (main.record.iata ?? main.record.name) : 'your airport'
      }, airport and handling fees, crew costs and GST.`,
    },
  ];

  const nearby = nearbyDistricts(
    state,
    state.districts.find((x) => x.slug === district.slug) ?? { slug: district.slug, name: district.name, pins: 0, areas: 0, lat: district.lat, lon: district.lon },
  );

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={path}
          dynamic={{
            path,
            label: district.name,
            parent: '/charter',
            between: [{ path: stateHref(state), label: state.name }],
          }}
          eyebrow={`${state.name} · ${district.pins.length} pincodes`}
          image={heliReach ? 'band-helicopter-charter' : 'band-private-charter'}
          title={`Private Jet & Helicopter Charter in ${district.name}`}
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

      <Section ground="surface" width="wide">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((st) => (
            <div
              key={st.label}
              className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-ivory)] p-4 transition-transform duration-200 hover:-translate-y-0.5 sm:p-5"
            >
              <dt className="flex items-center gap-1.5 text-[length:var(--text-micro)] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                <st.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {st.label}
              </dt>
              <dd className="numeric mt-2 text-[1.125rem] font-semibold leading-tight sm:text-[1.375rem]">{st.value}</dd>
              <dd className="mt-1 text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">{st.sub}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {near.length > 0 ? (
        <Section ground="ivory" width="wide">
          <h2 className={H2}>Nearest airports to {district.name}</h2>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,22rem)_1fr]">
            <div className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-4 text-[var(--color-ink)]">
              <AirportCompass place={district.name} airports={near} />
            </div>
            <ul className="grid gap-3">
              {near.map((a, i) => (
                <li
                  key={a.icao}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-4 sm:p-5"
                >
                  <div className="min-w-0">
                    <p className="text-[length:var(--text-micro)] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                      {i === 0 ? 'Nearest' : `Option ${i + 1}`} · {compassWord(a.bearing)}
                    </p>
                    <h3 className="mt-1 font-semibold leading-snug">{a.record.name}</h3>
                    <p className="text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                      {a.record.city}, {a.record.state} · {[a.record.iata, a.icao].filter(Boolean).join(' / ')}
                      {a.runwayFt ? ` · runway ${a.runwayFt.toLocaleString('en-IN')} ft` : ''}
                    </p>
                  </div>
                  <p className="numeric text-[1.25rem] font-semibold">{formatKm(a.km)}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {legs.length > 0 && main ? (
        <Section ground="surface" width="wide">
          <h2 className={H2}>
            Private jet flying times from {district.name}
          </h2>
          <p className="mt-3 max-w-[60ch] text-[var(--color-ink-muted)]">
            From {mainName}, the nearest airport. Estimated flying time, not a schedule.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {legs.map((l) => (
              <li
                key={l.city}
                className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-ivory)] p-5 transition-colors hover:border-[var(--color-accent)]"
              >
                <h3 className="font-semibold">
                  {district.name} to {l.city}
                </h3>
                <dl className="mt-3 grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-1 text-[length:var(--text-small)]">
                  <dt className="text-[var(--color-ink-muted)]">Distance</dt>
                  <dd className="numeric font-medium">{formatKm(l.km)}</dd>
                  <dt className="text-[var(--color-ink-muted)]">By jet</dt>
                  <dd className="numeric font-medium">{l.jet ?? '—'}</dd>
                  <dt className="text-[var(--color-ink-muted)]">Turboprop</dt>
                  <dd className="numeric font-medium">{l.turboprop ?? 'Not nonstop'}</dd>
                </dl>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section ground="ivory" width="wide">
        <h2 className={H2}>All pincodes and areas in {district.name}</h2>
        <p className="mt-3 max-w-[65ch] text-[var(--color-ink-muted)]">
          Private jet and helicopter charter pickup is arranged from every locality below. Search by
          pincode or area name.
        </p>
        <div className="mt-6">
          <AreaFilter
            target="pin-list"
            placeholder={`Search ${district.name} by pincode or area`}
            total={district.pins.length}
            noun="pincodes"
          />
        </div>
        <ul id="pin-list" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {district.pins.map((p) => (
            <li
              key={p.pin}
              id={`pin-${p.pin}`}
              data-q={`${p.pin} ${p.areas.join(' ')}`.toLowerCase()}
              className="scroll-mt-24 rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-4 transition-shadow target:ring-2 target:ring-[var(--color-accent)] hover:shadow-[0_8px_24px_rgba(11,23,38,0.08)]"
            >
              <h3 className="flex items-baseline justify-between gap-3">
                <span className="numeric text-[1.125rem] font-semibold">{p.pin}</span>
                <span className="text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                  {p.areas.length} {p.areas.length === 1 ? 'area' : 'areas'}
                </span>
              </h3>
              <p className="mt-2 text-[length:var(--text-small)] leading-relaxed text-[var(--color-ink)]">
                {p.areas.join(' · ')}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section ground="surface" width="default">
        <FaqSection heading={`Charter in ${district.name}: common questions`} faqs={faqs} />
      </Section>

      <Section ground="midnight" width="wide">
        <div className="text-[var(--color-ink-inverse)]">
          <AreaSearch label="Looking for another area? Search any pincode in India" />
        </div>
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
        <p className="mt-8 text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
          Pincodes and areas: {AREA_SOURCE.primary}; additional locality names from the{' '}
          {AREA_SOURCE.secondary.split(' for ')[0]}. Airport positions and runways: {GEO_SOURCE.name} (
          {GEO_SOURCE.licence.toLowerCase()}). Distances are straight-line from the district centre.
        </p>
        <p className="mt-2">
          <Link href="/charter" className="inline-flex items-center gap-1 text-[length:var(--text-small)] font-semibold text-[var(--color-accent-strong)] hover:underline">
            All states and districts <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
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
          breadcrumbSchema(path, {
            path,
            label: district.name,
            parent: '/charter',
            between: [{ path: stateHref(state), label: state.name }],
          }),
          faqSchema(faqs, path),
        ])}
      />
    </>
  );
}
