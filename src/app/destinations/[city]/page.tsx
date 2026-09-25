import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';
import { DESTINATION_PAGES, aerodromesForCity, destinationBySlug } from '@/data/destinations';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroBooking } from '@/components/booking/HeroBooking';
import { PointList, Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { AerodromeTable } from '@/components/destinations/AerodromeTable';

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

  const aerodromes = aerodromesForCity(page.matchCity);

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={page.canonical}
          dynamic={{ path: page.canonical, label: page.city, parent: '/destinations' }}
          eyebrow="Charter destination"
          title={page.title}
          summary={page.summary}
          action={<HeroBooking heading={`Get a charter quote from ${page.city}`} />}
        />
      </Section>

      <Section ground="surface" width="wide">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          Airports and airfields on record
        </h2>
        <div className="mt-8">
          <AerodromeTable aerodromes={aerodromes} />
        </div>
      </Section>

      <Section ground="midnight" width="wide">
        <PointList
          heading={`What to know before you charter from ${page.city}`}
          points={page.charterNotes}
        />
      </Section>

      <Section ground="ivory" width="default">
        <FaqSection faqs={page.faqs} />
      </Section>

      {/* UX first: the long explanation is kept whole, but after the
          parts a booker scans. */}
      <Section ground="surface" width="default">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          {page.title} explained
        </h2>
        <div className="mt-6">
          <Prose paragraphs={page.body} />
        </div>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks links={page.related} />
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
