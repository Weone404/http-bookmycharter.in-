import type { Service } from '@/types/service';

/** Specialist services. Each solves a problem the general charter pages do not. */
export const SPECIALIST_SERVICES: readonly Service[] = [
  {
    slug: 'services',
    cluster: 'services',
    name: 'Charter Services',
    keyword: 'charter services',
    headline: 'Charter Services in India',
    summary:
      'Charter services in India are flights planned around the purpose of the trip, such as corporate travel, weddings, medical transfers, aerial work and events, not around the aircraft alone.',
    definition: [
      'A charter for a board meeting, a wedding arrival and a medical transfer are three different jobs that happen to use aircraft. The aircraft is usually the last decision, not the first. The purpose sets the limits, the limits decide the aircraft, and only then is it worth talking about cost. That is why good charter services start with what the trip is for.',
      'The planning is what changes between them. A corporate programme needs repeatable trips and cost control. A wedding has a fixed moment that cannot slip. A medical transfer needs the right equipment, crew and timing. Aerial work needs approvals and the right aircraft set-up. Treat them all as "book an aircraft" and details get missed.',
    ],
    whoItIsFor: [
      'Companies with regular, recurring travel',
      'Families planning weddings and large events',
      'Anyone arranging an urgent medical transfer',
      'Production, survey and inspection teams',
    ],
    whenToUseIt: [
      'When the trip has a special need the aircraft must meet',
      'When an event, not your preference, fixes the timing',
      'When the flight needs equipment, a special set-up or approvals',
    ],
    howItWorks: [
      {
        title: 'Start with the purpose',
        description: 'What has to happen, by when, and what would count as the trip failing.',
      },
      {
        title: 'List the fixed limits',
        description: 'Fixed times, sites, equipment and approvals. These cannot be changed later.',
      },
      {
        title: 'Choose the aircraft to fit',
        description:
          'The aircraft and route are picked to meet those limits, not the other way round.',
      },
      {
        title: 'Plan a backup',
        description:
          'For anything exposed to weather or tight timing, the backup is part of the plan.',
      },
    ],
    suitableCategories: ['private-jet', 'helicopter', 'turboprop', 'group-charter'],
    missions: ['corporate', 'wedding', 'medical', 'film-and-aerial', 'group'],
    considerations: [
      'Events with a fixed moment need a backup plan, not hope.',
      'Special equipment and aircraft set-ups take weeks to arrange, not days.',
      'Approvals for sites and special operations are usually what takes longest.',
    ],
    pricingFactors: [
      {
        factor: 'Mission complexity',
        explanation:
          'A simple transfer and a multi-site day with equipment are very different jobs.',
      },
      {
        factor: 'Aircraft and configuration',
        explanation:
          'Special fittings and configurations (how the aircraft is set up) add their own cost and lead time.',
      },
      {
        factor: 'Standby and waiting',
        explanation: 'An aircraft held for your fixed moment cannot fly anyone else in that time.',
      },
    ],
    faqs: [
      {
        question: 'Do charter services include ground arrangements as well as the flight?',
        answer:
          'Ground coordination around a charter, such as airport handling, transfers and timing at each end, is part of planning the trip and is arranged case by case for your itinerary.',
      },
      {
        question: 'How early should I book a wedding or event charter?',
        answer:
          'Book as soon as the date is fixed, because event charters usually depend on a landing site that must be confirmed and permissions that take time, not just on aircraft availability.',
      },
    ],
    related: [
      {
        label: 'Corporate Charter',
        href: '/services/corporate-charter',
        description: 'Regular business travel',
      },
      {
        label: 'Aerial Flower Dropping',
        href: '/services/aerial-flower-dropping',
        description: 'Flower showers by helicopter',
      },
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'Flights to sites without a runway',
      },
      { label: 'Private Charter', href: '/private-charter', description: 'Hire a whole aircraft' },
    ],
    canonical: '/services',
  },
  {
    slug: 'corporate-charter',
    cluster: 'services',
    name: 'Corporate Charter',
    keyword: 'corporate charter',
    headline: 'Corporate Charter in India',
    summary:
      'Corporate charter in India is private air travel used as a business tool: it moves teams to places scheduled flights serve badly and fits multi-city trips into one working day.',
    definition: [
      'Business travel by charter is rarely about comfort. It is about time. A plant visit that takes two days by airline and road can take one day by charter. The day you save is the real gain: salaries, hotel nights and the meetings that did not have to move.',
      'The cost comparison also changes with team size. Charter is priced for the whole aircraft, so a team of six shares one cost. Compare that with six premium tickets, plus transfers, plus a hotel night because the return flight does not connect. The gap narrows a lot, and sometimes closes.',
      'If your company flies the same routes often, corporate charter becomes a programme rather than a string of one-off bookings. You get known routes, known aircraft options, a repeatable approval path and costs you can forecast in advance instead of finding out afterwards.',
    ],
    whoItIsFor: [
      'Companies with plants, sites or projects far from major airports',
      'Executive teams travelling together to the same place',
      'Businesses running site visits, audits or inspections on a schedule',
      'Organisations whose travel is driven by urgency, not planning',
    ],
    whenToUseIt: [
      'When several people fly to the same place on the same day',
      'When flight timings alone would force an overnight stay',
      'When you need to cover two or three sites in one day',
      'When a decision cannot wait for the next airline flight',
    ],
    howItWorks: [
      {
        title: 'Map the routes you really fly',
        description: 'Your regular city pairs and sites, and the limits each one has.',
      },
      {
        title: 'Set the aircraft options per route',
        description:
          'Runway length and distance usually narrow it to two or three sensible choices.',
      },
      {
        title: 'Build a repeatable request process',
        description: 'So you can arrange a trip in one message instead of starting from scratch.',
      },
      {
        title: 'Track the real comparison',
        description:
          'Compare with the full cost of flying by airline, including the working days it uses up.',
      },
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter', 'group-charter'],
    missions: ['corporate', 'group', 'regional'],
    considerations: [
      'Compare with the total cost of the alternative, not just the airfare.',
      'Plan regular routes once, not every time you fly.',
      'A same-day multi-city trip can hit crew duty limits (legal limits on crew working hours). Check the whole day, not just each flight.',
      'Passenger lists often change late in corporate travel, so choose an aircraft with spare seats.',
    ],
    pricingFactors: [
      {
        factor: 'Route and aircraft',
        explanation:
          'Distance and runway length decide the aircraft type, and the type decides most of the cost.',
      },
      {
        factor: 'Number of sectors (flights) in the day',
        explanation:
          'Each landing adds handling and ground time. A long day can also add crew cost.',
      },
      {
        factor: 'Positioning',
        explanation:
          'Positioning (flying the aircraft to your city) costs less on a regular route from a base with suitable aircraft than on an occasional one.',
      },
      {
        factor: 'Waiting time',
        explanation:
          'If the aircraft waits on the ground during a site visit, that time is charged.',
      },
    ],
    faqs: [
      {
        question: 'Is corporate charter in India cheaper than business-class tickets?',
        answer:
          'Not for one traveller on a busy route, but for a team of five or more going somewhere poorly served, the full cost comparison is often much closer than expected.',
        elaboration: [
          'Count everything on both sides: fares, airport transfers, hotel nights and working days lost. Charter is priced for the aircraft, so the whole team shares one cost.',
        ],
      },
      {
        question: 'Can we use corporate charter for regular, repeat travel?',
        answer:
          'Yes, and regular routes are worth planning once as a programme, because the same limits and the same aircraft options apply every time.',
      },
      {
        question: 'What happens if our meeting runs late?',
        answer:
          'If the aircraft is waiting for you, the extra ground time is charged, and a long delay can run into crew duty limits, so give an honest estimate of your ground time when you plan.',
      },
    ],
    related: [
      {
        label: 'Private Jet Charter',
        href: '/private-charter/private-jet-charter',
        description: 'Jet sizes and which routes suit them',
      },
      {
        label: 'Aircraft Charter',
        href: '/private-charter/aircraft-charter',
        description: 'Turboprops for regional sites',
      },
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'Site visits without a runway',
      },
      { label: 'Charter Pricing', href: '/pricing', description: 'How to compare quotes fairly' },
    ],
    canonical: '/services/corporate-charter',
    parent: '/services',
  },
  {
    slug: 'aerial-flower-dropping',
    cluster: 'services',
    name: 'Aerial Flower Dropping',
    keyword: 'helicopter flower dropping',
    headline: 'Helicopter Flower Dropping',
    summary:
      'Helicopter flower dropping is a short helicopter flight that releases petals over a wedding, temple event or ceremony, and the site and crowd below matter more than the flying.',
    definition: [
      'Helicopter flower dropping, also called a flower shower by helicopter or pushpa varsha, is a short and simple flight. The hard part is on the ground: a crowd, a fixed moment and a helicopter flying low over people. That is why it is planned as a ground operation with a flying part, not as a flight with a flourish at the end.',
      'The essentials are a surveyed drop area and an approach and departure path clear of obstacles and of the crowd. The crowd must be controlled so nobody moves under the helicopter. You need permission from whoever controls the venue and the airspace. The petals must be prepared so they spread out as they fall, instead of dropping in a clump.',
      'Timing is the other fixed limit. A ceremony runs at its own pace, and the helicopter cannot wait around forever. So the drop is planned for a time window, and a named person on the ground confirms the moment.',
    ],
    whoItIsFor: [
      'Wedding families planning a ceremonial arrival or blessing',
      'Temple and religious event organisers',
      'Public event and civic ceremony organisers',
    ],
    whenToUseIt: [
      'For one ceremonial moment with a set time window',
      'Where the venue can safely allow a helicopter to fly over',
      'Where organisers can keep the area under the drop clear',
    ],
    howItWorks: [
      {
        title: 'Survey the site',
        description:
          'Drop area, approach and departure paths, obstacles, and where the crowd will actually stand on the day.',
      },
      {
        title: 'Get permissions',
        description:
          'From the venue and local authority, plus any airspace approvals the location needs.',
      },
      {
        title: 'Plan the moment',
        description:
          'A time window, not an exact minute, with a named ground contact who confirms it.',
      },
      {
        title: 'Brief the ground team',
        description:
          'Crowd control, marshals on the ground, and what happens if the flight has to break off.',
      },
    ],
    suitableCategories: ['helicopter'],
    missions: ['wedding', 'film-and-aerial'],
    considerations: [
      'The crowd is the main safety concern, not the flight.',
      'Petals must be prepared so they spread out. The wrong material is a hazard, not a detail.',
      'Ceremonies run late, and a helicopter cannot wait indefinitely.',
      'Wind and poor visibility can move or cancel the drop on the day.',
      'Some venues and locations will not allow a flower drop at all, so check this early.',
    ],
    pricingFactors: [
      {
        factor: 'Helicopter type and flight time',
        explanation:
          'The flight is usually short. Getting the helicopter to the venue is often the bigger part.',
      },
      {
        factor: 'Positioning',
        explanation: 'Flying the helicopter to the venue area and back to its base.',
      },
      {
        factor: 'Standby time',
        explanation: 'Keeping the helicopter available around a ceremony window that may move.',
      },
      {
        factor: 'Site preparation and permissions',
        explanation: 'Survey, approvals and ground coordination. These vary completely by venue.',
      },
    ],
    faqs: [
      {
        question: 'What does helicopter flower dropping need at the venue?',
        answer:
          'Helicopter flower dropping needs a clear drop area with open approach and departure paths, crowd control below, permission from the venue and local authority, and a named ground contact to confirm the moment.',
      },
      {
        question: 'Can a helicopter flower shower be done at any venue?',
        answer:
          'No, because obstacles, crowd layout, nearby airspace limits and local permissions all decide it, so the site is checked before a date is confirmed.',
      },
      {
        question: 'What happens if the wedding or ceremony runs late?',
        answer:
          'The drop is planned for a time window rather than an exact minute, but a helicopter cannot wait indefinitely, so a realistic window and a ground contact who can confirm timing matter most.',
      },
    ],
    related: [
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'How helicopter flights are planned',
      },
      {
        label: 'Charter Services',
        href: '/services',
        description: 'Charter planned around your purpose',
      },
      {
        label: 'Helicopters for Charter',
        href: '/aircraft/helicopters',
        description: 'Types used for event flights',
      },
      {
        label: 'Request a Charter',
        href: '/request-a-charter',
        description: 'Tell us the venue and the date',
      },
    ],
    canonical: '/services/aerial-flower-dropping',
    parent: '/services',
  },
];
