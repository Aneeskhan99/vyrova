/**
 * Marquee — adapted from Magic UI (magicui.design/docs/components/marquee)
 * Vendored 2026-09-11. CSS-driven. Wrap in <PauseOffscreen> (M-06).
 * Children are duplicated once so the loop is seamless.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full pass. */
  duration?: number;
  reverse?: boolean;
  /** Fade the left and right edges into the page background. */
  fade?: boolean;
  className?: string;
};

export function Marquee({
  children,
  duration = 40,
  reverse = false,
  fade = true,
  className,
}: MarqueeProps) {
  const track = (
    <div
      className="flex shrink-0 items-center gap-12 pr-12"
      style={{
        animation: `fw-marquee ${duration}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      <div className="flex shrink-0 items-center gap-12 pr-12">{children}</div>
      <div aria-hidden="true" className="flex shrink-0 items-center gap-12 pr-12">
        {children}
      </div>
    </div>
  );

  return (
    <div
      className={cn("relative flex w-full overflow-hidden", className)}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }
          : undefined
      }
    >
      {track}
    </div>
  );
}
