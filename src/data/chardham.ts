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
  title: 'Char Dham by private helicopter charter',
  summary:
    'Chartering a whole helicopter for Char Dham means the aircraft and its schedule are yours, which is a different product from a shuttle seat and is constrained almost entirely by altitude, weather and the helipads themselves.',
  body: [
    'There are two ways to reach the Garhwal shrines by air, and they are not variations of one thing. A shuttle seat is a place on a rotation that runs to its own timetable, fills with other passengers and departs when it is ready. A private charter is the aircraft: it departs when your party is ready, it flies your itinerary, and it waits if your day runs long. This page is about the second.',
    'What makes the flying difficult is the air rather than the distance. As elevation rises and the day warms, the air thins — and thinner air reduces both the lift the rotor generates and the power the engine produces, at the same time. The practical result is that a helicopter which lifts a full load comfortably at dawn from a valley floor may not lift the same load from a mountain helipad in the afternoon. This is why mountain flying favours early departures, why payload is discussed carefully before the day, and why the aircraft type chosen for this terrain is often not the most comfortable one available.',
    'The second constraint is the sites. Himalayan helipads are small, surrounded by terrain, and weather-exposed in a way airports are not. Cloud can close a site and clear it again within the hour, and a valley that is flyable at nine may not be at eleven. Any itinerary built on the assumption that every leg will operate on schedule is a plan with no margin in it.',
    'For a chartered aircraft, those constraints have a particular consequence: your schedule is genuinely yours, but the mountain still has a vote. A charter buys freedom from other passengers’ timings, not freedom from weather. The realistic version of the plan includes what happens if a leg cannot fly — a later window, a night in the valley, or a road alternative — and it is worth agreeing that before the trip rather than during it.',
  ],
  constraints: [
    'Density altitude — elevation combined with temperature — reduces what a helicopter can lift, and it worsens through the day',
    'Early departures are the norm in mountain operations, for the air rather than for the schedule',
    'Passenger and baggage weights matter far more here than at sea level and are confirmed before the flight',
    'Weather closes and reopens Himalayan sites within short windows',
    'The commander and the operator decide whether a leg can fly — that decision is not commercial',
    'The shrines are seasonal, and dates for opening and closing are announced by the temple authorities rather than by any operator',
  ],
  faqs: [
    {
      question: 'What is the difference between a Char Dham helicopter charter and a shuttle seat?',
      answer:
        'A charter is the whole aircraft flying your itinerary on your schedule; a shuttle seat is one place on a rotation that runs to its own timetable with other passengers.',
      elaboration: [
        'Charter costs more and removes the dependency on other passengers and on a rotation filling. For a family or a small group travelling together, the per-person gap is narrower than it first appears.',
      ],
    },
    {
      question: 'Why do mountain helicopter flights depart so early?',
      answer:
        'Because air density falls as the day warms, and thinner air reduces both rotor lift and engine power, so the same aircraft can carry more safely in the cool of the morning than in the afternoon.',
    },
    {
      question: 'What happens if weather stops a leg of the itinerary?',
      answer:
        'The flight does not operate until the commander judges it can, and in mountain terrain a site can close and reopen within the hour — so a realistic plan includes an alternative rather than assuming every leg will fly on schedule.',
    },
    {
      question: 'Which helicopter is used for Himalayan operations?',
      answer:
        'Types selected for high-altitude and hot-and-high performance, because retaining power and lift margin at elevation matters more on these routes than cabin comfort does.',
    },
  ],
  related: [
    { label: 'Kedarnath Helicopter Charter', href: '/chardham/kedarnath-helicopter', description: 'The specific constraints of that site' },
    { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'How rotary charter works generally' },
    { label: 'Helicopters for Charter', href: '/aircraft/helicopters', description: 'Types suited to high altitude' },
    { label: 'Charter Pricing', href: '/pricing', description: 'What drives the cost of a charter' },
  ],
};

export const KEDARNATH_PAGE: ChardhamPage = {
  path: '/chardham/kedarnath-helicopter',
  title: 'Kedarnath helicopter charter',
  summary:
    'A Kedarnath helicopter charter is a short, high-altitude sector into a confined mountain site, and almost everything about how it is planned follows from those two facts rather than from the distance flown.',
  body: [
    'The flying time is short. That is the first thing people misjudge about this route: the sector itself is brief, and the cost and the difficulty are not driven by distance at all. They are driven by where the aircraft is going and what the air is doing when it gets there.',
    'Kedarnath sits high, in a valley ringed by terrain, and the approach into it is not a long straight final over flat ground. That geometry limits which aircraft can operate there sensibly, how much they can carry, and how much margin the crew has if conditions change during the approach. It is the reason operators favour types with strong hot-and-high performance and the reason payload is discussed precisely rather than approximately.',
    'Departures for this sector are typically flown from helipads in the valley below rather than from a major airport, and a charter itinerary usually begins with getting the party and the aircraft to that valley. Where the aircraft is based, and whether it has to reposition from a city, is frequently a larger part of the cost than the mountain leg itself.',
    'For a private charter specifically, the aircraft is committed to your party for the day — including the time it spends on the ground while you are at the shrine. That waiting is part of what you are paying for, and it is the main reason a charter costs what it does relative to a seat on a rotation.',
    'Weather governs everything. A morning that looks clear in the valley can be unflyable at the site, and the reverse happens too. The realistic plan for this route has an alternative in it.',
  ],
  constraints: [
    'A confined, high-altitude site with terrain on the approach',
    'Payload is limited by density altitude and confirmed against actual passenger weights',
    'Ground waiting while the party is at the shrine is part of the chartered day',
    'Positioning the aircraft to the valley is often the larger cost, not the mountain sector',
    'Weather can close the site at short notice and reopen it as quickly',
    'Access, timings and any temple-side arrangements are governed by the authorities responsible for them, not by an operator',
  ],
  faqs: [
    {
      question: 'How long is the helicopter flight to Kedarnath?',
      answer:
        'The mountain sector itself is short — the journey is dominated by getting to the valley departure point and by the time the aircraft spends on the ground, not by the flying.',
    },
    {
      question: 'Can a helicopter charter to Kedarnath be booked for a single day?',
      answer:
        'A same-day charter is the usual shape of the trip, with the aircraft waiting while the party is at the shrine, and that waiting time is part of the chartered day.',
    },
    {
      question: 'Why is payload discussed before a Kedarnath flight?',
      answer:
        'Because thin air at altitude reduces what the helicopter can lift, so actual passenger and baggage weights determine what the aircraft can safely carry that day rather than a nominal seat count.',
    },
    {
      question: 'What happens if the weather closes in?',
      answer:
        'The flight waits until the commander judges conditions acceptable, and if the window does not open the leg does not operate — which is why a plan with an alternative is better than one without.',
    },
  ],
  related: [
    { label: 'Char Dham by Helicopter Charter', href: '/chardham', description: 'The wider Garhwal picture' },
    { label: 'Private Helicopter Charter', href: '/helicopter-charter/private-helicopter-charter', description: 'Whole-aircraft point-to-point hire' },
    { label: 'Helicopters for Charter', href: '/aircraft/helicopters', description: 'High-altitude types' },
    { label: 'Request a Charter', href: '/request-a-charter', description: 'Dates, party size and departure point' },
  ],
};

export const CHARDHAM_PAGES: readonly ChardhamPage[] = [CHARDHAM_HUB, KEDARNATH_PAGE];
