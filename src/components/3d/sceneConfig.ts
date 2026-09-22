/**
 * Scene configuration by viewport class.
 *
 * Mobile is not the desktop scene scaled down. It is a deliberately different
 * composition: fewer aircraft in world space, the camera closer, less travel
 * between stops, and smaller motion amplitude. The experience stays 3D because
 * the reason to reduce it is measured performance, not screen width.
 */
export type ViewportClass = 'mobile' | 'tablet' | 'desktop';

export interface SceneConfig {
  /** Distance along the X axis between adjacent aircraft in world space. */
  readonly spacing: number;
  /** Camera offset from the focused aircraft: [x, y, z]. */
  readonly cameraOffset: readonly [number, number, number];
  /**
   * Where the camera aims, relative to the aircraft: [x, y].
   *
   * A negative x aims left of the aircraft, which pushes the aircraft into the
   * right of the frame and leaves the left clear for the content panel. On
   * mobile the panel sits below the canvas, so the aircraft is centred.
   */
  readonly lookOffset: readonly [number, number];
  /** How far the camera lifts and pulls back while travelling between stops. */
  readonly travelArc: number;
  /** Seconds for the camera to converge on a new target. */
  readonly settle: number;
  /** Aircraft rendered either side of the active one. Others are culled. */
  readonly neighbours: number;
  /** Device pixel ratio ceiling. The single largest GPU cost lever there is. */
  readonly maxDpr: number;
  /** Amplitude of the idle float on the active aircraft, in world units. */
  readonly floatAmplitude: number;
  /** Pointer parallax influence, 0 disables it. */
  readonly parallax: number;
  readonly shadows: boolean;
  /**
   * Where the hero aircraft sits, per viewport.
   *
   * This was a single hard-coded position tuned at 1440px. On a phone it put
   * the aircraft off the right edge, so the mobile hero rendered a canvas with
   * nothing visible in it.
   */
  readonly heroPlacement: {
    readonly position: readonly [number, number, number];
    readonly scale: number;
    readonly yaw: number;
  };
}

const DESKTOP: SceneConfig = {
  spacing: 14,
  cameraOffset: [0.4, 1.7, 11.6],
  lookOffset: [-3.4, 0.2],
  travelArc: 1.5,
  settle: 1.1,
  neighbours: 2,
  maxDpr: 1.75,
  floatAmplitude: 0.07,
  parallax: 0.5,
  shadows: true,
  heroPlacement: { position: [3.1, -0.15, -1.4], scale: 0.72, yaw: -0.62 },
};

const TABLET: SceneConfig = {
  spacing: 12,
  cameraOffset: [0.3, 1.6, 11.2],
  lookOffset: [-1.6, 0.2],
  travelArc: 1.1,
  settle: 1,
  neighbours: 1,
  maxDpr: 1.5,
  floatAmplitude: 0.05,
  parallax: 0.3,
  shadows: true,
  heroPlacement: { position: [1.7, -0.5, -2.6], scale: 0.62, yaw: -0.58 },
};

const MOBILE: SceneConfig = {
  spacing: 10,
  cameraOffset: [0, 1.4, 10.4],
  lookOffset: [0, 0.15],
  travelArc: 0.6,
  settle: 0.9,
  neighbours: 1,
  maxDpr: 1.25,
  floatAmplitude: 0.035,
  // Pointer parallax is meaningless on touch and costs frame time.
  parallax: 0,
  shadows: false,
  // Centred and low, so it sits behind the copy rather than beside it.
  heroPlacement: { position: [0.5, -1.5, -4.2], scale: 0.5, yaw: -0.48 },
};

const BY_CLASS: Record<ViewportClass, SceneConfig> = {
  desktop: DESKTOP,
  tablet: TABLET,
  mobile: MOBILE,
};

/**
 * Reduced motion is not a smaller version of the animation. Travel arc, idle
 * float and parallax go to zero, and the camera settles almost immediately, so
 * the scene becomes a series of still compositions that still communicate
 * exactly the same thing.
 */
export function sceneConfigFor(viewport: ViewportClass, reducedMotion: boolean): SceneConfig {
  const base = BY_CLASS[viewport];
  if (!reducedMotion) return base;
  return {
    ...base,
    travelArc: 0,
    settle: 0.18,
    floatAmplitude: 0,
    parallax: 0,
  };
}

export function viewportClassFor(width: number): ViewportClass {
  if (width < 768) return 'mobile';
  if (width < 1280) return 'tablet';
  return 'desktop';
}
