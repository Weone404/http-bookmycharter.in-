# Business Data Required

Facts the site needs that cannot be written, inferred or estimated. Each item either gets a real
answer or the corresponding section does not ship. Answer inline in this file.

The evidence rule from `CLAIMS.md` applies: things you uniquely know (prices, address, what the
business does) are sourced by your word. Things a reader could check (certifications, counts,
distances, flight times, named people's service records) need a dated document.

---

## Blocking launch

These stop the site going live, or make it dishonest if it does.

| # | Question | Why it blocks | Answer |
|---|---|---|---|
| **B1** | Does Book My Charter **operate** aircraft, or **arrange** charter with DGCA NSOP-certified operators, or both? | Every possessive phrase on the site depends on it. Currently `BUSINESS_MODEL = 'unconfirmed'` and all copy resolves through `voice()`, which is true under all three. One line changes it. | |
| **I7** | Where should a charter request be delivered — an email address, a WhatsApp number, or the existing CRM? | The form posts to `/api/charter-request`, which validates and then refuses with 503 because no adapter is configured. It will not accept an enquiry nobody will see. **A live site with an unconnected form loses every request.** | |
| **I1** | Who controls DNS for bookmycharter.in? | It resolves to a 2016 registrar parking page with **no HTTPS**. Nothing can launch until DNS moves and a certificate is issued. | |
| **I3** | Canonical host — apex or `www`? | `SITE.url` is the apex today. Every canonical, OG tag, JSON-LD `@id` and sitemap entry derives from it, so changing it after indexing is expensive. | |
| **A1** | Registered legal name of the entity trading as Book My Charter. Same company as Book My CharDham, or separate? | The footer names a legal entity, and `sameAs` on the Organization schema is withheld until this is known. Asserting a relationship that may not exist is the same error as denying one that does. | |
| **A4** | Does `info@bookmycharter.in` exist? | It is published on `/contact`, in the footer and in the Organization schema. A published address that bounces is worse than none. | |
| **G4** | Is there a real Book My Charter wordmark? | The inherited `logo.webp` reads "CHARTER BOOKING" and has been moved out of `public/`. The site currently draws its wordmark in code, which works, but a real mark should replace it if one exists. | |

## Needed soon after launch

The site is honest without these; it is thinner than it should be.

| # | Question | What it unlocks | Answer |
|---|---|---|---|
| A3 | A phone number for this brand | Currently shared with the sister site. Two live domains with identical NAP is how search engines conclude they are one entity and pick a winner themselves. | |
| B3 | Which of the eight pillars are genuinely live today vs aspirational? | Seven service pages are `planned` pending this. | |
| C1, C2 | Which of the 52 aircraft types are genuinely available, and is there a dated operator document naming them? | Aircraft pages say specs are typical for the type. Confirmed availability would let them say more. | |
| C3 | Helicopter types actually available | The fleet data is jet-heavy; 11 helicopters are catalogued from an inherited spec sheet. | |
| D1, D2 | Cities you genuinely operate from and to, and the airports and helipads used at each | `/destinations` publishes Delhi and Mumbai only. Others are `planned` rather than templated. | |
| D3 | The 6–10 commercially real route pairs | **No route pages exist.** A page needs a verified distance and flight time; an estimated flight time is a number people plan a day around. | |
| D4 | Any helipad with confirmed reporting times, restrictions or night-ops limits | Badrinath, Do Dham and Char Dham travel information are `planned`. | |
| E1 | Does the existing price set (Kedarnath ₹95,000/seat and the rest) belong on this domain, or only on bookmychardham.in? | `/pricing` publishes methodology and no figures. | |
| E2 | Any hourly or per-category rate you are willing to publish as indicative | Would let `/pricing` carry a real number. It ranks without one. | |
| F1, F2 | Do you receive real empty-leg availability, how, and may it be published? | `/empty-leg-charter` shows an honest empty state. The template becomes a live table with no code change. | |
| G1, G2, G3 | Owned photography, operator-supplied images with written permission, or a stock budget | **No photograph ships anywhere on the site.** 66 inherited files sit in `assets-unverified/`, outside `public/`, because `public/` serves everything in it. | |
| H1, H2 | Real team members who may be named, and any with verifiable credentials | `/about` has no team section and no badges, and says why. | |
| H3, H4 | Real completed trips for case studies, and attributable testimonials | No case studies. No review or rating schema. | |
| H5 | Dated documents for any `CLAIMS.md` blocker — UCADA, ISO 9001:2015, fleet counts, safety record, years, passenger counts | All remain stripped. | |
| I4, I5 | GA4 measurement ID, Microsoft Clarity project ID | The analytics layer is built and typed; with no ID it loads no script at all. Events are defined and dispatching. | |
| I6 | Search Console and Bing verification tokens | Needed to submit the sitemap. | |
| B4 | International charter — genuinely supported, and where? | `/private-charter/international-charter` is `planned`. | |

## What has been resolved

| Item | Resolution |
|---|---|
| Two-domain strategy | Both stay live, separated by intent rather than wording. Rule in `docs/IA.md` section 0: if a paragraph would sit equally well on the pilgrimage site, it does not belong on this one. |
| 3D asset sourcing | Geometry authored in code. No GLB, no licensing exposure, no fabricated aircraft identity. The GLB path stays data-driven for when real assets exist. |
| Social card | Generated in code at `/og/default.png`. No photograph needed. |
| Spam protection | Honeypot, server validation, payload cap, per-client rate limit and a duplicate window, all verified against a running server. No dependency added. |
