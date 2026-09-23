/**
 * The wordmark, drawn in code.
 *
 * The inherited logo.webp reads "CHARTER BOOKING" rather than a brand name and
 * cannot be used. This is type plus a single mark, so it stays sharp at any
 * size, costs no image request, and needs no licence.
 *
 * The accent resolves through `--wordmark-accent`, which defaults to the deep
 * cyan because the bright one measures about 2.4:1 on white and fails at this
 * weight. Dark surfaces add `on-dark` and get the bright accent back.
 */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="h-[1.1em] w-[1.1em] translate-y-[0.1em]"
        aria-hidden="true"
        fill="none"
      >
        <path
          d="M2 13.6l20-9.1-4.4 9.1 4.4 9.1-20-9.1z"
          fill="currentColor"
          opacity="0.9"
        />
        <path d="M2 13.6h20" stroke="currentColor" strokeWidth="1.1" opacity="0.35" />
      </svg>
      <span className="font-semibold tracking-[0.02em] leading-none">
        Book My <span className="text-[var(--wordmark-accent,var(--color-cyan-deep))]">Charter</span>
      </span>
    </span>
  );
}
