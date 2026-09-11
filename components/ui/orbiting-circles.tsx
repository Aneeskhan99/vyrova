/**
 * Orbiting Circles — adapted from Magic UI
 * (magicui.design/docs/components/orbiting-circles). Vendored 2026-09-11.
 * Runs on CSS keyframes (fw-orbit in globals.css) so it costs no JS, and
 * stops off-screen when wrapped in <PauseOffscreen> (M-06).
 */
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type OrbitProps = {
  children: ReactNode;
  /** Distance from centre, px. */
  radius: number;
  /** Seconds for one full revolution. */
  duration: number;
  /** Starting position on the circle, degrees. */
  angle?: number;
  reverse?: boolean;
  className?: string;
};

export function Orbit({
  children,
  radius,
  duration,
  angle = 0,
  reverse = false,
  className,
}: OrbitProps) {
  const style = {
    "--radius": `${radius}px`,
    "--angle": `${angle}deg`,
    animation: `fw-orbit ${duration}s linear infinite`,
    animationDirection: reverse ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

/** The dashed ring an Orbit travels along. Decorative only. */
export function OrbitRing({ size }: { size: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ink/10"
      style={{ width: size, height: size }}
    />
  );
}
