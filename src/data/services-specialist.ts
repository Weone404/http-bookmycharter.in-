import type { Service } from '@/types/service';

/** Specialist services. Each solves a problem the general charter pages do not. */
export const SPECIALIST_SERVICES: readonly Service[] = [
  {
    slug: 'services',
    cluster: 'services',
    name: 'Charter Services',
    summary:
      'Some charter requirements are defined by the purpose of the trip rather than the aircraft — corporate programmes, weddings, medical movement, aerial work and events each carry constraints the aircraft choice follows from.',
    definition: [
      'A charter for a board meeting, a charter for a wedding arrival and a charter for a medical transfer are three different pieces of work that happen to use aircraft. The aircraft is usually the last decision, not the first: the purpose sets the constraints, the constraints select the aircraft, and only then does cost become a meaningful conversation.',
      'What changes between them is the planning. A corporate programme is about repeatability and cost control. A wedding is about a fixed moment that cannot slip. A medical transfer is about equipment, crew and time. Aerial work is about approvals and configuration. Treating them all as "book an aircraft" is how details get missed.',
    ],
    whoItIsFor: [
      'Companies with recurring travel requirements',
      'Families planning weddings and large events',
      'Anyone arranging urgent medical movement',
      'Production, survey and inspection teams',
    ],
    whenToUseIt: [
      'When the trip has a purpose-specific constraint the aircraft must satisfy',
      'When timing is fixed by an event rather than by preference',
      'When the flight needs equipment, configuration or approvals',
    ],
    howItWorks: [
      { title: 'Start from the purpose', description: 'What has to happen, by when, and what would count as the trip failing.' },
      { title: 'Identify the hard constraints', description: 'Fixed times, sites, equipment, approvals — the things that cannot be negotiated later.' },
      { title: 'Select against those', description: 'Aircraft and routing chosen to satisfy the constraints, not the other way round.' },
      { title: 'Plan the contingency', description: 'For anything weather-exposed or time-critical, the alternative is part of the plan.' },
    ],
    suitableCategories: ['private-jet', 'helicopter', 'turboprop', 'group-charter'],
    missions: ['corporate', 'wedding', 'medical', 'film-and-aerial', 'group'],
    considerations: [
      'Fixed-moment events need contingency planning, not optimism.',
      'Equipment and configuration requirements have lead times measured in weeks, not days.',
      'Approvals for sites and for specialist operations are the usual critical path.',
    ],
    pricingFactors: [
      { factor: 'Mission complexity', explanation: 'A straightforward transfer and a multi-site day with equipment are different pieces of work.' },
      { factor: 'Aircraft and configuration', explanation: 'Specialist fits and configurations carry cost and lead time of their own.' },
      { factor: 'Standby and waiting', explanation: 'Availability held for a fixed moment is availability withheld from everyone else.' },
    ],
    faqs: [
      {
        question: 'Do you handle ground arrangements as well as the flight?',
        answer: 'Ground coordination around a charter — airport handling, transfers and timing at each end — is part of planning the trip, and is arranged case by case depending on what the itinerary needs.',
      },
      {
        question: 'How far ahead should a wedding or event charter be arranged?',
        answer: 'As early as the date is fixed, because event charters usually depend on a landing site that needs confirming and permissions that take time, not on aircraft availability alone.',
      },
    ],
    related: [
      { label: 'Corporate Charter', href: '/services/corporate-charter', description: 'Recurring business travel' },
      { label: 'Aerial Flower Dropping', href: '/services/aerial-flower-dropping', description: 'Ceremonial flower showering by helicopter' },
      { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'Site-based rotary operations' },
      { label: 'Private Charter', href: '/private-charter', description: 'Whole-aircraft hire' },
    ],
    canonical: '/services',
  },
  {
    slug: 'corporate-charter',
    cluster: 'services',
    name: 'Corporate Charter',
    summary:
      'Corporate charter is air charter used as a business tool — moving teams to places scheduled services reach badly, and compressing multi-city travel into a working day.',
    definition: [
      'The corporate case for charter is rarely about comfort. It is about the calendar. A plant visit that takes two days by scheduled air and road can take one by charter, and the second day is the actual saving — salaries, hotel nights, and the meetings that did not have to be moved.',
      'The arithmetic also changes with headcount. Charter is priced for the aircraft, so a team of six splits one cost. Compared against six premium tickets, plus transfers, plus a night in a hotel because the return connection does not work, the gap narrows considerably and sometimes closes.',
      'For companies flying the same routes repeatedly, the planning becomes a programme rather than a series of bookings: known routes, known aircraft options, a repeatable approval path, and cost that can be forecast rather than discovered.',
    ],
    whoItIsFor: [
      'Companies with plants, sites or projects away from major airports',
      'Executive teams travelling together to the same destination',
      'Businesses running site visits, audits or inspections on a schedule',
      'Organisations whose travel is shaped by urgency rather than planning',
    ],
    whenToUseIt: [
      'When several people travel to the same place on the same day',
      'When a trip requires an overnight stay only because of flight timings',
      'When two or three sites must be covered in one day',
      'When a decision cannot wait for the next available scheduled service',
    ],
    howItWorks: [
      { title: 'Map the routes you actually fly', description: 'Recurring city pairs and sites, with the constraints each carries.' },
      { title: 'Establish the aircraft options per route', description: 'Runway and distance usually narrow it to two or three sensible answers.' },
      { title: 'Build a repeatable request path', description: 'So a trip is arranged in one message rather than negotiated from scratch each time.' },
      { title: 'Track the real comparison', description: 'Against the full cost of the scheduled alternative, including the days it consumes.' },
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter', 'group-charter'],
    missions: ['corporate', 'group', 'regional'],
    considerations: [
      'Compare against the total cost of the alternative, not against the airfare alone.',
      'Recurring routes are worth planning once rather than repeatedly.',
      'A same-day multi-city itinerary can run into crew duty limits — check the day, not just the sectors.',
      'Passenger lists change late in corporate travel; aircraft capacity should have headroom.',
    ],
    pricingFactors: [
      { factor: 'Route and aircraft', explanation: 'Distance and runway constraints decide the category, which decides most of the cost.' },
      { factor: 'Number of sectors in the day', explanation: 'Each landing adds handling and ground time, and a long day can add crew cost.' },
      { factor: 'Positioning', explanation: 'A recurring route from a base with suitable aircraft positions more cheaply than an occasional one.' },
      { factor: 'Waiting time', explanation: 'Site visits with the aircraft held on the ground are charged for the hold.' },
    ],
    faqs: [
      {
        question: 'Is corporate charter cheaper than business-class tickets?',
        answer: 'For a single traveller on a trunk route, no; for a team of five or more travelling to a poorly served destination, the full comparison — fares, transfers, hotel nights and working days lost — is often much closer than expected.',
      },
      {
        question: 'Can we use charter for regular, repeating travel?',
        answer: 'Yes, and recurring routes are worth planning once as a programme, because the same constraints and the same aircraft options apply every time.',
      },
      {
        question: 'What happens if our meeting overruns?',
        answer: 'If the aircraft is held for you, the additional ground time is chargeable, and a long overrun can run into crew duty limits — which is why the expected ground time is worth stating honestly when the trip is planned.',
      },
    ],
    related: [
      { label: 'Private Jet Charter', href: '/private-charter/private-jet-charter', description: 'Cabin classes and sector fit' },
      { label: 'Aircraft Charter', href: '/private-charter/aircraft-charter', description: 'Turboprops for regional sites' },
      { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'Site visits without a runway' },
      { label: 'Charter Pricing', href: '/pricing', description: 'Building a comparable quote' },
    ],
    canonical: '/services/corporate-charter',
    parent: '/services',
  },
  {
    slug: 'aerial-flower-dropping',
    cluster: 'services',
    name: 'Aerial Flower Dropping',
    summary:
      'Aerial flower dropping is a helicopter flight that releases flower petals over a gathering, and it is governed far more by the site and the crowd below than by the flying itself.',
    definition: [
      'The flight is short and simple. Everything difficult about this mission is on the ground: a crowd, a fixed moment, and an aircraft operating low over people. That combination is why it is planned as a site operation with a flying component rather than as a flight with a flourish at the end.',
      'The essentials are a surveyed drop area, an approach and departure path clear of obstacles and of the gathering itself, control of the crowd so nobody moves under the aircraft, permission from whoever governs the venue and the airspace, and petals prepared so that what is released disperses rather than falls as a mass.',
      'Timing is the other hard constraint. A ceremony runs to its own rhythm and the aircraft cannot loiter indefinitely, so the drop is planned against a window with a named person on the ground who confirms the moment.',
    ],
    whoItIsFor: [
      'Wedding families planning a ceremonial arrival or blessing',
      'Temple and religious event organisers',
      'Public event and civic ceremony organisers',
    ],
    whenToUseIt: [
      'For a single ceremonial moment with a defined window',
      'Where the venue can accommodate a helicopter overflight safely',
      'Where the organisers can control the area beneath the drop',
    ],
    howItWorks: [
      { title: 'Survey the site', description: 'Drop area, approach and departure paths, obstacles, and where the gathering will actually stand on the day.' },
      { title: 'Secure permissions', description: 'Venue, local authority and any airspace approvals the location requires.' },
      { title: 'Plan the moment', description: 'A window rather than an instant, with a named ground contact who confirms it.' },
      { title: 'Brief the ground team', description: 'Crowd control, marshalling and what happens if the flight has to break off.' },
    ],
    suitableCategories: ['helicopter'],
    missions: ['wedding', 'film-and-aerial'],
    considerations: [
      'The crowd is the primary safety consideration, not the flight.',
      'Petals must be prepared to disperse; unsuitable material is a hazard, not a detail.',
      'Ceremonies run late, and an aircraft cannot hold indefinitely.',
      'Wind and visibility can move or cancel the drop on the day.',
      'Some venues and locations will not permit the operation at all, and that has to be established early.',
    ],
    pricingFactors: [
      { factor: 'Helicopter type and flight time', explanation: 'Usually short, but positioning to the venue is often the larger part.' },
      { factor: 'Positioning', explanation: 'Getting the aircraft to the venue area and back to base.' },
      { factor: 'Standby time', explanation: 'Holding availability around a ceremony window that may move.' },
      { factor: 'Site preparation and permissions', explanation: 'Survey, approvals and ground coordination, which vary entirely by venue.' },
    ],
    faqs: [
      {
        question: 'What does a helicopter flower dropping need at the venue?',
        answer: 'A clear drop area with unobstructed approach and departure paths, control of the crowd below, permission from the venue and local authority, and a named ground contact to confirm the moment.',
      },
      {
        question: 'Can it be done at any venue?',
        answer: 'No — obstacles, crowd layout, nearby airspace restrictions and local permissions all decide it, which is why the site is assessed before a date is confirmed.',
      },
      {
        question: 'What happens if the ceremony runs late?',
        answer: 'The flight is planned against a window rather than an exact instant, but an aircraft cannot hold indefinitely, so a realistic window and a ground contact who can confirm timing matter more than an exact minute.',
      },
    ],
    related: [
      { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'How rotary operations are planned' },
      { label: 'Charter Services', href: '/services', description: 'Purpose-led charter requirements' },
      { label: 'Helicopters for Charter', href: '/aircraft/helicopters', description: 'Types used for event work' },
      { label: 'Request a Charter', href: '/request-a-charter', description: 'Tell us the venue and the date' },
    ],
    canonical: '/services/aerial-flower-dropping',
    parent: '/services',
  },
];
