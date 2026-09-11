"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * M-06. Wrap anything that loops forever — marquees, orbits, beams.
 * Sets data-paused when off-screen; globals.css stops every CSS
 * animation inside. Four infinite loops running behind the footer is a
 * real battery cost for nothing.
 */
export function PauseOffscreen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px" });

  return (
    <div ref={ref} data-paused={!inView} className={className}>
      {children}
    </div>
  );
}
