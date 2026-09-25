import type { IsoDate, Path } from '@/types/common';

/**
 * THE ROUTE REGISTRY.
 *
 * One declaration per URL, consumed by navigation, the footer, breadcrumbs,
 * the sitemap, robots and every internal-link check. Nothing derives a URL by
 * string concatenation anywhere else, so the layers cannot drift apart.
 *
 * `status: 'planned'` means the route is designed but its page does not exist
 * yet: it is excluded from the sitemap, from robots and from navigation, and
 * link checks will flag anything pointing at it. A page is promoted to 'live'
 * only when it has genuine, verified content — see the launch tiers in
 * docs/IA.md.
 */
export type RouteCluster =
  | 'root'
  | 'private-charter'
  | 'helicopter-charter'
  | 'aircraft'
  | 'services'
  | 'destinations'
  | 'routes'
  | 'pricing'
  | 'empty-leg'
  | 'chardham'
  | 'insights'
  | 'company'
  | 'legal'
  | 'conversion';

export type RouteStatus = 'live' | 'planned';
export type NavPlacement = 'primary' | 'footer' | 'both' | 'none';
export type ChangeFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RouteEntry {
  readonly path: Path;
  /** Page title, without the brand suffix. */
  readonly title: string;
  readonly description: string;
  /** Short label for navigation and breadcrumbs. */
  readonly label: string;
  readonly cluster: RouteCluster;
  readonly parent?: Path;
  readonly nav: NavPlacement;
  readonly status: RouteStatus;
  readonly index: boolean;
  readonly priority: number;
  readonly changeFrequency: ChangeFrequency;
  readonly lastModified: IsoDate;
}

const TODAY: IsoDate = '2026-09-17';

export const ROUTES: readonly RouteEntry[] = [
  {
    path: '/',
    title: 'Private Jet & Helicopter Charter in India',
    description:
      'Book a private jet or helicopter charter anywhere in India. Compare aircraft, see what drives the cost, and get a charter quote for your route and date.',
    label: 'Home',
    cluster: 'root',
    nav: 'none',
    status: 'live',
    index: true,
    priority: 1.0,
    changeFrequency: 'weekly',
    lastModified: TODAY,
  },

  // ---------------------------------------------------------------- private charter
  {
    path: '/private-charter',
    title: 'Private Charter Flights in India',
    description:
      'Private charter means hiring a whole aircraft for your trip. See how it works in India, which aircraft fits your group, and what a charter flight costs.',
    label: 'Private Charter',
    cluster: 'private-charter',
    nav: 'both',
    status: 'live',
    index: true,
    priority: 0.9,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/private-charter/private-jet-charter',
    title: 'Private Jet Charter & Hire in India',
    description:
      'Hire a private jet in India. Light, midsize or large jet: which one suits your route and group, what the price depends on, and how to book in a few steps.',
    label: 'Private Jet Charter',
    cluster: 'private-charter',
    parent: '/private-charter',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.9,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/private-charter/aircraft-charter',
    title: 'Aircraft Charter Flights in India',
    description:
      'Charter a jet, turboprop or larger aircraft in India for business, family or group travel. Learn which aircraft fits your trip and how booking works.',
    label: 'Aircraft Charter',
    cluster: 'private-charter',
    parent: '/private-charter',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/private-charter/turboprop-charter',
    title: 'Turboprop Charter India',
    description:
      'Turboprop charter for regional and short-field routes in India, including where a turboprop beats a jet and what it costs to operate.',
    label: 'Turboprop Charter',
    cluster: 'private-charter',
    parent: '/private-charter',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/private-charter/group-charter',
    title: 'Group Charter Flights India',
    description:
      'Group charter for teams, delegations and large parties, including aircraft options above standard business-jet capacity.',
    label: 'Group Charter',
    cluster: 'private-charter',
    parent: '/private-charter',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/private-charter/international-charter',
    title: 'International Private Charter from India',
    description:
      'International charter departing India: permits, range, fuel stops and the planning that long-range charter requires.',
    label: 'International Charter',
    cluster: 'private-charter',
    parent: '/private-charter',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },

  // ------------------------------------------------------------- helicopter charter
  {
    path: '/helicopter-charter',
    title: 'Helicopter Charter & Booking in India',
    description:
      'Book a helicopter charter in India for city transfers, business trips, weddings, events and hill travel. How it works, what it costs, and what to check.',
    label: 'Helicopter Charter',
    cluster: 'helicopter-charter',
    nav: 'both',
    status: 'live',
    index: true,
    priority: 0.9,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/helicopter-charter/private-helicopter-charter',
    title: 'Private Helicopter Charter in India',
    description:
      'Book a private helicopter in India for point-to-point travel. Helipad rules, landing permissions, weather limits and what shapes the price, in plain words.',
    label: 'Private Helicopter Charter',
    cluster: 'helicopter-charter',
    parent: '/helicopter-charter',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.85,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/helicopter-charter/helicopter-rental',
    title: 'Helicopter Rental in India: Hourly Hire',
    description:
      'Rent a helicopter in India by the hour or by the day. How helicopter rental differs from a one-way charter, what the hire includes, and what it costs.',
    label: 'Helicopter Rental',
    cluster: 'helicopter-charter',
    parent: '/helicopter-charter',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/helicopter-charter/vvip-helicopter-charter',
    title: 'VVIP Helicopter Charter India',
    description:
      'VVIP and executive helicopter movement in India, including security-sensitive routing, cabin configuration and ground coordination.',
    label: 'VVIP Helicopter',
    cluster: 'helicopter-charter',
    parent: '/helicopter-charter',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.75,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/helicopter-charter/corporate-helicopter',
    title: 'Corporate Helicopter Charter India',
    description:
      'Corporate helicopter charter for site visits, plant inspections and same-day multi-city travel, and how recurring corporate movement is planned.',
    label: 'Corporate Helicopter',
    cluster: 'helicopter-charter',
    parent: '/helicopter-charter',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.75,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/helicopter-charter/wedding-helicopter',
    title: 'Wedding Helicopter Booking India',
    description:
      'Helicopter arrivals and transfers for weddings in India: venue helipad requirements, permissions, timing and what can go wrong.',
    label: 'Wedding Helicopter',
    cluster: 'helicopter-charter',
    parent: '/helicopter-charter',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.75,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/helicopter-charter/aerial-services',
    title: 'Aerial Services & Special Missions',
    description:
      'Aerial work by helicopter in India: survey, inspection, photography, sightseeing and special missions, and what each requires.',
    label: 'Aerial Services',
    cluster: 'helicopter-charter',
    parent: '/helicopter-charter',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },

  // ---------------------------------------------------------------------- aircraft
  {
    path: '/aircraft',
    title: 'Charter Aircraft in India: Types & Specs',
    description:
      'Compare private jets, helicopters and turboprops for charter in India. Seats, range and speed for each aircraft type, and the trips each one suits best.',
    label: 'Aircraft',
    cluster: 'aircraft',
    nav: 'both',
    status: 'live',
    index: true,
    priority: 0.9,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/aircraft/private-jets',
    title: 'Private Jets for Charter: Seats & Range',
    description:
      'Light, midsize and large private jets for charter in India. Compare seats, range and cruise speed, and find the right jet for your route and group size.',
    label: 'Private Jets',
    cluster: 'aircraft',
    parent: '/aircraft',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/aircraft/helicopters',
    title: 'Helicopters for Charter: Seats & Range',
    description:
      'Single-engine and twin-engine helicopters for charter in India. Compare seats, range and speed, and see which helicopter suits city, hill or mountain trips.',
    label: 'Helicopters',
    cluster: 'aircraft',
    parent: '/aircraft',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/aircraft/turboprops',
    title: 'Turboprops for Charter: Seats & Range',
    description:
      'Turboprop charter in India for short runways and regional routes. Compare seats and range, and see when a turboprop costs less than a jet for your trip.',
    label: 'Turboprops',
    cluster: 'aircraft',
    parent: '/aircraft',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },

  // ---------------------------------------------------------------------- services
  {
    path: '/services',
    title: 'Air Charter Services in India',
    description:
      'Air charter services in India for corporate travel, events and helicopter flower dropping. See what each service involves and how to plan it simply.',
    label: 'Services',
    cluster: 'services',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/services/corporate-charter',
    title: 'Corporate Jet & Helicopter Charter India',
    description:
      'Corporate charter in India for executive teams: multi-city days, site visits and regular business travel by private jet or helicopter, with costs explained.',
    label: 'Corporate Charter',
    cluster: 'services',
    parent: '/services',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/services/wedding-charter',
    title: 'Wedding Charter & Guest Travel',
    description:
      'Air charter for weddings in India: moving guests, the couple and the arrival itself, and the permissions each needs.',
    label: 'Wedding Charter',
    cluster: 'services',
    parent: '/services',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/services/medical-charter',
    title: 'Medical Charter & Air Ambulance',
    description:
      'Medical charter and air ambulance coordination in India, including the equipment, crew and timing such flights require.',
    label: 'Medical Charter',
    cluster: 'services',
    parent: '/services',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/services/aerial-photography-and-film',
    title: 'Aerial Photography & Film Charter',
    description:
      'Helicopter and aircraft charter for film shoots, aerial photography and survey work in India, and the permissions involved.',
    label: 'Film & Aerial Photography',
    cluster: 'services',
    parent: '/services',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/services/aerial-flower-dropping',
    title: 'Helicopter Flower Dropping (Pushpa Varsha)',
    description:
      'Helicopter flower dropping for weddings, temple events and ceremonies in India. Permissions, timing, safety limits and cost factors, explained simply.',
    label: 'Aerial Flower Dropping',
    cluster: 'services',
    parent: '/services',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.75,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/services/special-events',
    title: 'Event & Special Occasion Charter',
    description:
      'Charter for sporting events, product launches, rallies and large gatherings, including multi-aircraft coordination.',
    label: 'Special Events',
    cluster: 'services',
    parent: '/services',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.65,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/services/luxury-travel-logistics',
    title: 'Luxury Travel Logistics',
    description:
      'Ground transfers, airport coordination and destination logistics arranged around a charter flight.',
    label: 'Luxury Travel Logistics',
    cluster: 'services',
    parent: '/services',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.65,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },

  // ------------------------------------------------------- pricing, empty legs, how
  {
    path: '/pricing',
    title: 'Private Jet Charter Cost in India',
    description:
      'How much does a private jet or helicopter charter cost in India? See each part of the price: aircraft, billed hours, positioning, airport fees, crew, taxes.',
    label: 'Pricing',
    cluster: 'pricing',
    nav: 'both',
    status: 'live',
    index: true,
    priority: 0.9,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/empty-leg-charter',
    title: 'Empty Leg Flights India: How They Work',
    description:
      'Empty leg flights are one-way private jet trips flown to reposition an aircraft. Learn how empty legs work in India, when they save money and their limits.',
    label: 'Empty Legs',
    cluster: 'empty-leg',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.85,
    changeFrequency: 'weekly',
    lastModified: TODAY,
  },
  {
    path: '/how-it-works',
    title: 'How to Book a Private Jet or Helicopter',
    description:
      'How to book a private jet or helicopter charter in India, step by step: share your trip, compare aircraft options, confirm and fly on your schedule.',
    label: 'How It Works',
    cluster: 'company',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },

  // ------------------------------------------------------- destinations and routes
  {
    path: '/destinations',
    title: 'Private Jet Charter Destinations in India',
    description:
      'Private jet and helicopter charter destinations across India. Airports and helipads by city, and the aircraft and trips each place supports.',
    label: 'Destinations',
    cluster: 'destinations',
    nav: 'both',
    status: 'live',
    index: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/routes',
    title: 'Private Charter Routes in India',
    description:
      'Popular private charter routes in India and how a city pair is planned: which aircraft fits, which airports work, and what moves the charter price.',
    label: 'Routes',
    cluster: 'routes',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.75,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },

  // ---------------------------------------------------------------------- chardham
  {
    path: '/chardham',
    title: 'Private Char Dham Helicopter Charter',
    description:
      'Char Dham helicopter charter with a whole private helicopter. Himalayan helipads, weather and altitude limits, positioning and routing, explained simply.',
    label: 'Char Dham',
    cluster: 'chardham',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/chardham/kedarnath-helicopter',
    title: 'Private Kedarnath Helicopter Charter',
    description:
      'Private helicopter charter to Kedarnath: the helipads used, weather and altitude limits, and how a private charter differs from a shuttle seat.',
    label: 'Kedarnath Helicopter',
    cluster: 'chardham',
    parent: '/chardham',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/chardham/badrinath-helicopter',
    title: 'Badrinath Helicopter Charter',
    description:
      'Private helicopter charter to Badrinath, including the helipad, typical routing and the constraints of high-altitude operations.',
    label: 'Badrinath Helicopter',
    cluster: 'chardham',
    parent: '/chardham',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/chardham/do-dham-helicopter',
    title: 'Do Dham Helicopter Charter',
    description:
      'Kedarnath and Badrinath in one charter: how a two-dham itinerary is flown and what determines whether it fits in a day.',
    label: 'Do Dham Helicopter',
    cluster: 'chardham',
    parent: '/chardham',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },
  {
    path: '/chardham/travel-information',
    title: 'Char Dham Travel Information',
    description:
      'Season, weather, altitude and timing considerations that decide whether a Char Dham helicopter charter can fly on a given day.',
    label: 'Travel Information',
    cluster: 'chardham',
    parent: '/chardham',
    nav: 'footer',
    status: 'planned',
    index: true,
    priority: 0.65,
    changeFrequency: 'monthly',
    lastModified: TODAY,
  },

  // ---------------------------------------------------------------------- insights
  {
    path: '/insights',
    title: 'Private Jet & Helicopter Charter Guides',
    description:
      'Simple guides to private jet and helicopter charter in India: charter cost, empty legs, choosing an aircraft, and private jet vs commercial flights.',
    label: 'Insights',
    cluster: 'insights',
    nav: 'both',
    status: 'live',
    index: true,
    priority: 0.7,
    changeFrequency: 'weekly',
    lastModified: TODAY,
  },

  // ----------------------------------------------------------- company, legal, CTA
  {
    path: '/about',
    title: 'About Us: Charter Company in Delhi',
    description:
      'Book My Charter is a private jet and helicopter charter service in Dwarka, Delhi, arranging charter flights across India. How we work and what we claim.',
    label: 'About',
    cluster: 'company',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.5,
    changeFrequency: 'yearly',
    lastModified: TODAY,
  },
  {
    path: '/contact',
    title: 'Contact Us: Call, WhatsApp or Email',
    description:
      'Contact Book My Charter for a private jet or helicopter charter in India. Call, WhatsApp or email us with your route, date and number of passengers.',
    label: 'Contact',
    cluster: 'company',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.6,
    changeFrequency: 'yearly',
    lastModified: TODAY,
  },
  {
    path: '/request-a-charter',
    title: 'Request a Charter Quote',
    description:
      'Request a private jet or helicopter charter quote. Share your route, date and passengers, and get suitable aircraft options with a clear price breakdown.',
    label: 'Request a Charter',
    cluster: 'conversion',
    nav: 'none',
    status: 'live',
    // A form page has no search value and should not compete with the pages
    // that do. Followed, not indexed.
    index: false,
    priority: 0.4,
    changeFrequency: 'yearly',
    lastModified: TODAY,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy',
    description:
      'How Book My Charter collects, uses and protects the details you share in a private jet or helicopter charter request, and who can see them.',
    label: 'Privacy',
    cluster: 'legal',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.2,
    changeFrequency: 'yearly',
    lastModified: TODAY,
  },
  {
    path: '/terms',
    title: 'Terms of Use',
    description:
      'The terms of use for the Book My Charter website and its charter request service: what the site is, how to read its information, and aircraft availability.',
    label: 'Terms',
    cluster: 'legal',
    nav: 'footer',
    status: 'live',
    index: true,
    priority: 0.2,
    changeFrequency: 'yearly',
    lastModified: TODAY,
  },
];

const BY_PATH = new Map<string, RouteEntry>(ROUTES.map((r) => [r.path, r]));

export function getRoute(path: Path): RouteEntry | undefined {
  return BY_PATH.get(path);
}

/** Routes whose pages exist. The only ones eligible for sitemap or navigation. */
export function liveRoutes(): readonly RouteEntry[] {
  return ROUTES.filter((r) => r.status === 'live');
}

/** Live and indexable. What robots and the sitemap actually publish. */
export function indexableRoutes(): readonly RouteEntry[] {
  return ROUTES.filter((r) => r.status === 'live' && r.index);
}

export function childrenOf(path: Path): readonly RouteEntry[] {
  return ROUTES.filter((r) => r.parent === path && r.status === 'live');
}

/**
 * A page generated from a dynamic segment has no registry entry of its own —
 * one aircraft, one route, one article. It supplies its own label and parent so
 * the trail is still complete, rather than silently collapsing to "Home".
 */
export interface DynamicCrumb {
  readonly path: Path;
  readonly label: string;
  readonly parent: Path;
}

/** Breadcrumb trail from the home page down to `path`, inclusive. */
export function breadcrumbTrail(path: Path, dynamic?: DynamicCrumb): readonly RouteEntry[] {
  const trail: RouteEntry[] = [];

  let current = BY_PATH.get(path);
  if (!current && dynamic && dynamic.path === path) {
    // Synthesised leaf: carries only what a breadcrumb needs.
    trail.push({
      path: dynamic.path,
      title: dynamic.label,
      description: '',
      label: dynamic.label,
      cluster: 'root',
      parent: dynamic.parent,
      nav: 'none',
      status: 'live',
      index: true,
      priority: 0.5,
      changeFrequency: 'monthly',
      lastModified: TODAY,
    });
    current = BY_PATH.get(dynamic.parent);
  }

  while (current) {
    trail.unshift(current);
    current = current.parent ? BY_PATH.get(current.parent) : undefined;
  }

  const home = BY_PATH.get('/');
  if (home && trail[0]?.path !== '/') trail.unshift(home);
  return trail;
}

/** Top-level items for the primary navigation, in declaration order. */
export function primaryNav(): readonly RouteEntry[] {
  return ROUTES.filter((r) => (r.nav === 'primary' || r.nav === 'both') && r.status === 'live');
}
