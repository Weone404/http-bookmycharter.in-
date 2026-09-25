'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import { ArrowLeft, ArrowRight, List } from 'lucide-react';
import { SITE_IMAGES } from '@/data/site-images.generated';
import type { FleetClassSummary } from '@/data/fleet-classes';

/**
 * The aircraft carousel: one card per class, in a 3D cover-flow.
 *
 * Built on native horizontal scroll with scroll-snap, not on a JS slider, so a
 * phone swipe is the platform's own gesture (momentum, snapping, no jank) and
 * the carousel still works if the script is slow. The 3D is a layer on top:
 * each frame, every card's distance from the centre sets its rotation, depth,
 * scale and brightness, written straight to the element's style so a scroll
 * never re-renders React. The centred card also tilts toward the pointer.
 *
 * Below the stage, a panel for the centred class: what it is in one sentence,
 * its seats, range and speed (computed from the types in it, with km beside
 * nm), and the two next steps: get a quote, or view every type in the class.
 * Home → class → list → aircraft is three taps.
 *
 * Reduced motion: no rotation, no tilt, no Ken Burns, instant scrolling.
 */
export function FleetCarousel({
  classes,
  headingId,
}: {
  classes: readonly FleetClassSummary[];
  /** id of the visible heading that names this region. */
  headingId?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const reduced = useRef(false);
  const frame = useRef(0);

  const paint = useCallback(() => {
    frame.current = 0;
    const node = track.current;
    if (!node) return;
    const centre = node.scrollLeft + node.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Infinity;
    cards.current.forEach((card, index) => {
      const item = card?.parentElement;
      if (!card || !item) return;
      const step = item.offsetWidth || 1;
      const d = (item.offsetLeft + item.offsetWidth / 2 - centre) / step;
      const a = Math.min(Math.abs(d), 2.2);
      if (Math.abs(d) < nearestDistance) {
        nearestDistance = Math.abs(d);
        nearest = index;
      }
      if (reduced.current) {
        card.style.transform = `scale(${1 - Math.min(a, 1) * 0.08})`;
        card.style.opacity = String(1 - Math.min(a, 1.5) * 0.3);
        return;
      }
      const rotate = Math.max(-1.2, Math.min(1.2, d)) * -34;
      card.style.transform = `translateZ(${-a * 160}px) rotateY(${rotate}deg) scale(${1 - a * 0.06})`;
      card.style.opacity = String(Math.max(0.35, 1 - a * 0.28));
      card.style.filter = `brightness(${1 - Math.min(a, 1.5) * 0.28})`;
      card.style.zIndex = String(100 - Math.round(a * 10));
    });
    if (nearest !== activeRef.current) {
      activeRef.current = nearest;
      setActive(nearest);
    }
  }, []);

  const schedule = useCallback(() => {
    if (!frame.current) frame.current = requestAnimationFrame(paint);
  }, [paint]);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    paint();
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('resize', schedule);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [paint, schedule]);

  const goTo = useCallback((index: number) => {
    const node = track.current;
    const item = cards.current[index]?.parentElement;
    if (!node || !item) return;
    const target = item.offsetLeft + item.offsetWidth / 2 - node.clientWidth / 2;
    node.scrollTo({ left: target, behavior: reduced.current ? 'auto' : 'smooth' });
  }, []);

  const step = (delta: number) =>
    goTo(Math.max(0, Math.min(classes.length - 1, activeRef.current + delta)));

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    }
  }

  function onTilt(event: PointerEvent<HTMLDivElement>, index: number) {
    if (reduced.current || index !== activeRef.current || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${(-y * 8).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(x * 10).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--shift-x', `${(-x * 18).toFixed(1)}px`);
    event.currentTarget.style.setProperty('--shift-y', `${(-y * 12).toFixed(1)}px`);
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    for (const name of ['--tilt-x', '--tilt-y', '--shift-x', '--shift-y']) {
      event.currentTarget.style.setProperty(name, '0');
    }
  }

  const current = classes[active] ?? classes[0];
  if (!current) return null;

  return (
    <div
      className="fleet-carousel"
      role="region"
      aria-roledescription="carousel"
      {...(headingId ? { 'aria-labelledby': headingId } : { 'aria-label': 'Aircraft classes' })}
      onKeyDown={onKeyDown}
    >
      {/* Quick jump: every class is one tap away, like the class strip on a
          showroom floor. Scrolls sideways on a phone. */}
      <div className="-mx-[var(--spacing-gutter)] overflow-x-auto px-[var(--spacing-gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex w-max gap-2 pb-1">
          {classes.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-pressed={index === active}
                className="whitespace-nowrap rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] px-4 py-2 text-[length:var(--text-small)] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] aria-pressed:border-[var(--color-accent)] aria-pressed:bg-[var(--color-accent)] aria-pressed:text-[var(--color-on-accent)]"
              >
                {item.label}
                <span className="numeric ml-1.5 font-normal">{item.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* The stage. Full-bleed to the gutter so neighbours peek in from both
          edges; the padding lets the first and last card centre. */}
      <div className="relative -mx-[var(--spacing-gutter)] mt-6">
        <ul
          ref={track}
          onScroll={schedule}
          className="fleet-track flex snap-x snap-mandatory overflow-x-auto py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ perspective: '1400px' }}
        >
          {classes.map((item, index) => {
            const image = SITE_IMAGES[item.image];
            return (
              <li
                key={item.id}
                className="fleet-slide shrink-0 snap-center px-2 sm:px-3"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${classes.length}: ${item.label}`}
              >
                <div
                  ref={(node) => {
                    cards.current[index] = node;
                  }}
                  className="fleet-card will-change-transform"
                  style={{
                    transform: index === 0 ? undefined : `translateZ(-160px) rotateY(-34deg)`,
                    opacity: index === 0 ? 1 : 0.6,
                  }}
                >
                  <div
                    onPointerMove={(event) => onTilt(event, index)}
                    onPointerLeave={resetTilt}
                    onClick={() => (index === active ? undefined : goTo(index))}
                    className="fleet-tilt relative overflow-hidden rounded-[1.25rem] bg-[var(--color-midnight)] shadow-[0_30px_60px_-25px_rgba(7,20,40,0.55)] aspect-square sm:aspect-[16/10] lg:aspect-[16/9]"
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 42rem, 76vw"
                      className={`fleet-image object-cover ${index === active ? 'is-active' : ''}`}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,14,24,0.92)_0%,rgba(6,14,24,0.35)_45%,rgba(6,14,24,0)_70%)]"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-[var(--color-ink-inverse)] sm:p-7">
                      <p className="text-[length:var(--text-micro)] font-semibold uppercase tracking-[0.18em] text-[#b3ceff]">
                        {item.count} types
                        {item.seats ? ` · ${item.seats} seats` : ''}
                      </p>
                      <h3 className="mt-1.5 text-[clamp(1.6rem,1.2rem+2vw,2.6rem)] font-semibold leading-tight tracking-tight">
                        {item.label}
                      </h3>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-[var(--spacing-gutter)] sm:flex">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={active === 0}
            aria-label="Previous aircraft class"
            className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[0_8px_24px_-8px_rgba(7,20,40,0.45)] transition-opacity hover:text-[var(--color-accent-strong)] disabled:opacity-0"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={active === classes.length - 1}
            aria-label="Next aircraft class"
            className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[0_8px_24px_-8px_rgba(7,20,40,0.45)] transition-opacity hover:text-[var(--color-accent-strong)] disabled:opacity-0"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Progress dots, for a phone where the arrows are hidden. */}
      <div className="flex justify-center gap-1.5 sm:hidden" aria-hidden="true">
        {classes.map((item, index) => (
          <span
            key={item.id}
            className={`h-1.5 rounded-full transition-all ${
              index === active ? 'w-6 bg-[var(--color-accent)]' : 'w-1.5 bg-[var(--color-ink)]/20'
            }`}
          />
        ))}
      </div>

      {/* The centred class. Re-keyed so it fades in fresh on every change. */}
      <div
        key={current.id}
        aria-live="polite"
        className="fleet-panel mt-6 grid gap-6 rounded-[1.25rem] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-5 sm:p-7 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10"
      >
        <div>
          <h3 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
            {current.label}
          </h3>
          <p className="mt-2 text-[var(--color-ink-muted)]">{current.description}</p>
          {current.examples.length > 0 ? (
            <p className="mt-3 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
              For example: {current.examples.join(', ')}
            </p>
          ) : null}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={`/request-a-charter?aircraft=${current.quote}`}
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 py-3 text-[length:var(--text-small)] font-semibold text-[var(--color-on-accent)] hover:bg-[var(--color-accent-strong)]"
            >
              Get a {current.singular.toLowerCase()} quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={current.listHref}
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] px-6 py-3 text-[length:var(--text-small)] font-semibold hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)]"
            >
              <List className="h-4 w-4" aria-hidden="true" />
              View all {current.count} {current.label.toLowerCase()}
            </Link>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: 'Seats', value: current.seats, sub: 'passengers' },
            { label: 'Range', value: current.range, sub: current.rangeKm },
            { label: 'Speed', value: current.speed, sub: current.speedKmh },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[var(--radius-control)] bg-[var(--color-ivory)] px-3 py-3 sm:px-4 sm:py-4"
            >
              <dt className="text-[length:var(--text-micro)] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                {stat.label}
              </dt>
              <dd className="numeric mt-1 text-[length:var(--text-small)] font-semibold leading-snug sm:text-base">
                {stat.value ?? '—'}
              </dd>
              {stat.value && stat.sub ? (
                <dd className="numeric mt-0.5 text-[length:var(--text-micro)] text-[var(--color-ink-muted)]">
                  {stat.sub}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
        <p className="text-[length:var(--text-micro)] text-[var(--color-ink-muted)] lg:col-span-2">
          Figures span the types in this class and are typical for each type. Pictures are
          illustrations.
        </p>
      </div>
    </div>
  );
}
