import type { ReactNode } from 'react';

/**
 * The single horizontal rhythm for the site. A side gutter of at least 20px at
 * every width, scaling to 4rem on large screens, so nothing ever touches the
 * edge of a phone screen.
 */
export function Container({
  children,
  className = '',
  width = 'default',
}: {
  children: ReactNode;
  className?: string;
  width?: 'default' | 'wide' | 'reading';
}) {
  const max =
    width === 'wide' ? 'max-w-[110rem]' : width === 'reading' ? 'max-w-[46rem]' : 'max-w-[82rem]';
  return (
    <div
      className={`mx-auto w-full ${max} px-[var(--spacing-gutter)] ${className}`}
    >
      {children}
    </div>
  );
}
