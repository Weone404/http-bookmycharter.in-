# Unverified media — not served

These files were inherited with the project and their provenance is not confirmed
(docs/BUSINESS-DATA-REQUIRED.md section G). They are held here, **outside `public/`**,
because `public/` serves every file in it whether or not a page links to it — "not
referenced" is not the same as "not published".

Contents:

- `icons/fleet/**` — 52 aircraft images, `_converted.webp`, source unknown
- `fleets/**` — six aircraft images matching the previous `/fleet/[slug]` pages
- `images/**` — inherited photography, some previously named `flystar_*`
- `logo.png`, `logo.webp` — the inherited logo, which reads "CHARTER BOOKING" rather than
  a brand name. The site's wordmark is drawn in code instead (`components/ui/Wordmark.tsx`)

To publish any of these, confirm the licence or authorship first, then move the specific
file into `public/` and reference it from a component. Do not move the folder wholesale.
