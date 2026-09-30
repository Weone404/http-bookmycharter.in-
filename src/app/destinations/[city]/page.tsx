import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';
import { DESTINATION_PAGES, aerodromesFor, destinationBySlug } from '@/data/destinations';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroBooking } from '@/components/booking/HeroBooking';
import { PointList, Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { AerodromeTable } from '@/components/destinations/AerodromeTable';
import { airportByIcao } from '@/lib/airport-search';
import { routeHref, routesFor } from '@/data/charter-routes';
import { HELICOPTER_CITIES, helicopterCityHref } from '@/data/helicopter-cities';

export function generateStaticParams() {
  return DESTINATION_PAGES.map((d) => ({ city: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const page = destinationBySlug(city);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.summary, path: page.canonical });
}

export default async function DestinationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const page = destinationBySlug(city);
  if (!page) notFound();

  const aerodromes = aerodromesFor(page);
  // Prefill "From" only when the city has one operational airport; with two
  // (Goa) the visitor picks.
  const operational = aerodromes.filter((a) => a.operational && a.icao);
  const home = operational.length === 1 ? airportByIcao(operational[0]?.icao ?? '') : undefined;
  const heli = HELICOPTER_CITIES.find((c) => c.city === page.city);
  const related = [
    ...page.related,
    ...(heli
      ? [
          {
            label: `Helicopter Charter in ${heli.city}`,
            href: helicopterCityHref(heli),
            description: 'Short trips, distances and times',
          },
        ]
      : []),
    ...routesFor(page.city).map((r) => ({
      label: `${r.from.city} to ${r.to.city}`,
      href: routeHref(r),
      description: 'Distance, flying time and aircraft',
    })),
  ].filter((l, i, all) => all.findIndex((x) => x.href === l.href) === i);

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={page.canonical}
          dynamic={{ path: page.canonical, label: page.city, parent: '/destinations' }}
          eyebrow="Charter destination"
          title={page.title}
          summary={page.summary}
          action={
            <HeroBooking
              heading={`Get a charter quote from ${page.city}`}
              {...(home ? { preset: { from: home.label } } : {})}
            />
          }
        />
      </Section>

      <Section ground="surface" width="wide">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          Airports in {page.city}
        </h2>
        <div className="mt-8">
          <AerodromeTable aerodromes={aerodromes} />
        </div>
      </Section>

      <Section ground="midnight" width="wide">
        <PointList
          heading={`${page.city} charter checklist`}
          points={page.charterNotes}
        />
      </Section>

      <Section ground="ivory" width="default">
        <FaqSection heading={`${page.city} charter FAQs`} faqs={page.faqs} />
      </Section>

      {/* UX first: the long explanation is kept whole, but after the
          parts a booker scans. */}
      <Section ground="surface" width="default">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          {page.city} charter guide
        </h2>
        <div className="mt-6">
          <Prose paragraphs={page.body} />
        </div>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks links={related} />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: page.title, description: page.summary, path: page.canonical }),
          breadcrumbSchema(page.canonical, {
            path: page.canonical,
            label: page.city,
            parent: '/destinations',
          }),
          faqSchema(page.faqs, page.canonical),
        ])}
      />
    </>
  );
}
