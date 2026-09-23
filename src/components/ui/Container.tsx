import type { ReactNode } from 'react';

/**
 * The single horizontal rhythm for the site: 16px side gutter on a phone,
 * 48px at most, inside one shared frame.
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
  // Every width shares one frame and one left edge (see .site-frame). A
  // narrower width limits the line length inside the frame; it never
  // re-centres, which is what used to push content away from the left edge.
  const inner = width === 'wide' ? '' : width === 'reading' ? 'max-w-[46rem]' : 'max-w-[82rem]';
  return (
    <div className={`site-frame ${className}`}>
      {inner ? <div className={inner}>{children}</div> : children}
    </div>
  );
}
