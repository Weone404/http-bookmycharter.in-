/**
 * What the scene area shows when WebGL is unavailable.
 *
 * Not a video, not an image of a 3D scene, and not an apology. The page's
 * content, navigation and CTAs are HTML and are unaffected; this fills the
 * space the canvas would have occupied with something that belongs there.
 *
 * A Server Component — it has no interactivity and should cost nothing.
 */
export function SceneFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-[var(--color-midnight)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_35%,rgba(22,184,212,0.16),transparent_62%)]" />
      {/* A horizon line and an altitude grid: enough to read as an aviation
          surface, costing two gradients and no JavaScript. */}
      <div className="absolute inset-x-0 bottom-[38%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div
        className="absolute inset-x-0 bottom-0 h-[38%] opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f5f7f4 1px, transparent 1px), linear-gradient(to top, #f5f7f4 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      />
    </div>
  );
}
