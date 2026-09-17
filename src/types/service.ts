import type { Faq } from './faq';
import type { AircraftCategory, MissionType } from './aircraft';
import type { InternalLink, Path, Slug } from './common';

export type ServiceCluster = 'private-charter' | 'helicopter-charter' | 'services' | 'chardham';

/** One step of the visible request-to-flight process. */
export interface ProcessStep {
  readonly title: string;
  readonly description: string;
}

/**
 * A cost driver, explained. The pricing system explains HOW a number is built;
 * it publishes a number only where a real one exists, so this carries no
 * amount at all.
 */
export interface PricingFactor {
  readonly factor: string;
  readonly explanation: string;
}

export interface Service {
  readonly slug: Slug;
  readonly cluster: ServiceCluster;
  readonly name: string;
  /** Answer-first: what this is, in one quotable sentence. */
  readonly summary: string;
  readonly definition: readonly string[];
  readonly whoItIsFor: readonly string[];
  readonly whenToUseIt: readonly string[];
  readonly howItWorks: readonly ProcessStep[];
  readonly suitableCategories: readonly AircraftCategory[];
  readonly missions: readonly MissionType[];
  readonly considerations: readonly string[];
  readonly pricingFactors: readonly PricingFactor[];
  readonly faqs: readonly Faq[];
  readonly related: readonly InternalLink[];
  readonly canonical: Path;
  readonly parent?: Path;
}
