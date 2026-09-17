import { SITE, CONTACT, ADDRESS, AREA_SERVED, SEASON, SOCIAL } from './site';

const ORG_ID = `${SITE.url}/#organization`;

/** LocalBusiness / TravelAgency identity. Rendered on every page. */
export function organizationSchema() {
  return {
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: SITE.logo,
    image: SITE.logo,
    description: SITE.description,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: SITE.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ADDRESS.geo.lat,
      longitude: ADDRESS.geo.lng,
    },
    areaServed: AREA_SERVED.map((n) => ({ '@type': 'Place', name: n })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phone,
      contactType: 'reservations',
      availableLanguage: SITE.languages,
      areaServed: 'IN',
    },
    ...(SOCIAL.length ? { sameAs: SOCIAL } : {}),
  };
}

/** Service + Offer. Price omitted entirely when null - never publish a guess. */
export function serviceSchema({ name, description, path, price, priceType }) {
  const offer =
    price == null
      ? {
          '@type': 'Offer',
          url: `${SITE.url}${path}`,
          availability: 'https://schema.org/InStock',
          priceCurrency: 'INR',
          priceValidUntil: SEASON.priceValidUntil,
        }
      : {
          '@type': 'Offer',
          url: `${SITE.url}${path}`,
          availability: 'https://schema.org/InStock',
          priceCurrency: 'INR',
          price: String(price),
          priceValidUntil: SEASON.priceValidUntil,
          ...(priceType ? { description: priceType } : {}),
        };

  return {
    '@type': 'Service',
    '@id': `${SITE.url}${path}#service`,
    name,
    description,
    serviceType: name,
    provider: { '@id': ORG_ID },
    areaServed: AREA_SERVED.map((n) => ({ '@type': 'Place', name: n })),
    offers: offer,
  };
}

/** FAQPage. Answers MUST also be visible on the page in matching words. */
export function faqSchema(faqs, path) {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE.url}${path}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** items: [{ name, path }] - the current page included, last. */
export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export function webPageSchema({ name, description, path }) {
  return {
    '@type': 'WebPage',
    '@id': `${SITE.url}${path}#webpage`,
    url: `${SITE.url}${path}`,
    name,
    description,
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };
}

/** Compose a @graph document from the node list. */
export function graph(nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}
