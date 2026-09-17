import type { AircraftCategory } from './aircraft';
import type { IsoDate } from './common';
import type { TripType } from './route';

/**
 * The charter request.
 *
 * Stage one is four fields, because a long form at first contact is the single
 * largest drop-off in this funnel. Everything else is progressive disclosure.
 */
export interface CharterRequestStageOne {
  readonly from: string;
  readonly to: string;
  readonly departureDate: IsoDate;
  readonly passengers: number;
}

export type CharterPurpose =
  | 'corporate'
  | 'leisure'
  | 'wedding'
  | 'medical'
  | 'film-and-aerial'
  | 'pilgrimage'
  | 'event'
  | 'other';

export interface CharterRequestDetails {
  readonly tripType?: TripType;
  readonly returnDate?: IsoDate;
  readonly aircraftPreference?: AircraftCategory;
  readonly purpose?: CharterPurpose;
  readonly flexibleDates?: boolean;
  readonly additionalRequirements?: string;
}

export interface CharterRequestContact {
  readonly name: string;
  readonly phone: string;
  readonly email: string;
}

export interface CharterRequest
  extends CharterRequestStageOne,
    CharterRequestDetails,
    CharterRequestContact {
  /** Which page the request came from, for attribution. */
  readonly sourcePath: string;
  /** Anti-spam honeypot: any value means discard silently. */
  readonly website?: string;
}

/** Field-level errors, keyed by the field that failed. */
export type CharterRequestErrors = Partial<Record<keyof CharterRequest, string>>;

export type SubmissionState =
  | { readonly status: 'idle' }
  | { readonly status: 'submitting' }
  | { readonly status: 'success'; readonly reference: string }
  | { readonly status: 'error'; readonly message: string; readonly retryable: boolean };

/**
 * Empty legs are real availability or they are not shown. There is no
 * "indicative" status that quietly means invented.
 */
export type EmptyLegStatus = 'available' | 'provisional' | 'withdrawn';

export interface EmptyLeg {
  readonly id: string;
  readonly originCity: string;
  readonly destinationCity: string;
  readonly date: IsoDate;
  readonly aircraftSlug: string;
  readonly seats: number;
  readonly status: EmptyLegStatus;
  /** Present only where the operator has quoted one. */
  readonly indicativePriceInr?: number;
  /** Who supplied the leg and when — an empty leg is an operator's fact. */
  readonly sourcedFrom: string;
  readonly sourcedOn: IsoDate;
}
