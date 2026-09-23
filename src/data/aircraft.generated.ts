// GENERATED FILE — do not edit by hand.
// Run `npm run aircraft` to regenerate from fleet-details.md.
//
// Source: fleet-details.md — internal aircraft specification sheet, typical civil/charter configurations
// Generated: 2026-09-17
//
// 52 aircraft types: 11 helicopter, 5 turboprop, 30 private-jet, 6 executive-airliner.
//
// Every figure here is TYPICAL FOR THE TYPE, not tail-specific. Pages that
// render these must say so. See docs/BUSINESS-DATA-REQUIRED.md section C.

import type { AircraftCategory } from '@/types/aircraft';
import type { SourceRef } from '@/types/common';

export interface NumericRange {
  readonly min: number;
  readonly max: number;
}

export interface GeneratedSpecs {
  readonly passengers: NumericRange | null;
  readonly rangeNm: NumericRange | null;
  readonly cruiseKts: NumericRange | null;
  readonly crew: NumericRange | null;
  readonly cabinCrew: boolean | null;
  readonly baggageNote: string | null;
}

export interface GeneratedAircraft {
  readonly slug: string;
  readonly name: string;
  readonly category: AircraftCategory;
  readonly sourceDescription: string | null;
  readonly specs: GeneratedSpecs;
}

/** Provenance for every specification figure in this file. */
export const AIRCRAFT_SPEC_SOURCE: SourceRef = {
  kind: 'internal-record',
  document: "fleet-details.md — internal aircraft specification sheet, typical civil/charter configurations",
  dated: "2026-09-17",
  note: 'Typical for the type. Varies by variant, options, weight, altitude and temperature.',
};

export const GENERATED_AIRCRAFT: readonly GeneratedAircraft[] = [
  {
    "slug": "agusta-109-grand",
    "name": "Agusta 109 Grand",
    "category": "helicopter",
    "sourceDescription": "Elegant twin-engine light helicopter with retractable landing gear, smooth ride, and refined cabin. Excellent for VIP transfers and mountain operations.",
    "specs": {
      "passengers": {
        "min": 5,
        "max": 7
      },
      "rangeNm": {
        "min": 430,
        "max": 480
      },
      "cruiseKts": {
        "min": 140,
        "max": 155
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "Approx. 30–32 cu ft (rear bay) – typically 3–4 medium suitcases or up to 120 kg"
    }
  },
  {
    "slug": "agusta-119-koala",
    "name": "Agusta 119 Koala",
    "category": "helicopter",
    "sourceDescription": "Reliable single-engine utility helicopter with a surprisingly spacious cabin. Suitable for passenger charter and utility missions.",
    "specs": {
      "passengers": {
        "min": 6,
        "max": 7
      },
      "rangeNm": {
        "min": 500,
        "max": 550
      },
      "cruiseKts": {
        "min": 140,
        "max": 150
      },
      "crew": {
        "min": 1,
        "max": 1
      },
      "cabinCrew": false,
      "baggageNote": "Moderate rear compartment + cabin space – typically 3–4 soft bags"
    }
  },
  {
    "slug": "agusta-aw109-power",
    "name": "Agusta AW109 Power",
    "category": "helicopter",
    "sourceDescription": "Fast twin-engine helicopter with strong performance and comfortable cabin. Popular for corporate, VIP, and EMS operations.",
    "specs": {
      "passengers": {
        "min": 6,
        "max": 7
      },
      "rangeNm": {
        "min": 500,
        "max": 520
      },
      "cruiseKts": {
        "min": 150,
        "max": 154
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "Approx. 25–30 cu ft – 3–4 medium bags"
    }
  },
  {
    "slug": "airbus-h125",
    "name": "Airbus H125",
    "category": "helicopter",
    "sourceDescription": "High-performance single-engine helicopter renowned for exceptional high-altitude and hot-and-high capability. Ideal for Char Dham and mountain operations.",
    "specs": {
      "passengers": {
        "min": 5,
        "max": 6
      },
      "rangeNm": {
        "min": 340,
        "max": 340
      },
      "cruiseKts": {
        "min": 130,
        "max": 136
      },
      "crew": {
        "min": 1,
        "max": 1
      },
      "cabinCrew": false,
      "baggageNote": "3 external compartments (~35 cu ft total) – 3–4 soft bags"
    }
  },
  {
    "slug": "airbus-h145",
    "name": "Airbus H145",
    "category": "helicopter",
    "sourceDescription": "Modern light twin-engine multi-role helicopter with large flat-floor cabin and excellent safety features. Versatile for VIP, EMS, and group travel.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 10
      },
      "rangeNm": {
        "min": 350,
        "max": 360
      },
      "cruiseKts": {
        "min": 130,
        "max": 130
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~47 cu ft internal – 4–6 bags"
    }
  },
  {
    "slug": "dauphin-as365n2",
    "name": "Dauphin AS365N2",
    "category": "helicopter",
    "sourceDescription": "Medium twin-engine helicopter featuring Fenestron tail rotor for quieter and safer operation. Comfortable for longer group flights.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 12
      },
      "rangeNm": {
        "min": 290,
        "max": 500
      },
      "cruiseKts": {
        "min": 140,
        "max": 150
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "Generous rear hold – 5–8 bags"
    }
  },
  {
    "slug": "eurocopter-as365-dauphin",
    "name": "Eurocopter AS365 Dauphin",
    "category": "helicopter",
    "sourceDescription": "Medium twin-engine helicopter from the same family as the AS365N2. Later variants (N3) offer improved hot-and-high performance.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 12
      },
      "rangeNm": {
        "min": 400,
        "max": 500
      },
      "cruiseKts": {
        "min": 145,
        "max": 152
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "Generous rear hold – similar to AS365N2"
    }
  },
  {
    "slug": "hs-135-airbus-h135",
    "name": "HS 135 (Airbus H135)",
    "category": "helicopter",
    "sourceDescription": "Quiet and efficient light twin-engine helicopter with advanced avionics and low operating costs. Ideal for corporate and short-to-medium range passenger services.",
    "specs": {
      "passengers": {
        "min": 5,
        "max": 6
      },
      "rangeNm": {
        "min": 340,
        "max": 340
      },
      "cruiseKts": {
        "min": 130,
        "max": 136
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "Moderate – 3–4 bags"
    }
  },
  {
    "slug": "robinson-r66",
    "name": "Robinson R66",
    "category": "helicopter",
    "sourceDescription": "Affordable single-turbine helicopter with good payload capacity and Jet-A fuel efficiency. Suitable for private charter and sightseeing.",
    "specs": {
      "passengers": {
        "min": 4,
        "max": 4
      },
      "rangeNm": {
        "min": 350,
        "max": 350
      },
      "cruiseKts": {
        "min": 110,
        "max": 110
      },
      "crew": {
        "min": 1,
        "max": 1
      },
      "cabinCrew": false,
      "baggageNote": "300 lb capacity baggage compartment – 2 large + soft bags"
    }
  },
  {
    "slug": "textron-bell-407",
    "name": "Textron Bell 407",
    "category": "helicopter",
    "sourceDescription": "Reliable single-engine utility helicopter known for excellent visibility, speed, and strong performance. Frequently used for passenger transport and mountain operations.",
    "specs": {
      "passengers": {
        "min": 6,
        "max": 6
      },
      "rangeNm": {
        "min": 330,
        "max": 350
      },
      "cruiseKts": {
        "min": 133,
        "max": 133
      },
      "crew": {
        "min": 1,
        "max": 1
      },
      "cabinCrew": false,
      "baggageNote": "16 cu ft aft compartment – typically 3–5 soft bags (up to ~75 kg)"
    }
  },
  {
    "slug": "textron-bell-429",
    "name": "Textron Bell 429",
    "category": "helicopter",
    "sourceDescription": "Modern light twin-engine helicopter with spacious cabin and high cruise speed. Preferred for VIP and corporate flights.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 7
      },
      "rangeNm": {
        "min": 390,
        "max": 410
      },
      "cruiseKts": {
        "min": 150,
        "max": 155
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "74 cu ft aft – very good capacity (5–7 bags)"
    }
  },
  {
    "slug": "king-air-b300",
    "name": "King Air B300",
    "category": "turboprop",
    "sourceDescription": "Powerful twin-turboprop with pressurized cabin and excellent short-field performance. Ideal for group travel and executive transport.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 11
      },
      "rangeNm": {
        "min": 1500,
        "max": 1800
      },
      "cruiseKts": {
        "min": 300,
        "max": 315
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "55–56 cu ft internal (~550 lb)"
    }
  },
  {
    "slug": "king-air-c90",
    "name": "King Air C90",
    "category": "turboprop",
    "sourceDescription": "Efficient entry-level twin-turboprop suitable for regional hops and shorter routes.",
    "specs": {
      "passengers": {
        "min": 5,
        "max": 7
      },
      "rangeNm": {
        "min": 1000,
        "max": 1300
      },
      "cruiseKts": {
        "min": 220,
        "max": 250
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~48–54 cu ft"
    }
  },
  {
    "slug": "super-king-air-b200",
    "name": "Super King Air B200",
    "category": "turboprop",
    "sourceDescription": "Versatile twin-turboprop workhorse with strong climb performance and flexible cabin configurations.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 9
      },
      "rangeNm": {
        "min": 1500,
        "max": 1700
      },
      "cruiseKts": {
        "min": 280,
        "max": 290
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "55 cu ft (~550 lb)"
    }
  },
  {
    "slug": "super-king-air-b200gt",
    "name": "Super King Air B200GT",
    "category": "turboprop",
    "sourceDescription": "Updated version of the B200 featuring modern avionics and improved performance.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 9
      },
      "rangeNm": {
        "min": 1600,
        "max": 1600
      },
      "cruiseKts": {
        "min": 290,
        "max": 305
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "55 cu ft"
    }
  },
  {
    "slug": "super-king-air-b350",
    "name": "Super King Air B350",
    "category": "turboprop",
    "sourceDescription": "Stretched, higher-capacity version of the B300 family with excellent payload-range capability.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 11
      },
      "rangeNm": {
        "min": 1700,
        "max": 1800
      },
      "cruiseKts": {
        "min": 300,
        "max": 315
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "55–56 cu ft"
    }
  },
  {
    "slug": "beechcraft-hawker-4000",
    "name": "Beechcraft Hawker 4000",
    "category": "private-jet",
    "sourceDescription": "Super-midsize jet with large stand-up cabin, long range, and smooth high-speed performance.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 9
      },
      "rangeNm": {
        "min": 3100,
        "max": 3200
      },
      "cruiseKts": {
        "min": 450,
        "max": 470
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~109–115 cu ft"
    }
  },
  {
    "slug": "beechcraft-hawker-400xp",
    "name": "Beechcraft Hawker 400XP",
    "category": "private-jet",
    "sourceDescription": "Light jet offering good speed and short-field performance for regional business travel.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 8
      },
      "rangeNm": {
        "min": 1300,
        "max": 1500
      },
      "cruiseKts": {
        "min": 450,
        "max": 450
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~50–56 cu ft"
    }
  },
  {
    "slug": "beechcraft-hawker-750xp",
    "name": "Beechcraft Hawker 750XP",
    "category": "private-jet",
    "sourceDescription": "Midsize jet, improved version of the 800 series with comfortable cabin.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 8
      },
      "rangeNm": {
        "min": 2100,
        "max": 2100
      },
      "cruiseKts": {
        "min": 445,
        "max": 450
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~48–50 cu ft"
    }
  },
  {
    "slug": "beechcraft-hawker-800xp",
    "name": "Beechcraft Hawker 800XP",
    "category": "private-jet",
    "sourceDescription": "Popular midsize jet known for reliability and comfortable cabin.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 8
      },
      "rangeNm": {
        "min": 2400,
        "max": 2500
      },
      "cruiseKts": {
        "min": 447,
        "max": 447
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "48–50 cu ft"
    }
  },
  {
    "slug": "beechcraft-hawker-850xp",
    "name": "Beechcraft Hawker 850XP",
    "category": "private-jet",
    "sourceDescription": "Updated 800XP featuring winglets and improved performance.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 8
      },
      "rangeNm": {
        "min": 2600,
        "max": 2600
      },
      "cruiseKts": {
        "min": 448,
        "max": 448
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~50 cu ft"
    }
  },
  {
    "slug": "beechcraft-hawker-900xp",
    "name": "Beechcraft Hawker 900XP",
    "category": "private-jet",
    "sourceDescription": "Longest-range midsize Hawker with improved engines and cabin comfort.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 8
      },
      "rangeNm": {
        "min": 2800,
        "max": 2900
      },
      "cruiseKts": {
        "min": 448,
        "max": 448
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "50 cu ft"
    }
  },
  {
    "slug": "beechcraft-premier-1a",
    "name": "Beechcraft Premier 1A",
    "category": "private-jet",
    "sourceDescription": "Fast light jet with modern cabin and efficient operations.",
    "specs": {
      "passengers": {
        "min": 6,
        "max": 6
      },
      "rangeNm": {
        "min": 1300,
        "max": 1500
      },
      "cruiseKts": {
        "min": 450,
        "max": 454
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~70–77 cu ft"
    }
  },
  {
    "slug": "bombardier-learjet-40",
    "name": "Bombardier Learjet 40",
    "category": "private-jet",
    "sourceDescription": "High-performance light jet known for speed and climb capability.",
    "specs": {
      "passengers": {
        "min": 6,
        "max": 7
      },
      "rangeNm": {
        "min": 1500,
        "max": 1700
      },
      "cruiseKts": {
        "min": 450,
        "max": 460
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~40–45 cu ft"
    }
  },
  {
    "slug": "bombardier-learjet-45",
    "name": "Bombardier Learjet 45",
    "category": "private-jet",
    "sourceDescription": "Light-midsize jet offering strong performance and comfortable cabin.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 9
      },
      "rangeNm": {
        "min": 1800,
        "max": 2000
      },
      "cruiseKts": {
        "min": 450,
        "max": 460
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~40–50 cu ft"
    }
  },
  {
    "slug": "bombardier-learjet-45xr",
    "name": "Bombardier Learjet 45XR",
    "category": "private-jet",
    "sourceDescription": "Extended-range version of the Learjet 45 with improved performance.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 9
      },
      "rangeNm": {
        "min": 2000,
        "max": 2000
      },
      "cruiseKts": {
        "min": 450,
        "max": 460
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~40–50 cu ft"
    }
  },
  {
    "slug": "cessna-citation-cj1",
    "name": "Cessna Citation CJ1",
    "category": "private-jet",
    "sourceDescription": "Efficient very light jet with excellent short-field performance.",
    "specs": {
      "passengers": {
        "min": 5,
        "max": 6
      },
      "rangeNm": {
        "min": 1100,
        "max": 1300
      },
      "cruiseKts": {
        "min": 380,
        "max": 400
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~40–50 cu ft"
    }
  },
  {
    "slug": "cessna-citation-cj1-plus",
    "name": "Cessna Citation CJ1+",
    "category": "private-jet",
    "sourceDescription": "Updated CJ1 with improved avionics and performance.",
    "specs": {
      "passengers": {
        "min": 5,
        "max": 6
      },
      "rangeNm": {
        "min": 1200,
        "max": 1400
      },
      "cruiseKts": {
        "min": 380,
        "max": 410
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~40–50 cu ft"
    }
  },
  {
    "slug": "cessna-citation-cj2",
    "name": "Cessna Citation CJ2",
    "category": "private-jet",
    "sourceDescription": "Light jet offering more cabin space and range than the CJ1 series.",
    "specs": {
      "passengers": {
        "min": 6,
        "max": 7
      },
      "rangeNm": {
        "min": 1400,
        "max": 1600
      },
      "cruiseKts": {
        "min": 400,
        "max": 420
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~50–60 cu ft"
    }
  },
  {
    "slug": "cessna-citation-cj2-plus",
    "name": "Cessna Citation CJ2+",
    "category": "private-jet",
    "sourceDescription": "Improved CJ2 with better performance and modern systems.",
    "specs": {
      "passengers": {
        "min": 6,
        "max": 7
      },
      "rangeNm": {
        "min": 1500,
        "max": 1700
      },
      "cruiseKts": {
        "min": 400,
        "max": 420
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~50–60 cu ft"
    }
  },
  {
    "slug": "cessna-citation-ii",
    "name": "Cessna Citation II",
    "category": "private-jet",
    "sourceDescription": "Classic light jet known for reliability and versatility.",
    "specs": {
      "passengers": {
        "min": 6,
        "max": 8
      },
      "rangeNm": {
        "min": 1200,
        "max": 1500
      },
      "cruiseKts": {
        "min": 380,
        "max": 400
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~40–50 cu ft"
    }
  },
  {
    "slug": "cessna-citation-iii",
    "name": "Cessna Citation III",
    "category": "private-jet",
    "sourceDescription": "Midsize jet from the Citation family with good performance.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 9
      },
      "rangeNm": {
        "min": 1800,
        "max": 2200
      },
      "cruiseKts": {
        "min": 430,
        "max": 460
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~50–60 cu ft"
    }
  },
  {
    "slug": "cessna-citation-xl",
    "name": "Cessna Citation XL",
    "category": "private-jet",
    "sourceDescription": "Mid-light jet offering a comfortable cabin and solid range.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 8
      },
      "rangeNm": {
        "min": 1800,
        "max": 2000
      },
      "cruiseKts": {
        "min": 420,
        "max": 430
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~70 cu ft"
    }
  },
  {
    "slug": "cessna-citation-xls",
    "name": "Cessna Citation XLS",
    "category": "private-jet",
    "sourceDescription": "Popular mid-light jet with improved performance and cabin comfort.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 9
      },
      "rangeNm": {
        "min": 1900,
        "max": 2100
      },
      "cruiseKts": {
        "min": 420,
        "max": 440
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~70–80 cu ft"
    }
  },
  {
    "slug": "cessna-citation-xls-plus",
    "name": "Cessna Citation XLS+",
    "category": "private-jet",
    "sourceDescription": "Updated XLS with modern avionics and enhanced performance.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 9
      },
      "rangeNm": {
        "min": 2000,
        "max": 2100
      },
      "cruiseKts": {
        "min": 430,
        "max": 440
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "~70–80 cu ft"
    }
  },
  {
    "slug": "dassault-falcon-2000",
    "name": "Dassault Falcon 2000",
    "category": "private-jet",
    "sourceDescription": "Capable midsize twin-engine jet with excellent field performance and quiet cabin.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 10
      },
      "rangeNm": {
        "min": 3000,
        "max": 3000
      },
      "cruiseKts": {
        "min": 450,
        "max": 470
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "130+ cu ft"
    }
  },
  {
    "slug": "embraer-erj-135-lr",
    "name": "Embraer ERJ 135 LR",
    "category": "private-jet",
    "sourceDescription": "Efficient regional jet derivative suitable for group travel.",
    "specs": {
      "passengers": {
        "min": 37,
        "max": 50
      },
      "rangeNm": {
        "min": 1500,
        "max": 1750
      },
      "cruiseKts": {
        "min": 430,
        "max": 450
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": true,
      "baggageNote": "Standard airliner underfloor holds"
    }
  },
  {
    "slug": "embraer-legacy-600",
    "name": "Embraer Legacy 600",
    "category": "private-jet",
    "sourceDescription": "Midsize-to-large cabin jet based on the ERJ platform with spacious interior.",
    "specs": {
      "passengers": {
        "min": 13,
        "max": 14
      },
      "rangeNm": {
        "min": 3400,
        "max": 3400
      },
      "cruiseKts": {
        "min": 450,
        "max": 460
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "Large (200+ cu ft)"
    }
  },
  {
    "slug": "embraer-legacy-650",
    "name": "Embraer Legacy 650",
    "category": "private-jet",
    "sourceDescription": "Extended-range version of the Legacy 600 with improved performance.",
    "specs": {
      "passengers": {
        "min": 13,
        "max": 14
      },
      "rangeNm": {
        "min": 3900,
        "max": 3900
      },
      "cruiseKts": {
        "min": 450,
        "max": 460
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "Large (200+ cu ft)"
    }
  },
  {
    "slug": "embraer-phenom-300",
    "name": "Embraer Phenom 300",
    "category": "private-jet",
    "sourceDescription": "Very popular light jet combining excellent performance, range, and cabin comfort.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 9
      },
      "rangeNm": {
        "min": 1900,
        "max": 2000
      },
      "cruiseKts": {
        "min": 450,
        "max": 460
      },
      "crew": {
        "min": 1,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "85 cu ft"
    }
  },
  {
    "slug": "global-6000",
    "name": "Global 6000",
    "category": "private-jet",
    "sourceDescription": "Ultra-long-range large-cabin jet offering exceptional comfort and intercontinental capability.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 16
      },
      "rangeNm": {
        "min": 6000,
        "max": 6000
      },
      "cruiseKts": {
        "min": 480,
        "max": 510
      },
      "crew": {
        "min": 2,
        "max": 3
      },
      "cabinCrew": true,
      "baggageNote": "195 cu ft"
    }
  },
  {
    "slug": "global-express-xrs",
    "name": "Global Express XRS",
    "category": "private-jet",
    "sourceDescription": "Ultra-long-range large-cabin jet (predecessor to Global 6000) with similar high-end performance.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 16
      },
      "rangeNm": {
        "min": 6000,
        "max": 6000
      },
      "cruiseKts": {
        "min": 480,
        "max": 500
      },
      "crew": {
        "min": 2,
        "max": 3
      },
      "cabinCrew": true,
      "baggageNote": "Large"
    }
  },
  {
    "slug": "gulfstream-g550",
    "name": "Gulfstream G550",
    "category": "private-jet",
    "sourceDescription": "Iconic large-cabin ultra-long-range jet designed for high-end executive and VIP travel.",
    "specs": {
      "passengers": {
        "min": 8,
        "max": 16
      },
      "rangeNm": {
        "min": 6750,
        "max": 6750
      },
      "cruiseKts": {
        "min": 480,
        "max": 510
      },
      "crew": {
        "min": 2,
        "max": 3
      },
      "cabinCrew": true,
      "baggageNote": "226 cu ft"
    }
  },
  {
    "slug": "learjet-60",
    "name": "Learjet 60",
    "category": "private-jet",
    "sourceDescription": "Midsize jet known for strong performance and efficient operations.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 9
      },
      "rangeNm": {
        "min": 2200,
        "max": 2200
      },
      "cruiseKts": {
        "min": 450,
        "max": 460
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "50–60 cu ft"
    }
  },
  {
    "slug": "learjet-60xr",
    "name": "Learjet 60XR",
    "category": "private-jet",
    "sourceDescription": "Updated version of the Learjet 60 with improved systems and cabin.",
    "specs": {
      "passengers": {
        "min": 7,
        "max": 9
      },
      "rangeNm": {
        "min": 2400,
        "max": 2400
      },
      "cruiseKts": {
        "min": 450,
        "max": 460
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": false,
      "baggageNote": "50–60 cu ft"
    }
  },
  {
    "slug": "pilatus-pc-12",
    "name": "Pilatus PC-12",
    "category": "private-jet",
    "sourceDescription": "Highly versatile single-engine turboprop with excellent short- and rough-field performance. Often operated alongside business jets.",
    "specs": {
      "passengers": {
        "min": 6,
        "max": 9
      },
      "rangeNm": {
        "min": 1500,
        "max": 1800
      },
      "cruiseKts": {
        "min": 260,
        "max": 290
      },
      "crew": {
        "min": 1,
        "max": 1
      },
      "cabinCrew": false,
      "baggageNote": "40 cu ft"
    }
  },
  {
    "slug": "atr-72",
    "name": "ATR 72",
    "category": "executive-airliner",
    "sourceDescription": "Efficient twin-turboprop regional airliner ideal for short-haul group travel.",
    "specs": {
      "passengers": {
        "min": 68,
        "max": 78
      },
      "rangeNm": {
        "min": 800,
        "max": 1000
      },
      "cruiseKts": {
        "min": 250,
        "max": 280
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": true,
      "baggageNote": "Full underfloor + overhead bins"
    }
  },
  {
    "slug": "boeing-737-700",
    "name": "Boeing 737-700",
    "category": "executive-airliner",
    "sourceDescription": "Popular narrow-body jet airliner suitable for medium-haul group charters.",
    "specs": {
      "passengers": {
        "min": 130,
        "max": 150
      },
      "rangeNm": {
        "min": 3000,
        "max": 3000
      },
      "cruiseKts": {
        "min": 450,
        "max": 460
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": true,
      "baggageNote": "Full cargo holds"
    }
  },
  {
    "slug": "boeing-737-800",
    "name": "Boeing 737-800",
    "category": "executive-airliner",
    "sourceDescription": "Larger variant of the 737 family with higher passenger capacity.",
    "specs": {
      "passengers": {
        "min": 160,
        "max": 189
      },
      "rangeNm": {
        "min": 2900,
        "max": 3500
      },
      "cruiseKts": null,
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": true,
      "baggageNote": "Full cargo holds"
    }
  },
  {
    "slug": "bombardier-q400",
    "name": "Bombardier Q400",
    "category": "executive-airliner",
    "sourceDescription": "High-speed twin-turboprop regional aircraft combining jet-like speed with turboprop efficiency.",
    "specs": {
      "passengers": {
        "min": 70,
        "max": 90
      },
      "rangeNm": {
        "min": 1000,
        "max": 1500
      },
      "cruiseKts": {
        "min": 350,
        "max": 360
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": true,
      "baggageNote": "Full holds"
    }
  },
  {
    "slug": "erj-145",
    "name": "ERJ 145",
    "category": "executive-airliner",
    "sourceDescription": "Efficient regional jet for short-to-medium haul routes.",
    "specs": {
      "passengers": {
        "min": 50,
        "max": 50
      },
      "rangeNm": {
        "min": 1500,
        "max": 1500
      },
      "cruiseKts": {
        "min": 430,
        "max": 450
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": true,
      "baggageNote": "Standard underfloor holds"
    }
  },
  {
    "slug": "erj-175",
    "name": "ERJ 175",
    "category": "executive-airliner",
    "sourceDescription": "Larger regional jet offering modern comfort and good range.",
    "specs": {
      "passengers": {
        "min": 76,
        "max": 88
      },
      "rangeNm": {
        "min": 1800,
        "max": 2000
      },
      "cruiseKts": {
        "min": 430,
        "max": 450
      },
      "crew": {
        "min": 2,
        "max": 2
      },
      "cabinCrew": true,
      "baggageNote": "Standard underfloor holds"
    }
  }
];

const BY_SLUG = new Map(GENERATED_AIRCRAFT.map((a) => [a.slug, a]));

export function generatedAircraft(slug: string): GeneratedAircraft | undefined {
  return BY_SLUG.get(slug);
}
