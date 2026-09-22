import type { AircraftCategory } from '@/types/aircraft';

/**
 * Aircraft silhouettes, drawn as SVG.
 *
 * The inner pages were walls of text. They were text-only because no licensed
 * photography exists (docs/BUSINESS-DATA-REQUIRED G) — but "no photographs"
 * does not have to mean "no visuals". These are vector silhouettes of an
 * aircraft *class*, matching the 3D forms in the showroom, so a reader
 * scanning a service or pricing page can tell the sections apart at a glance.
 *
 * They are drawn to be told apart at about 28 px tall, which is the only size
 * that matters here. The first version was not: four categories rendered as
 * four near-identical jets, which reads as a bug rather than as information.
 * So each one now leads with a single unmistakable cue — rotor disc, propeller
 * discs, engines behind the wing, engines beneath it — and the fuselage is
 * secondary.
 *
 * Cost: a few hundred bytes each, inline, no request, no licence, and they
 * scale to any size. They carry no information the adjacent text does not, so
 * they are `aria-hidden` throughout.
 */
export function AircraftGlyph({
  category,
  className = '',
}: {
  category: AircraftCategory;
  className?: string;
}) {
  // Intrinsic width/height so the glyph keeps a sane size even if the
  // stylesheet has not arrived. Without them an SVG carrying only a viewBox
  // expands to fill its container, which is how one of these became a
  // full-viewport aeroplane during QA. Tailwind classes at the call site still
  // override both.
  const common = {
    viewBox: '0 0 120 48',
    width: 120,
    height: 48,
    fill: 'none',
    'aria-hidden': true as const,
    className,
  };

  const BODY = { fill: 'currentColor', opacity: 0.9 } as const;
  const WING = { fill: 'currentColor', opacity: 0.55 } as const;
  const LINE = { stroke: 'currentColor', opacity: 0.75 } as const;

  if (category === 'helicopter') {
    // Cue: the rotor disc, which nothing else has.
    return (
      <svg {...common}>
        <path d="M10 11h100" {...LINE} strokeWidth="2" />
        <path d="M60 11v6" {...LINE} strokeWidth="2" />
        <path
          d="M44 24c0-4.4 6-7.8 15-7.8 7.4 0 13.4 2.4 16.4 5.8l8.6 2c1.8.4 1.6 2.4-.4 2.6l-6.6.8c-2.6 3.2-9.4 5-18 5-9 0-15-3.6-15-8.4z"
          {...BODY}
        />
        <path d="M76 24h30" {...LINE} strokeWidth="3" />
        <path d="M104 14v10" {...LINE} strokeWidth="2.5" />
        <path d="M44 37h30M50 33l-3 4M68 33l3 4" {...LINE} strokeWidth="1.8" />
      </svg>
    );
  }

  if (category === 'turboprop') {
    // Cue: two upright propeller discs ahead of a straight, high wing.
    return (
      <svg {...common}>
        <path
          d="M6 25c0-3 10-5.4 28-5.4h46c10 0 24 2 28 4.4 1 .6 1 1.4 0 2-4 2.4-18 4.4-28 4.4H34C16 30.4 6 28 6 25z"
          {...BODY}
        />
        <path d="M40 17h44v3H40z" {...WING} />
        <path d="M46 12h12v6H46zM46 32h12v6H46z" {...WING} />
        <ellipse cx="44" cy="15" rx="3" ry="11" {...BODY} />
        <ellipse cx="44" cy="35" rx="3" ry="11" {...BODY} />
        <path d="M14 19l-3-13h6l7 13z" {...WING} />
      </svg>
    );
  }

  if (category === 'group-charter') {
    // Cue: the longest fuselage, a window line, two engines each side.
    return (
      <svg {...common}>
        <path
          d="M2 24c0-2.6 12-5.2 32-5.2h52c13 0 32 2.4 34 4.8.8.6.8 1.2 0 1.8-2 2.4-21 4.8-34 4.8H34C14 30 2 26.6 2 24z"
          {...BODY}
        />
        <path d="M58 19L36 3h11l29 16z" {...WING} />
        <path d="M58 29L36 45h11l29-16z" {...WING} />
        <path d="M48 15h12M64 16h9M48 33h12M64 32h9" {...LINE} strokeWidth="3.4" />
        <path d="M12 19L6 3h7l11 16z" {...WING} />
      </svg>
    );
  }

  if (category === 'executive-airliner') {
    // Cue: one engine each side under a swept wing, swept fin, shorter body.
    return (
      <svg {...common}>
        <path
          d="M10 24c0-2.6 11-5 28-5h44c11 0 26 2 29 4.2.9.6.9 1.2 0 1.8-3 2.2-18 4-29 4H38C21 29 10 26.6 10 24z"
          {...BODY}
        />
        <path d="M60 19L42 6h10l24 13z" {...WING} />
        <path d="M60 29L42 42h10l24-13z" {...WING} />
        <path d="M50 15h13M50 33h13" {...LINE} strokeWidth="3.6" />
        <path d="M18 19L13 6h6l10 13z" {...WING} />
      </svg>
    );
  }

  // Private jet. Cue: engines mounted on the rear fuselage, and a T-tail.
  return (
    <svg {...common}>
      <path
        d="M14 24c0-2.2 10-4.4 26-4.4h42c9 0 24 1.8 28 3.6.9.4.9 1.2 0 1.6-4 1.8-19 3.6-28 3.6H40C24 28.4 14 26.2 14 24z"
        {...BODY}
      />
      <path d="M66 20L50 8h9l21 12z" {...WING} />
      <path d="M66 28L50 40h9l21-12z" {...WING} />
      <path d="M26 18h12M26 30h12" {...LINE} strokeWidth="3.8" />
      <path d="M20 20L16 7h5l6 13z" {...WING} />
      <path d="M8 7h20" {...LINE} strokeWidth="2.4" />
    </svg>
  );
}
