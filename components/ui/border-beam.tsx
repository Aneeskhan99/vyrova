/**
 * Border Beam — adapted from Magic UI
 * (magicui.design/docs/components/border-beam). Vendored 2026-09-11.
 *
 * Implemented as a rotating conic gradient masked by an inset surface,
 * rather than offset-path, because offset-path `rect()` is Chromium only.
 * The parent needs `relative` and a border radius.
 */
import { cn } from "@/lib/utils";
import { LOOP } from "@/lib/motion";

type BorderBeamProps = {
  /** Seconds for one full lap. */
  duration?: number;
  /**
   * Tailwind background class for the inner mask. Must match the card it
   * sits on, or the border will look like a ring of the wrong colour.
   */
  surfaceClassName?: string;
  className?: string;
};

export function BorderBeam({
  duration = LOOP.borderBeam,
  surfaceClassName = "bg-surface",
  className,
}: BorderBeamProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className,
      )}
    >
      <span
        className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 250deg, var(--color-cyan) 320deg, transparent 360deg)",
          animation: `fw-spin ${duration}s linear infinite`,
        }}
      />
      <span
        className={cn("absolute inset-[1.5px] rounded-[inherit]", surfaceClassName)}
      />
    </span>
  );
}
