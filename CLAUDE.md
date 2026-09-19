# VYROVA website

Marketing site for VYROVA — website UI/UX, brand identity, SaaS animation,
explainer film, WordPress, software and video editing. Tagline: "Visuals that
move. Technology that works."
Next.js 15 App Router, TypeScript strict, Tailwind 4. Static export only.
Motion (framer-motion) is available, but CSS is the default — see the
animation rules below. That split is deliberate: it keeps the hero and
everything above the fold free of JavaScript.

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
- CSS first, Motion second. Reach for Motion only when CSS genuinely
  cannot do it: scroll-linked progress, spring physics, shared layout
  (`layout` / `layoutId`), exit animations, drag, or gesture values fed
  into style. A fade, a rise, a loop or a hover is CSS — use `<Reveal>`,
  `<Stagger>` or a keyframe, not Motion.
- Import Motion from `@/components/motion/m`, never from `motion/react`
  directly. That file re-exports the lazy `m` component set so we ship
  the small feature bundle, and it is the one place to audit usage.
- Any file importing Motion is `"use client"` and must sit below the
  fold. Motion must never appear in the bundle the hero needs (M-04).
- Wrap a Motion tree in `<MotionConfig reducedMotion="user">` at the
  section root, or read `usePrefersReducedMotion` yourself.
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
