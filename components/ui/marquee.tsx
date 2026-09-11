/**
 * Marquee — adapted from Magic UI (magicui.design/docs/components/marquee)
 * Vendored 2026-09-11. CSS-driven. Wrap in <PauseOffscreen> (M-06).
 *
 * Seamlessness has two requirements, and getting either wrong leaves a
 * visible gap as items leave on the left:
 *
 * 1. The track holds the items TWICE and slides exactly -50%, so the
 *    second copy lands precisely where the first started.
 * 2. That only looks continuous while one copy is wider than the
 *    screen. Short content (a row of seven words) is not, so `repeat`
 *    duplicates the set until it is.
 *
 * Spacing is a right margin on each item rather than flex `gap`,
 * because `gap` sits only BETWEEN items — the halves would then differ
 * by one gap and the loop would jump a few pixels every lap.
 */
import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full pass. */
  duration?: number;
  reverse?: boolean;
  /** Fade the left and right edges into the page background. */
  fade?: boolean;
  /** Stop while the cursor is over it, so an item can be read. */
  pauseOnHover?: boolean;
  /**
   * Copies of the item set per half. Raise it for short items: the row
   * must out-measure the widest screen it will run on. Seven words at
   * repeat 4 covers roughly 3000px.
   */
  repeat?: number;
  /** Space after each item. Any CSS length. */
  itemGap?: string;
  className?: string;
};

export function Marquee({
  children,
  duration = 40,
  reverse = false,
  fade = true,
  pauseOnHover = false,
  repeat = 2,
  itemGap = "3rem",
  className,
}: MarqueeProps) {
  const items = Children.toArray(children);
  const half = Array.from({ length: repeat }).flatMap(() => items);
  const all = [...half, ...half];
  const midpoint = half.length;

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden",
        pauseOnHover && "fw-pause-hover",
        className,
      )}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }
          : undefined
      }
    >
      <div
        data-marquee-track
        className="flex w-max"
        style={{
          animation: `fw-marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {all.map((child, i) => (
          <div
            key={i}
            className="shrink-0"
            style={{ marginRight: itemGap }}
            // The second half is a visual duplicate; screen readers and
            // search engines should only meet the content once.
            aria-hidden={i >= midpoint ? true : undefined}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
