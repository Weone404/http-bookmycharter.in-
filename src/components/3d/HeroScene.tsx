'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type { Group } from 'three';
import { useAviationMaterials } from './geometry/materials';
import { JetForm } from './geometry/AircraftForms';
import { SceneEnvironment } from './SceneEnvironment';
import type { SceneConfig } from './sceneConfig';

/**
 * The hero enhancement.
 *
 * One aircraft, one camera, a slow drift and a scroll-linked depth shift.
 * Nothing here carries meaning: the H1, the supporting copy and both CTAs are
 * HTML that renders and is usable whether or not this ever initialises.
 *
 * Scroll is read from a listener into a ref and consumed in the frame loop.
 * No scroll handler touches React state, and the page scrolls normally — there
 * is no hijacking, no pinning and no scroll-jacked sequence.
 */
export function HeroScene({
  config,
  pointerRef,
}: {
  readonly config: SceneConfig;
  readonly pointerRef: { readonly current: { x: number; y: number } };
}) {
  const materials = useAviationMaterials();
  const aircraft = useRef<Group>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      // Normalised 0..1 over the first viewport of scrolling.
      scrollRef.current = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state, rawDelta) => {
    const node = aircraft.current;
    if (!node) return;
    const delta = Math.min(rawDelta, 1 / 30);
    const alpha = 1 - Math.exp(-2.6 * delta);

    const drift =
      config.floatAmplitude === 0
        ? 0
        : Math.sin(state.clock.elapsedTime * 0.4) * config.floatAmplitude * 2.2;

    // Scroll pushes the aircraft back and down as the copy below comes up.
    const depth = scrollRef.current * 2.6;
    const targetZ = config.heroPlacement.position[2] - depth;
    const targetY = config.heroPlacement.position[1] + drift - scrollRef.current * 0.8;
    const targetYaw = config.heroPlacement.yaw + pointerRef.current.x * config.parallax * 0.12;

    node.position.z += (targetZ - node.position.z) * alpha;
    node.position.y += (targetY - node.position.y) * alpha;
    node.rotation.y += (targetYaw - node.rotation.y) * alpha;

    // Pitch responds to the pointer only, and gently. A hero aircraft that
    // tracks the cursor aggressively feels like a toy.
    const targetPitch = pointerRef.current.y * config.parallax * 0.05;
    node.rotation.x += (targetPitch - node.rotation.x) * alpha;
  });

  return (
    <>
      <SceneEnvironment config={config} centerX={2} />
      <group
        ref={aircraft}
        position={[
          config.heroPlacement.position[0],
          config.heroPlacement.position[1],
          config.heroPlacement.position[2],
        ]}
        rotation={[0, config.heroPlacement.yaw, 0.04]}
        scale={config.heroPlacement.scale}
      >
        <JetForm materials={materials} />
      </group>
    </>
  );
}
