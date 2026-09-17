import type { Faq } from '@/types/faq';
import type { EmptyLeg } from '@/types/charter-request';

/**
 * Empty-leg content.
 *
 * `AVAILABLE_EMPTY_LEGS` is deliberately empty. No verified feed of operator
 * availability exists (docs/BUSINESS-DATA-REQUIRED F1), and presenting invented
 * rows as live inventory would be a fabricated availability claim — one of the
 * things the brief explicitly forbids. The page renders an honest empty state
 * and a request form instead, and becomes a live inventory interface the moment
 * a real feed exists, with no template change required.
 */
export const AVAILABLE_EMPTY_LEGS: readonly EmptyLeg[] = [];

export const EMPTY_LEG_EXPLAINER: readonly string[] = [
  'An empty leg is a charter flight operating without passengers. Every charter can create one: an aircraft based in one city and chartered from another must fly to the passenger empty, and after the trip it usually flies home empty too. Those sectors are already paid for by the operator whether or not anybody is on board.',
  'That is why they can be sold cheaply. The aircraft, the crew and the fuel are committed, so a passenger on that sector is revenue against a cost the operator has already accepted. It is not a discount in the retail sense — it is the arithmetic of a flight that was going to happen anyway.',
  'The trade is control. An empty leg’s route, date and departure window are set by the trip that created it, so you fit yourself to an existing flight rather than commissioning one. That is the exact opposite of what charter normally offers, and it is the whole reason the price is different.',
];

export const EMPTY_LEG_CONDITIONS: readonly string[] = [
  'Availability is created by someone else’s charter, so it appears at short notice rather than on a schedule.',
  'If the original trip moves, changes route or cancels, the empty leg moves, changes or disappears with it.',
  'Routes and dates are fixed. Flexibility sits with you, not with the aircraft.',
  'Departure windows are often narrow and set by the operator, not the passenger.',
  'The aircraft is the same aircraft with the same crew that would have flown the paid sector — it is not a lower class of service.',
];

export const EMPTY_LEG_SUITS: readonly string[] = [
  'Travellers with a destination in mind but no fixed date',
  'Anyone who can depart at a day or two’s notice',
  'Trips where the journey not happening is an inconvenience rather than a failure',
  'People already flexible about which airport they use',
];

export const EMPTY_LEG_DOES_NOT_SUIT: readonly string[] = [
  'Fixed meetings, ceremonies or connections',
  'Anyone who needs certainty weeks in advance',
  'Itineraries with more than one leg that must connect',
  'Travel where a cancellation would be costly',
];

export const EMPTY_LEG_FAQS: readonly Faq[] = [
  {
    question: 'What is an empty leg flight?',
    answer:
      'An empty leg is a charter aircraft repositioning without passengers — flying to collect a client, or returning to base afterwards — which an operator may sell at a reduced rate because the flight is happening regardless.',
  },
  {
    question: 'Why are empty legs cheaper?',
    answer:
      'Because the operator has already committed the aircraft, the crew and the fuel to that sector, so any revenue on it offsets a cost that exists either way.',
  },
  {
    question: 'How reliable is an empty leg?',
    answer:
      'It depends entirely on the charter that created it: if that trip is rescheduled or cancelled, the empty leg changes or disappears, and it only becomes firm when the operator confirms it.',
  },
  {
    question: 'How do I find an empty leg?',
    answer:
      'Tell us your preferred direction and the window you could travel in, and we will match it against repositioning flights as they come up rather than asking you to watch a list.',
    elaboration: [
      'Because availability is created by other people’s bookings, it appears at short notice. A standing request with a flexible window catches far more than checking a page occasionally.',
    ],
  },
  {
    question: 'Can I change the route or date of an empty leg?',
    answer:
      'Not usually — the route and date belong to the original trip, and a meaningful change turns it back into a normal charter with normal pricing.',
  },
];
