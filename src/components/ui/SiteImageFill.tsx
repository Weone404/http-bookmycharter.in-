import Image from 'next/image';
import { SITE_IMAGES, type SiteImageName } from '@/data/site-images.generated';

/**
 * A site illustration filling its box (the box sets the aspect ratio through
 * `className`). Decorative: every place it is used, the words beside it say
 * what it shows, so it carries empty alt text rather than repeating them.
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
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
