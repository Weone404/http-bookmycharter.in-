import { BRAND_GOLD } from './BrandMark';
import { LOGO_WIDTH, MARK_PATHS, WORD_PATHS } from './logo-paths';

/**
 * The full logo (mark plus "BOOK MY CHARTER"), drawn as outlined vector
 * paths: identical everywhere, sharp at any size, no font or image request.
 *
 * The navy parts follow `--logo-ink` (navy by default, white on `.on-dark`
 * grounds); "MY" and the wing stay gold.
 */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${LOGO_WIDTH} 100`}
      role="img"
      aria-label="Book My Charter"
      className={`block h-[1.75em] w-auto ${className}`}
    >
      <path d={MARK_PATHS.top} fill="var(--logo-ink)" />
      <path d={MARK_PATHS.bottom} fill="var(--logo-ink)" />
      <path d={MARK_PATHS.wing} fill={BRAND_GOLD} />
      {WORD_PATHS.map((p, i) => (
        <path key={i} d={p.d} transform={p.transform} fill={p.role === 'accent' ? BRAND_GOLD : 'var(--logo-ink)'} />
      ))}
    </svg>
  );
}
