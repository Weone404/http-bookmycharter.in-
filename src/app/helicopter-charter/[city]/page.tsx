import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Path } from '@/types/common';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';
import { airportByIcao } from '@/lib/airport-search';
import {
  FIXED_MINUTES,
  HELICOPTER_MAX_KM,
  ROUTING_FACTOR,
  classFits,
  formatKm,
  greatCircleKm,
} from '@/lib/route-math';
import { GEO_SOURCE } from '@/data/airport-geo.generated';
import { AIRCRAFT_SPEC_SOURCE } from '@/data/aircraft.generated';
import {
  HELICOPTER_CITIES,
  helicopterCityBySlug,
  helicopterCityHref,
  type HelicopterCity,
} from '@/data/helicopter-cities';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroBooking } from '@/components/booking/HeroBooking';
import { Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';

export function generateStaticParams() {
  return HELICOPTER_CITIES.map((c) => ({ city: c.slug }));
}

export const dynamicParams = false;

const H2 = 'text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight';

function title(c: HelicopterCity) {
  return `Helicopter Charter & Rental in ${c.city}`;
}

/** Distance and helicopter time for each trip; trips beyond the helicopter rule are dropped. */
function trips(c: HelicopterCity) {
  return c.trips
    .map((t) => {
      const km = greatCircleKm(c.fromIcao, t.icao);
      if (km === null || km > HELICOPTER_MAX_KM) return null;
      const time = classFits(km).find((f) => f.id === 'helicopters')?.time ?? null;
      return time ? { ...t, km, time } : null;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null)
    .sort((a, b) => a.km - b.km);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const c = helicopterCityBySlug(city);
  if (!c) return {};
  const names = trips(c).map((t) => t.name.split(',')[0]);
  const describe = (n: number) =>
    `Book a private helicopter from ${c.city} to ${names.slice(0, n).join(', ')} and more: distance and flying time for each trip, where helicopters land and how to get a quote.`;
  // Three destinations if they fit in a search snippet, otherwise two.
  const description = describe(3).length <= 160 ? describe(3) : describe(2);
  return pageMetadata({
    title: title(c),
    description,
    path: helicopterCityHref(c),
  });
}

export default async function HelicopterCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const c = helicopterCityBySlug(city);
  if (!c) notFound();

  const path = helicopterCityHref(c);
  // "Helicopter on rent" is how many people search; answer it plainly.
  const faqs = [
    ...c.faqs,
    {
      question: `Can I hire a helicopter on rent in ${c.city}?`,
      answer: `Yes. In ${c.city} a helicopter can be hired by the hour, with waiting time between stops, or chartered for one trip; both are quoted per trip once the landing sites are confirmed.`,
    },
  ];
  const list = trips(c);
  const from = airportByIcao(c.fromIcao);

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={path}
          dynamic={{ path, label: c.city, parent: '/helicopter-charter' }}
          eyebrow="Helicopter charter"
          image="band-helicopter-charter"
          title={title(c)}
          summary={c.summary}
          action={
            <HeroBooking
              heading={`Get a helicopter quote from ${c.city}`}
              preset={{ aircraft: 'helicopter', ...(from ? { from: from.label } : {}) }}
              whatsappMessage={`Hello, I would like a helicopter charter quote from ${c.city}.`}
            />
          }
        />
      </Section>

      {/* 1. The trips, with the two numbers people ask first. */}
      <Section ground="surface" width="wide">
        <h2 className={H2}>Helicopter trips from {c.city}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <li
              key={t.icao}
              className="flex flex-col rounded-[var(--radius-card)] border border-[var(--color-hairline)] bg-[var(--color-ivory)] p-5"
            >
              <h3 className="font-semibold leading-snug">
                {c.city} to {t.name}
              </h3>
              <p className="mt-1 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                {t.why}
              </p>
              <dl className="mt-4 grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-2 text-[length:var(--text-small)]">
                <div>
                  <dt className="text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                    Distance
                  </dt>
                  <dd className="numeric mt-0.5 font-medium">{formatKm(t.km)}</dd>
                </div>
                <div>
                  <dt className="text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                    By helicopter
                  </dt>
                  <dd className="numeric mt-0.5 font-medium">{t.time}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
          Distances are airport to airport in a straight line. A helicopter can often land closer to
          where you are going, once the site and permission are confirmed.
        </p>
      </Section>

      <Section ground="ivory" width="default">
        <h2 className={H2}>How helicopter charter works in {c.city}</h2>
        <div className="mt-6">
          <Prose paragraphs={c.body} />
        </div>
      </Section>

      <Section ground="surface" width="default">
        <FaqSection heading={`Helicopter charter in ${c.city} FAQs`} faqs={faqs} />
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
            Flying time: the distance plus {Math.round((ROUTING_FACTOR - 1) * 100)}%, divided by the
            typical cruise speed of the helicopters on our list, plus {FIXED_MINUTES} minutes for
            start-up, climb and landing. An estimate, not a schedule; weather and the landing site
            decide on the day.
          </li>
          <li>
            Helicopter figures: our aircraft specification sheet, typical civil and charter
            configurations ({AIRCRAFT_SPEC_SOURCE.dated}).
          </li>
        </ul>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks
          links={[
            ...c.related,
            ...HELICOPTER_CITIES.filter((o) => o.slug !== c.slug).map((o) => ({
              label: title(o),
              href: helicopterCityHref(o),
              description: 'Trips, distances and times',
            })),
            {
              label: 'Helicopter Charter',
              href: '/helicopter-charter' as Path,
              description: 'All helicopter services',
            },
          ]}
        />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: title(c), description: c.summary, path }),
          breadcrumbSchema(path, { path, label: c.city, parent: '/helicopter-charter' }),
          faqSchema(faqs, path),
        ])}
      />
    </>
  );
}
