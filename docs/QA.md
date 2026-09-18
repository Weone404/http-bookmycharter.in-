# QA

## Gates

```
npm run verify
```

runs, in order: `tsc --noEmit` → `eslint .` → `scripts/verify-routes.mjs` → `next build` →
`scripts/verify-build.mjs`. Any failure stops the chain.

## What each gate catches

**`tsc --noEmit`** — `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
`noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`. No `any` in the codebase.

**`eslint .`** — `next/core-web-vitals` + `next/typescript`, with `no-explicit-any` raised to error
and `consistent-type-imports` enforced. Generated data files and framework-authored files are
ignored.

**`scripts/verify-routes.mjs`** — every route marked `live` has a page file, and every page file is
declared in the registry. Catches sitemap entries with no page, and pages nothing links to.

**`scripts/verify-build.mjs`** — runs against the **built HTML**, not the source tree, because
source review is what let the previous site's defects through:

1. Exactly one `<h1>` per page
2. A canonical on every page, absolute, on the right host (`/_not-found` excluded)
3. Every JSON-LD block parses and every node carries an `@type`
4. Every internal link resolves to a page that was actually built
5. No "chardham" occurrence outside the deliberate sister-site link, this site's own `/chardham`
   cluster URLs and labels, and the router's own segment names
6. Every sitemap URL has a built page

## Current results

```
tsc --noEmit ............. clean
eslint . ................. clean (0 errors, 0 warnings)
verify-routes ............ 42 declared · 27 live · 30 page files · consistent
next build ............... clean, all routes prerendered static
verify-build ............. clean — 47 pages, 43 sitemap URLs
First Load JS ............ 103 kB shared · / 109 kB · /aircraft 108 kB
```

## Browser verification of the 3D engine

Run against a production build (`next start`) in headless Chromium 1194 with ANGLE/SwiftShader, so
a real WebGL context exists and the scene path is exercised rather than only the fallback.

**Measured:**

| Check | Result |
|---|---|
| Canvases per page | 1 on `/`, 1 on `/aircraft` — never one per card |
| WebGL context created | yes, on every page and viewport tested |
| Page errors | 0 |
| Console errors | 0 |
| `<h1>` per page | 1 |
| Primary CTA present and clickable | yes — the hero canvas is `pointer-events: none` |
| Page scrolls normally | yes, at every viewport |
| Fleet navigation | two clicks of "Next aircraft" moves H145 → CJ2 → Citation XLS, and the panel text follows |
| Viewports | 1440×900 and 390×844 |
| `prefers-reduced-motion: reduce` | page renders, no errors, controls work |
| Reduced-motion config | `travelArc`, `floatAmplitude` and `parallax` are 0 at all three viewport classes; `settle` 0.18 s |
| Viewport classing | 320/375/767 mobile · 768/1279 tablet · 1280/1920 desktop |
| Canvas backing store | matches CSS size at DPR 1; clamped to 1.25/1.5/1.75 by config |

**Not measured, and therefore not claimed:**

- Frame rate on real hardware. The headless figure (6–7 fps) is software rasterisation and bounds
  the JavaScript side of the loop only. It is not a GPU measurement and must not be quoted as one.
- Lighthouse, LCP, INP, CLS, TTFB against a deployment.
- Safari, Firefox.
- Mac, Windows, Android, iPhone.
- GPU memory, draw calls, texture memory under a profiler.
- The GLB loading path — written and typed, never exercised.

## Defects this pass found and fixed

Found by looking at rendered screenshots, not by reading code:

1. **Primary navigation overflowed at 1440px.** Ten items plus a phone number collided —
   "Aircraft Services Pricing" ran together and the number wrapped onto three lines. Reduced to six
   primary items, added `whitespace-nowrap`, and the phone now hides between `lg` and `2xl`.
2. **Cockpit glazing rendered as a black blob.** A full sphere placed where the revolved fuselage
   had already tapered, with `metalness: 0.9` and `roughness: 0.12` — a mirror. Now a flattened,
   inset canopy with tinted-glass values.
3. **The camera crowded the aircraft.** Wings ran off frame and the aircraft sat under the content
   panel. Pulled back and given a `lookOffset` so it composes to the right of the panel.
4. **The shadow pad showed its edge.** A fixed `ContactShadows` plane could not cover an 84-unit
   world once spacing grew. Replaced with a ground plane and a key light anchored to the active
   stop.
5. **The mobile panel covered the entire scene.** The aircraft was completely hidden behind it. The
   panel is now over the canvas from `lg` up and below it on smaller screens.
6. **The helicopter read as an egg.** One sphere, no visible glazing, tail boom lost behind the
   cabin. Rebuilt as cabin, nose, windscreen, chin window, high tail boom, fin, stabiliser and
   coned blades.

Screenshot review is now part of QA for anything visual. Five of these six defects compiled, linted
and passed every automated gate.

## The sweep-pattern lesson

The brand-leak check found 48 "problems" on its first run and all were false. The pattern matched
this site's own `/chardham` URLs, its cluster label and the router's segment names. The fix was to
strip every legitimate use first and flag only what remained — which then found the real answer:
nothing.

`CLAIMS.md` records the same lesson from the previous site: a sweep is only as good as its pattern
list, and a pattern that is too narrow reports a clean sheet just as confidently as one that is
correct. Widen the patterns whenever a new claim type appears, and re-run the whole corpus rather
than the edited region.

## Not yet done

Browser testing across Chromium, Safari and Firefox · real-device performance and Lighthouse
measurement · 3D frame-rate testing · axe/WCAG audit · production redirect response verification.

**No Lighthouse or FPS figure is claimed anywhere in this repository**, because none has been
measured against a production deployment. Build-time bundle figures are reported because they were
observed.
