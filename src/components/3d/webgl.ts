/**
 * WebGL capability probe.
 *
 * Called once before mounting a canvas. A context that cannot be created is a
 * normal outcome — disabled hardware acceleration, a blocked extension, a
 * locked-down browser, a GPU blocklist — and the page has to stay fully usable
 * in that case, not show a blank hero.
 */
export function supportsWebGl(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl');
    if (!context) return false;
    // Release the probe context immediately; browsers cap how many exist.
    const lose = (context as WebGLRenderingContext).getExtension('WEBGL_lose_context');
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}
