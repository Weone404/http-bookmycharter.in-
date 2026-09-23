import type { Path } from '@/types/common';
import type { AircraftCategory } from '@/types/aircraft';

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
      'A whole aircraft for your route and your schedule — light jets through to larger executive aircraft.',
    points: [
      'Departure time set by you, not by a timetable',
      'Direct routing to airports airlines do not serve',
      'Priced per trip, so cost per head falls with group size',
    ],
  },
  {
    title: 'Helicopter Charter',
    glyph: 'helicopter',
    href: '/helicopter-charter',
    summary:
      'Point-to-point movement where runways do not reach — city helipads, remote sites and mountain terrain.',
    points: [
      'Lands where fixed-wing aircraft cannot',
      'Suited to same-day site visits and short sectors',
      'Site permissions and helipad limits handled up front',
    ],
  },
  {
    title: 'Empty Legs',
    glyph: 'turboprop',
    href: '/empty-leg-charter',
    summary:
      'Aircraft repositioning without passengers. When the direction and date happen to match yours, the economics change.',
    points: [
      'Fixed date and route — flexibility sits with you, not the aircraft',
      'Subject to the original trip going ahead',
      'Worth watching if your plans can move',
    ],
  },
  {
    title: 'Charter Pricing',
    href: '/pricing',
    summary:
      'Every component that builds a charter quote, explained in full before you ask anyone for a number.',
    points: [
      'Aircraft category, flight time and positioning',
      'Landing, parking, handling and crew',
      'What actually moves the figure up or down',
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
    title: 'Tell us where you need to go',
    description:
      'Route, date, passenger count. That is enough to start. Anything you do not know yet — exact timing, return date, baggage — can follow.',
  },
  {
    step: '02',
    title: 'We identify suitable aircraft',
    description:
      'Not every aircraft fits every trip. Runway length, range, altitude, passenger count and baggage all narrow the field before price is even discussed.',
  },
  {
    step: '03',
    title: 'You receive options and pricing',
    description:
      'Each option comes with what it includes and what it does not, so two quotes can be compared on the same basis rather than on headline figures.',
  },
  {
    step: '04',
    title: 'You choose',
    description:
      'No pressure to take the first option. If none of them fit, say so — a different date or a nearby airport often changes the answer substantially.',
  },
  {
    step: '05',
    title: 'We coordinate the journey',
    description:
      'Airport and helipad coordination, ground transfers where needed, and a single point of contact from confirmation through to arrival.',
  },
];

export interface PricingFactorContent {
  readonly factor: string;
  readonly explanation: string;
}

export const PRICING_FACTORS: readonly PricingFactorContent[] = [
  {
    factor: 'Aircraft category',
    explanation:
      'A light jet, a mid-size jet and a twin-engine helicopter have different hourly economics before anything else is counted.',
  },
  {
    factor: 'Flight time',
    explanation:
      'Billed on block time — engine start to engine shutdown — not the straight-line distance between two cities.',
  },
  {
    factor: 'Positioning',
    explanation:
      'The flight that brings the aircraft to your departure point, and the one that takes it back. Often the biggest surprise on a one-way quote.',
  },
  {
    factor: 'Landing and parking',
    explanation:
      'Charged by the airport, and they vary widely. An overnight stop at a metro airport is not the same as one at a regional field.',
  },
  {
    factor: 'Ground handling',
    explanation:
      'Marshalling, steps, security, passenger handling and load coordination at each airport on the itinerary.',
  },
  {
    factor: 'Crew and duty',
    explanation:
      'Crew duty limits are a hard legal constraint. A long day may require a second crew or an overnight, and that is a cost, not a preference.',
  },
  {
    factor: 'Waiting time',
    explanation:
      'An aircraft holding on the ground for you is unavailable to anyone else. Long waits are quoted on total aircraft time.',
  },
  {
    factor: 'Taxes and statutory charges',
    explanation: 'Applied on top of the operating cost and varying with the nature of the flight.',
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
  readonly icon: 'private-jet' | 'helicopter' | 'mountain' | 'empty-leg' | 'corporate';
}

export const HOME_SERVICES: readonly HomeService[] = [
  {
    title: 'Private Jets',
    href: '/private-charter/private-jet-charter',
    icon: 'private-jet',
    summary: 'A whole jet for your route, your schedule and your party.',
  },
  {
    title: 'Helicopters',
    href: '/helicopter-charter',
    icon: 'helicopter',
    summary: 'Point-to-point where runways do not reach: helipads, sites and hills.',
  },
  {
    title: 'Char Dham & Kedarnath',
    href: '/chardham',
    icon: 'mountain',
    summary: 'A whole helicopter for the Char Dham circuit or Kedarnath.',
  },
  {
    title: 'Empty Legs',
    href: '/empty-leg-charter',
    icon: 'empty-leg',
    summary: 'Repositioning flights: how they work and when one is worth waiting for.',
  },
  {
    title: 'Corporate',
    href: '/services/corporate-charter',
    icon: 'corporate',
    summary: 'Executive teams, multi-city days and recurring business travel.',
  },
];

/** Aircraft groups shown as spec cards on the home page. */
export interface HomeAircraftGroup {
  readonly title: string;
  readonly category: AircraftCategory;
  readonly href: Path;
}

export const HOME_AIRCRAFT_GROUPS: readonly HomeAircraftGroup[] = [
  { title: 'Helicopters', category: 'helicopter', href: '/aircraft/helicopters' },
  { title: 'Turboprops', category: 'turboprop', href: '/aircraft/turboprops' },
  { title: 'Private Jets', category: 'private-jet', href: '/aircraft/private-jets' },
  { title: 'Regional Aircraft', category: 'executive-airliner', href: '/aircraft' },
];
