'use client';

import { useEffect, useLayoutEffect, useState, type RefObject } from 'react';

/**
 * Shared behaviour for the booking form's popovers — airport list, calendar
 * and time list.
 *
 * Two things every one of them needs, and both were learned the hard way on
 * the airport list:
 *
 * 1. Open towards whichever side has room. Always opening downward cut the
 *    list in half at the bottom of the hero, and the same failure waits at
 *    the bottom of any screen and on every phone, where the on-screen
 *    keyboard takes half the viewport. Space is measured against the visual
 *    viewport, which excludes the keyboard.
 * 2. Close on a pointer-down anywhere outside. Pointerdown rather than
 *    click, so the popover is already gone before a click on the page behind
 *    it resolves.
 *
 * Layout effect, so the flip happens before paint rather than as a visible
 * jump; state is written only when the answer changes, so scrolling with a
 * popover open does not re-render on every scroll event.
 */
export interface PopoverPlacement {
  readonly up: boolean;
  readonly maxHeight: number;
}

/** Clearance from the viewport edge, including the 8px offset from the field. */
const EDGE_GAP = 16;
/** Never shorter than this, even in a tight spot. */
const MIN_HEIGHT = 120;

export function usePopover({
  open,
  onClose,
  anchor,
  container,
  popover,
  preferredHeight,
}: {
  readonly open: boolean;
  readonly onClose: () => void;
  /** The element the popover opens from — usually the field itself. */
  readonly anchor: RefObject<HTMLElement | null>;
  /** Everything that counts as "inside": the field, the popover, the label. */
  readonly container: RefObject<HTMLElement | null>;
  /** The popover itself, so its real content height can be measured. */
  readonly popover: RefObject<HTMLElement | null>;
  /** The tallest the popover should ever be; taller content scrolls. */
  readonly preferredHeight: number;
}): PopoverPlacement {
  const [placement, setPlacement] = useState<PopoverPlacement>({
    up: false,
    maxHeight: preferredHeight,
  });

  useLayoutEffect(() => {
    if (!open) return;
    const measure = () => {
      const node = anchor.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vv = window.visualViewport;
      const top = vv ? vv.offsetTop : 0;
      const bottom = vv ? vv.offsetTop + vv.height : window.innerHeight;
      const below = bottom - rect.bottom - EDGE_GAP;
      const above = rect.top - top - EDGE_GAP;
      // What the popover actually needs, measured from its content rather
      // than assumed. The first rule here flipped only when there was under
      // 200px below — so with 331px below, a 378px calendar opened downward,
      // was capped, and scrolled its own Today / Tomorrow row out of sight.
      // Now: down if it fits below, up if it fits above, otherwise whichever
      // side has more room.
      const natural = popover.current?.scrollHeight ?? preferredHeight;
      const needs = Math.min(natural, preferredHeight);
      const up = below >= needs ? false : above >= needs ? true : above > below;
      const room = up ? above : below;
      const maxHeight = Math.max(MIN_HEIGHT, Math.min(preferredHeight, Math.floor(room)));
      setPlacement((current) =>
        current.up === up && current.maxHeight === maxHeight ? current : { up, maxHeight },
      );
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true, capture: true });
    window.visualViewport?.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, { capture: true });
      window.visualViewport?.removeEventListener('resize', measure);
    };
  }, [open, anchor, popover, preferredHeight]);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) onClose();
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open, onClose, container]);

  return placement;
}

/** Positioning classes for a popover given its placement. */
export function popoverSide(placement: PopoverPlacement): string {
  return placement.up ? 'bottom-full mb-2' : 'top-full mt-2';
}
