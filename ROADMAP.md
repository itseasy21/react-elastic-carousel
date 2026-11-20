# React Elastic Carousel Roadmap

## Direction

React Elastic Carousel will be the accessible, container-responsive, RTL-ready
carousel that works out of the box. The project will prioritize reliability,
good defaults, migration safety, and a small core over visual effects.

The scoped package currently has meaningful usage, so the roadmap starts by
protecting existing users before introducing a new major version.

## Priorities

### 1. Reliable installation and imports

- Verify ESM, CommonJS, bundler, and package `exports` behavior.
- Test packed-package installs with npm, Yarn, and pnpm.
- Test supported Node and React versions using real consumer fixtures.
- Publish compatibility fixes before starting larger changes.

### 2. Accessibility by default

- Implement the WAI-ARIA carousel pattern.
- Add labelled controls, slides, current-slide state, and announcements.
- Support full keyboard operation and predictable focus management.
- Pause autoplay on focus and hover, add pause/play controls, and respect
  `prefers-reduced-motion`.
- Gate releases with automated accessibility tests.

### 3. True infinite looping

- Add seamless `loop` behavior without animating backward to index zero.
- Cover one or many visible slides, breakpoints, RTL, vertical mode, swipe,
  autoplay, dynamic children, and focus retention.

### 4. Modern React and SSR support

- Add fixtures for React 18 and 19, Strict Mode, Next.js SSR/hydration, Vite,
  and basic server rendering.
- Guard browser-only APIs and minimize hydration layout shifts.
- Document the React Server Component client boundary.

### 5. First-class TypeScript and controlled state

- Generate declarations from the implementation source.
- Export every public prop, event, breakpoint, ref, and renderer type.
- Add controlled `activeIndex`, `defaultActiveIndex`, and a stable imperative
  ref.
- Make event payloads consistent and correct existing declaration gaps.

### 6. Layout correctness and useful layouts

- Harden breakpoints, resize behavior, dynamic children, spacing, and
  `itemsToScroll` pagination.
- Cover RTL, vertical layouts, mixed content heights, and nested containers
  with visual tests.
- Add variable-width slides and auto-height after the current layout model is
  reliable.

### 7. Smooth motion

- Batch pointer movement with `requestAnimationFrame` rather than rendering
  React state for every swipe event.
- Use pointer events and transform-based movement with stable snapping and
  velocity handling.
- Define interruption behavior for resize, drag, autoplay, and programmatic
  navigation.

### 8. An unstyled, smaller core

- Remove styled-components as a required runtime peer in the next major
  version.
- Provide semantic class names and CSS custom properties with an optional
  default theme.
- Enforce bundle budgets for published entries.

### 9. Lazy and virtual rendering

- Support lazy mounting of nearby slides and optional virtualization.
- Expose visibility and preload range APIs for images, video, and expensive
  slide trees.
- Preserve accessibility and SEO for non-virtualized usage.

### 10. Documentation as the acquisition surface

- Publish project-owned docs for Next.js, Vite, TypeScript, RTL,
  accessibility, autoplay, responsive containers, and legacy migration.
- Add an interactive playground and an honest comparison with alternatives.
- Publish a support policy, issue templates, contributor tasks, and regular
  release notes.

## Delivery

### Phase 1: trust the current package

Ship priorities 1 and 2 as backward-compatible releases, along with the
highest-severity layout and typing fixes. This protects existing users and
demonstrates active maintenance.

### Phase 2: prove the next major version

Build looping, modern React and SSR fixtures, TypeScript source, and the new
motion engine behind a prerelease. Preserve the existing component API where
it remains sound.

### Phase 3: earn new adoption

Release the unstyled core, lazy and virtual rendering, modern docs, and
migration guidance. Gather production feedback before marking the release
stable.

## Guardrails

- Keep container responsiveness and RTL as first-class differentiators.
- Treat accessibility as a release gate, not an optional plugin.
- Require new features to work with loop, RTL, breakpoints, keyboard input,
  SSR, and dynamic children, or document the limitation.
- Prefer a small core and optional capabilities over a large bundle.
- Add visual effects only when usage data supports them.

## Phase 1 decision gate

Continue into the next major version when at least two signals appear:

- Weekly downloads remain stable or grow after maintenance releases.
- Legacy-package users begin migrating to the scoped package.
- Users confirm loop, accessibility, SSR, or TypeScript as adoption blockers.
- Contributors submit reproducible issues, documentation, or fixes.
- The response and release process is sustainable for maintainers.

Otherwise, keep the project in dependable maintenance mode rather than
funding a large rewrite.
