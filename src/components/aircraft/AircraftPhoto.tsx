import Image from 'next/image';
import { AIRCRAFT_PHOTOS, type AircraftPhotoRecord } from '@/data/aircraft-photos.generated';

/**
 * A real photograph of an aircraft type, with its credit.
 *
 * Every photo on the site is a Wikimedia Commons image of the TYPE — another
 * operator's aircraft, in someone else's livery, carrying someone else's
 * registration. Shown without a caption, it reads as a picture of the aircraft
 * the customer will fly, which it is not. So the caption says what it is
 * every time, and it also carries the attribution that CC BY and CC BY-SA
 * require: author, licence and a link back to the file.
 *
 * If a type has no confirmed photo this renders nothing. It never falls back
 * to a sibling variant's photo — a Citation XLS captioned "Citation XLS+" is a
 * wrong statement about the aircraft, and an empty slot is not.
 */
export function photoFor(slug: string): AircraftPhotoRecord | undefined {
  return AIRCRAFT_PHOTOS[slug];
}

export function PhotoCredit({ photo }: { readonly photo: AircraftPhotoRecord }) {
  return (
    <>
      Photo:{' '}
      <a href={photo.sourceUrl} className="underline underline-offset-2" rel="noopener">
        {photo.author}
      </a>
      ,{' '}
      <a href={photo.licenceUrl} className="underline underline-offset-2" rel="license noopener">
        {photo.licence}
      </a>
      , via Wikimedia Commons
    </>
  );
}

export function AircraftPhoto({
  slug,
  name,
  priority = false,
  sizes = '(min-width: 1280px) 60vw, 100vw',
  className = '',
}: {
  readonly slug: string;
  readonly name: string;
  readonly priority?: boolean;
  readonly sizes?: string;
  readonly className?: string;
}) {
  const photo = photoFor(slug);
  if (!photo) return null;

  return (
    // Capped at the file's own width so a smaller original is never stretched.
    <figure className={`m-0 ${className}`} style={{ maxWidth: photo.width }}>
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full rounded-[var(--radius-card)] object-cover"
      />
      <figcaption className="mt-3 text-[length:var(--text-micro)] leading-relaxed text-[var(--color-ink-muted)]">
        Representative photo of the {name} type — not a specific aircraft offered for charter.{' '}
        <PhotoCredit photo={photo} />.
      </figcaption>
    </figure>
  );
}
