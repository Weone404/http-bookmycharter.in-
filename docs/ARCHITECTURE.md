# Architecture

What is actually built, not what is planned. Updated as each step lands.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 App Router | Server Components by default |
| Language | TypeScript, `strict` + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` + `verbatimModuleSyntax` | Domain models enforce the no-fabrication rule at compile time |
| Styling | Tailwind CSS v4, `@theme` tokens | Three brand colours, one token file |
| 3D | Three.js · React Three Fiber 9 · drei 10 | Installed; scene work is step 17 |
| Motion | GSAP (timelines, camera) · Framer Motion (UI micro-interactions only) | Two libraries with separate jobs, no third |
| Icons | lucide-react | Tree-shaken, no icon font |
| Fonts | System stack | Zero font payload, zero CLS. A licensed face can be added later without touching components — the stack is one token in `globals.css` |

**React is pinned to `~19.2.0`.** `@react-three/fiber@9` peer-requires `react >=19 <19.3`, and
`^19.1.1` floats to 19.3. Discovered by installing, not assumed. Unpinning breaks the 3D layer.

## The keystone: `src/lib/routes.ts`

One registry declares every URL with its title, description, label, parent, cluster, nav placement,
indexability, priority, change frequency and last-modified date. It is the only place a URL is
written down. Consumed by:

- `src/app/sitemap.ts` — emits live, indexable routes only
- `src/app/robots.ts` — via `SITE`
- `src/components/navigation/SiteHeader.tsx` — primary nav
- `src/components/navigation/SiteFooter.tsx` — footer columns by cluster
- `src/components/ui/Breadcrumbs.tsx` and `breadcrumbSchema()` — same trail, so the visible
  breadcrumb and the `BreadcrumbList` cannot disagree
- `src/lib/metadata.ts` — `metadataForRoute()` throws if a page has no registry entry

`status: 'planned'` excludes a route from the sitemap, robots, navigation and footer. A designed
URL is therefore never advertised before its page exists.

`scripts/verify-routes.mjs` fails the build if a `live` route has no page file, or a page exists
that the registry does not declare. That is the fix for the two defects the old site shipped with:
sitemap entries with no page, and pages nothing linked to.

## Business-model abstraction: `src/lib/business-model.ts`

B1 is unresolved — whether Book My Charter operates aircraft or arranges them. `voice()` returns
the phrasing for the configured model, and is currently `'unconfirmed'`, which yields wording true
under all three. No component hardcodes "our fleet", "our pilots" or "our certifications".
Resolving B1 is a one-line change.

## Evidence in the type system: `VerifiedFact<T>`

Externally checkable values — route distance, flight time, seat count, certification, airport
codes — are typed `VerifiedFact<T>`, which carries a `SourceRef` with a document and a date.
Filling one in by guessing requires inventing a document too. Descriptive copy stays plain strings.
Unknown facts are optional and render as absent, never as a default.

## Airport data

`scripts/build-airports.mjs` transforms `India_Airports_List.md` into
`src/data/airports.generated.ts` at build time: 216 records, 165 with an IATA code, 154 operational,
each carrying its provenance. This replaced a runtime `xlsx` parse on `/api/airports`; the `xlsx`
dependency and the API route are both gone.

## Client/server boundary

Server Components by default. The only Client Components are:

- `navigation/MobileNav.tsx` — the drawer
- `booking/QuickCharterForm.tsx` — stage-one request
- `booking/CharterRequestForm.tsx` — full request

Three, against 38 in the old codebase.

## Content layer

Two generated datasets, each carrying its provenance, with an editorial layer on top:

- `scripts/build-airports.mjs` -> `src/data/airports.generated.ts` — 216 Indian aerodromes
- `scripts/build-aircraft.mjs` -> `src/data/aircraft.generated.ts` — 52 aircraft types with
  typical figures, ranges preserved as ranges rather than collapsed to a false precision

`src/data/aircraft.ts` joins the generated specs to hand-written narrative and decides which types
earn their own URL. Eleven do; the other forty-one are rows in the comparison table on their
category page, which serves a reader choosing between them far better than forty-one templated
pages would.

Service, pricing, empty-leg, Chardham, destination and insight content each live in their own
module. No copy is hardcoded in a component.

## Build status

`npm run verify` runs typecheck, lint, route-registry check, production build and a post-build
forensic check against the built HTML. All clean: 47 pages, 43 sitemap URLs, First Load JS 103 kB
shared and 106-109 kB per page — before any 3D, which loads dynamically and must not raise this
figure for readers who never reach the fleet section.

## Open

Steps 17-25 of the development order: the 3D engine, analytics wiring, accessibility audit,
real-device performance measurement and browser QA. Fifteen routes remain `planned` pending the
business data each needs.
