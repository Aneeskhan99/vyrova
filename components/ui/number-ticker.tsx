"use client";

/**
 * Number Ticker — adapted from Magic UI
 * (magicui.design/docs/components/number-ticker). Vendored 2026-09-11.
 * Counts up once when scrolled into view. Renders the final value on the
 * server so the number is never missing from the HTML.
 */
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

type NumberTickerProps = {
  value: number;
  /** Characters shown before the number, e.g. "+". */
  prefix?: string;
  /** Characters shown after, e.g. "%" or "h". */
  suffix?: string;
  decimals?: number;
  /** Milliseconds for the whole count. */
  duration?: number;
  className?: string;
};

export function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1200,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || reduced || started) return;
    setStarted(true);
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out so it settles rather than stopping dead.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    setDisplay(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, started, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
