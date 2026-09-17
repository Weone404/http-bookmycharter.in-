import type { IsoDate, InternalLink, Path, SiteImage, Slug } from './common';

export type InsightCategory =
  | 'charter-guide'
  | 'aircraft-guide'
  | 'helicopter-guide'
  | 'pricing'
  | 'travel'
  | 'routes'
  | 'aviation'
  | 'case-study';

/**
 * An author is a real person with a real role. Credentials are not invented,
 * and an article without a real author simply has none rather than a
 * fabricated byline.
 */
export interface Author {
  readonly slug: Slug;
  readonly name: string;
  readonly role: string;
  readonly bio: string;
}

export interface Insight {
  readonly slug: Slug;
  readonly category: InsightCategory;
  readonly title: string;
  /** Answer-first standfirst, quotable on its own. */
  readonly summary: string;
  readonly published: IsoDate;
  readonly updated?: IsoDate;
  readonly author?: Author;
  readonly image?: SiteImage;
  readonly body: readonly string[];
  /**
   * Every insight supports a commercial page. An article that links nowhere
   * is a dead end and does not ship.
   */
  readonly supports: readonly InternalLink[];
  readonly canonical: Path;
}
