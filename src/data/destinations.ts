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
    title: 'Private Charter in Delhi',
    summary:
      'Delhi is the busiest starting point for charter in northern India, and the practical questions are which field you depart from and how much of your cost is positioning rather than flying.',
    body: [
      'Delhi is where a large share of northern Indian charter begins, and that has two consequences. The useful one is that more aircraft are based within reach of Delhi than of almost anywhere else in the country, so positioning costs on a Delhi departure are often lower than the same trip from a smaller city. The less useful one is that the main international airport is busy, and busy airports mean taxi time, slot pressure and handling costs that a quieter field does not carry.',
      'The city has more than one aerodrome, and they are not interchangeable. The international airport handles the full range of aircraft with full handling facilities; the smaller state and private fields serve general aviation and have their own access arrangements and constraints. Which one suits a given trip depends on the aircraft, the timing and what is actually available on the day, and it is a question worth asking rather than assuming.',
      'For journeys into the hills — Uttarakhand, Himachal, the Garhwal shrines — Delhi is usually the fixed-wing leg rather than the whole journey. The aircraft covers the distance to a valley airfield and a helicopter covers the terrain beyond it, because no runway exists where the trip is actually going.',
      'Regionally, Delhi sits within comfortable business-jet range of most Indian cities and within turboprop range of a great deal of the north. That makes same-day returns genuinely practical from here in a way they are not from every city, which is the single most common reason companies charter out of Delhi at all.',
    ],
    charterNotes: [
      'More aircraft based within reach means positioning is often cheaper than from smaller cities',
      'The main international airport is busy — expect taxi time and higher handling than a regional field',
      'Same-day returns to most of northern and central India are practical from here',
      'Hill destinations usually need a fixed-wing leg plus a helicopter leg, not one aircraft',
      'Departure field affects cost and timing, and is worth deciding rather than defaulting',
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter', 'executive-airliner'],
    faqs: [
      {
        question: 'Which airport do private charters use in Delhi?',
        answer:
          'Delhi has both a full-service international airport and smaller state and private aerodromes, and which is used depends on the aircraft, the handling required and what is available for the date.',
      },
      {
        question: 'Is charter cheaper from Delhi than from other cities?',
        answer:
          'Often, because more aircraft are based within reach, which reduces the positioning flights that would otherwise be added to the quote — though the trip itself and the destination matter more than the departure city.',
      },
      {
        question: 'Can I charter a helicopter from Delhi into the hills?',
        answer:
          'Most hill itineraries combine a fixed-wing sector to a valley airfield with a helicopter leg beyond it, because the destinations have no runway and the helicopter’s range over that terrain is limited.',
      },
    ],
    related: [
      { label: 'Private Charter', href: '/private-charter', description: 'How whole-aircraft hire works' },
      { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'Site-based rotary operations' },
      { label: 'Char Dham by Helicopter', href: '/chardham', description: 'Himalayan charter from the north' },
      { label: 'Charter Pricing', href: '/pricing', description: 'Why positioning matters' },
    ],
    canonical: '/destinations/delhi',
  },
  {
    slug: 'mumbai',
    city: 'Mumbai',
    matchCity: 'Mumbai',
    title: 'Private Charter in Mumbai',
    summary:
      'Mumbai is a constrained airport environment on a narrow peninsula, so charter here is shaped by slot pressure and parking more than by distance.',
    body: [
      'Mumbai’s geography does something unusual to charter. The city runs along a peninsula with limited land, its principal airport is among the most intensively used in the country, and parking a business aircraft there is a genuine constraint rather than an afterthought. On a trip out of Mumbai, the questions that decide feasibility are often about slots and ground space rather than about the aircraft.',
      'The practical effect is on timing. Departure and arrival windows at a congested airport are less elastic than at a quiet one, and an itinerary that assumes a flexible departure may find the flexibility is not there. It is also why an overnight stay for the aircraft can be more costly here than elsewhere, and why some operators prefer to position the aircraft out after dropping passengers rather than leaving it standing.',
      'Regionally, Mumbai is well placed for west-coast and central Indian sectors, and many of those are short enough that the turboprop-versus-jet question is genuinely open rather than obvious. On a sector of under an hour from Mumbai, a turboprop often arrives within minutes of a jet for materially less.',
      'For onward travel into places without runways — coastal sites, project locations, event venues — a helicopter leg is the usual answer, and the same site considerations apply as anywhere else: approach path, surface, permission and crowd control have to be real before a date is fixed.',
    ],
    charterNotes: [
      'Slot pressure and ground space are the binding constraints, not aircraft availability',
      'Departure windows are less flexible than at a quiet field',
      'Aircraft parking can be costly, so repositioning out is sometimes preferred to standing',
      'Short west-coast and central sectors often favour a turboprop over a jet',
      'Onward legs to sites without runways need a helicopter and a confirmed landing site',
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter'],
    faqs: [
      {
        question: 'Why is charter timing less flexible in Mumbai?',
        answer:
          'Because the principal airport is heavily used, so departure and arrival windows and ground space are constrained in a way they are not at quieter fields.',
      },
      {
        question: 'Is a jet or a turboprop better from Mumbai?',
        answer:
          'On sectors under about an hour — much of the west coast and central India — a turboprop usually arrives within minutes of a jet for considerably less, so the answer depends on the destination rather than on preference.',
      },
      {
        question: 'Can a helicopter be chartered from Mumbai to a coastal site?',
        answer:
          'Yes, provided the landing site has a clear approach, a suitable surface, controlled surroundings and the necessary permission — which are confirmed as part of planning, not on the day.',
      },
    ],
    related: [
      { label: 'Private Charter', href: '/private-charter', description: 'Whole-aircraft hire' },
      { label: 'Aircraft Charter', href: '/private-charter/aircraft-charter', description: 'Turboprops on short sectors' },
      { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'Reaching sites without runways' },
      { label: 'Charter Pricing', href: '/pricing', description: 'What drives the cost' },
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
