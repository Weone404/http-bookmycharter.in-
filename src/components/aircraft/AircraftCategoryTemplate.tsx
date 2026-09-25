import { ArrowRight } from 'lucide-react';
import type { AircraftCategoryPage } from '@/data/aircraft-categories';
import { aircraftByCategory } from '@/data/aircraft';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroBooking } from '@/components/booking/HeroBooking';
import { heroImageForCategory } from '@/lib/page-images';
import { PointList, Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { AircraftTable } from '@/components/aircraft/AircraftTable';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';

export function AircraftCategoryTemplate({ page }: { page: AircraftCategoryPage }) {
  const types = aircraftByCategory(page.category);
  const preset =
    page.category === 'private-jet' ||
    page.category === 'helicopter' ||
    page.category === 'turboprop'
      ? page.category
      : undefined;

  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={page.canonical}
          title={page.title}
          summary={page.summary}
          image={heroImageForCategory(page.category)}
          action={
            <HeroBooking
              heading={`Get a ${page.title.replace(/s for Charter$/, '').toLowerCase()} charter quote`}
              {...(preset ? { preset: { aircraft: preset } } : {})}
            />
          }
        />
      </Section>

      {/* UX first: how to pick, then the comparison, then answers. The
          longer explanation sits last. */}
      <Section ground="surface" width="wide">
        <PointList heading={page.choosing.heading} points={page.choosing.points} />
      </Section>

      <Section ground="ivory" width="wide">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          Compare types: typical seats, range and speed
        </h2>
        <div className="mt-8">
          <AircraftTable aircraft={types} />
        </div>
        <div className="mt-10">
          <Button href={preset ? `/request-a-charter?aircraft=${preset}` : '/request-a-charter'}>
            Request a Charter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Section>

      <Section ground="surface" width="default">
        <FaqSection faqs={page.faqs} />
      </Section>

      <Section ground="ivory" width="default">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          {page.title} explained
        </h2>
        <div className="mt-6">
          <Prose paragraphs={page.intro} />
        </div>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks links={page.related} />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: page.title, description: page.summary, path: page.canonical }),
          breadcrumbSchema(page.canonical),
          faqSchema(page.faqs, page.canonical),
        ])}
      />
    </>
  );
}
