import type { InternalLink, Path, SiteImage, Slug, VerifiedFact } from './common';

export type AircraftCategory =
  | 'helicopter'
  | 'private-jet'
  | 'turboprop'
  | 'executive-airliner'
  | 'group-charter';

/**
 * Category-level mission fit, used to drive the fleet showroom and the
 * "suitable aircraft" blocks on service, route and destination pages.
 */
export type MissionType =
  | 'corporate'
  | 'leisure'
  | 'vvip'
  | 'wedding'
  | 'medical'
  | 'film-and-aerial'
  | 'pilgrimage'
  | 'group'
  | 'regional'
  | 'short-field';

/**
 * Specification values.
 *
 * `fleet-details.md` records typical civil/charter figures, which vary by
 * variant, options, weight, altitude and temperature. Those are TYPICAL, not
 * tail-specific, and every one carries its source so the page can say so.
 * A tail-specific figure requires an operator document.
 */
export interface AircraftSpecs {
  readonly passengerCapacity?: VerifiedFact<number>;
  /** Nautical miles. */
  readonly rangeNm?: VerifiedFact<number>;
  /** Knots true airspeed, typical cruise. */
  readonly cruiseSpeedKts?: VerifiedFact<number>;
  /** Cubic feet. */
  readonly baggageCuFt?: VerifiedFact<number>;
  readonly cabinHeightFt?: VerifiedFact<number>;
  readonly cabinLengthFt?: VerifiedFact<number>;
}

/**
 * Availability is a claim about the world and is never implied.
 * Absent means the page says nothing about availability at all.
 */
export type AvailabilityStatus = 'on-request' | 'subject-to-confirmation';

export interface Aircraft {
  readonly slug: Slug;
  readonly name: string;
  readonly manufacturer?: string;
  readonly category: AircraftCategory;
  /** Answer-first opening sentence for the aircraft page. */
  readonly summary: string;
  readonly description: readonly string[];
  readonly specs: AircraftSpecs;
  /** Whether figures are typical for the type or specific to one airframe. */
  readonly specsBasis: 'typical-for-type' | 'operator-confirmed';
  readonly missions: readonly MissionType[];
  readonly idealFor: readonly string[];
  /** Absent until licensed or owned photography exists. Never AI-generated. */
  readonly image?: SiteImage;
  /**
   * Key into the procedural 3D scene. Geometry is authored in code, so this
   * names a mesh builder, not a downloaded asset. Swappable for a GLB path
   * later behind the same key.
   */
  readonly sceneKey?: string;
  readonly availability?: AvailabilityStatus;
  readonly related: readonly InternalLink[];
  readonly canonical: Path;
}

export interface AircraftCategoryHub {
  readonly category: AircraftCategory;
  readonly slug: Slug;
  readonly title: string;
  readonly summary: string;
  readonly intro: readonly string[];
  readonly canonical: Path;
}
