import type { Faq } from '@/types/faq';

/**
 * The pricing page.
 *
 * It publishes the METHOD, not a figure. No indicative rate has been verified
 * (docs/BUSINESS-DATA-REQUIRED E2), and a "from ₹X" number invented to win a
 * search result is the exact practice this rebuild removed from the old site.
 * A page that explains how the number is built can rank, and be cited, without
 * containing a single price.
 */
export interface CostComponent {
  readonly name: string;
  readonly whatItIs: string;
  readonly whatMovesIt: readonly string[];
  readonly typicalSurprise?: string;
}

export const COST_COMPONENTS: readonly CostComponent[] = [
  {
    name: 'Aircraft category',
    whatItIs:
      'The hourly operating basis of the aircraft itself — the largest single variable in any quote, and the one that sets the order of magnitude before anything else is added.',
    whatMovesIt: [
      'Cabin class: light, midsize, large-cabin, ultra-long-range',
      'Helicopter type: single or twin, light or medium',
      'Turboprop versus jet for the same sector',
      'Age and specification of the individual aircraft',
    ],
    typicalSurprise:
      'The step between cabin classes is larger than almost anything else you can change about the trip. Getting the class right matters more than negotiating within one.',
  },
  {
    name: 'Block time',
    whatItIs:
      'The billed flying time, measured engine start to engine shutdown rather than wheels-up to wheels-down, and rather than the straight-line distance between two cities.',
    whatMovesIt: [
      'Actual routing, which is rarely the direct line',
      'Taxi time at busy airports',
      'Holding and air traffic delays',
      'Winds on the day',
    ],
    typicalSurprise:
      'A sector advertised as 55 minutes is almost never billed as 55 minutes. Block time includes everything from engine start.',
  },
  {
    name: 'Positioning',
    whatItIs:
      'The flight that brings the aircraft to your departure point, and the flight that returns it to base afterwards if you are not coming back.',
    whatMovesIt: [
      'Where the aircraft is based relative to your departure airport',
      'Whether the trip is one-way or return',
      'Whether the operator has other work in your direction',
    ],
    typicalSurprise:
      'This is the usual reason two quotes for an identical aircraft on an identical route differ substantially. Always ask where the aircraft is based.',
  },
  {
    name: 'Landing and parking',
    whatItIs: 'Charges levied by each airport for landing and for time on the ground.',
    whatMovesIt: [
      'Airport category — metro airports cost more than regional fields',
      'Aircraft weight',
      'Overnight or multi-day parking',
      'Number of stops in the itinerary',
    ],
  },
  {
    name: 'Ground handling',
    whatItIs:
      'Marshalling, steps, security, passenger handling, load coordination and the paperwork at each airport on the itinerary.',
    whatMovesIt: [
      'Which handling agent operates at the airport',
      'Number of stops',
      'Out-of-hours operations',
      'Whether the airfield has handling facilities at all',
    ],
    typicalSurprise:
      'Some secondary airfields have limited or no handling, which can mean arranging it specially or operating at restricted times.',
  },
  {
    name: 'Crew duty and overnights',
    whatItIs:
      'The cost consequence of crew duty limits, which are a legal constraint on how long a crew may work.',
    whatMovesIt: [
      'Total duty length of the day, not just flying time',
      'Early departures and late returns',
      'Number of sectors',
      'Whether an overnight away from base is required',
    ],
    typicalSurprise:
      'An itinerary that looks manageable can exceed a duty day once ground time is counted, requiring a second crew or an overnight stop.',
  },
  {
    name: 'Waiting time',
    whatItIs:
      'Time the aircraft is held on the ground for you, charged because the aircraft is committed to your trip and unavailable to anyone else.',
    whatMovesIt: [
      'Length of a meeting, site visit or ceremony',
      'Whether the aircraft returns to base and comes back instead of waiting',
      'Helicopter missions in particular, where ground time often exceeds flying time',
    ],
    typicalSurprise:
      'On event and site-visit missions this is frequently the largest single line in the quote, larger than the flying itself.',
  },
  {
    name: 'Taxes and statutory charges',
    whatItIs: 'Applicable taxes and statutory levies, applied on top of the operating cost.',
    whatMovesIt: [
      'Nature of the flight',
      'Domestic versus international sectors',
      'Applicable rates at the time of the flight',
    ],
  },
  {
    name: 'International requirements',
    whatItIs:
      'Overflight and landing permits, clearances, and the handling arrangements a cross-border trip needs and a domestic one does not.',
    whatMovesIt: [
      'Countries overflown and landed in',
      'Notice given — permits have lead times',
      'Crew and passenger documentation',
    ],
    typicalSurprise:
      'Permits have lead times that cannot be compressed by paying more. International charter is a planning problem before it is a cost problem.',
  },
];

export const PRICING_FAQS: readonly Faq[] = [
  {
    question: 'How much does a private jet charter cost in India?',
    answer:
      'The cost of a private jet charter in India depends primarily on the aircraft category chartered, total block hours, positioning of the aircraft to your departure airport, landing and parking charges, ground handling, crew duty requirements, waiting time, taxes and any international permits the route requires.',
    elaboration: [
      'We do not publish a headline hourly rate, because a rate quoted without positioning, handling and ground time is not the price of a trip — it is the price of one component of it. Two operators quoting the same aircraft on the same route can differ substantially on positioning alone.',
    ],
  },
  {
    question: 'How much does a helicopter charter cost in India?',
    answer:
      'Helicopter charter is normally priced on total aircraft time at a rate set by the helicopter type, plus positioning to your start point, landing and helipad charges, crew requirements, ground waiting time and taxes.',
    elaboration: [
      'Waiting time deserves separate attention on helicopter missions. An aircraft held at a site for a four-hour event is committed for four hours, and that usually outweighs the flying minutes.',
    ],
  },
  {
    question: 'Why is a one-way charter not half the price of a return?',
    answer:
      'Because the aircraft still has to get to you and, in most cases, still has to return to its base afterwards — so a one-way trip often involves the same number of flown sectors as a return, with passengers on only one of them.',
  },
  {
    question: 'Why do two quotes for the same aircraft differ so much?',
    answer:
      'Most often because of positioning: an operator whose aircraft is already near your departure airport has fewer empty sectors to recover than one flying it across the country.',
    elaboration: [
      'The second most common reason is scope. A quote that excludes handling, waiting time or taxes will look cheaper than a complete one for the same trip. Ask each operator to itemise the same components before comparing.',
    ],
  },
  {
    question: 'Can I get a fixed price rather than an estimate?',
    answer:
      'Most charter quotes are firm for the itinerary as specified, with defined variables — additional ground waiting, extended duty, de-icing or a routing change — identified in advance rather than added afterwards.',
  },
  {
    question: 'Does the price change if fewer people travel?',
    answer:
      'No. Charter is priced for the aircraft, so removing passengers does not reduce the cost — which is also why cost per person falls as a group grows.',
  },
];
