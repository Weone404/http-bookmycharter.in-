# 3D Architecture

## Dependency decision — React and React Three Fiber

**Installed:** `react@19.2.8`, `react-dom@19.2.8`, `@react-three/fiber@9.7.0`,
`@react-three/drei@10.7.8`, `three@0.180.x`, `gsap@3.13.x`, `next@15.5.25`.

**The constraint, read from the packages rather than assumed:**

| Package | Peer requirement |
|---|---|
| `@react-three/fiber@9.7.0` | `react >=19 <19.3`, `react-dom >=19 <19.3`, `three >=0.156` |
| `@react-three/drei@10.7.8` | `@react-three/fiber ^9.0.0`, `react ^19`, `react-dom ^19`, `three >=0.159` |
| `react-dom@19.2.8` | `react ^19.2.8` |

`react@^19.1.1` resolves to 19.3.x, which R3F 9.7.0 explicitly excludes. `npm view
@react-three/fiber@'>=9.7.0'` returns 9.7.0 as the newest published release, so there is no
forward fix.

**Decision:** pin `react` and `react-dom` to `~19.2.0`.

- *Upgrading R3F* — not possible; 9.7.0 is the latest release.
- *`--legacy-peer-deps` / `--force`* — installs a combination the maintainers exclude. R3F reaches
  into React's reconciler internals, which is exactly what changes between minor versions. A build
  that succeeds proves nothing about runtime.
- *React 18* — Next.js 15 App Router expects React 19. Larger blast radius for a problem that does
  not exist.
- *Pin to `~19.2.0`* — one line, keeps React 19 semantics, Next.js 15 support, strict TypeScript
  and a fully satisfied peer tree with no override.

**No new dependencies were added for step 17.** Three.js, R3F, drei and GSAP were already
installed. No post-processing package, no physics, no state library, no `@gsap/react`.

Reviewed when R3F publishes a release accepting 19.3. Until then **do not unpin React** — it breaks
the 3D layer at runtime, not at build time.

## Component architecture

```
src/components/3d/
├── AviationCanvas.tsx      the single <Canvas>: context, DPR, tone mapping,
│                           pointer capture, context-loss recovery, Suspense
├── HeroCanvas.tsx          entry point for the hero (default export, dynamic)
├── HeroVisual.tsx          dynamic(ssr:false) wrapper used by the home page
├── HeroScene.tsx           hero contents: one aircraft, scroll-linked depth
├── FleetScene.tsx          fleet world: layout, culling window, rig mount
├── CameraRig.tsx           the only thing that moves the camera
├── AircraftModel.tsx       one aircraft: GLB path or procedural form
├── SceneEnvironment.tsx    lights and ground, anchored to the active stop
├── SceneLoader.tsx         useProgress overlay
├── SceneFallback.tsx       no-WebGL / context-lost surface (Server Component)
├── useFleetCamera.ts       single source of truth for the active index
├── useSceneConfig.ts       viewport class + reduced-motion, live
├── sceneConfig.ts          per-viewport configuration and the reduced-motion map
├── webgl.ts                capability probe
└── geometry/
    ├── materials.ts        four shared materials for the whole scene
    └── AircraftForms.tsx   jet, helicopter, turboprop, airliner forms

src/components/fleet/
├── FleetShowroom.tsx       HTML UI + canvas, synchronised
└── FleetShowroomMount.tsx  dynamic(ssr:false) wrapper used by /aircraft

src/data/fleet-scene.ts     scene items derived from the aircraft data
```

## Canvas strategy

One `<Canvas>` per scene area — the hero has one, the showroom has one, and there is never one per
aircraft card. Browsers cap live WebGL contexts and each carries its own renderer, render loop and
GPU allocation.

Both are loaded through `next/dynamic` with `ssr: false`, so the entire WebGL runtime is outside
the server response and outside each route's initial JavaScript. Measured effect on First Load JS:
`/` 108 kB → 109 kB, `/aircraft` 106 kB → 108 kB, with Three.js in separate lazily-fetched chunks.

`dpr` is clamped (1.25 mobile, 1.5 tablet, 1.75 desktop). On a 3× display an unclamped canvas
renders nine times the pixels for a difference nobody sees; this is the single largest GPU lever in
the scene.

## Model strategy

`AircraftModel` has two paths, chosen by data:

- `modelPath` set → `useGLTF(path, true)`, the Draco decoder path
- `modelPath` null → the procedural form for the aircraft's category

**Every entry is currently `null`.** No licensed GLB exists for this project
(docs/BUSINESS-DATA-REQUIRED G), so no GLB, no Draco asset and no texture is shipped or fetched.
The GLB branch is written and typed so that adding assets is a data change rather than a component
rewrite; **it has not been exercised**, and the step-17 report says so.

The procedural forms are deliberately *representative of a class* — business jet, light twin
helicopter, turboprop, regional airliner — and not reproductions of named types. A procedurally
modelled "Gulfstream G550" that is not a G550 is a fabricated depiction, the same error class as a
fabricated specification. The showroom states this on the page.

Cost: primitive geometries only, low segment counts, **four shared materials for the entire
scene**, and no textures at all. Material count is a shader-program count, so adding aircraft adds
geometry but not shaders.

## Camera architecture

One rig. `CameraRig` is the only code that writes `camera.position` or calls `camera.lookAt`.

`useFleetCamera` owns the active index — React state for the HTML, mirrored into a ref for the
render loop. The camera rig, the content panel and the aircraft focus state all read that one
value, which is what prevents camera state and UI state from drifting apart.

Convergence is exponential smoothing on a preallocated vector, frame-rate independent
(`1 - exp(-λ·dt)`), with `dt` clamped to 1/30 s so a tab returning from the background cannot
teleport the camera. `lookOffset` aims the camera left of the aircraft on large screens, which
places the aircraft in the right of the frame and leaves the left clear for the content panel.

## GSAP and R3F responsibility

| System | Owns | Never touches |
|---|---|---|
| `useFrame` | camera position and look target, aircraft scale and vertical float, hero drift and scroll depth | any HTML property |
| GSAP | the content panel's cross-fade (opacity, y) | anything in the 3D scene |
| Framer Motion | not used in the 3D layer | — |

No property is written by two systems. GSAP is deliberately **not** used on the camera: two
systems writing `camera.position` is how a camera starts fighting itself, and the symptom — jitter
under rapid input — is unpleasant to diagnose.

The GSAP work runs inside a `gsap.context()` scoped to the showroom root and reverted on every
re-run and on unmount, which kills tweens and restores inline styles. That is what stops a rapid
sequence of clicks from stacking competing timelines or leaving half-faded text behind.

## Loading and failure

`SceneLoader` uses drei's `useProgress` and fades out the moment loading finishes. There is no
minimum display time: holding a ready page behind an animation is a cost paid by the user for
nobody's benefit.

`SceneFallback` is a Server Component with no JavaScript, rendered in three situations: as
`next/dynamic`'s `loading` state, when `supportsWebGl()` returns false, and when the canvas emits
`webglcontextlost`. It sits behind the canvas at all times, so there is never a blank frame. It is
not a video and not a picture of a 3D scene.

In every case the page's H1, copy, CTAs, specifications and links are unaffected — they are
server-rendered HTML.

## Responsive behaviour

| | spacing | camera offset | look offset | travel arc | neighbours | max DPR | shadows | parallax |
|---|---|---|---|---|---|---|---|---|
| Mobile (<768) | 10 | 0, 1.4, 10.4 | 0, 0.15 | 0.6 | 1 | 1.25 | off | 0 |
| Tablet (768–1279) | 12 | 0.3, 1.6, 11.2 | −1.6, 0.2 | 1.1 | 1 | 1.5 | on | 0.3 |
| Desktop (≥1280) | 14 | 0.4, 1.7, 11.6 | −3.4, 0.2 | 1.5 | 2 | 1.75 | on | 0.5 |

Mobile is a different composition, not a scaled-down desktop one: fewer aircraft mounted, camera
closer, shorter travel, no shadow pass, no pointer parallax (meaningless on touch and it costs
frame time), and the content panel moves **below** the canvas instead of over it — over it, on a
phone, covered the entire scene.

Aircraft outside the `neighbours` window are not mounted at all. Culling by not mounting is cheaper
than culling in the renderer.

## Reduced motion

`sceneConfigFor(viewport, true)` zeroes `travelArc`, `floatAmplitude` and `parallax` and cuts
`settle` to 0.18 s, at every viewport class. The scene becomes a series of still compositions that
communicate exactly the same thing, and every control keeps working.

Verified by executing the configuration directly:

```
mobile   reduced=true  travelArc=0 float=0 parallax=0 settle=0.18
tablet   reduced=true  travelArc=0 float=0 parallax=0 settle=0.18
desktop  reduced=true  travelArc=0 float=0 parallax=0 settle=0.18
viewport classing: 320,375,767=mobile · 768,1279=tablet · 1280,1920=desktop
```

## Performance rules

- Nothing in `useFrame` allocates. Vectors and working state are preallocated in refs.
- No `useFrame` callback sets React state.
- Pointer position goes to a ref, never to state — one `setState` per mousemove is one re-render
  per mousemove.
- Scroll is read in a `passive` listener into a ref and consumed in the loop. No scroll hijacking,
  no pinning; the page scrolls normally.
- `touch-action: pan-y` on the canvas: horizontal drag browses the fleet, vertical swipe scrolls
  the page. No `preventDefault` on touch.
- No environment map. drei's `Environment` presets fetch an HDR from a third-party CDN — a network
  dependency and a payload this scene does not need.
- No post-processing package. The look comes from three lights, ACES tone mapping, fog and the
  material set.
- One shadow-casting light. Ground and key light are anchored to the active stop so the shadow map
  stays tight instead of stretching across an 84-unit world.
- Mobile skips the shadow pass entirely.

## Accessibility

The canvas carries no information: it is `aria-hidden` with `role="presentation"`, and a
screen-reader-only sentence beside it says so and points at the text. Everything the scene shows —
aircraft names, categories, capacity, range, cruise speed, links — is server-rendered HTML in the
same section.

Fleet navigation is real `<button>` elements with labels and disabled states, plus an aircraft list
where every entry is a button carrying `aria-current`. Arrow keys, Home and End work when the
showroom has focus (scoped to the component, not a global listener). Focus remains visible via the
sitewide `:focus-visible` rule.

## Known limitations

- **The GLB path is untested.** It compiles and is typed; no asset has been loaded through it.
- **Forms are representative, not accurate.** They are not scale models of the named types, and the
  page says so.
- **No frame-rate figure from real hardware.** Measurements were taken under a software rasteriser
  (SwiftShader) in headless Chromium, which bounds the JavaScript side of the loop and says nothing
  about GPU performance. Mac, Windows, Android and iPhone testing is outstanding.
- **No Lighthouse run.** Bundle figures are from the build; Core Web Vitals have not been measured
  against a deployment.
- **Only Chromium tested.** Safari and Firefox are outstanding.
- **Hero and showroom only.** Aircraft detail, route visualisation and charter-experience scenes are
  not built; the canvas, rig, materials and forms are structured to be reused by them.
