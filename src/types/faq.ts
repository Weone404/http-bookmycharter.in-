import type { Path } from './common';

/**
 * A question a customer actually asks, answered in the first sentence.
 *
 * FAQPage schema is only emitted for FAQs rendered visibly on the same page,
 * and only where the question is genuine. Padding the list to raise keyword
 * density is the failure mode this type exists to discourage.
 */
export interface Faq {
  readonly question: string;
  /** First sentence must answer it completely enough to be quoted alone. */
  readonly answer: string;
  /** Extra paragraphs shown on the page, excluded from the schema answer. */
  readonly elaboration?: readonly string[];
}

export interface FaqSet {
  readonly path: Path;
  readonly items: readonly Faq[];
}
