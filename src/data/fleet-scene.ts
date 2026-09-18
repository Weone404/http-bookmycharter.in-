import type { AircraftCategory } from '@/types/aircraft';
import { PUBLISHED_AIRCRAFT, type ResolvedAircraft } from './aircraft';

/**
 * The fleet world, derived from the aircraft data rather than hand-placed.
 *
 * Positions are computed from the index and the viewport's spacing, so adding
 * an aircraft to the data adds it to the scene, and nothing about the layout
 * lives in JSX.
 *
 * `modelPath` is where a licensed GLB would go. None exists, so every entry is
 * `null` and `AircraftModel` renders the procedural form for the category.
 * The field exists so that dropping assets in later is a data change, not a
 * component rewrite.
 */
export interface FleetSceneItem {
  readonly slug: string;
  readonly name: string;
  readonly category: AircraftCategory;
  /** Draco-compressed GLB under /models, or null while none exists. */
  readonly modelPath: string | null;
  readonly scale: number;
  readonly rotation: readonly [number, number, number];
  readonly aircraft: ResolvedAircraft;
}

/** Per-category presentation. Helicopters sit higher and read smaller than jets. */
const PRESENTATION: Record<AircraftCategory, { scale: number; yaw: number }> = {
  helicopter: { scale: 0.92, yaw: -0.42 },
  'private-jet': { scale: 0.86, yaw: -0.38 },
  turboprop: { scale: 0.9, yaw: -0.4 },
  'executive-airliner': { scale: 0.62, yaw: -0.35 },
  'group-charter': { scale: 0.62, yaw: -0.35 },
};

/**
 * The showroom's aircraft, in a deliberate order: one helicopter, then jets,
 * then a turboprop, so consecutive stops look different from each other.
 */
const SHOWROOM_ORDER: readonly string[] = [
  'airbus-h145',
  'cessna-citation-cj2',
  'cessna-citation-xls',
  'super-king-air-b200',
  'dassault-falcon-2000',
  'airbus-h125',
  'global-6000',
];

function toSceneItem(aircraft: ResolvedAircraft): FleetSceneItem {
  const presentation = PRESENTATION[aircraft.category];
  return {
    slug: aircraft.slug,
    name: aircraft.name,
    category: aircraft.category,
    modelPath: null,
    scale: presentation.scale,
    rotation: [0, presentation.yaw, 0],
    aircraft,
  };
}

export const FLEET_SCENE: readonly FleetSceneItem[] = SHOWROOM_ORDER.map((slug) =>
  PUBLISHED_AIRCRAFT.find((a) => a.slug === slug),
)
  .filter((a): a is ResolvedAircraft => a !== undefined)
  .map(toSceneItem);

/** World X position of a stop. Spacing is viewport-dependent. */
export function stopPosition(index: number, spacing: number): readonly [number, number, number] {
  return [index * spacing, 0, 0];
}
