"use client";

/**
 * Magnetic Button — adapted from a 21st.dev magnetic-button pattern.
 * Vendored 2026-09-11. The button drifts toward the cursor, then springs
 * back. Disabled under reduced motion and on touch (no pointer events).
 */
import { motion, useMotionValue, useSpring } from "motion/react";
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
  strength = 6,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });
  const reduced = usePrefersReducedMotion();

  function handleMove(event: PointerEvent<HTMLAnchorElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set((dx / rect.width) * strength * 2);
    y.set((dy / rect.height) * strength * 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3",
        "text-sm font-semibold text-surface",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}
