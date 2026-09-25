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
      'Private jets for charter come in four sizes, from light jets for four to six people on short trips to ultra-long-range jets that fly between continents. The right size depends on how far you fly and how many people travel.',
    intro: [
      'Moving up one jet size is the biggest cost decision in jet charter. It matters more than the choice between two jets of the same size. It also matters more than routing, and more than almost anything else you can change. So choosing the right size is most of the work.',
      'A light jet carries four to six people on flights of roughly one to three hours. You cannot stand up inside, and baggage space runs out before the weight limit does. For a small group on a regional flight, a light jet is the efficient choice.',
      'A midsize jet adds standing height and more range. This is where you can truly work on board: documents open, a conversation, people moving about. That is why it is the most chartered jet size worldwide.',
      'Large-cabin and ultra-long-range jets are for flights long enough that passengers will properly work or sleep. They also suit trips where a fuel stop would defeat the point of chartering. On a domestic flight within India, their extra capability goes unused.',
    ],
    choosing: {
      heading: 'How to choose the right jet size',
      points: [
        'Under two hours, four to six people: a light jet, or a turboprop if the runway is short',
        'Two to four hours, six to eight people: a midsize jet you can stand up in',
        'Long flights where people must work or rest: a large-cabin jet',
        'Between continents without a fuel stop: an ultra-long-range jet',
        'Runways at both ends: check them before you settle on any jet',
      ],
    },
    faqs: [
      {
        question: 'What is the difference between a light jet and a midsize jet?',
        answer:
          'A light jet carries four to six people on shorter flights in a cabin you cannot stand up in, while a midsize jet adds standing height, more range and more baggage space at a noticeably higher hourly cost.',
      },
      {
        question: 'Does a bigger private jet always cost more to charter?',
        answer:
          'Per hour, usually yes, but a faster jet finishes the trip in fewer hours, so on a long trip you should compare the hourly rate multiplied by the hours flown, not the rate alone.',
      },
      {
        question: 'How do I choose between private jets for charter?',
        answer:
          'Choose by trip length and group size: a light jet for four to six people under two hours, a midsize jet for six to eight people on two to four hours, and a large-cabin jet for long flights.',
        elaboration: [
          'Check the runway at both ends first. If the airfield is short, a turboprop may be the only aircraft that can land there.',
        ],
      },
    ],
    related: [
      {
        label: 'Private Jet Charter',
        href: '/private-charter/private-jet-charter',
        description: 'How private jet charter works',
      },
      {
        label: 'Turboprops',
        href: '/aircraft/turboprops',
        description: 'When a jet is the wrong choice',
      },
      { label: 'Charter Pricing', href: '/pricing', description: 'What sets the price of a trip' },
    ],
    canonical: '/aircraft/private-jets',
  },
  {
    slug: 'helicopters',
    category: 'helicopter',
    title: 'Helicopters for Charter',
    summary:
      'Helicopters for charter are chosen by the landing site and the air around it. Height, temperature, obstacles and site size matter more than the cabin.',
    intro: [
      'For planes, the airport decides a lot. For helicopters, the landing site decides almost everything, and the air above it decides the rest. Pilots call this density altitude (how thin the air is, from height and heat together). Thin air cuts rotor lift and engine power at the same time. So a helicopter that lifts a full load from Delhi at dawn may not lift it from a Himalayan helipad at midday.',
      'The next choice is one engine or two. A twin-engine helicopter may fly in more places: over water, over built-up areas and at night. Twins also carry more. Single-engine helicopters are cheaper to run. Some high-altitude single-engine designs are also better at the mountain work that twins find hard.',
      'Cabin size comes last, not first. Be honest about baggage early. Light helicopters have very little space for it, and the helipad is a bad place to find that out.',
    ],
    choosing: {
      heading: 'How to choose a helicopter',
      points: [
        'High-altitude or hot-and-high sites: a type built for them, not the most comfortable one',
        'Over cities, over water or at night: a twin, subject to the approval the flight needs',
        'Larger groups or equipment: a medium twin with a flat-floor cabin',
        'Budget daytime hops between easy sites: a light single-engine helicopter',
        'Baggage: state it honestly, as it limits light helicopters more than passenger numbers do',
      ],
    },
    faqs: [
      {
        question: 'Why does altitude change which helicopter I can charter?',
        answer:
          'Thinner air at height cuts both the lift from the rotor and the power from the engine, and heat cuts both further, so a helicopter can lift less as elevation and temperature rise.',
      },
      {
        question: 'Is a twin-engine helicopter safer than a single-engine one?',
        answer:
          'A second engine adds a backup and widens where the helicopter may legally fly, such as over built-up areas, over water and at night, but what differs is the operating rules, not a general safety claim.',
      },
      {
        question: 'Which helicopters for charter suit mountain flying?',
        answer:
          'For mountain flying, choose a helicopter designed for high altitude and heat, because some single-engine designs such as the Airbus H125 are better at mountain work than many twins.',
      },
    ],
    related: [
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'How helicopter charter works',
      },
      {
        label: 'Private Helicopter Charter',
        href: '/helicopter-charter/private-helicopter-charter',
        description: 'Point-to-point helicopter hire',
      },
      {
        label: 'Char Dham by Helicopter',
        href: '/chardham',
        description: 'High-altitude Himalayan flights',
      },
    ],
    canonical: '/aircraft/helicopters',
  },
  {
    slug: 'turboprops',
    category: 'turboprop',
    title: 'Turboprops for Charter',
    summary:
      'Turboprop charter is the right choice for short flights and short runways, which covers a large share of charter flying within India.',
    intro: [
      'A jet wastes much of its speed on a short trip. On a 250-mile flight, it spends most of the time climbing and descending. It barely reaches the cruise where it is efficient. A turboprop (a propeller plane with turbine engines) is built for lower heights and shorter distances. It often lands within a few minutes of the jet, for considerably less money.',
      'Runways are the other reason, and in India they often decide it. Plants, project sites and district airfields often have runway lengths, surfaces or approach aids that rule jets out completely. At these places a turboprop is not the compromise. It is the only aircraft that can land.',
      'The trade-off is speed and cabin size. Above roughly two hours, the jet’s speed saves real time. Turboprops also fly lower, so they meet more weather along the way.',
    ],
    choosing: {
      heading: 'When turboprop charter is the better choice',
      points: [
        'Flights under roughly an hour, where a jet does not pay off',
        'Airfields with short or unpaved runways, or few approach aids',
        'Destinations with limited facilities that cannot handle a jet',
        'Trips that carry equipment or awkward loads with passengers',
        'Budget regional travel where arrival time barely changes',
      ],
    },
    faqs: [
      {
        question: 'Is a turboprop slower than a jet?',
        answer:
          'Yes in cruise, but on flights under about an hour you arrive only a little later, because most of a short flight is spent climbing and descending rather than cruising.',
      },
      {
        question: 'Are turboprops less comfortable than private jets?',
        answer:
          'Turboprop cabins are smaller than a similar jet’s, but modern turboprops are pressurised and quiet enough for normal conversation, so the main difference you notice is cabin height and width.',
      },
      {
        question: 'When is turboprop charter cheaper than a jet?',
        answer:
          'Turboprop charter is often cheaper on flights under about an hour, because on a short trip a turboprop arrives within a few minutes of a jet for considerably less money.',
      },
    ],
    related: [
      {
        label: 'Aircraft Charter',
        href: '/private-charter/aircraft-charter',
        description: 'Choosing the right type of aircraft',
      },
      {
        label: 'Private Jets',
        href: '/aircraft/private-jets',
        description: 'When speed over distance wins',
      },
      {
        label: 'Charter Pricing',
        href: '/pricing',
        description: 'Comparing aircraft types on cost',
      },
    ],
    canonical: '/aircraft/turboprops',
  },
];

export function categoryPageBySlug(slug: string): AircraftCategoryPage | undefined {
  return AIRCRAFT_CATEGORY_PAGES.find((c) => c.slug === slug);
}
