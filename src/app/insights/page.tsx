import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { getRoute } from '@/lib/routes';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { INSIGHTS, INSIGHT_CATEGORY_LABEL } from '@/data/insights';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { GlanceCard, IntroLayout } from '@/components/content/GlanceCard';

const PATH = '/insights' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function InsightsPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Insights route missing from the registry.');

  return (
    <>
      <Section ground="ivory" width="wide">
        <IntroLayout
          intro={
            <PageIntro
              path={PATH}
              title="Private Aviation Guides for India"
              summary="These private aviation guides for India answer the questions people ask before they charter: how pricing works, how to choose an aircraft, and what an empty leg is."
            />
          }
          aside={
            <GlanceCard
              stats={[
                { label: 'Guides published', value: INSIGHTS.length },
                { label: 'Topics', value: new Set(INSIGHTS.map((i) => i.category)).size },
              ]}
              secondaryHref="/pricing"
              secondaryLabel="See how charter pricing works"
            />
          }
        >
          {null}
        </IntroLayout>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <ul className="grid gap-px border-t border-[var(--color-ink)]/15">
          {INSIGHTS.map((article) => (
            <li key={article.slug}>
              <Link
                href={article.canonical}
                className="group grid gap-4 border-b border-[var(--color-ink)]/15 py-8 lg:grid-cols-[0.35fr_1.65fr]"
              >
                <div>
                  <span className="text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">
                    {INSIGHT_CATEGORY_LABEL[article.category] ?? article.category}
                  </span>
                  <time
                    dateTime={article.published}
                    className="numeric mt-2 block text-[length:var(--text-small)] text-[var(--color-ink-muted)]"
                  >
                    {article.published}
                  </time>
                </div>
                <div className="max-w-[68ch]">
                  <h2 className="text-[length:var(--text-h3)] font-semibold leading-snug tracking-tight">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-[var(--color-ink-muted)]">{article.summary}</p>
                  <ArrowRight
                    className="mt-4 h-4 w-4 text-[var(--color-accent-strong)] transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: route.title, description: route.description, path: PATH }),
          breadcrumbSchema(PATH),
        ])}
      />
    </>
  );
}
