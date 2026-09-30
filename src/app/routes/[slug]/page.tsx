import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, MapPin, Plane, Ruler } from 'lucide-react';
import type { Path } from '@/types/common';
import type { Faq } from '@/types/faq';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';
import { airportByIcao } from '@/lib/airport-search';
import {
  FIXED_MINUTES,
  HELICOPTER_MAX_KM,
  RANGE_MARGIN,
  ROUTING_FACTOR,
  classFits,
  feetToMetres,
  formatKm,
  formatNm,
  greatCircleKm,
  type ClassFit,
} from '@/lib/route-math';
import { AIRPORT_GEO, GEO_SOURCE } from '@/data/airport-geo.generated';
import { AIRCRAFT_SPEC_SOURCE } from '@/data/aircraft.generated';
import { CLASS_META_BY_ID } from '@/data/fleet-classes';
import {
  CHARTER_ROUTES,
  routeBySlug,
  routeHref,
  routesFor,
  type CharterRoute,
} from '@/data/charter-routes';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroBooking } from '@/components/booking/HeroBooking';
import { Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';

export function generateStaticParams() {
  return CHARTER_ROUTES.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

const H2 = 'text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight';

/** Everything a route page shows, computed once. Null if an airport lacks coordinates. */
function facts(route: CharterRoute) {
  const km = greatCircleKm(route.from.icao, route.to.icao);
  if (km === null) return null;
  const fits = classFits(km);
  const byId = new Map(fits.map((f) => [f.id, f]));
  const jets = ['light-jets', 'midsize-jets', 'super-midsize-jets', 'large-jets']
    .map((id) => byId.get(id as ClassFit['id']))
    .filter((f): f is ClassFit => Boolean(f?.time));
  const jetTime = byId.get('midsize-jets')?.time ?? jets[0]?.time ?? null;
  const turboprop = byId.get('turboprops') ?? null;
  const helicopter = byId.get('helicopters') ?? null;
  return { km, fits, jetTime, turboprop, helicopter };
}

function title(route: CharterRoute) {
  return `${route.from.city} to ${route.to.city} Private Jet Charter`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = routeBySlug(slug);
  const f = route ? facts(route) : null;
  if (!route || !f) return {};
  const heli = f.helicopter?.time ? ' or helicopter' : '';
  return pageMetadata({
    title: title(route),
    description: `${route.from.city} to ${route.to.city} by private jet${heli}: ${formatKm(f.km)}, about ${f.jetTime ?? '—'} by jet. Aircraft that fly it nonstop, both airports and how to get a quote.`,
    path: routeHref(route),
  });
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = routeBySlug(slug);
  const f = route ? facts(route) : null;
  if (!route || !f) notFound();

  const path = routeHref(route);
  const from = airportByIcao(route.from.icao);
  const to = airportByIcao(route.to.icao);
  const pair = `${route.from.city} to ${route.to.city}`;
  const fitting = f.fits.filter((c) => c.nonstop.length > 0);
  const heliOk = Boolean(f.helicopter?.time);

  const summary = `A private jet from ${route.from.city} to ${route.to.city} flies about ${formatKm(f.km)} (${formatNm(f.km)}) in a straight line and takes roughly ${f.jetTime} by business jet, including taxi, climb and descent.${
    heliOk ? ` A helicopter can also fly it, in about ${f.helicopter?.time}.` : ''
  }`;

  const stats = [
    {
      icon: Ruler,
      label: 'Distance',
      value: formatKm(f.km),
      sub: `${formatNm(f.km)} straight line`,
    },
    { icon: Clock, label: 'By jet', value: f.jetTime ?? '—', sub: 'estimated flying time' },
    {
      icon: Plane,
      label: 'By turboprop',
      value: f.turboprop?.time ?? '—',
      sub: 'estimated flying time',
    },
    {
      icon: MapPin,
      label: 'By helicopter',
      value: heliOk ? (f.helicopter?.time ?? '—') : 'Not practical',
      sub: heliOk ? 'estimated flying time' : `beyond ${HELICOPTER_MAX_KM} km`,
    },
  ];

  const airports = [
    { city: route.from.city, icao: route.from.icao, option: from },
    { city: route.to.city, icao: route.to.icao, option: to },
  ].map((a) => ({ ...a, geo: AIRPORT_GEO[a.icao] }));

  const faqs: Faq[] = [
    {
      question: `How far is ${pair} by private jet?`,
      answer: `${pair} is about ${formatKm(f.km)} (${formatNm(f.km)}) in a straight line between the two airports; the flown route is usually around 10% longer.`,
    },
    {
      question: `How long is a private jet flight from ${route.from.city} to ${route.to.city}?`,
      answer: `A private jet from ${route.from.city} to ${route.to.city} takes roughly ${f.jetTime}, including taxi, climb and descent, depending on the aircraft, winds and routing on the day.`,
    },
    {
      question: `Which aircraft can fly ${pair} nonstop?`,
      answer: `${fitting.map((c) => c.label).join(', ')} can all fly ${pair} nonstop, based on the typical range of each type with a 20% margin.`,
    },
    {
      question: `Can I take a helicopter from ${route.from.city} to ${route.to.city}?`,
      answer: heliOk
        ? `Yes, a helicopter can fly ${pair} in about ${f.helicopter?.time}, and it can land at a suitable helipad or open ground once the site and permission are confirmed.`
        : `A helicopter is not practical for ${pair}: at ${formatKm(f.km)} it is too far to be quicker or cheaper than a plane.`,
    },
    {
      question: `How much does a private jet from ${route.from.city} to ${route.to.city} cost?`,
      answer: `The cost of a private jet from ${route.from.city} to ${route.to.city} depends on the aircraft’s hourly rate, the billed hours, positioning the aircraft to ${route.from.city}, airport and handling fees, crew overnights and taxes, so it is quoted per trip.`,
    },
  ];

  const others = [...routesFor(route.from.city), ...routesFor(route.to.city)]
    .filter((r, i, all) => r.slug !== route.slug && all.findIndex((x) => x.slug === r.slug) === i)
    .slice(0, 6);

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={path}
          dynamic={{ path, label: pair, parent: '/routes' }}
          eyebrow="Charter route"
          image={route.helicopterFriendly ? 'band-helicopter-charter' : 'band-private-charter'}
          title={title(route)}
          summary={summary}
          action={
            <HeroBooking
              heading={`Get a ${pair} quote`}
              preset={{
                ...(from ? { from: from.label } : {}),
                ...(to ? { to: to.label } : {}),
              }}
              whatsappMessage={`Hello, I would like a charter quote from ${route.from.city} to ${route.to.city}.`}
            />
          }
        />
      </Section>

      {/* 1. The four numbers people ask first. */}
      <Section ground="surface" width="wide">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-ivory)] p-4 sm:p-5"
            >
              <dt className="flex items-center gap-1.5 text-[length:var(--text-micro)] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                <s.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {s.label}
              </dt>
              <dd className="numeric mt-2 text-[1.125rem] font-semibold leading-tight sm:text-[1.375rem]">
                {s.value}
              </dd>
              <dd className="mt-1 text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                {s.sub}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* 2. Which aircraft fit. */}
      <Section ground="ivory" width="wide">
        <h2 className={H2}>{pair} nonstop aircraft</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...f.fits]
            .sort((a, b) => Number(b.nonstop.length > 0) - Number(a.nonstop.length > 0))
            .map((c) => {
              const meta = CLASS_META_BY_ID.get(c.id);
              const ok = c.nonstop.length > 0;
              return (
                <li
                  key={c.id}
                  className={`flex flex-col rounded-[var(--radius-card)] border p-5 ${
                    ok
                      ? 'border-[var(--color-hairline)] bg-[var(--color-surface)]'
                      : 'border-dashed border-[var(--color-hairline-strong)] bg-transparent'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-semibold">{c.label}</h3>
                    <span className="numeric text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                      {c.nonstop.length} of {c.total}
                    </span>
                  </div>
                  {ok ? (
                    <>
                      <p className="numeric mt-1 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                        About {c.time}
                      </p>
                      <p className="mt-3 text-[length:var(--text-small)]">
                        {c.nonstop.slice(0, 3).map((t, i) => (
                          <span key={t.slug}>
                            {i > 0 ? ', ' : ''}
                            <Link
                              href={t.href}
                              className="underline underline-offset-2 hover:text-[var(--color-accent-strong)]"
                            >
                              {t.name}
                            </Link>
                          </span>
                        ))}
                        {c.nonstop.length > 3 ? ` and ${c.nonstop.length - 3} more` : ''}
                      </p>
                      {meta ? (
                        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-4 text-[length:var(--text-small)] font-semibold">
                          <Link
                            href={`/request-a-charter?aircraft=${meta.quote}`}
                            className="inline-flex items-center gap-1 text-[var(--color-accent-strong)] hover:underline"
                          >
                            Get a quote
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                          <Link
                            href={meta.listHref}
                            className="text-[var(--color-ink-muted)] hover:underline"
                          >
                            Compare types
                          </Link>
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <p className="mt-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                      {c.id === 'helicopters'
                        ? `Not practical beyond ${HELICOPTER_MAX_KM} km.`
                        : 'Not nonstop under our planning rule.'}
                    </p>
                  )}
                </li>
              );
            })}
        </ul>
      </Section>

      {/* 3. The airports at each end. */}
      <Section ground="surface" width="wide">
        <h2 className={H2}>{pair} airports</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {airports.map((a) => (
            <div
              key={a.icao}
              className="rounded-[var(--radius-card)] border border-[var(--color-hairline)] p-5"
            >
              <p className="text-[length:var(--text-micro)] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                {a.city}
              </p>
              <h3 className="mt-1 font-semibold">{a.option?.name ?? a.city}</h3>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-[length:var(--text-small)]">
                <div>
                  <dt className="text-[var(--color-ink-muted)]">Codes</dt>
                  <dd className="numeric font-medium">
                    {[a.option?.iata, a.icao].filter(Boolean).join(' / ')}
                  </dd>
                </div>
                <div>
                  <dt className="text-[var(--color-ink-muted)]">Elevation</dt>
                  <dd className="numeric font-medium">
                    {a.geo?.elevationFt != null
                      ? `${a.geo.elevationFt.toLocaleString('en-IN')} ft`
                      : '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[var(--color-ink-muted)]">Longest runway</dt>
                  <dd className="numeric font-medium">
                    {a.geo?.longestRunwayFt
                      ? `${a.geo.longestRunwayFt.toLocaleString('en-IN')} ft (${feetToMetres(a.geo.longestRunwayFt).toLocaleString('en-IN')} m)`
                      : '—'}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </Section>

      <Section ground="ivory" width="default">
        <h2 className={H2}>{pair} travel notes</h2>
        <div className="mt-6">
          <Prose paragraphs={route.note} />
        </div>
      </Section>

      <Section ground="surface" width="default">
        <FaqSection heading={`${pair} charter FAQs`} faqs={faqs} />
      </Section>

      <Section ground="ivory" width="default">
        <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
          How we calculate
        </h2>
        <ul className="mt-4 space-y-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
          <li>
            Distance: straight line between the two airports, from {GEO_SOURCE.name} coordinates (
            {GEO_SOURCE.licence.toLowerCase()}, {GEO_SOURCE.dated}).
          </li>
          <li>
            Flying time: the straight-line distance plus {Math.round((ROUTING_FACTOR - 1) * 100)}%
            for airways, divided by each type’s typical cruise speed, plus {FIXED_MINUTES} minutes
            for taxi, climb and descent. An estimate, not a schedule.
          </li>
          <li>
            Nonstop: a type counts if {Math.round(RANGE_MARGIN * 100)}% of its typical range covers
            the flown distance. The operator’s flight plan on the day decides.
          </li>
          <li>
            Aircraft figures: our aircraft specification sheet, typical civil and charter
            configurations ({AIRCRAFT_SPEC_SOURCE.dated}). Runways and elevation:{' '}
            {GEO_SOURCE.name}.
          </li>
        </ul>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks
          links={[
            ...others.map((r) => ({
              label: `${r.from.city} to ${r.to.city}`,
              href: routeHref(r),
              description: 'Distance, flying time and aircraft',
            })),
            {
              label: 'All charter routes',
              href: '/routes' as Path,
              description: 'Every route page',
            },
            {
              label: 'Charter Pricing',
              href: '/pricing' as Path,
              description: 'What makes up the price',
            },
          ]}
        />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: title(route), description: summary, path }),
          breadcrumbSchema(path, { path, label: pair, parent: '/routes' }),
          faqSchema(faqs, path),
        ])}
      />
    </>
  );
}
