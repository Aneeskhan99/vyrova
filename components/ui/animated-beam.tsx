"use client";

/**
 * Animated Beam — adapted from Magic UI
 * (magicui.design/docs/components/animated-beam). Vendored 2026-09-11.
 * Draws a curved SVG path between two elements and runs a light along it.
 * Positions are measured on mount and on resize only — not per frame.
 */
import { motion } from "motion/react";
import { useCallback, useEffect, useId, useState, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

type AnimatedBeamProps = {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  /** Bend of the curve, px. Negative arcs the other way. */
  curvature?: number;
  /** Seconds for one pass of the light. */
  duration?: number;
  /** Seconds to wait before the first pass. Stagger these across a diagram. */
  delay?: number;
  reverse?: boolean;
};

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  duration = 4,
  delay = 0,
  reverse = false,
}: AnimatedBeamProps) {
  const id = useId().replace(/:/g, "");
  const reduced = usePrefersReducedMotion();
  const [path, setPath] = useState("");
  const [box, setBox] = useState({ width: 0, height: 0 });

  const measure = useCallback(() => {
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;
    if (!container || !from || !to) return;

    const c = container.getBoundingClientRect();
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();

    const x1 = a.left - c.left + a.width;
    const y1 = a.top - c.top + a.height / 2;
    const x2 = b.left - c.left;
    const y2 = b.top - c.top + b.height / 2;
    const mx = (x1 + x2) / 2;

    setBox({ width: c.width, height: c.height });
    setPath(
      `M ${x1},${y1} C ${mx},${y1 - curvature} ${mx},${y2 - curvature} ${x2},${y2}`,
    );
  }, [containerRef, fromRef, toRef, curvature]);

  useEffect(() => {
    measure();
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, containerRef]);

  if (!path) return null;

  return (
    <svg
      aria-hidden="true"
      width={box.width}
      height={box.height}
      viewBox={`0 0 ${box.width} ${box.height}`}
      className="pointer-events-none absolute left-0 top-0"
      fill="none"
    >
      <path d={path} stroke="currentColor" strokeWidth={1.5} className="text-ink/10" />
      {!reduced && (
        <>
          <path d={path} strokeWidth={2} stroke={`url(#${id})`} strokeLinecap="round" />
          <defs>
            <motion.linearGradient
              id={id}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: "0%", x2: "5%", y1: "0%", y2: "0%" }}
              animate={{
                x1: reverse ? ["100%", "-5%"] : ["-5%", "100%"],
                x2: reverse ? ["105%", "0%"] : ["0%", "105%"],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "linear",
              }}
            >
              <stop stopColor="#22e5f0" stopOpacity="0" />
              <stop stopColor="#22e5f0" />
              <stop offset="1" stopColor="#008c99" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
}
