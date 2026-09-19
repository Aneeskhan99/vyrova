"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/**
 * A background video (muted, looping) that opens a full size player with
 * sound on when clicked, so visitors can actually watch the work.
 */
export function VideoTile({
  src,
  className,
  videoClassName,
}: {
  src: string;
  className?: string;
  videoClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const bgRef = useRef<HTMLVideoElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    bgRef.current?.pause();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      bgRef.current?.play().catch(() => {});
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Play video with sound"
        className={cn(
          "group relative block size-full cursor-pointer overflow-hidden text-left",
          className,
        )}
      >
        <video
          ref={bgRef}
          className={cn("size-full object-cover", videoClassName)}
          src={src}
          autoPlay
          loop
          muted
          playsInline
        />
        <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-200 group-hover:bg-ink/25">
          <span className="grid size-14 scale-90 place-items-center rounded-full bg-surface/95 text-ink opacity-0 shadow-lift transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
            <svg
              viewBox="0 0 24 24"
              className="ml-0.5 size-6"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
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
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
                <video
                  className="aspect-video w-full"
                  src={src}
                  autoPlay
                  controls
                  playsInline
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
