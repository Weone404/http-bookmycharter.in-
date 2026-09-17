# Business Data Required

Facts the new site needs that cannot be written, inferred or estimated. Each item below either
gets a real answer or the corresponding section does not ship. Answer inline in this file.

The evidence rule from `CLAIMS.md` applies: things you uniquely know (prices, address, what the
business does) are sourced by your word. Things a reader could check (certifications, counts,
distances, flight times, named people's service records) need a dated document.

---

## A. Identity — blocks every page

| # | Question | Answer |
|---|---|---|
| A1 | Registered legal name of the entity trading as Book My Charter. Same company as Book My CharDham, or separate? | |
| A2 | Is the office the same — C-705, Sector 7, Palam Extension, Dwarka, New Delhi 110077? | |
| A3 | Phone for this brand. **Strongly recommend a different number from +91 93556 11996** — two sites, one number, is how search engines conclude they are one entity. | |
| A4 | Email on this domain (e.g. info@bookmycharter.in) — does the mailbox exist? | |
| A5 | GST / CIN, if you want it in the footer | |
| A6 | Social profiles for this brand, for `sameAs` | |

## B. What the business actually is — blocks all copy

| # | Question | Answer |
|---|---|---|
| B1 | Does Book My Charter **operate** aircraft, or **arrange** charter with DGCA NSOP-certified operators? The whole site's voice depends on this. | |
| B2 | If arranging: may operators be named, or is the relationship confidential? | |
| B3 | Which of the eight pillars are genuinely live today vs aspirational? (private charter · empty legs · helicopter · VVIP · luxury logistics · fleet showroom · pricing transparency · airport hubs) | |
| B4 | International charter — genuinely supported, and to where? | |

## C. Aircraft — blocks `/aircraft/` and the 3D showroom

`fleet.js` lists 12 types: Avanti 180, Cessna Citation CJ3, Learjet 60, Challenger 300,
Challenger 604, Challenger 605, Citation 525-A, Cessna Citation Mustang, Cessna Caravan 208B,
Falcon 50, Gulfstream G650, and helicopters in `fleet-details.md` (Agusta 109 Grand and others).

| # | Question | Answer |
|---|---|---|
| C1 | Which of these are genuinely available to charter through you today? | |
| C2 | Is there an operator document or agreement naming them and dated? | |
| C3 | Helicopter types actually available (the fleet data is jet-heavy) | |
| C4 | May aircraft pages say specs are "typical for the type" rather than tail-specific? (Recommended — it is accurate and removes the need for per-airframe documents) | |

## D. Geography — blocks `/destinations/` and `/routes/`

| # | Question | Answer |
|---|---|---|
| D1 | Cities you genuinely operate from and to, in priority order | |
| D2 | For each: the airport(s) and helipad(s) you actually use | |
| D3 | The 6–10 route pairs that matter commercially | |
| D4 | Any helipad with confirmed reporting times, restrictions or night-ops limits | |

## E. Pricing — blocks `/pricing/`

| # | Question | Answer |
|---|---|---|
| E1 | The existing price set (Kedarnath ₹95,000/seat, Char Dham ₹2,10,000, Do Dham ₹1,35,000, Badrinath ₹85,000, flower dropping from ₹2,75,000) — does it belong on this domain too, or only on bookmychardham.in? | |
| E2 | Is there an hourly or per-category charter rate you are willing to publish as indicative? | |
| E3 | If not — confirm `/pricing/` ships as a cost-methodology page with no figures. That page can rank without a single number. | |

## F. Empty legs — blocks `/empty-leg-charter/` inventory

| # | Question | Answer |
|---|---|---|
| F1 | Do you receive real empty-leg availability from operators? How — email, portal, WhatsApp? | |
| F2 | If yes, may it be published, and how often does it change? | |
| F3 | If no — confirm the page ships as an explainer plus a request form, with no inventory table. | |

## G. Media rights — blocks every image

Every aircraft image currently in the repo is AI-generated; two carry invented liveries and
fabricated Indian registrations (VT-HEL, VT-HSX), and the files are named `flystar_*`. None of it
can ship. 3D aircraft are authored in code, so the showroom is covered — photography is not.

| # | Question | Answer |
|---|---|---|
| G1 | Any photographs you own — your own trips, your own aircraft, your own team? | |
| G2 | Any operator-supplied images you have written permission to use? | |
| G3 | Budget for licensed aviation stock? | |
| G4 | Logo: the current `logo.webp` reads "CHARTER BOOKING", not a brand name. Is there a real Book My Charter wordmark? | |

## H. People and proof — blocks `/about/` and article bylines

| # | Question | Answer |
|---|---|---|
| H1 | Real team members, with roles, who may be named | |
| H2 | Any of them with verifiable aviation credentials, and the document | |
| H3 | Real completed trips that could become case studies, with client permission | |
| H4 | Testimonials that are real and attributable (no review schema until they are mirrored on a third-party profile) | |
| H5 | Dated documents for any of the `CLAIMS.md` blockers — UCADA empanelment, ISO 9001:2015, fleet counts, safety record, years in operation, passenger counts | |

## I. Deployment and measurement — blocks launch

| # | Question | Answer |
|---|---|---|
| I1 | bookmycharter.in is parked at 103.235.104.55 (Apache 2.2.3, 2016) with **no HTTPS**. Who controls the DNS? | |
| I2 | Is there a Vercel project for this repo, or should one be created? | |
| I3 | www or apex as the canonical host? | |
| I4 | GA4 measurement ID for this property | |
| I5 | Microsoft Clarity project ID | |
| I6 | Search Console and Bing verification tokens for this domain | |
| I7 | Where should charter requests be delivered — email, WhatsApp, CRM? You have a CRM already; should it receive them? | |
