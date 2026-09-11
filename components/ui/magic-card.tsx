"use client";

/**
 * Magic Card — adapted from Magic UI
 * (magicui.design/docs/components/magic-card). Vendored 2026-09-11.
 * A soft spotlight follows the cursor across the card. Pure CSS custom
 * properties, so no React re-render per mouse move.
 */
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagicCardProps = {
  children: ReactNode;
  className?: string;
};

export function MagicCard({ children, className }: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    el.style.setProperty("--spot", "1");
  }

  function handleLeave() {
    ref.current?.style.setProperty("--spot", "0");
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn("group relative overflow-hidden", className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--spot, 0)",
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgb(34 229 240 / 0.18), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
