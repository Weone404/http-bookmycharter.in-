# Production Readiness

Status as of 2026-09-18. **PASS means tested, and the evidence column says how.** UNKNOWN means not
tested — it is not a soft pass, and it is not converted to PASS by a clean build.

| Area | Status | Evidence |
|---|---|---|
| Build | PASS | `next build` clean. 47 pages, all prerendered static except `/api/charter-request` (ƒ) |
| TypeScript | PASS | `tsc --noEmit` clean under `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`. No `any` in the codebase |
| Lint | PASS | `eslint .` — 0 errors, 0 warnings, with `no-explicit-any` raised to error |
| Route registry | PASS | `verify-routes.mjs`: 42 declared, 27 live, 30 page files, consistent. A live route with no page fails the build |
| SEO — titles | PASS | `verify-build.mjs` checks every built page for a non-empty, unique title under 70 chars. Caught two over-length insight titles this pass |
| SEO — descriptions | PASS | Checked non-empty and unique across all 47 pages |
| SEO — canonicals | PASS | Every page: absolute, `https://bookmycharter.in`, self-referencing, no trailing slash, no `http://` |
| SEO — headings | PASS | Exactly one `<h1>` per page; no `<h3>` before the first `<h2>` |
| SEO — OpenGraph | PASS | `og:title` and `og:image` present on every indexable page. `og:image` resolves — `/og/default.png` returns 200, `image/png`, 42 KB |
| Sitemap | PASS | 43 URLs. Every one has a built page, is on the canonical origin, carries no query string or trailing slash, is not duplicated, and is not `noindex` |
| Robots | PASS | Allows `*`, disallows `/api/`, names GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others. Sitemap line present. Verified in built output |
| Schema | PASS | Every JSON-LD block parses; every node has `@type`; no `@id` on a foreign origin; no node名 containing "CharDham". Organization, LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, Article, FAQPage |
| Internal links | PASS | Every internal `href` in every built page resolves to a page that was actually built. Zero broken links |
| Entity consistency | PASS | Old-brand sweep over built HTML **and served static files**, after stripping the legitimate uses. Caught `public/site.webmanifest` still declaring "Book My CharDham" — a served file the HTML-only sweep could not see |
| Server-rendered content | PASS | Minimum 120 words of visible server-rendered text enforced per page. Nothing depends on WebGL |
| Dev/prod boundary | PASS | Zero `console.*` in `src/`, zero localhost or `http://` references, zero placeholder copy in visible text, no `process.env` reads outside the analytics gate. All enforced by `verify-build.mjs` |
| Charter API — method guard | PASS | `GET /api/charter-request` → 405 |
| Charter API — no adapter | PASS | Valid payload with no destination configured → **503 `unavailable`**. It does not accept and discard |
| Charter API — validation | PASS | Invalid payload → 422 with seven per-field messages |
| Charter API — honeypot | PASS | Filled honeypot → 200 with nothing delivered |
| Charter API — rate limit | PASS | Sixth POST inside the window → 429 |
| Charter API — payload cap | PASS | 20 KB body → 413 |
| Charter API — malformed body | PASS | Non-JSON with a fresh client key → 400 |
| Charter API — real delivery | PASS | With `CHARTER_WEBHOOK_URL` set to a local sink: 200 with reference `BMC-…`, and the sink logged the full typed payload |
| Charter API — duplicates | PASS | Identical request repeated → 409 `duplicate` |
| Analytics layer | PASS (built) / UNKNOWN (reporting) | 18 typed events, one provider, one delegated `data-track` listener. Renders no script without `NEXT_PUBLIC_GA_ID`. **No ID exists yet, so nothing has been observed arriving in a dashboard** |
| 3D rendering | PASS | Headless Chromium with a real WebGL context: one canvas per page, live context, zero page errors, zero console errors, at 1440×900 and 390×844 |
| Reduced motion | PASS | Config executed directly: `travelArc`, `floatAmplitude` and `parallax` are 0 at all three viewport classes; `settle` 0.18 s. Page renders and controls work under `prefers-reduced-motion: reduce` |
| Responsive config | PASS | Viewport classing verified at 320/375/767 → mobile, 768/1279 → tablet, 1280/1920 → desktop |
| Visual QA — 1440 | PASS | Screenshot-inspected. Six defects found and fixed this way in step 17; five had passed every automated gate |
| Visual QA — 390 mobile | PASS | Screenshot-inspected. Panel moved below the canvas after the first render showed it covering the whole scene |
| Visual QA — 1280, 1920 | UNKNOWN | Not yet captured |
| Tablet QA — 768, 834, 1024 | UNKNOWN | Not yet captured |
| Keyboard accessibility | PARTIAL | Controls are real buttons with labels, `aria-current` and disabled states; arrow/Home/End handlers are scoped to the showroom; sitewide `:focus-visible` is never removed. **A full no-mouse walkthrough has not been performed** |
| Contrast audit | UNKNOWN | Palette chosen for contrast (`--color-cyan-deep` exists because the accent fails at body size on ivory) but no automated contrast run |
| Lighthouse | UNKNOWN | Not measured. No score is claimed anywhere in this repository |
| Core Web Vitals | UNKNOWN | LCP, INP, CLS, TTFB not measured against a deployment |
| Real-device FPS | UNKNOWN | The 6–7 fps headless figure is software rasterisation and is not a GPU measurement |
| Safari | UNKNOWN | Not tested |
| Firefox | UNKNOWN | Not tested |
| Served asset weight | PASS | `public/` is 4 KB, one file. The oversized-asset check fails the build above 1.5 MB. 66 inherited images moved to `assets-unverified/`, outside `public/` |
| Secrets | PASS | No `process.env` in client code other than `NEXT_PUBLIC_GA_ID`. `CHARTER_WEBHOOK_URL` is deliberately not `NEXT_PUBLIC_`. `.env.example` carries empty values only, no credentials committed |
| Unsafe HTML | PASS | One `dangerouslySetInnerHTML`, rendering JSON-LD built by `src/lib/schema.ts` from typed site data. Never user input |
| Dependencies | PASS | 10 runtime, 11 dev. No unused package. `xlsx` and `@google/genai` removed in the foundation commit. No dependency added for step 17 or 18 |
| Charter backend | BLOCKED | `docs/BUSINESS-DATA-REQUIRED.md` I7 — destination not chosen. API refuses with 503 until it is |
| DNS / HTTPS | BLOCKED | Domain parked at 103.235.104.55 with no HTTPS. No DNS change has been made; that is an external irreversible action |
| Business model (B1) | BLOCKED | Copy is neutral and resolves through `voice()`. One line changes it once answered |

## The rule this table follows

A clean build is necessary and not sufficient. Six visual defects in step 17 compiled, linted and
passed every automated gate; they were found by looking at rendered screenshots. The brand leak in
`site.webmanifest` passed three clean runs of the HTML validator because it is served but is not
HTML.

So: PASS requires evidence of the right kind for the claim. UNKNOWN stays UNKNOWN.
