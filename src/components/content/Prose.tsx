/** Body paragraphs at a readable measure. */
export function Prose({
  paragraphs,
  className = '',
}: {
  paragraphs: readonly string[];
  className?: string;
}) {
  return (
    <div className={`max-w-[68ch] space-y-5 ${className}`}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}

/** A titled list of short points. Used for audiences, timing and caveats. */
export function PointList({
  heading,
  points,
  id,
  level = 2,
}: {
  heading: string;
  points: readonly string[];
  id?: string;
  /** 3 when the list sits under its own section heading. */
  level?: 2 | 3;
}) {
  if (points.length === 0) return null;
  const Tag = level === 3 ? 'h3' : 'h2';
  return (
    <div id={id}>
      <Tag className="text-[length:var(--text-h3)] font-semibold tracking-tight">{heading}</Tag>
      <ul className="mt-5 max-w-[68ch] space-y-3">
        {points.map((point) => (
          <li key={point} className="flex gap-3.5">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-[var(--color-accent)]" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
