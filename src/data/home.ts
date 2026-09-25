import type { Path } from '@/types/common';
import type { AircraftCategory } from '@/types/aircraft';
import type { SiteImageName } from '@/data/site-images.generated';

/** Content for the home page. No copy lives inside a component. */

export interface CharterCategory {
  readonly title: string;
  readonly href: Path;
  readonly summary: string;
  readonly points: readonly string[];
  /** Silhouette, set only where one is genuinely accurate for the card. */
  readonly glyph?: AircraftCategory;
}

export const CHARTER_CATEGORIES: readonly CharterCategory[] = [
  {
    title: 'Private Charter',
    glyph: 'private-jet',
    href: '/private-charter',
    summary:
      'Hire a whole aircraft for your route and your schedule, from light jets to larger executive aircraft.',
    points: [
      'Departure time set by you, not by a timetable',
      'Direct flights to airports airlines do not serve',
      'Priced per trip, so the cost per person falls as your group grows',
    ],
  },
  {
    title: 'Helicopter Charter',
    glyph: 'helicopter',
    href: '/helicopter-charter',
    summary:
      'Fly point to point where runways do not reach: city helipads, remote sites and mountain terrain.',
    points: [
      'Lands where planes cannot',
      'Suited to same-day site visits and short flights',
      'Site permissions and helipad limits checked up front',
    ],
  },
  {
    title: 'Empty Legs',
    glyph: 'turboprop',
    href: '/empty-leg-charter',
    summary:
      'An empty leg is an aircraft flying without passengers to reposition. When its route and date match yours, the price can drop.',
    points: [
      'Fixed date and route, so you need to be flexible',
      'Only flies if the original trip goes ahead',
      'Worth watching if your plans can move',
    ],
  },
  {
    title: 'Charter Pricing',
    href: '/pricing',
    summary: 'Every part of a charter quote, explained before you ask anyone for a number.',
    points: [
      'Aircraft type, flight time and positioning',
      'Landing, parking, handling and crew',
      'What makes the price go up or down',
    ],
  },
];

export interface ProcessStepContent {
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

export const HOW_IT_WORKS: readonly ProcessStepContent[] = [
  {
    step: '01',
    title: 'Tell us your route, date and group size',
    description:
      'Route, date and number of passengers is enough to start. Anything you do not know yet, like exact timing, return date or baggage, can follow later.',
  },
  {
    step: '02',
    title: 'We find aircraft that fit your trip',
    description:
      'Not every aircraft suits every trip. Runway length, range, altitude, passenger count and baggage narrow the choice before price comes up.',
  },
  {
    step: '03',
    title: 'You get options and a charter quote',
    description:
      'Each option shows what is included and what is not. That way you can compare two quotes fairly, not just on the headline figure.',
  },
  {
    step: '04',
    title: 'You choose',
    description:
      'There is no pressure to take the first option. If none fit, tell us. A different date or a nearby airport often changes the answer a lot.',
  },
  {
    step: '05',
    title: 'We coordinate your journey',
    description:
      'We handle airport and helipad coordination and ground transfers where needed. You have one point of contact from booking to arrival.',
  },
];

export interface PricingFactorContent {
  readonly factor: string;
  readonly explanation: string;
}

export const PRICING_FACTORS: readonly PricingFactorContent[] = [
  {
    factor: 'Aircraft type',
    explanation:
      'A light jet, a mid-size jet and a twin-engine helicopter each cost a different amount per hour, before anything else is added.',
  },
  {
    factor: 'Flight time',
    explanation:
      'Charged on block time (engine start to engine stop), not the straight-line distance between two cities.',
  },
  {
    factor: 'Positioning',
    explanation:
      'Positioning means flying the aircraft to your departure point, and back to base afterwards. It is often the biggest surprise on a one-way quote.',
  },
  {
    factor: 'Landing and parking',
    explanation:
      'Airports set these charges, and they vary widely. An overnight stop at a metro airport costs more than one at a regional airfield.',
  },
  {
    factor: 'Ground handling',
    explanation:
      'Marshalling, steps, security, passenger handling and loading at each airport on your trip.',
  },
  {
    factor: 'Crew and duty',
    explanation:
      'Crew duty limits are a legal rule, not a preference. A long day may need a second crew or an overnight stop, and that adds cost.',
  },
  {
    factor: 'Waiting time',
    explanation:
      'While an aircraft waits on the ground for you, no one else can use it. Long waits are quoted on total aircraft time.',
  },
  {
    factor: 'Taxes and statutory charges',
    explanation: 'Added on top of the operating cost. They vary with the type of flight.',
  },
];

/**
 * The five services on the home page, directly under the hero, in the same
 * order as the header. Each is one click to its page. Copy is a plain
 * restatement of what that page covers — no claims the page does not make.
 */
export interface HomeService {
  readonly title: string;
  readonly href: Path;
  readonly summary: string;
  readonly image: SiteImageName;
}

export const HOME_SERVICES: readonly HomeService[] = [
  {
    title: 'Private Jets',
    href: '/private-charter/private-jet-charter',
    image: 'service-private-jets',
    summary: 'Hire a whole private jet for your route, your schedule and your group.',
  },
  {
    title: 'Helicopters',
    href: '/helicopter-charter',
    image: 'service-helicopters',
    summary: 'Book a helicopter for places runways do not reach: helipads, sites and hills.',
  },
  {
    title: 'Char Dham & Kedarnath',
    href: '/chardham',
    image: 'service-himalaya',
    summary: 'A private helicopter for the Char Dham circuit or a Kedarnath trip.',
  },
  {
    title: 'Empty Legs',
    href: '/empty-leg-charter',
    image: 'service-empty-legs',
    summary: 'One-way repositioning flights: how they work and when one is worth the wait.',
  },
  {
    title: 'Corporate',
    href: '/services/corporate-charter',
    image: 'service-corporate',
    summary: 'Corporate charter for executive teams, multi-city days and regular business travel.',
  },
];
