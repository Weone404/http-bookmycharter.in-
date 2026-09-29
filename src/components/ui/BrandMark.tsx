import { MARK_PATHS } from './logo-paths';

/**
 * The Book My Charter mark: a "B" whose lower bowl is cut by a rising flight
 * path, with a gold wing in the opening. Navy and gold on light grounds,
 * white and gold on dark ones. Source files: public/brand/*.svg.
 */
export const BRAND_NAVY = '#0D2341';
export const BRAND_GOLD = '#C9A227';
export { MARK_PATHS };

export function BrandMark({
  className = '',
  tone = 'navy',
  title,
}: {
  className?: string;
  tone?: 'navy' | 'white';
  title?: string;
}) {
  const ink = tone === 'white' ? '#FFFFFF' : BRAND_NAVY;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
    >
      <path d={MARK_PATHS.top} fill={ink} />
      <path d={MARK_PATHS.bottom} fill={ink} />
      <path d={MARK_PATHS.wing} fill={BRAND_GOLD} />
    </svg>
  );
}
