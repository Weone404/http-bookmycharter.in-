'use client';

import { useProgress } from '@react-three/drei';

/**
 * The loader.
 *
 * Restrained on purpose. If the scene is ready in 300 ms the loader is gone in
 * 300 ms — there is no minimum display time, because holding a ready page
 * behind an animation to look cinematic is a cost paid by the user for
 * nobody's benefit.
 *
 * Rendered as a plain overlay rather than inside the canvas, so it is visible
 * before WebGL initialises at all.
 */
export function SceneLoader({
  inline = false,
  tone = 'dark',
}: {
  inline?: boolean;
  tone?: 'dark' | 'light';
}) {
  const { progress, active } = useProgress();
  const shown = Math.round(progress);

  return (
    <div
      aria-hidden="true"
      className={`${inline ? 'absolute' : 'absolute'} inset-0 flex items-center justify-center ${
        tone === 'light' ? 'bg-[var(--color-ivory)]' : 'bg-[var(--color-midnight)]'
      } transition-opacity duration-500 ${
        active ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="w-[min(18rem,60vw)] text-center">
        <p
          className={`text-[length:var(--text-micro)] uppercase tracking-[0.22em] ${
            tone === 'light'
              ? 'text-[var(--color-ink-muted)]'
              : 'text-[var(--color-ink-inverse-muted)]'
          }`}
        >
          Preparing the fleet
        </p>
        <div
          className={`mt-4 h-px w-full overflow-hidden ${
            tone === 'light' ? 'bg-[var(--color-hairline-strong)]' : 'bg-white/15'
          }`}
        >
          <div
            className="h-px bg-[var(--color-accent)] transition-[width] duration-300 ease-out"
            style={{ width: `${Math.max(shown, 8)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
