import { cn } from "@/lib/utils";

/** The rendered mark, exported once from the brand file. 512px, transparent. */
export const MARK_SRC = "/brand/vyrova-mark.webp";

/**
 * The VYROVA mark: a folded cyan ribbon V with a play triangle in the notch.
 * It is a rendered image (soft shading, real depth), so it is served as one
 * transparent WebP and placed with an <img>. No tile, no ground behind it:
 * the mark carries its own light.
 */
export function Mark({
  className,
  animate = false,
  priority = false,
}: {
  /** Kept for call-site compatibility; the image needs no per-instance id. */
  id?: string;
  className?: string;
  /** Pop the mark in on mount. Nav only — it is the "visuals that move" proof. */
  animate?: boolean;
  /** Above the fold: fetch eagerly. */
  priority?: boolean;
}) {
  return (
    <img
      src={MARK_SRC}
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
      className={cn("block shrink-0 select-none", animate && "fw-mark-in", className)}
    />
  );
}

export const WORDMARK_W = 823.55;
export const WORDMARK_SCALE = 0.141844;
export const WORDMARK_D =
  "M721 -702 472 0H258L9 -702H191L365 -172L540 -702Z M1694.0 -702 1451.0 -232V0H1280.0V-232L1037.0 -702H1231.0L1367.0 -408L1502.0 -702Z M2421.0 0 2275.0 -265H2234.0V0H2063.0V-702H2350.0Q2433.0 -702 2491.5 -673.0Q2550.0 -644 2579.0 -593.5Q2608.0 -543 2608.0 -481Q2608.0 -411 2568.5 -356.0Q2529.0 -301 2452.0 -278L2614.0 0ZM2234.0 -386H2340.0Q2387.0 -386 2410.5 -409.0Q2434.0 -432 2434.0 -474Q2434.0 -514 2410.5 -537.0Q2387.0 -560 2340.0 -560H2234.0Z M2986.0 -353Q2986.0 -456 3034.5 -538.0Q3083.0 -620 3165.5 -666.0Q3248.0 -712 3347.0 -712Q3446.0 -712 3528.5 -666.0Q3611.0 -620 3658.5 -538.0Q3706.0 -456 3706.0 -353Q3706.0 -250 3658.0 -167.5Q3610.0 -85 3528.0 -39.0Q3446.0 7 3347.0 7Q3248.0 7 3165.5 -39.0Q3083.0 -85 3034.5 -167.5Q2986.0 -250 2986.0 -353ZM3532.0 -353Q3532.0 -446 3481.5 -501.5Q3431.0 -557 3347.0 -557Q3262.0 -557 3211.5 -502.0Q3161.0 -447 3161.0 -353Q3161.0 -260 3211.5 -204.5Q3262.0 -149 3347.0 -149Q3431.0 -149 3481.5 -205.0Q3532.0 -261 3532.0 -353Z M4760.0 -702 4511.0 0H4297.0L4048.0 -702H4230.0L4404.0 -172L4579.0 -702Z M5568.0 -124H5306.0L5264.0 0H5085.0L5339.0 -702H5537.0L5791.0 0H5610.0ZM5524.0 -256 5437.0 -513 5351.0 -256Z";


/**
 * VYROVA set in Poppins Bold at 0.30em tracking, outlined to a path so the
 * wordmark never depends on a webfont loading. Fills with currentColor.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${WORDMARK_W} 100`}
      aria-hidden="true"
      className={cn("block h-[1em] w-auto fill-current", className)}
    >
      <g transform={`translate(0 100) scale(${WORDMARK_SCALE})`}>
        <path d={WORDMARK_D} />
      </g>
    </svg>
  );
}
