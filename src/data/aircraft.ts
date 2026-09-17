import type { AircraftCategory, MissionType } from '@/types/aircraft';
import type { Path } from '@/types/common';
import { GENERATED_AIRCRAFT, type GeneratedAircraft } from './aircraft.generated';

/**
 * The editorial layer over the generated specification data.
 *
 * Specifications come from `aircraft.generated.ts` with their provenance
 * attached. This file adds what a spec sheet cannot: why a given type suits a
 * given mission, and where it stops being the right answer.
 *
 * `publish: true` gives an aircraft its own URL. It is set only where there is
 * something type-specific worth a page — a real engineering or operational
 * reason someone would choose it. Every other type appears in the comparison
 * table on its category hub, which is genuinely useful, rather than as one more
 * near-identical page. Fifty-two templated spec pages would be exactly the
 * programmatic pattern this rebuild exists to remove.
 */
export interface CuratedAircraft {
  readonly slug: string;
  readonly publish: boolean;
  /** Overrides the source classification where the source is wrong. */
  readonly category?: AircraftCategory;
  readonly manufacturer?: string;
  /** Answer-first sentence. Quotable on its own. */
  readonly summary: string;
  /** Type-specific narrative. Only for published aircraft. */
  readonly narrative?: readonly string[];
  readonly missions: readonly MissionType[];
  readonly idealFor: readonly string[];
  /** Where this type stops being the right choice. Honest, not marketing. */
  readonly limitations?: readonly string[];
}

export const CURATED: readonly CuratedAircraft[] = [
  // ------------------------------------------------------------- helicopters
  {
    slug: 'airbus-h125',
    publish: true,
    manufacturer: 'Airbus Helicopters',
    summary:
      'The Airbus H125 is a single-engine helicopter chosen for high-altitude and hot-and-high work, which is why it dominates Himalayan and mountain operations in India.',
    narrative: [
      'Density altitude is the constraint that decides what can fly into mountain terrain. As air thins with altitude and warms through the morning, both rotor lift and engine power fall away — and they fall away together, which is what makes a hot afternoon at a high helipad harder than a cold dawn at the same site. The H125 is built around that problem rather than around cruise comfort, and its reputation in the Himalaya comes from margin retained where other types have spent theirs.',
      'That focus has consequences. It is a single-engine aircraft, so the operating rules and the risk profile differ from a twin, and its cabin is functional rather than executive. For a corporate transfer between two city helipads at sea level, a light twin is the more comfortable and often the more appropriate answer.',
      'In practice the H125 is the type that appears on mountain missions, survey and utility work, and pilgrimage routing into Uttarakhand — anywhere the limiting factor is the site rather than the sector length.',
    ],
    missions: ['pilgrimage', 'regional', 'short-field', 'film-and-aerial'],
    idealFor: [
      'High-altitude helipads and mountain routing',
      'Hot-and-high conditions where payload margin matters',
      'Survey, utility and aerial work',
      'Short sectors into constrained sites',
    ],
    limitations: [
      'Single-engine — the operating rules differ from a twin',
      'Utility cabin rather than an executive interior',
      'Shorter range than most twins in the class',
    ],
  },
  {
    slug: 'airbus-h145',
    publish: true,
    manufacturer: 'Airbus Helicopters',
    summary:
      'The Airbus H145 is a light twin-engine helicopter with a flat-floor cabin, used across VIP transport, medical missions and group movement because the same airframe does all three.',
    narrative: [
      'The flat floor is the design decision everything else follows from. A cabin without a transmission tunnel or stepped floor can be reconfigured — executive seating one day, a stretcher and medical equipment the next, freight the day after. That versatility is why the type turns up in fleets that cannot justify a separate aircraft per mission.',
      'Twin engines change the operational envelope rather than just the safety marketing: they widen what is permissible over water, over built-up areas and at night, which matters more for corporate and medical work than for daylight sightseeing. The shrouded tail rotor also makes it notably quieter on the ground, which is not a trivial point at a hospital helipad or a hotel in a residential area.',
      'It is a larger and more expensive aircraft to run than a single, and for a short daylight transfer between two easy sites that cost buys capability you will not use.',
    ],
    missions: ['corporate', 'vvip', 'medical', 'group', 'regional'],
    idealFor: [
      'Executive and VVIP transfers where cabin quality matters',
      'Medical missions and equipment-carrying configurations',
      'Larger parties than a light single will take',
      'Noise-sensitive helipads',
    ],
    limitations: [
      'Higher operating cost than a single-engine helicopter',
      'Range is modest — it is a transfer aircraft, not a touring one',
    ],
  },
  {
    slug: 'textron-bell-407',
    publish: true,
    manufacturer: 'Bell',
    summary:
      'The Bell 407 is a single-engine helicopter with a four-blade rotor, widely used for corporate transfers and utility work because it balances cabin comfort against running cost.',
    narrative: [
      'The four-blade main rotor is what separates the 407 from earlier singles in the family: it reduces vibration noticeably, and vibration is what makes an hour in a light helicopter tiring. For a passenger, that is the difference between arriving ready to work and arriving ready to sit down.',
      'It occupies a useful middle position. Cheaper to operate than a light twin, more comfortable and more capable than the smallest singles, and common enough in operator fleets that availability tends to be better than for rarer types — which, on a short-notice charter, is often the deciding factor.',
      'It remains a single-engine aircraft, so the same operating considerations apply as for any single, and it does not carry a large party.',
    ],
    missions: ['corporate', 'leisure', 'regional', 'film-and-aerial'],
    idealFor: [
      'Corporate day trips and site visits',
      'Cost-sensitive transfers where twin capability is not required',
      'Aerial filming and survey',
    ],
    limitations: ['Single-engine', 'Limited cabin volume for baggage-heavy trips'],
  },
  {
    slug: 'agusta-109-grand',
    publish: true,
    manufacturer: 'Leonardo',
    summary:
      'The Agusta 109 Grand is a fast twin-engine light helicopter with retractable gear, chosen where arrival presentation and speed matter as much as the flight itself.',
    narrative: [
      'Retractable landing gear on a helicopter exists for one reason: cruise speed. Cleaning up the airframe in the cruise is what gives this family its pace relative to other light twins, and on a 45-minute sector that difference is real rather than theoretical.',
      'The cabin is the other half of the argument. It is finished to an executive standard rather than a utility one, and for corporate and VVIP movement the aircraft is part of the impression the arrival makes.',
      'The trade is complexity and cost. Retractable gear is another system to maintain, and a fast light twin is not the aircraft to send into a rough unprepared site.',
    ],
    missions: ['vvip', 'corporate', 'wedding', 'leisure'],
    idealFor: [
      'VVIP and executive movement',
      'Time-critical intercity transfers by helicopter',
      'Arrivals where presentation matters',
    ],
    limitations: [
      'Not suited to rough or unprepared landing sites',
      'Higher operating cost than a comparable single',
    ],
  },
  {
    slug: 'textron-bell-429',
    publish: true,
    manufacturer: 'Bell',
    summary:
      'The Bell 429 is a light twin-engine helicopter designed around cabin access and configurability, used for executive transport and medical work.',
    narrative: [
      'Large side doors and an optional rear clamshell are the point of this aircraft. Loading a stretcher, equipment or a passenger with limited mobility through a small side door is slow and undignified; the 429 was designed so that it is neither.',
      'As a modern light twin it brings the wider operating envelope twins allow, with a quieter and smoother cabin than older types in the class. It suits operators who need one airframe to cover executive transfers during the week and secondary roles at short notice.',
      'It is a newer and less common type in India than the Bell 407 or the AW109 family, so availability on short notice can be tighter.',
    ],
    missions: ['corporate', 'vvip', 'medical', 'regional'],
    idealFor: [
      'Executive transfers with a genuinely comfortable cabin',
      'Medical and equipment-carrying missions',
      'Passengers needing step-in access',
    ],
    limitations: ['Less common in India — availability can be tighter at short notice'],
  },

  // -------------------------------------------------------------- turboprops
  {
    slug: 'super-king-air-b200',
    publish: true,
    manufacturer: 'Beechcraft',
    summary:
      'The King Air B200 is a twin-turboprop that trades jet cruise speed for the ability to use short and lightly-equipped runways, which is what opens up regional India.',
    narrative: [
      'Most of India’s airfields are not metro airports. Runway length, surface, and available approach aids rule out a lot of jets at exactly the destinations where charter is most useful — a plant, a project site, a district town with a runway and little else. A turboprop in this class is frequently the only aircraft that can land there at all.',
      'Turboprops are also more efficient than jets on short sectors, because a jet spends much of a 250-mile trip climbing and descending and never settles into the cruise where it is efficient. Below roughly an hour of flying, the turboprop often arrives at a similar time for meaningfully less money.',
      'On longer sectors the argument inverts. Above two hours the jet’s speed advantage compounds, and the cabin — unpressurised noise levels are not the issue on a King Air, but cabin height and width are — starts to matter.',
    ],
    missions: ['corporate', 'regional', 'short-field', 'medical'],
    idealFor: [
      'Regional sectors under roughly two hours',
      'Airfields with short runways or limited facilities',
      'Cost-sensitive corporate travel to secondary destinations',
    ],
    limitations: [
      'Slower than a jet — the gap compounds on long sectors',
      'Smaller cabin than a comparable light jet',
    ],
  },
  {
    slug: 'pilatus-pc-12',
    publish: true,
    category: 'turboprop',
    manufacturer: 'Pilatus',
    summary:
      'The Pilatus PC-12 is a single-engine turboprop with a cargo door and short-field capability, used where the destination is difficult and the payload is awkward.',
    narrative: [
      'The large rear cargo door is unusual on a passenger aircraft and it defines what the type is for. Equipment, freight, medical loads and oversized baggage go in through it without being fed through a narrow passenger door — so the same aircraft that moves six people can move something that will not fit in a jet at all.',
      'Being a single-engine turboprop makes it cheaper to run than a twin of similar capability, and its short-field performance opens destinations that rule out most alternatives. That combination has made it popular for remote-area operations worldwide.',
      'Single-engine operation carries its own regulatory and operational considerations, particularly at night and over inhospitable terrain, and those are worth discussing before the aircraft is chosen rather than after.',
    ],
    missions: ['regional', 'short-field', 'medical', 'corporate'],
    idealFor: [
      'Remote or short airfields',
      'Awkward or oversized loads alongside passengers',
      'Cost-efficient regional sectors',
    ],
    limitations: [
      'Single-engine — specific considerations at night and over difficult terrain',
      'Slower and lower-flying than a jet',
    ],
  },

  // ------------------------------------------------------------ private jets
  {
    slug: 'cessna-citation-cj2',
    publish: true,
    manufacturer: 'Cessna',
    summary:
      'The Citation CJ2 is a light jet suited to short and medium sectors with small parties, and is often the least expensive way to put a jet on a regional route.',
    narrative: [
      'Light jets earn their place on trips of roughly one to three hours with four to six people. Below that a turboprop is usually cheaper for a similar arrival time; above it, the cabin becomes the limiting factor long before the fuel does.',
      'The CJ family’s specific advantage is approval for single-pilot operation, which reduces crew cost and, more practically, widens the pool of available aircraft and crews. Most charters still fly two crew, but the certification shapes the economics of the whole class.',
      'It is a small cabin. Standing is not possible, and a party of six with substantial baggage will find it tight — which is an argument for the midsize class rather than a fault in this one.',
    ],
    missions: ['corporate', 'leisure', 'regional'],
    idealFor: [
      'Four to six passengers on one-to-three-hour sectors',
      'Cost-efficient entry into jet charter',
      'Regional business travel with light baggage',
    ],
    limitations: ['No standing cabin height', 'Limited baggage volume'],
  },
  {
    slug: 'cessna-citation-xls',
    publish: true,
    manufacturer: 'Cessna',
    summary:
      'The Citation XLS is a midsize jet with a stand-up cabin and short-field ability unusual for its size, which is why it is one of the most-chartered business jets in the world.',
    narrative: [
      'The XLS solves a specific problem: passengers want a stand-up cabin, but a stand-up cabin usually comes with runway requirements that rule out smaller airports. This type keeps much of the field performance of a light jet while giving a cabin people can move around in.',
      'For a working flight of two to three hours — a board travelling together, documents open, a conversation that needs to happen before landing — that combination is the reason the type is chartered as heavily as it is. High utilisation also means better availability than rarer aircraft.',
      'It is not a long-range aircraft. Sectors that cross several time zones belong to the large-cabin classes.',
    ],
    missions: ['corporate', 'leisure', 'group', 'regional'],
    idealFor: [
      'Six to eight passengers with a stand-up cabin',
      'Working flights of two to three hours',
      'Airports a larger jet cannot use',
    ],
    limitations: ['Not a long-range aircraft', 'Baggage is finite with a full cabin'],
  },
  {
    slug: 'dassault-falcon-2000',
    publish: true,
    manufacturer: 'Dassault Aviation',
    summary:
      'The Falcon 2000 is a large-cabin twin-engine jet built for long sectors with a full cabin, and is notably efficient for its size.',
    narrative: [
      'Most large-cabin jets in this range use three engines; the Falcon 2000 uses two, which is the main reason it burns less fuel than comparable aircraft over the same sector. Over a long flight that is a direct and visible cost difference.',
      'The cabin is the reason to choose the class at all: genuine standing height, room to work or rest properly, and a noise level that allows conversation without effort. On a flight long enough that the passengers will sleep or work through it, that stops being a luxury and becomes the purpose.',
      'It is a substantially more expensive aircraft to charter than a midsize jet, and for a 90-minute domestic sector that capability is money spent on capability nobody uses.',
    ],
    missions: ['corporate', 'vvip', 'leisure', 'group'],
    idealFor: [
      'Long domestic and regional international sectors',
      'Full parties who need to work or rest en route',
      'Trips where cabin comfort is the deciding factor',
    ],
    limitations: ['Materially higher cost than a midsize jet', 'More demanding runway requirements'],
  },
  {
    slug: 'global-6000',
    publish: true,
    manufacturer: 'Bombardier',
    summary:
      'The Global 6000 is an ultra-long-range jet with a cabin divided into distinct zones, built to fly intercontinental sectors without a fuel stop.',
    narrative: [
      'The point of this class is the sector it removes. A fuel stop costs an hour or more on the ground, plus handling, plus the crew duty it consumes — and on a schedule where the whole reason for chartering was time, that stop can undo the advantage. Aircraft in this class are specified to avoid it.',
      'The cabin is arranged in zones rather than as one space, so a working area, a dining area and a rest area can coexist without the aircraft feeling like a corridor. On a flight long enough for people to sleep, that separation is what makes arrival usable.',
      'This is the most expensive category of charter, and it is only rational when the sector genuinely demands it. For anything domestic within India, it is the wrong aircraft.',
    ],
    missions: ['corporate', 'vvip', 'group'],
    idealFor: [
      'Intercontinental sectors without a fuel stop',
      'Long flights where rest and work both need to happen',
      'Delegations travelling together over long distances',
    ],
    limitations: [
      'The highest charter cost of any category',
      'Unnecessary for domestic Indian sectors',
    ],
  },
];

const CURATED_BY_SLUG = new Map(CURATED.map((c) => [c.slug, c]));

export interface ResolvedAircraft extends GeneratedAircraft {
  readonly curated?: CuratedAircraft;
  readonly published: boolean;
  readonly href: Path;
}

/** Generated specs joined to the editorial layer. The one read path for pages. */
export const AIRCRAFT: readonly ResolvedAircraft[] = GENERATED_AIRCRAFT.map((generated) => {
  const curated = CURATED_BY_SLUG.get(generated.slug);
  return {
    ...generated,
    ...(curated?.category ? { category: curated.category } : {}),
    ...(curated ? { curated } : {}),
    published: curated?.publish === true,
    href: `/aircraft/${generated.slug}` as Path,
  };
});

export const PUBLISHED_AIRCRAFT: readonly ResolvedAircraft[] = AIRCRAFT.filter((a) => a.published);

export function aircraftBySlug(slug: string): ResolvedAircraft | undefined {
  return AIRCRAFT.find((a) => a.slug === slug);
}

export function aircraftByCategory(category: AircraftCategory): readonly ResolvedAircraft[] {
  return AIRCRAFT.filter((a) => a.category === category);
}

/** Format a spec range: equal bounds collapse, so "340-340" prints as "340". */
export function formatRange(
  range: { readonly min: number; readonly max: number } | null,
  unit = '',
): string | null {
  if (!range) return null;
  const value = range.min === range.max ? `${range.min}` : `${range.min}–${range.max}`;
  return unit ? `${value} ${unit}` : value;
}
