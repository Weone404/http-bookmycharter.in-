import { BrandMark } from './BrandMark';

/**
 * The wordmark, drawn in code.
 *
 * The inherited logo.webp reads "CHARTER BOOKING" rather than a brand name and
 * cannot be used. This is type plus the brand mark (BrandMark), so it stays sharp at any
 * size, costs no image request, and needs no licence.
 *
 * The accent resolves through `--wordmark-accent`, which defaults to the deep
 * cyan because the bright one measures about 2.4:1 on white and fails at this
 * weight. Dark surfaces add `on-dark` and get the bright accent back.
 */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark className="h-[1.3em] w-[1.3em] shrink-0 self-center" />
      <span className="font-semibold tracking-[0.02em] leading-none">
        Book My <span className="text-[var(--wordmark-accent,var(--color-accent-strong))]">Charter</span>
      </span>
    </span>
  );
}
