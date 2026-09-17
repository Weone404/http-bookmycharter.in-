# Phase 1 — Forensic Audit

**Repository:** `http-bookmycharter.in-` (github.com/Weone404/http-bookmycharter.in-, single commit `6e6412c`)
**Target:** https://bookmycharter.in/ — Book My Charter
**Audited:** 2026-09-17 · against the working tree, not a build

---

## 1. Current state

### 1.1 Origin
This is not a Book My Charter codebase. It is a copy of the **Book My CharDham** site
(itself a fork of a Fly Star template, itself derived from an airline-website template),
retargeted by name only. Three inherited layers are still present:

| Layer | Evidence |
|---|---|
| Google AI Studio scaffold | `README.md` is AI Studio boilerplate; `.env.example` documents `GEMINI_API_KEY` / `APP_URL` as "injected by AI Studio"; `metadata.json` and root `index.html` are AI Studio applet artefacts; `@google/genai` is a dependency with zero imports in `src/` |
| Airline-website template | `src/components/TurkishAirlinesLogo.jsx`; `modals/CheckInModal`, `FlightStatusModal`, `BaggageModal`, `CabinModal`, `LoginModal`, `FlightResultsModal` — check-in, baggage and login flows this business does not operate |
| Book My CharDham | `src/lib/site.js` declares `name: 'Book My CharDham'` and `url: 'https://www.bookmychardham.in'`; `src/components/BookMyChardhamLogo.jsx`; `src/data/bookmychardhamData.js`; 148 `chardham` references across 30 source files |

### 1.2 Stack as built
- Next.js 15.2 App Router, React 19
- **JavaScript, not TypeScript.** Every source file is `.jsx` / `.js`. `tsconfig.json` exists but
  has `strict: false`, `allowJs: true`, and `include` lists only `**/*.ts` / `**/*.tsx` — so it
  type-checks nothing. `npm run lint` is aliased to `tsc --noEmit`; there is no ESLint config.
- Tailwind CSS v4 via `@tailwindcss/postcss`
- Framer Motion 13
- **Absent:** `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`. The entire mandated 3D
  and scroll-orchestration layer does not exist yet.

### 1.3 Size
- `src/` — 87 files, 10,852 lines
- `public/` — 85 files, **106 MB**
- Largest single file: `src/data/privateAviationPages.js`, 884 lines

### 1.4 Routes (23)
`/` · `/about` · `/contact` · `/booking` · `/blogs` · `/fleet` · `/fleet/[slug]` ·
`/kedarnath-helicopter-yatra` · `/char-dham-yatra-by-helicopter` · `/helicopter-flower-dropping` ·
`/private-helicopter-charter` · plus **12** flat slugs rendered from one template:
`private-jet-charter`, `private-jet-charter-booking`, `private-jet-booking-india`,
`charter-flight-booking`, `aircraft-charter-services-india`, `private-jet-hire`,
`business-jet-charter`, `private-jet-charter-delhi`, `corporate-jet-charter`,
`helicopter-charter-services`, `helicopter-booking`, `corporate-helicopter-charter`.
One API route: `/api/airports`.

---

## 2. Problems

### 2.1 Brand and entity — critical
1. `SITE.url` is `https://www.bookmychardham.in`. `layout.jsx` sets `metadataBase: new URL(SITE.url)`.
   Every canonical, every OpenGraph `url`, every JSON-LD `@id` and `url` on this build therefore
   resolves to the **other domain**. Deployed as-is to bookmycharter.in, the whole site declares
   itself to be bookmychardham.in.
2. `SITE.name` / `legalName` / `description` are Book My CharDham's.
3. Page titles carry `| BookMyChardham` (e.g. `privateAviationPages['private-jet-charter'].title`).
4. Body copy names the wrong company: *"At BookMyChardham, we coordinate with trusted charter
   providers…"* appears in the intro of the programmatic pages.
5. `AREA_SERVED` is `['Delhi NCR','Dehradun','Haridwar','Rishikesh','Uttarakhand']` — a pilgrimage
   service area, applied sitewide including to the private-jet pages, and emitted into
   `organizationSchema()` and every `serviceSchema()`.
6. Logo component is `BookMyChardhamLogo.jsx`.

### 2.2 Duplicate content — critical
The 12 flat slugs are one component (`PrivateAviationPage.jsx`, 401 lines) driven by 12 entries of
the same shape: `trustHighlights[5]`, `introParagraphs[3]`, `introPoints[4]`, `benefits[6]`,
`process[5]`, FAQs. The entries are paraphrases of one another — six benefit cards per page saying
*Flexible Scheduling / Private & Discreet / Customized Routing / Executive Comfort / Time-Efficient
/ Dedicated Coordination*, reworded per slug. Six of the twelve
(`private-jet-charter`, `private-jet-charter-booking`, `private-jet-booking-india`,
`private-jet-hire`, `business-jet-charter`, `corporate-jet-charter`) address a single search intent.
This is the programmatic-SEO pattern the brief prohibits, already shipped.

### 2.3 Performance — critical
| Asset | Size |
|---|---|
| `public/chardham & kedarnath heli-yatra.mp4` | **76 MB** |
| `public/private helicopter.mp4` | **16 MB** |
| `public/aircraft-videos.mp4` | 2.0 MB |
| `public/images` | 6.1 MB |
| `public/icons/fleet` | 5.5 MB |

The 76 MB and 16 MB files are `<video>` sources on `ChardhamPage` and `CharterPage`
(referenced percent-encoded, so the filenames contain spaces and `&`). All four videos are tracked
in git and show as modified in the working tree. This alone makes the mandated LCP and payload
targets unreachable.

**38 of ~60 components are Client Components** (`'use client'`), including `Footer`, `Navbar`,
`ConversionTracking`, and every `components/pages/*` wrapper. The React Server Components model is
effectively unused; almost the whole tree ships to the browser.

### 2.4 SEO
- **Sitemap and robots miss 6 of 12 fleet pages.** `fleet.js` defines 12 aircraft;
  `sitemap.js` and `LAST_MODIFIED` list 6. Missing: `cessna-citation-cj3`, `challenger-300`,
  `falcon-50`, `gulfstream-g650`, `learjet-60` (and `avanti-180`, see next line).
- **`avanti-180` is declared twice in `fleet.js`** — a duplicate slug feeding `/fleet/[slug]`.
- **`/fleet/[slug]` renders two `<h1>` elements.**
- **`/blogs` is six article cards linking to `#anchor` fragments.** No `/blogs/[slug]` route exists.
  Six advertised articles that do not exist, illustrated with `flystar_*` images.
- `SEO-PAGE-MAP.md` and `SEO-AUDIT.md` at the repo root document the *bookmychardham* URL set and
  are now stale for this project.

### 2.5 Content truth
- `CLAIMS.md` (the inherited claims register) lists 25 checkable claims, 11 blockers — named staff
  with military rank and flight-hour figures, a "UCADA Empanelled" badge, "ISO 9001:2015",
  "12 Helicopters", "100% Safety Record", "45,000+ pilgrims", "15+ years". All were stripped from the
  build; the register records what restores each one. **This register must be carried forward and
  re-swept against the new build.**
- Aircraft imagery: `fleet.js` sets every `image` and `videoUrl` to `null`, with a comment recording
  that the previous set pointed at an AI-generated image carrying an invented Indian registration
  and at signed Piaggio press material. The remaining `public/images/flystar_*.jpg|webp` files are
  named for a different company and are the same AI-generated provenance.
- Aircraft **types** in `fleet.js` are recorded as real and offered for charter (CLAIMS.md row D).
  `fleet-details.md` (495 lines) holds specifications marked as typical civil/charter values, not
  tail-specific — usable only if labelled that way on the page.

### 2.6 Security and dependencies
- **`xlsx` is a runtime dependency.** `/api/airports` reads
  `public/list of airport/India_Airports_List.xlsx` and parses it with `XLSX.read` on every
  uncached request. The npm-registry `xlsx` package carries unpatched prototype-pollution and ReDoS
  advisories. This should be a build-time transform to JSON, and the dependency removed.
- `@google/genai` — installed, unused.
- `.env.example` still instructs the reader to set `GEMINI_API_KEY`.
- `vercel.json` security headers are sound (HSTS with preload, nosniff, SAMEORIGIN, Referrer-Policy,
  Permissions-Policy). No CSP.
- `next.config.mjs` `headers()` returns `[]` outside production, and its cache rule uses
  `/:path*.(css|js|…)` — Next.js serves hashed `/_next/static` assets with immutable caching already,
  so this rule mostly duplicates that while missing `avif` and `mp4`.

### 2.7 Repository hygiene
Root contains `index.html`, `metadata.json`, `.cv-baseline-1.json`, `.cv-baseline-2.json`,
`.cv-baseline-3.json` (398 KB for the first alone), `_quarantine/BackgroundVideo.jsx`, both
`bun.lock` and `package-lock.json`, and `"name": "react-example"` in `package.json`.
Two parallel data files exist: `bookmychardhamData.js` (577 lines) and `bookmycharterData.js`
(577 lines).

---

## 3. What is worth keeping

Not everything here is bad. These survive the rebuild, ported to TypeScript:

- **`src/lib/schema.js`** — clean JSON-LD builders (`organizationSchema`, `serviceSchema`,
  `faqSchema`, `breadcrumbSchema`, `webPageSchema`, `websiteSchema`, `graph`). Correct shape.
- **`src/lib/site.js` `pageMetadata()`** — one metadata helper that restates `openGraph.images`
  on every page, working around Next.js replacing rather than merging parent metadata. The
  single-source-of-truth discipline (prices, NAP, season in one module) is the right pattern.
- **`src/app/robots.js`** — explicit AI-crawler allowlist (GPTBot, OAI-SearchBot, ClaudeBot,
  PerplexityBot, Google-Extended, Applebot-Extended, CCBot and others).
- **`CLAIMS.md`** — the evidence discipline and the asymmetric-source rule.
- **`fleet-details.md`** — 495 lines of aircraft specifications, correctly disclaimed.
- **`India_Airports_List.md`** — 216 Indian airports with IATA/ICAO, type, operational status and
  operator, sourced to Wikipedia. The basis of the destinations and airports architecture.
- **Real, owner-known facts**: phone +91 93556 11996, WhatsApp, the Dwarka office address, and the
  published price set in `PRICING`.

---

## 4. Risks

| # | Risk | Severity |
|---|---|---|
| R1 | Domain `bookmycharter.in` resolves to 103.235.104.55 — Apache 2.2.3/CentOS serving a registrar parking page dated 2016. **No HTTPS: TLS connections are reset.** Nothing is deployed. DNS must move to the host before any launch. | Blocker |
| R2 | Both domains are to stay live with full charter content. Same phone, same office, same services. They will compete for identical queries and split authority. Mitigation is genuinely distinct copy and a distinct entity per domain — not reworded twins. | High |
| R3 | The 11 blocked claims in `CLAIMS.md` remain unevidenced. Restoring any of them without a dated document repeats the original error on a new domain. | High |
| R4 | No licensed aircraft photography exists. Every current aircraft image is AI-generated; two carry invented liveries and fabricated Indian registrations. | High |
| R5 | `xlsx` parsing attacker-reachable input at runtime. | Medium |
| R6 | 106 MB `public/` tracked in git; every clone and every deploy carries it. | Medium |
| R7 | The site is not in Search Console for this domain, so slug changes are free **now** and expensive later. | Timing |
