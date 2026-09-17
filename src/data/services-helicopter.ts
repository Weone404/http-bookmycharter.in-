import type { Service } from '@/types/service';

/** Helicopter cluster. A helicopter is not a small aeroplane — these pages
 *  are written around the constraints that are specific to rotary operations:
 *  sites rather than airports, density altitude, and ground waiting time. */
export const HELICOPTER_SERVICES: readonly Service[] = [
  {
    slug: 'helicopter-charter',
    cluster: 'helicopter-charter',
    name: 'Helicopter Charter',
    summary:
      'Helicopter charter moves people point to point without needing a runway, which makes it the right tool where the destination has no airport and the wrong one where it does.',
    definition: [
      'A helicopter earns its cost by removing the ground leg. If the place you are going has a runway and a road, an aeroplane and a car will usually be cheaper. If it has neither — a plant, a project site, a hill town, a venue, a ridge — the helicopter is not the premium option, it is the only one.',
      'What replaces the airport is the site, and sites have their own requirements: an approach and departure path clear of obstacles, a firm and dust-free surface, permission from whoever controls the land, and crowd control if people will be nearby. A field is not a helipad until someone has established those things.',
      'The second difference is time on the ground. A helicopter that waits four hours at a site is four hours unavailable to anyone else, so missions with long waits are usually quoted on total aircraft time rather than flying time alone. Trips built around a meeting or a ceremony are priced very differently from straight point-to-point transfers.',
    ],
    whoItIsFor: [
      'Executives visiting sites that scheduled aviation does not reach',
      'Event and wedding parties arriving where a road journey would take hours',
      'Travellers into hill and mountain destinations',
      'Survey, inspection, filming and other aerial work',
      'Anyone whose journey is short in distance but long by road',
    ],
    whenToUseIt: [
      'When the destination has no runway and a poor road',
      'When a same-day return by road is impossible but by air is routine',
      'When the landing point matters more than the airport',
      'When the mission is the flying itself — survey, filming, inspection',
    ],
    howItWorks: [
      { title: 'Establish both landing sites', description: 'Not just the destination. Approach paths, surface, obstacles, ownership and permission all have to be real before a date is fixed.' },
      { title: 'Match the helicopter to the terrain', description: 'Altitude, temperature and site size decide the type. A high helipad on a warm afternoon is a different problem from the same site at dawn.' },
      { title: 'Plan the ground time', description: 'How long the aircraft waits changes the quote more than most people expect.' },
      { title: 'Build in the weather', description: 'Visibility and cloud base close sites quickly, particularly in hills. A realistic alternative beats an optimistic plan.' },
    ],
    suitableCategories: ['helicopter'],
    missions: ['corporate', 'vvip', 'wedding', 'regional', 'film-and-aerial', 'pilgrimage', 'medical'],
    considerations: [
      'A landing site is not a helipad until someone has confirmed the approach, the surface and the permission.',
      'Density altitude — altitude combined with temperature — reduces both lift and engine power, and reduces what the aircraft can carry.',
      'Ground waiting time is charged, because the aircraft is committed to you while it waits.',
      'Weather closes helicopter sites faster than it closes airports, especially in hills.',
      'Night operations are constrained and depend on the site, the aircraft and the approval.',
    ],
    pricingFactors: [
      { factor: 'Helicopter type', explanation: 'A single-engine light helicopter and a twin differ substantially in hourly cost, and the terrain often decides which is permissible.' },
      { factor: 'Flight time', explanation: 'Charged on total aircraft time, which includes repositioning between sites during the day.' },
      { factor: 'Positioning', explanation: 'Helicopters are based at fewer points than aircraft, so getting one to a remote start can be a significant share of the cost.' },
      { factor: 'Ground waiting', explanation: 'Time held at a site, usually the largest single variable on event and meeting missions.' },
      { factor: 'Site charges and permissions', explanation: 'Helipad fees where they apply, and any approvals the site requires.' },
      { factor: 'Crew requirements', explanation: 'Some missions and some aircraft require two pilots, which changes the cost base.' },
    ],
    faqs: [
      {
        question: 'How much does a helicopter charter cost in India?',
        answer: 'Helicopter charter is normally priced on total aircraft time, with the rate depending on helicopter type, plus positioning to your start point, landing and helipad charges, crew requirements, ground waiting time and taxes.',
        elaboration: [
          'Waiting time deserves particular attention. A four-hour ceremony with the aircraft held on site costs far more than the flying minutes suggest, because the aircraft is committed for the whole period.',
        ],
      },
      {
        question: 'Can a helicopter land anywhere?',
        answer: 'No. A landing site needs clear approach and departure paths, a firm surface that will not throw debris, control of the surrounding area, and permission from whoever owns or governs the land.',
        elaboration: [
          'Confirming a site is a normal part of planning, and it is better done weeks ahead than on the morning.',
        ],
      },
      {
        question: 'What happens if the weather turns?',
        answer: 'The commander and the operator decide whether the flight can proceed, and in hill terrain a site can close and reopen within the hour.',
        elaboration: [
          'Any itinerary into mountains should be planned with an alternative — a later slot, a different site, or a road leg — rather than on the assumption that the weather will cooperate.',
        ],
      },
    ],
    related: [
      { label: 'Private Helicopter Charter', href: '/helicopter-charter/private-helicopter-charter', description: 'Point-to-point whole-aircraft hire' },
      { label: 'Helicopter Rental', href: '/helicopter-charter/helicopter-rental', description: 'Hourly hire for missions with ground time' },
      { label: 'Helicopters for Charter', href: '/aircraft/helicopters', description: 'Types, seating and terrain suitability' },
      { label: 'Char Dham by Helicopter', href: '/chardham', description: 'Whole-aircraft charter into Himalayan helipads' },
      { label: 'Charter Pricing', href: '/pricing', description: 'How the cost is built' },
    ],
    canonical: '/helicopter-charter',
  },
  {
    slug: 'private-helicopter-charter',
    cluster: 'helicopter-charter',
    name: 'Private Helicopter Charter',
    summary:
      'Private helicopter charter is whole-aircraft hire for a specific point-to-point journey, where the aircraft goes where you go and carries nobody else.',
    definition: [
      'The distinction that matters here is against shuttle or seat-based helicopter services. On a shuttle, you buy a seat on a rotation that runs to its own schedule with other passengers. On a private charter, the aircraft is yours: it departs when you are ready, it goes where your itinerary says, and it waits if your day runs long.',
      'That difference shows up most clearly on routes where both exist. A shuttle seat is cheaper and less flexible; a private charter costs more and removes the dependency on other people’s timings and on the rotation filling.',
      'For a single point-to-point transfer, the cost drivers are simple: the flying time, getting the aircraft to your start point, and the charges at each end. It is the cleanest form of helicopter charter to price.',
    ],
    whoItIsFor: [
      'Executives making a single site visit and returning the same day',
      'Families and small groups travelling together to one destination',
      'Travellers who need to control their own departure time',
      'Anyone who would otherwise face a long road transfer at either end',
    ],
    whenToUseIt: [
      'A defined A-to-B journey, with or without a same-day return',
      'When a shuttle exists but its timings do not fit',
      'When the party wants the aircraft to itself',
      'When the return time is uncertain and the aircraft must wait',
    ],
    howItWorks: [
      { title: 'Fix both ends', description: 'Departure and arrival sites, confirmed as usable rather than assumed.' },
      { title: 'Set the day', description: 'Departure time, expected ground time and return, so the quote reflects the real day.' },
      { title: 'Select the type', description: 'Passenger count, baggage, terrain and altitude narrow it quickly.' },
      { title: 'Confirm access', description: 'Any permissions the sites require, arranged before the date rather than on it.' },
    ],
    suitableCategories: ['helicopter'],
    missions: ['corporate', 'vvip', 'leisure', 'regional'],
    considerations: [
      'Baggage space in a light helicopter is genuinely small — it is worth stating what you are carrying early.',
      'A same-day return means the aircraft waits, and waiting is charged.',
      'Passenger weights matter more in helicopters than in aircraft, particularly at altitude.',
      'Two sites means two sets of permissions, not one.',
    ],
    pricingFactors: [
      { factor: 'Flight time', explanation: 'Total aircraft time for the journey, both directions where applicable.' },
      { factor: 'Positioning', explanation: 'Bringing the helicopter to your departure point from wherever it is based.' },
      { factor: 'Ground waiting', explanation: 'Charged where the aircraft holds for a same-day return.' },
      { factor: 'Helicopter type', explanation: 'Single or twin, and the cabin size the party requires.' },
      { factor: 'Site charges', explanation: 'Landing and helipad fees where they apply at either end.' },
    ],
    faqs: [
      {
        question: 'What is the difference between a private helicopter charter and a shuttle seat?',
        answer: 'A private charter is the whole aircraft on your schedule; a shuttle seat is one place on a rotation that runs to its own timetable with other passengers.',
      },
      {
        question: 'Can the helicopter wait for us and bring us back?',
        answer: 'Yes, and that waiting time is part of the quote, because the aircraft is committed to your trip for the whole period it is held.',
      },
      {
        question: 'How many people can a private helicopter carry?',
        answer: 'Typically four to seven in a light helicopter and up to ten or twelve in larger twins, but the real limit is set by passenger weights, baggage, altitude and temperature on the day.',
      },
    ],
    related: [
      { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'How rotary charter works' },
      { label: 'Helicopter Rental', href: '/helicopter-charter/helicopter-rental', description: 'Hourly hire for longer missions' },
      { label: 'Helicopters for Charter', href: '/aircraft/helicopters', description: 'Types and capacity' },
      { label: 'Request a Charter', href: '/request-a-charter', description: 'Start with route, date and passengers' },
    ],
    canonical: '/helicopter-charter/private-helicopter-charter',
    parent: '/helicopter-charter',
  },
  {
    slug: 'helicopter-rental',
    cluster: 'helicopter-charter',
    name: 'Helicopter Rental',
    summary:
      'Helicopter rental means hiring the aircraft and crew for a block of time rather than for a single journey, which suits missions where the flying is not a straight line.',
    definition: [
      'Rental and charter describe the same underlying arrangement — an aircraft with its crew, hired by one party — but they are priced around different shapes of day. A point-to-point charter is quoted for a journey. A rental is quoted for a period of aircraft availability, within which the itinerary can be more fluid.',
      'That distinction matters for surveys, filming, inspections, multi-site days and events: missions where the aircraft lands, waits, repositions, lands again, and where the flight plan is not fully known at the time of booking.',
      'The aircraft is committed to you for the whole block whether it is flying or standing, which is exactly why this arrangement exists and why it is priced the way it is.',
    ],
    whoItIsFor: [
      'Production teams filming across several locations',
      'Survey and inspection work along a corridor or across a region',
      'Corporate days covering several sites',
      'Event organisers needing an aircraft on standby',
    ],
    whenToUseIt: [
      'When the itinerary will change during the day',
      'When the aircraft must be available rather than merely scheduled',
      'When the mission involves repeated landings and repositioning',
      'When ground time will exceed flying time',
    ],
    howItWorks: [
      { title: 'Define the block', description: 'How many hours of availability, over which days, from which base.' },
      { title: 'Establish the operating area', description: 'Where the aircraft will fly and land, and any approvals that area requires.' },
      { title: 'Confirm the configuration', description: 'Doors off for filming, equipment mounts, seating — each has its own implications.' },
      { title: 'Agree the terms', description: 'What the block includes, what extends it, and what happens if weather takes a day out.' },
    ],
    suitableCategories: ['helicopter'],
    missions: ['film-and-aerial', 'corporate', 'regional'],
    considerations: [
      'Specialist configurations — doors off, camera mounts, survey equipment — need arranging well ahead.',
      'Some operating areas and activities need specific approvals, and those take time.',
      'Weather can take a full day out of a multi-day block; the schedule should allow for it.',
      'Crew duty limits apply to the block as they do to any flight.',
    ],
    pricingFactors: [
      { factor: 'Block duration', explanation: 'Hours of aircraft availability, which is the basis of the whole arrangement.' },
      { factor: 'Helicopter type', explanation: 'Mission configuration often dictates the type before preference does.' },
      { factor: 'Positioning to the area', explanation: 'Getting the aircraft to the operating area and back at the end of the block.' },
      { factor: 'Special configuration', explanation: 'Doors-off operation, mounts and equipment fitting carry their own cost and lead time.' },
      { factor: 'Crew and overnights', explanation: 'A multi-day block away from base includes crew accommodation and duty planning.' },
    ],
    faqs: [
      {
        question: 'What is the difference between helicopter rental and helicopter charter?',
        answer: 'They are the same arrangement priced differently: charter is quoted for a defined journey, rental for a block of aircraft availability within which the itinerary can change.',
      },
      {
        question: 'Can I rent a helicopter for filming with the doors off?',
        answer: 'Doors-off filming is a recognised operation but it requires the right aircraft, crew briefing, harnesses and approvals, and must be arranged in advance rather than requested on the day.',
      },
      {
        question: 'What happens if weather stops a day of a multi-day block?',
        answer: 'How lost days are treated is agreed as part of the rental terms before the block starts, which is why those terms are worth reading carefully for weather-exposed work.',
      },
    ],
    related: [
      { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'Point-to-point rotary charter' },
      { label: 'Private Helicopter Charter', href: '/helicopter-charter/private-helicopter-charter', description: 'Single-journey whole-aircraft hire' },
      { label: 'Helicopters for Charter', href: '/aircraft/helicopters', description: 'Types and mission suitability' },
      { label: 'Charter Pricing', href: '/pricing', description: 'Cost components in full' },
    ],
    canonical: '/helicopter-charter/helicopter-rental',
    parent: '/helicopter-charter',
  },
];
