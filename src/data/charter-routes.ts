import type { Path } from '@/types/common';

/**
 * Charter route pages: city pairs people actually search for and fly.
 *
 * Each page is built from computed facts (straight-line distance from
 * public-domain airport coordinates, the aircraft types whose typical range
 * covers it, runway lengths) plus a short note written for that pair. The
 * note is the part that makes the page more than a template, so a route
 * without something true and specific to say does not get a page.
 *
 * One page per pair, covering both directions.
 */
export interface CharterRoute {
  readonly slug: string;
  readonly from: { readonly city: string; readonly icao: string };
  readonly to: { readonly city: string; readonly icao: string };
  /** Written for this pair. Plain facts only. */
  readonly note: readonly string[];
  /** Mention the helicopter alternative prominently (short hill or regional legs). */
  readonly helicopterFriendly?: boolean;
}

const DEL = { city: 'Delhi', icao: 'VIDP' } as const;
const BOM = { city: 'Mumbai', icao: 'VABB' } as const;
const BLR = { city: 'Bengaluru', icao: 'VOBL' } as const;

export const CHARTER_ROUTES: readonly CharterRoute[] = [
  {
    slug: 'delhi-to-mumbai',
    from: DEL,
    to: BOM,
    note: [
      'Delhi to Mumbai links the capital with India’s financial centre, and it is one of the most flown business charter routes. Aircraft are often based at one end or the other, so positioning can be short.',
      'Both main airports are busy international airports. Slot times (the take-off and landing times you are given) and handling can shape your timing more than the flight itself.',
    ],
  },
  {
    slug: 'delhi-to-bengaluru',
    from: DEL,
    to: BLR,
    note: [
      'Delhi to Bengaluru crosses most of the country. A turboprop can reach it, but a jet saves more than an hour, so it is usually a jet trip.',
      'Kempegowda International Airport sits at about 3,000 ft above sea level, higher than most metro airports, which the operator accounts for on a hot day.',
    ],
  },
  {
    slug: 'delhi-to-hyderabad',
    from: DEL,
    to: { city: 'Hyderabad', icao: 'VOHS' },
    note: [
      'Delhi to Hyderabad works as a same-day business trip by light or midsize jet.',
      'Rajiv Gandhi International Airport has one of the longest runways in India, so runway length does not limit the aircraft choice at the Hyderabad end.',
    ],
  },
  {
    slug: 'delhi-to-kolkata',
    from: DEL,
    to: { city: 'Kolkata', icao: 'VECC' },
    note: [
      'Delhi to Kolkata runs the length of the Gangetic plain. Every class listed can fly it nonstop, but a jet saves about an hour over a turboprop.',
      'Kolkata’s airport is almost at sea level, so a full aircraft performs as expected even in summer heat.',
    ],
  },
  {
    slug: 'delhi-to-chennai',
    from: DEL,
    to: { city: 'Chennai', icao: 'VOMM' },
    note: [
      'Delhi to Chennai is one of the longest domestic charter routes. Cabin size matters more here, because the flight is long enough to work or rest.',
      'Light jets can fly it nonstop, but a full cabin with baggage for a long day is where midsize and larger jets earn their place.',
    ],
  },
  {
    slug: 'delhi-to-goa',
    from: DEL,
    to: { city: 'Goa', icao: 'VOGO' },
    note: [
      'Goa has two airports: Dabolim (GOI) in the middle of the state and Manohar International (GOX) at Mopa in the north. Choose the one nearer where you are staying.',
      'Delhi to Goa is a leisure favourite. It is a jet trip for most groups, and positioning back to Delhi is usually part of the price.',
    ],
  },
  {
    slug: 'delhi-to-jaipur',
    from: DEL,
    to: { city: 'Jaipur', icao: 'VIJP' },
    helicopterFriendly: true,
    note: [
      'Delhi to Jaipur is short. A jet saves only a few minutes over a turboprop, and a helicopter can fly it directly if both ends have a suitable landing site.',
      'Jaipur is a popular city for weddings and events, so plan early in the wedding season.',
    ],
  },
  {
    slug: 'delhi-to-udaipur',
    from: DEL,
    to: { city: 'Udaipur', icao: 'VAUD' },
    note: [
      'Udaipur is one of India’s best-known wedding destinations, and charter demand there peaks in the wedding season.',
      'Maharana Pratap Airport’s runway is shorter than at the metro airports. That still suits business jets and turboprops, but it can rule out the largest aircraft.',
    ],
  },
  {
    slug: 'delhi-to-dehradun',
    from: DEL,
    to: { city: 'Dehradun', icao: 'VIDN' },
    helicopterFriendly: true,
    note: [
      'Dehradun’s Jolly Grant Airport is the air gateway to Rishikesh, Mussoorie and the Char Dham helicopter routes.',
      'The distance is short enough for a helicopter from Delhi, and for hill trips the helicopter can continue past Dehradun to where there is no runway.',
    ],
  },
  {
    slug: 'delhi-to-leh',
    from: DEL,
    to: { city: 'Leh', icao: 'VILH' },
    note: [
      'Leh’s airport sits at over 10,600 ft, among the highest airports in the world. Thin air cuts engine power and lift, so the operator may limit passengers, baggage or fuel.',
      'Mountain weather and the high altitude make timing matter. Operators often prefer the cooler part of the day, and a weather delay is a real possibility.',
    ],
  },
  {
    slug: 'delhi-to-srinagar',
    from: DEL,
    to: { city: 'Srinagar', icao: 'VISR' },
    note: [
      'Srinagar’s airport is at about 5,400 ft, so performance on a warm day is lower than at Delhi.',
      'It has a long runway, which leaves room for most business jets.',
    ],
  },
  {
    slug: 'delhi-to-varanasi',
    from: DEL,
    to: { city: 'Varanasi', icao: 'VEBN' },
    note: [
      'Delhi to Varanasi suits a light jet or a turboprop. The jet saves roughly half an hour to an hour.',
      'Varanasi’s airport has a runway of about 9,000 ft, enough for business jets.',
    ],
  },
  {
    slug: 'delhi-to-ahmedabad',
    from: DEL,
    to: { city: 'Ahmedabad', icao: 'VAAH' },
    note: [
      'Delhi to Ahmedabad is a regular business route. A same-day return with meetings in between is practical by light jet.',
      'Ahmedabad’s airport is near sea level with a long runway, so runway length does not limit the aircraft choice.',
    ],
  },
  {
    slug: 'delhi-to-amritsar',
    from: DEL,
    to: { city: 'Amritsar', icao: 'VIAR' },
    note: [
      'Delhi to Amritsar is short. A turboprop arrives within minutes of a jet and usually costs less.',
      'Amritsar’s airport has a long runway, so any business aircraft can use it.',
    ],
  },
  {
    slug: 'mumbai-to-bengaluru',
    from: BOM,
    to: BLR,
    note: [
      'Mumbai to Bengaluru links India’s financial and technology capitals and is a regular corporate route.',
      'Mumbai’s airport is busy and tightly slotted. Bengaluru’s airport is higher above sea level, which matters on a hot afternoon.',
    ],
  },
  {
    slug: 'mumbai-to-hyderabad',
    from: BOM,
    to: { city: 'Hyderabad', icao: 'VOHS' },
    note: [
      'Mumbai to Hyderabad is a mid-length route. Both light jets and turboprops can do it nonstop.',
      'A same-day return is practical, which is the usual reason to charter it.',
    ],
  },
  {
    slug: 'mumbai-to-goa',
    from: BOM,
    to: { city: 'Goa', icao: 'VOGO' },
    note: [
      'Mumbai to Goa is short. A turboprop is often the best-value choice and arrives within minutes of a jet.',
      'Goa has two airports: Dabolim (GOI) in the middle of the state and Manohar International (GOX) at Mopa in the north.',
    ],
  },
  {
    slug: 'mumbai-to-udaipur',
    from: BOM,
    to: { city: 'Udaipur', icao: 'VAUD' },
    note: [
      'Mumbai to Udaipur is a wedding and leisure route. Guests often fly in groups on the same day.',
      'Udaipur’s runway is shorter than at the metro airports. It suits business jets and turboprops but can rule out the largest aircraft.',
    ],
  },
  {
    slug: 'mumbai-to-ahmedabad',
    from: BOM,
    to: { city: 'Ahmedabad', icao: 'VAAH' },
    note: [
      'Mumbai to Ahmedabad is a short business hop. A turboprop or light jet does it comfortably.',
      'For a short trip, time at each airport (security, taxi, handling) is a bigger share of the day than the flight itself.',
    ],
  },
  {
    slug: 'bengaluru-to-goa',
    from: BLR,
    to: { city: 'Goa', icao: 'VOGO' },
    note: [
      'Bengaluru to Goa is a popular leisure route. It is short enough for a turboprop.',
      'Goa has two airports: Dabolim (GOI) in the middle of the state and Manohar International (GOX) at Mopa in the north.',
    ],
  },
];

export function routeBySlug(slug: string): CharterRoute | undefined {
  return CHARTER_ROUTES.find((r) => r.slug === slug);
}

export function routeHref(route: CharterRoute): Path {
  return `/routes/${route.slug}` as Path;
}

export function routesFor(city: string): readonly CharterRoute[] {
  return CHARTER_ROUTES.filter((r) => r.from.city === city || r.to.city === city);
}
