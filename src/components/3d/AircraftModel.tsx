'use client';

import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import type { Group } from 'three';
import type { FleetSceneItem } from '@/data/fleet-scene';
import type { SceneConfig } from './sceneConfig';
import type { AviationMaterials } from './geometry/materials';
import {
  AirlinerForm,
  HelicopterForm,
  JetForm,
  TurbopropForm,
} from './geometry/AircraftForms';

/**
 * One aircraft in the world.
 *
 * Two render paths, chosen by the data:
 *
 *  - `modelPath` set  -> load that Draco-compressed GLB with `useGLTF`
 *  - `modelPath` null -> render the procedural form for the category
 *
 * Every entry is currently `null`, because no licensed GLB exists for this
 * project (docs/BUSINESS-DATA-REQUIRED G). The GLB branch is written and
 * typed so that adding assets is a data change; it is not exercised yet, and
 * the report says so rather than implying it is.
 *
 * Focus treatment is scale and vertical position only. No aircraft rotates
 * continuously: a parked aircraft that spins forever reads as a 3D demo, and
 * this is meant to read as a showroom.
 */
interface AircraftModelProps {
  readonly item: FleetSceneItem;
  readonly position: readonly [number, number, number];
  readonly active: boolean;
  readonly config: SceneConfig;
  readonly materials: AviationMaterials;
  /** Phase offset so neighbouring aircraft do not float in lockstep. */
  readonly phase: number;
}

function ProceduralForm({
  item,
  materials,
}: {
  item: FleetSceneItem;
  materials: AviationMaterials;
}) {
  switch (item.category) {
    case 'helicopter':
      return <HelicopterForm materials={materials} />;
    case 'turboprop':
      return <TurbopropForm materials={materials} />;
    case 'executive-airliner':
    case 'group-charter':
      return <AirlinerForm materials={materials} />;
    case 'private-jet':
      return <JetForm materials={materials} />;
  }
}

function GltfForm({ path }: { path: string }) {
  // `true` enables the Draco decoder path.
  const { scene } = useGLTF(path, true);
  return <primitive object={scene} />;
}

export function AircraftModel({
  item,
  position,
  active,
  config,
  materials,
  phase,
}: AircraftModelProps) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    const node = group.current;
    if (!node) return;

    // Focus is expressed spatially: the active aircraft is slightly larger and
    // sits a little higher, so it reads as nearer without the camera having to
    // travel further.
    const targetScale = item.scale * (active ? 1.06 : 0.9);
    const targetY = active ? 0 : -0.45;

    node.scale.x += (targetScale - node.scale.x) * 0.08;
    node.scale.y = node.scale.x;
    node.scale.z = node.scale.x;

    const float =
      config.floatAmplitude === 0
        ? 0
        : Math.sin(state.clock.elapsedTime * 0.55 + phase) * config.floatAmplitude;

    node.position.y += (targetY + float - node.position.y) * 0.06;
  });

  return (
    <group
      ref={group}
      position={[position[0], position[1], position[2]]}
      rotation={[item.rotation[0], item.rotation[1], item.rotation[2]]}
      scale={item.scale}
    >
      {item.modelPath ? (
        <GltfForm path={item.modelPath} />
      ) : (
        <ProceduralForm item={item} materials={materials} />
      )}
    </group>
  );
}
