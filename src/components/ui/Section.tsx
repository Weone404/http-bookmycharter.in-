import type { ReactNode } from 'react';
import { Container } from './Container';

type Ground = 'ivory' | 'midnight' | 'transparent';

const GROUND: Record<Ground, string> = {
  ivory: 'bg-[var(--color-ivory)] text-[var(--color-ink)]',
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
 * A page section with the sitewide vertical rhythm. Alternating ivory and
 * midnight grounds is what gives the page its structure — there is no third
 * background colour.
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
