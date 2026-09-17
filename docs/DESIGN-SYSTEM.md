# Design System

Defined in `src/app/globals.css` as Tailwind v4 `@theme` tokens. Components reference tokens, never
raw values.

## Colour

Three brand colours and tonal variations derived from them. Nothing else.

| Token | Value | Use |
|---|---|---|
| `--color-midnight` | `#071A2B` | Navigation, hero, footer, dark sections, structural surfaces |
| `--color-cyan-accent` | `#16B8D4` | Accents, interactive states, active controls, the primary CTA |
| `--color-ivory` | `#F5F7F4` | Content sections, editorial surfaces, long-form reading |

Derived: `--color-midnight-950/900/800/700/600`, `--color-cyan-bright/deep`, `--color-ivory-dim`,
and text tokens `--color-ink`, `--color-ink-muted`, `--color-ink-inverse`,
`--color-ink-inverse-muted`.

**Cyan is used sparingly.** It marks the primary action, the active state and the accent rule — not
headings, not borders generally, not decoration. Its scarcity is what makes it read as "act here".

`--color-cyan-deep` exists because `#16B8D4` on ivory does not carry enough contrast for body-size
text; the deeper tone is used for links and small text on light grounds.

## Type

Fluid throughout — `clamp()`, so nothing is sized per breakpoint:
`--text-display`, `--text-h1`, `--text-h2`, `--text-h3`, `--text-lead`, `--text-body`,
`--text-small`, `--text-micro`.

System font stack. No webfont: zero font payload, zero CLS, no render-blocking request, and no
dependency on a font host. A licensed face can be introduced later by changing one token, and the
decision is revisited if the brand requires a specific typeface.

`.numeric` applies `font-variant-numeric: tabular-nums` for specifications, capacities, distances,
phone numbers and dates, so figures align in tables.

## Space and rhythm

`--spacing-section` and `--spacing-gutter` are both fluid. Sections alternate ivory and midnight
grounds; there is no third background colour, and that alternation is what gives a long page its
structure without decoration.

`Container` sets the side gutter once, at three widths (`default`, `wide`, `reading`). No component
sets its own horizontal padding.

## Motion

One easing curve sitewide — `--ease-flight`, `cubic-bezier(0.22, 0.61, 0.36, 1)` — with three
durations. Aviation motion is smooth and damped, never bouncy.

Hierarchy: primary (hero, fleet, major transitions) · secondary (section reveals, hover, parallax)
· tertiary (buttons, icons, micro-feedback).

`prefers-reduced-motion: reduce` collapses animation and transition durations globally and disables
smooth scrolling. Usability is unchanged.

## Components

`Container` · `Section` · `Button` · `Breadcrumbs` · `Wordmark` · `PageIntro` · `Prose` ·
`PointList` · `FaqSection` · `RelatedLinks` · `AircraftTable` · `AerodromeTable` · `LegalPage`.

The wordmark is drawn in code rather than loaded as an image: sharp at any size, no request, no
licence, and it replaces an inherited logo file that read "CHARTER BOOKING" instead of a brand name.

## Accessibility

Semantic HTML throughout. Visible focus (`:focus-visible`, cyan, 3px offset) is never removed. A
skip link precedes the header. FAQs use native `details`/`summary`, so they work without JavaScript
and their answers are in the document whether open or closed. Tables carry captions and row
headers. Icons are `aria-hidden`; their meaning is always in adjacent text.

## Responsive

Fluid tokens and intrinsic layout rather than breakpoint-specific sizing. Grids collapse by
`sm`/`lg`. Tables scroll horizontally inside their own container so the page body never does.
`viewport-fit=cover` with safe-area padding on the mobile drawer.
