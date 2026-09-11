"use client";

/**
 * Animated Beam — adapted from Magic UI
 * (magicui.design/docs/components/animated-beam). Vendored 2026-09-11,
 * rewritten without an animation library.
 *
 * The travelling light is a dashed stroke whose offset animates in CSS.
 * `pathLength={100}` normalises the path so one dash length works for
 * every curve regardless of its real length. Positions are measured on
 * mount and on resize only, never per frame.
 */
import { useCallback, useEffect, useState, type RefObject } from "react";
import { LOOP } from "@/lib/motion";

type AnimatedBeamProps = {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  /** Bend of the curve, px. Negative arcs the other way. */
  curvature?: number;
  /** Seconds for one pass of the light. */
  duration?: number;
  /** Seconds before the first pass. Stagger these across a diagram. */
  delay?: number;
};

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  duration = LOOP.beam,
  delay = 0,
}: AnimatedBeamProps) {
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
      className="pointer-events-none absolute left-0 top-0 overflow-visible"
      fill="none"
    >
      <path d={path} stroke="currentColor" strokeWidth={1.5} className="text-ink/10" />
      <path
        className="fw-beam-dash"
        d={path}
        pathLength={100}
        stroke="var(--color-cyan)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray="12 100"
        style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
      />
    </svg>
  );
}
