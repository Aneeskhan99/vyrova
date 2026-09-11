"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type StaggerProps = {
  children: ReactNode;
  /** Seconds between each child. */
  step?: number;
  className?: string;
  /** Class applied to every generated child wrapper. */
  itemClassName?: string;
};

/**
 * M-03. Reveals children one after another. Same CSS-only approach as
 * Reveal — one observer for the group, a transition delay per child.
 */
export function Stagger({
  children,
  step = 0.07,
  className,
  itemClassName,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      el.querySelectorAll<HTMLElement>(".fw-reveal").forEach((child) => {
        child.dataset.visible = "true";
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: "-6% 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className={cn("fw-reveal", itemClassName)}
          style={{ transitionDelay: `${i * step}s` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
