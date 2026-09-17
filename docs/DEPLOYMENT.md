# Deployment

## Current state

`bookmycharter.in` resolves to **103.235.104.55**, an Apache 2.2.3 / CentOS host serving a
registrar parking page dated 2016. **HTTPS is not available** — TLS connections are reset. Nothing
is deployed, and nothing is indexed on this domain.

This is a deployment blocker, not a development blocker. The application is built and verified
against a production build; only DNS stands between it and launch.

**No DNS, registrar or nameserver change has been made.** That is an external irreversible action
and requires explicit authorisation.

## What has to happen, in order

1. **Confirm who controls the domain** — registrar account and DNS host (BUSINESS-DATA I1).
2. **Create the Vercel project** from `github.com/Weone404/http-bookmycharter.in-`, branch
   `rebuild/book-my-charter`. Framework preset: Next.js. Build command and output are the defaults;
   `npm run build` already runs the two data generators first.
3. **Choose the canonical host.** `src/lib/site.ts` currently declares the **apex**,
   `https://bookmycharter.in`, and `next.config.mjs` sets `trailingSlash: false`. If the canonical
   host changes to `www`, change `SITE.url` — every canonical, OG tag, JSON-LD `@id` and sitemap
   entry derives from it.
4. **Point DNS at Vercel** and let it issue the certificate. HTTPS must work before anything is
   submitted to a search engine.
5. **Redirect the non-canonical host** to the canonical one at the platform level.
6. **Set environment variables** once the values exist (I4–I6): `NEXT_PUBLIC_GA_ID`,
   `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_BING_VERIFICATION`.
   Each is optional and no-ops when unset.
7. **Verify the 30 redirects** return 301 to their final target with no chain.
8. **Submit the sitemap** to Search Console and Bing Webmaster Tools.

## Security headers

`vercel.json` sets HSTS with `preload`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN` and a
`Permissions-Policy` denying camera, microphone and geolocation.

**HSTS `preload` is a one-way commitment** and must not be served until HTTPS is confirmed working
on the final host, including any subdomain that will ever be used.

No Content-Security-Policy is set yet. It should be added once the analytics and form endpoints are
known, so it can be written tightly rather than permissively.

## Before the first deploy

- The charter request form does not submit anywhere. Where requests should be delivered is
  unanswered (I7). The form validates and states plainly that online submission is not live,
  offering phone and WhatsApp instead. **This must be wired before launch** — a form that silently
  discards a charter enquiry is worse than no form.
- `/og/default.png` is referenced by every page's social card and does not exist yet.
- `public/icons/fleet/` and `public/fleets/` still hold inherited aircraft images of unconfirmed
  provenance. Nothing renders them, but `public/` serves every file in it whether or not a page
  links it — "off display" is not "off the site". Resolve provenance (G2) or remove them.
- `logo.png` / `logo.webp` read "CHARTER BOOKING" rather than a brand name and are unused; the
  wordmark is drawn in code. Remove them or replace with a real mark.
