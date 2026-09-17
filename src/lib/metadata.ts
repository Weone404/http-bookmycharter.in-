import type { Metadata } from 'next';
import type { Path } from '@/types/common';
import { SITE, absoluteUrl } from './site';
import { getRoute } from './routes';

/**
 * Default social card. A typographic card, not a photograph, because no
 * licensed aviation photography exists yet (see docs/BUSINESS-DATA-REQUIRED
 * section G). Replacing this file replaces every card on the site.
 */
export const OG_IMAGE = {
  url: '/og/default.png',
  width: 1200,
  height: 630,
  alt: 'Book My Charter — private jet and helicopter charter in India',
} as const;

interface MetadataInput {
  readonly title: string;
  readonly description: string;
  readonly path: Path;
  readonly index?: boolean;
  readonly image?: { url: string; width: number; height: number; alt: string };
}

/**
 * Build a page's metadata.
 *
 * Next.js REPLACES a parent `openGraph` object rather than merging it, so the
 * image has to be restated on every page or og:image silently disappears.
 * Every route builds its metadata through here for exactly that reason.
 */
export function pageMetadata({ title, description, path, index = true, image }: MetadataInput): Metadata {
  const card = image ?? OG_IMAGE;
  return {
    title: { absolute: `${title} | ${SITE.name}` },
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      type: 'website',
      siteName: SITE.name,
      locale: SITE.locale,
      images: [card],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [card.url],
    },
  };
}

/**
 * Metadata straight from the route registry, so a page's title, description
 * and indexability cannot drift from what the sitemap publishes.
 */
export function metadataForRoute(path: Path): Metadata {
  const route = getRoute(path);
  if (!route) {
    throw new Error(`No route registered for ${path}. Add it to src/lib/routes.ts.`);
  }
  return pageMetadata({
    title: route.title,
    description: route.description,
    path: route.path,
    index: route.index,
  });
}
