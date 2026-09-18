'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import type { SceneConfig } from './sceneConfig';
import { stopPosition } from '@/data/fleet-scene';

/**
 * THE ONLY THING THAT MOVES THE CAMERA.
 *
 * One rig, one authority. The target is computed from the active index, and a
 * critically-damped spring converges the camera on it every frame. GSAP is
 * deliberately not used here: two systems writing `camera.position` is how a
 * camera starts fighting itself, and the symptom — jitter under rapid input —
 * is unpleasant to debug. GSAP owns the HTML choreography instead; see
 * docs/3D-ARCHITECTURE.md.
 *
 * Everything in the loop is preallocated. No vectors, arrays or objects are
 * created per frame.
 */
interface CameraRigProps {
  readonly indexRef: { readonly current: number };
  readonly config: SceneConfig;
  readonly pointerRef: { readonly current: { x: number; y: number } };
}

export function CameraRig({ indexRef, config, pointerRef }: CameraRigProps) {
  const { camera } = useThree();

  // Preallocated working state.
  const desired = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3());
  const settled = useRef(0);
  const lastIndex = useRef(-1);

  useFrame((_, rawDelta) => {
    // Clamp delta so a tab returning from the background does not teleport the
    // camera across the scene in one frame.
    const delta = Math.min(rawDelta, 1 / 30);
    const index = indexRef.current;

    if (index !== lastIndex.current) {
      lastIndex.current = index;
      settled.current = 0;
    }

    const [stopX, stopY, stopZ] = stopPosition(index, config.spacing);
    const [offsetX, offsetY, offsetZ] = config.cameraOffset;

    // Travel arc: the camera lifts and pulls back while in transit and returns
    // to the rest offset as it settles. `settled` runs 0 -> 1 over `settle`.
    settled.current = Math.min(1, settled.current + delta / Math.max(config.settle, 0.0001));
    const transit = Math.sin(settled.current * Math.PI) * config.travelArc;

    const parallaxX = pointerRef.current.x * config.parallax;
    const parallaxY = pointerRef.current.y * config.parallax * 0.4;

    desired.current.set(
      stopX + offsetX + parallaxX,
      stopY + offsetY + transit * 0.55 + parallaxY,
      stopZ + offsetZ + transit,
    );

    // Exponential smoothing, frame-rate independent.
    const lambda = 3.4;
    const alpha = 1 - Math.exp(-lambda * delta);
    camera.position.lerp(desired.current, alpha);

    const [lookX, lookY] = config.lookOffset;
    lookTarget.current.set(stopX + lookX, stopY + lookY, stopZ);
    currentLook.current.lerp(lookTarget.current, alpha);
    camera.lookAt(currentLook.current);
  });

  return null;
}
