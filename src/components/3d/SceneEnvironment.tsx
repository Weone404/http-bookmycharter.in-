'use client';

import type { SceneConfig } from './sceneConfig';

/**
 * Lighting and ground, kept to the simplest setup that produces the look.
 *
 * Three lights: a low ambient fill, one directional key that casts, and a
 * cyan rim from behind. No environment map is loaded — drei's `Environment`
 * presets fetch an HDR from a third-party CDN, which is a network dependency
 * and a payload this scene does not need to look right.
 *
 * The key light and the ground travel with the active aircraft (`centerX`).
 * A shadow camera has finite bounds, and the fleet world is wider than any
 * sensible bound; anchoring the rig to the active stop keeps the shadow map
 * tight and high-resolution instead of stretched across the whole world. It
 * also removes the visible edge that a fixed-size shadow pad showed once the
 * aircraft spacing grew.
 */
export function SceneEnvironment({
  config,
  centerX,
}: {
  config: SceneConfig;
  centerX: number;
}) {
  return (
    <>
      {/* Matches --color-midnight so the canvas blends into the section. */}
      <color attach="background" args={['#071a2b']} />
      {/* Depth cue that also hides the end of the world without a wall. */}
      <fog attach="fog" args={['#071a2b', 12, 42]} />

      <ambientLight intensity={0.55} color="#c8d8e4" />

      {/* Ground. Large enough that fog hides its edge, dark enough to read as
          a hangar floor rather than a grey plane. One mesh, one material. */}
      <mesh
        position={[centerX, -1.4, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow={config.shadows}
      >
        <planeGeometry args={[140, 90]} />
        <meshStandardMaterial color="#061725" roughness={0.95} metalness={0.05} />
      </mesh>

      <directionalLight
        position={[centerX + 6, 9, 8]}
        intensity={1.5}
        color="#ffffff"
        castShadow={config.shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />

      {/* Rim light in the brand accent. This is where the scene gets its
          aviation-at-dusk quality, at the cost of one non-shadowing light. */}
      <directionalLight position={[centerX - 8, 3, -7]} intensity={0.85} color="#16b8d4" />
    </>
  );
}
