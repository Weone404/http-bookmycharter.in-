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

/**
 * Answered 2026-09-22: both. Book My Charter operates some aircraft and
 * arranges the rest.
 *
 * `hybrid` is therefore the setting — but note what it does NOT switch on.
 * `mayClaimOwnInventory` and `mayClaimOwnCertification` stay false, because
 * "we operate some aircraft" is a statement about the company, while "our
 * fleet", "our pilots" and an AOC number are externally checkable claims that
 * need the operating permit number and the aircraft registrations behind them
 * (docs/BUSINESS-DATA-REQUIRED.md B1a). Until those arrive the site describes
 * the arranged half, which is true of every flight either way.
 *
 * When the documents land, the two flags flip here and an operated-aircraft
 * voice can be added — still one edit in this file, not a content rewrite.
 */
export const BUSINESS_MODEL: BusinessModel = 'hybrid';

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
    whatWeDo:
      'We operate charter flights planned around your route, schedule and passenger requirements.',
    aircraftPossessive: 'our aircraft',
    flownBy: 'flown by our crew',
    mayClaimOwnInventory: true,
    mayClaimOwnCertification: true,
  },
  arranger: {
    whatWeDo:
      'We arrange charter solutions based on your route, aircraft requirements and availability.',
    aircraftPossessive: 'aircraft available through our operator partners',
    flownBy: 'flown by DGCA-certified operators',
    mayClaimOwnInventory: false,
    mayClaimOwnCertification: false,
  },
  // The current setting. Operated and arranged aircraft are both described
  // the same way for now, because nothing here may imply which is which until
  // the registrations are verified.
  hybrid: {
    whatWeDo:
      'We arrange and coordinate charter solutions based on your route, aircraft requirements and availability.',
    aircraftPossessive: 'aircraft available for charter',
    flownBy: 'flown by DGCA-certified operators',
    mayClaimOwnInventory: false,
    mayClaimOwnCertification: false,
  },
  // Neutral and true under every model.
  unconfirmed: {
    whatWeDo:
      'We arrange charter solutions based on your route, aircraft requirements and availability.',
    aircraftPossessive: 'aircraft available for charter',
    flownBy: 'flown by DGCA-certified operators',
    mayClaimOwnInventory: false,
    mayClaimOwnCertification: false,
  },
};

export function voice(): Voice {
  return VOICES[BUSINESS_MODEL];
}
