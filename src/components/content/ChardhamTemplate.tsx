import { ArrowRight } from 'lucide-react';
import type { ChardhamPage } from '@/data/chardham';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { GlanceCard, IntroLayout } from '@/components/content/GlanceCard';
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
      <Section ground="ivory" width="wide">
        <IntroLayout
          intro={
            <PageIntro
              path={page.path}
              eyebrow="Helicopter charter"
              title={page.title}
              summary={page.summary}
            />
          }
          aside={
            <GlanceCard
              categories={['helicopter']}
              categoryLabel={{ helicopter: 'Helicopters' }}
              stats={[
                {
                  label: 'Helicopter types listed',
                  value: aircraftByCategory('helicopter').length,
                },
                { label: 'Flying limits explained', value: page.constraints.length },
                { label: 'Questions answered', value: page.faqs.length },
              ]}
              secondaryHref="/aircraft/helicopters"
              secondaryLabel="Compare helicopters"
            />
          }
        >
          <Prose paragraphs={page.body} />
          <div className="mt-10">
            <Button href="/request-a-charter">
              Request a Charter
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </IntroLayout>
      </Section>

      <Section ground="midnight" width="wide">
        <PointList heading="What limits a mountain helicopter charter" points={page.constraints} />
        {/* The pilgrimage side of the journey belongs to the sister property.
            Pointing there is more useful than reproducing it badly here, and it
            keeps the two entities doing different jobs. */}
        <p className="mt-10 max-w-[68ch] text-[length:var(--text-small)] text-[var(--color-ink-inverse-muted)]">
          This page covers chartering a whole helicopter. For the pilgrimage itself, including
          shared seats, packages, darshan arrangements and travel information, see{' '}
          <a href={SISTER_SITE.url} className="underline underline-offset-2">
            {SISTER_SITE.name}
          </a>
          .
        </p>
      </Section>

      <Section ground="ivory" width="default">
        <FaqSection faqs={page.faqs} />
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
