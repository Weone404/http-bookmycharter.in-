import { SITE } from '../lib/site';

const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'anthropic-ai', 'Claude-Web',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended',
  'CCBot', 'Bytespider', 'Amazonbot', 'meta-externalagent',
];

const PUBLIC_ROUTES = [
  '/',
  '/kedarnath-helicopter-yatra',
  '/char-dham-yatra-by-helicopter',
  '/helicopter-flower-dropping',
  '/private-helicopter-charter',
  '/private-jet-charter',
  '/private-jet-charter-booking',
  '/private-jet-booking-india',
  '/charter-flight-booking',
  '/aircraft-charter-services-india',
  '/private-jet-hire',
  '/business-jet-charter',
  '/private-jet-charter-delhi',
  '/corporate-jet-charter',
  '/helicopter-charter-services',
  '/helicopter-booking',
  '/corporate-helicopter-charter',
  '/fleet',
  '/fleet/avanti-180',
  '/fleet/cessna-caravan-208b',
  '/fleet/cessna-citation-mustang',
  '/fleet/challenger-604',
  '/fleet/challenger-605',
  '/fleet/citation-525-a',
  '/about',
  '/contact',
  '/blogs',
];

const CRAWLER_RULES = [
  { userAgent: '*', allow: PUBLIC_ROUTES, disallow: ['/booking'] },
  ...AI_CRAWLERS.map((ua) => ({
    userAgent: ua,
    allow: PUBLIC_ROUTES,
    disallow: ['/booking'],
  })),
];

export default function robots() {
  return {
    rules: CRAWLER_RULES,
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
