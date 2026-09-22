'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SceneFallback } from './SceneFallback';
import type { HeaderForm } from './PageHeaderScene';

/**
 * A shallow three-dimensional band directly under the navigation, on every
 * page except the home page.
 *
 * The brief was "make the whole website 3-D" and "very fast", which pull in
 * opposite directions; this is the shape that satisfies both. One canvas, the
 * geometry and materials the hero already loads, no shadow pass, and the whole
 * thing deferred until the browser is idle — so the page's text, links and
 * CTAs paint and become interactive before any WebGL work begins.
 *
 * The band reserves its height in CSS from the first paint and the fallback
 * fills it immediately, so nothing moves when the canvas arrives: the layout
 * shift of a late-mounting canvas is the usual cost of this pattern and it is
 * paid here in advance.
 *
 * The home page is excluded because it already carries the hero scene, and two
 * live contexts stacked at the top of one page is exactly the waste the
 * single-canvas rule exists to prevent.
 */
const PageHeaderCanvas = dynamic(() => import('./PageHeaderCanvas'), {
  ssr: false,
  loading: () => null,
});

/**
 * Structural, not `extends Window`. The DOM lib already declares both of these
 * as required, so extending Window and re-declaring them optional is a type
 * error rather than a widening.
 */
interface IdleScheduler {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
}

/**
 * Which aircraft the band shows, decided from the route alone.
 *
 * Route-derived, not data-derived: it asserts nothing about what is available
 * or operated, it only matches the subject of the page the reader is on.
 */
function formForPath(pathname: string): HeaderForm {
  if (
    pathname.startsWith('/helicopter-charter') ||
    pathname.startsWith('/chardham') ||
    pathname.includes('helicopter') ||
    pathname.includes('flower-dropping')
  ) {
    return 'helicopter';
  }
  if (pathname.includes('turboprop')) return 'turboprop';
  if (pathname.includes('group-charter') || pathname.includes('corporate-charter')) {
    return 'airliner';
  }
  return 'jet';
}

export function PageHeaderBand() {
  const pathname = usePathname();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const w = window as unknown as IdleScheduler;
    if (w.requestIdleCallback) {
      const handle = w.requestIdleCallback(() => setMount(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(handle);
    }
    const timer = window.setTimeout(() => setMount(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  if (pathname === '/') return null;

  return (
    <div
      className="page-header-band relative isolate h-[clamp(96px,13vw,168px)] w-full overflow-hidden bg-[var(--color-midnight)]"
      aria-hidden="true"
    >
      <SceneFallback />
      {mount ? <PageHeaderCanvas form={formForPath(pathname)} /> : null}
      {/* Fades the band into the section below it so the seam is not a hard
          edge between two flat colours. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[var(--color-midnight)]" />
    </div>
  );
}
