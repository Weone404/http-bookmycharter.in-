# Deployment

## Current state

`bookmycharter.in` resolves to **103.235.104.55**, an Apache 2.2.3 / CentOS host serving a
registrar parking page dated 2016. **HTTPS is not available** — TLS connections are reset. Nothing
is deployed, and nothing is indexed on this domain.

This is a deployment blocker, not a development blocker. The application is built and verified
against a production build; only DNS stands between it and launch.

**No DNS, registrar or nameserver change has been made.** That is an external irreversible action
and requires explicit authorisation.

## Exact configuration required

### 1. DNS

For the apex as canonical host (`SITE.url` is currently the apex):

| Type | Name | Value | Note |
|---|---|---|---|
| A | `@` | `76.76.21.21` | Vercel's apex address. Confirm against the value Vercel shows for this project before applying — it is the one authoritative source |
| CNAME | `www` | `cname.vercel-dns.com` | Then set `www` to redirect to the apex at the platform level |

If `www` becomes the canonical host instead, swap the two and **change `SITE.url` in
`src/lib/site.ts`** — every canonical, OG tag, JSON-LD `@id` and sitemap entry derives from it.

### 2. Vercel project

- Repository `github.com/Weone404/http-bookmycharter.in-`, branch `rebuild/book-my-charter`
- Framework preset: Next.js. Build command and output directory are the defaults; `npm run build`
  runs the two data generators first
- Node 22
- Attach both `bookmycharter.in` and `www.bookmycharter.in`, set one as primary, let the other 308

### 3. Environment variables

Server-only. **Never add a `NEXT_PUBLIC_` prefix to either of the first two** — that compiles them
into the browser bundle.

| Variable | Scope | Purpose |
|---|---|---|
| `CHARTER_SUBMISSION_PROVIDER` | server | `webhook` (only implemented value) |
| `CHARTER_WEBHOOK_URL` | server | Where a charter request is POSTed as JSON. Until set, `/api/charter-request` returns 503 and the form says submission is not connected |
| `NEXT_PUBLIC_GA_ID` | public | GA4 measurement ID. Unset: no script loads at all |
| `NEXT_PUBLIC_CLARITY_ID` | public | Microsoft Clarity project ID |
| `NEXT_PUBLIC_GSC_VERIFICATION` | public | Search Console token only |
| `NEXT_PUBLIC_BING_VERIFICATION` | public | Bing token only |

### 4. HTTPS

Vercel issues the certificate once DNS resolves. **HTTPS must work before anything is submitted to
a search engine**, and before the HSTS header below is relied upon.

### 5. Security headers

`vercel.json` sets HSTS with `preload`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN` and a
`Permissions-Policy` denying camera, microphone and geolocation.

**HSTS `preload` is a one-way commitment.** Do not serve it until HTTPS is confirmed working on the
final host and on every subdomain that will ever be used.

No Content-Security-Policy is set yet. It should be added once the analytics and submission
endpoints are fixed, so it can be written tightly rather than permissively. Note that the 3D layer
needs no external origin — no CDN, no font host, no HDR environment map — so the eventual policy
can be strict.

### 6. Rate limiting at the platform

`/api/charter-request` carries an in-process rate limiter. On a serverless platform that means
**per instance, not global**: it raises the cost of casual abuse and is honest about not being a
global control. A platform rule (Vercel WAF or equivalent) on that path is the durable answer and
should be added at launch.

### 7. Post-deploy checks

1. `curl -I https://bookmycharter.in` → 200, valid certificate
2. `curl -I https://www.bookmycharter.in` → 308 to the canonical host
3. Spot-check the 30 redirects → 301, single hop, correct target
4. `https://bookmycharter.in/sitemap.xml` → 43 URLs, canonical origin
5. `https://bookmycharter.in/robots.txt` → sitemap line present, AI crawlers named
6. `https://bookmycharter.in/og/default.png` → 200, `image/png`
7. POST a real charter request and confirm it arrives at the configured destination
8. Submit the sitemap to Search Console and Bing Webmaster Tools
9. Run Lighthouse against the deployment and record the numbers in `docs/QA.md`

## Before the first deploy

- **The charter request destination must be configured** (`docs/BUSINESS-DATA-REQUIRED.md` I7).
  Without it the API returns 503 and the form tells people to call instead. That is honest, but a
  live site with an unconnected form loses every enquiry that does not pick up the phone.
- `assets-unverified/` holds 66 inherited images whose provenance is unconfirmed. They are outside
  `public/` and are not served. Resolve provenance (G2) or delete them; do not move the folder
  into `public/` wholesale.
- Confirm `info@bookmycharter.in` exists (A4). It is published on `/contact`, in the footer and in
  the Organization schema.
