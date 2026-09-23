import type { AircraftCategory } from '@/types/aircraft';
import type { SiteImageName } from '@/data/site-images.generated';

/**
 * Which illustration heads each page, decided from the route alone. It
 * asserts nothing about what is available or operated; it only matches the
 * subject of the page.
 */
export function heroImageFor(path: string): SiteImageName {
  const p = path;
  if (p.startsWith('/chardham')) return 'band-himalaya';
  if (p.includes('flower-dropping')) return 'band-aerial-flower-dropping';
  if (p.startsWith('/helicopter-charter')) return 'band-helicopter-charter';
  if (p.startsWith('/private-charter')) return 'band-private-charter';
  if (p.startsWith('/services')) return 'band-corporate';
  if (p.startsWith('/empty-leg')) return 'band-empty-legs';
  if (p.startsWith('/pricing') || p.startsWith('/how-it-works')) return 'band-planning';
  if (p.startsWith('/destinations') || p.startsWith('/routes')) return 'band-destinations';
  if (p.startsWith('/aircraft')) return 'band-aircraft';
  if (p.startsWith('/insights')) return 'band-insights';
  if (p.startsWith('/request-a-charter')) return 'band-request';
  return 'band-company';
}

/**
 * How each picture is framed behind the page heading. The heading sits on the
 * left, so the subject has to sit on the right: pictures generated with the
 * aircraft on the left are mirrored (none carries text, so nothing reads
 * backwards), and `focus` keeps the subject inside the crop.
 */
export const HERO_FRAMING: Partial<
  Record<SiteImageName, { readonly focus?: string; readonly mirror?: boolean }>
> = {
  'band-private-charter': { focus: '50% 30%', mirror: true },
  'band-helicopter-charter': { focus: '50% 30%', mirror: true },
  'band-himalaya': { focus: '50% 40%', mirror: true },
  'band-aerial-flower-dropping': { focus: '50% 25%', mirror: true },
  'band-corporate': { focus: '50% 55%', mirror: true },
  'band-aircraft': { focus: '60% 55%' },
  'band-company': { focus: '70% 55%' },
  'band-destinations': { focus: '50% 45%' },
  'band-empty-legs': { focus: '50% 55%' },
  'band-request': { focus: '50% 60%' },
  'band-insights': { focus: '50% 70%' },
};

/** The picture for a page about one aircraft group or one aircraft type. */
export function heroImageForCategory(category: AircraftCategory | undefined): SiteImageName {
  if (category === 'helicopter') return 'band-helicopter-charter';
  if (category === 'private-jet') return 'band-private-charter';
  if (category === 'executive-airliner' || category === 'group-charter') return 'band-corporate';
  return 'band-aircraft';
}
