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
    headings: {
      aircraft: 'Helicopters for charter',
      book: 'Book a helicopter',
    },
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
      {
        label: 'Helicopter Charter Price',
        href: '/helicopter-charter/helicopter-charter-price',
        description: 'What makes up the price of a helicopter',
      },
      {
        label: 'Wedding Helicopter Booking',
        href: '/helicopter-charter/wedding-helicopter',
        description: 'Arrivals, flower drops and guest transfers',
      },
      {
        label: 'Helicopter Charter in Delhi',
        href: '/helicopter-charter/delhi',
        description: 'Agra, Jaipur, Dehradun and more',
      },
      {
        label: 'Helicopter Charter in Mumbai',
        href: '/helicopter-charter/mumbai',
        description: 'Pune, Nashik, Shirdi and more',
      },
      {
        label: 'Helicopter Charter in Bengaluru',
        href: '/helicopter-charter/bengaluru',
        description: 'Mysuru, Tirupati, Puttaparthi and more',
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
    headings: {
      aircraft: 'Helicopters for private charter',
      book: 'Book a private helicopter',
    },
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
    headings: {
      aircraft: 'Helicopters for rent',
      book: 'Rent a helicopter',
    },
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
  {
    slug: 'helicopter-charter-price',
    cluster: 'helicopter-charter',
    name: 'Helicopter Charter Price',
    keyword: 'helicopter charter price',
    headings: {
      quote: 'Get a helicopter price quote',
      aircraft: 'Helicopter types',
      how: 'How helicopter charter price is worked out',
      cost: 'Helicopter charter price factors',
      fit: 'Before you ask for a helicopter price',
      what: 'What decides helicopter charter price?',
      book: 'Get a helicopter charter price',
    },
    headline: 'Helicopter Charter Price in India',
    summary:
      'Helicopter charter price in India is set by the helicopter’s hourly rate times the billed flying hours, plus positioning from its base, waiting time, landing permissions and taxes.',
    definition: [
      'A helicopter charter is priced like a private jet charter, with a few differences that matter more for helicopters. You pay for the whole helicopter and its crew, by the flying hour. The rate depends mostly on the type: a single-engine helicopter costs less per hour than a twin-engine one.',
      'Positioning is the biggest surprise on a helicopter quote. Helicopters are slow compared with planes, so bringing one from a base 200 km away can add close to an hour of flying each way. A helicopter based near your pick-up point usually gives the lowest price.',
      'Many operators also set a minimum number of billed hours per day. A 20-minute hop can still be billed as a longer block. Waiting time on the ground, overnight stays for the crew, landing permissions at private sites and GST are added on top.',
      'That is why we quote each trip on its own rather than publish one rate. Share your pick-up point, landing site, date and group size, and the quote lists every part of the price.',
    ],
    whoItIsFor: [
      'Anyone comparing a helicopter with a car or plane for a short trip',
      'Event and wedding planners budgeting for arrivals or transfers',
      'Companies planning site visits or multi-stop days',
      'Families planning a hill or pilgrimage trip by private helicopter',
    ],
    whenToUseIt: [
      'Before asking for a quote, to know what will be on it',
      'When two helicopter quotes differ and you want to see why',
      'When deciding between one long day and two shorter ones',
    ],
    howItWorks: [
      {
        title: 'Share the trip',
        description: 'Pick-up point, landing site, date, time and number of passengers.',
      },
      {
        title: 'Find the nearest helicopter',
        description: 'The closest suitable helicopter keeps positioning, and the price, down.',
      },
      {
        title: 'Check the landing sites',
        description: 'Each site needs a safe approach, a suitable surface and permission.',
      },
      {
        title: 'Get an itemised quote',
        description: 'Flying hours, positioning, waiting, permissions and taxes, each shown.',
      },
    ],
    suitableCategories: ['helicopter'],
    missions: ['corporate', 'wedding', 'leisure', 'pilgrimage'],
    considerations: [
      'Positioning: a helicopter far from your pick-up point adds flying hours you pay for',
      'Minimum billing: many operators bill a minimum number of hours per day',
      'Waiting: a helicopter held on the ground for you is still on hire',
      'Daylight: most private landing sites have no lighting, so flights are planned in daylight',
      'Weather: low cloud and rain can delay or cancel a flight, especially in the hills',
    ],
    pricingFactors: [
      {
        factor: 'Helicopter type',
        explanation: 'Single-engine types cost less per hour than twin-engine ones.',
      },
      {
        factor: 'Billed flying hours',
        explanation: 'Engine start to engine stop, for every leg, including the return to base.',
      },
      {
        factor: 'Positioning',
        explanation:
          'Flying the helicopter from its base to you and back. Often the largest extra.',
      },
      {
        factor: 'Minimum daily billing',
        explanation: 'A short hop may be billed as a longer block of hours.',
      },
      {
        factor: 'Waiting and overnights',
        explanation: 'Ground time on hire, and crew hotel stays on multi-day trips.',
      },
      {
        factor: 'Landing permissions',
        explanation: 'Private and venue sites need approval, which can carry fees.',
      },
      {
        factor: 'Taxes',
        explanation: 'GST is added to the charter price.',
      },
    ],
    faqs: [
      {
        question: 'How much does it cost to hire a helicopter in India?',
        answer:
          'Hiring a helicopter in India costs the helicopter’s hourly rate times the billed flying hours, plus positioning from its base, waiting time, landing permissions and GST, so each trip is quoted on its own.',
      },
      {
        question: 'Is a helicopter charter priced per hour or per trip?',
        answer:
          'Per flying hour, with the full trip quoted as a total that adds positioning, waiting and permissions to the flying hours.',
      },
      {
        question: 'Why is my helicopter quote higher than the flying time suggests?',
        answer:
          'Usually because of positioning, the flying needed to bring the helicopter from its base to you and back, which is billed like any other flying hour.',
      },
      {
        question: 'Is a single-engine helicopter cheaper than a twin?',
        answer:
          'Yes, per hour a single-engine helicopter costs less, but some routes, landing sites and conditions call for a twin.',
      },
      {
        question: 'Can I share a helicopter to cut the cost?',
        answer:
          'Yes, the price is for the whole helicopter, so the cost per person falls as more seats are filled, up to its passenger and weight limits.',
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
        description: 'Hourly hire for days with several stops',
      },
      {
        label: 'Private Jet Charter Cost',
        href: '/pricing',
        description: 'Every part of a charter price',
      },
      {
        label: 'Helicopters for Charter',
        href: '/aircraft/helicopters',
        description: 'Compare seats, range and speed',
      },
    ],
    canonical: '/helicopter-charter/helicopter-charter-price',
    parent: '/helicopter-charter',
  },
  {
    slug: 'wedding-helicopter',
    cluster: 'helicopter-charter',
    name: 'Wedding Helicopter',
    keyword: 'wedding helicopter',
    headings: {
      aircraft: 'Helicopters for weddings',
      how: 'How wedding helicopter booking works',
      fit: 'Is a wedding helicopter right for you?',
      what: 'What is a wedding helicopter?',
      book: 'Book a wedding helicopter',
    },
    headline: 'Wedding Helicopter Booking in India',
    summary:
      'A wedding helicopter in India is a private helicopter hired for the couple’s arrival, a flower shower or guest transfers, flown to a venue site approved for landing.',
    definition: [
      'A wedding helicopter is hired for a day, or part of one, for the moments that need it: the couple arriving or leaving, a flower shower over the ceremony, or moving guests between a city airport and a venue far from it.',
      'The venue decides almost everything. The helicopter needs an open area large enough to land safely, with a clear path in and out, free of wires, trees and loose material. Crowds must be kept well back while it lands and takes off.',
      'Landing at a private site needs permission, usually from the local authorities, and the operator’s own approval of the site. Both take time, so the helicopter is booked weeks ahead, not days.',
      'Most wedding venues have no lighting for a helicopter, so flights are planned in daylight. Weather can delay a flight, which is why the programme keeps a backup plan for the arrival.',
    ],
    whoItIsFor: [
      'Couples planning a helicopter arrival or departure',
      'Families planning a flower shower over the ceremony',
      'Wedding planners moving guests to a remote venue',
      'Destination weddings where the nearest airport is far away',
    ],
    whenToUseIt: [
      'When the venue is far from the nearest airport',
      'When a helicopter arrival is part of the ceremony',
      'When guests would otherwise spend hours on the road',
      'For a flower shower, alongside the arrival',
    ],
    howItWorks: [
      {
        title: 'Share the venue and date',
        description: 'The venue location, the moments you want and the timings.',
      },
      {
        title: 'Survey the landing site',
        description: 'Space, approach path, surface and obstacles are checked.',
      },
      {
        title: 'Get permissions',
        description: 'Local approvals and the operator’s site approval, arranged ahead.',
      },
      {
        title: 'Fly on the day',
        description: 'Daylight flights, crowd control on the ground and a weather backup.',
      },
    ],
    suitableCategories: ['helicopter'],
    missions: ['wedding'],
    considerations: [
      'Landing site: a large open area with a clear approach, free of wires and trees',
      'Permission: local approvals and the operator’s site approval take time',
      'Daylight: most venues have no lighting, so plan the flight in daylight',
      'Crowd control: guests must stay well back during landing and take-off',
      'Weather: keep a backup plan for the arrival',
    ],
    pricingFactors: [
      {
        factor: 'Helicopter type',
        explanation: 'Bigger twin-engine helicopters cost more per hour than single-engine ones.',
      },
      {
        factor: 'Positioning',
        explanation: 'Flying the helicopter from its base to the venue and back.',
      },
      {
        factor: 'Number of flights',
        explanation: 'An arrival, a flower shower and guest shuttles each add flying time.',
      },
      {
        factor: 'Waiting time',
        explanation: 'Hours on the ground between moments are still hire time.',
      },
      {
        factor: 'Permissions and site work',
        explanation: 'Approvals and any site preparation needed for a safe landing.',
      },
    ],
    faqs: [
      {
        question: 'How do I book a helicopter for a wedding in India?',
        answer:
          'Share the venue, date and the moments you want, and book weeks ahead, because the landing site must be surveyed and approved and permission obtained before the day.',
      },
      {
        question: 'Can a helicopter land at any wedding venue?',
        answer:
          'No, only where there is a large open area with a clear approach, a suitable surface and no wires or trees in the way, and where permission is granted.',
      },
      {
        question: 'Can the helicopter also do a flower shower?',
        answer:
          'Yes, a helicopter can shower flowers over the ceremony, subject to the same site checks, permissions and safe height and distance limits.',
      },
      {
        question: 'How far in advance should I book a wedding helicopter?',
        answer:
          'Several weeks ahead, and earlier in the wedding season, because site surveys, permissions and helicopter availability all take time.',
      },
    ],
    related: [
      {
        label: 'Helicopter Flower Dropping',
        href: '/services/aerial-flower-dropping',
        description: 'Flower showers by helicopter',
      },
      {
        label: 'Helicopter Charter Price',
        href: '/helicopter-charter/helicopter-charter-price',
        description: 'What makes up the price',
      },
      {
        label: 'Private Jet Charter to Udaipur',
        href: '/destinations/udaipur',
        description: 'A leading wedding destination',
      },
      {
        label: 'Jaipur by Jet or Helicopter',
        href: '/destinations/jaipur',
        description: 'Venues within helicopter range of Delhi',
      },
    ],
    canonical: '/helicopter-charter/wedding-helicopter',
    parent: '/helicopter-charter',
  },
];
