import type { Inr, IsoDate } from './common';

/** Postal address. One real office; no invented branches. */
export interface BusinessAddress {
  readonly street: string;
  readonly locality: string;
  readonly region: string;
  readonly postalCode: string;
  readonly country: string;
  readonly geo?: { readonly lat: number; readonly lng: number };
}

export interface BusinessContact {
  readonly phone: string;
  readonly phoneDisplay: string;
  readonly whatsapp: string;
  readonly whatsappUrl: string;
  readonly email: string;
}

export interface SiteIdentity {
  readonly name: string;
  readonly legalName: string;
  readonly url: string;
  readonly logo: string;
  readonly description: string;
  readonly locale: string;
  readonly languages: readonly string[];
}

/**
 * A published price.
 *
 * `null` is meaningful: the price is not published, and the page must render
 * an enquiry prompt rather than a number. There is no default figure.
 */
export interface PublishedPrice {
  readonly perSeat: Inr | null;
  readonly charter: Inr | null;
  readonly validUntil?: IsoDate;
}

/** The three-colour brand system. Nothing outside this palette. */
export interface BrandPalette {
  /** #071A2B — navigation, hero, footer, dark structure. */
  readonly midnight: string;
  /** #16B8D4 — accents, interactive states, CTA emphasis. Used sparingly. */
  readonly cyan: string;
  /** #F5F7F4 — content sections, editorial surfaces, long-form reading. */
  readonly ivory: string;
}
