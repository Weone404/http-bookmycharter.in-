import type { Faq } from './faq';
import type { AircraftCategory } from './aircraft';
import type { InternalLink, Path, Slug, VerifiedFact } from './common';

export type TripType = 'one-way' | 'round-trip' | 'multi-city';

/**
 * A city pair.
 *
 * Distance and flight time are the two figures most tempting to estimate and
 * most easily falsified, so both are `VerifiedFact` and both are optional:
 * a route page may ship describing the route without stating a number it
 * cannot support.
 */
export interface CharterRoute {
  readonly slug: Slug;
  readonly originSlug: Slug;
  readonly destinationSlug: Slug;
  readonly originCity: string;
  readonly destinationCity: string;
  /** Answer-first opening sentence. */
  readonly summary: string;
  readonly intro: readonly string[];
  readonly distanceKm?: VerifiedFact<number>;
  readonly typicalFlightTimeMinutes?: VerifiedFact<number>;
  /** Named departure and arrival facilities, by aerodrome name. */
  readonly originAerodromes: readonly string[];
  readonly destinationAerodromes: readonly string[];
  readonly suitableCategories: readonly AircraftCategory[];
  readonly charterConsiderations: readonly string[];
  /** Which cost drivers actually bite on this pair — not a generic list. */
  readonly pricingFactors: readonly string[];
  readonly tripTypeNotes: Partial<Record<TripType, string>>;
  readonly groundTransferNotes?: readonly string[];
  readonly faqs: readonly Faq[];
  readonly related: readonly InternalLink[];
  readonly canonical: Path;
}
