import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { absoluteUrl } from '@/lib/site';
import { INSIGHTS, INSIGHT_CATEGORY_LABEL, insightBySlug } from '@/data/insights';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { GlanceCard, IntroLayout } from '@/components/content/GlanceCard';
import { Prose } from '@/components/content/Prose';
import { RelatedLinks } from '@/components/content/RelatedLinks';

export function generateStaticParams() {
  return INSIGHTS.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = insightBySlug(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: article.canonical,
  });
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = insightBySlug(slug);
  if (!article) notFound();

  /**
   * Article schema without an author.
   *
   * No author profile exists yet, and inventing a byline to satisfy a schema
   * field would be fabricating a person. The node omits `author` entirely
   * rather than carrying a placeholder.
   */
  const articleSchema = {
    '@type': 'Article',
    '@id': `${absoluteUrl(article.canonical)}#article`,
    headline: article.title,
    description: article.summary,
    datePublished: article.published,
    ...(article.updated ? { dateModified: article.updated } : {}),
    articleSection: INSIGHT_CATEGORY_LABEL[article.category] ?? article.category,
    mainEntityOfPage: absoluteUrl(article.canonical),
    publisher: { '@id': `${absoluteUrl('/')}#organization` },
  };

  // Computed from the article itself, at a conventional 200 words a minute,
  // so the figure cannot drift from the text it describes.
  const words = article.body.join(' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  const firstSupport = article.supports[0];

  return (
    <>
      <Section ground="ivory" width="wide">
        <IntroLayout
          aside={
            <GlanceCard
              heading="In this guide"
              stats={[
                { label: 'Reading time', value: `${minutes} min` },
                { label: 'Related pages', value: article.supports.length },
              ]}
              {...(firstSupport
                ? { secondaryHref: firstSupport.href, secondaryLabel: firstSupport.label }
                : {})}
            />
          }
          intro={
            <PageIntro
              path={article.canonical}
              dynamic={{ path: article.canonical, label: article.title, parent: '/insights' }}
              eyebrow={INSIGHT_CATEGORY_LABEL[article.category] ?? article.category}
              title={article.title}
              summary={article.summary}
            >
              <p className="mt-6 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                Published{' '}
                <time dateTime={article.published} className="numeric">
                  {article.published}
                </time>
                {article.updated ? (
                  <>
                    {' · Updated '}
                    <time dateTime={article.updated} className="numeric">
                      {article.updated}
                    </time>
                  </>
                ) : null}
              </p>
            </PageIntro>
          }
        >
          <article>
            <Prose paragraphs={article.body} />
          </article>
        </IntroLayout>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks links={article.supports} heading="Where this applies" />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({
            name: article.title,
            description: article.summary,
            path: article.canonical,
          }),
          articleSchema,
          breadcrumbSchema(article.canonical, {
            path: article.canonical,
            label: article.title,
            parent: '/insights',
          }),
        ])}
      />
    </>
  );
}
