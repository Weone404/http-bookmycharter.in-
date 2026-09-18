'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import type { AviationMaterials } from './materials';

/**
 * Aircraft forms authored in code.
 *
 * No GLB is downloaded and none is bundled, because no licensed model exists
 * for this project yet (docs/BUSINESS-DATA-REQUIRED G). These are deliberately
 * *representative* silhouettes of a class of aircraft, not attempts to
 * reproduce a specific type — a procedurally modelled "Gulfstream G550" that
 * is not actually a G550 would be a fabricated depiction, which is the same
 * error as a fabricated specification.
 *
 * Cost discipline: primitive geometries only, low segment counts, four shared
 * materials, no textures at all. The entire fleet costs no network bytes and
 * a few hundred triangles per aircraft.
 */
export interface FormProps {
  readonly materials: AviationMaterials;
}

/** Fuselage profile revolved into a body — narrow nose, full midsection, tapered tail. */
function useFuselageGeometry(length: number, radius: number): THREE.LatheGeometry {
  return useMemo(() => {
    const points: THREE.Vector2[] = [];
    const steps = 14;
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      // Smooth nose, flat middle, drawn-out tail cone.
      const profile = Math.sin(Math.PI * Math.pow(t, 0.72)) ** 0.85;
      points.push(new THREE.Vector2(Math.max(profile * radius, 0.001), t * length - length / 2));
    }
    const geometry = new THREE.LatheGeometry(points, 20);
    geometry.rotateX(Math.PI / 2);
    return geometry;
  }, [length, radius]);
}

/** A swept, tapered lifting surface. Used for wings and stabilisers. */
function useWingGeometry(span: number, chord: number, sweep: number): THREE.BufferGeometry {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -chord / 2);
    shape.lineTo(0, chord / 2);
    shape.lineTo(span, chord * 0.18 + sweep);
    shape.lineTo(span, -chord * 0.22 + sweep);
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: chord * 0.09,
      bevelEnabled: true,
      bevelSize: chord * 0.02,
      bevelThickness: chord * 0.015,
      bevelSegments: 1,
    });
    geometry.rotateX(Math.PI / 2);
    geometry.center();
    return geometry;
  }, [span, chord, sweep]);
}

/** Business jet: swept wings, aft-mounted engines, T-tail. */
export function JetForm({ materials }: FormProps) {
  const fuselage = useFuselageGeometry(7.2, 0.52);
  const wing = useWingGeometry(3.1, 1.5, 0.95);
  const stabiliser = useWingGeometry(1.25, 0.72, 0.42);

  return (
    <group>
      <mesh geometry={fuselage} material={materials.shell} castShadow receiveShadow />

      {/* Cockpit glazing, inset into the fuselage and flattened so it reads as
          a windscreen rather than a ball stuck on the nose. */}
      <mesh position={[0, 0.2, 2.15]} material={materials.glass} scale={[0.92, 0.5, 1.5]}>
        <sphereGeometry args={[0.4, 16, 12]} />
      </mesh>

      {/* Cabin window line, read as a single accent stripe rather than cut-outs */}
      <mesh position={[0.51, 0.16, 0.25]} material={materials.accent}>
        <boxGeometry args={[0.035, 0.07, 3]} />
      </mesh>
      <mesh position={[-0.51, 0.16, 0.25]} material={materials.accent}>
        <boxGeometry args={[0.035, 0.07, 3]} />
      </mesh>

      {/* Wings */}
      <mesh geometry={wing} material={materials.shell} position={[1.62, -0.2, -0.35]} castShadow />
      <mesh
        geometry={wing}
        material={materials.shell}
        position={[-1.62, -0.2, -0.35]}
        rotation={[0, Math.PI, 0]}
        castShadow
      />

      {/* Aft-mounted engines */}
      {[0.86, -0.86].map((x) => (
        <group key={x} position={[x, 0.26, -1.9]}>
          <mesh material={materials.dark} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.26, 1.35, 16, 1, true]} />
          </mesh>
          <mesh material={materials.glass} position={[0, 0, 0.66]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.27, 0.27, 0.06, 16]} />
          </mesh>
        </group>
      ))}

      {/* Fin and T-tail */}
      <mesh material={materials.shell} position={[0, 0.92, -3.05]} castShadow>
        <boxGeometry args={[0.1, 1.5, 1.05]} />
      </mesh>
      <mesh geometry={stabiliser} material={materials.shell} position={[0.7, 1.66, -3.3]} />
      <mesh
        geometry={stabiliser}
        material={materials.shell}
        position={[-0.7, 1.66, -3.3]}
        rotation={[0, Math.PI, 0]}
      />
      <mesh material={materials.accent} position={[0, 1.34, -3.05]}>
        <boxGeometry args={[0.11, 0.06, 0.8]} />
      </mesh>
    </group>
  );
}

/** Helicopter: light twin silhouette — flattened cabin, high tail boom, fin. */
export function HelicopterForm({ materials }: FormProps) {
  /**
   * A single sphere read as an egg. A light twin's cabin is flatter than it is
   * round, wider at the shoulder than at the nose, and its windscreen stands
   * proud of the shell. This is three pieces rather than one.
   */
  const cabin = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1.1, 22, 16);
    geometry.scale(0.96, 0.8, 1.32);
    return geometry;
  }, []);

  const nose = useMemo(() => {
    const geometry = new THREE.SphereGeometry(0.82, 20, 14);
    geometry.scale(0.92, 0.68, 0.98);
    return geometry;
  }, []);

  return (
    <group>
      <mesh geometry={cabin} material={materials.shell} position={[0, 0.3, 0.2]} castShadow receiveShadow />
      <mesh geometry={nose} material={materials.shell} position={[0, 0.16, 1.28]} castShadow />

      {/* Windscreen, standing proud of the nose rather than buried in it. */}
      <mesh material={materials.glass} position={[0, 0.3, 1.66]} scale={[0.78, 0.6, 0.5]}>
        <sphereGeometry args={[0.78, 18, 14]} />
      </mesh>
      {/* Chin window — the detail that makes a helicopter nose readable. */}
      <mesh material={materials.glass} position={[0, -0.2, 1.5]} scale={[0.66, 0.34, 0.5]}>
        <sphereGeometry args={[0.7, 14, 12]} />
      </mesh>

      {/* Engine deck behind the rotor mast. */}
      <mesh material={materials.dark} position={[0, 0.92, -0.15]} scale={[0.72, 0.42, 1.1]}>
        <sphereGeometry args={[0.7, 16, 12]} />
      </mesh>

      {/* Tail boom, mounted high so it clears the cabin in silhouette. */}
      <mesh
        material={materials.shell}
        position={[0, 0.66, -2.15]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.12, 0.22, 3, 12]} />
      </mesh>

      {/* Fin, plus a horizontal stabiliser: both read from any yaw. */}
      <mesh material={materials.shell} position={[0, 1.12, -3.42]} castShadow>
        <boxGeometry args={[0.08, 1.05, 0.66]} />
      </mesh>
      <mesh material={materials.accent} position={[0, 1.5, -3.42]}>
        <boxGeometry args={[0.09, 0.07, 0.5]} />
      </mesh>
      <mesh material={materials.shell} position={[0, 0.62, -3.1]} castShadow>
        <boxGeometry args={[1.7, 0.06, 0.42]} />
      </mesh>

      {/* Shrouded tail rotor. */}
      <mesh material={materials.dark} position={[0.1, 0.78, -3.5]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.32, 0.055, 8, 20]} />
      </mesh>

      {/* Rotor head and blades. Blades cone upward slightly and droop at the
          tip, which is what a rotor at rest actually does — a flat bar reads
          as a line, not as a rotor. */}
      <mesh material={materials.dark} position={[0, 1.28, 0.2]}>
        <cylinderGeometry args={[0.09, 0.12, 0.42, 10]} />
      </mesh>
      <mesh material={materials.dark} position={[0, 1.52, 0.2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.18, 14]} />
      </mesh>
      {[0.35, 0.35 + Math.PI / 2, 0.35 + Math.PI, 0.35 + (3 * Math.PI) / 2].map((angle) => (
        <group key={angle} position={[0, 1.52, 0.2]} rotation={[0, angle, 0]}>
          <mesh material={materials.dark} position={[0, -0.06, 2.35]} rotation={[-0.045, 0, 0]}>
            <boxGeometry args={[0.2, 0.05, 4.4]} />
          </mesh>
        </group>
      ))}

      {/* Skids. */}
      {[0.74, -0.74].map((x) => (
        <group key={x}>
          <mesh material={materials.dark} position={[x, -0.78, 0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.055, 0.055, 2.8, 8]} />
          </mesh>
          <mesh material={materials.dark} position={[x, -0.45, 0.95]} rotation={[0, 0, x > 0 ? 0.28 : -0.28]}>
            <cylinderGeometry args={[0.04, 0.04, 0.74, 6]} />
          </mesh>
          <mesh material={materials.dark} position={[x, -0.45, -0.5]} rotation={[0, 0, x > 0 ? 0.28 : -0.28]}>
            <cylinderGeometry args={[0.04, 0.04, 0.74, 6]} />
          </mesh>
        </group>
      ))}

      {/* Waist accent line. */}
      <mesh material={materials.accent} position={[0, 0.02, 0.5]}>
        <boxGeometry args={[2, 0.05, 0.05]} />
      </mesh>
    </group>
  );
}

/** Turboprop: high-mounted straight wing, wing nacelles, propellers. */
export function TurbopropForm({ materials }: FormProps) {
  const fuselage = useFuselageGeometry(6.4, 0.6);
  const wing = useWingGeometry(3.4, 1.35, 0.12);
  const stabiliser = useWingGeometry(1.3, 0.66, 0.1);

  return (
    <group>
      <mesh geometry={fuselage} material={materials.shell} castShadow receiveShadow />

      <mesh position={[0, 0.24, 1.95]} material={materials.glass} scale={[0.9, 0.52, 1.4]}>
        <sphereGeometry args={[0.44, 16, 12]} />
      </mesh>

      {/* Straight wing, mounted high on the fuselage */}
      <mesh geometry={wing} material={materials.shell} position={[1.78, 0.34, 0.2]} castShadow />
      <mesh
        geometry={wing}
        material={materials.shell}
        position={[-1.78, 0.34, 0.2]}
        rotation={[0, Math.PI, 0]}
        castShadow
      />

      {/* Nacelles with propellers */}
      {[1.5, -1.5].map((x) => (
        <group key={x} position={[x, 0.3, 0.45]}>
          <mesh material={materials.dark} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.24, 1.2, 4, 12]} />
          </mesh>
          {/* Spinner. Rotation belongs on the mesh; a geometry has no transform. */}
          <mesh material={materials.dark} position={[0, 0, 1.06]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.14, 0.34, 12]} />
          </mesh>
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle) => (
            <mesh
              key={angle}
              material={materials.dark}
              position={[Math.sin(angle) * 0.62, Math.cos(angle) * 0.62, 1.1]}
              rotation={[0, 0, -angle]}
            >
              <boxGeometry args={[0.1, 1.24, 0.03]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Empennage */}
      <mesh material={materials.shell} position={[0, 0.85, -2.7]} castShadow>
        <boxGeometry args={[0.09, 1.3, 0.9]} />
      </mesh>
      <mesh geometry={stabiliser} material={materials.shell} position={[0.72, 0.1, -2.85]} />
      <mesh
        geometry={stabiliser}
        material={materials.shell}
        position={[-0.72, 0.1, -2.85]}
        rotation={[0, Math.PI, 0]}
      />
      <mesh material={materials.accent} position={[0.59, 0.1, 0.2]}>
        <boxGeometry args={[0.04, 0.06, 2.6]} />
      </mesh>
      <mesh material={materials.accent} position={[-0.59, 0.1, 0.2]}>
        <boxGeometry args={[0.04, 0.06, 2.6]} />
      </mesh>
    </group>
  );
}

/** Regional airliner: longer fuselage, underslung engines, swept wing. */
export function AirlinerForm({ materials }: FormProps) {
  const fuselage = useFuselageGeometry(10.5, 0.7);
  const wing = useWingGeometry(4.4, 2, 1.3);
  const stabiliser = useWingGeometry(1.7, 0.95, 0.55);

  return (
    <group>
      <mesh geometry={fuselage} material={materials.shell} castShadow receiveShadow />
      <mesh position={[0, 0.28, 3.6]} material={materials.glass} scale={[0.9, 0.5, 1.5]}>
        <sphereGeometry args={[0.52, 16, 12]} />
      </mesh>
      <mesh position={[0.69, 0.2, 0.2]} material={materials.accent}>
        <boxGeometry args={[0.04, 0.09, 6]} />
      </mesh>
      <mesh position={[-0.69, 0.2, 0.2]} material={materials.accent}>
        <boxGeometry args={[0.04, 0.09, 6]} />
      </mesh>

      <mesh geometry={wing} material={materials.shell} position={[2.3, -0.3, -0.4]} castShadow />
      <mesh
        geometry={wing}
        material={materials.shell}
        position={[-2.3, -0.3, -0.4]}
        rotation={[0, Math.PI, 0]}
        castShadow
      />

      {[1.9, -1.9].map((x) => (
        <group key={x} position={[x, -0.62, 0.3]}>
          <mesh material={materials.dark} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.38, 0.34, 1.7, 16, 1, true]} />
          </mesh>
          <mesh material={materials.glass} position={[0, 0, 0.84]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.06, 16]} />
          </mesh>
        </group>
      ))}

      <mesh material={materials.shell} position={[0, 1.15, -4.4]} castShadow>
        <boxGeometry args={[0.12, 2.1, 1.5]} />
      </mesh>
      <mesh geometry={stabiliser} material={materials.shell} position={[1, 0.25, -4.6]} />
      <mesh
        geometry={stabiliser}
        material={materials.shell}
        position={[-1, 0.25, -4.6]}
        rotation={[0, Math.PI, 0]}
      />
      <mesh material={materials.accent} position={[0, 1.9, -4.4]}>
        <boxGeometry args={[0.13, 0.08, 1.1]} />
      </mesh>
    </group>
  );
}
