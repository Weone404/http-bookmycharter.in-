/**
 * The Book My Charter mark: a white aircraft climbing to the upper right on a
 * rounded blue square. The same drawing is in public/brand/*.svg (downloads,
 * print) and in the app icons (scripts/build-icons.mjs).
 */
export const BRAND_BLUE = '#1F5FD6';
/** Aircraft, top view, nose up, in a 24 × 24 box. */
export const PLANE_PATH =
  'M12 2c.9 0 1.4 1 1.4 2.2v5l8.6 4.8v2l-8.6-2.4v5.4l2.6 1.9v1.5L12 21.4l-4 1v-1.5l2.6-1.9v-5.4L2 16v-2l8.6-4.8v-5C10.6 3 11.1 2 12 2z';
/** Turns the 24-unit aircraft 45° and centres it on the 64-unit tile. */
export const PLANE_TRANSFORM = 'translate(32 32) rotate(45) scale(1.95) translate(-12 -12.2)';

export function BrandMark({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
    >
      <rect width="64" height="64" rx="14" fill={BRAND_BLUE} />
      <path d={PLANE_PATH} transform={PLANE_TRANSFORM} fill="#FFFFFF" />
    </svg>
  );
}
