import type { Faq } from '@/types/faq';
import type { InternalLink, Path } from '@/types/common';

/**
 * Char Dham, framed as CHARTER.
 *
 * This is the secondary cluster on a charter platform, not a pilgrimage site.
 * The sister property bookmychardham.in owns the pilgrimage framing — seats,
 * packages, darshan, season, temple logistics. Everything here is about
 * chartering a whole aircraft into difficult terrain: the aircraft, the air it
 * flies in, the sites, and why the operation is constrained.
 *
 * The rule from docs/IA.md section 0: if a paragraph would sit equally well on
 * the pilgrimage site, it does not belong here.
 *
 * Nothing in this file states a reporting time, a walk distance, a price, a
 * season date or a cancellation rate. Those are operational facts that need
 * verification (docs/BUSINESS-DATA-REQUIRED D4), and the old site's claims
 * register exists because they were once asserted without it.
 */
export interface ChardhamPage {
  readonly path: Path;
  readonly title: string;
  readonly summary: string;
  readonly body: readonly string[];
  readonly constraints: readonly string[];
  readonly faqs: readonly Faq[];
  readonly related: readonly InternalLink[];
}

export const CHARDHAM_HUB: ChardhamPage = {
  path: '/chardham',
  title: 'Char Dham Helicopter Charter',
  summary:
    'A Char Dham helicopter charter means you hire the whole helicopter and its schedule, not a shuttle seat, and the flying is limited mainly by altitude, weather and the helipads.',
  body: [
    'There are two ways to fly to the Garhwal shrines, and they are different products. A shuttle seat is one place on a helicopter that runs to its own timetable. It carries other passengers and leaves when it is ready. A private helicopter charter gives you the whole aircraft. It leaves when your group is ready, flies your route and waits if your day runs long. If you are planning a Char Dham yatra by helicopter for your own group, this page is about the second option.',
    'The hard part of the flying is the air, not the distance. Air gets thinner as height and temperature rise. Pilots call this density altitude (thin air at height). Thin air cuts the lift from the rotor and the power from the engine at the same time. So a helicopter that lifts a full load easily at dawn from a valley floor may not lift the same load from a mountain helipad in the afternoon. That is why mountain flights leave early, and why payload (the weight of passengers and bags) is agreed carefully before the day. It is also why the helicopter chosen for this terrain is often not the most comfortable one available.',
    'The second limit is the helipads. Himalayan helipads are small, ringed by mountains and more exposed to weather than airports. Cloud can close a helipad and clear again within the hour. A valley that is flyable at nine may not be flyable at eleven. A plan that assumes every leg will fly on time has no margin in it.',
    'With a Char Dham helicopter charter, your schedule really is yours, but the mountain still has a say. A charter frees you from other passengers’ timings. It does not free you from the weather. A realistic plan says what happens if a leg cannot fly: a later window, a night in the valley or a road alternative. Agree that before the trip, not during it.',
  ],
  constraints: [
    'Density altitude (thin air from height and heat) cuts what a helicopter can lift, and it gets worse through the day',
    'Early departures are normal in the mountains, because the morning air is better, not because of the schedule',
    'Passenger and baggage weights matter far more here than at sea level, and are confirmed before the flight',
    'Weather closes and reopens Himalayan helipads within short windows',
    'The commander and the operator decide whether a leg can fly, and that decision is not a commercial one',
    'The shrines are seasonal, and opening and closing dates are announced by the temple authorities, not by any operator',
  ],
  faqs: [
    {
      question: 'What is the difference between a Char Dham helicopter charter and a shuttle seat?',
      answer:
        'A Char Dham helicopter charter gives you the whole helicopter flying your route on your schedule, while a shuttle seat is one place on a helicopter that runs to its own timetable with other passengers.',
      elaboration: [
        'A charter costs more. In return, you do not depend on other passengers or on a shuttle filling up. For a family or small group travelling together, the gap per person is smaller than it first looks.',
      ],
    },
    {
      question: 'Why do helicopter flights in the mountains leave so early?',
      answer:
        'They leave early because the air thins as the day warms, and thinner air cuts both rotor lift and engine power, so the same helicopter can safely carry more in the cool of the morning.',
    },
    {
      question: 'What happens if bad weather stops a leg of my Char Dham trip?',
      answer:
        'The helicopter does not fly until the commander judges it can, and because a mountain helipad can close and reopen within the hour, a good plan includes an alternative instead of assuming every leg will fly on time.',
    },
    {
      question: 'Which helicopter is used for Char Dham and other Himalayan flights?',
      answer:
        'Operators favour helicopter types chosen for strong high-altitude and hot-and-high performance (keeping power and lift in thin, warm air), because that margin matters more on these routes than cabin comfort.',
    },
  ],
  related: [
    {
      label: 'Kedarnath Helicopter Charter',
      href: '/chardham/kedarnath-helicopter',
      description: 'What makes the Kedarnath helipad different',
    },
    {
      label: 'Helicopter Charter',
      href: '/helicopter-charter',
      description: 'How helicopter charter works in India',
    },
    {
      label: 'Helicopters for Charter',
      href: '/aircraft/helicopters',
      description: 'Types suited to high altitude',
    },
    {
      label: 'Charter Pricing',
      href: '/pricing',
      description: 'What drives the cost of a charter',
    },
  ],
};

export const KEDARNATH_PAGE: ChardhamPage = {
  path: '/chardham/kedarnath-helicopter',
  title: 'Kedarnath Helicopter Charter',
  summary:
    'A Kedarnath helicopter charter is a short, high-altitude flight into a tight mountain helipad, and those two facts shape the planning far more than the distance flown.',
  body: [
    'The flight itself is short. This is the first thing people get wrong about the route. Distance does not drive the cost or the difficulty. What drives them is where the helicopter is going and what the air is doing when it gets there.',
    'Kedarnath sits high in a valley ringed by mountains. The approach is not a long, straight descent over flat ground. That limits which helicopters can fly there sensibly, how much they can carry, and how much margin the crew has if conditions change on the approach. It is why operators favour types with strong hot-and-high performance (power in thin, warm air). It is also why payload is worked out precisely, not roughly.',
    'Flights to Kedarnath usually leave from helipads in the valley below, not from a major airport. So a charter usually starts by getting your group and the helicopter to that valley. Where the helicopter is based matters too. Positioning (flying it from a city base to the valley) is often a bigger part of the cost than the mountain flight itself.',
    'With a private helicopter to Kedarnath, the aircraft is yours for the day. That includes the time it waits on the ground while you are at the shrine. You pay for that waiting time, and it is the main reason a Kedarnath helicopter charter costs more than a seat on a shuttle.',
    'Weather decides everything. A morning that looks clear in the valley can be unflyable at the helipad, and the reverse happens too. A realistic plan for this route includes an alternative.',
  ],
  constraints: [
    'A small, high-altitude helipad with mountains on the approach',
    'Payload is limited by density altitude (thin air at height) and checked against actual passenger weights',
    'Waiting on the ground while you are at the shrine is part of the chartered day',
    'Positioning the helicopter to the valley often costs more than the mountain flight',
    'Weather can close the helipad at short notice and reopen it just as quickly',
    'Access, timings and any temple-side arrangements are set by the authorities responsible, not by an operator',
  ],
  faqs: [
    {
      question: 'How long is the helicopter flight to Kedarnath?',
      answer:
        'The flight to Kedarnath is short, and most of the trip goes on reaching the valley helipad and on the helicopter’s time on the ground, not on the flying.',
    },
    {
      question: 'Can I book a Kedarnath helicopter charter for one day?',
      answer:
        'Yes, a same-day trip is the usual plan, with the helicopter waiting while you are at the shrine, and that waiting time is part of the chartered day.',
    },
    {
      question: 'Why is weight checked before a Kedarnath helicopter flight?',
      answer:
        'Thin air at altitude reduces what a helicopter can lift, so the actual weight of passengers and bags, not the number of seats, decides what it can safely carry that day.',
    },
    {
      question: 'What happens if the weather closes in at Kedarnath?',
      answer:
        'The helicopter waits until the commander judges conditions acceptable, and if the window does not open the flight does not go, which is why a plan with an alternative is better than one without.',
    },
  ],
  related: [
    {
      label: 'Char Dham Helicopter Charter',
      href: '/chardham',
      description: 'Flying the wider Garhwal region',
    },
    {
      label: 'Private Helicopter Charter',
      href: '/helicopter-charter/private-helicopter-charter',
      description: 'Hire a whole helicopter point to point',
    },
    {
      label: 'Helicopters for Charter',
      href: '/aircraft/helicopters',
      description: 'High-altitude types',
    },
    {
      label: 'Request a Charter',
      href: '/request-a-charter',
      description: 'Dates, group size and departure point',
    },
  ],
};

export const CHARDHAM_PAGES: readonly ChardhamPage[] = [CHARDHAM_HUB, KEDARNATH_PAGE];
