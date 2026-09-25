import type { Insight } from '@/types/insight';

/**
 * The knowledge hub.
 *
 * Every article here exists to answer a question people actually ask before
 * chartering, and every one links to the commercial page it supports. An
 * article that links nowhere is a dead end and does not ship.
 *
 * No `author` is set on any of these. Author profiles require real people with
 * real roles (docs/BUSINESS-DATA-REQUIRED H1), and a fabricated byline is worse
 * than no byline.
 */
export const INSIGHTS: readonly Insight[] = [
  {
    slug: 'how-private-jet-charter-pricing-works-in-india',
    category: 'pricing',
    title: 'Private Jet Charter Pricing in India',
    summary:
      'Private jet charter pricing in India is the hourly rate times billed hours, plus positioning, airport fees, crew duty, waiting time and taxes.',
    published: '2026-09-17',
    body: [
      'Private jet charter is priced for the whole aircraft, not per seat. That one fact explains most first-quote surprises. A one-way trip is not half a return. An empty aircraft still costs money to move. And two extra passengers barely change the price.',
      'The base of any quote is the aircraft’s hourly rate times its block time (engine start to engine stop). It is not the published flight time between two cities. Block time includes taxi, holding and the real route flown. So a 55-minute flight is rarely billed as 55 minutes.',
      'Positioning (flying the aircraft to your city) most often explains a gap between two quotes. Every aircraft has a base. If it is not at your departure airport, the flight that brings it is part of your trip. If you are not flying back, the flight that takes it home usually is too.',
      'So a quote from an operator whose aircraft is already near you can be much cheaper. The other operator may be flying the exact same aircraft type across the country.',
      'Airport charges come next: landing, parking and ground handling. Each airport sets its own, and they vary widely. A metro airport with full handling costs much more than a regional airport. An overnight stop adds parking.',
      'Crew duty is a legal limit, not a sales choice. Crews may only work a set number of hours. If your day runs longer, you need a second crew flown in to meet the aircraft, or an overnight stop with a hotel. Both add to the price, and neither can be negotiated away.',
      'Ground waiting is charged because an aircraft waiting for you cannot fly anyone else. On a site visit or an event, waiting can be the largest single line. A four-hour hold is four hours of the aircraft’s day.',
      'Taxes and statutory charges are added on top and depend on the type of flight. International flights also add permits, clearances and handling that domestic trips do not need.',
      'Two quotes can only be compared when both list what they include. A lower hourly rate without positioning is not a better price. It is an incomplete one. Ask each operator to show the same items. That is the fastest way to see which is really cheaper.',
    ],
    supports: [
      { label: 'Charter Pricing', href: '/pricing', description: 'Every part of a charter quote' },
      {
        label: 'Private Jet Charter',
        href: '/private-charter/private-jet-charter',
        description: 'Choosing the cabin class',
      },
      {
        label: 'Empty Legs',
        href: '/empty-leg-charter',
        description: 'When positioning works in your favour',
      },
    ],
    canonical: '/insights/how-private-jet-charter-pricing-works-in-india',
  },
  {
    slug: 'what-is-an-empty-leg-flight',
    category: 'charter-guide',
    title: 'What Is an Empty Leg Flight?',
    summary:
      'An empty leg flight is a charter aircraft flying without passengers to reach its next client or return to base, which an operator may sell for less.',
    published: '2026-09-17',
    body: [
      'An empty leg is a one-way repositioning flight with no passengers on board. Every charter can create one. Say an aircraft based in Delhi is booked from Mumbai to Bengaluru. First it must fly Delhi to Mumbai empty. Afterwards it must fly Bengaluru to Delhi empty.',
      'Those two flights are the empty legs. The operator pays for them whether anyone is on board or not.',
      'That is why empty legs can be sold cheaply. The aircraft, the crew and the fuel are already paid for. A passenger on that flight is extra income against a cost the operator has already accepted. It is not a shop-style discount. It is simply how an unavoidable flight is paid for.',
      'The catch is that someone else’s trip sets the empty leg. Its route, its date and often its departure time are fixed by the charter that created it. You fit yourself to an existing flight instead of booking your own. That is the opposite of what charter normally offers.',
      'Empty legs can also change. If the original charter moves, changes route or cancels, the empty leg moves, changes or disappears too. An empty leg is firm only once the operator confirms it. The closer to departure, the firmer it gets. If you need certainty weeks ahead, an empty leg is the wrong choice.',
      'Empty legs suit flexible travellers who have a direction, not a deadline. For example, someone who would like to be in Goa this week, can leave at a day’s notice, and can live with the trip not happening. For a board meeting on Thursday morning, book a regular charter.',
      'An empty leg is not a lower class of service. It is the same aircraft with the same crew that would have flown the paid flight. The only differences are which way it is going and who pays for it.',
    ],
    supports: [
      {
        label: 'Empty Leg Charter',
        href: '/empty-leg-charter',
        description: 'How empty leg availability works',
      },
      {
        label: 'Charter Pricing',
        href: '/pricing',
        description: 'Why positioning costs what it does',
      },
      {
        label: 'Private Charter',
        href: '/private-charter',
        description: 'When you need a flight on your own schedule',
      },
    ],
    canonical: '/insights/what-is-an-empty-leg-flight',
  },
  {
    slug: 'private-jet-vs-commercial-flight',
    category: 'charter-guide',
    title: 'Private Jet or Commercial Flight?',
    summary:
      'A private jet is not much faster in the air than a commercial flight, but the trip is often far shorter: no connections, early check-in or distant hubs.',
    published: '2026-09-17',
    body: [
      'A private jet saves time on the ground, not in the air. The cruise speed of a business jet and an airliner is similar, and on some routes the airliner is faster. The time you save comes from how the journey is built.',
      'Take a trip from Delhi to a district town with no direct flight. By airline: drive to the airport, arrive two hours early, fly to a hub, wait, take a second flight to the nearest airport, then drive three hours by road. That is a full day, and often a night in a hotel.',
      'By charter: a shorter drive to a general aviation terminal (for private flights), a short wait, one flight to a nearer airfield, and a much shorter drive. The flying time may be similar. The day is not.',
      'On a busy route the answer flips. Delhi to Mumbai has many daily flights. A commercial ticket, especially for one person, is much cheaper. The time saved is an hour or two, not a day.',
      'The cost comparison depends on how many people travel. Charter is priced per aircraft, not per seat. Six premium tickets, six airport transfers and a hotel night caused by a bad connection add up to far more than one economy fare. Compare the full cost of the airline journey, including the working days it uses up.',
      'Time is not the only reason. On a charter, you can talk freely in a private cabin. You can move the departure time when a meeting runs late. And you can reach airports that airlines do not serve. Whether that is worth the extra cost depends on the trip.',
      'The simple rule: for one person on a busy route, fly commercial. For a group going somewhere hard to reach, or a day that cannot work any other way, charter often wins once you count the full cost, not just the fare.',
    ],
    supports: [
      {
        label: 'Private Jet Charter',
        href: '/private-charter/private-jet-charter',
        description: 'How private jet charter works',
      },
      {
        label: 'Corporate Charter',
        href: '/services/corporate-charter',
        description: 'The business case in detail',
      },
      { label: 'Charter Pricing', href: '/pricing', description: 'What a trip really costs' },
    ],
    canonical: '/insights/private-jet-vs-commercial-flight',
  },
  {
    slug: 'helicopter-vs-private-jet',
    category: 'helicopter-guide',
    title: 'Helicopter or Private Jet: Which to Book?',
    summary:
      'Choose a helicopter or private jet by destination: a helicopter for short trips to places with no runway, a jet for longer trips between runways.',
    published: '2026-09-17',
    body: [
      'Your destination usually decides between a helicopter and a private jet, not your preference. The two aircraft solve different problems and are rarely true alternatives.',
      'A helicopter cuts out the road journey. It lands at a site, not an airport: a plant, a venue, a hill town or a ridge. That makes it the only choice where there is no runway, and poor value where there is one. Over long distances it is slower than a jet, and its range is a fraction of a jet’s.',
      'A jet needs a runway at both ends. That often means a drive at one or both ends. In return you get speed over distance, flight above most weather, and a cabin where you can work or rest.',
      'On a flight shorter than about an hour, most of the jet’s speed advantage is lost in the climb and descent.',
      'Often the two are used together, not compared. A jet flies the long leg between cities. A helicopter flies the last leg to a site no aeroplane can reach. This is common for site visits in difficult terrain, and it is planned as one trip, not two bookings.',
      'Cost works differently too. Helicopter trips are often driven by ground waiting time, not flying time. A helicopter held at a site for a ceremony or meeting is booked for the whole period. Jet charters are driven by block hours and positioning. So comparing hourly rates across the two tells you very little about a real trip’s cost.',
      'A quick test: if your destination has a runway and a good road, start with an aeroplane. If it has neither, start with a helicopter. If it has one but not the other, the answer is usually both.',
    ],
    supports: [
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'How helicopter charter works',
      },
      {
        label: 'Private Jet Charter',
        href: '/private-charter/private-jet-charter',
        description: 'When distance is the problem',
      },
      {
        label: 'Helicopters for Charter',
        href: '/aircraft/helicopters',
        description: 'Helicopter types and terrain',
      },
    ],
    canonical: '/insights/helicopter-vs-private-jet',
  },
  {
    slug: 'how-aircraft-positioning-affects-charter-pricing',
    category: 'pricing',
    title: 'How Positioning Affects Charter Cost',
    summary:
      'Aircraft positioning is flying the aircraft to your city and back to base, and it is the most common reason two charter quotes for one trip differ.',
    published: '2026-09-17',
    body: [
      'Aircraft positioning adds the cost of getting the aircraft to you, and often back again. Unlike an airline, a charter operator does not run a network of linked flights. A charter aircraft sits at its base until someone books it. Then it has to fly to the passenger.',
      'Say you fly Mumbai to Goa and the aircraft is already in Mumbai. You pay for Mumbai to Goa, plus whatever it takes to get the aircraft home. If the same aircraft type is based in Delhi, you also pay for an empty Delhi to Mumbai flight before your trip starts. The aircraft is the same. The price is not.',
      'This is why a one-way charter is not half the price of a return. On a return, the aircraft carries you both ways. On a one-way, it flies out with you and back empty. That empty return usually appears in your quote.',
      'It is also why being flexible about the airport can pay. A second airport thirty minutes further by road may have a suitable aircraft already there. The positioning you save can be worth more than the extra drive, sometimes by a lot.',
      'Positioning also creates empty legs. When an aircraft has to reposition anyway, the operator would rather sell that flight than fly it empty. That is why empty leg prices look oddly low. The flight was going to happen either way.',
      'Two simple steps help. Ask where the aircraft is based. Then ask whether the quote includes positioning both ways. A quote without positioning is not cheaper than one with it. It just covers less of the trip.',
    ],
    supports: [
      { label: 'Charter Pricing', href: '/pricing', description: 'Every part of a charter quote' },
      {
        label: 'Empty Legs',
        href: '/empty-leg-charter',
        description: 'Positioning that works in your favour',
      },
      {
        label: 'Private Charter',
        href: '/private-charter',
        description: 'How a charter is planned',
      },
    ],
    canonical: '/insights/how-aircraft-positioning-affects-charter-pricing',
  },
  {
    slug: 'how-to-choose-an-aircraft-for-a-charter',
    category: 'aircraft-guide',
    title: 'How to Choose a Charter Aircraft',
    summary:
      'To choose a charter aircraft, check the airfield first, then flight length, then passengers and baggage, then comfort. The first three rule options out.',
    published: '2026-09-17',
    body: [
      'Choose a charter aircraft by starting with the trip, not the aircraft. Most people do it the other way round. Starting with the trip is faster and cheaper, because limits make most of the decision for you.',
      'Start with the airfield at both ends. Runway length, surface, landing aids and opening hours rule aircraft in or out before anything else. A short regional runway may rule out every jet in the class you wanted. No budget changes that.',
      'Next, the flight length. On flights under roughly an hour, a turboprop often arrives within minutes of a jet for much less money. That is because a jet spends most of a short flight climbing and descending. On flights over about two hours, the jet’s speed saves real hours.',
      'Then the load. Count passengers and be honest about baggage. In light aircraft, space runs out before weight does. Six people with golf bags or camera kit need a different aircraft from six people with briefcases.',
      'In helicopters, passenger weight and air temperature matter more than most people expect, especially at altitude.',
      'Only now does comfort come in, and it is a real factor. A cabin you can stand up in changes what a three-hour flight feels like. On a working flight, that has business value. But you choose it from what is left after the limits, not before.',
      'One last check: ask what the quote assumes about ground time. An aircraft that waits is charged for waiting. A trip with a long stop in the middle may be cheaper with a different aircraft, or as two shorter flights, than with the obvious choice.',
    ],
    supports: [
      { label: 'Aircraft & Fleet', href: '/aircraft', description: 'Aircraft types by category' },
      {
        label: 'Aircraft Charter',
        href: '/private-charter/aircraft-charter',
        description: 'Choosing across aircraft categories',
      },
      {
        label: 'Charter Pricing',
        href: '/pricing',
        description: 'How your aircraft choice affects cost',
      },
    ],
    canonical: '/insights/how-to-choose-an-aircraft-for-a-charter',
  },
];

export function insightBySlug(slug: string): Insight | undefined {
  return INSIGHTS.find((i) => i.slug === slug);
}

export const INSIGHT_CATEGORY_LABEL: Record<string, string> = {
  'charter-guide': 'Charter guide',
  'aircraft-guide': 'Aircraft guide',
  'helicopter-guide': 'Helicopter guide',
  pricing: 'Pricing',
  travel: 'Travel',
  routes: 'Routes',
  aviation: 'Aviation',
  'case-study': 'Case study',
};
