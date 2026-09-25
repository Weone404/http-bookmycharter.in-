import type { Faq } from '@/types/faq';
import type { InternalLink, Path, Slug } from '@/types/common';
import type { AircraftCategory } from '@/types/aircraft';
import { AIRPORTS, AIRPORT_SOURCE, type AirportRecord } from './airports.generated';

/**
 * Destination hubs.
 *
 * A city page ships only when there is something true and specific to say about
 * chartering to or from it. The facility data below is sourced and attributed;
 * the reasoning around it is written per city. A template with the city name
 * swapped is not a page, and the twelve near-identical pages this rebuild
 * removed are why that rule is enforced rather than assumed.
 *
 * Cities beyond these two stay `planned` until their operating facts are
 * confirmed (docs/BUSINESS-DATA-REQUIRED D1 and D2).
 */
export interface DestinationPage {
  readonly slug: Slug;
  readonly city: string;
  readonly matchCity: string;
  readonly title: string;
  readonly summary: string;
  readonly body: readonly string[];
  readonly charterNotes: readonly string[];
  readonly suitableCategories: readonly AircraftCategory[];
  readonly faqs: readonly Faq[];
  readonly related: readonly InternalLink[];
  readonly canonical: Path;
}

export const DESTINATION_PAGES: readonly DestinationPage[] = [
  {
    slug: 'delhi',
    city: 'Delhi',
    matchCity: 'Delhi',
    title: 'Private Jet & Helicopter Charter in Delhi',
    summary:
      'Private jet charter in Delhi often has lower positioning costs (flying the aircraft to you), as more aircraft are based nearby. The airfield matters too.',
    body: [
      'Private jet charter in Delhi starts with one clear benefit. More aircraft are based within reach of Delhi than almost anywhere else in India. So positioning (flying the aircraft to your departure city) often costs less here than for the same trip from a smaller city. The drawback is that the main international airport is busy. A busy airport means taxi time, slot pressure (limited take-off and landing times) and handling costs that a quieter airfield does not have.',
      'Delhi has more than one aerodrome (airfield), and they are not interchangeable. The international airport takes the full range of aircraft and has full handling services. The smaller state and private airfields serve general aviation, and each has its own access rules and limits. The right one for your trip depends on the aircraft, the timing and what is actually available on the day. It is worth asking, not assuming.',
      'Helicopter charter from Delhi into the hills usually means two legs, not one. For Uttarakhand, Himachal or the Garhwal shrines, a plane first flies you to a valley airfield. A helicopter then covers the mountains beyond it, because there is no runway where you are actually going.',
      'Delhi is within easy business-jet range of most Indian cities, and within turboprop range of much of the north. That makes same-day return trips practical from here in a way they are not from every city. It is the most common reason companies charter from Delhi at all.',
    ],
    charterNotes: [
      'Positioning: often cheaper than from smaller cities, because more aircraft are based within reach',
      'Main airport: busy, so expect taxi time and higher handling costs than at a regional airfield',
      'Same-day returns: practical to most of northern and central India',
      'Hill trips: usually a plane leg plus a helicopter leg, not one aircraft',
      'Departure airfield: it changes cost and timing, so choose it rather than default to one',
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter', 'executive-airliner'],
    faqs: [
      {
        question: 'Which airport does private jet charter in Delhi use?',
        answer:
          'Private jet charter in Delhi can use the full-service international airport or a smaller state or private aerodrome, depending on the aircraft, the handling needed and what is available on your date.',
      },
      {
        question: 'Is private jet charter cheaper from Delhi than from other cities?',
        answer:
          'Often yes, because more aircraft are based within reach of Delhi, which cuts the positioning flights otherwise added to your quote, though the trip and the destination matter more than the departure city.',
      },
      {
        question: 'Can I book a helicopter charter from Delhi to the hills?',
        answer:
          'Usually as part of a two-leg trip, because most hill destinations have no runway, so you fly by plane to a valley airfield and then by helicopter, whose range over that terrain is limited.',
      },
    ],
    related: [
      {
        label: 'Private Charter',
        href: '/private-charter',
        description: 'How whole-aircraft hire works',
      },
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'How helicopter hire works',
      },
      {
        label: 'Char Dham by Helicopter',
        href: '/chardham',
        description: 'Himalayan helicopter trips from the north',
      },
      {
        label: 'Charter Pricing',
        href: '/pricing',
        description: 'Why positioning affects your price',
      },
    ],
    canonical: '/destinations/delhi',
  },
  {
    slug: 'mumbai',
    city: 'Mumbai',
    matchCity: 'Mumbai',
    title: 'Private Jet & Helicopter Charter in Mumbai',
    summary:
      'Private jet charter in Mumbai is shaped by slots and parking more than distance, because the main airport is busy and the city sits on a narrow peninsula.',
    body: [
      'Private jet charter in Mumbai works differently from most cities. The city runs along a narrow peninsula with little spare land. Its main airport is one of the most heavily used in the country. Parking a business aircraft there is a real constraint, not an afterthought. So on a trip out of Mumbai, slots (set take-off and landing times) and ground space often decide what is possible, more than the aircraft does.',
      'The main effect is on timing. At a busy airport, departure and arrival windows are less flexible than at a quiet one. A plan that assumes you can leave whenever you like may find that flexibility is not there. It is also why keeping the aircraft overnight can cost more here than elsewhere. Some operators prefer to fly the aircraft out after dropping you off, rather than leave it parked.',
      'Mumbai is well placed for flights along the west coast and into central India. Many of these are short enough that a turboprop is a real option, not just a jet. On a flight of under an hour from Mumbai, a turboprop often arrives within minutes of a jet for much less money.',
      'Helicopter charter in Mumbai is the usual way to reach places with no runway, such as coastal sites, project locations and event venues. The same site checks apply as anywhere else. The approach path, surface, permission and crowd control must all be confirmed before a date is fixed.',
    ],
    charterNotes: [
      'Slots and ground space: these limit you more than aircraft availability does',
      'Departure times: less flexible than at a quiet airfield',
      'Parking: can be costly, so flying the aircraft out is sometimes better than leaving it parked',
      'Short west-coast and central flights: often favour a turboprop over a jet',
      'Onward legs to places without runways: need a helicopter and a confirmed landing site',
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter'],
    faqs: [
      {
        question: 'Why is private jet charter timing less flexible in Mumbai?',
        answer:
          'Mumbai’s main airport is heavily used, so departure and arrival windows and ground space are tighter than at quieter airfields.',
      },
      {
        question: 'Is a jet or a turboprop better for a charter from Mumbai?',
        answer:
          'On flights under about an hour, which covers much of the west coast and central India, a turboprop usually arrives within minutes of a jet for considerably less, so the destination decides, not preference.',
      },
      {
        question: 'Can I book a helicopter charter in Mumbai to a coastal site?',
        answer:
          'Yes, as long as the landing site has a clear approach, a suitable surface, controlled surroundings and the needed permission, all confirmed during planning rather than on the day.',
      },
    ],
    related: [
      {
        label: 'Private Charter',
        href: '/private-charter',
        description: 'Hiring a whole aircraft',
      },
      {
        label: 'Aircraft Charter',
        href: '/private-charter/aircraft-charter',
        description: 'Turboprops on short flights',
      },
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'Reaching sites without runways',
      },
      { label: 'Charter Pricing', href: '/pricing', description: 'What sets the cost' },
    ],
    canonical: '/destinations/mumbai',
  },
];

export function destinationBySlug(slug: string): DestinationPage | undefined {
  return DESTINATION_PAGES.find((d) => d.slug === slug);
}

/** Facilities recorded for a city, straight from the sourced airport dataset. */
export function aerodromesForCity(city: string): readonly AirportRecord[] {
  const needle = city.toLowerCase();
  return AIRPORTS.filter((a) => a.city.toLowerCase().includes(needle));
}

export { AIRPORT_SOURCE };
