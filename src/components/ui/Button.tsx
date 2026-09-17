import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const BASE =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-[0.08em] uppercase rounded-[var(--radius-control)] transition-all duration-[var(--duration-fast)] ease-[var(--ease-flight)]';

const VARIANTS: Record<Variant, string> = {
  // Cyan is used sparingly and this is where it earns its place.
  primary:
    'bg-[var(--color-cyan-accent)] text-[var(--color-midnight)] hover:bg-[var(--color-cyan-bright)] font-semibold',
  secondary:
    'border border-current/30 text-current hover:border-[var(--color-cyan-accent)] hover:text-[var(--color-cyan-accent)]',
  ghost: 'text-current hover:text-[var(--color-cyan-accent)] px-0',
};

export function Button({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${BASE} ${VARIANTS[variant]} ${className}`}>
      {children}
    </Link>
  );
}
