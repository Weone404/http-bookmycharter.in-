import type { Faq } from '@/types/faq';

/**
 * Real customer questions, answered in the first sentence.
 *
 * Every answer here is true regardless of whether Book My Charter operates or
 * arranges aircraft (B1), and none of them state a price, a certification or an
 * availability that has not been verified.
 */
export const HOME_FAQS: readonly Faq[] = [
  {
    question: 'How much does a private jet charter cost in India?',
    answer:
      'The cost of a private jet charter in India depends primarily on aircraft category, total flight hours, positioning of the aircraft to your departure point, landing and parking charges, ground handling, crew duty and waiting time, applicable taxes, and any additional services you request.',
    elaboration: [
      'Charter is priced per trip rather than per seat, so the same route costs roughly the same whether two people travel or eight — up to the aircraft’s capacity. That is why cost per person falls sharply as a group grows.',
      'The single largest variable most travellers do not expect is positioning. If the aircraft is not already at your departure airport, the flight that brings it to you is part of your trip, and so is the flight that returns it to base if you are not coming back.',
    ],
  },
  {
    question: 'How much does a helicopter charter cost in India?',
    answer:
      'Helicopter charter in India is normally priced on flight time, with the rate depending on the helicopter type, plus positioning to your departure helipad, landing and helipad charges, crew requirements, waiting time on ground, and taxes.',
    elaboration: [
      'Helicopters bill differently from jets in one important way: waiting time matters far more, because a helicopter that holds at a site for four hours is four hours unavailable to anyone else. Missions with long ground waits are usually quoted on total aircraft time rather than flying time alone.',
    ],
  },
  {
    question: 'How far in advance should I request a charter?',
    answer:
      'Straightforward domestic charters can often be arranged within 24 to 72 hours, but anything involving a specific aircraft type, a constrained airport, a helipad requiring permission, peak season, or international clearances needs considerably more notice.',
    elaboration: [
      'The binding constraint is rarely the aircraft. It is usually a permission, a slot, a night-landing capability, or a crew duty limit. Telling us the date as early as possible costs nothing and widens the options considerably.',
    ],
  },
  {
    question: 'Can I book a one-way charter?',
    answer:
      'Yes. One-way charter is common, though it is not half the price of a return trip, because the aircraft still has to get to you and usually has to return to base afterwards.',
    elaboration: [
      'Where a one-way trip happens to match an aircraft already needing to reposition in that direction, the economics change completely. That is what an empty leg is.',
    ],
  },
  {
    question: 'What happens if weather stops the flight?',
    answer:
      'Charter flights operate under the same weather minimums as any other flight, and the decision to fly rests with the operator and the commander, not with the passenger or with us.',
    elaboration: [
      'This matters most in mountain and helipad operations, where visibility and cloud base can close a site within minutes and reopen an hour later. Any itinerary into high terrain should be planned with a realistic alternative, not a fixed assumption.',
    ],
  },
  {
    question: 'Is chartering an aircraft only for very large budgets?',
    answer:
      'Not always. Charter becomes competitive when a group travels together, when a trip covers several cities in a day, when the destination has no convenient scheduled service, or when the value of the time saved is higher than the fare difference.',
    elaboration: [
      'For a single traveller on a well-served trunk route, a commercial ticket is almost always cheaper. For six people covering three cities in a day and returning the same night, the comparison is much closer than most people assume.',
    ],
  },
];
