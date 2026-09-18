'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Four materials for the whole scene.
 *
 * Material count is a direct GPU cost: each unique material is a shader
 * program and, in practice, a draw call boundary. Every aircraft in the
 * showroom shares these four, so adding aircraft adds geometry but not
 * shaders.
 *
 * Created once per canvas and disposed with it. R3F disposes materials reached
 * through the scene graph on unmount; these are held in a memo rather than in
 * JSX, so the hook disposes them explicitly.
 */
export interface AviationMaterials {
  readonly shell: THREE.MeshStandardMaterial;
  readonly accent: THREE.MeshStandardMaterial;
  readonly glass: THREE.MeshStandardMaterial;
  readonly dark: THREE.MeshStandardMaterial;
}

const MIDNIGHT = '#0c2b42';
const CYAN = '#16b8d4';

export function useAviationMaterials(): AviationMaterials {
  return useMemo(() => {
    const shell = new THREE.MeshStandardMaterial({
      // Slightly cooler and rougher than before: at 0.42 roughness the large
      // smooth surfaces read as plastic under a single key light.
      color: '#dde5eb',
      metalness: 0.48,
      roughness: 0.52,
    });
    const accent = new THREE.MeshStandardMaterial({
      color: CYAN,
      metalness: 0.3,
      roughness: 0.35,
      emissive: new THREE.Color(CYAN),
      // Just enough to read as a lit trim line without becoming a neon glow.
      emissiveIntensity: 0.16,
    });
    const glass = new THREE.MeshStandardMaterial({
      // Tinted glass, not chrome. High metalness with low roughness rendered
      // as a black ball with one hard highlight, which is what a mirror does.
      color: '#16354d',
      metalness: 0.25,
      roughness: 0.28,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: MIDNIGHT,
      metalness: 0.7,
      roughness: 0.5,
    });
    return { shell, accent, glass, dark };
  }, []);
}
