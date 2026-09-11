/**
 * Dot Pattern — adapted from Magic UI (magicui.design/docs/components/dot-pattern)
 * Vendored 2026-09-11. Colours swapped for tokens (S-02).
 */
import { cn } from "@/lib/utils";

type DotPatternProps = {
  /** Grid spacing in px. */
  gap?: number;
  /** Dot radius in px. */
  radius?: number;
  className?: string;
};

export function DotPattern({ gap = 24, radius = 1.1, className }: DotPatternProps) {
  const id = `dots-${gap}-${radius}`;
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse">
          <circle cx={gap / 2} cy={gap / 2} r={radius} className="fill-ink/12" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
