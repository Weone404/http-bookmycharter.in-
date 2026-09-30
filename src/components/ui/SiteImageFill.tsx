import Image from 'next/image';
import { SITE_IMAGES, type SiteImageName } from '@/data/site-images.generated';
import { SITE_IMAGE_ALT } from '@/data/site-image-alt';

/**
 * A site illustration filling its box (the box sets the aspect ratio through
 * `className`). Its alt text describes the scene (SITE_IMAGE_ALT), which the
 * card title beside it does not.
 */
export function SiteImageFill({
  name,
  sizes,
  className = '',
  position = 'center',
  priority = false,
}: {
  readonly name: SiteImageName;
  readonly sizes: string;
  readonly className?: string;
  readonly position?: string;
  readonly priority?: boolean;
}) {
  const image = SITE_IMAGES[name];
  return (
    <div className={`relative overflow-hidden bg-[var(--color-ivory-dim)] ${className}`}>
      <Image
        src={image.src}
        alt={SITE_IMAGE_ALT[name]}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
