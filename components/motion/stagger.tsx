"use client";

import { motion, useInView } from "motion/react";
import { Children, useRef, type ReactNode } from "react";
import { DURATION, EASE_OUT, RISE } from "@/lib/motion";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

type StaggerProps = {
  children: ReactNode;
  /** Seconds between each child. */
  step?: number;
  className?: string;
  /** Class applied to every generated child wrapper. */
  itemClassName?: string;
};

/**
 * M-03. Reveals children one after another. Use for lists, grids and
 * card rows rather than giving each card its own Reveal with a
 * hand-tuned delay.
 */
export function Stagger({ children, step = 0.07, className, itemClassName }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = usePrefersReducedMotion();
  const items = Children.toArray(children);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {items.map((child, i) => (
          <div key={i} className={itemClassName}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <motion.div
          key={i}
          className={itemClassName}
          initial={{ opacity: 0, y: RISE }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: RISE }}
          transition={{ duration: DURATION.base, ease: EASE_OUT, delay: i * step }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
