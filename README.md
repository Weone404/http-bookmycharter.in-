# Book My Charter

Private aviation and charter access platform — [bookmycharter.in](https://bookmycharter.in)

Next.js 15 App Router · TypeScript (strict) · Tailwind CSS v4 · Three.js / React Three Fiber · GSAP

## Run

```bash
npm install
npm run dev        # http://localhost:3001
```

## Verify

```bash
npm run verify     # typecheck -> lint -> route registry -> build -> built-HTML check
```

Individually: `npm run typecheck` · `npm run lint` · `npm run build` ·
`node scripts/verify-routes.mjs` · `node scripts/verify-build.mjs`

`npm run build` regenerates the two sourced datasets first (`airports`, `aircraft`).

## Where things are

| Path | What |
|---|---|
| `src/lib/routes.ts` | **The route registry.** One declaration per URL; drives nav, footer, breadcrumbs, sitemap, robots and metadata |
| `src/lib/site.ts` | Brand identity, NAP, palette. Single source of truth |
| `src/lib/business-model.ts` | Neutral voice while B1 is unresolved |
| `src/lib/metadata.ts`, `src/lib/schema.ts` | Metadata and JSON-LD builders |
| `src/types/` | Domain models, including `VerifiedFact<T>` |
| `src/data/` | All content. Nothing hardcoded in components |
| `scripts/` | Data generators and the two verification gates |
| `docs/` | Audit, IA, architecture, design system, SEO, content, 3D, QA, deployment |
| `CLAIMS.md` | The claims register. Nothing checkable ships without a dated source |

## Rules this repo enforces

- **React is pinned to `~19.2.0`.** React Three Fiber 9 requires `>=19 <19.3`. See
  `docs/3D-ARCHITECTURE.md` before changing it.
- **No fabricated facts.** No aircraft, price, certification, availability, testimonial or person
  goes on a page without a dated source. Unknown values render as absent, never as a default.
- **A route marked `live` must have a page**, and a page must be in the registry. The build fails
  otherwise.
- **Nothing says "Book My CharDham"** except the one deliberate link to the sister property.

Open business questions live in `docs/BUSINESS-DATA-REQUIRED.md`. B1 — whether Book My Charter
operates aircraft or arranges them — is the highest priority.
