"use client";

/**
 * Number Ticker — adapted from Magic UI
 * (magicui.design/docs/components/number-ticker). Vendored 2026-09-11,
 * rewritten with IntersectionObserver so the hero pulls in no animation
 * library. Renders the final value on the server, so the number is never
 * missing from the HTML.
 */
import { useEffect, useRef, useState } from "react";

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
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    // The timestamp rAF hands back is the start of the current frame,
    // which can be EARLIER than a performance.now() taken beforehand.
    // Anchoring to the first frame, and clamping, stops the count
    // briefly rendering a negative number.
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      // Ease out so it settles rather than stopping dead.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setDisplay(0);
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "-20% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
