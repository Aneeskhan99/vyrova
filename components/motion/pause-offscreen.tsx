"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * M-06. Wrap anything that loops forever — marquees, orbits, beams.
 * Sets data-paused when off-screen; globals.css stops every CSS
 * animation inside. Four infinite loops running behind the footer is a
 * real battery cost for nothing.
 *
 * Uses IntersectionObserver directly so no animation library is pulled
 * into the hero bundle.
 */
export function PauseOffscreen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) el.dataset.paused = String(!entry.isIntersecting);
      },
      { rootMargin: "120px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
