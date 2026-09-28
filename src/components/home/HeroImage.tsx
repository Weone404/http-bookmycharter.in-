import { getImageProps } from 'next/image';
import { preload } from 'react-dom';
import { SITE_IMAGES } from '@/data/site-images.generated';

/**
 * The home hero background: one art-directed <picture>. Phones get the
 * portrait frame (aircraft at the top, calm dark tarmac where the form sits);
 * tablets and desktops get the landscape frame with the aircraft on the right
 * and open sky on the left for the headline.
 *
 * It replaced the WebGL hero. The photograph is the largest element on the
 * page and is what a visitor sees first, so it is loaded with high priority;
 * the three.js bundle it replaces no longer loads on the home page at all.
 */
export function HeroImage() {
  const common = { alt: '', fill: true, priority: true, quality: 78 } as const;
  const desktop = getImageProps({
    ...common,
    src: SITE_IMAGES['home-hero-desktop'].src,
    sizes: '100vw',
  }).props;
  const mobile = getImageProps({
    ...common,
    src: SITE_IMAGES['home-hero-mobile'].src,
    sizes: '100vw',
  }).props;

  // getImageProps does not preload the way <Image priority> does, so ask
  // for the right frame per screen width at the top of the document.
  preload(mobile.src, {
    as: 'image',
    fetchPriority: 'high',
    imageSrcSet: mobile.srcSet,
    imageSizes: mobile.sizes,
    media: '(max-width: 767px)',
  });
  preload(desktop.src, {
    as: 'image',
    fetchPriority: 'high',
    imageSrcSet: desktop.srcSet,
    imageSizes: desktop.sizes,
    media: '(min-width: 768px)',
  });

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
      <img
        {...desktop}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[50%_0%] md:object-[75%_50%]"
      />
    </picture>
  );
}
