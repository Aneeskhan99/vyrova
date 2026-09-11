"use client";

/**
 * Container Scroll — adapted from Aceternity UI
 * (ui.aceternity.com/components/container-scroll-animation)
 * Vendored 2026-09-11. The screen tilts flat as the section scrolls past.
 */
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

export function ContainerScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.45], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.92, 1]);

  if (reduced) {
    return (
      <div ref={ref} className="[perspective:1400px]">
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className="[perspective:1400px]">
      <motion.div style={{ rotateX, scale, transformOrigin: "50% 0%" }}>
        {children}
      </motion.div>
    </div>
  );
}
