import type { MetadataRoute } from 'next';
import { indexableRoutes } from '@/lib/routes';
import { absoluteUrl } from '@/lib/site';

/**
 * Only canonical, live, indexable URLs. No redirects, no 404s, no query
 * parameters, no noindex pages, and nothing whose page does not yet exist —
 * `status: 'planned'` routes are filtered out by `indexableRoutes()`.
 *
 * `lastModified` comes from the route registry and is a real editing date.
 * A uniform "now" on every URL is discounted as fake freshness.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
