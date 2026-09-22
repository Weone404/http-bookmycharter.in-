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
    title: 'How private jet charter pricing works in India',
    summary:
      'A charter quote is built from aircraft category, block hours, positioning, airport charges, crew duty, waiting time and taxes — and the components you cannot see are usually the ones that move the number most.',
    published: '2026-09-17',
    body: [
      'Charter is priced for the aircraft, not for the seat. That single fact explains most of what people find surprising about a first quote: why a one-way trip is not half a return, why an empty aircraft still costs money to move, and why the price barely changes when two more passengers join.',
      'The base of any quote is the hourly rate for the aircraft category, applied to block time — engine start to engine shutdown — rather than to the published flight time between two cities. Block time includes taxi, holding and the routing the aircraft actually flies, which is why a 55-minute sector is rarely billed as 55 minutes.',
      'Positioning is the component that most often explains a gap between two quotes for the same trip. Aircraft are based somewhere. If yours is not at your departure airport, the flight that brings it is part of your trip, and if you are not returning, the flight that takes it back usually is too. A quote from an operator whose aircraft is already near you can be substantially cheaper than one from an operator flying it across the country, for exactly the same aircraft type.',
      'Airport charges are the next layer: landing, parking and ground handling, set by each airport and varying widely. A metro airport with full handling costs materially more than a regional field, and an overnight stop adds parking to the bill.',
      'Crew duty is a legal constraint rather than a commercial one. Crews may only work a defined period, and an itinerary that exceeds it requires either a second crew positioned to meet the aircraft or an overnight stop with accommodation. Both appear in the price, and neither is negotiable.',
      'Ground waiting is charged because an aircraft holding for you is unavailable to anyone else. On a site visit or an event, this can be the largest single line — a four-hour hold is four hours of the aircraft’s day.',
      'Taxes and statutory charges apply on top, and vary with the nature of the flight. International sectors add permits, clearances and handling arrangements that domestic trips do not carry at all.',
      'The practical consequence is that two quotes are only comparable when both state what they include. A lower headline rate with positioning excluded is not a better price; it is an incomplete one. Asking each operator to show the same components is the fastest way to find out which is genuinely cheaper.',
    ],
    supports: [
      { label: 'Charter Pricing', href: '/pricing', description: 'Every cost component in detail' },
      { label: 'Private Jet Charter', href: '/private-charter/private-jet-charter', description: 'Choosing the cabin class' },
      { label: 'Empty Legs', href: '/empty-leg-charter', description: 'When positioning works in your favour' },
    ],
    canonical: '/insights/how-private-jet-charter-pricing-works-in-india',
  },
  {
    slug: 'what-is-an-empty-leg-flight',
    category: 'charter-guide',
    title: 'What is an empty leg flight?',
    summary:
      'An empty leg is a charter aircraft repositioning without passengers — flying to collect a client, or returning to base afterwards — which an operator may sell at a reduced rate because the flight is happening anyway.',
    published: '2026-09-17',
    body: [
      'Every charter creates the possibility of an empty flight. If an aircraft based in Delhi is chartered from Mumbai to Bengaluru, it must first fly Delhi to Mumbai empty, and afterwards fly Bengaluru to Delhi empty. Those two sectors are the empty legs, and the operator is paying for them regardless of whether anyone is on board.',
      'That is why they can be offered cheaply. The aircraft, the crew and the fuel are already committed; a passenger on that sector is revenue against a cost the operator has already accepted. It is not a discount in the retail sense — it is the economics of an unavoidable flight.',
      'The constraint is that the empty leg is defined by someone else’s trip. Its route, its date and often its departure window are fixed by the charter that created it. You are fitting yourself to an existing flight rather than commissioning one, which is the exact opposite of what charter normally offers.',
      'They are also conditional. If the original charter moves, changes route or cancels, the empty leg moves, changes or disappears with it. An empty leg is firm only once the operator says it is, and the closer to departure, the firmer it becomes. Anyone who needs certainty weeks in advance is looking at the wrong product.',
      'The people they suit are flexible travellers with a direction rather than a deadline: someone who would like to be in Goa this week, who can leave on a day’s notice, and for whom the trip not happening is an inconvenience rather than a failure. For a board meeting on Thursday morning, book a charter.',
      'One misconception is worth correcting. An empty leg is not a lower class of service. It is the same aircraft with the same crew that would have flown the paid sector; the only difference is which direction it happens to be going and who is paying for it.',
    ],
    supports: [
      { label: 'Empty Leg Charter', href: '/empty-leg-charter', description: 'How availability works' },
      { label: 'Charter Pricing', href: '/pricing', description: 'Why positioning costs what it does' },
      { label: 'Private Charter', href: '/private-charter', description: 'When you need a flight on your own schedule' },
    ],
    canonical: '/insights/what-is-an-empty-leg-flight',
  },
  {
    slug: 'private-jet-vs-commercial-flight',
    category: 'charter-guide',
    title: 'Private jet vs commercial flight',
    summary:
      'A private jet is not meaningfully faster in the air than a commercial aircraft, but it usually produces a much shorter journey by removing connections, early check-in and travel to and from distant hub airports.',
    published: '2026-09-17',
    body: [
      'The cruise speed difference between a business jet and an airliner is small, and on some routes the airliner is faster. The time charter saves is almost entirely on the ground and in the structure of the journey rather than in the air.',
      'Consider a trip from Delhi to a district town with no direct service. Commercially: a drive to the airport, arrival two hours early, a flight to a hub, a wait, a second flight to the nearest served airport, then a three-hour road transfer. That is a day, and often a night in a hotel. By charter: a shorter drive to a general aviation terminal, a short wait, one flight to a nearer airfield, and a much shorter transfer. The flying time may be similar. The day is not.',
      'On a well-served trunk route the comparison changes completely. Delhi to Mumbai has many daily flights; a commercial ticket, especially for one traveller, is cheaper by a wide margin and the time saving is measured in an hour or two rather than a day.',
      'The cost comparison is also more nuanced than the headline suggests. Charter is priced per aircraft, so the arithmetic depends on how many travel: six premium tickets, six airport transfers and a hotel night forced by a bad connection is a materially different number from one economy fare. The correct comparison is the full cost of the alternative journey, including the working days it consumes.',
      'There are non-time reasons too. Charter allows discussion in a cabin nobody else is in, control of the departure time when a meeting overruns, and access to airports airlines do not serve. Whether those are worth the difference is a judgement about the specific trip, not a general rule.',
      'The honest summary: for one person on a busy route, fly commercially. For a group going somewhere awkward, or for a day that cannot be done any other way, charter frequently wins on the full accounting rather than on the fare.',
    ],
    supports: [
      { label: 'Private Jet Charter', href: '/private-charter/private-jet-charter', description: 'How jet charter works' },
      { label: 'Corporate Charter', href: '/services/corporate-charter', description: 'The business case in detail' },
      { label: 'Charter Pricing', href: '/pricing', description: 'What a trip actually costs' },
    ],
    canonical: '/insights/private-jet-vs-commercial-flight',
  },
  {
    slug: 'helicopter-vs-private-jet',
    category: 'helicopter-guide',
    title: 'Helicopter or private jet?',
    summary:
      'A helicopter is chosen when the destination has no runway and the sector is short; a jet is chosen when there is a runway and the distance is long enough for speed to matter.',
    published: '2026-09-17',
    body: [
      'These two aircraft solve different problems and are rarely genuine alternatives. The question is almost always answered by the destination rather than by preference.',
      'A helicopter removes the ground leg. It lands at a site rather than an airport — a plant, a venue, a hill town, a ridge — which makes it the only option where no runway exists, and poor value where one does. Over distance it is slower than a jet, and its range is a fraction of one.',
      'A jet needs a runway at both ends, which frequently means a road transfer at either or both. What it buys is speed over distance, altitude above most weather, and a cabin that supports work or rest. Below about an hour of flying, much of that advantage is consumed by the climb and descent.',
      'The two are often combined rather than compared. A jet covers the long sector between cities; a helicopter covers the last leg into a site that no aeroplane can reach. That combination is common for site visits in difficult terrain and is planned as one itinerary rather than two bookings.',
      'Cost behaves differently too. Helicopter missions are frequently dominated by ground waiting time rather than flying time, because an aircraft held at a site for a ceremony or a meeting is committed for the whole period. Jet charters are dominated by block hours and positioning. Comparing hourly rates across the two tells you very little about what a specific trip will cost.',
      'A practical test: if the place you are going has a runway and a reasonable road, start with an aeroplane. If it has neither, start with a helicopter. If it has one but not the other, the answer is usually both.',
    ],
    supports: [
      { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'How rotary charter works' },
      { label: 'Private Jet Charter', href: '/private-charter/private-jet-charter', description: 'When distance is the problem' },
      { label: 'Helicopters for Charter', href: '/aircraft/helicopters', description: 'Types and terrain' },
    ],
    canonical: '/insights/helicopter-vs-private-jet',
  },
  {
    slug: 'how-aircraft-positioning-affects-charter-pricing',
    category: 'pricing',
    title: 'How aircraft positioning affects charter pricing',
    summary:
      'Positioning is the flight that brings an aircraft to your departure point and the one that returns it afterwards, and it is the most common reason two quotes for the same trip differ substantially.',
    published: '2026-09-17',
    body: [
      'Aircraft live somewhere. Unlike an airline, which runs a network of flights that connect to each other, a charter aircraft sits at a base until someone charters it — and then it has to get to the passenger.',
      'If you are flying Mumbai to Goa and the aircraft is already in Mumbai, you pay for the Mumbai-Goa sector plus whatever it takes to recover the aircraft. If the same aircraft type is based in Delhi, you are also paying for Delhi-Mumbai empty before your trip begins. The aircraft is identical; the price is not.',
      'This is why one-way charters are not half the price of returns. On a return trip the aircraft is doing useful work in both directions. On a one-way it flies out with you and back without you, and that empty return usually appears in your quote.',
      'It is also why flexibility on airport can pay. A secondary airport thirty minutes further by road may have a suitable aircraft sitting on it, and the positioning saved can exceed the inconvenience — sometimes considerably.',
      'The same mechanism creates empty legs. When an aircraft has to reposition anyway, the operator would rather sell that sector than fly it empty, which is why empty-leg pricing looks anomalous until you understand that the flight was already going to happen.',
      'Two practical steps. Ask where the aircraft is based, and ask whether the quote includes positioning both ways. A quote that excludes it is not cheaper than one that includes it; it is describing a smaller part of the trip.',
    ],
    supports: [
      { label: 'Charter Pricing', href: '/pricing', description: 'All cost components' },
      { label: 'Empty Legs', href: '/empty-leg-charter', description: 'Positioning that works in your favour' },
      { label: 'Private Charter', href: '/private-charter', description: 'How a charter is planned' },
    ],
    canonical: '/insights/how-aircraft-positioning-affects-charter-pricing',
  },
  {
    slug: 'how-to-choose-an-aircraft-for-a-charter',
    category: 'aircraft-guide',
    title: 'How to choose an aircraft for a charter',
    summary:
      'Choose in this order — the airfield, the sector length, the passenger and baggage load, then comfort — because the first three remove options and only the last is a preference.',
    published: '2026-09-17',
    body: [
      'People usually start with the aircraft and work backwards to the trip. Starting with the trip is faster and cheaper, because most of the decision is made by constraints rather than by choice.',
      'Begin with the airfield at both ends. Runway length, surface, available approach aids and operating hours rule aircraft in or out before anything else is considered. A short regional strip may exclude every jet in the category you were looking at, and no amount of budget changes that.',
      'Then the sector length. Under roughly an hour, a turboprop frequently arrives within minutes of a jet for considerably less, because a jet spends most of a short flight climbing and descending. Beyond about two hours, the jet’s speed advantage compounds into genuine hours saved.',
      'Then the load. Count passengers and be honest about baggage: in light aircraft, volume runs out before weight does, and a party of six with golf bags or camera equipment is a different aircraft from a party of six with briefcases. In helicopters, passenger weights and temperature matter more than most people expect, particularly at altitude.',
      'Only now does comfort enter, and it is a real consideration rather than a frivolous one. A stand-up cabin changes what a three-hour flight is like, and on a working flight that difference has a business value. But it is chosen from what remains after the constraints, not before them.',
      'One last check: ask what the quote assumes about ground time. An aircraft that waits is charged for waiting, and an itinerary with a long hold in the middle may be cheaper with a different aircraft, or with two shorter flights, than with the obvious one.',
    ],
    supports: [
      { label: 'Aircraft & Fleet', href: '/aircraft', description: 'Types by category' },
      { label: 'Aircraft Charter', href: '/private-charter/aircraft-charter', description: 'Choosing across categories' },
      { label: 'Charter Pricing', href: '/pricing', description: 'How the choice affects cost' },
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
