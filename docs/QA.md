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
First Load JS ............ 103 kB shared, 106-109 kB per page
```

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
