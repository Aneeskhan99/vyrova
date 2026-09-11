"use client";

/**
 * Compare — adapted from Aceternity UI
 * (ui.aceternity.com/components/compare). Vendored 2026-09-11, rewritten
 * without an animation library.
 *
 * Drag, or focus the handle and use the arrow keys — the divider is a
 * real ARIA slider, so this is not a mouse-only feature (A-01). Only
 * clip-path and transform change, never layout (M-01, M-08).
 */
import { useCallback, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CompareSliderProps = {
  before: ReactNode;
  after: ReactNode;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
};

export function CompareSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  className,
}: CompareSliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(Math.max(next, 0), 100));
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative select-none overflow-hidden rounded-tile border border-line bg-surface",
        className,
      )}
      onPointerDown={(event) => {
        dragging.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        setFromClientX(event.clientX);
      }}
      onPointerMove={(event) => {
        if (dragging.current) setFromClientX(event.clientX);
      }}
      onPointerUp={(event) => {
        dragging.current = false;
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
    >
      <div className="absolute inset-0">{before}</div>

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${percent}%)` }}
      >
        {after}
      </div>

      <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-ink/80 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-surface">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-5 top-5 rounded-full bg-ink/80 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-surface">
        {afterLabel}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-ink"
        style={{ left: `${percent}%` }}
      />

      <button
        type="button"
        role="slider"
        aria-label="Compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        aria-valuetext={`${Math.round(percent)}% showing the after version`}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") setPercent((p) => Math.max(p - 4, 0));
          if (event.key === "ArrowRight") setPercent((p) => Math.min(p + 4, 100));
          if (event.key === "Home") setPercent(0);
          if (event.key === "End") setPercent(100);
        }}
        className="absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-surface shadow-card"
        style={{ left: `${percent}%` }}
      >
        <span aria-hidden="true" className="text-sm font-semibold text-ink">
          ‹ ›
        </span>
      </button>
    </div>
  );
}
