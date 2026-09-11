"use client";

/**
 * Dock — adapted from Magic UI (magicui.design/docs/components/dock)
 * Vendored 2026-09-11, rewritten without an animation library: sizes are
 * written straight to the nodes on pointer move and eased back by a CSS
 * transition. Every item is a real link, so it works from the keyboard
 * and on touch (A-01).
 */
import { useRef, type PointerEvent, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const BASE = 48;
const MAX = 66;
const RANGE = 130;

export function Dock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  function magnify(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || reduced || event.pointerType !== "mouse") return;
    el.querySelectorAll<HTMLElement>("[data-dock-item]").forEach((item) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
      const falloff = Math.max(0, 1 - distance / RANGE);
      const size = BASE + (MAX - BASE) * falloff;
      item.style.width = `${size}px`;
      item.style.height = `${size}px`;
    });
  }

  function reset() {
    ref.current
      ?.querySelectorAll<HTMLElement>("[data-dock-item]")
      .forEach((item) => {
        item.style.width = `${BASE}px`;
        item.style.height = `${BASE}px`;
      });
  }

  return (
    <div
      ref={ref}
      onPointerMove={magnify}
      onPointerLeave={reset}
      className={cn(
        "mx-auto flex w-max items-end gap-2 rounded-3xl border border-line",
        "bg-surface/80 p-2.5 shadow-card backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
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
  return (
    <a
      data-dock-item
      href={href}
      aria-label={label}
      title={label}
      style={{ width: BASE, height: BASE }}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl",
        "transition-[width,height,background-color,color] duration-200 ease-out",
        active ? "bg-cyan text-ink" : "bg-band text-muted hover:text-ink",
      )}
    >
      {children}
    </a>
  );
}
