/**
 * B1 — the highest-priority unresolved business dependency.
 *
 * Book My Charter may operate its own aircraft (A), arrange charter through
 * verified NSOP operator partners (B), or both (C). The site's entire voice
 * depends on which. Until it is confirmed in docs/BUSINESS-DATA-REQUIRED.md,
 * the application uses neutral wording that is true under all three models.
 *
 * Changing the model later is a one-line edit here, not a content rewrite:
 * every possessive phrase on the site is resolved through `voice()`.
 */
export type BusinessModel = 'operator' | 'arranger' | 'hybrid' | 'unconfirmed';

export const BUSINESS_MODEL: BusinessModel = 'unconfirmed';

/**
 * Phrases that are only true under a specific model. Never hardcode these in a
 * component — "our fleet", "our pilots", "our certifications" and their kin are
 * factual claims about who holds the operating certificate.
 */
interface Voice {
  /** How the company describes what it does, in one clause. */
  readonly whatWeDo: string;
  /** How an aircraft offered through the site is referred to. */
  readonly aircraftPossessive: string;
  /** How the flying party is referred to. */
  readonly flownBy: string;
  /** Whether the UI may present availability as owned inventory. */
  readonly mayClaimOwnInventory: boolean;
  /** Whether the UI may say "our" of certificates and approvals. */
  readonly mayClaimOwnCertification: boolean;
}

const VOICES: Record<BusinessModel, Voice> = {
  operator: {
    whatWeDo: 'We operate charter flights planned around your route, schedule and passenger requirements.',
    aircraftPossessive: 'our aircraft',
    flownBy: 'flown by our crew',
    mayClaimOwnInventory: true,
    mayClaimOwnCertification: true,
  },
  arranger: {
    whatWeDo: 'We arrange charter solutions based on your route, aircraft requirements and availability.',
    aircraftPossessive: 'aircraft available through our operator partners',
    flownBy: 'flown by DGCA-certified operators',
    mayClaimOwnInventory: false,
    mayClaimOwnCertification: false,
  },
  hybrid: {
    whatWeDo: 'We arrange and coordinate charter solutions based on your route, aircraft requirements and availability.',
    aircraftPossessive: 'aircraft available for charter',
    flownBy: 'flown by DGCA-certified operators',
    mayClaimOwnInventory: false,
    mayClaimOwnCertification: false,
  },
  // Neutral and true under every model. This is the current setting.
  unconfirmed: {
    whatWeDo: 'We arrange charter solutions based on your route, aircraft requirements and availability.',
    aircraftPossessive: 'aircraft available for charter',
    flownBy: 'flown by DGCA-certified operators',
    mayClaimOwnInventory: false,
    mayClaimOwnCertification: false,
  },
};

export function voice(): Voice {
  return VOICES[BUSINESS_MODEL];
}
