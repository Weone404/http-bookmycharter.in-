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
    question: 'How much does it cost to charter a private jet in India?',
    answer:
      'Private jet charter cost in India depends on the aircraft type, flight hours, positioning (flying the aircraft to you), landing and handling charges, crew duty, waiting time and taxes.',
    elaboration: [
      'Charter is priced per trip, not per seat. The same route costs roughly the same for two people or eight, up to the aircraft’s capacity. So the cost per person falls sharply as your group grows. Parking charges and any extra services you ask for are added too.',
      'Positioning is the cost most travellers do not expect. If the aircraft is not already at your departure airport, the flight that brings it to you is part of your trip. So is the flight that takes it back to base if you are not returning.',
    ],
  },
  {
    question: 'How much does a helicopter charter cost in India?',
    answer:
      'Helicopter charter in India is usually priced on flight time at a rate set by the helicopter type, plus positioning, landing and helipad charges, crew, ground waiting time and taxes.',
    elaboration: [
      'Waiting time matters far more for helicopters than for jets. A helicopter that waits at a site for four hours is unavailable to anyone else for those four hours. So trips with long ground waits are usually quoted on total aircraft time, not flying time alone.',
    ],
  },
  {
    question: 'How do I book a helicopter in India?',
    answer:
      'To book a helicopter in India, send your route, date and number of passengers, and you get helicopter options with the cost broken down before you commit to anything.',
    elaboration: [
      'Site permissions and helipad limits are checked up front. If your trip uses a helipad that needs permission, tell us the date as early as you can, because permissions take time.',
    ],
  },
  {
    question: 'What is an empty leg flight?',
    answer:
      'An empty leg is a charter aircraft flying without passengers to collect a client or return to base, which an operator may sell at a reduced rate.',
    elaboration: [
      'The route and date belong to the original trip. If that trip is moved or cancelled, the empty leg changes or disappears. It only becomes firm when the operator confirms it.',
      'A normal one-way charter is common, but it is not half the price of a return. The aircraft still has to reach you, and usually has to fly back to base afterwards.',
    ],
  },
  {
    question: 'How early should I book a charter?',
    answer:
      'Simple domestic charters can often be arranged in 24 to 72 hours, but a specific aircraft, restricted airport, helipad permission, peak season or international trip needs more notice.',
    elaboration: [
      'The aircraft is rarely what holds things up. It is usually a permission, an airport slot, night-landing ability or a crew duty limit. Telling us your date early costs nothing and gives you more options.',
    ],
  },
  {
    question: 'Can a helicopter land anywhere?',
    answer:
      'No, a helicopter needs a site with clear approach paths, a firm surface, a controlled area and permission from whoever owns or governs the land.',
    elaboration: [
      'The surface must be firm enough not to throw up debris. Confirming the site is a normal part of planning, and it is better done weeks ahead than on the morning of the flight.',
    ],
  },
  {
    question: 'Is private jet charter worth it for a group?',
    answer:
      'Private jet charter can be worth it for a group, because you pay for the whole aircraft and the cost per person falls with every seat filled.',
    elaboration: [
      'For one person on a busy route, a commercial ticket is almost always cheaper. For six people visiting three cities in a day and returning the same night, the costs are much closer than most people think.',
      'Charter also makes sense when there is no convenient airline service to your destination, or when the time you save is worth more than the fare difference.',
    ],
  },
  {
    question: 'What happens if bad weather stops my charter flight?',
    answer:
      'Charter flights follow the same weather limits as any other flight, and the operator and pilot in command decide whether to fly, not you or us.',
    elaboration: [
      'This matters most for mountain and helipad flights. Low cloud or poor visibility can close a site within minutes and reopen it an hour later. Any trip into high terrain should have a realistic backup plan, not a fixed assumption.',
    ],
  },
];
