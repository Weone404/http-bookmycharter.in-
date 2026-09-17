/**
 * Every figure here must be true and checkable. The previous four stats
 * (15+ years, 100% safety record, 45,000+ pilgrims, 12 helicopters) are
 * CLAIMS.md rows A6-A9 and are not published until sourced.
 */
export const TRUST_STATS = [
  {
    value: '11,755 ft',
    label: 'Kedarnath Altitude',
    detail: 'Thin air caps payload, so every passenger is weighed and luggage is limited to 5 kg.',
  },
  {
    value: 'DGCA NSOP',
    label: 'Who Flies You',
    detail: 'Every sector is flown by an operator holding a Non-Scheduled Operator Permit.',
  },
  {
    value: 'May–Jun · Sep–Oct',
    label: 'When It Flies',
    detail: 'Kapat closes November to April. Nothing flies in winter, whatever anyone sells you.',
  },
  {
    value: 'Pilot Decides',
    label: 'Weather Policy',
    detail: 'A booked seat is not a guaranteed departure. Plan a spare day into the trip.',
  },
];

export const CHARDHAM_PACKAGES = [
  {
    id: 'kedarnath-same-day',
    number: '01',
    title: 'Kedarnath Same Day Helicopter Tour',
    subtitle: 'VIP Darshan & Return flight on the same day from Dehradun or Guptkashi/Phata',
    duration: 'Same Day (5 - 6 Hours Total)',
    route: ['Dehradun (Sahastradhara)', 'Sersi / Phata Helipad', 'Kedarnath Helipad', 'Return to Dehradun'],
    startingPrice: '₹95,000 / seat',
    pricePerPerson: 95000,
    charterPrice: 480000,
    image: '/images/flystar_kedarnath_helicopter_1788161902244.webp',
    badge: 'MOST POPULAR',
    serviceType: 'kedarnath-sameday',
    highlights: [
      'Priority VIP Darshan slip included (avoid 8+ hours normal queue)',
      'Scenic aerial flight over Mandakini Valley & Himalayan glaciers',
      'Dedicated BookMyChardham ground executive assistance at Kedarnath Helipad',
      'Complimentary vegetarian breakfast & mountain refreshments',
    ],
    inclusions: [
      'Round-trip helicopter shuttle from Dehradun / Sersi base',
      'VIP Darshan coordination at Shri Kedarnath Ji temple',
      'All local ground transfers & temple taxes',
      'Shuttle priority boarding tickets',
      'Oxygen cylinder & basic emergency medical backup onboard',
    ],
    exclusions: [
      'Personal puja samagri or special Abhishek offerings',
      'Expenses caused by severe mountain weather delays (hotels/meals)',
      'Excess luggage beyond 5 kg per passenger',
    ],
    itinerary: [
      {
        dayOrTime: '06:30 AM',
        title: 'Reporting at Sahastradhara Helipad, Dehradun',
        description: 'Passenger weigh-in, safety briefing by Captain, and boarding pass issuance.',
      },
      {
        dayOrTime: '07:30 AM',
        title: 'Arrival at Sersi / Phata Base & Kedarnath Shuttle',
        description: 'Smooth transition to high-altitude shuttle helicopter directly landing at Kedarnath top helipad (500m from temple).',
      },
      {
        dayOrTime: '08:30 AM',
        title: 'VIP Darshan at Shri Kedarnath Ji Temple',
        description: 'Escorted darshan with priority VIP entry pass. Devotees receive 2 to 2.5 hours for puja and parikrama.',
      },
      {
        dayOrTime: '12:30 PM',
        title: 'Return Flight to Dehradun',
        description: 'Board the return flight down the Mandakini valley, landing at Sahastradhara by 01:30 PM.',
      },
    ],
  },
  {
    id: 'chardham-4-dham-package',
    number: '02',
    title: 'Chardham Yatra 4 Dham Package (5D / 4N)',
    subtitle: 'The Ultimate Sacred Pilgrimage — Yamunotri, Gangotri, Kedarnath & Badrinath by Helicopter',
    duration: '5 Days / 4 Nights',
    route: ['Dehradun', 'Kharsali (Yamunotri)', 'Harsil (Gangotri)', 'Sersi (Kedarnath)', 'Badrinath', 'Dehradun'],
    startingPrice: '₹2,10,000 / person',
    pricePerPerson: 210000,
    charterPrice: 1250000,
    image: '/images/flystar_himalayan_fleet_1788161946820.webp',
    badge: 'SIGNATURE PILGRIMAGE',
    serviceType: 'chardham-4dham',
    highlights: [
      'Complete 4 Dham covered effortlessly in 5 days instead of 12 tedious driving days',
      'Luxury stays at premium resorts in Harsil apple orchards & Badrinath',
      'Special Maha Abhishek Puja at Badrinath Ji included',
      'VIP Darshan at all 4 holy shrines with local priest escorts',
      'Palki / Pony service included for Yamunotri trek (6 km)',
    ],
    inclusions: [
      'Complete helicopter flying across all 4 Dhams as per itinerary',
      '4 Nights luxury hotel accommodation with all gourmet satvik meals',
      'VIP Darshan arrangements at Yamunotri, Gangotri, Kedarnath & Badrinath',
      'Palki (palanquin) or pony charges at Yamunotri trek',
      'Local Innova / luxury vehicle transfers between helipads and hotels',
      'Maha Abhishek Puja registration at Badrinath Ji',
      'Dedicated 24/7 Tour Manager throughout the journey',
    ],
    exclusions: [
      'Airfare to and from Dehradun airport / railway station',
      'Any special temple donations or personal tipping',
      'Additional nights stay due to force majeure mountain weather conditions',
    ],
    itinerary: [
      {
        dayOrTime: 'Day 01',
        title: 'Dehradun to Yamunotri (Kharsali Helipad)',
        description: 'Flight from Sahastradhara to Kharsali. Check-in at luxury resort, trek to Yamunotri shrine on complimentary Palki/Pony with VIP Darshan.',
      },
      {
        dayOrTime: 'Day 02',
        title: 'Kharsali to Gangotri (Harsil Valley Helipad)',
        description: 'Fly over alpine ridges to scenic Harsil Valley. Scenic drive to Gangotri temple for VIP Puja and holy dip in Bhagirathi river.',
      },
      {
        dayOrTime: 'Day 03',
        title: 'Harsil to Kedarnath (Sersi Helipad)',
        description: 'Helicopter transfer to Sersi base, then shuttle to Kedarnath top helipad for sacred VIP Darshan of Lord Shiva’s Jyotirlinga.',
      },
      {
        dayOrTime: 'Day 04',
        title: 'Sersi to Badrinath Ji',
        description: 'Fly from Sersi to Badrinath helipad. Afternoon VIP Darshan, evening Aarti, and check-in at luxury Badrinath resort.',
      },
      {
        dayOrTime: 'Day 05',
        title: 'Maha Abhishek Puja & Return to Dehradun',
        description: 'Early morning special Maha Abhishek Puja inside sanctum sanctorum, followed by breakfast and scenic return flight to Dehradun.',
      },
    ],
  },
  {
    id: 'do-dham-kedarnath-badrinath',
    number: '03',
    title: 'Do Dham Yatra — Kedarnath & Badrinath',
    subtitle: 'Same Day or 2-Day VIP Darshan of the two most revered Shiva & Vishnu Dhams',
    duration: 'Same Day or 2 Days / 1 Night',
    route: ['Dehradun', 'Sersi / Kedarnath', 'Badrinath Helipad', 'Dehradun'],
    startingPrice: '₹1,35,000 / person',
    pricePerPerson: 135000,
    charterPrice: 680000,
    image: '/images/flystar_kedarnath_helicopter_1788161902244.webp',
    badge: 'HIGH DEMAND',
    serviceType: 'dodham-kedarnath-badrinath',
    highlights: [
      'Cover both Kedarnath and Badrinath in a single day',
      'VIP Priority Darshan at both shrines with dedicated marshals',
      'All local vehicular transfers & helipad shuttles included',
      'Ideal for senior citizens and busy professionals',
    ],
    inclusions: [
      'Helicopter charter / seat flying Dehradun - Kedarnath - Badrinath - Dehradun',
      'Priority VIP Darshan passes at both shrines',
      'Ground transfers in Badrinath',
      'Packed lunch / satvik meal at luxury resort',
    ],
    exclusions: [
      'Personal offerings & priests dakshina',
      'Extended hotel stay in case of bad weather',
    ],
    itinerary: [
      {
        dayOrTime: '07:00 AM',
        title: 'Departure from Dehradun to Kedarnath',
        description: 'Scenic morning flight arriving at Kedarnath top helipad for escorted VIP Darshan.',
      },
      {
        dayOrTime: '11:30 AM',
        title: 'Flight to Badrinath Dham',
        description: 'Fly across the Chaukhamba peaks to Badrinath helipad, proceed directly for temple darshan.',
      },
      {
        dayOrTime: '03:30 PM',
        title: 'Return to Dehradun Sahastradhara',
        description: 'After lunch and Mana Village excursion, fly back to Dehradun, concluding the holy pilgrimage.',
      },
    ],
  },
  {
    id: 'badrinath-same-day',
    number: '04',
    title: 'Badrinath VIP Same Day Darshan',
    subtitle: 'Direct Helicopter service to the abode of Lord Badri Vishal with Mana Village tour',
    duration: 'Same Day (4 - 5 Hours)',
    route: ['Dehradun (Sahastradhara)', 'Badrinath Helipad', 'Dehradun'],
    startingPrice: '₹85,000 / seat',
    pricePerPerson: 85000,
    charterPrice: 420000,
    image: '/images/flystar_himalayan_fleet_1788161946820.webp',
    serviceType: 'badrinath-sameday',
    highlights: [
      'Quickest way to visit Badrinath Temple from Dehradun',
      'Direct landing at Badrinath helipad, 1 km from temple gate',
      'Visit Mana Village (First Indian Village) & Saraswati River origin',
    ],
    inclusions: [
      'Round-trip helicopter flight Dehradun - Badrinath - Dehradun',
      'VIP Darshan pass and local guide assistance',
      'Local vehicle for temple & Mana Village transfer',
      'Pure satvik lunch at Sarovar Portico / luxury retreat',
    ],
    exclusions: [
      'Special Maha Abhishek ticket (available on request)',
      'Personal pooja items',
    ],
    itinerary: [
      {
        dayOrTime: '08:00 AM',
        title: 'Takeoff from Sahastradhara, Dehradun',
        description: 'Fly over Tehri Dam and Alaknanda river gorges.',
      },
      {
        dayOrTime: '09:15 AM',
        title: 'Arrival & VIP Darshan at Badrinath Shrine',
        description: 'Escorted darshan of Badri Vishal, explore Tapt Kund and Brahma Kapal.',
      },
      {
        dayOrTime: '01:00 PM',
        title: 'Return Flight to Dehradun',
        description: 'Board return helicopter, arriving back in Dehradun in time for afternoon connections.',
      },
    ],
  },
];

export const FLOWER_DROPPING_PACKAGES = [
  {
    id: 'flower-royal-wedding',
    title: 'Royal Wedding Aerial Flower Shower',
    subtitle: 'Magnificent petal shower from the sky during Varmala, Baraat entry, or Pheras',
    capacity: '50 - 150 kg Petals',
    sorties: '1 - 3 Aerial Passes',
    price: 'Starting from ₹2,75,000',
    occasions: ['Grand Weddings', 'Baraat Procession', 'Varmala Celebration', 'Ring Ceremony'],
    description: 'The aircraft holds a steady hover over the stage while fresh rose and marigold petals are released, timed to the moment you choose.',
  },
  {
    id: 'flower-temple-inauguration',
    title: 'Temple & Religious Mahotsav Petal Drop',
    subtitle: 'Sacred flower showering for Pran Pratishtha, Shobha Yatra, and religious festivals',
    capacity: '100 - 300 kg Petals',
    sorties: '2 - 5 Aerial Passes',
    price: 'Starting from ₹3,50,000',
    occasions: ['Pran Pratishtha', 'Temple Inaugurations', 'Shobha Yatras', 'Kumbh & Mahasatsang'],
    description: 'Aerial pushp varsha over temple spires and processions, flown at the DGCA-mandated safety altitude for the venue.',
  },
  {
    id: 'flower-vip-rally-event',
    title: 'VIP Rallies, Sports & Public Events',
    subtitle: 'High-impact aerial petal showers for stadium inaugurations, political rallies & corporate launches',
    capacity: '150 - 500 kg Petals',
    sorties: 'Multi-sortie custom plan',
    price: 'Custom Quotation',
    occasions: ['Public Rallies', 'Stadium Events', 'Corporate Jubilees', 'Memorial Tributes'],
    description: 'Create unmatched visual grandeur and press coverage with synchronized aerial flower drops over large gatherings, fully managed with local civil administration clearances.',
  },
];

export const CHARTER_SERVICES = [
  {
    id: 'corporate-charter',
    title: 'Corporate Helicopter Charter',
    subtitle: 'Point-to-point business aviation avoiding airport congestion and road delays',
    image: '/images/flystar_himalayan_fleet_1788161946820.webp',
    description: 'Empower your executive leadership with on-demand helicopter flights directly between factory sites, remote industrial plants, state capitals, and city helipads. Save valuable hours with flexible flight itineraries.',
    features: [
      'Direct helipad-to-helipad connectivity across India',
      'Flexible departure times tailored to board meetings',
      'Spacious quiet club-cabin with work tables',
      'Dedicated concierge and priority tarmac clearance',
    ],
    startingRate: '₹1,25,000 / hour',
  },
  {
    id: 'vip-transport',
    title: 'VIP & Dignitary Transport',
    subtitle: 'Discreet, ultra-secure helicopter charters for HNIs, celebrities & statesmen',
    image: '/images/flystar_himalayan_fleet_1788161946820.webp',
    description: 'Complete privacy and highest security protocol with dedicated aviation marshals, direct aircraft boarding, and VIP lounge hospitality across major private airports and bespoke landing grounds.',
    features: [
      'Absolute privacy and non-disclosure discretion',
      'Executive leather seating and soundproofed cabin',
      'Direct baggage handling & chauffeur ramp access',
      'Dual-pilot instrument rating for maximum safety',
    ],
    startingRate: '₹1,45,000 / hour',
  },
  {
    id: 'aerial-filming',
    title: 'Aerial Cinematography & Photography',
    subtitle: 'Gyro-stabilized aerial platforms for blockbuster films, documentaries & surveys',
    image: '/images/flystar_flower_dropping_1788161916372.webp',
    description: 'Specialized helicopters equipped with approved nose and side gimbal mounts (Shotover / Cineflex), door-off configuration for photographers, and precision-flight pilots trained in high-speed tracking.',
    features: [
      'Doors-off flight clearance for 360° unobstructed views',
      'DGCA approved camera bracket mounts',
      'Pilots experienced in cinematography flight paths',
      'Full day and multi-day location production packages',
    ],
    startingRate: '₹1,30,000 / hour',
  },
  {
    id: 'emergency-air-ambulance',
    title: 'Emergency Medical Evacuation (HEMS)',
    subtitle: '24/7 ICU-equipped air ambulance with rapid dispatch in under 45 minutes',
    image: '/images/flystar_kedarnath_helicopter_1788161902244.webp',
    description: 'Life-saving critical care transport from remote Himalayan areas, highway accidents, and tier-2 cities directly to premier quaternary hospitals in Dehradun, Delhi NCR, and Chandigarh.',
    features: [
      'Full onboard ICU with ventilator, defibrillator & multipara monitors',
      'Critical care physician & paramedic team onboard',
      'High-altitude Himalayan rescue capability',
      '24/7 immediate emergency hotline dispatch',
    ],
    startingRate: 'Immediate Emergency Response',
  },
];

export const FLEET_LIST = [
  {
    id: 'airbus-h125',
    name: 'Airbus H125 (Écureuil)',
    model: 'Single-Engine High-Altitude Champion',
    manufacturer: 'Airbus Helicopters',
    capacity: '5 - 6 Passengers',
    speed: '250 km/h (135 kts)',
    range: '630 km',
    altitudeCeiling: '23,000 ft (World Record Holder)',
    engine: 'Safran Arriel 2D with Dual FADEC',
    description: 'The undisputed king of Himalayan flying. Holds the world altitude landing record on Mount Everest. Exceptional hot-and-high performance makes it our primary choice for Kedarnath & Chardham.',
    image: '/images/flystar_kedarnath_helicopter_1788161902244.webp',
    bestFor: ['Kedarnath Shuttles', 'Chardham 4 Dham', 'High-Altitude Rescue'],
    features: [
      'Unmatched power-to-weight ratio in thin mountain air',
      'Large panoramic cockpit windows for unobstructed views',
      'Low vibration cabin with energy-absorbing leather seats',
      'Dual hydraulic systems & digital engine management',
    ],
  },
  {
    id: 'bell-407-gx',
    name: 'Bell 407 GX',
    model: 'VIP Executive & Corporate Charter',
    manufacturer: 'Bell Flight (USA)',
    capacity: '6 Passengers (Club Seating)',
    speed: '260 km/h (140 kts)',
    range: '600 km',
    altitudeCeiling: '20,000 ft',
    engine: 'Rolls-Royce 250-C47B Turbine',
    description: 'The standard of luxury in executive rotary-wing travel. Features a spacious 5-place club-seating aft cabin with rich leather, whisper-quiet cabin acoustics, and Garmin G1000H glass cockpit.',
    image: '/images/flystar_himalayan_fleet_1788161946820.webp',
    bestFor: ['Corporate Charters', 'VIP Dignitaries', 'Executive Travel'],
    features: [
      'Garmin G1000H integrated glass avionics suite',
      'Spacious VIP club-cabin with wide center console',
      'Four-blade composite rotor system for ultra-smooth flight',
      'Generous 18 cu ft baggage compartment',
    ],
  },
  {
    id: 'airbus-h130',
    name: 'Airbus H130 (EC130 T2)',
    model: 'Panoramic Tourism & Flower Dropping',
    manufacturer: 'Airbus Helicopters',
    capacity: '7 Passengers',
    speed: '235 km/h (127 kts)',
    range: '610 km',
    altitudeCeiling: '19,000 ft',
    engine: 'Safran Arriel 2D Turbine',
    description: 'Built specifically for scenic aerial tourism and aerial ceremonies. Its enclosed Fenestron tail rotor delivers the quietest acoustic footprint in its class and unparalleled safety.',
    image: '/images/flystar_flower_dropping_1788161916372.webp',
    bestFor: ['Aerial Flower Dropping', 'Sightseeing Tours', 'Wedding Celebrations'],
    features: [
      'Extra-wide cabin with theater-style passenger seating',
      'Signature Fenestron shrouded tail rotor for ultra-low noise',
      '360° unobstructed crystal canopy glass',
      'High internal payload capacity for fresh flower cargo',
    ],
  },
  {
    id: 'airbus-h145',
    name: 'Airbus H145 / Twin-Engine',
    model: 'Twin-Engine All-Weather & Air Ambulance',
    manufacturer: 'Airbus Helicopters',
    capacity: '8 - 9 Passengers / 2 Stretchers',
    speed: '270 km/h (145 kts)',
    range: '680 km',
    altitudeCeiling: '20,000 ft',
    engine: 'Twin Safran Arriel 2E Turbines',
    description: 'Twin-engine redundancy for high-security VIP movements and round-the-clock emergency medical evacuation. Equipped with full night-flying capabilities and certified instrument flight rules (IFR).',
    image: '/images/flystar_himalayan_fleet_1788161946820.webp',
    bestFor: ['Air Ambulance (ICU)', 'Twin-Engine VIP Charter', 'Long-Distance Routes'],
    features: [
      'Twin-engine reliability with Category A performance',
      'Helionix 4-axis autopilot suite',
      'Rear clamshell doors for rapid patient stretcher loading',
      'All-weather day & night instrument operational capability',
    ],
  },
];

/**
 * Book My CharDham has ONE registered office. Everything else below is a
 * public airport or helipad we arrange departures from — not premises we own.
 * Never label these as our offices, terminals or hangars: the NAP in schema
 * and llms.txt must stay a single consistent address.
 */
export const REGISTERED_OFFICE = {
  city: 'New Delhi',
  kind: 'Registered office',
  venue: 'Book My CharDham',
  address: 'C705, Sector 7, Block C, Palam Extension, Dwarka, Delhi 110077',
  coordinates: '28.6149\u00b0 N, 77.0218\u00b0 E',
};

export const DEPARTURE_POINTS = [
  {
    city: 'Dehradun',
    kind: 'Char Dham departures',
    venue: 'Sahastradhara Helipad',
    address: 'Sahastradhara Road, Kulhan, Dehradun, Uttarakhand 248013',
    coordinates: '30.3872\u00b0 N, 78.1189\u00b0 E',
  },
  {
    city: 'Kedarnath sector',
    kind: 'Kedarnath shuttle',
    venue: 'Phata, Sersi and Guptkashi helipads',
    address: 'Kedarnath Highway, Guptkashi\u2013Sersi, Rudraprayag, Uttarakhand 246471',
    coordinates: '30.5721\u00b0 N, 79.0345\u00b0 E',
  },
  {
    city: 'New Delhi',
    kind: 'Charter departures',
    venue: 'IGI Airport, general aviation terminal',
    address: 'Indira Gandhi International Airport, New Delhi 110037',
    coordinates: '28.5562\u00b0 N, 77.1000\u00b0 E',
  },
  {
    city: 'Mumbai',
    kind: 'Charter departures',
    venue: 'Juhu Aerodrome',
    address: 'SV Road, Juhu, Mumbai, Maharashtra 400054',
    coordinates: '19.0975\u00b0 N, 72.8328\u00b0 E',
  },
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Rajesh & Sunita Singhania',
    role: 'Pilgrim Family',
    location: 'Mumbai',
    service: 'Chardham 4 Dham VIP Package',
    quote: 'Our parents (aged 76 and 72) had been dreaming of visiting Yamunotri and Kedarnath for decades. BookMyChardham made it as effortless as a blessing. The VIP Darshan pass meant no waiting in 8-hour queues, and the luxury stays at Harsil were breathtaking.',
    rating: 5,
    date: 'May 2026',
  },
  {
    id: '2',
    name: 'Capt. Arvind Narang',
    role: 'Managing Director, Horizon Infra',
    location: 'Gurugram',
    service: 'Corporate Helicopter Charter',
    quote: 'We had to inspect 3 remote hydroelectric project sites across Himachal and Uttarakhand in a single day. BookMyChardham handled DGCA clearances, helipad marshaling, and flight timing with military precision. Saved us at least 3 days of travel.',
    rating: 5,
    date: 'June 2026',
  },
  {
    id: '3',
    name: 'Dr. Meenakshi & Varun Oberoi',
    role: 'Wedding Clients',
    location: 'Udaipur / Delhi',
    service: 'Aerial Flower Shower Ceremony',
    quote: 'The aerial flower dropping during our Varmala at Jagmandir Palace was the absolute highlight of our wedding! Thousands of fresh rose petals floating down in the sunset light. BookMyChardham coordinated all permissions flawlessly.',
    rating: 5,
    date: 'February 2026',
  },
];

export const CHARDHAM_ITINERARY = [
  {
    day: 1,
    shrine: 'Yamunotri Dham',
    altitude: '10,797 FT',
    title: 'Dehradun to Kharsali & Sacred Yamunotri Trek',
    details: 'Depart early morning from Sahastradhara Helipad, Dehradun. Fly over lush alpine valleys to Kharsali helipad. VIP escort to your luxury resort, followed by a comfortable 6 km journey to Shri Yamunotri Ji shrine via complimentary Palki or Pony. Take holy darshan and return to resort for gourmet dinner.',
    stay: 'Luxury Alpine Resort, Kharsali',
    darshan: 'Priority VIP Darshan & Divya Shila Puja',
  },
  {
    day: 2,
    shrine: 'Gangotri Dham',
    altitude: '10,200 FT',
    title: 'Kharsali to Harsil Valley & Gangotri VIP Darshan',
    details: 'Take off from Kharsali and fly over snowy mountain ridges to the idyllic Harsil Valley, renowned as the Switzerland of India. Travel in a private Innova along the pristine Bhagirathi river to Gangotri temple. Perform sacred Aarti and enjoy evening bonfire amidst apple orchards.',
    stay: 'Himalayan Apple Resort / Luxury Swiss Tents, Harsil',
    darshan: 'VIP Temple Entry & Bhagirathi River Holy Dip',
  },
  {
    day: 3,
    shrine: 'Kedarnath Dham',
    altitude: '11,755 FT',
    title: 'Harsil to Sersi & Shri Kedarnath Ji Jyotirlinga Darshan',
    details: 'Fly to Sersi helipad base, then board the high-frequency mountain shuttle directly to Kedarnath top helipad (just 500m from temple). Our ground coordinator escorts you through the VIP entry for the Jalabhishek.',
    stay: 'Premium Himalayan Retreat, Sersi / Guptkashi',
    darshan: 'Special VIP Rudrabhishek Darshan Pass',
  },
  {
    day: 4,
    shrine: 'Badrinath Dham',
    altitude: '10,279 FT',
    title: 'Sersi to Badrinath Ji & Mana Village Excursion',
    details: 'Fly across the Chaukhamba peaks to Badrinath helipad. Escorted transfer to your luxury hotel. Afternoon VIP Darshan of Lord Badri Vishal, explore Tapt Kund hot springs, and take an excursion to Mana Village — the first village of India on the Indo-Tibetan border.',
    stay: 'Sarovar Portico / Lord Krishna Resort, Badrinath',
    darshan: 'VIP Darshan & Evening Swarna Aarti at Badrinath',
  },
  {
    day: 5,
    shrine: 'Sacred Maha Abhishek',
    altitude: 'Dehradun Return',
    title: 'Special Maha Abhishek Puja & Flight to Dehradun',
    details: 'Attend the sacred 04:30 AM Maha Abhishek Puja inside the inner sanctum of Badrinath Temple. After spiritual fulfillment and a satvik breakfast, board the helicopter for a scenic flight back to Dehradun Sahastradhara Helipad, concluding your divine journey.',
    stay: 'Journey Completion at Dehradun Terminal',
    darshan: 'Sanctum Sanctorum Maha Abhishek Seva',
  },
];

export const CHARDHAM_GUIDELINES = [
  {
    topic: 'Weight & High Altitude Payload',
    rule: 'Due to thin air in the high Himalayas, maximum average body weight per passenger is strictly monitored at 75-80 kg as per DGCA regulations. Accurate weights must be provided during booking.',
  },
  {
    topic: 'Strict Luggage Allowance',
    rule: 'Only 1 soft duffle bag weighing up to 5 kg is allowed per passenger. Hard trolley suitcases cannot be loaded inside helicopter cargo compartments due to space constraints.',
  },
  {
    topic: 'Dynamic Mountain Weather',
    rule: 'Himalayan weather changes rapidly. Pilot decisions regarding flight safety and cloud cover clearances are final. Every effort is made to utilize clear flight windows.',
  },
  {
    topic: 'Senior Citizen & Medical Care',
    rule: 'Oxygen cylinders and first-aid kits are available on all aircraft. Devotees with cardiovascular or respiratory conditions should consult physicians before high-altitude travel.',
  },
];

export const FAQS = [
  {
    question: 'What is the passenger weight limit for Kedarnath and Chardham flights?',
    answer: 'Due to high-altitude thin air in the Himalayas (Kedarnath sits at 11,755 ft), aircraft payload is governed strictly by DGCA safety rules. The maximum average weight per passenger is calculated at 75-80 kg. We weigh all passengers and luggage at Dehradun base. Each passenger is allowed up to 5 kg of soft bag luggage (duffle bags preferred over hard suitcases).',
  },
  {
    question: 'How does VIP Darshan work at Kedarnath & Badrinath with BookMyChardham?',
    answer: 'BookMyChardham coordinates official VIP Darshan slips in collaboration with the Badrinath-Kedarnath Temple Committee (BKTC). Our dedicated ground executive meets you right at the helipad and escorts your group through the priority VIP entrance, reducing normal wait times from 6-10 hours down to approximately 20-30 minutes.',
  },
  {
    question: 'What happens if the flight is delayed or grounded due to bad mountain weather?',
    answer: 'Himalayan weather is dynamic. Pilot decision on safety is final. If a flight cannot operate due to weather or ATC restrictions on a given day, we make every effort to accommodate the flight on the immediate next weather opening. In case of full cancellation, refunds or rescheduling are processed as per our transparent DGCA-aligned pilgrimage charter policy.',
  },
  {
    question: 'How far in advance should we book flower dropping for a wedding or event?',
    answer: 'We recommend booking at least 15 to 21 days in advance. This allows sufficient time to obtain local District Administration NOCs, Police clearances, and DGCA flight route authorizations for the specific venue coordinates.',
  },
];
