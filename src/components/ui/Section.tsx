import type { ReactNode } from 'react';
import { Container } from './Container';

type Ground = 'ivory' | 'surface' | 'midnight' | 'transparent';

const GROUND: Record<Ground, string> = {
  ivory: 'bg-[var(--color-ivory)] text-[var(--color-ink)]',
  /* White. Used where a section should read as a clean sheet rather than as
     another band of the same ivory — the alternation that replaces most of
     what used to be midnight. */
  surface: 'bg-[var(--color-surface)] text-[var(--color-ink)]',
  midnight: 'bg-[var(--color-midnight)] text-[var(--color-ink-inverse)]',
  transparent: '',
};

/**
 * Allowed wrapper elements.
 *
 * Deliberately a narrow union rather than `ElementType`. React Three Fiber
 * augments the JSX namespace with every Three.js object, so a permissive
 * `ElementType` resolves against mesh and geometry elements too and stops
 * type-checking usefully. A section is one of four HTML elements.
 */
type SectionTag = 'section' | 'div' | 'article' | 'aside';

/**
 * A page section with the sitewide vertical rhythm.
 *
 * Structure comes from alternating ivory and white, with midnight kept for the
 * few places that should actually feel like a different register — the footer,
 * and at most one band per page. The earlier version had only ivory and
 * midnight, so every section that needed to stand apart had to go dark, and
 * seventeen midnight bands across the site is what made it feel heavy rather
 * than premium.
 */
export function Section({
  children,
  ground = 'ivory',
  as: Tag = 'section',
  id,
  width,
  className = '',
}: {
  children: ReactNode;
  ground?: Ground;
  as?: SectionTag;
  id?: string;
  width?: 'default' | 'wide' | 'reading';
  className?: string;
}) {
  return (
    <Tag id={id} className={`${GROUND[ground]} py-[var(--spacing-section)] ${className}`}>
      <Container {...(width ? { width } : {})}>{children}</Container>
    </Tag>
  );
}
