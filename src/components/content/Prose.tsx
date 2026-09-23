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
}: {
  heading: string;
  points: readonly string[];
  id?: string;
}) {
  if (points.length === 0) return null;
  return (
    <div id={id}>
      <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">{heading}</h2>
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
