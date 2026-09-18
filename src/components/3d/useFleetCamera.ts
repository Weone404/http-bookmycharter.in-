'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * THE SINGLE SOURCE OF TRUTH for which aircraft is active.
 *
 * One hook owns the index. The camera rig reads it, the HTML panel reads it,
 * the aircraft focus state reads it. Nothing else may hold its own copy, which
 * is what stops camera state and UI state from drifting apart.
 *
 * The index lives in React state because the HTML has to re-render when it
 * changes. It is mirrored into a ref so the render loop can read it without
 * subscribing, and so `useFrame` never causes a re-render.
 */
export interface FleetCameraApi {
  readonly index: number;
  readonly count: number;
  readonly indexRef: { readonly current: number };
  readonly goTo: (index: number) => void;
  readonly next: () => void;
  readonly previous: () => void;
  /** Monotonic counter, incremented on every change. Drives GSAP re-runs. */
  readonly transitionKey: number;
}

export function useFleetCamera(count: number): FleetCameraApi {
  const [index, setIndex] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      const clamped = Math.max(0, Math.min(count - 1, next));
      setIndex((current) => {
        if (current === clamped) return current;
        setTransitionKey((key) => key + 1);
        return clamped;
      });
    },
    [count],
  );

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const previous = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  return useMemo(
    () => ({ index, count, indexRef, goTo, next, previous, transitionKey }),
    [index, count, goTo, next, previous, transitionKey],
  );
}
