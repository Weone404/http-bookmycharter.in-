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
    summary:
      'Private charter means hiring an entire aircraft for a specific trip, so the route, the departure time and the passenger list are yours rather than an airline’s.',
    definition: [
      'A private charter is a single flight arranged for one party. You are not buying seats on a service that would have operated anyway — the aircraft, the crew and the schedule exist for your trip and nobody else’s. That is the whole difference, and almost everything else about charter follows from it.',
      'It means the aircraft departs when you are ready rather than at a published time; it can use airports that scheduled carriers do not serve; and the cost is a cost for the aircraft, not a cost per person. A jet that can carry eight costs approximately the same whether two people board or eight, which is why charter arithmetic changes so sharply with group size.',
      'It also means the trip is planned rather than booked. Someone has to establish that the aircraft can use both airports, that the crew can legally complete the day, that the aircraft will be in the right place to begin with, and that any permissions the route needs are obtainable. That planning is the actual service.',
    ],
    whoItIsFor: [
      'Companies moving several people to places scheduled services reach badly, or not at all',
      'Anyone whose itinerary covers more ground in a day than published timetables allow',
      'Travellers who need to depart at a time no airline offers',
      'Groups large enough that per-person cost approaches a premium airline fare',
      'Journeys where privacy or discretion is a genuine requirement',
    ],
    whenToUseIt: [
      'When the destination has no convenient scheduled service',
      'When three or four cities have to be covered in one working day',
      'When the value of a day saved exceeds the fare difference',
      'When a group travels together and can share the aircraft cost',
      'When a fixed timetable makes the trip impossible rather than merely inconvenient',
    ],
    howItWorks: [
      { title: 'Define the trip', description: 'Route, date, passenger count and any timing that cannot move. These four determine most of what follows.' },
      { title: 'Establish what can operate it', description: 'Runway length, aircraft range, passenger and baggage load, crew duty limits and airport operating hours narrow the field before cost enters the conversation.' },
      { title: 'Price the real trip', description: 'Including the positioning flights, the handling at each stop, and any overnight the schedule forces. A quote that omits these is not a quote.' },
      { title: 'Confirm and coordinate', description: 'Passenger details, ground arrangements and a single point of contact through to arrival.' },
    ],
    suitableCategories: ['private-jet', 'turboprop', 'executive-airliner', 'group-charter'],
    missions: ['corporate', 'leisure', 'group', 'regional', 'vvip'],
    considerations: [
      'Positioning is part of your trip. If the aircraft is not already where you are, the flight that brings it counts.',
      'Crew duty limits are legal limits, not preferences. A long day can require a second crew or an overnight stop.',
      'Runway length and airport operating hours rule aircraft in or out before anyone discusses comfort.',
      'Baggage is volume before it is weight. A full cabin and full baggage rarely coexist in a light aircraft.',
      'Weather and the decision to fly rest with the operator and the commander, not with the passenger.',
    ],
    pricingFactors: [
      { factor: 'Aircraft category', explanation: 'The single largest variable. A light jet and a large-cabin jet are different orders of cost per hour before anything else is added.' },
      { factor: 'Block time', explanation: 'Billed engine start to engine shutdown, which is longer than the flying time between two cities.' },
      { factor: 'Positioning', explanation: 'Bringing the aircraft to you, and returning it afterwards. The usual surprise on a one-way quote.' },
      { factor: 'Landing, parking and handling', explanation: 'Set by each airport and varying widely between metro and regional fields.' },
      { factor: 'Crew duty and overnights', explanation: 'A schedule that exceeds a duty day adds crew cost, not just inconvenience.' },
      { factor: 'Ground waiting time', explanation: 'An aircraft holding for you is unavailable to anyone else, and is charged accordingly.' },
      { factor: 'Taxes and statutory charges', explanation: 'Applied on top of operating cost and varying with the nature of the flight.' },
    ],
    faqs: [
      {
        question: 'What is the difference between private charter and buying a first-class ticket?',
        answer: 'A first-class ticket buys a better seat on a flight that operates to someone else’s schedule and route; a private charter buys the aircraft, so the schedule and the route are yours.',
        elaboration: [
          'The practical difference is usually not comfort but geometry. Charter can fly a route no airline operates, land at an airport no airline serves, and fit three cities into a day that a timetable would spread across two.',
        ],
      },
      {
        question: 'Is private charter cheaper for a group?',
        answer: 'Per person, yes — charter is priced for the aircraft, so the cost divides across however many seats are filled, up to the aircraft’s capacity.',
        elaboration: [
          'For one traveller on a well-served route, a commercial ticket is almost always cheaper. For eight people to a place with two flights a week, the comparison often runs the other way once hotel nights and lost working days are counted.',
        ],
      },
      {
        question: 'How much notice does a private charter need?',
        answer: 'Simple domestic trips can often be arranged within 24 to 72 hours, but a specific aircraft type, a constrained airport, peak season or any international element needs considerably longer.',
      },
    ],
    related: [
      { label: 'Private Jet Charter', href: '/private-charter/private-jet-charter', description: 'When a jet is the right answer, and which class' },
      { label: 'Aircraft Charter', href: '/private-charter/aircraft-charter', description: 'Choosing between jets, turboprops and larger aircraft' },
      { label: 'Aircraft & Fleet', href: '/aircraft', description: 'Types available, with capacity and range' },
      { label: 'Charter Pricing', href: '/pricing', description: 'Every component of a charter quote' },
      { label: 'How It Works', href: '/how-it-works', description: 'From enquiry to departure' },
    ],
    canonical: '/private-charter',
  },
  {
    slug: 'private-jet-charter',
    cluster: 'private-charter',
    name: 'Private Jet Charter',
    summary:
      'Private jet charter suits trips where speed over distance is the point — roughly two hours of flying and upwards, where a jet’s cruise advantage compounds into hours saved rather than minutes.',
    definition: [
      'A private jet charter is a whole-aircraft hire using a turbofan aircraft. What you are paying for, relative to a turboprop, is altitude and speed: jets cruise higher, above most weather, and considerably faster. On a short sector that advantage is largely consumed by the climb and descent; on a long one it compounds.',
      'Jets are graded by cabin rather than by badge, and the classes behave differently. Light jets carry four to six people on one-to-three-hour sectors with a cabin you cannot stand in. Midsize jets add standing height and range. Large-cabin jets are built for sectors long enough that passengers will genuinely work or sleep. Ultra-long-range aircraft exist to remove the fuel stop from intercontinental trips.',
      'Choosing the class is the decision that determines the cost. Almost every other variable is smaller than the gap between one class and the next.',
    ],
    whoItIsFor: [
      'Executives covering long domestic or regional international sectors',
      'Parties of four to twelve travelling together',
      'Travellers whose schedule cannot absorb a connection',
      'Anyone flying a route long enough for cruise speed to matter',
    ],
    whenToUseIt: [
      'Sectors beyond roughly two hours, where jet speed produces a real time saving',
      'Routes requiring a connection on any scheduled alternative',
      'Multi-city itineraries compressed into one or two days',
      'Flights where working or resting en route is part of the purpose',
    ],
    howItWorks: [
      { title: 'Match the class to the sector', description: 'Sector length and passenger count select the cabin class. Getting this right is most of the cost decision.' },
      { title: 'Check both airports', description: 'Runway length, operating hours and handling availability decide which aircraft can actually use them.' },
      { title: 'Account for positioning', description: 'Where the aircraft starts and where it must end determines a large part of a one-way price.' },
      { title: 'Confirm crew and schedule', description: 'A long day with several sectors may exceed a single crew duty period.' },
    ],
    suitableCategories: ['private-jet', 'executive-airliner'],
    missions: ['corporate', 'vvip', 'leisure', 'group'],
    considerations: [
      'A jet is rarely the cheaper answer below about an hour of flying — a turboprop often arrives at a similar time for less.',
      'Cabin class, not aircraft name, is what governs cost and comfort.',
      'Baggage volume is the binding constraint in light jets far more often than weight.',
      'Not every airport takes every jet. Runway length quietly removes options early.',
      'International sectors add permits, clearances and handling arrangements that need lead time.',
    ],
    pricingFactors: [
      { factor: 'Cabin class', explanation: 'Light, midsize, large-cabin and ultra-long-range are separate cost tiers, and the step between tiers dwarfs most other variables.' },
      { factor: 'Block time', explanation: 'Jets are quoted on hourly block time; the faster aircraft is not always the cheaper one once its rate is applied.' },
      { factor: 'Positioning', explanation: 'A jet based far from your departure point carries that ferry into your price.' },
      { factor: 'Airport charges', explanation: 'Landing, parking and handling at each stop, higher at metro airports.' },
      { factor: 'International requirements', explanation: 'Overflight and landing permits, clearances and ground handling where the route crosses borders.' },
    ],
    faqs: [
      {
        question: 'How much does a private jet charter cost in India?',
        answer: 'It depends primarily on the cabin class chartered, total block hours, positioning of the aircraft to your departure airport, landing and handling charges at each stop, crew duty requirements, waiting time and taxes.',
        elaboration: [
          'We do not publish a headline hourly figure, because a rate quoted without positioning and handling is not the price of a trip. The pricing page sets out every component so you can read a real quote properly.',
        ],
      },
      {
        question: 'Which jet class should I charter?',
        answer: 'Sector length and passenger count decide it: light jets for four to six people on one-to-three-hour sectors, midsize for a stand-up cabin on two-to-four-hour sectors, large-cabin for long flights where working or sleeping matters.',
      },
      {
        question: 'Is a private jet faster than a commercial flight?',
        answer: 'In the air the difference is modest, but the journey is usually much shorter because charter removes the connection, the early check-in and the transfer to a distant hub airport.',
      },
    ],
    related: [
      { label: 'Private Jets for Charter', href: '/aircraft/private-jets', description: 'Types and cabin classes' },
      { label: 'Aircraft Charter', href: '/private-charter/aircraft-charter', description: 'When a turboprop is the better answer' },
      { label: 'Charter Pricing', href: '/pricing', description: 'How the number is built' },
      { label: 'Empty Legs', href: '/empty-leg-charter', description: 'When repositioning flights change the arithmetic' },
      { label: 'Corporate Charter', href: '/services/corporate-charter', description: 'Recurring business travel' },
    ],
    canonical: '/private-charter/private-jet-charter',
    parent: '/private-charter',
  },
  {
    slug: 'aircraft-charter',
    cluster: 'private-charter',
    name: 'Aircraft Charter',
    summary:
      'Aircraft charter covers the whole range of chartered aircraft rather than jets alone, and for a large share of Indian routes a turboprop is the more sensible choice.',
    definition: [
      'Charter is not a synonym for jet. Turboprops, single-engine utility aircraft and regional airliners are all chartered, and each is the right answer to a different question. Starting from the aircraft rather than from the trip is how people end up paying for capability they never use.',
      'Turboprops win on short sectors and difficult runways. Below roughly an hour of flying, a jet spends most of the trip climbing and descending and never reaches the cruise where it is efficient, so a turboprop frequently arrives at a similar time for considerably less. Many regional Indian airfields also have runway lengths, surfaces or approach facilities that exclude jets outright.',
      'Regional airliner charter solves a different problem again: moving sixty or a hundred people at once, for a delegation, a corporate offsite or an event, where the alternative is a dozen separate bookings on scheduled services.',
    ],
    whoItIsFor: [
      'Companies flying to plants, project sites and district towns rather than metros',
      'Groups too large for a business jet',
      'Travellers on short regional sectors where a jet is poor value',
      'Missions with awkward or oversized loads alongside passengers',
    ],
    whenToUseIt: [
      'Sectors under roughly an hour, where turboprop economics are better',
      'Destinations whose runway rules out a jet',
      'Movements of forty or more people',
      'Trips combining passengers with equipment or freight',
    ],
    howItWorks: [
      { title: 'Start from the destination', description: 'Runway length, surface and facilities often decide the aircraft before anything else is considered.' },
      { title: 'Count the party honestly', description: 'Passengers plus baggage. Both matter, and in small aircraft volume binds before weight.' },
      { title: 'Compare across categories', description: 'The same trip priced as a turboprop and as a light jet frequently answers the question immediately.' },
      { title: 'Plan the ground end', description: 'Secondary airfields may have limited handling, fuel or operating hours.' },
    ],
    suitableCategories: ['turboprop', 'private-jet', 'executive-airliner', 'group-charter'],
    missions: ['corporate', 'regional', 'short-field', 'group'],
    considerations: [
      'Runway length is the first filter, not the last.',
      'Secondary airfields can have restricted operating hours, limited fuel or no night capability.',
      'Turboprops fly lower and are more affected by weather en route than jets.',
      'Large-group charter needs far more lead time than a business jet.',
    ],
    pricingFactors: [
      { factor: 'Aircraft category', explanation: 'A turboprop hour and a jet hour are different costs for what can be a similar arrival time on a short sector.' },
      { factor: 'Sector length', explanation: 'The shorter the sector, the more the turboprop’s efficiency advantage shows.' },
      { factor: 'Airfield facilities', explanation: 'Limited handling or fuel at a secondary field can add ground time and cost.' },
      { factor: 'Positioning', explanation: 'Smaller aircraft are more widely based, which sometimes reduces positioning — and sometimes does not.' },
    ],
    faqs: [
      {
        question: 'When is a turboprop better than a jet?',
        answer: 'On sectors under roughly an hour, and at airfields whose runway length or facilities rule out jets — in both cases the turboprop arrives at a similar time for less money.',
      },
      {
        question: 'Can a charter aircraft land at any airport?',
        answer: 'No. Runway length and surface, available approach aids, operating hours and ground handling all constrain which aircraft can use a given airfield, and those constraints are checked before an aircraft is proposed.',
      },
      {
        question: 'Can I charter an aircraft for a group of sixty or more?',
        answer: 'Yes, through regional airliner charter, though it requires materially more lead time than a business jet and depends on what is available for the dates.',
      },
    ],
    related: [
      { label: 'Turboprops for Charter', href: '/aircraft/turboprops', description: 'Types and short-field capability' },
      { label: 'Private Jet Charter', href: '/private-charter/private-jet-charter', description: 'When speed over distance is the point' },
      { label: 'Private Charter', href: '/private-charter', description: 'How whole-aircraft hire works' },
      { label: 'Charter Pricing', href: '/pricing', description: 'What drives the cost' },
    ],
    canonical: '/private-charter/aircraft-charter',
    parent: '/private-charter',
  },
];
