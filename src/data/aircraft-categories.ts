import type { AircraftCategory } from '@/types/aircraft';
import type { Faq } from '@/types/faq';
import type { InternalLink, Path, Slug } from '@/types/common';

/**
 * Category hub content.
 *
 * Each of these answers a different question — "which jet class", "which
 * helicopter for this terrain", "why a turboprop at all" — so the three pages
 * share a template and share none of their reasoning.
 */
export interface AircraftCategoryPage {
  readonly slug: Slug;
  readonly category: AircraftCategory;
  readonly title: string;
  /** Answer-first. */
  readonly summary: string;
  readonly intro: readonly string[];
  readonly choosing: { readonly heading: string; readonly points: readonly string[] };
  readonly faqs: readonly Faq[];
  readonly related: readonly InternalLink[];
  readonly canonical: Path;
}

export const AIRCRAFT_CATEGORY_PAGES: readonly AircraftCategoryPage[] = [
  {
    slug: 'private-jets',
    category: 'private-jet',
    title: 'Private Jets for Charter',
    summary:
      'Private jets are graded by cabin class — light, midsize, large-cabin and ultra-long-range — and the class you need is decided by sector length and passenger count, not by preference.',
    intro: [
      'The step between one cabin class and the next is the largest single cost decision in jet charter. It is larger than the difference between two aircraft within a class, larger than routing, and larger than almost anything else you can change. Choosing the class correctly is therefore most of the work.',
      'Light jets carry four to six people on sectors of roughly one to three hours. The cabin is not tall enough to stand in, and baggage volume runs out before weight does. For a small party on a regional sector, this is the efficient answer.',
      'Midsize jets add standing height and range. This is where a working flight becomes genuinely workable — documents open, a conversation, people moving about — and it is the most heavily chartered class worldwide for exactly that reason.',
      'Large-cabin and ultra-long-range jets exist for sectors long enough that passengers will properly work or sleep, and for trips where a fuel stop would undo the point of chartering at all. On a domestic Indian sector they are capability nobody uses.',
    ],
    choosing: {
      heading: 'How to choose the class',
      points: [
        'Under two hours with four to six people: a light jet, or a turboprop if the airfield is short',
        'Two to four hours with six to eight: a midsize jet with a stand-up cabin',
        'Long sectors where people must work or rest: large-cabin',
        'Intercontinental without a fuel stop: ultra-long-range',
        'Check the runway at both ends before settling on any of it',
      ],
    },
    faqs: [
      {
        question: 'What is the difference between a light jet and a midsize jet?',
        answer: 'A light jet carries four to six people on shorter sectors in a cabin you cannot stand up in; a midsize jet adds standing height, more range and more baggage volume, at a meaningfully higher hourly cost.',
      },
      {
        question: 'Does a bigger jet always cost more?',
        answer: 'Per hour, generally yes — but a faster aircraft completes the sector in less time, so on a long trip the comparison is between hourly rate and hours flown rather than rate alone.',
      },
    ],
    related: [
      { label: 'Private Jet Charter', href: '/private-charter/private-jet-charter', description: 'How jet charter works' },
      { label: 'Turboprops', href: '/aircraft/turboprops', description: 'When a jet is the wrong answer' },
      { label: 'Charter Pricing', href: '/pricing', description: 'What drives the number' },
    ],
    canonical: '/aircraft/private-jets',
  },
  {
    slug: 'helicopters',
    category: 'helicopter',
    title: 'Helicopters for Charter',
    summary:
      'Helicopter selection is driven by the landing site and the air it will be flying in — altitude, temperature, obstacles and site size matter more than cabin preference.',
    intro: [
      'For aeroplanes, the airport decides a great deal. For helicopters, the site decides almost everything, and the air above it decides the rest. Density altitude — the combination of elevation and temperature — reduces rotor lift and engine power together, so the same helicopter that lifts a full load from Delhi at dawn may not lift it from a Himalayan helipad at midday.',
      'The single-versus-twin distinction is the next filter. Twins widen what is permissible over water, over built-up areas and at night, and they carry more. Singles are cheaper to operate and, in certain high-altitude designs, better at exactly the mountain work that twins struggle with.',
      'Cabin size is the last consideration rather than the first, and it is worth being honest about baggage early: light helicopters have very little space for it, and discovering that at the helipad is a poor time to find out.',
    ],
    choosing: {
      heading: 'How to choose',
      points: [
        'High-altitude or hot-and-high sites: a type designed for that, not the most comfortable one',
        'Over cities, over water or at night: a twin, subject to the approval the operation needs',
        'Larger parties or equipment: a medium twin with a flat-floor cabin',
        'Cost-sensitive daylight transfers between easy sites: a light single',
        'State your baggage honestly — it constrains light helicopters more than passenger count does',
      ],
    },
    faqs: [
      {
        question: 'Why does altitude change which helicopter can be used?',
        answer: 'Thinner air at altitude reduces both the lift the rotor produces and the power the engine makes, and high temperature reduces both further, so the load a helicopter can lift falls as elevation and temperature rise.',
      },
      {
        question: 'Is a twin-engine helicopter safer than a single?',
        answer: 'A second engine adds redundancy and widens where the aircraft may legally operate — over built-up areas, over water and at night — but the operating rules, not a general claim, are what differ.',
      },
    ],
    related: [
      { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'How rotary charter works' },
      { label: 'Private Helicopter Charter', href: '/helicopter-charter/private-helicopter-charter', description: 'Point-to-point hire' },
      { label: 'Char Dham by Helicopter', href: '/chardham', description: 'High-altitude Himalayan operations' },
    ],
    canonical: '/aircraft/helicopters',
  },
  {
    slug: 'turboprops',
    category: 'turboprop',
    title: 'Turboprops for Charter',
    summary:
      'Turboprops are the right aircraft for short sectors and short runways, which describes a large proportion of charter flying within India.',
    intro: [
      'A jet is inefficient on a short trip. On a 250-mile sector it spends most of the flight climbing and descending and barely reaches the cruise where its efficiency lives. A turboprop, designed to work at lower altitudes and shorter distances, often arrives within a few minutes of the jet for considerably less money.',
      'Runways are the other half of the argument, and in India it is frequently the decisive half. Plants, project sites and district airfields commonly have runway lengths, surfaces or approach facilities that exclude jets outright. A turboprop is not the compromise choice at these destinations — it is the only aircraft that can land.',
      'The trade is speed and cabin. Above roughly two hours the jet’s advantage compounds into real time saved, and turboprops fly lower, which means more exposure to weather en route.',
    ],
    choosing: {
      heading: 'When a turboprop is the better answer',
      points: [
        'Sectors under roughly an hour, where jet economics do not work',
        'Airfields with short or unpaved runways, or limited approach aids',
        'Destinations with restricted facilities where a jet cannot be handled',
        'Trips combining passengers with equipment or awkward loads',
        'Cost-sensitive regional travel where arrival time barely differs',
      ],
    },
    faqs: [
      {
        question: 'Is a turboprop slower than a jet?',
        answer: 'Yes in cruise, but on sectors under about an hour the difference in arrival time is small, because so much of a short flight is spent climbing and descending rather than cruising.',
      },
      {
        question: 'Are turboprops less comfortable?',
        answer: 'Cabins in this class are smaller than a comparable jet’s, but modern turboprops are pressurised and quiet enough for normal conversation; the more noticeable difference is cabin height and width.',
      },
    ],
    related: [
      { label: 'Aircraft Charter', href: '/private-charter/aircraft-charter', description: 'Choosing across categories' },
      { label: 'Private Jets', href: '/aircraft/private-jets', description: 'When speed over distance wins' },
      { label: 'Charter Pricing', href: '/pricing', description: 'Comparing categories on cost' },
    ],
    canonical: '/aircraft/turboprops',
  },
];

export function categoryPageBySlug(slug: string): AircraftCategoryPage | undefined {
  return AIRCRAFT_CATEGORY_PAGES.find((c) => c.slug === slug);
}
