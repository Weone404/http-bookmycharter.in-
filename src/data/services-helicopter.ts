import type { Service } from '@/types/service';

/** Helicopter cluster. A helicopter is not a small aeroplane — these pages
 *  are written around the constraints that are specific to rotary operations:
 *  sites rather than airports, density altitude, and ground waiting time. */
export const HELICOPTER_SERVICES: readonly Service[] = [
  {
    slug: 'helicopter-charter',
    cluster: 'helicopter-charter',
    name: 'Helicopter Charter',
    keyword: 'helicopter charter',
    headline: 'Helicopter Charter in India',
    summary:
      'Helicopter charter flies you point to point without a runway, so it suits executives, wedding and event guests, and hill travellers going where there is no airport.',
    definition: [
      'A helicopter earns its cost by removing the road journey. If your destination has a runway and a road, a plane and a car will usually cost less. If it has neither, the helicopter is not the luxury option. It is the only one. Think of a plant, a project site, a hill town, a venue or a ridge.',
      'Instead of an airport, a helicopter uses a landing site, and each site has its own needs. It needs a path in and out that is clear of obstacles. It needs a firm, dust-free surface and permission from whoever controls the land. If people will be nearby, it needs crowd control. A field is not a helipad until someone has confirmed all of this.',
      'The second difference is waiting time on the ground. A helicopter that waits four hours at a site cannot be used by anyone else for those four hours. So trips with long waits are usually priced on total aircraft time, not flying time alone. A trip built around a meeting or a ceremony is priced very differently from a simple point-to-point transfer.',
    ],
    whoItIsFor: [
      'Executives visiting sites that airline flights do not reach',
      'Wedding and event guests arriving where the road would take hours',
      'Travellers heading into hill and mountain destinations',
      'Survey, inspection, filming and other aerial work',
      'Anyone whose trip is short in distance but long by road',
    ],
    whenToUseIt: [
      'When your destination has no runway and a poor road',
      'When a same-day return is impossible by road but routine by air',
      'When where you land matters more than which airport is nearest',
      'When the flying is the job itself, such as survey, filming or inspection',
    ],
    howItWorks: [
      {
        title: 'Confirm both landing sites',
        description:
          'Before you book a helicopter, check the departure site as well as the destination. The approach path, surface, obstacles, ownership and permission must all be confirmed before a date is fixed.',
      },
      {
        title: 'Match the helicopter to the terrain',
        description:
          'Altitude, temperature and site size decide the helicopter type. A high helipad on a warm afternoon is a different problem from the same site at dawn.',
      },
      {
        title: 'Plan the ground time',
        description:
          'How long the helicopter waits changes the quote more than most people expect.',
      },
      {
        title: 'Plan for the weather',
        description:
          'Poor visibility and low cloud close sites quickly, especially in the hills. A realistic backup plan beats an optimistic one.',
      },
    ],
    suitableCategories: ['helicopter'],
    missions: [
      'corporate',
      'vvip',
      'wedding',
      'regional',
      'film-and-aerial',
      'pilgrimage',
      'medical',
    ],
    considerations: [
      'Landing sites must be checked. A site is not a helipad until someone has confirmed the approach, the surface and the permission.',
      'Density altitude (thin air at height, made thinner by heat) reduces lift and engine power, so the helicopter can carry less.',
      'Ground waiting time is charged, because the helicopter is committed to you while it waits.',
      'Weather closes helicopter sites faster than it closes airports, especially in the hills.',
      'Night flights are limited and depend on the site, the helicopter and the approval.',
    ],
    pricingFactors: [
      {
        factor: 'Helicopter type',
        explanation:
          'A single-engine light helicopter and a twin-engine helicopter differ a lot in hourly cost. The terrain often decides which one is allowed.',
      },
      {
        factor: 'Flight time',
        explanation:
          'Charged on total aircraft time, including moving between sites during the day.',
      },
      {
        factor: 'Positioning',
        explanation:
          'Helicopters are based in fewer places than planes. Getting one to a remote start point can be a large share of the cost.',
      },
      {
        factor: 'Ground waiting',
        explanation:
          'Time the helicopter is held at a site. This is usually the biggest variable for events and meetings.',
      },
      {
        factor: 'Site charges and permissions',
        explanation: 'Helipad fees where they apply, plus any approvals the site needs.',
      },
      {
        factor: 'Crew requirements',
        explanation: 'Some trips and some helicopters need two pilots, which raises the base cost.',
      },
    ],
    faqs: [
      {
        question: 'How much does helicopter charter cost in India?',
        answer:
          'Helicopter charter in India is usually priced on total aircraft time, at a rate set by the helicopter type, plus positioning, landing and helipad charges, crew needs, ground waiting time and taxes.',
        elaboration: [
          'Waiting time needs special attention. If the helicopter waits on site through a four-hour ceremony, it costs far more than the flying minutes suggest. That is because the aircraft is committed to you for the whole time.',
        ],
      },
      {
        question: 'Can a helicopter land anywhere?',
        answer:
          'No, a helicopter needs a landing site with a clear path in and out, a firm surface that will not throw up debris, control of the area around it, and permission from whoever owns or manages the land.',
        elaboration: [
          'Checking the site is a normal part of planning. It is better done weeks ahead than on the morning of the flight.',
        ],
      },
      {
        question: 'What happens if the weather is bad on the day of my helicopter flight?',
        answer:
          'The commander (the pilot in charge) and the operator decide whether the flight can go, and in the hills a site can close and reopen within the hour.',
        elaboration: [
          'Plan any mountain trip with a backup, such as a later slot, a different site or a road journey. Do not assume the weather will cooperate.',
        ],
      },
      {
        question: 'When should I book a helicopter instead of a plane?',
        answer:
          'Book a helicopter when your destination has no runway and a poor road, because where there is a runway and a road, a plane and a car will usually cost less.',
      },
    ],
    related: [
      {
        label: 'Private Helicopter Charter',
        href: '/helicopter-charter/private-helicopter-charter',
        description: 'Hire a whole helicopter for one point-to-point trip',
      },
      {
        label: 'Helicopter Rental',
        href: '/helicopter-charter/helicopter-rental',
        description: 'Hourly hire for trips with waiting time',
      },
      {
        label: 'Helicopters for Charter',
        href: '/aircraft/helicopters',
        description: 'Helicopter types, seats and terrain suitability',
      },
      {
        label: 'Char Dham by Helicopter',
        href: '/chardham',
        description: 'Whole-helicopter charter to Himalayan helipads',
      },
      { label: 'Charter Pricing', href: '/pricing', description: 'How the cost is built' },
    ],
    canonical: '/helicopter-charter',
  },
  {
    slug: 'private-helicopter-charter',
    cluster: 'helicopter-charter',
    name: 'Private Helicopter Charter',
    keyword: 'private helicopter charter',
    headline: 'Private Helicopter Charter in India',
    summary:
      'Private helicopter charter means hiring a whole helicopter for one point-to-point trip, so executives, families and small groups fly on their own schedule with nobody else on board.',
    definition: [
      'The key difference is between a private charter and a shuttle, or seat-based, helicopter service. On a shuttle, you buy one seat on a rotation that runs to its own timetable, with other passengers. On a private charter, the helicopter is yours. It leaves when you are ready, goes where your plan says, and waits if your day runs long.',
      'This matters most on routes where both options exist. A shuttle seat costs less but is less flexible. A private helicopter booking costs more, but you no longer depend on other people’s timings or on the rotation filling up.',
      'For one point-to-point transfer, the cost is simple to work out. You pay for the flying time, for bringing the helicopter to your start point, and for the charges at each end. It is the simplest kind of helicopter charter to price.',
    ],
    whoItIsFor: [
      'Executives making one site visit and returning the same day',
      'Families and small groups travelling together to one place',
      'Travellers who need to control their own departure time',
      'Anyone who would otherwise face a long road transfer at either end',
    ],
    whenToUseIt: [
      'A set A-to-B trip, with or without a same-day return',
      'When a shuttle runs on your route but its timings do not suit you',
      'When your group wants the helicopter to itself',
      'When your return time is uncertain and the helicopter must wait',
    ],
    howItWorks: [
      {
        title: 'Fix both ends',
        description: 'Confirm that the departure and arrival sites are usable. Do not assume it.',
      },
      {
        title: 'Plan the day',
        description:
          'Share your departure time, expected ground time and return, so the quote matches your real day.',
      },
      {
        title: 'Choose the helicopter',
        description: 'Passenger count, baggage, terrain and altitude narrow the choice quickly.',
      },
      {
        title: 'Confirm access',
        description: 'Arrange any permissions the sites need before the date, not on the day.',
      },
    ],
    suitableCategories: ['helicopter'],
    missions: ['corporate', 'vvip', 'leisure', 'regional'],
    considerations: [
      'Baggage space in a light helicopter is very small, so say early what you are carrying.',
      'Same-day returns mean the helicopter waits, and waiting is charged.',
      'Passenger weights matter more in a helicopter than in a plane, especially at altitude.',
      'Two sites mean two sets of permissions, one for each helipad or landing site.',
    ],
    pricingFactors: [
      {
        factor: 'Flight time',
        explanation: 'Total aircraft time for the trip, in both directions where needed.',
      },
      {
        factor: 'Positioning',
        explanation: 'Bringing the helicopter to your departure point from wherever it is based.',
      },
      {
        factor: 'Ground waiting',
        explanation: 'Charged when the helicopter waits for a same-day return.',
      },
      {
        factor: 'Helicopter type',
        explanation: 'Single-engine or twin-engine, and the cabin size your group needs.',
      },
      {
        factor: 'Site charges',
        explanation: 'Landing and helipad fees where they apply, at either end.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a private helicopter charter and a shuttle seat?',
        answer:
          'A private helicopter charter gives you the whole helicopter on your schedule, while a shuttle seat is one place on a rotation that runs to its own timetable with other passengers.',
      },
      {
        question: 'Can the helicopter wait and bring us back the same day?',
        answer:
          'Yes, the helicopter can wait for your return, and that waiting time is part of the quote because the aircraft is committed to your trip for the whole time it is held.',
      },
      {
        question: 'How many people can a private helicopter carry?',
        answer:
          'A light helicopter typically carries four to seven people and a larger twin up to ten or twelve, but the real limit is set by passenger weights, baggage, altitude and temperature on the day.',
      },
      {
        question: 'Is a private helicopter charter more expensive than a shuttle?',
        answer:
          'Yes, a private helicopter charter costs more than a shuttle seat, but you control the timing and do not depend on other passengers or on the rotation filling up.',
      },
      {
        question: 'How is a private helicopter charter priced?',
        answer:
          'A private helicopter charter is priced on flight time, positioning the helicopter to your start point, any ground waiting, the helicopter type, and landing and helipad fees at each end.',
      },
    ],
    related: [
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'How helicopter charter works',
      },
      {
        label: 'Helicopter Rental',
        href: '/helicopter-charter/helicopter-rental',
        description: 'Hourly hire for longer jobs',
      },
      {
        label: 'Helicopters for Charter',
        href: '/aircraft/helicopters',
        description: 'Helicopter types and seating',
      },
      {
        label: 'Request a Charter',
        href: '/request-a-charter',
        description: 'Start with your route, date and passengers',
      },
    ],
    canonical: '/helicopter-charter/private-helicopter-charter',
    parent: '/helicopter-charter',
  },
  {
    slug: 'helicopter-rental',
    cluster: 'helicopter-charter',
    name: 'Helicopter Rental',
    keyword: 'helicopter rental',
    headline: 'Helicopter Rental in India',
    summary:
      'Helicopter rental means hiring a helicopter and crew for a block of time, not one journey, which suits filming, surveys, events and multi-site days where plans change.',
    definition: [
      'Helicopter rental and charter are the same basic deal: a helicopter with its crew, hired by one party. The difference is how the day is priced. A point-to-point charter is quoted for one journey. A rental is quoted for a block of time when the helicopter is on hire to you, and your plan can change within it.',
      'This suits surveys, filming, inspections, events and days with several sites. On these jobs the helicopter lands, waits, moves, and lands again. The full flight plan is often not known when you book. Hourly helicopter hire is built for that kind of day.',
      'The helicopter is committed to you for the whole block, whether it is flying or standing still. That is exactly why rental exists, and why it is priced the way it is.',
    ],
    whoItIsFor: [
      'Film crews shooting across several locations',
      'Survey and inspection teams covering a corridor or a region',
      'Companies planning a day across several sites',
      'Event organisers who need a helicopter on standby',
    ],
    whenToUseIt: [
      'When your plan will change during the day',
      'When the helicopter must be available, not just booked for set times',
      'When the job involves repeated landings and moves between sites',
      'When waiting time will be longer than flying time',
    ],
    howItWorks: [
      {
        title: 'Define the block',
        description:
          'Decide how many hours of availability you need, on which days, and from which base.',
      },
      {
        title: 'Set the operating area',
        description: 'Where the helicopter will fly and land, and any approvals that area needs.',
      },
      {
        title: 'Confirm the setup',
        description:
          'Doors off for filming, equipment mounts and seating. Each one has its own requirements.',
      },
      {
        title: 'Agree the terms',
        description:
          'What the block includes, what extends it, and what happens if weather takes out a day.',
      },
    ],
    suitableCategories: ['helicopter'],
    missions: ['film-and-aerial', 'corporate', 'regional'],
    considerations: [
      'Special setups, such as doors off, camera mounts or survey equipment, need arranging well ahead.',
      'Some areas and activities need specific approvals, and these take time.',
      'Weather can take out a full day of a multi-day block, so leave room in the schedule.',
      'Crew duty limits (legal limits on crew working hours) apply to a rental block, as they do to any flight.',
    ],
    pricingFactors: [
      {
        factor: 'Block duration',
        explanation:
          'The hours the helicopter is available to you. This is the basis of the whole rental.',
      },
      {
        factor: 'Helicopter type',
        explanation: 'The job’s setup often decides the helicopter type before preference does.',
      },
      {
        factor: 'Positioning to the area',
        explanation:
          'Flying the helicopter to your operating area, and back at the end of the block.',
      },
      {
        factor: 'Special configuration',
        explanation: 'Doors-off flying, mounts and equipment fitting each add cost and lead time.',
      },
      {
        factor: 'Crew and overnights',
        explanation:
          'A multi-day block away from base includes crew accommodation and duty planning.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between helicopter rental and helicopter charter?',
        answer:
          'Helicopter rental and helicopter charter are the same arrangement priced differently: charter is quoted for one set journey, and rental for a block of time in which your plans can change.',
      },
      {
        question: 'Can I rent a helicopter for filming with the doors off?',
        answer:
          'Doors-off filming is a recognised type of helicopter operation, but it needs the right helicopter, a crew briefing, harnesses and approvals, all arranged in advance rather than on the day.',
      },
      {
        question: 'What happens if bad weather cancels a day of my helicopter rental?',
        answer:
          'How lost days are handled is agreed in the rental terms before the block starts, so read those terms carefully for any weather-exposed work.',
      },
      {
        question: 'Can I hire a helicopter for a day?',
        answer:
          'Yes, helicopter rental lets you hire a helicopter for a block of hours on the days you choose, and it stays committed to you whether it is flying or waiting.',
      },
      {
        question: 'How is helicopter rental priced?',
        answer:
          'Helicopter rental is priced mainly on block duration (the hours the helicopter is available to you), plus the helicopter type, positioning to your area, any special setup, and crew overnights on multi-day jobs.',
      },
    ],
    related: [
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'Point-to-point helicopter charter',
      },
      {
        label: 'Private Helicopter Charter',
        href: '/helicopter-charter/private-helicopter-charter',
        description: 'Hire a whole helicopter for one trip',
      },
      {
        label: 'Helicopters for Charter',
        href: '/aircraft/helicopters',
        description: 'Helicopter types and the jobs they suit',
      },
      { label: 'Charter Pricing', href: '/pricing', description: 'Every cost, explained in full' },
    ],
    canonical: '/helicopter-charter/helicopter-rental',
    parent: '/helicopter-charter',
  },
];
