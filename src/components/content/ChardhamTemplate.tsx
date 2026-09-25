import { ArrowRight } from 'lucide-react';
import type { ChardhamPage } from '@/data/chardham';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { HeroBooking } from '@/components/booking/HeroBooking';
import { aircraftByCategory } from '@/data/aircraft';
import { PointList, Prose } from '@/components/content/Prose';
import { FaqSection } from '@/components/content/FaqSection';
import { RelatedLinks } from '@/components/content/RelatedLinks';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';
import { SISTER_SITE } from '@/lib/site';

export function ChardhamTemplate({ page }: { page: ChardhamPage }) {
  return (
    <>
      <Section ground="ivory" width="wide" className="pb-0">
        <PageIntro
          path={page.path}
          eyebrow="Helicopter charter"
          title={page.title}
          summary={page.summary}
          action={
            <HeroBooking
              heading="Get a private helicopter quote"
              preset={{ aircraft: 'helicopter', purpose: 'pilgrimage' }}
              whatsappMessage="Hello, I would like a private helicopter charter quote for Char Dham."
            />
          }
        />
      </Section>

      {/* UX first: form, then the limits in short points, then answers. The
          full explanation is kept whole but placed after them. */}
      <Section ground="midnight" width="wide">
        <PointList heading="What limits a mountain helicopter charter" points={page.constraints} />
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/request-a-charter?aircraft=helicopter&purpose=pilgrimage">
            Request a Charter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="/aircraft/helicopters" variant="secondary">
            Compare helicopters ({aircraftByCategory('helicopter').length} types)
          </Button>
        </div>
      </Section>

      <Section ground="ivory" width="default">
        <FaqSection heading={`${page.title}: common questions`} faqs={page.faqs} />
      </Section>

      <Section ground="surface" width="default">
        <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          {page.title} explained
        </h2>
        <div className="mt-6">
          <Prose paragraphs={page.body} />
        </div>
        {/* The pilgrimage side of the journey belongs to the sister property.
            Pointing there is more useful than reproducing it badly here, and it
            keeps the two entities doing different jobs. */}
        <p className="mt-10 max-w-[68ch] text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
          This page covers chartering a whole helicopter. For the pilgrimage itself, including
          shared seats, packages, darshan arrangements and travel information, see{' '}
          <a href={SISTER_SITE.url} className="underline underline-offset-2">
            {SISTER_SITE.name}
          </a>
          .
        </p>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks links={page.related} />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: page.title, description: page.summary, path: page.path }),
          breadcrumbSchema(page.path),
          faqSchema(page.faqs, page.path),
        ])}
      />
    </>
  );
}
