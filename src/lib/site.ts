import type { BrandPalette, BusinessAddress, BusinessContact, SiteIdentity } from '@/types/site';

/**
 * SINGLE SOURCE OF TRUTH for Book My Charter.
 *
 * Every page, metadata block and JSON-LD node reads from here. Never hardcode a
 * brand name, phone number, address or price anywhere else.
 *
 * Nothing in this file may say "Book My CharDham". That is a different property
 * with a different primary intent — see docs/IA.md section 0.
 */
export const SITE: SiteIdentity = {
  name: 'Book My Charter',
  legalName: 'Book My Charter',
  url: 'https://bookmycharter.in',
  logo: 'https://bookmycharter.in/logo.svg',
  description:
    'Book My Charter arranges private jet, helicopter and aircraft charter across India. Compare aircraft, see what a charter costs, and request a quote for your trip.',
  locale: 'en_IN',
  languages: ['English', 'Hindi'],
};

/**
 * NAP. Verified and shared with the sister property, because it is the same
 * business — see docs/IA.md section 0. We do not fabricate a second phone
 * number to make two domains look unrelated; we separate them by intent and
 * content instead.
 */
export const CONTACT: BusinessContact = {
  phone: '+919355611996',
  phoneDisplay: '+91 93556 11996',
  whatsapp: '919355611996',
  whatsappUrl: 'https://wa.me/919355611996',
  email: 'info@bookmycharter.in',
};

export const ADDRESS: BusinessAddress = {
  street: 'C-705, Sector 7, Block C',
  locality: 'Palam Extension, Dwarka',
  region: 'Delhi',
  postalCode: '110077',
  country: 'IN',
  geo: { lat: 28.6149, lng: 77.0218 },
};

/**
 * Where charter is arranged. India-wide, because this property is not the
 * Uttarakhand pilgrimage property. International is listed only once B4 is
 * answered.
 */
export const AREA_SERVED: readonly string[] = ['India'];

/** The three-colour system. Nothing outside these and tonal variations. */
export const BRAND: BrandPalette = {
  midnight: '#0B1726',
  cyan: '#1F5FD6',
  ivory: '#F4F6F9',
};

/**
 * The sister property. Declared so the relationship is represented accurately
 * rather than hidden: same organisation, different primary intent.
 */
export const SISTER_SITE = {
  name: 'Book My CharDham',
  url: 'https://www.bookmychardham.in',
  purpose: 'Char Dham and Kedarnath pilgrimage helicopter services',
} as const;

/** Social profiles for `sameAs`. Empty until real profiles are confirmed (A6). */
export const SOCIAL: readonly string[] = [];

/** Format an INR figure the Indian way. */
export function formatInr(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

/** Build a wa.me link with a page-specific prefilled message. */
export function whatsappLink(message: string): string {
  return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return path === '/' ? SITE.url : `${SITE.url}${path}`;
}
