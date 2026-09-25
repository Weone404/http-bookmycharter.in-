# SEO Implementation

Metadata, canonicals, breadcrumbs and structured data are part of every template rather than added
to pages afterwards. A page cannot ship without them: `metadataForRoute()` throws if the route is
not in the registry, and `scripts/verify-build.mjs` fails the build on a missing canonical, a
duplicate `<h1>`, invalid JSON-LD or a broken internal link.

## Metadata

`src/lib/metadata.ts` builds every page's metadata from the route registry, so a page's title,
description and indexability cannot drift from what the sitemap publishes.

`pageMetadata()` restates `openGraph.images` on every page. Next.js **replaces** a parent
`openGraph` object rather than merging it, so a page that sets its own `openGraph` silently drops
`og:image` unless the helper puts it back. Every page builds metadata through this helper for that
reason.

Titles follow `Primary Topic | Book My Charter`, front-loaded. `/request-a-charter` is
`noindex, follow` — a form has no search value and should not compete with the pages that do.

## Canonicals

Absolute, on `https://bookmycharter.in`, self-referencing, no trailing slash
(`trailingSlash: false`). Verified on every built page.

## Structured data

One `<script type="application/ld+json">` per page carrying a single `@graph`.

| Node | Where | Notes |
|---|---|---|
| `Organization` + `LocalBusiness` | Root layout | One real office. No branches implied |
| `WebSite` | Root layout | |
| `WebPage` | Every page | |
| `BreadcrumbList` | Every nested page | Built from the same registry as the visible breadcrumb |
| `Service` | Service pages | **No `offers` node** — an Offer without a verified price is an invented price |
| `FAQPage` | Pages with visible FAQs | Schema answer is the first sentence only; elaboration stays on the page |
| `Article` | Insight pages | **No `author`** — no author profile is verified yet, and a placeholder byline fabricates a person |

Not emitted, deliberately: `Review`, `AggregateRating`, `Offer`, awards, credentials, certifications.
None is verified, and structured data that does not correspond to visible verified content is the
fastest route to a manual action.

`sameAs` is omitted while `SOCIAL` is empty. The sister property is **not** listed in `sameAs`
until A1 confirms the two sites belong to the same legal entity — asserting a relationship that may
not exist is the same error as denying one that does.

## Robots and sitemap

`app/robots.ts` allows all crawlers, disallows `/api/`, and names retrieval crawlers explicitly
(GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended and others) so
a future blanket disallow cannot silently lock out AI retrieval. The static `public/robots.txt` and
`public/sitemap.xml` that were shadowing these were deleted.

`app/sitemap.ts` emits only live, indexable routes plus the dynamically generated aircraft and
insight pages, each with a real `lastModified`. Planned routes are excluded, so a URL is never
advertised before its page exists. Currently 43 URLs.

## Answer-first content (AEO/GEO)

Every page's first sentence under the `<h1>` answers that page's question completely enough to be
quoted alone. `PageIntro` takes it as a required `summary` prop, so the pattern is enforced by the
component rather than by discipline.

Example, `/pricing`: *"The cost of a private jet or helicopter charter in India depends primarily
on aircraft category, total block hours, positioning of the aircraft to your departure point,
landing and parking charges, ground handling, crew duty requirements, waiting time, taxes, and any
international permits the route requires."*

The strategy is retrievability, not manipulation. No fabricated third-party references, no invented
citations, no consensus manipulation. Pages are made easy to extract because they are true.

## Internal linking

`RelatedLinks` appears on every page, and the registry drives navigation and footer. Mandatory
edges: services link to aircraft categories and `/pricing`; aircraft link to their category hub and
`/request-a-charter`; every insight links to the commercial page it supports; destinations link to
routes and aircraft. No page is a dead end — `verify-build.mjs` fails on any internal link with no
built page.

## Redirects

30 legacy paths, all single-hop, verified free of chains. The twelve duplicate programmatic pages
collapse to five destinations.

## Copy rules (2026-09 rewrite)

Plain words first, the technical term second and explained on first use ("block time (engine start
to engine stop)"). One primary phrase per page, used in the title, the h1 or summary, one FAQ and a
section heading — never stuffed. Titles stay within 60 characters including ` | Book My Charter`;
descriptions 120–158 characters. Service pages build their h2s from `Service.keyword`
("How private jet charter works"), and `Service.headline` sets the h1.

`/llms.txt` is generated from the route registry, insights, aircraft and home FAQs, so AI answer
engines get a plain-text map that cannot say anything the pages do not.
