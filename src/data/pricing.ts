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
      'The aircraft’s hourly rate is the biggest part of any charter price. The type of aircraft you choose sets the rough size of the bill before anything else is added.',
    whatMovesIt: [
      'Cabin class: light, midsize, large-cabin, ultra-long-range',
      'Helicopter type: single or twin, light or medium',
      'Turboprop versus jet for the same flight',
      'Age and specification of the individual aircraft',
    ],
    typicalSurprise:
      'Moving up or down one cabin class changes the price more than almost anything else. Picking the right class matters more than bargaining within one.',
  },
  {
    name: 'Block time (billed hours)',
    whatItIs:
      'Block time is the flying time you are billed for. It runs from engine start to engine stop, not from take-off to landing, and not from the straight-line distance between two cities.',
    whatMovesIt: [
      'Actual routing, which is rarely a straight line',
      'Taxi time at busy airports',
      'Holding and air traffic delays',
      'Winds on the day',
    ],
    typicalSurprise:
      'A flight listed as 55 minutes is almost never billed as 55 minutes. Block time counts everything from engine start.',
  },
  {
    name: 'Positioning',
    whatItIs:
      'Positioning is flying the aircraft to your departure city. If you are not flying back, it also covers flying the aircraft home to its base afterwards.',
    whatMovesIt: [
      'Where the aircraft is based compared with your departure airport',
      'Whether the trip is one-way or return',
      'Whether the operator has other work in your direction',
    ],
    typicalSurprise:
      'This is the usual reason two quotes for the same aircraft on the same route are far apart. Always ask where the aircraft is based.',
  },
  {
    name: 'Landing and parking',
    whatItIs:
      'Each airport charges a fee for landing and for the time the aircraft stays on the ground.',
    whatMovesIt: [
      'Airport type: metro airports cost more than regional airports',
      'Aircraft weight',
      'Overnight or multi-day parking',
      'Number of stops on the trip',
    ],
  },
  {
    name: 'Ground handling',
    whatItIs:
      'Ground handling is the airport service at each stop. It covers marshalling, steps, security, passenger handling, loading and paperwork.',
    whatMovesIt: [
      'Which handling agent works at the airport',
      'Number of stops',
      'Out-of-hours operations',
      'Whether the airfield has handling facilities at all',
    ],
    typicalSurprise:
      'Some smaller airfields have little or no handling. That can mean arranging it specially or flying only at certain times.',
  },
  {
    name: 'Crew duty and overnights',
    whatItIs:
      'Crew duty limits are legal limits on how long a crew may work in a day. When a trip runs past them, it costs more.',
    whatMovesIt: [
      'Total length of the working day, not just flying time',
      'Early departures and late returns',
      'Number of flights in the day',
      'Whether the crew must stay overnight away from base',
    ],
    typicalSurprise:
      'A day that looks easy can go past the crew’s duty limit once ground time is counted. Then you need a second crew or an overnight stop.',
  },
  {
    name: 'Waiting time',
    whatItIs:
      'Waiting time is charged while the aircraft stays on the ground for you. It is booked for your trip, so no one else can use it.',
    whatMovesIt: [
      'Length of a meeting, site visit or ceremony',
      'Whether the aircraft flies back to base and returns instead of waiting',
      'Helicopter trips in particular, where ground time is often longer than flying time',
    ],
    typicalSurprise:
      'On event and site-visit trips, waiting is often the largest single line in the quote. It can cost more than the flying itself.',
  },
  {
    name: 'Taxes and statutory charges',
    whatItIs: 'Taxes and government levies are added on top of the operating cost.',
    whatMovesIt: [
      'Type of flight',
      'Domestic versus international flights',
      'Rates in force at the time of the flight',
    ],
  },
  {
    name: 'International permits',
    whatItIs:
      'A flight abroad needs overflight and landing permits, clearances and handling that a domestic flight does not.',
    whatMovesIt: [
      'Countries flown over and landed in',
      'Notice given: permits take time to issue',
      'Crew and passenger documents',
    ],
    typicalSurprise:
      'Paying more cannot speed up a permit. For an international charter, plan early first and think about cost second.',
  },
];

export const PRICING_FAQS: readonly Faq[] = [
  {
    question: 'How much does a private jet charter cost in India?',
    answer:
      'Private jet charter cost in India depends on aircraft category, billed hours, positioning, landing and parking, ground handling, crew duty, waiting time, taxes and any international permits.',
    elaboration: [
      'We do not publish a headline hourly rate. A rate without positioning, handling and ground time is not the price of a trip. It is the price of one part of it.',
      'Two operators quoting the same aircraft on the same route can be far apart on positioning alone.',
    ],
  },
  {
    question: 'How much does a helicopter charter cost in India?',
    answer:
      'Helicopter charter cost is usually the helicopter type’s hourly rate times total aircraft time, plus positioning, landing and helipad charges, crew needs, ground waiting time and taxes.',
    elaboration: [
      'Waiting time matters most on helicopter trips. A helicopter held at a site for a four-hour event is booked for four hours. That usually costs more than the minutes spent flying.',
    ],
  },
  {
    question: 'Is charter price per hour the full price of the trip?',
    answer:
      'No. The hourly rate is only one part of the price, because positioning, airport fees, handling, crew overnights, waiting time and taxes are added on top.',
    elaboration: [
      'That is why a low hourly rate can still lead to a high trip price. Ask for every part of the quote, not just the rate.',
    ],
  },
  {
    question: 'Why is a one-way charter not half the price of a return?',
    answer:
      'A one-way charter is not half price because the aircraft must still fly to you and usually back to base, so you pay for flights that carry no passengers.',
  },
  {
    question: 'Why do two quotes for the same aircraft differ so much?',
    answer:
      'Two quotes for the same aircraft usually differ because of positioning: an aircraft already near you has fewer empty flights to cover than one flown across the country.',
    elaboration: [
      'The next most common reason is what the quote includes. A quote without handling, waiting time or taxes will look cheaper than a complete one for the same trip.',
      'Ask each operator to list the same items before you compare.',
    ],
  },
  {
    question: 'Can I get a fixed charter price rather than an estimate?',
    answer:
      'Most charter quotes are firm for the trip as described, with possible extras such as more waiting, longer crew duty, de-icing or a route change named in advance.',
  },
  {
    question: 'Does the charter price change if fewer people travel?',
    answer:
      'No. Charter is priced for the whole aircraft, so fewer passengers do not lower the cost, and the cost per person falls as your group grows.',
  },
];
