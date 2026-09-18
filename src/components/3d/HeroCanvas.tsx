'use client';

import { AviationCanvas } from './AviationCanvas';
import { HeroScene } from './HeroScene';
import { useSceneConfig } from './useSceneConfig';

/**
 * Entry point for the hero visual. Dynamically imported with `ssr: false` by
 * the page, so none of the WebGL runtime is in the server response or in the
 * initial client bundle for the route.
 */
export default function HeroCanvas() {
  const { config } = useSceneConfig();

  return (
    <AviationCanvas
      config={config}
      pointerSource="window"
      ariaLabel="Decorative three-dimensional illustration of a private jet. All information about our aircraft and services is available as text on this page."
    >
      {(pointerRef) => <HeroScene config={config} pointerRef={pointerRef} />}
    </AviationCanvas>
  );
}
