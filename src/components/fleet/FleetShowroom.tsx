'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FLEET_SCENE, type FleetSceneItem } from '@/data/fleet-scene';
import { formatRange } from '@/data/aircraft';
import { AIRCRAFT_SPEC_SOURCE } from '@/data/aircraft.generated';
import dynamic from 'next/dynamic';
import { useFleetCamera } from '@/components/3d/useFleetCamera';
import { useSceneConfig } from '@/components/3d/useSceneConfig';

/**
 * Only the WebGL layer is client-only. Everything else in this component —
 * panel, controls, aircraft list, source note — renders on the server, where a
 * crawler and a reader without JavaScript can see it.
 */
const FleetCanvas = dynamic(() => import('./FleetCanvas'), {
  ssr: false,
  loading: () => null,
});

const CATEGORY_LABEL: Record<string, string> = {
  helicopter: 'Helicopter',
  'private-jet': 'Private jet',
  turboprop: 'Turboprop',
  'executive-airliner': 'Regional aircraft',
  'group-charter': 'Group aircraft',
};

/**
 * The fleet showroom.
 *
 * `useFleetCamera` owns the active index. The camera rig reads it through a
 * ref, the panel below reads it through state, and GSAP cross-fades the panel
 * when it changes. Nothing keeps a second copy, so the camera and the text
 * cannot disagree about which aircraft is selected.
 *
 * Division of labour, stated once and enforced by where the code lives:
 *   useFrame -> continuous spatial interpolation (camera, scale, float)
 *   GSAP     -> the HTML panel's cross-fade
 *   Neither writes a property the other touches.
 *
 * The specification list renders only fields that exist. An aircraft with no
 * recorded range shows no range row — it does not show a dash where a number
 * should be, and it certainly does not show an estimate.
 */
export function FleetShowroom() {
  const { config, reducedMotion } = useSceneConfig();
  const fleet = useFleetCamera(FLEET_SCENE.length);
  const { index, next, previous, goTo, indexRef, transitionKey } = fleet;

  const rootRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);

  const item = FLEET_SCENE[index];

  /**
   * Panel cross-fade.
   *
   * A `gsap.context` scoped to the panel, reverted on every re-run and on
   * unmount. Reverting kills the tweens and restores inline styles, which is
   * what stops a rapid sequence of clicks from leaving half-faded text behind
   * or stacking competing timelines on the same element.
   */
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    if (reducedMotion) {
      // Nothing to animate, and no reason to fetch an animation library.
      for (const element of node.querySelectorAll<HTMLElement>('[data-fleet-fade]')) {
        element.style.opacity = '1';
        element.style.transform = 'none';
      }
      return;
    }

    let context: { revert: () => void } | undefined;
    let cancelled = false;

    // GSAP is imported here rather than at module scope. Server-rendering the
    // showroom put it in the route's initial bundle and pushed First Load JS
    // from 108 kB to 148 kB; loading it at the moment of the first transition
    // keeps the critical path where it was. GSAP still owns the HTML
    // choreography — only when it arrives changed.
    void import('gsap').then(({ default: gsap }) => {
      if (cancelled) return;
      context = gsap.context(() => {
        gsap
          .timeline()
          .fromTo(
            '[data-fleet-fade]',
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.06 },
          );
      }, node);
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [transitionKey, reducedMotion]);

  /** Arrow keys when the showroom has focus. Not a global listener. */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        next();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        previous();
      } else if (event.key === 'Home') {
        event.preventDefault();
        goTo(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        goTo(FLEET_SCENE.length - 1);
      }
    },
    [next, previous, goTo],
  );

  /**
   * Horizontal drag and swipe.
   *
   * Only horizontal intent advances the fleet, and vertical movement is left
   * entirely alone — `touch-action: pan-y` on the canvas means a vertical
   * swipe scrolls the page as it should. Nothing here calls preventDefault on
   * a touch move.
   */
  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
  }, []);

  const onPointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const start = dragStart.current;
      dragStart.current = null;
      if (start === null) return;
      const travel = event.clientX - start;
      const threshold = 48;
      if (travel <= -threshold) next();
      else if (travel >= threshold) previous();
    },
    [next, previous],
  );

  if (!item) return null;

  const specs: { label: string; value: string }[] = [];
  const passengers = formatRange(item.aircraft.specs.passengers);
  const range = formatRange(item.aircraft.specs.rangeNm, 'nm');
  const cruise = formatRange(item.aircraft.specs.cruiseKts, 'kts');
  if (passengers) specs.push({ label: 'Passengers', value: passengers });
  if (range) specs.push({ label: 'Range', value: range });
  if (cruise) specs.push({ label: 'Cruise', value: cruise });

  return (
    <div
      ref={rootRef}
      className="on-dark relative isolate overflow-hidden bg-[var(--color-midnight)]"
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragStart.current = null;
      }}
      tabIndex={0}
      role="group"
      aria-roledescription="Fleet browser"
      aria-label="Browse aircraft. Use the previous and next buttons, or the left and right arrow keys."
    >
      <div className="relative h-[17rem] sm:h-[22rem] xl:h-[clamp(26rem,58vh,40rem)]">
        <FleetCanvas activeIndex={index} indexRef={indexRef} config={config} />

        {/* Glass panel, over the canvas from lg up only. Restrained: one
            surface, not a page of them. */}
        <div className="site-frame pointer-events-none absolute inset-x-0 bottom-0 hidden pb-[var(--spacing-gutter)] xl:block">
          <div className="pointer-events-auto max-w-[34rem] rounded-[var(--radius-card)] border border-white/12 bg-[var(--color-midnight-950)]/65 p-6 text-[var(--color-ink-inverse)] backdrop-blur-md sm:p-7">
            <FleetPanel item={item} specs={specs} />
          </div>
        </div>

        {/* Controls. Real buttons: keyboard-reachable, labelled, focus-visible. */}
        <div className="absolute right-[var(--spacing-gutter)] top-[var(--spacing-gutter)] flex gap-2">
          <button
            type="button"
            onClick={previous}
            disabled={index === 0}
            aria-label="Previous aircraft"
            className="rounded-[var(--radius-control)] border border-white/20 bg-[var(--color-midnight-950)]/60 p-3 text-[var(--color-ink-inverse)] backdrop-blur-sm transition-colors hover:border-[var(--color-accent)] disabled:opacity-35"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index === FLEET_SCENE.length - 1}
            aria-label="Next aircraft"
            className="rounded-[var(--radius-control)] border border-white/20 bg-[var(--color-midnight-950)]/60 p-3 text-[var(--color-ink-inverse)] backdrop-blur-sm transition-colors hover:border-[var(--color-accent)] disabled:opacity-35"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile and tablet: the same panel, in the flow below the scene, so
          the aircraft is never hidden behind it. */}
      <div className="site-frame pb-7 pt-6 text-[var(--color-ink-inverse)] xl:hidden">
        <FleetPanel item={item} specs={specs} />
      </div>

      {/* The aircraft list. This is the authoritative text layer: it is in the
          server-rendered HTML, it is crawlable, and it works with WebGL off. */}
      <div className="border-t border-white/10">
        <div className="site-frame py-5">
          <ul className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Aircraft in this showroom">
            {FLEET_SCENE.map((entry, entryIndex) => (
              <li key={entry.slug}>
                <button
                  type="button"
                  onClick={() => goTo(entryIndex)}
                  aria-current={entryIndex === index ? 'true' : undefined}
                  className={`text-[length:var(--text-small)] transition-colors ${
                    entryIndex === index
                      ? 'font-medium text-[var(--color-accent)]'
                      : 'text-[var(--color-ink-inverse-muted)] hover:text-[var(--color-ink-inverse)]'
                  }`}
                >
                  {entry.name}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[length:var(--text-micro)] text-[var(--color-ink-inverse-muted)]">
            Figures are typical for each type and vary with variant, options, weight, altitude and
            temperature. Source: {AIRCRAFT_SPEC_SOURCE.document}. The three-dimensional shapes are
            representative of each aircraft class and are not scale models of individual types.
          </p>
        </div>
      </div>
    </div>
  );
}

interface PanelSpec {
  readonly label: string;
  readonly value: string;
}

/**
 * The content panel.
 *
 * Rendered twice — over the canvas on large screens, below it on small ones —
 * and only one is visible at a time. Both carry `data-fleet-fade`, and the
 * GSAP context is scoped to the showroom root rather than to one panel, so the
 * cross-fade works at every breakpoint without duplicated animation code.
 */
function FleetPanel({
  item,
  specs,
}: {
  readonly item: FleetSceneItem;
  readonly specs: readonly PanelSpec[];
}) {
  return (
    <>
      <p
        data-fleet-fade
        className="text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-[var(--color-accent)]"
      >
        {CATEGORY_LABEL[item.category] ?? item.category}
      </p>
      <h3
        data-fleet-fade
        className="mt-2 text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight"
      >
        {item.name}
      </h3>
      <p
        data-fleet-fade
        className="mt-3 text-[length:var(--text-small)] text-[var(--color-ink-inverse-muted)]"
      >
        {item.aircraft.curated?.summary}
      </p>

      {specs.length > 0 ? (
        <dl data-fleet-fade className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-ink-inverse-muted)]">
                {spec.label}
              </dt>
              <dd className="numeric mt-1 font-medium">{spec.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div data-fleet-fade className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href={item.aircraft.href}
          className="text-[length:var(--text-small)] font-medium text-[var(--color-accent)] underline underline-offset-4"
        >
          About the {item.name}
        </Link>
        <Link
          href="/request-a-charter"
          className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-[var(--color-accent)] px-5 py-2.5 text-[length:var(--text-small)] font-semibold uppercase tracking-[0.08em] text-[var(--color-on-accent)]"
        >
          Request a Charter
        </Link>
      </div>
    </>
  );
}
