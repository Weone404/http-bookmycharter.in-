# Phase 2 — Information Architecture

Approved decisions this is built on:
**both domains stay live and full** · **3D geometry authored in code, no external models** ·
**full TypeScript rebuild, strict** · **spec approved before production code**.

---

## 0. Entity separation (because both sites stay live)

Two live sites sharing a phone number, an office and a service list will compete for the same
queries. They are kept apart by *what each one is about*, not by wording:

| | bookmycharter.in | bookmychardham.in |
|---|---|---|
| Entity | Book My Charter — charter access platform | Book My CharDham — Char Dham & Kedarnath yatra specialist |
| Primary intent served | "charter an aircraft / helicopter for my trip" | "book my Kedarnath / Char Dham yatra" |
| Chardham treatment | **Whole-aircraft private charter to the dhams.** Aircraft, routing, positioning, private-party pricing. | **Pilgrimage.** Seats, packages, darshan timing, temple logistics, season. |
| Pricing frame | How charter cost is built (hourly, positioning, handling) | Published per-seat and package prices |
| Area served | India-wide + international where genuinely supported | Delhi NCR, Dehradun, Haridwar, Rishikesh, Uttarakhand |

**Rule for every Chardham page on this site:** if a paragraph would sit equally well on
bookmychardham.in, it does not belong here. Rewrite it from the charter angle or drop it.
No cross-domain canonicals — that would deindex one of them.

---

## 1. Final sitemap

```
/                                       Home
/request-a-charter/                     Conversion (noindex, follow)
/how-it-works/
/pricing/

/private-charter/                       HUB
    private-jet-charter/
    aircraft-charter/
    turboprop-charter/
    group-charter/
    international-charter/

/helicopter-charter/                    HUB
    private-helicopter-charter/
    helicopter-rental/
    vvip-helicopter-charter/
    corporate-helicopter/
    wedding-helicopter/
    aerial-services/

/empty-leg-charter/                     PRODUCT

/aircraft/                              HUB — shared R3F fleet showroom
    private-jets/
    helicopters/
    turboprops/
    [slug]/                             one page per verified aircraft type

/services/
    corporate-charter/
    wedding-charter/
    medical-charter/
    aerial-photography-and-film/
    aerial-flower-dropping/
    special-events/
    luxury-travel-logistics/

/destinations/
    [city]/                             airport + helipad access hub

/routes/
    [origin]-to-[destination]/

/chardham/                              HUB = "Char Dham by private helicopter charter"
    kedarnath-helicopter/
    badrinath-helicopter/
    do-dham-helicopter/
    packages/
    travel-information/

/insights/                              HUB
    [slug]/

/about/
/contact/
/privacy/
/terms/
```

`/chardham/` is itself the Char Dham helicopter charter page — there is no
`/chardham/chardham-helicopter/`. A hub whose only job is to link to one child is a redirect
wearing a costume.

### Launch tiers — publish nothing thin

| Tier | Contents | Gate |
|---|---|---|
| **T1 — launch** | `/`, `/private-charter/` + 2 children, `/helicopter-charter/` + 2 children, `/aircraft/` + verified aircraft pages, `/pricing/`, `/how-it-works/`, `/empty-leg-charter/`, `/chardham/` + Kedarnath, `/about/`, `/contact/`, `/request-a-charter/`, `/privacy/`, `/terms/` | Every page has original, verified content |
| **T2** | Remaining service children, `/destinations/` with 4–6 cities where operations are real, `/insights/` with 5–6 articles | Airport + helipad facts verified per city |
| **T3** | `/routes/` pairs, remaining destinations, case studies | Distance and flight time verified per pair; case studies need real trips |

Destinations and routes are **not** generated across a matrix. A city page ships only when its
airport, helipad and operating facts are real; a route page ships only when its distance, typical
flight time and both airports are verified. A `[city]`/`[route]` template with swapped nouns is the
exact failure this architecture exists to prevent.

---

## 2. URL map — old to new (301, single hop, no chains)

### 2.1 The twelve duplicates collapse to five destinations

| Old | New | Why |
|---|---|---|
| `/private-jet-charter` | `/private-charter/private-jet-charter/` | Canonical target for the cluster |
| `/private-jet-charter-booking` | `/private-charter/private-jet-charter/` | Same intent |
| `/private-jet-booking-india` | `/private-charter/private-jet-charter/` | Same intent |
| `/private-jet-hire` | `/private-charter/private-jet-charter/` | Same intent |
| `/business-jet-charter` | `/private-charter/private-jet-charter/` | Same intent |
| `/corporate-jet-charter` | `/services/corporate-charter/` | Genuinely different page: recurring travel, team movement, billing |
| `/charter-flight-booking` | `/private-charter/` | Hub-level commercial intent |
| `/aircraft-charter-services-india` | `/private-charter/aircraft-charter/` | Aircraft-agnostic charter |
| `/private-jet-charter-delhi` | `/destinations/delhi/` | Location intent belongs in the geo cluster |
| `/helicopter-charter-services` | `/helicopter-charter/` | Hub |
| `/helicopter-booking` | `/helicopter-charter/` | Hub |
| `/corporate-helicopter-charter` | `/helicopter-charter/corporate-helicopter/` | Keeps its own page |

Six near-identical private-jet pages become **one** page that is six times better.

### 2.2 Everything else

| Old | New |
|---|---|
| `/private-helicopter-charter` | `/helicopter-charter/private-helicopter-charter/` |
| `/kedarnath-helicopter-yatra` | `/chardham/kedarnath-helicopter/` |
| `/char-dham-yatra-by-helicopter` | `/chardham/` |
| `/helicopter-flower-dropping` | `/services/aerial-flower-dropping/` |
| `/fleet` | `/aircraft/` |
| `/fleet/:slug` | `/aircraft/:slug` |
| `/blogs` | `/insights/` |
| `/booking` | `/request-a-charter/` |
| `/chardham`, `/char-dham`, `/chardham-yatra`, `/char-dham-yatra` | `/chardham/` |
| `/kedarnath`, `/kedarnath-helicopter` | `/chardham/kedarnath-helicopter/` |
| `/charter`, `/helicopter-charter-old` | `/helicopter-charter/` |
| `/flower-drop`, `/flower-dropping`, `/flower-dropping-kedarnath` | `/services/aerial-flower-dropping/` |

Nothing on bookmycharter.in is indexed today — the domain is parked — so these redirects exist to
protect any external link and to prevent a 404 if a path is typed, not to preserve rankings. They
cost nothing now and cannot be added cheaply later.

`/`, `/about` and `/contact` keep their current paths and need no redirect.

**Trailing slashes.** Paths are written with a trailing slash in this document as structural
notation only. The canonical form on the site is **without** a trailing slash — Next.js
`trailingSlash: false`, its default. Canonicals, sitemap entries, internal `href`s and redirect
targets all use the slashless form, so `/pricing` is canonical and `/pricing/` 308s to it.

**Constraints:** no redirect chains (every old path points at its final destination, never at
another redirect); no mass-redirect to `/`; trailing-slash behaviour set once in `next.config.mjs`
and every canonical, sitemap entry and internal link written to match it.

---

## 3. Internal-link graph

Every page carries breadcrumbs, a related-links block, and exactly one primary CTA
(**Request a Charter**). The graph:

```
                                   /
                                   │
      ┌──────────┬─────────────────┼────────────────┬──────────────┐
      │          │                 │                │              │
/private-charter  /helicopter-charter  /aircraft  /pricing   /how-it-works
      │                   │               │           │              │
      ├─ private-jet ─────┼─ private-heli ┤           │              │
      ├─ aircraft-charter ├─ rental       ├ private-jets            │
      ├─ turboprop        ├─ vvip         ├ helicopters             │
      ├─ group            ├─ corporate    ├ turboprops              │
      └─ international    ├─ wedding      └ [aircraft]              │
                          └─ aerial-services       │                │
                                   │               │                │
      ┌────────────────────────────┴───────┬───────┴────────────────┘
      │                                    │
/destinations/[city]  ←──────────────→  /routes/[pair]
      │                                    │
      └──────────────┬─────────────────────┘
                     │
              /empty-leg-charter ──→ /pricing
                     │
              /services/[x] ──→ relevant aircraft + relevant destination
                     │
                 /chardham ──→ kedarnath / badrinath / do-dham / packages
                     │
                 /insights/[article] ──→ the commercial page it explains
                     │
              /request-a-charter  (every page, one CTA)
```

Mandatory edges:
- Every **service** page links to ≥2 suitable aircraft, ≥1 destination or route, and `/pricing/`.
- Every **aircraft** page links to its category hub, ≥2 services it suits, and `/request-a-charter/`.
- Every **route** page links to both destination pages, the suitable aircraft, and `/pricing/`.
- Every **destination** page links to its routes, its airports/helipads, and relevant services.
- Every **insight** links to the commercial page it supports. No insight is a dead end.
- `/pricing/` links out to every cluster hub — it is the trust page the others lean on.
- **No orphans.** A page reachable only from the sitemap does not ship.

---

## 4. Content hierarchy per template

Every indexable page: one `<h1>`, logical `h2`/`h3`, unique title and description, self-canonical,
breadcrumbs (visible + `BreadcrumbList`), OpenGraph, and an answer-first opening paragraph.

**Answer-first rule (AEO/GEO):** the first sentence under the `<h1>` answers the page's question
directly and completely enough to be quoted on its own. Elaboration follows. Example for
`/pricing/`: *"The cost of a private helicopter charter in India depends primarily on aircraft type,
flight hours, positioning, landing and handling charges, crew requirements, taxes and additional
services."*

| Template | Sections | Schema |
|---|---|---|
| Home | Hero (3D) → what we charter → how it works → fleet showroom → pricing explainer → destinations → Chardham → insights → request | `Organization`, `WebSite` |
| Service hub | Definition → who it is for → categories → process → pricing factors → aircraft → FAQ → CTA | `Service`, `BreadcrumbList`, `FAQPage` |
| Service page | Definition → who → when → how it works → suitable aircraft → considerations → pricing method → process → FAQ → related → CTA | `Service`, `BreadcrumbList`, `FAQPage` |
| Aircraft | Answer-first intro → specs table → ideal for → categories of mission → related aircraft → CTA | `Product`-free; `WebPage` + `BreadcrumbList` only, until real availability data exists |
| Destination | Airports → helipads → common missions → aircraft → routes → ground transfer → FAQ | `WebPage`, `BreadcrumbList`, `FAQPage`, `Place` refs |
| Route | Route → distance → flight time → airports → aircraft → considerations → one-way vs return → FAQ | `WebPage`, `BreadcrumbList`, `FAQPage` |
| Pricing | Answer-first → cost components → worked method → what moves the number → FAQ | `WebPage`, `FAQPage` |
| Empty leg | What it is → why they exist → how availability works → pricing → when to consider → request | `WebPage`, `FAQPage` |
| Insight | Article, dated, authored, links to its commercial page | `Article`, `BreadcrumbList` |

**Schema constraints:** no `Offer` without a real price, no `AggregateRating` or `Review` until
reviews are verified and mirrored on a third-party profile, no `LocalBusiness` claim beyond the one
real Dwarka office, and every JSON-LD node must correspond to something visible on the page.

### Title pattern
`Primary Topic | Book My Charter` — front-loaded, not forced where a better natural title exists.
No page title may contain "CharDham" unless the page is genuinely about Char Dham.

---

## 5. Data model

Content lives in `src/data/*`, typed by `src/types/*`, consumed by UI. No copy hardcoded in
components. The types are written as part of this phase — see `src/types/`.

```
src/types/          aircraft.ts destination.ts route.ts service.ts insight.ts
                    faq.ts charter-request.ts site.ts index.ts
src/data/           aircraft.ts destinations.ts routes.ts services.ts
                    insights.ts faqs.ts airports.ts
src/lib/            site.ts schema.ts metadata.ts track.ts
src/components/     navigation/ hero/ booking/ aircraft/ fleet/ destinations/
                    routes/ services/ pricing/ content/ faq/ footer/ ui/ seo/ 3d/
```

Every optional field on a model exists because the fact may be unknown. **An unknown field renders
as absent, never as a plausible-looking default.** That rule is what keeps the no-fabrication
constraint enforceable in code rather than in discipline.

---

## 6. Technical decisions fixed by this phase

1. **TypeScript strict.** `strict: true`, `noUncheckedIndexedAccess: true`, `include` widened to
   `src/**/*`. Legacy `.jsx` is deleted as each area is rebuilt, not converted in place.
2. **RSC by default.** `'use client'` only for the 3D canvas, the request form, the navigation
   drawer and the fleet slider. Today 38 of ~60 components are client components; the target is
   under 10.
3. **One R3F canvas** for the fleet showroom, dynamically imported with `ssr: false`, behind a
   `SceneLoader`. Aircraft geometry is authored in code (no GLB downloads), so there is no model
   payload at all — the 1.5 MB-per-model budget becomes a non-issue and licensing risk is zero.
   The scene module stays swappable for real GLBs later behind the same interface.
4. **GSAP** for camera rig, scroll sequences and timeline orchestration. **Framer Motion** for UI
   micro-interactions only. No third animation library.
5. **Videos deleted from `public/`.** 94 MB of MP4 goes; the hero is 3D plus optimised stills.
6. **`xlsx` removed.** `India_Airports_List` is transformed to typed JSON at build time by a script
   in `scripts/`; `/api/airports` either serves the static JSON or disappears in favour of a static
   import.
7. **`@google/genai` removed.** AI Studio scaffolding (`index.html`, `metadata.json`, `.env.example`
   Gemini block, `README.md`) replaced. `.cv-baseline-*.json`, `_quarantine/` and one of the two
   lockfiles removed.
8. **`CLAIMS.md` carried forward**, re-swept against the *built* HTML of the new site before launch,
   with the sweep patterns widened for the new claim types this site introduces (route distances,
   flight times, airport facts, empty-leg availability).

---

## 7. Verification record

Checked against the repository on 2026-09-17, not asserted from memory:

- **Redirect coverage.** All 23 existing `page.jsx` routes were enumerated from the filesystem and
  diffed against the old-path column of the tables above. Every route is covered except `/`,
  `/about` and `/contact`, which keep their paths by design. No route is left to 404.
- **No duplicate destinations.** The final sitemap contains no repeated path.
- **No dangling targets.** Every path used as a redirect destination exists in the final sitemap.
- **Data models compile.** `src/types/*.ts` typechecks clean under `strict: true`,
  `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noUnusedLocals`, `noUnusedParameters`
  and `verbatimModuleSyntax` — stricter than the settings the rebuild will run under.
