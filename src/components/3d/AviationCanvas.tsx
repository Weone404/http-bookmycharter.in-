'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ACESFilmicToneMapping } from 'three';
import type { SceneConfig } from './sceneConfig';
import { SceneLoader } from './SceneLoader';
import { SceneFallback } from './SceneFallback';
import { supportsWebGl } from './webgl';

/**
 * The single WebGL canvas.
 *
 * One `<Canvas>` per scene area, never one per aircraft card. A browser caps
 * how many live contexts it will hand out, and each one carries its own
 * renderer, render loop and GPU allocation — a grid of canvases is the fastest
 * way to make a 3D site unusable.
 *
 * Responsibilities kept here and nowhere else: context creation, device pixel
 * ratio, tone mapping, pointer capture, context-loss recovery, and the
 * Suspense boundary. Scene content is passed in.
 */
interface AviationCanvasProps {
  readonly config: SceneConfig;
  readonly ariaLabel: string;
  /**
   * Where pointer position comes from.
   *
   * `element` listens on the canvas wrapper and is right for the showroom,
   * where the canvas is the thing being interacted with. `window` also makes
   * the wrapper `pointer-events: none`, which is required in the hero: there
   * the canvas sits underneath the H1 and both CTAs, and it must never
   * intercept a click meant for them.
   */
  readonly pointerSource?: 'element' | 'window';
  readonly children: (pointerRef: { readonly current: { x: number; y: number } }) => ReactNode;
}

export function AviationCanvas({
  config,
  ariaLabel,
  pointerSource = 'element',
  children,
}: AviationCanvasProps) {
  const [capable, setCapable] = useState<boolean | null>(null);
  const [contextLost, setContextLost] = useState(false);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setCapable(supportsWebGl());
  }, []);

  /**
   * Pointer goes to a ref, never to React state. One `setState` per mousemove
   * is a re-render per mousemove; the render loop reads this ref instead and
   * the camera smooths it.
   */
  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (config.parallax === 0 || event.pointerType !== 'mouse') return;
      const bounds = event.currentTarget.getBoundingClientRect();
      pointerRef.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointerRef.current.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
    },
    [config.parallax],
  );

  useEffect(() => {
    if (pointerSource !== 'window' || config.parallax === 0) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [pointerSource, config.parallax]);

  const onPointerLeave = useCallback(() => {
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
  }, []);

  if (capable === false || contextLost) return <SceneFallback />;

  return (
    <div
      className={`absolute inset-0 ${pointerSource === 'window' ? 'pointer-events-none' : ''}`}
      {...(pointerSource === 'element'
        ? { onPointerMove, onPointerLeave }
        : {})}
    >
      {/* The fallback stays behind the canvas so there is never a blank frame
          between mount and first paint. */}
      <SceneFallback />

      {capable === true ? (
        <>
          <Canvas
            // Clamped, not device-native. On a 3x display an unclamped canvas
            // renders nine times the pixels for a difference nobody sees.
            dpr={[1, config.maxDpr]}
            shadows={config.shadows}
            camera={{ fov: 38, near: 0.5, far: 60, position: [0, 1.4, 8] }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: false,
              // Depth precision matters more here than stencil, which is unused.
              stencil: false,
            }}
            onCreated={({ gl }) => {
              gl.toneMapping = ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.04;
              const canvas = gl.domElement;
              const onLost = (event: Event) => {
                // Prevent the default so the browser will attempt restoration,
                // and drop to the fallback rather than leaving a dead canvas.
                event.preventDefault();
                setContextLost(true);
              };
              canvas.addEventListener('webglcontextlost', onLost, { passive: false });
            }}
            // The canvas carries no information of its own. Everything it shows
            // is stated in the HTML beside it, so it is hidden from assistive
            // technology rather than described to it.
            aria-hidden="true"
            role="presentation"
            style={{ touchAction: 'pan-y' }}
          >
            <Suspense fallback={null}>{children(pointerRef)}</Suspense>
          </Canvas>
          <SceneLoader />
        </>
      ) : null}

      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}
