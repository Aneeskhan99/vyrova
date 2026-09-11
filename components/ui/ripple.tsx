/**
 * Concentric pulse rings, after the Magic UI "Ripple" pattern.
 * https://magicui.design/docs/components/ripple — vendored 2026-09-11,
 * colours swapped for tokens.
 *
 * Pure CSS on purpose: it sits in a hero, so it must paint without any
 * JavaScript (M-04). Each ring keeps `translate(-50%,-50%)` inside its
 * keyframes — dropping it from either end makes the ring jump to the
 * corner mid-animation.
 */

import { cn } from "@/lib/utils";

type RippleProps = {
  /** Diameter of the innermost ring, in pixels. */
  base?: number;
  /** How much larger each ring is than the one inside it. */
  step?: number;
  count?: number;
  className?: string;
};

export function Ripple({
  base = 180,
  step = 90,
  count = 6,
  className,
}: RippleProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,white,transparent_85%)]",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => {
        const size = base + i * step;
        const opacity = 0.5 - i * 0.06;
        return (
          <span
            key={i}
            className="fw-ripple absolute left-1/2 top-1/2 rounded-full border border-accent/30 bg-accent/[0.035]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity > 0 ? opacity : 0,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        );
      })}
    </div>
  );
}
