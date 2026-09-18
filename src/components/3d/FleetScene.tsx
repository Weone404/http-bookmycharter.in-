'use client';

import { useMemo } from 'react';
import { FLEET_SCENE, stopPosition } from '@/data/fleet-scene';
import type { SceneConfig } from './sceneConfig';
import { useAviationMaterials } from './geometry/materials';
import { AircraftModel } from './AircraftModel';
import { SceneEnvironment } from './SceneEnvironment';
import { CameraRig } from './CameraRig';

/**
 * The fleet world.
 *
 * Aircraft are laid out along the X axis from the data, `config.neighbours`
 * either side of the active one. Everything beyond that window is not
 * rendered at all — culling by not mounting is cheaper than culling in the
 * renderer, and it is what keeps the mobile scene affordable.
 *
 * The window is derived from React state (the active index), not from the
 * frame loop, so mounting and unmounting happens on interaction rather than
 * continuously.
 */
export function FleetScene({
  activeIndex,
  indexRef,
  config,
  pointerRef,
}: {
  readonly activeIndex: number;
  readonly indexRef: { readonly current: number };
  readonly config: SceneConfig;
  readonly pointerRef: { readonly current: { x: number; y: number } };
}) {
  const materials = useAviationMaterials();

  const visible = useMemo(() => {
    const from = Math.max(0, activeIndex - config.neighbours);
    const to = Math.min(FLEET_SCENE.length - 1, activeIndex + config.neighbours);
    return FLEET_SCENE.map((item, index) => ({ item, index })).slice(from, to + 1);
  }, [activeIndex, config.neighbours]);

  const [centerX] = stopPosition(activeIndex, config.spacing);

  return (
    <>
      <SceneEnvironment config={config} centerX={centerX} />
      <CameraRig indexRef={indexRef} config={config} pointerRef={pointerRef} />

      {visible.map(({ item, index }) => (
        <AircraftModel
          key={item.slug}
          item={item}
          position={stopPosition(index, config.spacing)}
          active={index === activeIndex}
          config={config}
          materials={materials}
          phase={index * 1.7}
        />
      ))}
    </>
  );
}
