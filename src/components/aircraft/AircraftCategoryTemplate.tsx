import { ArrowRight } from 'lucide-react';
import type { AircraftCategoryPage } from '@/data/aircraft-categories';
import { aircraftByCategory } from '@/data/aircraft';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { heroImageForCategory } from '@/lib/page-images';
import { PointList, Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { AircraftTable } from '@/components/aircraft/AircraftTable';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';

export function AircraftCategoryTemplate({ page }: { page: AircraftCategoryPage }) {
  const types = aircraftByCategory(page.category);

  return (
    <>
      <Section ground="ivory" width="wide">
        <PageIntro
          path={page.canonical}
          title={page.title}
          summary={page.summary}
          image={heroImageForCategory(page.category)}
        />
        <div className="mt-10">
          <Prose paragraphs={page.intro} />
        </div>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          Compare types: typical seats, range and speed
        </h2>
        <div className="mt-8">
          <AircraftTable aircraft={types} />
        </div>
      </Section>

      <Section ground="midnight" width="wide">
        <PointList heading={page.choosing.heading} points={page.choosing.points} />
        <div className="mt-10">
          <Button href="/request-a-charter">
            Request a Charter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Section>

      <Section ground="ivory" width="default">
        <FaqSection faqs={page.faqs} />
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
