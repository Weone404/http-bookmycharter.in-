import type { MetadataRoute } from 'next';
import { indexableRoutes } from '@/lib/routes';
import { absoluteUrl } from '@/lib/site';
import { PUBLISHED_AIRCRAFT } from '@/data/aircraft';
import { INSIGHTS } from '@/data/insights';

/**
 * Only canonical, live, indexable URLs. No redirects, no 404s, no query
 * parameters, no noindex pages, and nothing whose page does not yet exist —
 * `status: 'planned'` routes are filtered out by `indexableRoutes()`.
 *
 * Pages generated from a dynamic segment have no registry entry, so they are
 * appended from the same data that generates them. That is deliberate: if an
 * aircraft stops being published, it leaves the sitemap in the same commit it
 * leaves the site.
 *
 * `lastModified` is a real editing date. A uniform "now" on every URL is
 * discounted as fake freshness.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const registry = indexableRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const aircraft = PUBLISHED_AIRCRAFT.map((item) => ({
    url: absoluteUrl(item.href),
    lastModified: new Date('2026-09-17'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const insights = INSIGHTS.map((item) => ({
    url: absoluteUrl(item.canonical),
    lastModified: new Date(item.updated ?? item.published),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...registry, ...aircraft, ...insights];
}
