"use client";

import { useEffect, useRef, useState } from "react";
import { FilmTile } from "@/components/motion/film-tile";
import { posterFor } from "@/lib/media";
import { cn } from "@/lib/utils";


/**
 * A film tile that costs nothing until it is wanted. It shows the poster
 * frame; the real autoplaying FilmTile (small silent copy inline, full
 * file with sound in the lightbox) mounts either when the tile
 * scrolls into view ("view") or when the cursor arrives ("hover"). Marquee
 * rows repeat every tile several times, so without this a home page opens
 * two dozen video connections at once and none of them gets a frame.
 */
export function LazyVideo({
  src,
  playOn = "view",
  className,
}: {
  src: string;
  playOn?: "view" | "hover";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (playOn !== "view" || live) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setLive(true);
      },
      { rootMargin: "120px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [playOn, live]);

  const wake = playOn === "hover" ? () => setLive(true) : undefined;

  return (
    <div
      ref={ref}
      onPointerEnter={wake}
      onFocus={wake}
      className={cn("relative size-full overflow-hidden bg-ink", className)}
    >
      <img
        src={posterFor(src)}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={1280}
        height={720}
        className="absolute inset-0 size-full object-cover"
      />
      {live ? (
        <div className="absolute inset-0">
          <FilmTile src={src} className="size-full" />
        </div>
      ) : null}
    </div>
  );
}
