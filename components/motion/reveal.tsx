"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { DURATION, EASE_OUT, RISE } from "@/lib/motion";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait after the element enters view. */
  delay?: number;
  /** Pixels to travel. Pass 0 for a pure fade. */
  y?: number;
  className?: string;
};

/**
 * M-03. The only scroll entrance in the site. Never hand-roll an
 * IntersectionObserver in a section file — use this instead.
 * Below the fold only: above-the-fold content uses the CSS `.fw-rise`
 * classes so it does not depend on JavaScript (M-04).
 */
export function Reveal({ children, delay = 0, y = RISE, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: DURATION.base, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
