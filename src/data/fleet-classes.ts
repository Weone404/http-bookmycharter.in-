import type { SiteImageName } from './site-images.generated';
import { AIRCRAFT, type ResolvedAircraft } from './aircraft';
import type { QuotePreset } from '@/components/booking/QuickCharterForm';

/**
 * Aircraft classes: the way people actually shop for charter ("a light jet",
 * "a helicopter"), rather than the five data categories.
 *
 * Jets are split by the industry's usual size classes. The split is by type,
 * not by our own figures, and the seats, range and speed shown for a class are
 * always computed from the types in it, so a class can never claim a figure
 * that no listed type has. A type missing from JET_CLASS falls back to
 * "midsize-jets" only if it is a private jet; everything else follows its
 * category.
 */
export type FleetClassId =
  | 'helicopters'
  | 'turboprops'
  | 'light-jets'
  | 'midsize-jets'
  | 'super-midsize-jets'
  | 'large-jets'
  | 'airliners';

const JET_CLASS: Record<string, FleetClassId> = {
  'beechcraft-hawker-400xp': 'light-jets',
  'beechcraft-premier-1a': 'light-jets',
  'bombardier-learjet-40': 'light-jets',
  'cessna-citation-cj1': 'light-jets',
  'cessna-citation-cj1-plus': 'light-jets',
  'cessna-citation-cj2': 'light-jets',
  'cessna-citation-cj2-plus': 'light-jets',
  'cessna-citation-ii': 'light-jets',
  'embraer-phenom-300': 'light-jets',
  'beechcraft-hawker-750xp': 'midsize-jets',
  'beechcraft-hawker-800xp': 'midsize-jets',
  'beechcraft-hawker-850xp': 'midsize-jets',
  'beechcraft-hawker-900xp': 'midsize-jets',
  'bombardier-learjet-45': 'midsize-jets',
  'bombardier-learjet-45xr': 'midsize-jets',
  'learjet-60': 'midsize-jets',
  'learjet-60xr': 'midsize-jets',
  'cessna-citation-iii': 'midsize-jets',
  'cessna-citation-xl': 'midsize-jets',
  'cessna-citation-xls': 'midsize-jets',
  'cessna-citation-xls-plus': 'midsize-jets',
  'beechcraft-hawker-4000': 'super-midsize-jets',
  'dassault-falcon-2000': 'super-midsize-jets',
  'embraer-legacy-600': 'large-jets',
  'embraer-legacy-650': 'large-jets',
  'global-6000': 'large-jets',
  'global-express-xrs': 'large-jets',
  'gulfstream-g550': 'large-jets',
  // An airliner-sized cabin, whatever the category label in the sheet.
  'embraer-erj-135-lr': 'airliners',
};

export function classOf(aircraft: ResolvedAircraft): FleetClassId {
  switch (aircraft.category) {
    case 'helicopter':
      return 'helicopters';
    case 'turboprop':
      return 'turboprops';
    case 'executive-airliner':
    case 'group-charter':
      return 'airliners';
    default:
      return JET_CLASS[aircraft.slug] ?? 'midsize-jets';
  }
}

export interface FleetClassMeta {
  readonly id: FleetClassId;
  /** "Light jets" */
  readonly label: string;
  /** Singular, for a badge: "Light jet" */
  readonly singular: string;
  /** One plain sentence: what it is and what it is for. */
  readonly description: string;
  readonly image: SiteImageName;
  /** Where "View all" goes: the compact list, filtered to this class. */
  readonly listHref: string;
  readonly quote: NonNullable<QuotePreset['aircraft']>;
}

export const FLEET_CLASS_META: readonly FleetClassMeta[] = [
  {
    id: 'helicopters',
    label: 'Helicopters',
    singular: 'Helicopter',
    description:
      'No runway needed. A helicopter can land at a helipad or suitable open ground once the site and permission are checked, so it suits short hops, hills, venues and places with no airport.',
    image: 'group-helicopters',
    listHref: '/aircraft/helicopters#types',
    quote: 'helicopter',
  },
  {
    id: 'light-jets',
    label: 'Light jets',
    singular: 'Light jet',
    description:
      'Small, fast jets for short city pairs of about one to three hours. You cannot stand up inside, but they are the most efficient way to fly a jet.',
    image: 'service-empty-legs',
    listHref: '/aircraft/private-jets?class=light-jets#types',
    quote: 'private-jet',
  },
  {
    id: 'midsize-jets',
    label: 'Midsize jets',
    singular: 'Midsize jet',
    description:
      'More cabin and range than a light jet. The usual choice for longer domestic flights with a small group.',
    image: 'service-private-jets',
    listHref: '/aircraft/private-jets?class=midsize-jets#types',
    quote: 'private-jet',
  },
  {
    id: 'super-midsize-jets',
    label: 'Super-midsize jets',
    singular: 'Super-midsize jet',
    description:
      'A wider cabin and longer range again, for long domestic sectors and regional international trips.',
    image: 'band-company',
    listHref: '/aircraft/private-jets?class=super-midsize-jets#types',
    quote: 'private-jet',
  },
  {
    id: 'large-jets',
    label: 'Large jets',
    singular: 'Large jet',
    description:
      'Long-range cabins built for flights long enough that you will work or sleep on board.',
    image: 'home-hero-desktop',
    listHref: '/aircraft/private-jets?class=large-jets#types',
    quote: 'private-jet',
  },
  {
    id: 'turboprops',
    label: 'Turboprops',
    singular: 'Turboprop',
    description:
      'Propeller planes that use short runways and smaller airfields. Often the lower-cost choice on shorter regional flights.',
    image: 'group-turboprops',
    listHref: '/aircraft/turboprops#types',
    quote: 'turboprop',
  },
  {
    id: 'airliners',
    label: 'Airliners',
    singular: 'Airliner',
    description:
      'Regional airliners for large groups: teams, delegations, events and wedding guests travelling together.',
    image: 'group-regional',
    listHref: '/aircraft?class=airliners#types',
    quote: 'group-charter',
  },
];

export const CLASS_META_BY_ID = new Map(FLEET_CLASS_META.map((c) => [c.id, c]));

type Range = { readonly min: number; readonly max: number };

function span(items: readonly ResolvedAircraft[], pick: (a: ResolvedAircraft) => Range | null) {
  const values = items.map(pick).filter((r): r is Range => r !== null);
  if (values.length === 0) return null;
  return {
    min: Math.min(...values.map((v) => v.min)),
    max: Math.max(...values.map((v) => v.max)),
  };
}

/** Indian digit grouping: 3,100. */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-IN');
}

export function formatSpan(range: Range | null, unit = ''): string | null {
  if (!range) return null;
  const value =
    range.min === range.max
      ? formatNumber(range.min)
      : `${formatNumber(range.min)}–${formatNumber(range.max)}`;
  return unit ? `${value} ${unit}` : value;
}

/** Nautical miles and knots, with the everyday metric version alongside. */
export function inKm(range: Range | null, factor: number, unit: string): string | null {
  if (!range) return null;
  const round = (v: number) => Math.round((v * factor) / 10) * 10;
  return formatSpan({ min: round(range.min), max: round(range.max) }, unit);
}
export const NM_TO_KM = 1.852;
export const KTS_TO_KMH = 1.852;

/** A serialisable summary a client component can take as a prop. */
export interface FleetClassSummary {
  readonly id: FleetClassId;
  readonly label: string;
  readonly singular: string;
  readonly description: string;
  readonly image: SiteImageName;
  readonly listHref: string;
  readonly quote: NonNullable<QuotePreset['aircraft']>;
  readonly count: number;
  readonly seats: string | null;
  readonly range: string | null;
  readonly rangeKm: string | null;
  readonly speed: string | null;
  readonly speedKmh: string | null;
  /** A few type names, so the card is concrete. */
  readonly examples: readonly string[];
}

export function fleetClasses(only?: readonly FleetClassId[]): readonly FleetClassSummary[] {
  return FLEET_CLASS_META.filter((meta) => !only || only.includes(meta.id)).flatMap((meta) => {
    const members = AIRCRAFT.filter((a) => classOf(a) === meta.id);
    if (members.length === 0) return [];
    const range = span(members, (a) => a.specs.rangeNm);
    const speed = span(members, (a) => a.specs.cruiseKts);
    return [
      {
        ...meta,
        count: members.length,
        seats: formatSpan(span(members, (a) => a.specs.passengers)),
        range: formatSpan(range, 'nm'),
        rangeKm: inKm(range, NM_TO_KM, 'km'),
        speed: formatSpan(speed, 'kts'),
        speedKmh: inKm(speed, KTS_TO_KMH, 'km/h'),
        examples: members
          .filter((a) => a.curated)
          .concat(members.filter((a) => !a.curated))
          .slice(0, 3)
          .map((a) => a.name),
      },
    ];
  });
}

/** One row of the compact list. Serialisable. */
export interface AircraftListItem {
  readonly slug: string;
  readonly name: string;
  readonly href: string;
  readonly classId: FleetClassId;
  readonly classLabel: string;
  readonly image: SiteImageName;
  readonly mirror: boolean;
  /** One short line: the type's own description, or its curated summary. */
  readonly blurb: string | null;
  readonly seats: string | null;
  readonly seatsMax: number | null;
  readonly range: string | null;
  readonly rangeKm: string | null;
  /**
   * Upper range as a share (0–100) of the longest range on the whole sheet,
   * for the comparison bar and the range sort. A share, not raw miles, so the
   * bar means the same thing on every page.
   */
  readonly rangePct: number | null;
  readonly speed: string | null;
  readonly speedKmh: string | null;
  /** km/h figures without the unit, for a narrow stat cell. */
  readonly speedKmhValue: string | null;
  readonly crew: string | null;
  readonly quote: NonNullable<QuotePreset['aircraft']>;
}

/**
 * Illustrations a card may use, per class, so a list of twelve midsize jets
 * is not twelve copies of one picture. Chosen per type by a stable hash of the
 * slug, so a card keeps its picture whatever the filter or sort.
 */
const CARD_IMAGES: Record<FleetClassId, readonly SiteImageName[]> = {
  helicopters: [
    'group-helicopters',
    'service-helicopters',
    'band-helicopter-charter',
    'service-himalaya',
  ],
  'light-jets': [
    'service-empty-legs',
    'service-private-jets',
    'group-private-jets',
    'og-background',
  ],
  'midsize-jets': [
    'service-private-jets',
    'band-private-charter',
    'group-private-jets',
    'band-corporate',
    'og-background',
    'service-empty-legs',
  ],
  'super-midsize-jets': ['band-company', 'home-hero-desktop'],
  'large-jets': ['home-hero-desktop', 'band-company', 'group-private-jets', 'band-corporate'],
  turboprops: ['group-turboprops'],
  airliners: ['group-regional'],
};

function hash(text: string): number {
  let h = 0;
  for (const char of text) h = (h * 31 + char.charCodeAt(0)) >>> 0;
  return h;
}

const LONGEST_RANGE = Math.max(1, ...AIRCRAFT.map((a) => a.specs.rangeNm?.max ?? 0));

export function listItems(items: readonly ResolvedAircraft[]): readonly AircraftListItem[] {
  return items.map((a) => {
    const classId = classOf(a);
    const meta = CLASS_META_BY_ID.get(classId);
    return {
      slug: a.slug,
      name: a.name,
      href: a.href,
      classId,
      classLabel: meta?.singular ?? '',
      image: (() => {
        const pool = CARD_IMAGES[classId];
        return pool[hash(a.slug) % pool.length] ?? meta?.image ?? 'band-aircraft';
      })(),
      mirror: hash(a.slug + ':m') % 2 === 1,
      blurb: a.sourceDescription ?? a.curated?.summary ?? null,
      seats: formatSpan(a.specs.passengers),
      seatsMax: a.specs.passengers?.max ?? null,
      range: formatSpan(a.specs.rangeNm, 'nm'),
      rangeKm: inKm(a.specs.rangeNm, NM_TO_KM, 'km'),
      rangePct: a.specs.rangeNm
        ? Math.max(4, Math.round((a.specs.rangeNm.max / LONGEST_RANGE) * 100))
        : null,
      speed: formatSpan(a.specs.cruiseKts, 'kts'),
      speedKmh: inKm(a.specs.cruiseKts, KTS_TO_KMH, 'km/h'),
      speedKmhValue: inKm(a.specs.cruiseKts, KTS_TO_KMH, ''),
      crew: formatSpan(a.specs.crew),
      quote: meta?.quote ?? 'private-jet',
    };
  });
}
