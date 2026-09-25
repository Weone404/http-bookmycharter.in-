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
  'An empty leg (a one-way repositioning flight) is a charter flight with no passengers on board. Any charter can create one. If an aircraft is based in one city and hired from another, it must fly empty to reach the passenger. After the trip, it usually flies home empty too. The operator pays for those flights whether anyone is on board or not.',
  'That is why empty leg flights in India can be sold cheaply. The aircraft, the crew and the fuel are already committed. So a passenger on that flight is income against a cost the operator has already accepted. It is not a shop-style discount. It is simply the maths of a flight that was going to happen anyway.',
  'The trade-off is control. The route, date and departure window are set by the trip that created the empty leg. You fit yourself to an existing flight instead of ordering your own. That is the opposite of what charter normally offers, and it is why the price is different.',
];

export const EMPTY_LEG_CONDITIONS: readonly string[] = [
  'Empty legs come from someone else’s charter, so they appear at short notice, not on a schedule.',
  'If the original trip moves, changes route or is cancelled, the empty leg moves, changes or disappears with it.',
  'Routes and dates are fixed. You have to be flexible, because the aircraft is not.',
  'Departure windows are often narrow and set by the operator, not by the passenger.',
  'It is the same aircraft with the same crew that would have flown the paid trip. It is not a lower class of service.',
];

export const EMPTY_LEG_SUITS: readonly string[] = [
  'Travellers with a destination in mind but no fixed date',
  'Anyone who can leave at a day or two’s notice',
  'Trips where not flying would be an inconvenience, not a failure',
  'People who are flexible about which airport they use',
];

export const EMPTY_LEG_DOES_NOT_SUIT: readonly string[] = [
  'Fixed meetings, ceremonies or connecting flights',
  'Anyone who needs certainty weeks in advance',
  'Trips with more than one leg that must connect',
  'Travel where a cancellation would be costly',
];

export const EMPTY_LEG_FAQS: readonly Faq[] = [
  {
    question: 'What is an empty leg flight?',
    answer:
      'An empty leg flight is a charter aircraft flying without passengers, either to collect a client or to return to base afterwards, which an operator may sell at a lower rate because it is flying anyway.',
  },
  {
    question: 'Why are empty leg flights cheaper?',
    answer:
      'Empty leg flights are cheaper because the operator has already committed the aircraft, the crew and the fuel, so any fare on that flight offsets a cost that exists either way.',
  },
  {
    question: 'How reliable is an empty leg flight?',
    answer:
      'An empty leg is only as reliable as the charter that created it: if that trip is moved or cancelled, the empty leg changes or disappears, and it is firm only once the operator confirms it.',
  },
  {
    question: 'How do I find empty leg flights in India?',
    answer:
      'Tell us the direction you want to fly and the window you could travel in, and we will match it against repositioning flights as they come up, so you do not have to watch a list.',
    elaboration: [
      'Empty legs are created by other people’s bookings, so they appear at short notice. A standing request with a flexible window catches far more than checking a page now and then.',
    ],
  },
  {
    question: 'Can I change the route or date of an empty leg?',
    answer:
      'Usually not, because the route and date belong to the original trip, and a real change turns it back into a normal charter with normal pricing.',
  },
];
