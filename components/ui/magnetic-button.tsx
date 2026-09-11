"use client";

/**
 * Magnetic Button — adapted from a 21st.dev magnetic-button pattern.
 * Vendored 2026-09-11, rewritten without an animation library: the drift
 * is a CSS transform written straight to the node, so the nav ships no
 * Motion at all. Mouse only, and disabled under reduced motion.
 */
import { useRef, type PointerEvent, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  className?: string;
  /** How far it may drift, px. */
  strength?: number;
};

export function MagneticButton({
  children,
  href,
  className,
  strength = 7,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = usePrefersReducedMotion();

  function handleMove(event: PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || reduced || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
    el.style.transform = `translate3d(${dx * strength * 2}px, ${dy * strength * 2}px, 0)`;
  }

  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-3",
        "text-sm font-semibold text-surface",
        "transition-transform duration-300 ease-out",
        className,
      )}
    >
      {children}
    </a>
  );
}
