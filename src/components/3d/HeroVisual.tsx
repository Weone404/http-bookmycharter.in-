'use client';

import dynamic from 'next/dynamic';
import { SceneFallback } from './SceneFallback';

/**
 * The hero's 3D layer, loaded lazily.
 *
 * `ssr: false` keeps Three.js, R3F and drei out of the server response and out
 * of the route's initial JavaScript. The hero's H1, copy and both CTAs are
 * server-rendered HTML in the page itself and do not wait for any of this.
 *
 * `loading` shows the same static fallback used when WebGL is unavailable, so
 * there is no layout shift and no empty frame at any point.
 */
const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => <SceneFallback />,
});

export function HeroVisual() {
  return <HeroCanvas />;
}
