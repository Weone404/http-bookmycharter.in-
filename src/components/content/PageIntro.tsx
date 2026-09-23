import type { ReactNode } from 'react';
import type { Path } from '@/types/common';
import type { DynamicCrumb } from '@/lib/routes';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

/**
 * The opening of every non-home page.
 *
 * `summary` is the answer-first sentence: it sits immediately under the H1 and
 * has to answer the page's question completely enough to be quoted on its own.
 * That is what makes a page extractable by an answer engine, and it happens to
 * be what makes it useful to a reader in a hurry too.
 */
export function PageIntro({
  path,
  dynamic,
  eyebrow,
  title,
  summary,
  children,
}: {
  path: Path;
  dynamic?: DynamicCrumb;
  eyebrow?: string;
  title: string;
  summary: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-[72ch]">
      <Breadcrumbs path={path} {...(dynamic ? { dynamic } : {})} />
      {eyebrow ? (
        <p className="mt-8 text-[length:var(--text-micro)] uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 text-[length:var(--text-h1)] font-semibold leading-[1.05] tracking-[-0.02em]">
        {title}
      </h1>
      <p className="mt-6 text-[length:var(--text-lead)]">{summary}</p>
      {children}
    </div>
  );
}
