"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait after the element enters view. */
  delay?: number;
  className?: string;
};

/**
 * M-03. The only scroll entrance in the site. Never hand-roll an
 * IntersectionObserver in a section file — use this instead.
 *
 * Deliberately has no animation-library dependency: the transition is
 * CSS (.fw-reveal in globals.css) and this component only flips a data
 * attribute. That keeps Motion out of the bundle for every section that
 * just fades in, which is most of them.
 *
 * Below the fold only. Above-the-fold content uses the .fw-rise classes
 * so it never depends on JavaScript at all (M-04).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          el.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "-8% 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("fw-reveal", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
