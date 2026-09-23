'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SITE_IMAGES, type SiteImageName } from '@/data/site-images.generated';

/**
 * The picture band under the navigation on every page except home.
 *
 * It replaced the WebGL band. The 3D aircraft there were simple class shapes
 * and read as cheap next to real imagery; this is one optimised JPEG per page
 * group, decided from the route alone — it asserts nothing about what is
 * available or operated, it only matches the subject of the page.
 *
 * Decorative (empty alt): the page's own heading says what the page is about.
 * The band reserves its height in CSS, so nothing shifts when it loads.
 */
function bandFor(pathname: string): SiteImageName {
  const p = pathname;
  if (p.startsWith('/chardham')) return 'band-himalaya';
  if (p.includes('flower-dropping')) return 'band-aerial-flower-dropping';
  if (p.startsWith('/helicopter-charter')) return 'band-helicopter-charter';
  if (p.startsWith('/private-charter')) return 'band-private-charter';
  if (p.startsWith('/services')) return 'band-corporate';
  if (p.startsWith('/empty-leg')) return 'band-empty-legs';
  if (p.startsWith('/pricing') || p.startsWith('/how-it-works')) return 'band-planning';
  if (p.startsWith('/destinations') || p.startsWith('/routes')) return 'band-destinations';
  if (p.startsWith('/aircraft')) return 'band-aircraft';
  if (p.startsWith('/insights')) return 'band-insights';
  if (p.startsWith('/request-a-charter')) return 'band-request';
  return 'band-company';
}

/** Where the subject sits in each picture, so the wide crop keeps it. */
const FOCUS: Partial<Record<SiteImageName, string>> = {
  'band-helicopter-charter': '50% 28%',
  'band-aerial-flower-dropping': '50% 30%',
  'band-himalaya': '50% 45%',
  'band-private-charter': '50% 55%',
};

export function PageBand() {
  const pathname = usePathname() ?? '/';
  if (pathname === '/') return null;
  const name = bandFor(pathname);
  const image = SITE_IMAGES[name];

  return (
    <div
      className="page-header-band relative isolate h-[clamp(120px,17vw,240px)] w-full overflow-hidden bg-[var(--color-ivory-dim)]"
      aria-hidden="true"
    >
      <Image
        src={image.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: FOCUS[name] ?? '50% 50%' }}
      />
      {/* A soft fade into the page ground, so the band ends rather than
          stops. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[var(--color-ivory)]/35" />
    </div>
  );
}
