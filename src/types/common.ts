/**
 * Shared primitives for every content model on Book My Charter.
 *
 * The governing rule: a fact we do not have is ABSENT, never defaulted.
 * Optional fields below exist because the fact may genuinely be unknown at
 * authoring time — a renderer must handle `undefined` by omitting the row,
 * not by printing a plausible placeholder.
 */

/** URL path segment: lowercase, digits and single hyphens. */
export type Slug = string;

/** Absolute site path, leading slash, no trailing slash except the root. */
export type Path = `/${string}` | '/';

/** ISO-8601 calendar date, `YYYY-MM-DD`. */
export type IsoDate = `${number}-${number}-${number}`;

/** Amount in Indian rupees. Never a string, never pre-formatted. */
export type Inr = number;

/**
 * Evidence for an externally checkable assertion.
 *
 * Per CLAIMS.md, sources are asymmetric. Facts the owner uniquely knows
 * (prices, address, phone, what the business does) are sourced by owner
 * assertion. Facts a third party could check — certifications, empanelments,
 * fleet counts, distances, flight times, service records, client counts —
 * require a dated document. An owner's yes is a pointer to a source, not a
 * source, and a batch confirmation cannot be attributed to an individual claim.
 */
export type SourceKind =
  | 'owner-assertion'
  | 'operator-document'
  | 'regulator-record'
  | 'published-reference'
  | 'internal-record';

export interface SourceRef {
  readonly kind: SourceKind;
  /** What the document is, specifically enough to find it again. */
  readonly document: string;
  /** Date on the document itself, not the date it was cited. */
  readonly dated: IsoDate;
  readonly note?: string;
}

/**
 * An externally checkable value and the evidence behind it.
 *
 * Use this wherever a wrong number would be a factual claim about the world:
 * route distances, flight times, seat counts, certifications, counts of
 * anything. Do not use it for descriptive copy.
 *
 * A field typed `VerifiedFact<T> | undefined` cannot be filled in by guessing
 * without also inventing a document, which is a harder thing to do by accident.
 */
export interface VerifiedFact<T> {
  readonly value: T;
  readonly source: SourceRef;
}

/** A single internal link, used by every related-content block. */
export interface InternalLink {
  readonly label: string;
  readonly href: Path;
  readonly description?: string;
}

/** Image with rights recorded. No image ships without provenance. */
export type ImageRights = 'owned' | 'licensed' | 'operator-supplied' | 'public-domain';

export interface SiteImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly rights: ImageRights;
  /** Who it came from, so the licence can be produced on request. */
  readonly credit: string;
}

/** Per-page SEO inputs. One source of truth per route. */
export interface PageSeo {
  readonly title: string;
  readonly description: string;
  readonly path: Path;
  readonly lastModified: IsoDate;
  readonly index?: boolean;
}
