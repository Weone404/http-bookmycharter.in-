# Design System

Defined in `src/app/globals.css` as Tailwind v4 `@theme` tokens. Components reference tokens, never
raw values.

## Colour

White + Ink + Sky (September 2026). One accent colour; everything else is ink on white or cool grey.

| Token | Light ground | Inside `.on-dark` | Role |
| --- | --- | --- | --- |
| `--color-surface` | `#FFFFFF` | — | Cards, header, clean sections |
| `--color-ivory` | `#F4F6F9` | — | Alternate light ground (name kept; it is a cool grey now) |
| `--color-ink` / `--color-midnight` | `#0B1726` | — | Text; the one dark ground (hero, footer, at most one band a page) |
| `--color-ink-muted` | `#526273` | — | Secondary text |
| `--color-accent` | `#1F5FD6` | `#8AB4FF` | Primary action, links, icons |
| `--color-accent-strong` | `#1A4FB5` | `#B3CEFF` | Hover, small link text |
| `--color-on-accent` | `#FFFFFF` | `#0B1726` | Text on an accent fill |

**Use the role, never a hex.** `.on-dark` swaps the accent roles to a lighter sky, because `#1F5FD6`
on ink is about 3:1. Any dark surface carries `on-dark` (the `midnight` Section ground adds it), so a
primary button or link is legible on either ground without a second variant.

**Sky is the only saturated colour.** It marks what can be clicked. Nothing decorative uses it at
full strength.

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
