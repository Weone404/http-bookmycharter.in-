/** @type {import('next').NextConfig} */

/**
 * Old path -> new canonical path. Source of truth: docs/IA.md section 2.
 *
 * Canonical form has NO trailing slash (Next.js default). Every entry points at
 * its final destination, never at another redirect, so there are no chains.
 */
const LEGACY_REDIRECTS = {
  // The twelve duplicate private-aviation pages collapse to five destinations.
  '/private-jet-charter': '/private-charter/private-jet-charter',
  '/private-jet-charter-booking': '/private-charter/private-jet-charter',
  '/private-jet-booking-india': '/private-charter/private-jet-charter',
  '/private-jet-hire': '/private-charter/private-jet-charter',
  '/business-jet-charter': '/private-charter/private-jet-charter',
  '/corporate-jet-charter': '/services/corporate-charter',
  '/charter-flight-booking': '/private-charter',
  '/aircraft-charter-services-india': '/private-charter/aircraft-charter',
  '/private-jet-charter-delhi': '/destinations/delhi',
  '/helicopter-charter-services': '/helicopter-charter',
  '/helicopter-booking': '/helicopter-charter',
  '/corporate-helicopter-charter': '/helicopter-charter/corporate-helicopter',

  // Remaining legacy routes.
  '/private-helicopter-charter': '/helicopter-charter/private-helicopter-charter',
  '/kedarnath-helicopter-yatra': '/chardham/kedarnath-helicopter',
  '/char-dham-yatra-by-helicopter': '/chardham',
  '/helicopter-flower-dropping': '/services/aerial-flower-dropping',
  '/fleet': '/aircraft',
  '/blogs': '/insights',
  '/booking': '/request-a-charter',

  // Variants people type or link to.
  '/chardham': '/chardham',
  '/char-dham': '/chardham',
  '/chardham-yatra': '/chardham',
  '/char-dham-yatra': '/chardham',
  '/kedarnath': '/chardham/kedarnath-helicopter',
  '/kedarnath-helicopter': '/chardham/kedarnath-helicopter',
  '/charter': '/private-charter',
  '/helicopter-charter-old': '/helicopter-charter',
  '/flower-drop': '/services/aerial-flower-dropping',
  '/flower-dropping': '/services/aerial-flower-dropping',
  '/flower-dropping-kedarnath': '/services/aerial-flower-dropping',
};

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 375, 430, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      ...Object.entries(LEGACY_REDIRECTS)
        // A path that already equals its destination needs no redirect.
        .filter(([source, destination]) => source !== destination)
        .map(([source, destination]) => ({ source, destination, permanent: true })),
      // Legacy aircraft detail pages.
      { source: '/fleet/:slug', destination: '/aircraft/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
