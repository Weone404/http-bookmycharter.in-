# JetSetGo vs Book My Charter: traffic audit and growth plan

Data: Semrush India organic exports for jetsetgo.in dated 27 Sep 2026 (top 100 keyword rows, 69 unique keywords; 36 ranking pages), plus live checks of jetsetgo.in and bookmycharter.in on 28 Sep 2026. Semrush traffic and volume figures are estimates, not analytics.

## 1. How JetSetGo actually gets its traffic

About 47,300 estimated organic visits a month. Three URLs bring 92% of it:

| URL | Share | What ranks it |
|---|---|---|
| Home page | 59% | Brand ("jet set go", 18.1k) and head terms: "private jet" (27.1k, #1), "charter flight" (9.9k), "charter plane" (8.1k), "private jet booking" (5.4k) |
| /blog/private-jet-price-in-india | 22% | Price questions: "private jet price in india" (18.1k), "charter plane price", "charter flight cost", "private jet cost" |
| /search/1074552 (an empty search form) | 10.5% | Also price terms, plus "aeroplane price in india" and "learjet 45 price in india" |
| /about-us | 6% | The founder's name (14.8k) |
| Everything else (fleet, services, helicopters, Char Dham, empty legs, weddings, 30+ pages) | under 2% | — |

What that means:

1. **Their traffic comes from domain authority, not content depth.** An empty search page (/search/1074552, no prices, almost no text) ranks #1–2 for price terms. It ranks because the domain is trusted: operating since 2014, press, awards, backlinks and brand searches. A new domain cannot copy this. It has to win on the best answer instead.
2. **Price intent is the biggest non-brand prize, and it is easy.** The price cluster is 31 keywords with about 57,000 searches a month at an average keyword difficulty (KD) of **26**. JetSetGo wins all of it with **one** article that states four hourly price bands:
   - King Air 200: ₹2.0–3.25 lakh
   - Citation CJ2: ₹3.25–4.0 lakh
   - Hawker 800/900: ₹5.0–6.75 lakh
   - Legacy 600: ₹7.0–8.0 lakh

   The article also has 10 FAQs. It is cited in **105 AI prompts** (Gemini, Google AI, ChatGPT search). AI engines quote numbers.
3. **Everything beyond jets and brand is weak for them.** These all get about zero traffic:
   - HeliSetGo (helicopters)
   - JetSetYatra (Char Dham)
   - JetSteals (empty legs)
   - JetSetWed (weddings)
   - fleet detail pages
   - service pages

   Nobody at JetSetGo has built helicopter, city, route or aircraft-model content. That is the opening.
4. **The search results pages (SERPs) they rank in have the same extra features.** Across their top keywords:
   - People Also Ask appears on 97%, video on 97%, review stars on 94% and an AI Overview on 80%.
   - A local pack appears on 10%.

   Winning needs:
   - FAQ answers that can be quoted on their own (we have these);
   - YouTube videos (we have none);
   - real Google reviews (we have none);
   - numbers that AI engines can cite (we have none).

## 2. Where Book My Charter stands today (live checks, 28 Sep)

| Area | Status |
|---|---|
| Lighthouse desktop (home, pricing, private jets, helicopter charter) | 100 / 100 / 100 / 100 |
| Lighthouse mobile | Accessibility, Best Practices and SEO are 100. Performance scores 85–93: the LCP (main image load) takes 3.1–3.9 s on a simulated slow 4G connection |
| Mobile performance causes | The home hero image has no `fetchpriority="high"`; one render-blocking CSS file (12 KB); 12 KB of legacy polyfills |
| Structured data | Organization, LocalBusiness, WebSite, WebPage, BreadcrumbList and FAQPage are present. No Product, Offer or Review markup (correct, because none is verified) |
| Crawl | 84 URLs in the sitemap; robots.txt and llms.txt are open to AI crawlers |
| **Bug: live location blocked** | `vercel.json` sends `Permissions-Policy: geolocation=()`, which blocks the new "Use my current location" button for helicopters. Fixed in this commit (`geolocation=(self)`) |
| **Bug: duplicate host** | `www.bookmycharter.in` returns 200 instead of redirecting to the apex domain, so two copies of the site are indexable |
| Price content | None. /pricing explains how prices are built but gives no figures, so we cannot compete for the 57k price cluster at all |
| Authority | New domain: no Google Business Profile reviews, no press or backlinks, no named people, no videos. Search Console and Bing are not verified yet |

## 3. Brainstorm: what can beat an authority site

- **The most complete price answer**, not a copy of theirs. Show hourly bands for every class (turboprop, light, midsize, super-midsize, large, helicopter), a worked example trip, what is and is not included, taxes, positioning and a simple estimator. They show 4 aircraft and no worked trip.
- **Helicopters**, which they barely touch: helicopter charter price, helicopter ride and booking by city, wedding helicopter, Kedarnath, flower dropping (a page we already have).
- **City and route pages** with facts nobody else publishes:
  - real great-circle distance between two airports;
  - which aircraft classes can fly the route nonstop (computed from type range);
  - runway length at each end.
- **52 aircraft pages** answering "`<model>` price in India" and "`<model>` charter" with the class hourly band. Their fleet pages get almost no traffic, and "learjet 45 price in india" alone is 1.3k searches.
- **E-E-A-T (trust signals)**: a named founder or team, real Google reviews, and the operator's permit details once they are provided.
- **Video**: 3–5 short YouTube explainers, starting with "Private jet price in India, explained". Video appears in 97% of these results.

## 4. The workflow, and what was wrong with the first draft of it

The first draft was "publish a price page, then 50 route pages, then 52 model pages". Checking it against our rules and against Google's policies found these failures.

| # | Failure in the draft | Fix built into the final workflow |
|---|---|---|
| F1 | A price page without real figures cannot rank. Figures we make up break the no-fabrication rule and would be a false claim | **Owner rate card**: indicative hourly bands per class, the date they apply from, and what is included, supplied by you. Each figure carries its date on the page. A build check refuses a figure without a source date. Without the rate card, Phase 1 does not ship |
| F2 | 50 templated route pages are doorway pages under Google's spam policy | Publish only city pairs with real demand, about 15–20. Each must carry unique computed facts (distance, feasible classes, runway notes) and stay noindex until checked |
| F3 | Routes need airport coordinates and runway lengths, which our airport list does not have | Import coordinates and runway lengths from OurAirports, which is public domain, with the source named on the page |
| F4 | Our 41 aircraft pages without a written narrative share template text, which risks being judged "thin" | Enrich each one with computed, type-specific facts (nonstop reach from Delhi and Mumbai, class hourly band, runway need) before promoting them. Noindex any page that stays thin |
| F5 | Keyword cannibalisation: /pricing, the pricing guide article and the private jet charter page would all chase "price" | Give each page one job. /pricing targets "private jet price in India". The guide targets "charter plane price per hour" and links to /pricing. Service pages target booking terms |
| F6 | "Private jet" (KD 61) and "charter plane" (KD 65) will not move for a new domain in months | Go after KD ≤ 30 first: the price cluster, "private jet booking price" and "private jet rent price" (most around KD 14–29). Revisit head terms once authority grows |
| F7 | Nothing can be measured: no Search Console, Bing or analytics | Phase 0 comes before any content: verify Search Console and Bing, submit the sitemap, install GA4 and Clarity, set up the Google Business Profile |
| F8 | Char Dham terms compete with the sister site | Keep this site's Char Dham pages about private helicopter charter only; pilgrimage and package terms stay on bookmychardham.in |
| F9 | "100/100" in a lab test is not the same as real users | Aim for Lighthouse 100 on desktop and ≥ 95 on mobile, plus "Good" Core Web Vitals from real users in Search Console. A performance budget check stops regressions |
| F10 | Semrush gave only the top 100 of 459 ranking keywords, and no helicopter data | Before Phase 5, export Semrush keyword gap data for helicopter, city and route terms |

### Final workflow

**Phase 0: foundations (this week)**
1. Fix the geolocation header (done in this commit).
2. Redirect www to the apex domain with a 308, in Vercel Domains.
3. Verify Search Console and Bing, then submit the sitemap and llms.txt.
4. Install GA4 and Clarity, and track the quote form events that are already wired.
5. Create the Google Business Profile at the Dwarka office and start collecting genuine reviews.

**Phase 1: the price hub** (needs your rate card)
- Rebuild /pricing as "Private Jet Price in India: Per-Hour Rates by Aircraft".
- Include:
  - a dated rate table for 6 classes;
  - a worked example trip;
  - what is included and excluded;
  - GST;
  - positioning;
  - an estimator (hours × band + positioning);
  - 12–15 FAQs covering every price long-tail in the data ("per hour", "ticket price", "cheapest", "rent", "Delhi").
- Add Offer markup only for figures that you supply.

**Phase 2: tuning the money pages**
- Titles and H1s on the home, private jet charter and aircraft charter pages to cover "private jet booking", "charter flight", "private plane charter" and "private jet rental".
- Internal links from every price mention to /pricing.

**Phase 3: cities and routes**
- 8–10 city pages: Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, Goa, Jaipur and Dehradun.
- 15–20 route pages, built with fixes F2 and F3.

**Phase 4: aircraft pages**
- Enrich all 52 as in fix F4.
- Add "`<model>` price in India / charter cost per hour", using the class band from Phase 1.

**Phase 5: the helicopter cluster** (their weak spot)
- Helicopter charter price.
- Helicopter booking in Delhi, Mumbai and Bengaluru.
- Wedding helicopter (a planned page).
- Kedarnath private charter.
- Built after the keyword export in fix F10.

**Phase 6: authority**
- Google Business Profile reviews.
- 3–5 YouTube explainers, embedded on the matching pages.
- A founder or team page, if you provide it.
- Genuine citations: sister site, aviation directories, a PR note on the launch.

**Phase 7: mobile 95–100**
- Add `fetchpriority="high"` to the home hero image.
- Make the mobile hero images smaller (AVIF).
- Inline the critical CSS.
- Drop the legacy polyfills.
- Add a Lighthouse CI budget.

## 5. Inputs needed from you

1. **Rate card**: indicative per-hour bands in ₹ for each class you arrange, with a date and what is included. This unlocks Phases 1 and 4.
2. The founder or team names and photos you are willing to publish.
3. Google Business Profile access, and Search Console access for bookmycharter.in.
4. A Semrush keyword gap export for helicopter and city terms, before Phase 5.
