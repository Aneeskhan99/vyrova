"use client";

/**
 * Dock — adapted from Magic UI (magicui.design/docs/components/dock)
 * Vendored 2026-09-11. Items magnify based on cursor distance, the way
 * the macOS dock does. Falls back to a plain row under reduced motion,
 * and every item is a real link so it works from the keyboard (A-01).
 */
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const BASE = 48;
const MAX = 68;
const RANGE = 140;

const DockContext = createContext<MotionValue<number> | null>(null);

export function Dock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <DockContext.Provider value={mouseX}>
      <div
        onPointerMove={(event) => {
          if (event.pointerType === "mouse") mouseX.set(event.clientX);
        }}
        onPointerLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className={cn(
          "mx-auto flex w-max items-end gap-2 rounded-3xl border border-line",
          "bg-surface/80 p-2.5 shadow-card backdrop-blur-md",
          className,
        )}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
}

export function DockItem({
  children,
  label,
  href,
  active = false,
}: {
  children: ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = usePrefersReducedMotion();

  // Hooks must run unconditionally, so the fallback is created every time
  // and only the value read from it changes.
  const fallback = useMotionValue(Number.POSITIVE_INFINITY);
  const fromContext = useContext(DockContext);
  const mouseX = fromContext ?? fallback;

  const distance = useTransform(mouseX, (value: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return RANGE;
    return value - (rect.left + rect.width / 2);
  });

  const sizeRaw = useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]);
  const size = useSpring(sizeRaw, { stiffness: 240, damping: 18, mass: 0.2 });

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={label}
      title={label}
      style={reduced ? { width: BASE, height: BASE } : { width: size, height: size }}
      className={cn(
        "flex aspect-square shrink-0 items-center justify-center rounded-2xl transition-colors",
        active ? "bg-cyan text-ink" : "bg-band text-muted hover:text-ink",
      )}
    >
      {children}
    </motion.a>
  );
}
