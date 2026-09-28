import type { Path } from '@/types/common';
import type { Faq } from '@/types/faq';

/**
 * Helicopter charter from a city: the trips a helicopter makes sense for,
 * each with the straight-line distance to the destination's airport and an
 * estimated helicopter flying time (both computed, see lib/route-math).
 *
 * Separate from the city destination pages, which are about private jets and
 * the city's airports. These are about short helicopter trips out of the
 * city, so the two do not compete for the same search.
 */
export interface HelicopterCity {
  readonly slug: string;
  readonly city: string;
  readonly fromIcao: string;
  readonly summary: string;
  readonly body: readonly string[];
  readonly trips: readonly { readonly name: string; readonly icao: string; readonly why: string }[];
  readonly faqs: readonly Faq[];
  readonly related: readonly { label: string; href: Path; description: string }[];
}

export const HELICOPTER_CITIES: readonly HelicopterCity[] = [
  {
    slug: 'delhi',
    city: 'Delhi',
    fromIcao: 'VIDP',
    summary:
      'Helicopter charter in Delhi suits trips of up to about 300 km, such as Agra, Jaipur, Dehradun and Chandigarh, landing at an approved helipad or open ground close to where you are going.',
    body: [
      'Helicopter charter in Delhi is for short trips where the drive is long and the destination has no convenient airport, or is far from it. Within about 300 km, a helicopter is often the fastest door-to-door option.',
      'Helicopters leave from the main airport, from Delhi’s public heliport at Rohini, or from a private site that has been approved for landing. Flying over central Delhi is tightly restricted, so routes are planned around protected airspace.',
      'For the hills, a helicopter from Delhi can fly all the way to Dehradun and beyond, where there is no runway. That turns a two-aircraft trip into one.',
    ],
    trips: [
      { name: 'Agra', icao: 'VIAG', why: 'Day trips and events' },
      { name: 'Dehradun, for Rishikesh and Mussoorie', icao: 'VIDN', why: 'Gateway to the hills' },
      { name: 'Jaipur', icao: 'VIJP', why: 'Weddings, palace hotels and events' },
      { name: 'Chandigarh', icao: 'VICG', why: 'Business and onward to the hills' },
      { name: 'Pantnagar, for Nainital and Corbett', icao: 'VIPT', why: 'Hills and national park' },
      { name: 'Shimla', icao: 'VISM', why: 'Hill station' },
    ],
    faqs: [
      {
        question: 'Can I book a helicopter from Delhi to Agra?',
        answer:
          'Yes; Agra is about 180 km from Delhi, well within helicopter range, and the helicopter can land at an approved site near your destination.',
      },
      {
        question: 'Where do helicopters take off from in Delhi?',
        answer:
          'From the main airport, from Delhi’s public heliport at Rohini, or from a private site approved for landing, depending on the helicopter and your trip.',
      },
      {
        question: 'Can I fly a helicopter from Delhi to Rishikesh or Mussoorie?',
        answer:
          'Yes, via Dehradun about 210 km away, and the helicopter can continue into the hills where there is no runway, weather permitting.',
      },
    ],
    related: [
      { label: 'Private Jet Charter in Delhi', href: '/destinations/delhi', description: 'Airports and jets from Delhi' },
      { label: 'Delhi to Dehradun', href: '/routes/delhi-to-dehradun', description: 'Jet or helicopter' },
      { label: 'Delhi to Jaipur', href: '/routes/delhi-to-jaipur', description: 'Jet or helicopter' },
      { label: 'Char Dham Helicopter Charter', href: '/chardham', description: 'Private helicopter to the dhams' },
    ],
  },
  {
    slug: 'mumbai',
    city: 'Mumbai',
    fromIcao: 'VABB',
    summary:
      'Helicopter charter in Mumbai suits short hops to Pune, Nashik, Shirdi and Surat, avoiding the city’s traffic and landing at an approved helipad near where you are going.',
    body: [
      'Helicopter charter in Mumbai is mostly about time. Road trips out of the city can take hours in traffic, while Pune, Nashik and Shirdi are under an hour away by helicopter.',
      'Helicopters leave from the main airport or from a site approved for landing. Mumbai’s airspace is busy and tightly controlled, so take-off times and routes are agreed in advance.',
      'Shirdi and Nashik are common trips for families and pilgrims, and Pune for business. For coastal sites and project locations with no runway, a helicopter is often the only practical aircraft.',
    ],
    trips: [
      { name: 'Pune', icao: 'VAPO', why: 'Business and same-day returns' },
      { name: 'Nashik', icao: 'VAOZ', why: 'Business, vineyards and pilgrimage' },
      { name: 'Shirdi', icao: 'VASD', why: 'Pilgrimage day trips' },
      { name: 'Surat', icao: 'VASU', why: 'Business trips' },
      { name: 'Aurangabad, for Ajanta and Ellora', icao: 'VAAU', why: 'Heritage sites' },
    ],
    faqs: [
      {
        question: 'Can I book a helicopter from Mumbai to Shirdi?',
        answer:
          'Yes; Shirdi is about 170 km from Mumbai, roughly an hour by helicopter, and a same-day return is common.',
      },
      {
        question: 'How long is a helicopter from Mumbai to Pune?',
        answer:
          'Roughly an hour, including taxi and climb, for a straight-line distance of about 125 km between the airports.',
      },
      {
        question: 'Where do helicopters take off from in Mumbai?',
        answer:
          'From the main airport or from a site approved for landing, with times and routes agreed in advance because Mumbai’s airspace is busy.',
      },
    ],
    related: [
      { label: 'Private Jet Charter in Mumbai', href: '/destinations/mumbai', description: 'Airports and jets from Mumbai' },
      { label: 'Mumbai to Goa', href: '/routes/mumbai-to-goa', description: 'Distance, time and aircraft' },
      { label: 'Helicopter Charter Price', href: '/helicopter-charter/helicopter-charter-price', description: 'What makes up the price' },
    ],
  },
  {
    slug: 'bengaluru',
    city: 'Bengaluru',
    fromIcao: 'VOBL',
    summary:
      'Helicopter charter in Bengaluru suits trips to Mysuru, Puttaparthi, Tirupati and Coimbatore, and to estates and resorts with no runway, within about 300 km.',
    body: [
      'Helicopter charter in Bengaluru covers the short trips where the road is slow and there is no nearby runway: coffee estates, resorts, temples and project sites across Karnataka and the neighbouring states.',
      'Helicopters leave from Kempegowda International Airport or from a site approved for landing. The airport is north of the city, so for trips south a closer approved site can save time.',
      'Mysuru and Tirupati are common trips. For hill estates, the landing site and its approach are checked before the date, because slopes, trees and wires limit where a helicopter can land.',
    ],
    trips: [
      { name: 'Puttaparthi', icao: 'VOPN', why: 'Pilgrimage' },
      { name: 'Mysuru', icao: 'VOMY', why: 'Heritage, events and onward to Coorg' },
      { name: 'Tirupati', icao: 'VOTP', why: 'Pilgrimage day trips' },
      { name: 'Coimbatore', icao: 'VOCB', why: 'Business and onward to the Nilgiris' },
      { name: 'Chennai', icao: 'VOMM', why: 'Business' },
    ],
    faqs: [
      {
        question: 'Can I book a helicopter from Bengaluru to Tirupati?',
        answer:
          'Yes; Tirupati is about 200 km from Bengaluru, within helicopter range, subject to landing permission near the temple town.',
      },
      {
        question: 'How long is a helicopter from Bengaluru to Mysuru?',
        answer:
          'Roughly an hour and a quarter, including taxi and climb, for a straight-line distance of about 160 km between the airports.',
      },
      {
        question: 'Can a helicopter land at a coffee estate or resort?',
        answer:
          'Yes, if the site has enough flat open space and a clear approach free of trees and wires, and permission is granted before the date.',
      },
    ],
    related: [
      { label: 'Private Jet Charter in Bengaluru', href: '/destinations/bengaluru', description: 'Airports and jets from Bengaluru' },
      { label: 'Bengaluru to Goa', href: '/routes/bengaluru-to-goa', description: 'Distance, time and aircraft' },
      { label: 'Helicopter Charter Price', href: '/helicopter-charter/helicopter-charter-price', description: 'What makes up the price' },
    ],
  },
];

export function helicopterCityBySlug(slug: string): HelicopterCity | undefined {
  return HELICOPTER_CITIES.find((c) => c.slug === slug);
}

export function helicopterCityHref(c: HelicopterCity): Path {
  return `/helicopter-charter/${c.slug}` as Path;
}
