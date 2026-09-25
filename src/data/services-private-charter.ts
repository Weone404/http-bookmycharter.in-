import type { Service } from '@/types/service';

/**
 * Service content.
 *
 * Every page here answers a different question. Where two pages would say the
 * same thing, one of them does not exist — the twelve near-identical pages this
 * rebuild removed are the reason that rule is written down.
 *
 * Nothing in this file states a price, a certification, an operator name, an
 * availability or a capability that has not been verified.
 */
export const PRIVATE_CHARTER_SERVICES: readonly Service[] = [
  // ============================================================ PRIVATE CHARTER
  {
    slug: 'private-charter',
    cluster: 'private-charter',
    name: 'Private Charter',
    keyword: 'private charter',
    headline: 'Private Charter Flights in India',
    summary:
      'Private charter means hiring a whole aircraft for one trip, so companies, groups and busy travellers choose the route, the departure time and who flies, not an airline.',
    definition: [
      'A private charter is one flight arranged for one party. You are not buying seats on a flight that would run anyway. The aircraft, the crew and the schedule exist for your trip and nobody else’s. Almost everything else about charter follows from that.',
      'When you charter a plane, it leaves when you are ready, not at a published time. It can use airports that airlines do not serve. And you pay for the aircraft, not per person. A jet that seats eight costs about the same whether two people board or eight. That is why the cost per person changes so sharply with group size.',
      'A private flight is planned, not just booked. Someone has to check that the aircraft can use both airports. They check that the crew can legally finish the day within crew duty limits (the legal cap on crew working hours). They also check that the aircraft will start in the right place, and that any permissions the route needs can be obtained. That planning is the main work of an air charter.',
    ],
    whoItIsFor: [
      'Companies sending several people to places airlines serve badly, or not at all',
      'Travellers covering more ground in a day than airline timetables allow',
      'Travellers who need to leave at a time no airline offers',
      'Groups large enough that the cost per person nears a premium airline fare',
      'Trips where privacy or discretion really matters',
    ],
    whenToUseIt: [
      'When your destination has no convenient airline flight',
      'When you must cover three or four cities in one working day',
      'When a day saved is worth more than the difference in fare',
      'When a group travels together and can share the aircraft cost',
      'When a fixed timetable makes the trip impossible, not just inconvenient',
    ],
    howItWorks: [
      {
        title: 'Define the trip',
        description:
          'Share the route, date, number of passengers and any time that cannot move. These four decide most of what follows.',
      },
      {
        title: 'Find what can fly it',
        description:
          'Runway length, aircraft range, passenger and baggage load, crew duty limits and airport opening hours narrow the choice before cost comes up.',
      },
      {
        title: 'Price the whole trip',
        description:
          'The price includes positioning (flying the aircraft to your city), handling at each stop and any overnight the schedule forces. A quote without these is not a real quote.',
      },
      {
        title: 'Confirm and coordinate',
        description:
          'Passenger details, ground arrangements and one point of contact until you arrive.',
      },
    ],
    suitableCategories: ['private-jet', 'turboprop', 'executive-airliner', 'group-charter'],
    missions: ['corporate', 'leisure', 'group', 'regional', 'vvip'],
    considerations: [
      'Positioning is part of your trip. If the aircraft is not already where you are, the flight that brings it counts.',
      'Crew duty limits are legal limits, not preferences. A long day can need a second crew or an overnight stop.',
      'Runway length and airport opening hours rule aircraft in or out before anyone discusses comfort.',
      'Baggage space runs out before weight does. In a light aircraft, a full cabin and full baggage rarely fit together.',
      'Weather decisions rest with the operator and the commander (the pilot in charge), not with the passenger.',
    ],
    pricingFactors: [
      {
        factor: 'Aircraft category',
        explanation:
          'The biggest cost factor. A light jet and a large-cabin jet cost very different amounts per hour before anything else is added.',
      },
      {
        factor: 'Block time',
        explanation:
          'You pay for block time (engine start to engine stop), which is longer than the flying time between two cities.',
      },
      {
        factor: 'Positioning',
        explanation:
          'Flying the aircraft to you, and back again afterwards. This is the usual surprise on a one-way quote.',
      },
      {
        factor: 'Landing, parking and handling',
        explanation:
          'Each airport sets its own charges. They vary widely between metro and regional airports.',
      },
      {
        factor: 'Crew duty and overnights',
        explanation:
          'A schedule longer than one crew duty day adds crew cost, not just inconvenience.',
      },
      {
        factor: 'Ground waiting time',
        explanation:
          'While the aircraft waits for you, nobody else can use it, so waiting time is charged.',
      },
      {
        factor: 'Taxes and statutory charges',
        explanation: 'Added on top of the operating cost. They vary with the type of flight.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a private charter and a first-class ticket?',
        answer:
          'A first-class ticket buys a better seat on a flight that runs to an airline’s schedule and route, while a private charter buys the whole aircraft, so the schedule and route are yours.',
        elaboration: [
          'The real difference is usually not comfort but where and when you can fly. A charter can fly a route no airline operates and land at an airport no airline serves. It can also fit three cities into one day that a timetable would spread across two.',
        ],
      },
      {
        question: 'Is a private charter cheaper for a group?',
        answer:
          'Per person, yes, because a private charter is priced for the whole aircraft, so the cost is shared across every seat you fill, up to the aircraft’s capacity.',
        elaboration: [
          'For one traveller on a busy route, an airline ticket is almost always cheaper. For eight people going somewhere with two flights a week, charter often works out better once hotel nights and lost working days are counted.',
        ],
      },
      {
        question: 'How much does a private charter cost in India?',
        answer:
          'The cost of a private charter depends mainly on the aircraft category, block time, positioning, airport charges, crew duty and overnights, ground waiting time and taxes.',
        elaboration: [
          'The aircraft category is the biggest factor. A light jet and a large-cabin jet cost very different amounts per hour before anything else is added. The pricing page explains every part of a charter quote.',
        ],
      },
      {
        question: 'How far in advance should I book a private charter?',
        answer:
          'Simple domestic trips can often be arranged within 24 to 72 hours, but a specific aircraft type, an airport with tight limits, peak season or any international leg needs much longer.',
      },
    ],
    related: [
      {
        label: 'Private Jet Charter',
        href: '/private-charter/private-jet-charter',
        description: 'When a jet is the right choice, and which size',
      },
      {
        label: 'Aircraft Charter',
        href: '/private-charter/aircraft-charter',
        description: 'Choosing between jets, turboprops and larger aircraft',
      },
      {
        label: 'Aircraft & Fleet',
        href: '/aircraft',
        description: 'Aircraft types for hire, with seats and range',
      },
      {
        label: 'Charter Pricing',
        href: '/pricing',
        description: 'Every part of a charter quote, explained',
      },
      {
        label: 'How It Works',
        href: '/how-it-works',
        description: 'From first enquiry to take-off',
      },
    ],
    canonical: '/private-charter',
  },
  {
    slug: 'private-jet-charter',
    cluster: 'private-charter',
    name: 'Private Jet Charter',
    keyword: 'private jet charter',
    headline: 'Private Jet Charter in India',
    summary:
      'Private jet charter means hiring a whole jet for your trip, best for executives and groups of four to twelve on flights of about two hours or more.',
    definition: [
      'A private jet charter is the hire of a whole jet (an aircraft with turbofan engines). Compared with a turboprop, you pay for height and speed. Jets fly higher, above most weather, and much faster. On a short flight, most of that speed advantage is lost in the climb and descent. On a long flight, it adds up to hours saved.',
      'Jets are grouped by cabin size, not by brand, and each class suits different trips. A light jet carries four to six people on one-to-three-hour flights, but you cannot stand up in the cabin. A midsize jet adds standing height and range. A large-cabin jet is built for flights long enough that you will really work or sleep on board. Ultra-long-range jets exist to remove the fuel stop on intercontinental trips.',
      'Choosing the class is the decision that sets the cost of private jet hire. Almost every other cost is smaller than the gap between one class and the next.',
    ],
    whoItIsFor: [
      'Executives flying long domestic or regional international routes',
      'Groups of four to twelve travelling together',
      'Travellers whose schedule has no room for a connecting flight',
      'Anyone flying a route long enough for jet speed to matter',
    ],
    whenToUseIt: [
      'Flights over about two hours, where jet speed saves real time',
      'Routes where every airline option needs a connection',
      'Multi-city trips packed into one or two days',
      'Flights where working or resting on board is part of the purpose',
    ],
    howItWorks: [
      {
        title: 'Match the jet size to the flight',
        description:
          'Flight length and passenger count decide the cabin class. Getting this right is most of the cost decision.',
      },
      {
        title: 'Check both airports',
        description:
          'Runway length, opening hours and ground handling decide which jets can actually use them.',
      },
      {
        title: 'Account for positioning',
        description:
          'Where the jet starts and where it must end up sets a large part of a one-way price.',
      },
      {
        title: 'Confirm crew and schedule',
        description: 'A long day with several flights may go beyond one crew’s legal duty period.',
      },
    ],
    suitableCategories: ['private-jet', 'executive-airliner'],
    missions: ['corporate', 'vvip', 'leisure', 'group'],
    considerations: [
      'Short flights under about an hour rarely suit a jet. A turboprop often arrives at a similar time for less.',
      'Cabin class, not the aircraft’s name, decides cost and comfort.',
      'Baggage space, far more often than weight, is the real limit in a light jet.',
      'Not every airport takes every jet. Runway length rules out some options early.',
      'International flights add permits, clearances and handling, so allow extra lead time for your private jet booking.',
    ],
    pricingFactors: [
      {
        factor: 'Cabin class',
        explanation:
          'Light, midsize, large-cabin and ultra-long-range jets are separate price tiers. The step between tiers is bigger than most other costs.',
      },
      {
        factor: 'Block time',
        explanation:
          'Jets are priced per hour of block time (engine start to engine stop). The faster jet is not always the cheaper one once its hourly rate is applied.',
      },
      {
        factor: 'Positioning',
        explanation:
          'If the jet is based far from your departure airport, that ferry flight is added to your price.',
      },
      {
        factor: 'Airport charges',
        explanation:
          'Landing, parking and handling at each stop. These are higher at metro airports.',
      },
      {
        factor: 'International requirements',
        explanation:
          'Overflight and landing permits, clearances and ground handling when the route crosses borders.',
      },
    ],
    faqs: [
      {
        question: 'How much does a private jet charter cost in India?',
        answer:
          'Private jet charter cost in India depends mainly on the cabin class, total block hours, positioning the jet to your departure airport, landing and handling charges at each stop, crew duty needs, waiting time and taxes.',
        elaboration: [
          'We do not publish one headline hourly rate. A rate quoted without positioning and handling is not the price of a trip. The pricing page explains every part, so you can read a real quote properly.',
        ],
      },
      {
        question: 'Which private jet size should I charter?',
        answer:
          'Flight length and group size decide it: a light jet for four to six people on one-to-three-hour flights, a midsize jet for a stand-up cabin on two-to-four-hour flights, and a large-cabin jet for long flights where you want to work or sleep.',
      },
      {
        question: 'Is a private jet faster than a commercial flight?',
        answer:
          'The time in the air is only a little shorter, but the whole journey is usually much quicker because a private jet removes the connection, the early check-in and the transfer to a distant hub airport.',
      },
      {
        question: 'Is a private jet worth it for a short flight?',
        answer:
          'A private jet is rarely the cheaper choice for flights under about an hour, because a turboprop often arrives at a similar time for less.',
        elaboration: [
          'On a short flight, most of a jet’s speed advantage is lost in the climb and descent. The jet only pulls ahead on longer flights, where its faster cruise adds up.',
        ],
      },
    ],
    related: [
      {
        label: 'Private Jets for Charter',
        href: '/aircraft/private-jets',
        description: 'Jet types and cabin sizes',
      },
      {
        label: 'Aircraft Charter',
        href: '/private-charter/aircraft-charter',
        description: 'When a turboprop is the better choice',
      },
      { label: 'Charter Pricing', href: '/pricing', description: 'How a charter price is built' },
      {
        label: 'Empty Legs',
        href: '/empty-leg-charter',
        description: 'When empty leg flights (one-way repositioning flights) change the price',
      },
      {
        label: 'Corporate Charter',
        href: '/services/corporate-charter',
        description: 'Regular business travel by private jet',
      },
    ],
    canonical: '/private-charter/private-jet-charter',
    parent: '/private-charter',
  },
  {
    slug: 'aircraft-charter',
    cluster: 'private-charter',
    name: 'Aircraft Charter',
    keyword: 'aircraft charter',
    headline: 'Aircraft Charter in India',
    summary:
      'Aircraft charter means hiring any type of aircraft for your trip, not just a jet, and for companies and groups on many Indian routes, a turboprop is the more sensible choice.',
    definition: [
      'Charter does not only mean jets. Turboprops, single-engine utility aircraft and regional airliners can all be chartered, and each one is the right answer to a different need. If you start from the aircraft instead of the trip, you can end up paying for things you never use.',
      'Turboprop charter wins on short flights and difficult runways. On flights under about an hour, a jet spends most of the trip climbing and descending. It never reaches the cruise where it is efficient. So a turboprop often arrives at a similar time for much less. Many regional Indian airfields also have runway lengths, surfaces or landing aids that rule out jets completely.',
      'Group charter on a regional airliner solves a different problem. It moves sixty or a hundred people at once on one charter flight, for a delegation, a company offsite or an event. The alternative is a dozen separate bookings on airline flights.',
    ],
    whoItIsFor: [
      'Companies flying to plants, project sites and district towns, not metros',
      'Groups too large for a business jet',
      'Travellers on short regional flights, where a jet is poor value',
      'Trips carrying awkward or oversized loads along with passengers',
    ],
    whenToUseIt: [
      'Flights under about an hour, where a turboprop costs less',
      'Destinations where the runway rules out a jet',
      'Group travel of forty or more people',
      'Trips that carry passengers together with equipment or freight',
    ],
    howItWorks: [
      {
        title: 'Start with the destination',
        description:
          'Runway length, surface and facilities often decide the aircraft before anything else.',
      },
      {
        title: 'Count the party honestly',
        description:
          'Passengers and baggage both matter. In small aircraft, space runs out before weight does.',
      },
      {
        title: 'Compare aircraft types',
        description:
          'Pricing the same trip as a turboprop and as a light jet often answers the question at once.',
      },
      {
        title: 'Plan the ground side',
        description: 'Smaller airfields may have limited handling, fuel or opening hours.',
      },
    ],
    suitableCategories: ['turboprop', 'private-jet', 'executive-airliner', 'group-charter'],
    missions: ['corporate', 'regional', 'short-field', 'group'],
    considerations: [
      'Runway length is the first check, not the last.',
      'Smaller airfields can have limited opening hours, limited fuel or no night flying.',
      'Turboprops fly lower than jets, so weather along the way affects them more.',
      'Large-group charter needs far more lead time than a business jet.',
    ],
    pricingFactors: [
      {
        factor: 'Aircraft category',
        explanation:
          'A turboprop hour and a jet hour cost different amounts, yet on a short flight they can arrive at a similar time.',
      },
      {
        factor: 'Flight length',
        explanation: 'The shorter the flight, the more the turboprop’s cost advantage shows.',
      },
      {
        factor: 'Airfield facilities',
        explanation: 'Limited handling or fuel at a smaller airfield can add ground time and cost.',
      },
      {
        factor: 'Positioning',
        explanation:
          'Smaller aircraft are based in more places. That sometimes cuts positioning (flying the aircraft to your city), and sometimes does not.',
      },
    ],
    faqs: [
      {
        question: 'When is a turboprop better than a jet?',
        answer:
          'A turboprop is better on flights under about an hour and at airfields whose runway or facilities rule out jets, because in both cases it arrives at a similar time for less money.',
      },
      {
        question: 'Can a charter aircraft land at any airport?',
        answer:
          'No, a charter aircraft can only use an airfield whose runway length and surface, landing aids, opening hours and ground handling suit it, and these are checked before any aircraft is proposed.',
      },
      {
        question: 'Can I book an aircraft charter for a group of sixty or more?',
        answer:
          'Yes, a group of sixty or more can fly on a chartered regional airliner, but it needs much more lead time than a business jet and depends on what is available for your dates.',
      },
      {
        question: 'What types of aircraft can I charter in India?',
        answer:
          'You can charter turboprops, single-engine utility aircraft, regional airliners and private jets, and each one suits a different kind of trip.',
        elaboration: [
          'Turboprops suit short flights and difficult runways. Regional airliners move large groups at once. Jets suit longer flights where speed over distance matters.',
        ],
      },
    ],
    related: [
      {
        label: 'Turboprops for Charter',
        href: '/aircraft/turboprops',
        description: 'Turboprop types and short-runway ability',
      },
      {
        label: 'Private Jet Charter',
        href: '/private-charter/private-jet-charter',
        description: 'When speed over long distances matters most',
      },
      {
        label: 'Private Charter',
        href: '/private-charter',
        description: 'How hiring a whole aircraft works',
      },
      { label: 'Charter Pricing', href: '/pricing', description: 'What drives the cost' },
    ],
    canonical: '/private-charter/aircraft-charter',
    parent: '/private-charter',
  },
];
