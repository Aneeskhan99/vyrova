"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";
import { tileFor } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * A film tile with two sources. Inline it autoplays the small, silent
 * 720p copy (a tenth of the size); clicking opens the full file with
 * sound in a lightbox. That keeps a page of tiles cheap without making
 * the film itself worse.
 */
export function FilmTile({ src, className }: { src: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const bg = useRef<HTMLVideoElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    bg.current?.pause();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      bg.current?.play().catch(() => {});
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Play video with sound"
        className={cn("group relative block size-full cursor-pointer overflow-hidden text-left", className)}
      >
        <video
          ref={bg}
          className="size-full object-cover"
          src={tileFor(src)}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-200 group-hover:bg-ink/25">
          <span className="grid size-14 scale-90 place-items-center rounded-full bg-surface/95 text-ink opacity-0 shadow-lift transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
            <Play aria-hidden="true" className="ml-0.5 size-6 fill-current" />
          </span>
        </span>
      </button>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm sm:p-8"
              role="dialog"
              aria-modal="true"
              onClick={() => setOpen(false)}
            >
              <div
                className="relative w-full max-w-4xl overflow-hidden rounded-tile bg-black shadow-lift"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close video"
                  className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-surface/95 text-ink transition-colors hover:bg-surface"
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
                <video className="aspect-video w-full" src={src} autoPlay controls playsInline />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
