'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { SceneFallback } from './SceneFallback';

/**
 * The hero's 3D layer, loaded lazily and mounted only once the browser is idle.
 *
 * `ssr: false` already kept Three.js out of the server response and out of the
 * route's initial JavaScript. That was not enough: Lighthouse measured the home
 * page at 60 with 1,530 ms of total blocking time and a 4.2 s LCP, and the LCP
 * element was the hero's supporting paragraph — plain text, pushed out by
 * WebGL initialisation competing for the main thread. The same build scored 93
 * on /aircraft and 100 on /pricing, which is what pointed at the hero.
 *
 * So the import now waits for `requestIdleCallback`. The hero's H1, copy and
 * both CTAs paint and become interactive first; the aircraft arrives a moment
 * later, which is the correct priority for a decorative layer. The timeout
 * bounds the wait on a busy main thread, and the setTimeout branch covers
 * browsers without the idle API.
 */
const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => <SceneFallback />,
});

/**
 * The idle API, described structurally rather than by extending `Window` —
 * the DOM lib already declares these as required, so an interface with them
 * optional is not a valid extension of it.
 */
interface IdleScheduler {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
}

export function HeroVisual() {
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

  // The fallback is what the hero shows until then, so the composition is
  // complete from the first paint and nothing shifts when the canvas arrives.
  if (!mount) return <SceneFallback />;
  return <HeroCanvas />;
}
