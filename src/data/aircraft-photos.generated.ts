// GENERATED FILE — do not edit by hand.
// Run `npm run photos` to regenerate from assets-incoming/aircraft-photos/credits.csv.
//
// 0 of 52 aircraft types have a confirmed photo.
// Every photo is a representative image of the TYPE, sourced from Wikimedia
// Commons under a licence that permits commercial use, and is shown with its
// credit. None of them is a photo of an aircraft offered for charter.

export interface AircraftPhotoRecord {
  readonly slug: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly author: string;
  readonly licence: string;
  readonly licenceUrl: string;
  /** The Wikimedia Commons file page. */
  readonly sourceUrl: string;
}

export const AIRCRAFT_PHOTOS: Readonly<Record<string, AircraftPhotoRecord>> = {};
