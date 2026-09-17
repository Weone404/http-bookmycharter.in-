import type { Faq } from './faq';
import type { AircraftCategory, MissionType } from './aircraft';
import type { InternalLink, Path, Slug, VerifiedFact } from './common';

export type AerodromeKind =
  | 'international-airport'
  | 'domestic-airport'
  | 'private-airport'
  | 'airstrip'
  | 'heliport'
  | 'helipad';

/**
 * A real, named facility. Everything checkable carries a source: codes, kind
 * and operating status are all things a reader can verify in minutes.
 */
export interface Aerodrome {
  readonly name: string;
  readonly kind: AerodromeKind;
  readonly iata?: VerifiedFact<string>;
  readonly icao?: VerifiedFact<string>;
  readonly city: string;
  readonly state: string;
  readonly operational: VerifiedFact<boolean>;
  readonly operator?: VerifiedFact<string>;
  /** Charter-relevant notes only where confirmed: FBO, slots, night ops. */
  readonly charterNotes?: readonly string[];
}

/**
 * A city hub. It ships only when its aerodromes are real and its operating
 * facts are verified — a template with the city name swapped is not a page.
 */
export interface Destination {
  readonly slug: Slug;
  readonly city: string;
  readonly state: string;
  /** Answer-first opening sentence. */
  readonly summary: string;
  readonly intro: readonly string[];
  readonly aerodromes: readonly Aerodrome[];
  readonly commonMissions: readonly MissionType[];
  readonly suitableCategories: readonly AircraftCategory[];
  /** Slugs of route pages that start or end here. */
  readonly routeSlugs: readonly Slug[];
  readonly groundTransferNotes?: readonly string[];
  readonly localConsiderations?: readonly string[];
  readonly faqs: readonly Faq[];
  readonly related: readonly InternalLink[];
  readonly canonical: Path;
}
