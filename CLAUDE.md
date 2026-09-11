# FrameWell website

Marketing site for FrameWell, a SaaS animation and development studio.
Next.js 15 App Router, TypeScript strict, Tailwind 4. Static export only.
No animation library: every effect is CSS, driven where needed by a small
IntersectionObserver or a throttled scroll listener.

## Hard rules

- Static export. No route handlers, server actions, middleware, ISR or
  next/image optimisation. The build must run with `output: 'export'`.
- Never edit files in `components/ui/` except to replace a hard-coded
  colour with a token. Wrap instead.
- No copy in JSX. All text lives in `content/site/*.ts`.
- No arbitrary Tailwind values. `text-accent`, never `text-[#008C99]`.
- No `any`. Strict TypeScript.
- `"use client"` goes on the smallest component that needs it, never on
  a page or layout file.
- Animate only transform and opacity.
- All animation timing comes from `lib/motion.ts`. No inline durations.
- Do not add an animation library. If an effect seems to need one, it
  almost certainly does not — check how Reveal, ContainerScroll and
  AnimatedBeam do it first.
- Scroll entrances use `<Reveal>`. Never write an IntersectionObserver
  in a section file.
- Every animation respects `usePrefersReducedMotion`.
- Infinite loops pause when off-screen — wrap them in `<PauseOffscreen>`.
- Nothing above the fold starts at opacity 0. The hero uses CSS entrance
  animations so it is visible without JavaScript.

## Structure

- `app/` pages compose sections and export metadata. Nothing else.
- `components/ui/` vendored, untouched.
- `components/motion/` our animation wrappers.
- `components/sections/<page>/<section>.tsx` one section per file.
- `content/site/` typed copy.
- `lib/` motion tokens, utils, SEO helpers.

## Adding a 21st.dev component

1. Copy the source into `components/ui/` unchanged.
2. Add a header comment: source URL and today's date.
3. Replace hard-coded colours with tokens. Change nothing else.
4. If behaviour needs changing, wrap it in `components/motion/`.

## Before you say a section is done

Check responsive at 1440 / 768 / 390, reduced motion, keyboard focus,
zero layout shift, and the budget: LCP < 2.0s, CLS < 0.05,
first-load JS < 180 KB on home.

## Commits

Conventional commits. One section per branch: `feat/home-hero`.
