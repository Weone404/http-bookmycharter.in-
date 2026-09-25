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
      'The Airbus H125 is a single-engine helicopter built for high helipads in hot weather (hot-and-high flying), which is why it leads Himalayan and mountain work in India.',
    narrative: [
      'Thin air decides which helicopter can fly into the mountains. Pilots call this density altitude (how thin the air is, from height and heat together). As you go higher and the morning warms up, the rotor makes less lift and the engine makes less power. Both drop at the same time. So a high helipad on a hot afternoon is harder than the same helipad at a cold dawn. The H125 is designed around this problem, not around cruise comfort. Its Himalayan reputation comes from keeping spare performance where other types have run out.',
      'That design has trade-offs. It has one engine, so the operating rules and the risks differ from a twin-engine helicopter. Its cabin is practical, not executive. For a corporate transfer between two city helipads at sea level, a light twin is more comfortable and often the better choice.',
      'In practice, you will see the H125 on mountain flights, survey and utility work, and pilgrimage routes into Uttarakhand. It suits any trip where the landing site, not the distance, is the hard part.',
    ],
    missions: ['pilgrimage', 'regional', 'short-field', 'film-and-aerial'],
    idealFor: [
      'High-altitude helipads and mountain routes',
      'Hot-and-high conditions, where spare lifting power matters',
      'Survey, utility and aerial work',
      'Short hops into tight landing sites',
    ],
    limitations: [
      'Single engine, so the operating rules differ from a twin',
      'Practical utility cabin, not an executive interior',
      'Shorter range than most twins in its class',
    ],
  },
  {
    slug: 'airbus-h145',
    publish: true,
    manufacturer: 'Airbus Helicopters',
    summary:
      'The Airbus H145 is a light twin-engine helicopter with a flat cabin floor, used for VIP travel, medical flights and group transfers because one aircraft can do all three.',
    narrative: [
      'The flat floor is the key design choice. With no raised tunnel or step in the floor, the cabin can be changed quickly. It can take executive seats one day, a stretcher and medical kit the next, and freight the day after. That is why operators who cannot keep a separate aircraft for each job often choose this type.',
      'Two engines do more than add a safety message. They widen where and when the helicopter may fly: over water, over built-up areas and at night. That matters more for corporate and medical work than for daytime sightseeing. The shrouded tail rotor (a tail rotor set inside a covered ring) also makes it much quieter on the ground. That helps at a hospital helipad or a hotel in a residential area.',
      'It is bigger and costs more to run than a single-engine helicopter. For a short daytime hop between two easy sites, you would pay for capability you will not use.',
    ],
    missions: ['corporate', 'vvip', 'medical', 'group', 'regional'],
    idealFor: [
      'Executive and VVIP transfers where cabin quality matters',
      'Medical flights and carrying equipment',
      'Groups larger than a light single-engine helicopter can take',
      'Helipads where noise is a concern',
    ],
    limitations: [
      'Costs more to run than a single-engine helicopter',
      'Modest range: it is built for transfers, not long tours',
    ],
  },
  {
    slug: 'textron-bell-407',
    publish: true,
    manufacturer: 'Bell',
    summary:
      'The Bell 407 is a single-engine helicopter with a four-blade rotor, widely used for corporate transfers and utility work because it balances cabin comfort with running cost.',
    narrative: [
      'Its four-blade main rotor sets the 407 apart from earlier single-engine models in the family. It cuts vibration noticeably, and vibration is what makes an hour in a light helicopter tiring. For you as a passenger, that means arriving ready to work rather than needing to sit down.',
      'It sits in a useful middle ground. It is cheaper to run than a light twin, and more comfortable and capable than the smallest singles. It is also common in operator fleets, so availability tends to be better than for rarer types. On a short-notice charter, that is often what decides the booking.',
      'It still has one engine, so the same operating rules apply as for any single. It does not carry a large group.',
    ],
    missions: ['corporate', 'leisure', 'regional', 'film-and-aerial'],
    idealFor: [
      'Corporate day trips and site visits',
      'Budget-conscious transfers that do not need a twin',
      'Aerial filming and survey',
    ],
    limitations: ['Single engine', 'Limited cabin space for trips with a lot of baggage'],
  },
  {
    slug: 'agusta-109-grand',
    publish: true,
    manufacturer: 'Leonardo',
    summary:
      'The Agusta 109 Grand is a fast twin-engine light helicopter with retractable wheels, chosen when speed and a polished arrival matter as much as the flight itself.',
    narrative: [
      'A helicopter has retractable landing gear (wheels that fold away in flight) for one reason: cruise speed. Tucking the wheels away in the cruise makes this family faster than other light twins. On a 45-minute flight, that difference is real, not just on paper.',
      'The cabin is the other reason to choose it. It is finished to an executive standard, not a utility one. For corporate and VVIP travel, the aircraft is part of the impression your arrival makes.',
      'The trade-off is complexity and cost. Retractable gear is one more system to maintain. A fast light twin is also not the aircraft to send into a rough, unprepared landing site.',
    ],
    missions: ['vvip', 'corporate', 'wedding', 'leisure'],
    idealFor: [
      'VVIP and executive travel',
      'Time-critical city-to-city transfers by helicopter',
      'Arrivals where presentation matters',
    ],
    limitations: [
      'Not suited to rough or unprepared landing sites',
      'Costs more to run than a similar single-engine helicopter',
    ],
  },
  {
    slug: 'textron-bell-429',
    publish: true,
    manufacturer: 'Bell',
    summary:
      'The Bell 429 is a light twin-engine helicopter designed for easy cabin access and flexible seating layouts, used for executive travel and medical flights.',
    narrative: [
      'Large side doors and optional rear clamshell doors (a pair that opens wide at the back) are the point of this aircraft. Loading a stretcher, equipment or a passenger with limited mobility through a small side door is slow and undignified. The 429 was designed so that it is neither.',
      'As a modern light twin, it can fly in the wider range of conditions that twins are allowed. Its cabin is quieter and smoother than older types in its class. It suits operators who need one aircraft for executive transfers during the week and other roles at short notice.',
      'It is newer and less common in India than the Bell 407 or the AW109 family. So availability at short notice can be tighter.',
    ],
    missions: ['corporate', 'vvip', 'medical', 'regional'],
    idealFor: [
      'Executive transfers in a truly comfortable cabin',
      'Medical flights and missions carrying equipment',
      'Passengers who need easy step-in access',
    ],
    limitations: ['Less common in India, so short-notice availability can be tighter'],
  },

  // -------------------------------------------------------------- turboprops
  {
    slug: 'super-king-air-b200',
    publish: true,
    manufacturer: 'Beechcraft',
    summary:
      'The King Air B200 is a twin-engine turboprop (a propeller plane with turbine engines) that gives up some jet speed but can use short, basic runways, which opens up regional India.',
    narrative: [
      'Most of India’s airfields are not big city airports. Runway length, surface and approach aids (equipment that guides a landing) rule out many jets. They rule them out at exactly the places where charter is most useful: a plant, a project site, or a district town with a runway and little else. A turboprop in this class is often the only aircraft that can land there at all.',
      'Turboprops also use fuel better than jets on short flights. On a 250-mile trip, a jet spends much of the time climbing and descending. It never settles into the cruise where it is efficient. On flights under roughly an hour, the turboprop often arrives at a similar time for much less money.',
      'On longer flights the picture flips. Above two hours, the jet’s speed saves more and more time. The cabin also starts to matter. Noise is not the issue on a King Air. Cabin height and width are.',
    ],
    missions: ['corporate', 'regional', 'short-field', 'medical'],
    idealFor: [
      'Regional flights under roughly two hours',
      'Airfields with short runways or basic facilities',
      'Budget-conscious corporate travel to smaller destinations',
    ],
    limitations: [
      'Slower than a jet, and the gap grows on long flights',
      'Smaller cabin than a similar light jet',
    ],
  },
  {
    slug: 'pilatus-pc-12',
    publish: true,
    category: 'turboprop',
    manufacturer: 'Pilatus',
    summary:
      'The Pilatus PC-12 is a single-engine turboprop with a large cargo door and short-runway ability, used when the destination is hard to reach and the load is awkward.',
    narrative: [
      'The large rear cargo door is unusual on a passenger aircraft, and it defines what the PC-12 is for. Equipment, freight, medical loads and oversized bags go straight in. Nothing has to be squeezed through a narrow passenger door. So the same aircraft that carries six people can also carry something that will not fit in a jet at all.',
      'With one engine, it costs less to run than a twin of similar ability. Its short-field performance (taking off and landing on short runways) opens destinations that rule out most other aircraft. That mix has made it popular for remote-area flying around the world.',
      'Flying on one engine has its own rules and operating considerations, especially at night and over difficult terrain. Discuss these before the aircraft is chosen, not after.',
    ],
    missions: ['regional', 'short-field', 'medical', 'corporate'],
    idealFor: [
      'Remote or short airfields',
      'Awkward or oversized loads alongside passengers',
      'Cost-efficient regional flights',
    ],
    limitations: [
      'Single engine, with specific considerations at night and over difficult terrain',
      'Slower than a jet, and flies lower',
    ],
  },

  // ------------------------------------------------------------ private jets
  {
    slug: 'cessna-citation-cj2',
    publish: true,
    manufacturer: 'Cessna',
    summary:
      'The Citation CJ2 is a light jet for short and medium flights with a small group, and is often the cheapest way to fly a jet on a regional route.',
    narrative: [
      'A light jet makes sense for trips of roughly one to three hours with four to six people. On shorter trips, a turboprop is usually cheaper and arrives at a similar time. On longer ones, the small cabin becomes the problem long before fuel does.',
      'The CJ family’s special advantage is approval for single-pilot flying. That lowers crew cost. More usefully, it widens the pool of aircraft and crews available. Most charters still fly with two crew, but this approval shapes the cost of the whole class.',
      'It is a small cabin, and you cannot stand up inside. A group of six with a lot of baggage will find it tight. That is a reason to move up to a midsize jet, not a fault in this one.',
    ],
    missions: ['corporate', 'leisure', 'regional'],
    idealFor: [
      'Four to six passengers on flights of one to three hours',
      'A cost-efficient first step into jet charter',
      'Regional business travel with light baggage',
    ],
    limitations: ['No room to stand up in the cabin', 'Limited baggage space'],
  },
  {
    slug: 'cessna-citation-xls',
    publish: true,
    manufacturer: 'Cessna',
    summary:
      'The Citation XLS is a midsize jet with a stand-up cabin and unusual short-runway ability for its size, which is why it is one of the most-chartered business jets in the world.',
    narrative: [
      'The XLS solves a common problem. Passengers want a cabin they can stand up in. But a stand-up cabin usually needs a longer runway, which rules out smaller airports. This jet keeps much of a light jet’s runway performance while giving you a cabin you can move around in.',
      'Think of a working flight of two to three hours. A board travels together, documents are open, and a conversation needs to happen before landing. That mix is why the XLS is chartered so often. Heavy use also means better availability than rarer aircraft.',
      'It is not a long-range aircraft. Flights that cross several time zones need a large-cabin jet.',
    ],
    missions: ['corporate', 'leisure', 'group', 'regional'],
    idealFor: [
      'Six to eight passengers in a stand-up cabin',
      'Working flights of two to three hours',
      'Airports a larger jet cannot use',
    ],
    limitations: ['Not a long-range aircraft', 'Baggage space is limited with a full cabin'],
  },
  {
    slug: 'dassault-falcon-2000',
    publish: true,
    manufacturer: 'Dassault Aviation',
    summary:
      'The Falcon 2000 is a large-cabin twin-engine jet built for long flights with a full cabin, and it is notably fuel-efficient for its size.',
    narrative: [
      'Most large-cabin jets in this range use three engines. The Falcon 2000 uses two. That is the main reason it burns less fuel than similar aircraft on the same flight. Over a long trip, that is a direct and visible cost difference.',
      'The cabin is the reason to choose this class. You get real standing height, room to work or rest properly, and a cabin quiet enough to talk easily. On a flight long enough that passengers will sleep or work, this is not a luxury. It is the purpose.',
      'It costs a lot more to charter than a midsize jet. On a 90-minute domestic flight, you pay for capability nobody uses.',
    ],
    missions: ['corporate', 'vvip', 'leisure', 'group'],
    idealFor: [
      'Long domestic and regional international flights',
      'Full groups who need to work or rest on board',
      'Trips where cabin comfort is the deciding factor',
    ],
    limitations: ['Costs much more than a midsize jet', 'Needs more runway than smaller jets'],
  },
  {
    slug: 'global-6000',
    publish: true,
    manufacturer: 'Bombardier',
    summary:
      'The Global 6000 is an ultra-long-range jet with a cabin split into separate zones, built to fly between continents without a fuel stop.',
    narrative: [
      'The point of this class is the stop it removes. A fuel stop costs an hour or more on the ground. Add handling, and the crew duty time it uses up (the legal limit on how long a crew may work). If you chartered to save time, that stop can undo the benefit. Aircraft in this class are built to avoid it.',
      'The cabin is laid out in zones, not as one long space. A work area, a dining area and a rest area can sit side by side without the aircraft feeling like a corridor. On a flight long enough to sleep, that separation is what lets you arrive ready to go.',
      'This is the most expensive type of charter. It only makes sense when the flight truly needs it. For any domestic trip within India, it is the wrong aircraft.',
    ],
    missions: ['corporate', 'vvip', 'group'],
    idealFor: [
      'Flights between continents without a fuel stop',
      'Long flights where people need both rest and work',
      'Delegations travelling together over long distances',
    ],
    limitations: [
      'The highest charter cost of any category',
      'Not needed for domestic flights within India',
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

/**
 * The span of a spec across every type in a category: lowest minimum to
 * highest maximum, ignoring types where the figure is unknown. Null when no
 * type in the category has the figure, so a card shows nothing rather than a
 * guess.
 */
export function categorySpan(
  category: AircraftCategory,
  spec: 'passengers' | 'rangeNm' | 'cruiseKts',
): { readonly min: number; readonly max: number } | null {
  const ranges = aircraftByCategory(category)
    .map((a) => a.specs[spec])
    .filter((r): r is { readonly min: number; readonly max: number } => r !== null);
  if (ranges.length === 0) return null;
  return {
    min: Math.min(...ranges.map((r) => r.min)),
    max: Math.max(...ranges.map((r) => r.max)),
  };
}
