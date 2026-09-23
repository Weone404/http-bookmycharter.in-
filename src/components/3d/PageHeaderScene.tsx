'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { useAviationMaterials } from './geometry/materials';
import { AirlinerForm, HelicopterForm, JetForm, TurbopropForm } from './geometry/AircraftForms';
import type { SceneConfig } from './sceneConfig';

export type HeaderForm = 'jet' | 'helicopter' | 'turboprop' | 'airliner';

/**
 * The scene inside the band that runs under the navigation on every inner page.
 *
 * Deliberately the cheapest scene in the codebase. It reuses the four shared
 * materials and the same procedural forms as the hero and the showroom, so it
 * adds no geometry, no texture and no new material to the bundle. There is no
 * ground plane, no shadow map and no environment map — at 120–200 px tall none
 * of them would be visible, and shadow rendering is the single most expensive
 * thing a scene this size could ask for.
 *
 * Under `prefers-reduced-motion` the frame callback returns immediately and
 * the aircraft simply sits there, which is the correct reading of the
 * preference: the object is still shown, it just stops moving.
 */
export function PageHeaderScene({
  config,
  form,
}: {
  readonly config: SceneConfig;
  readonly form: HeaderForm;
}) {
  const materials = useAviationMaterials();
  const group = useRef<Group>(null);

  useFrame((state, rawDelta) => {
    const node = group.current;
    if (!node || config.floatAmplitude === 0) return;
    const delta = Math.min(rawDelta, 1 / 30);
    const t = state.clock.elapsedTime;
    // Two slow, out-of-phase oscillations. No scroll listener and no pointer
    // read: this band is decoration at the top of the page and reacting to
    // either would make it compete with the content for attention.
    node.position.y = -0.3 + Math.sin(t * 0.32) * config.floatAmplitude * 1.6;
    node.rotation.z = Math.sin(t * 0.21) * 0.05;
    node.rotation.y += delta * 0.03;
  });

  return (
    <>
      {/* The canvas is opaque, so this has to match the fallback behind it or
          the seam shows. Ivory, not midnight: the band sits directly under a
          white navigation bar now. */}
      <color attach="background" args={['#f5f7f4']} />
      {/* Lighting inverted for the light ground. On midnight the aircraft was
          read by its highlights; on ivory it is read by its shadowed side, so
          the key is softer, the ambient is much higher, and a low cyan bounce
          stands in for light coming back off the sweep. */}
      <ambientLight intensity={1.15} />
      <directionalLight position={[5, 7, 6]} intensity={2.1} />
      <directionalLight position={[-6, -2, -4]} intensity={0.5} color="#16B8D4" />
      <group ref={group} position={[2.6, -0.3, 0]} rotation={[0.08, -0.75, 0]} scale={1.15}>
        {form === 'helicopter' ? <HelicopterForm materials={materials} /> : null}
        {form === 'turboprop' ? <TurbopropForm materials={materials} /> : null}
        {form === 'airliner' ? <AirlinerForm materials={materials} /> : null}
        {form === 'jet' ? <JetForm materials={materials} /> : null}
      </group>
    </>
  );
}
