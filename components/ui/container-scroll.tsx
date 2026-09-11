"use client";

/**
 * Container Scroll — adapted from Aceternity UI
 * (ui.aceternity.com/components/container-scroll-animation)
 * Vendored 2026-09-11, rewritten without an animation library.
 *
 * A passive scroll listener writes one CSS custom property, throttled to
 * one write per frame; the transform itself is CSS. Only transform is
 * animated (M-01), and the default value keeps the panel flat so it
 * looks correct with no JavaScript at all.
 */
import { useEffect, useRef, type ReactNode } from "react";

export function ContainerScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 while the panel is still below the fold, 1 once it has risen
      // three quarters of the way up the viewport.
      const progress = (viewport - rect.top) / (viewport * 0.8);
      el.style.setProperty("--p", String(Math.min(Math.max(progress, 0), 1)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="fw-scroll-tilt">
      <div className="fw-scroll-tilt-inner">{children}</div>
    </div>
  );
}
