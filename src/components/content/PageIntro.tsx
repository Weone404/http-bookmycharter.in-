import type { ReactNode } from 'react';
import Image from 'next/image';
import type { Path } from '@/types/common';
import type { SiteImageName } from '@/data/site-images.generated';
import type { DynamicCrumb } from '@/lib/routes';
import { SITE_IMAGES, type SiteImage } from '@/data/site-images.generated';
import { HERO_FRAMING, heroImageFor } from '@/lib/page-images';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

/**
 * The opening of every non-home page: breadcrumbs, H1 and the answer-first
 * summary, set over the page's illustration as one full-width hero.
 *
 * The picture used to sit alone in a strip above the heading; set behind it,
 * picture and heading read as one opening instead of two unrelated blocks.
 *
 * Layout: the hero breaks out of the content frame to the full viewport width
 * (--frame-left is the distance from the viewport edge to the frame's content
 * edge) and pads its text back in by the same amount, so the heading stays on
 * the site's one left edge. The first section drops its top padding when it
 * opens with a hero (globals.css), so the hero meets the navigation.
 *
 * `summary` is the answer-first sentence: it has to answer the page's
 * question completely enough to be quoted on its own.
 */
export function PageIntro({
  path,
  dynamic,
  eyebrow,
  title,
  summary,
  image: imageOverride,
  picture,
  children,
  action,
}: {
  path: Path;
  dynamic?: DynamicCrumb;
  eyebrow?: string;
  title: string;
  summary: string;
  /** Overrides the route's picture, e.g. an aircraft page picks by type. */
  image?: SiteImageName;
  /** A specific picture (e.g. one aircraft type's illustration), over `image`. */
  picture?: SiteImage;
  children?: ReactNode;
  /**
   * Full-width block under the text, e.g. the quote form. Sits outside the
   * 60ch measure that keeps the heading and summary readable.
   */
  action?: ReactNode;
}) {
  const name = imageOverride ?? heroImageFor(path);
  const image = picture ?? SITE_IMAGES[name];
  const framing = picture ? {} : (HERO_FRAMING[name] ?? {});

  return (
    <div className="page-hero on-dark relative isolate ml-[calc(-1*var(--frame-left))] w-screen overflow-hidden bg-[var(--color-midnight)] text-[var(--color-ink-inverse)]">
      {/* Phones: the picture is a 16:9-ish panel across the top that fades
          into the dark ground, and the text starts over its lower edge — the
          subject stays visible instead of being buried under the scrim.
          From lg the picture fills the hero behind left-aligned text. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[58vw] lg:inset-0 lg:h-auto">
        <Image
          src={image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: framing.focus ?? '50% 50%',
            ...(framing.mirror ? { transform: 'scaleX(-1)' } : {}),
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,23,38,0.1)_0%,rgba(11,23,38,0.3)_35%,rgba(11,23,38,0.8)_68%,rgba(11,23,38,1)_100%)] lg:bg-[linear-gradient(to_right,rgba(11,23,38,0.94)_0%,rgba(11,23,38,0.86)_40%,rgba(11,23,38,0.3)_72%,rgba(11,23,38,0.05)_100%)]"
        />
      </div>
      <div className="page-hero-inner px-[var(--frame-left)] pb-[var(--hero-pad-bottom)] pt-[calc(58vw-3.25rem)] lg:pt-[clamp(1.75rem,1rem+3vw,3.5rem)]">
        <div className="max-w-[60ch]">
          <Breadcrumbs path={path} {...(dynamic ? { dynamic } : {})} />
          {eyebrow ? (
            <p className="mt-8 text-[length:var(--text-micro)] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={`${eyebrow ? 'mt-3' : 'mt-6'} text-[length:var(--text-h1)] font-semibold leading-[1.05] tracking-[-0.02em]`}
          >
            {title}
          </h1>
          <p className="mt-5 text-[length:var(--text-lead)] text-[var(--color-ink-inverse)]/90">
            {summary}
          </p>
          {children}
        </div>
        {action}
      </div>
    </div>
  );
}
