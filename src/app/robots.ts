import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * Search and answer-engine crawlers are explicitly welcome.
 *
 * The goal is retrievability, not manipulation: a crawler that cannot read the
 * pricing page cannot cite it. Named allowances exist so a future blanket
 * disallow cannot silently lock out AI retrieval.
 */
const RETRIEVAL_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'CCBot',
  'Amazonbot',
  'meta-externalagent',
  'Bytespider',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      ...RETRIEVAL_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
