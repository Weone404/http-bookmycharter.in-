# 3D Architecture

## Dependency decision — React and React Three Fiber

**Installed:** `react@19.2.8`, `react-dom@19.2.8`, `@react-three/fiber@9.7.0`,
`@react-three/drei@10.7.8`, `three@0.180.x`, `next@15.5.25`.

**The constraint, read from the packages rather than assumed:**

| Package | Peer requirement |
|---|---|
| `@react-three/fiber@9.7.0` | `react >=19 <19.3`, `react-dom >=19 <19.3`, `three >=0.156` |
| `@react-three/drei@10.7.8` | `@react-three/fiber ^9.0.0`, `react ^19`, `react-dom ^19`, `three >=0.159` |
| `react-dom@19.2.8` | `react ^19.2.8` |

`react@^19.1.1` resolves to 19.3.x, which R3F 9.7.0 explicitly excludes. `npm view
@react-three/fiber@'>=9.7.0'` returns 9.7.0 as the newest published release, so there is no
forward fix: no R3F version currently accepts React 19.3.

**Decision:** pin `react` and `react-dom` to `~19.2.0`.

**Why this and not the alternatives:**

- *Upgrading R3F* — not possible. 9.7.0 is the latest release.
- *`--legacy-peer-deps` or `--force`* — installs a combination the maintainers state is
  unsupported. R3F reaches into React's reconciler internals, which is exactly the surface that
  changes between minor versions. A build that succeeds tells you nothing about whether it works.
- *Dropping to React 18* — Next.js 15 App Router expects React 19. Larger blast radius, and it
  would solve a problem that does not exist.
- *Pinning React to `~19.2.0`* — one line, keeps React 19 semantics, keeps Next.js 15 fully
  supported, keeps strict TypeScript, and satisfies every peer range in the tree with no override.

This is the smallest change that keeps all five constraints intact. It is reviewed when R3F
publishes a release accepting 19.3; until then, **do not unpin React** — it will break the 3D
layer, and it will break it at runtime rather than at build time.

## Scene architecture

Not yet implemented — step 17 of the development order. The design it will be built to:

- **One shared `<Canvas>`** for the fleet showroom. Multiple heavy WebGL contexts on one page is
  the most common way a 3D site becomes unusable on mobile.
- **Dynamically imported**, `ssr: false`, behind a `SceneLoader`. Critical HTML paints first and
  stays usable whether or not WebGL ever initialises.
- **Geometry authored in code**, not downloaded. No GLB, no Draco, no texture payload, no
  licensing exposure — and no aircraft model that misrepresents a specific type. The module stays
  swappable for real GLBs later behind the same interface, which is why aircraft records carry a
  `sceneKey` rather than a file path.
- **A central camera rig** interpolating toward target positions, driven by GSAP timelines with
  controlled damping. Per-frame work stays inside `useFrame`; nothing that belongs in the render
  loop triggers a React re-render.
- **Responsive scene configuration**: reduced complexity, smaller camera movement amplitude and
  fewer simultaneous meshes on small screens.
- **`prefers-reduced-motion`** collapses camera transitions to instant state changes. The
  showroom remains fully navigable by its HTML controls.

The fleet showroom's HTML — the aircraft list, specifications and links — exists independently of
the canvas and is what search engines and screen readers consume. The 3D layer is an enhancement
over working content, never a replacement for it.
