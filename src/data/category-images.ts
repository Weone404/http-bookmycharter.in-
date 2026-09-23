import type { AircraftCategory } from '@/types/aircraft';
import type { SiteImageName } from '@/data/site-images.generated';

/**
 * One illustration per aircraft group, used wherever a group is shown as a
 * picture (cards, the at-a-glance rail, service pages). `group-charter` has
 * no picture of its own and shows none rather than borrowing another group's.
 */
export const CATEGORY_IMAGE: Readonly<Partial<Record<AircraftCategory, SiteImageName>>> = {
  helicopter: 'group-helicopters',
  turboprop: 'group-turboprops',
  'private-jet': 'group-private-jets',
  'executive-airliner': 'group-regional',
};
