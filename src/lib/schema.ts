import type { Faq } from '@/types/faq';
import type { Path } from '@/types/common';
import { ADDRESS, AREA_SERVED, CONTACT, SITE, SOCIAL, absoluteUrl } from './site';
import { breadcrumbTrail } from './routes';
import { voice } from './business-model';

/**
 * JSON-LD builders.
 *
 * Two rules, enforced by review not by types: every node must correspond to
 * something visible on the page, and nothing here may invent a rating, review,
 * price, availability, award or credential.
 */
type JsonLdNode = Record<string, unknown>;

/**
 * The organisation.
 *
 * `LocalBusiness` is claimed alongside `Organization` only because there is one
 * real office at a real address. No branches are implied.
 *
 * The sister property bookmychardham.in is NOT listed in `sameAs` until A1
 * confirms the two sites belong to the same legal entity. Asserting a
 * relationship that may not exist is the same error as denying one that does.
 */
export function organizationSchema(): JsonLdNode {
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: SITE.logo,
    description: voice().whatWeDo,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    ...(ADDRESS.geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: ADDRESS.geo.lat, longitude: ADDRESS.geo.lng } }
      : {}),
    areaServed: AREA_SERVED.map((name) => ({ '@type': 'Place', name })),
    availableLanguage: SITE.languages,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phone,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: SITE.languages,
    },
    ...(SOCIAL.length > 0 ? { sameAs: SOCIAL } : {}),
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}

export function webPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: Path;
}): JsonLdNode {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'en-IN',
  };
}

/**
 * A service.
 *
 * No `offers` node: an Offer without a real price is an invented price, and no
 * indicative charter rate is published yet (docs/BUSINESS-DATA-REQUIRED E2).
 */
export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: Path;
}): JsonLdNode {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType: name,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: AREA_SERVED.map((placeName) => ({ '@type': 'Place', name: placeName })),
    url: absoluteUrl(path),
  };
}

/** Breadcrumbs, built from the route registry so they match what is rendered. */
export function breadcrumbSchema(path: Path): JsonLdNode {
  const trail = breadcrumbTrail(path);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: trail.map((route, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: route.label,
      item: absoluteUrl(route.path),
    })),
  };
}

/**
 * FAQPage.
 *
 * Only ever emitted for questions rendered visibly on the same page. The
 * schema answer is the first sentence only — the elaboration stays on the page
 * where a reader can see it.
 */
export function faqSchema(faqs: readonly Faq[], path: Path): JsonLdNode | null {
  if (faqs.length === 0) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** Wrap nodes into a single @graph. One script tag per page, not five. */
export function graph(nodes: readonly (JsonLdNode | null)[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes.filter((node): node is JsonLdNode => node !== null),
  });
}
