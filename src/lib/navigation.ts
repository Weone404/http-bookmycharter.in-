import type { Path } from '@/types/common';
import { getRoute } from '@/lib/routes';

/**
 * WHAT THE HEADER OFFERS, AND IN WHAT ORDER.
 *
 * The route registry says which pages exist. This file says which of them a
 * visitor should be able to reach in one click from anywhere: the five
 * services people actually come for sit in the bar itself, and everything else
 * is one level down in "More" (desktop) or the grouped drawer (mobile). With
 * the footer listing the rest, no page is more than two clicks from home.
 *
 * Every path is resolved against the registry at build time. A path that does
 * not exist or is still `planned` throws, so the menu cannot link to a page
 * that is not there.
 */
export interface NavLink {
  readonly path: Path;
  readonly label: string;
}

export interface NavGroup {
  readonly heading: string;
  readonly links: readonly NavLink[];
}

function link(path: Path, label?: string): NavLink {
  const route = getRoute(path);
  if (!route || route.status !== 'live') {
    throw new Error(`navigation: ${path} is not a live route`);
  }
  return { path, label: label ?? route.label };
}

/** The services, up front in the header bar. */
export const HEADER_SERVICES: readonly NavLink[] = [
  link('/private-charter/private-jet-charter', 'Private Jets'),
  link('/helicopter-charter', 'Helicopters'),
  link('/chardham', 'Char Dham'),
  link('/empty-leg-charter', 'Empty Legs'),
  link('/services/corporate-charter', 'Corporate'),
];

/** Everything else a visitor looks for, one click behind "More". */
export const MORE_GROUPS: readonly NavGroup[] = [
  {
    heading: 'Aircraft',
    links: [
      link('/aircraft', 'All aircraft'),
      link('/aircraft/private-jets'),
      link('/aircraft/helicopters'),
      link('/aircraft/turboprops'),
    ],
  },
  {
    heading: 'Plan a trip',
    links: [link('/pricing'), link('/how-it-works'), link('/destinations'), link('/routes')],
  },
  {
    heading: 'Company',
    links: [link('/about'), link('/contact'), link('/insights')],
  },
];

/** The mobile drawer: the services first, then the same groups as "More". */
export const DRAWER_GROUPS: readonly NavGroup[] = [
  {
    heading: 'Charter',
    links: [
      link('/private-charter/private-jet-charter'),
      link('/helicopter-charter'),
      link('/chardham', 'Char Dham'),
      link('/chardham/kedarnath-helicopter'),
      link('/empty-leg-charter'),
      link('/services/corporate-charter'),
    ],
  },
  ...MORE_GROUPS,
];
