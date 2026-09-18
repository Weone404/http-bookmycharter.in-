'use client';

import { useEffect, useState } from 'react';
import { sceneConfigFor, viewportClassFor, type SceneConfig, type ViewportClass } from './sceneConfig';

/**
 * Viewport class and reduced-motion preference, both live.
 *
 * Read once on mount and then only on change — no resize handler running per
 * frame, and no layout reads inside the render loop.
 */
export function useSceneConfig(): {
  config: SceneConfig;
  viewport: ViewportClass;
  reducedMotion: boolean;
} {
  const [viewport, setViewport] = useState<ViewportClass>('desktop');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const widthQueries = [
      { query: window.matchMedia('(max-width: 767px)'), value: 'mobile' as const },
      { query: window.matchMedia('(min-width: 768px) and (max-width: 1279px)'), value: 'tablet' as const },
    ];
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      setViewport(viewportClassFor(window.innerWidth));
      setReducedMotion(motionQuery.matches);
    };

    sync();
    for (const { query } of widthQueries) query.addEventListener('change', sync);
    motionQuery.addEventListener('change', sync);

    return () => {
      for (const { query } of widthQueries) query.removeEventListener('change', sync);
      motionQuery.removeEventListener('change', sync);
    };
  }, []);

  return { config: sceneConfigFor(viewport, reducedMotion), viewport, reducedMotion };
}
