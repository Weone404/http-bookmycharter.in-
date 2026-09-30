import type { SiteImageName } from './site-images.generated';

/**
 * What each site illustration shows, for alt text. The pictures are
 * illustrations of typical aircraft and places, not photographs of a
 * specific operator's fleet, so the text describes the scene rather than
 * naming an aircraft or company.
 */
export const SITE_IMAGE_ALT: Readonly<Record<SiteImageName, string>> = {
  'home-hero-desktop': 'A business jet parked on a wet apron at dusk',
  'home-hero-mobile': 'A business jet parked on a wet apron at dusk',
  'service-private-jets': 'A business jet flying above the clouds at sunset',
  'service-helicopters': 'A helicopter on a rooftop helipad above a city at dusk',
  'service-himalaya': 'A helicopter flying over snow-capped Himalayan valleys',
  'service-empty-legs': 'A business jet taking off from a runway at sunset',
  'service-corporate': 'The cabin of a business jet with leather seats and a work table',
  'group-helicopters': 'A twin-engine helicopter on a helipad',
  'group-turboprops': 'A single-engine turboprop parked in front of hills',
  'group-private-jets': 'A business jet with its airstair open outside a hangar',
  'group-regional': 'A regional airliner parked on an airport apron',
  'band-private-charter': 'A business jet flying over a sea of clouds at sunrise',
  'band-helicopter-charter': 'A helicopter flying over green hills and a river at sunset',
  'band-himalaya': 'A helicopter over the Himalaya at sunrise',
  'band-corporate': 'Two business jets parked outside an airport terminal',
  'band-aerial-flower-dropping': 'A helicopter showering flower petals over a palace courtyard',
  'band-empty-legs': 'An empty runway at sunset',
  'band-planning': 'The flight deck of a business jet looking out at dusk',
  'band-destinations': 'Aerial view of a river meeting the sea along a green coastline',
  'band-company': 'A business jet inside a hangar',
  'band-aircraft': 'A helicopter, a turboprop and a business jet on an apron at sunset',
  'band-insights': 'The view from a cockpit above the clouds at sunrise',
  'band-request': 'Runway lights stretching ahead at dusk',
  'og-background': 'A business jet flying above the clouds at sunset',
};
