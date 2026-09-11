"use client";

/**
 * The single import surface for Motion (M-07).
 *
 * Why this file exists rather than importing `motion/react` everywhere:
 *
 * 1. `LazyMotion` + the `m` component set ship ~5 KB synchronously and
 *    fetch the rest as a separate chunk after paint, instead of putting
 *    ~35 KB in front of first render. `motion.div` would defeat that, so
 *    `strict` is on in development and throws if anyone uses it.
 * 2. One file to grep when we want to know what Motion is actually
 *    costing us.
 *
 * Rule: CSS is the default. Motion is for scroll-linked progress, spring
 * physics, shared layout, exit animations and drag — nothing else.
 */

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * `domMax` over `domAnimation` because we use `layout` on the week strip.
 * It is a dynamic import either way, so the difference is chunk size
 * after paint, not blocking bytes.
 */
const loadFeatures = () =>
  import("motion/react").then((mod) => mod.domMax);

type MotionStageProps = {
  children: ReactNode;
};

/**
 * Wrap any section that uses `m.*`. Handles feature loading and honours
 * the OS reduced-motion setting for every descendant at once (M-05), so
 * individual components do not each have to check it.
 */
export function MotionStage({ children }: MotionStageProps) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

export { m, AnimatePresence } from "motion/react";
export {
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useInView,
} from "motion/react";
export { EASE_OUT, EASE_IN_OUT, DURATION } from "@/lib/motion";
