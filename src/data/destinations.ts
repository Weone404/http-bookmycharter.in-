import type { Faq } from '@/types/faq';
import type { InternalLink, Path, Slug } from '@/types/common';
import type { AircraftCategory } from '@/types/aircraft';
import { AIRPORTS, AIRPORT_SOURCE, type AirportRecord } from './airports.generated';

/**
 * Destination hubs.
 *
 * A city page ships only when there is something true and specific to say about
 * chartering to or from it. The facility data below is sourced and attributed;
 * the reasoning around it is written per city. A template with the city name
 * swapped is not a page, and the twelve near-identical pages this rebuild
 * removed are why that rule is enforced rather than assumed.
 *
 * Cities beyond these two stay `planned` until their operating facts are
 * confirmed (docs/BUSINESS-DATA-REQUIRED D1 and D2).
 */
export interface DestinationPage {
  readonly slug: Slug;
  readonly city: string;
  readonly matchCity: string;
  /** Pick aerodromes by ICAO instead of by city name (Goa's airports are listed under their towns). */
  readonly icaos?: readonly string[];
  readonly title: string;
  readonly summary: string;
  readonly body: readonly string[];
  readonly charterNotes: readonly string[];
  readonly suitableCategories: readonly AircraftCategory[];
  readonly faqs: readonly Faq[];
  readonly related: readonly InternalLink[];
  readonly canonical: Path;
}

export const DESTINATION_PAGES: readonly DestinationPage[] = [
  {
    slug: 'delhi',
    city: 'Delhi',
    matchCity: 'Delhi',
    title: 'Private Jet & Helicopter Charter in Delhi',
    summary:
      'Private jet charter in Delhi often has lower positioning costs (flying the aircraft to you), as more aircraft are based nearby. The airfield matters too.',
    body: [
      'Private jet charter in Delhi starts with one clear benefit. More aircraft are based within reach of Delhi than almost anywhere else in India. So positioning (flying the aircraft to your departure city) often costs less here than for the same trip from a smaller city. The drawback is that the main international airport is busy. A busy airport means taxi time, slot pressure (limited take-off and landing times) and handling costs that a quieter airfield does not have.',
      'Delhi has more than one aerodrome (airfield), and they are not interchangeable. The international airport takes the full range of aircraft and has full handling services. The smaller state and private airfields serve general aviation, and each has its own access rules and limits. The right one for your trip depends on the aircraft, the timing and what is actually available on the day. It is worth asking, not assuming.',
      'Helicopter charter from Delhi into the hills usually means two legs, not one. For Uttarakhand, Himachal or the Garhwal shrines, a plane first flies you to a valley airfield. A helicopter then covers the mountains beyond it, because there is no runway where you are actually going.',
      'Delhi is within easy business-jet range of most Indian cities, and within turboprop range of much of the north. That makes same-day return trips practical from here in a way they are not from every city. It is the most common reason companies charter from Delhi at all.',
    ],
    charterNotes: [
      'Positioning: often cheaper than from smaller cities, because more aircraft are based within reach',
      'Main airport: busy, so expect taxi time and higher handling costs than at a regional airfield',
      'Same-day returns: practical to most of northern and central India',
      'Hill trips: usually a plane leg plus a helicopter leg, not one aircraft',
      'Departure airfield: it changes cost and timing, so choose it rather than default to one',
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter', 'executive-airliner'],
    faqs: [
      {
        question: 'Which airport does private jet charter in Delhi use?',
        answer:
          'Private jet charter in Delhi can use the full-service international airport or a smaller state or private aerodrome, depending on the aircraft, the handling needed and what is available on your date.',
      },
      {
        question: 'Is private jet charter cheaper from Delhi than from other cities?',
        answer:
          'Often yes, because more aircraft are based within reach of Delhi, which cuts the positioning flights otherwise added to your quote, though the trip and the destination matter more than the departure city.',
      },
      {
        question: 'Can I book a helicopter charter from Delhi to the hills?',
        answer:
          'Usually as part of a two-leg trip, because most hill destinations have no runway, so you fly by plane to a valley airfield and then by helicopter, whose range over that terrain is limited.',
      },
    ],
    related: [
      {
        label: 'Private Charter',
        href: '/private-charter',
        description: 'How whole-aircraft hire works',
      },
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'How helicopter hire works',
      },
      {
        label: 'Char Dham by Helicopter',
        href: '/chardham',
        description: 'Himalayan helicopter trips from the north',
      },
      {
        label: 'Charter Pricing',
        href: '/pricing',
        description: 'Why positioning affects your price',
      },
    ],
    canonical: '/destinations/delhi',
  },
  {
    slug: 'mumbai',
    city: 'Mumbai',
    matchCity: 'Mumbai',
    title: 'Private Jet & Helicopter Charter in Mumbai',
    summary:
      'Private jet charter in Mumbai is shaped by slots and parking more than distance, because the main airport is busy and the city sits on a narrow peninsula.',
    body: [
      'Private jet charter in Mumbai works differently from most cities. The city runs along a narrow peninsula with little spare land. Its main airport is one of the most heavily used in the country. Parking a business aircraft there is a real constraint, not an afterthought. So on a trip out of Mumbai, slots (set take-off and landing times) and ground space often decide what is possible, more than the aircraft does.',
      'The main effect is on timing. At a busy airport, departure and arrival windows are less flexible than at a quiet one. A plan that assumes you can leave whenever you like may find that flexibility is not there. It is also why keeping the aircraft overnight can cost more here than elsewhere. Some operators prefer to fly the aircraft out after dropping you off, rather than leave it parked.',
      'Mumbai is well placed for flights along the west coast and into central India. Many of these are short enough that a turboprop is a real option, not just a jet. On a flight of under an hour from Mumbai, a turboprop often arrives within minutes of a jet for much less money.',
      'Helicopter charter in Mumbai is the usual way to reach places with no runway, such as coastal sites, project locations and event venues. The same site checks apply as anywhere else. The approach path, surface, permission and crowd control must all be confirmed before a date is fixed.',
    ],
    charterNotes: [
      'Slots and ground space: these limit you more than aircraft availability does',
      'Departure times: less flexible than at a quiet airfield',
      'Parking: can be costly, so flying the aircraft out is sometimes better than leaving it parked',
      'Short west-coast and central flights: often favour a turboprop over a jet',
      'Onward legs to places without runways: need a helicopter and a confirmed landing site',
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter'],
    faqs: [
      {
        question: 'Why is private jet charter timing less flexible in Mumbai?',
        answer:
          'Mumbai’s main airport is heavily used, so departure and arrival windows and ground space are tighter than at quieter airfields.',
      },
      {
        question: 'Is a jet or a turboprop better for a charter from Mumbai?',
        answer:
          'On flights under about an hour, which covers much of the west coast and central India, a turboprop usually arrives within minutes of a jet for considerably less, so the destination decides, not preference.',
      },
      {
        question: 'Can I book a helicopter charter in Mumbai to a coastal site?',
        answer:
          'Yes, as long as the landing site has a clear approach, a suitable surface, controlled surroundings and the needed permission, all confirmed during planning rather than on the day.',
      },
    ],
    related: [
      {
        label: 'Private Charter',
        href: '/private-charter',
        description: 'Hiring a whole aircraft',
      },
      {
        label: 'Aircraft Charter',
        href: '/private-charter/aircraft-charter',
        description: 'Turboprops on short flights',
      },
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'Reaching sites without runways',
      },
      { label: 'Charter Pricing', href: '/pricing', description: 'What sets the cost' },
    ],
    canonical: '/destinations/mumbai',
  },
  {
    slug: 'bengaluru',
    city: 'Bengaluru',
    matchCity: 'Bengaluru',
    title: 'Private Jet Charter in Bengaluru',
    summary:
      'Private jet charter in Bengaluru flies from Kempegowda International Airport, north of the city at about 3,000 ft, with a runway long enough for any jet.',
    body: [
      'Private jet charter in Bengaluru almost always means Kempegowda International Airport (BLR). It sits at Devanahalli, north of the city, so allow for the drive when you plan the day. Its longest runway is over 13,000 ft, which rules out no business aircraft.',
      'The airport is about 3,000 ft above sea level, higher than India’s other metro airports. On a hot afternoon, thinner air means an aircraft needs more runway and may carry a little less. The operator accounts for this. It rarely changes the trip, but it is why a quote can mention weight limits.',
      'Bengaluru’s older airfields, HAL Airport and Jakkur, are recorded as not operational in our airport list. So a charter is planned from Kempegowda unless the operator confirms otherwise for your date.',
      'For places within about 300 km that have no runway, such as estates, resorts or project sites, a helicopter is the usual answer. The landing site and permission are checked before the date is fixed.',
    ],
    charterNotes: [
      'Airport: Kempegowda International (BLR), north of the city at Devanahalli',
      'Altitude: about 3,000 ft, so hot-day performance is lower than at sea level',
      'Runway: over 13,000 ft, long enough for any business jet',
      'Older airfields: HAL and Jakkur are recorded as not operational',
      'No runway at your destination: a helicopter, once the site is approved',
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter'],
    faqs: [
      {
        question: 'Which airport does private jet charter in Bengaluru use?',
        answer:
          'Private jet charter in Bengaluru uses Kempegowda International Airport (BLR) at Devanahalli, because the city’s older airfields are recorded as not operational.',
      },
      {
        question: 'Does Bengaluru’s altitude affect a private jet?',
        answer:
          'A little: Kempegowda sits at about 3,000 ft, so on a hot day an aircraft needs more runway and may carry slightly less, which the operator plans for.',
      },
      {
        question: 'Can I charter a helicopter from Bengaluru?',
        answer:
          'Yes, for trips of up to about 300 km to places without a runway, once the landing site and permission are confirmed.',
      },
    ],
    related: [
      {
        label: 'Delhi to Bengaluru',
        href: '/routes/delhi-to-bengaluru',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Mumbai to Bengaluru',
        href: '/routes/mumbai-to-bengaluru',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Bengaluru to Goa',
        href: '/routes/bengaluru-to-goa',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'Reaching places without runways',
      },
    ],
    canonical: '/destinations/bengaluru',
  },
  {
    slug: 'hyderabad',
    city: 'Hyderabad',
    matchCity: 'Hyderabad',
    title: 'Private Jet Charter in Hyderabad',
    summary:
      'Private jet charter in Hyderabad can use Rajiv Gandhi International Airport, with one of India’s longest runways, or the older Begumpet Airport in the city.',
    body: [
      'Private jet charter in Hyderabad has two airports to choose from, which few Indian cities do. Rajiv Gandhi International (HYD) at Shamshabad is the main airport. Its longest runway is nearly 14,000 ft, one of the longest in India, so no business aircraft is limited by it.',
      'Begumpet Airport (BPM), the city’s older airport, is also recorded as operational. It is much closer to the centre. Whether your aircraft and your date can use it depends on the operator and the airport’s hours, so it is confirmed during planning rather than assumed.',
      'Hyderabad sits in the middle of the Deccan, so Mumbai, Bengaluru and Chennai are all short-to-medium flights. Delhi is within easy reach of a light jet. That central position makes same-day return trips practical to most of south and west India.',
    ],
    charterNotes: [
      'Two airports: Rajiv Gandhi International (HYD) and Begumpet (BPM)',
      'Runway at HYD: nearly 14,000 ft, one of the longest in India',
      'Begumpet: closer to the city, used when the operator confirms it for your date',
      'Central location: short flights to Mumbai, Bengaluru and Chennai',
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter'],
    faqs: [
      {
        question: 'Which airport is used for private jet charter in Hyderabad?',
        answer:
          'Private jet charter in Hyderabad usually uses Rajiv Gandhi International Airport (HYD), and Begumpet Airport (BPM) is an option when the operator confirms it for your aircraft and date.',
      },
      {
        question: 'How long is a private jet flight from Hyderabad to Delhi?',
        answer:
          'Roughly 2 to 2½ hours by business jet, including taxi, climb and descent, based on the straight-line distance of about 1,270 km.',
      },
      {
        question: 'Can I fly a same-day return from Hyderabad by private jet?',
        answer:
          'Yes, for most cities in south and west India, because Hyderabad’s central position keeps the flights short enough to fit a working day.',
      },
    ],
    related: [
      {
        label: 'Delhi to Hyderabad',
        href: '/routes/delhi-to-hyderabad',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Mumbai to Hyderabad',
        href: '/routes/mumbai-to-hyderabad',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Private Jet Charter',
        href: '/private-charter/private-jet-charter',
        description: 'Choosing the right jet',
      },
      { label: 'Charter Pricing', href: '/pricing', description: 'What makes up the price' },
    ],
    canonical: '/destinations/hyderabad',
  },
  {
    slug: 'chennai',
    city: 'Chennai',
    matchCity: 'Chennai',
    title: 'Private Jet Charter in Chennai',
    summary:
      'Private jet charter in Chennai flies from Chennai International Airport, near sea level with a 12,000 ft runway. Plan around the monsoon season.',
    body: [
      'Private jet charter in Chennai flies from Chennai International Airport (MAA). It is almost at sea level and its longest runway is about 12,000 ft, so aircraft perform at their best and no business jet is limited by the runway.',
      'Chennai gets most of its rain from the northeast monsoon, roughly October to December, when heavy rain and cyclones can close the airport for a time. If your trip falls in those months, keep the plan flexible.',
      'Delhi is one of the longest domestic charter flights from Chennai, at about 1,760 km in a straight line. A midsize or larger jet is the comfortable choice for a full cabin on that trip. Bengaluru and Hyderabad are short flights.',
    ],
    charterNotes: [
      'Airport: Chennai International (MAA), near sea level',
      'Runway: about 12,000 ft',
      'Weather: the northeast monsoon, roughly October to December, is the season to plan around',
      'Delhi: about 1,760 km, so a midsize or larger jet suits a full cabin',
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter'],
    faqs: [
      {
        question: 'When is the best time to charter a private jet from Chennai?',
        answer:
          'Any time of year, but the northeast monsoon, roughly October to December, brings heavy rain and cyclones that can delay flights, so keep plans flexible then.',
      },
      {
        question: 'How long is a private jet flight from Chennai to Delhi?',
        answer:
          'Roughly 2 hours 40 minutes to 3 hours by business jet, including taxi, climb and descent, for a straight-line distance of about 1,760 km.',
      },
      {
        question: 'Which jet is best from Chennai to Delhi?',
        answer:
          'Most light jets can fly it nonstop, but a midsize or larger jet is more comfortable for a full cabin on a flight of close to three hours.',
      },
    ],
    related: [
      {
        label: 'Delhi to Chennai',
        href: '/routes/delhi-to-chennai',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Private Jets',
        href: '/aircraft/private-jets',
        description: 'Compare jets by size',
      },
      { label: 'Charter Pricing', href: '/pricing', description: 'What makes up the price' },
    ],
    canonical: '/destinations/chennai',
  },
  {
    slug: 'kolkata',
    city: 'Kolkata',
    matchCity: 'Kolkata',
    title: 'Private Jet Charter in Kolkata',
    summary:
      'Private jet charter in Kolkata flies from Netaji Subhas Chandra Bose International Airport, near sea level, with a runway of almost 12,000 ft.',
    body: [
      'Private jet charter in Kolkata flies from Netaji Subhas Chandra Bose International Airport (CCU). It is almost at sea level, and its longest runway is nearly 12,000 ft, so aircraft perform well even in summer heat.',
      'Kolkata is the natural base for charter into east and north-east India, where many towns have short runways or none. Turboprops and helicopters come into their own on those trips.',
      'The small Behala Airport is also recorded in the city, but business charter is normally planned from the main airport.',
      'Pre-monsoon thunderstorms in spring and heavy monsoon rain later can cause delays, so timing matters here in the wet months.',
    ],
    charterNotes: [
      'Airport: Netaji Subhas Chandra Bose International (CCU), near sea level',
      'Runway: nearly 12,000 ft',
      'East and north-east India: turboprops and helicopters suit short or missing runways',
      'Weather: spring storms and the monsoon can delay flights',
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter'],
    faqs: [
      {
        question: 'Which airport is used for private jet charter in Kolkata?',
        answer:
          'Private jet charter in Kolkata uses Netaji Subhas Chandra Bose International Airport (CCU), which is near sea level with a runway of almost 12,000 ft.',
      },
      {
        question: 'How long is a private jet flight from Kolkata to Delhi?',
        answer:
          'Roughly 2 hours 5 minutes by business jet, including taxi, climb and descent, for a straight-line distance of about 1,310 km.',
      },
      {
        question: 'Can I charter a plane from Kolkata to the north-east?',
        answer:
          'Yes; turboprops suit the shorter runways found across the north-east, and a helicopter reaches places with no runway once the site is approved.',
      },
    ],
    related: [
      {
        label: 'Delhi to Kolkata',
        href: '/routes/delhi-to-kolkata',
        description: 'Distance, time and aircraft',
      },
      { label: 'Turboprops', href: '/aircraft/turboprops', description: 'For short runways' },
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'Places without runways',
      },
    ],
    canonical: '/destinations/kolkata',
  },
  {
    slug: 'goa',
    city: 'Goa',
    matchCity: 'Goa',
    icaos: ['VOGO', 'VOGA'],
    title: 'Private Jet Charter to Goa',
    summary:
      'Private jet charter to Goa lands at Dabolim (GOI) in central Goa or Manohar International (GOX) at Mopa in the north. Pick the one nearer your stay.',
    body: [
      'Private jet charter to Goa has a choice most destinations do not: two airports. Dabolim (GOI) is in the middle of the state, near Vasco da Gama. Manohar International (GOX) is at Mopa in north Goa. Both have runways of over 11,000 ft, long enough for any business jet.',
      'Choose by where you are staying. For the northern beaches, Mopa is closer. For the south and central coast, Dabolim usually is. A shorter drive on arrival often matters more than a few minutes in the air.',
      'Dabolim is a naval airfield that also handles civil flights, so its hours and parking can be more limited than at a civil airport. The operator confirms the slot for your date.',
      'Goa is busiest in the winter holiday season, when charter demand and airport slots are at their tightest. Book early for Christmas and New Year.',
    ],
    charterNotes: [
      'Two airports: Dabolim (GOI) in the centre and Manohar International (GOX) at Mopa in the north',
      'Runways: both over 11,000 ft',
      'Choose by your stay: north for Mopa, south and centre for Dabolim',
      'Dabolim: a naval airfield with civil flights, so slots can be limited',
      'Peak season: winter holidays, so book early',
    ],
    suitableCategories: ['private-jet', 'turboprop'],
    faqs: [
      {
        question: 'Which airport should I fly into for a private jet to Goa?',
        answer:
          'Fly into Manohar International (GOX) at Mopa for north Goa and Dabolim (GOI) for central and south Goa, because both take business jets and the drive after landing is what differs.',
      },
      {
        question: 'How long is a private jet flight from Mumbai to Goa?',
        answer:
          'About 1 hour by business jet, including taxi, climb and descent, for a straight-line distance of about 425 km to Dabolim.',
      },
      {
        question: 'When should I book a private jet to Goa?',
        answer:
          'Early for the winter holiday season, especially Christmas and New Year, when demand and airport slots are at their tightest.',
      },
    ],
    related: [
      {
        label: 'Delhi to Goa',
        href: '/routes/delhi-to-goa',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Mumbai to Goa',
        href: '/routes/mumbai-to-goa',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Bengaluru to Goa',
        href: '/routes/bengaluru-to-goa',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Empty Leg Flights',
        href: '/empty-leg-charter',
        description: 'One-way repositioning flights',
      },
    ],
    canonical: '/destinations/goa',
  },
  {
    slug: 'jaipur',
    city: 'Jaipur',
    matchCity: 'Jaipur',
    title: 'Private Jet & Helicopter Charter in Jaipur',
    summary:
      'Private jet charter in Jaipur flies from Jaipur International Airport, about 230 km from Delhi, close enough that a helicopter is a real alternative to a jet.',
    body: [
      'Private jet charter in Jaipur flies from Jaipur International Airport (JAI). Its longest runway is over 9,000 ft, enough for business jets and turboprops.',
      'Jaipur is only about 230 km from Delhi in a straight line. On a trip that short, a jet saves little over a turboprop. A helicopter can fly directly to a palace hotel or venue with a suitable landing site, which removes the drive at both ends.',
      'Jaipur is a leading city for weddings and large events. In the wedding season, aircraft and airport slots book up early, and a helicopter arrival needs its site and permission confirmed well ahead.',
    ],
    charterNotes: [
      'Airport: Jaipur International (JAI), runway over 9,000 ft',
      'From Delhi: about 230 km, short enough for a helicopter',
      'Venues: a helicopter can land at a suitable site once it is approved',
      'Wedding season: book aircraft and confirm landing sites early',
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter'],
    faqs: [
      {
        question: 'Can I take a helicopter from Delhi to Jaipur?',
        answer:
          'Yes; at about 230 km, Delhi to Jaipur is within easy helicopter range, and it can land at a suitable site near your venue once the site and permission are confirmed.',
      },
      {
        question: 'How long is a private jet flight from Delhi to Jaipur?',
        answer:
          'About 45 minutes by business jet, including taxi, climb and descent, so a turboprop is often just as practical.',
      },
      {
        question: 'Can a helicopter land at a wedding venue in Jaipur?',
        answer:
          'It can if the venue has a suitable open area with a clear approach, and the site and permission are approved before the date.',
      },
    ],
    related: [
      {
        label: 'Delhi to Jaipur',
        href: '/routes/delhi-to-jaipur',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Wedding Helicopter',
        href: '/helicopter-charter/wedding-helicopter',
        description: 'Arrivals and guest transfers',
      },
      {
        label: 'Helicopter Charter',
        href: '/helicopter-charter',
        description: 'How helicopter hire works',
      },
    ],
    canonical: '/destinations/jaipur',
  },
  {
    slug: 'udaipur',
    city: 'Udaipur',
    matchCity: 'Udaipur',
    title: 'Private Jet Charter to Udaipur',
    summary:
      'Private jet charter to Udaipur lands at Maharana Pratap Airport, whose 7,500 ft runway suits business jets and turboprops but can rule out the largest aircraft.',
    body: [
      'Private jet charter to Udaipur lands at Maharana Pratap Airport (UDR), north-east of the city. Its runway is about 7,500 ft, shorter than at the metro airports. Business jets and turboprops use it, but the largest aircraft may be limited or ruled out, which matters for big wedding groups.',
      'Udaipur is one of India’s best-known wedding destinations. Guests often arrive on the same day from several cities, so airport parking and slots can run short in the season. Plan the aircraft and the arrival times together.',
      'Delhi and Mumbai are both a little over 1 hour away by business jet. For groups too big for one jet, two smaller aircraft can be simpler than one large one at this airport.',
    ],
    charterNotes: [
      'Airport: Maharana Pratap (UDR), runway about 7,500 ft',
      'Aircraft size: business jets and turboprops fit; the largest aircraft may not',
      'Wedding season: parking and slots fill up, so plan arrivals together',
      'From Delhi or Mumbai: a little over 1 hour by business jet',
    ],
    suitableCategories: ['private-jet', 'turboprop', 'helicopter'],
    faqs: [
      {
        question: 'Can a large jet land in Udaipur?',
        answer:
          'Business jets and turboprops use Udaipur’s 7,500 ft runway, but the largest aircraft may be limited or ruled out, so the operator confirms the aircraft for your load.',
      },
      {
        question: 'How long is a private jet flight from Delhi to Udaipur?',
        answer:
          'About 1 hour by business jet, including taxi, climb and descent, for a straight-line distance of about 540 km.',
      },
      {
        question: 'How do I fly wedding guests to Udaipur by charter?',
        answer:
          'Plan the aircraft and arrival times together, and consider two smaller aircraft instead of one large one, because the runway and parking are limited in the season.',
      },
    ],
    related: [
      {
        label: 'Delhi to Udaipur',
        href: '/routes/delhi-to-udaipur',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Mumbai to Udaipur',
        href: '/routes/mumbai-to-udaipur',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Wedding Helicopter',
        href: '/helicopter-charter/wedding-helicopter',
        description: 'Arrivals and guest transfers',
      },
    ],
    canonical: '/destinations/udaipur',
  },
  {
    slug: 'dehradun',
    city: 'Dehradun',
    matchCity: 'Dehradun',
    title: 'Private Jet & Helicopter Charter in Dehradun',
    summary:
      'Charter to Dehradun lands at Jolly Grant Airport, the gateway to Rishikesh, Mussoorie and the Char Dham; helicopters fly on to places with no runway.',
    body: [
      'Charter to Dehradun lands at Jolly Grant Airport (DED), between Dehradun and Rishikesh. Its runway is about 7,000 ft, which suits business jets and turboprops.',
      'For most visitors Dehradun is a gateway, not the destination. Mussoorie, Rishikesh and the Garhwal hills are a short drive or a helicopter hop away. For the Char Dham and other high sites, a helicopter continues from the valley, because there is no runway where you are going.',
      'From Delhi, Dehradun is only about 210 km in a straight line. A helicopter can fly the whole way from Delhi, so a trip to the hills can be one aircraft instead of two.',
      'Mountain weather decides helicopter flying here. Low cloud and rain in the monsoon months can stop flights for hours or days, so leave slack in the plan.',
    ],
    charterNotes: [
      'Airport: Jolly Grant (DED), runway about 7,000 ft',
      'Gateway: to Rishikesh, Mussoorie and the Char Dham',
      'From Delhi: about 210 km, so a helicopter can fly the whole way',
      'Hills: helicopters continue to places with no runway',
      'Weather: the monsoon can stop helicopter flights, so leave slack',
    ],
    suitableCategories: ['helicopter', 'private-jet', 'turboprop'],
    faqs: [
      {
        question: 'Can I fly from Delhi to Dehradun by helicopter?',
        answer:
          'Yes; at about 210 km, Delhi to Dehradun is well within helicopter range, and the same helicopter can continue into the hills.',
      },
      {
        question: 'Which airport serves Dehradun and Rishikesh?',
        answer:
          'Jolly Grant Airport (DED), which lies between Dehradun and Rishikesh and takes business jets and turboprops.',
      },
      {
        question: 'Can I charter a helicopter from Dehradun for the Char Dham?',
        answer:
          'Yes; Dehradun is the usual starting point for a private Char Dham helicopter charter, subject to weather and altitude limits at each helipad.',
      },
    ],
    related: [
      {
        label: 'Delhi to Dehradun',
        href: '/routes/delhi-to-dehradun',
        description: 'Distance, time and aircraft',
      },
      {
        label: 'Char Dham Helicopter Charter',
        href: '/chardham',
        description: 'Private helicopter to the dhams',
      },
      {
        label: 'Kedarnath Helicopter Charter',
        href: '/chardham/kedarnath-helicopter',
        description: 'Private helicopter to Kedarnath',
      },
    ],
    canonical: '/destinations/dehradun',
  },
];

export function destinationBySlug(slug: string): DestinationPage | undefined {
  return DESTINATION_PAGES.find((d) => d.slug === slug);
}

/** Facilities recorded for a city, straight from the sourced airport dataset. */
export function aerodromesFor(page: DestinationPage): readonly AirportRecord[] {
  if (page.icaos) return AIRPORTS.filter((a) => a.icao && page.icaos?.includes(a.icao));
  return aerodromesForCity(page.matchCity);
}

export function aerodromesForCity(city: string): readonly AirportRecord[] {
  const needle = city.toLowerCase();
  return AIRPORTS.filter((a) => a.city.toLowerCase().includes(needle));
}

export { AIRPORT_SOURCE };
