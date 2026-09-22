'use client';

import { AviationCanvas } from '@/components/3d/AviationCanvas';
import { FleetScene } from '@/components/3d/FleetScene';
import type { SceneConfig } from '@/components/3d/sceneConfig';

/**
 * The showroom's WebGL layer, split out so it can be dynamically imported on
 * its own.
 *
 * Previously the whole showroom — panel, controls, aircraft list — sat behind
 * `ssr: false`, which meant none of it appeared in the server response. A grep
 * of the built HTML found zero buttons, zero labels and zero aircraft names on
 * `/aircraft` inside the showroom. Only Three.js needs to be client-only; the
 * text and the controls do not, and they are the parts that matter to a
 * crawler, to a screen reader and to anyone whose JavaScript has not arrived
 * yet.
 *
 * So the boundary moved down one level: the showroom renders on the server,
 * and this file — the only part that touches WebGL — is what loads lazily.
 */
export default function FleetCanvas({
  activeIndex,
  indexRef,
  config,
}: {
  readonly activeIndex: number;
  readonly indexRef: { readonly current: number };
  readonly config: SceneConfig;
}) {
  return (
    <AviationCanvas
      config={config}
      ariaLabel="Decorative three-dimensional view of the aircraft fleet. Every aircraft and its specifications are listed as text below."
    >
      {(pointerRef) => (
        <FleetScene
          activeIndex={activeIndex}
          indexRef={indexRef}
          config={config}
          pointerRef={pointerRef}
        />
      )}
    </AviationCanvas>
  );
}
