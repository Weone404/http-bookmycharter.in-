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
      'Private aviation planned around your route, schedule and passengers. Compare aircraft, understand what a charter costs, and request a quote.',
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
    title: 'Private Charter India',
    description:
      'Charter a private jet, turboprop or executive aircraft anywhere in India. How private charter works, which aircraft suits your trip, and what drives the cost.',
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
    title: 'Private Jet Charter India',
    description:
      'Private jet charter across India: how it works, which jet category suits your route and passenger count, what affects the price, and how to request a quote.',
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
    title: 'Aircraft Charter Services India',
    description:
      'Aircraft charter for business, leisure and group travel in India. Choosing between jets, turboprops and larger aircraft, and how a charter is arranged.',
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
    title: 'Helicopter Charter India',
    description:
      'Helicopter charter across India for point-to-point transfers, corporate movement, events and aerial work. How it works and what it costs.',
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
    title: 'Private Helicopter Charter India',
    description:
      'Charter a private helicopter in India for point-to-point travel, including helipad access, typical mission profiles and pricing factors.',
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
    title: 'Helicopter Rental India',
    description:
      'Helicopter rental by the hour or by the mission in India: how rental differs from a point-to-point charter, and what is included.',
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
    title: 'Aircraft & Fleet',
    description:
      'Browse aircraft available for charter in India — private jets, helicopters and turboprops — with capacity, range and the missions each suits.',
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
    title: 'Private Jets for Charter',
    description:
      'Private jet categories available for charter in India, from light jets to long-range aircraft, and how to match one to your route.',
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
    title: 'Helicopters for Charter',
    description:
      'Helicopter types available for charter in India, with seating, typical missions and the terrain each is suited to.',
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
    title: 'Turboprops for Charter',
    description:
      'Turboprop aircraft available for charter in India, and why they suit short runways and regional sectors.',
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
    title: 'Charter Services',
    description:
      'Charter services for corporate travel, weddings, medical transfers, film and aerial work, events and luxury travel logistics.',
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
    title: 'Corporate Charter India',
    description:
      'Corporate air charter for executive teams and recurring business travel in India, including multi-city days and cost control.',
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
    title: 'Helicopter Flower Dropping',
    description:
      'Aerial flower showering by helicopter for weddings, temple events and public ceremonies, including permissions, timing and safety limits.',
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
    title: 'Charter Pricing Explained',
    description:
      'What a private jet or helicopter charter costs in India, and every component that builds the number: aircraft, flight time, positioning, handling, crew and taxes.',
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
    title: 'Empty Leg Flights India',
    description:
      'What an empty leg is, why empty legs exist, how availability actually works, and when a repositioning flight is worth waiting for.',
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
    title: 'How Charter Booking Works',
    description:
      'From enquiry to departure: how a charter request becomes aircraft options, a confirmed price and a coordinated flight.',
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
    title: 'Charter Destinations in India',
    description:
      'Airport and helipad access hubs for charter across India, with the aircraft, routes and missions each city supports.',
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
    title: 'Charter Routes',
    description:
      'Commercially common charter city pairs in India, with suitable aircraft, airports and the factors that move the price.',
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
    title: 'Char Dham by Private Helicopter Charter',
    description:
      'Chartering a whole helicopter for Char Dham: aircraft, routing, positioning and the operating limits of Himalayan helipads.',
    label: 'Chardham',
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
    title: 'Kedarnath Helicopter Charter',
    description:
      'Private helicopter charter to Kedarnath: the helipads used, altitude and weather limits, and how a private charter differs from a shuttle seat.',
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
    title: 'Aviation Insights',
    description:
      'Guides to charter pricing, aircraft selection, empty legs and how private aviation works in India.',
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
    title: 'About Book My Charter',
    description:
      'Who Book My Charter is, how charter is arranged, and how we describe what we can and cannot verify.',
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
    title: 'Contact',
    description: 'Speak to Book My Charter about a charter requirement, by phone, WhatsApp or email.',
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
    title: 'Request a Charter',
    description:
      'Tell us your route, date and passenger count and receive suitable aircraft options with pricing.',
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
    description: 'How Book My Charter handles the information you submit with a charter request.',
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
    description: 'The terms on which this website and its charter request service are provided.',
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
