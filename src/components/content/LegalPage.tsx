import type { Path } from '@/types/common';
import { Section } from '@/components/ui/Section';
import { PageIntro } from '@/components/content/PageIntro';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';

export interface LegalSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export function LegalPage({
  path,
  title,
  summary,
  updated,
  sections,
}: {
  path: Path;
  title: string;
  summary: string;
  updated: string;
  sections: readonly LegalSection[];
}) {
  return (
    <>
      <Section ground="ivory" width="default">
        <PageIntro path={path} title={title} summary={summary}>
          <p className="mt-6 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
            Last updated <time dateTime={updated} className="numeric">{updated}</time>
          </p>
        </PageIntro>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-4 max-w-[68ch] space-y-4 text-[var(--color-ink-muted)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: title, description: summary, path }),
          breadcrumbSchema(path),
        ])}
      />
    </>
  );
}
