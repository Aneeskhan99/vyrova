"use client";

/**
 * ScrubReel — the "before / after" control, rebuilt on the right axis.
 *
 * A left/right wipe compares two things that differ in SPACE. What this
 * studio sells differs in TIME, so dragging here scrubs a real clip rather
 * than revealing a second still: hard left is the mess, hard right is the
 * one clean screen it collapses into.
 *
 * It loops on its own so every visitor sees the payoff, and grabbing the
 * handle takes manual control. The handle is a real ARIA slider, so arrow
 * keys work too (A-01). Only transform and clip change, never layout
 * (M-01, M-08), and it stops dead when scrolled out of view (M-06).
 */
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type ScrubReelProps = {
  src: string;
  /** Seconds into `src` where the segment starts. */
  start: number;
  /** Seconds into `src` where it ends. */
  end: number;
  startLabel: string;
  endLabel: string;
  hint: string;
  className?: string;
};

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

/** 3.42s -> "03:10" — seconds and frames at 30 fps, like a real timeline. */
function timecode(seconds: number) {
  const whole = Math.floor(seconds);
  const frames = Math.round((seconds - whole) * 30) % 30;
  return `${String(whole).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
}

export function ScrubReel({
  src,
  start,
  end,
  startLabel,
  endLabel,
  hint,
  className,
}: ScrubReelProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dragging = useRef(false);
  const visible = useRef(true);
  const raf = useRef<number | null>(null);

  const [progress, setProgress] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const reduced = usePrefersReducedMotion();

  const span = Math.max(end - start, 0.001);

  const seekTo = useCallback(
    (p: number) => {
      const video = videoRef.current;
      if (!video) return;
      const next = clamp01(p);
      setProgress(next);
      // Stop one frame short of the loop point. Landing exactly on `end`
      // trips the rewind below, so dragging to the far right would snap
      // straight back to the start instead of holding on the last frame.
      video.currentTime = Math.min(start + next * span, end - 1 / 30);
    },
    [end, span, start],
  );

  const seekFromClientX = useCallback(
    (clientX: number) => {
      const el = frameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      seekTo((clientX - rect.left) / rect.width);
    },
    [seekTo],
  );

  // Park on the first frame of the segment as soon as the clip is seekable.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      if (dragging.current) return;
      video.currentTime = start;
      if (!reduced) void video.play().catch(() => {});
    };

    if (video.readyState >= 1) onReady();
    else video.addEventListener("loadedmetadata", onReady, { once: true });

    return () => video.removeEventListener("loadedmetadata", onReady);
  }, [reduced, start]);

  // Follow playback at frame rate. `timeupdate` only fires ~4x a second,
  // which makes the handle stutter visibly against the picture.
  useEffect(() => {
    if (reduced) return;

    const tick = () => {
      const video = videoRef.current;
      // Only follow the picture while it is actually running. If this also
      // ran while paused it would overwrite a keyboard seek on the very
      // next frame, and the handle would refuse to move.
      if (video && !dragging.current && !video.paused) {
        if (video.currentTime >= end) {
          // Loop the segment rather than running on into the next scene.
          video.currentTime = start;
        }
        setProgress(clamp01((video.currentTime - start) / span));
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [end, reduced, span, start]);

  // Four seconds of video looping behind the footer is a real battery cost.
  useEffect(() => {
    const el = frameRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        visible.current = entry.isIntersecting;
        if (!entry.isIntersecting) video.pause();
        else if (!dragging.current && !reduced) void video.play().catch(() => {});
      },
      { rootMargin: "120px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    setScrubbing(true);
    videoRef.current?.pause();
    event.currentTarget.setPointerCapture(event.pointerId);
    seekFromClientX(event.clientX);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current) seekFromClientX(event.clientX);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    setScrubbing(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (!reduced && visible.current) void videoRef.current?.play().catch(() => {});
  };

  const nudge = (delta: number) => {
    videoRef.current?.pause();
    seekTo(progress + delta);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative touch-none select-none overflow-hidden rounded-tile border border-line bg-ink"
      >
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          aria-label={`${startLabel} to ${endLabel}`}
          className="block aspect-[16/9] w-full object-cover"
        />

        {/* The two ends of the segment, named. They sit at the edges the
            handle travels between, so the labels explain the gesture. */}
        <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-surface/85 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-ink">
          {startLabel}
        </span>
        <span
          className={cn(
            "pointer-events-none absolute right-5 top-5 rounded-full px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300",
            progress > 0.72 ? "bg-accent text-ink" : "bg-surface/85 text-ink",
          )}
        >
          {endLabel}
        </span>

        {/* A running timecode is the whole argument in one detail: the
            thing separating the two ends is seconds, not pixels. */}
        <span className="pointer-events-none absolute bottom-5 right-5 rounded-md bg-ink/70 px-2.5 py-1 font-mono text-[0.6875rem] tabular-nums tracking-wider text-surface/90">
          {timecode(progress * span)}
        </span>

        <span
          className={cn(
            "pointer-events-none absolute bottom-5 left-5 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-surface/70 transition-opacity duration-300",
            scrubbing ? "opacity-0" : "opacity-100",
          )}
        >
          {hint}
        </span>
      </div>

      {/* The rail lives under the picture rather than over it, so the handle
          never covers the frame it is meant to reveal. */}
      <div className="relative h-12">
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-line" />
        <div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-accent"
          style={{ width: `${progress * 100}%` }}
        />
        <button
          type="button"
          role="slider"
          aria-label="Scrub the clip"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-valuetext={`${timecode(progress * span)} of ${timecode(span)}`}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") nudge(-0.04);
            if (event.key === "ArrowRight") nudge(0.04);
            if (event.key === "Home") nudge(-1);
            if (event.key === "End") nudge(1);
          }}
          onPointerDown={(event) => {
            dragging.current = true;
            setScrubbing(true);
            videoRef.current?.pause();
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (dragging.current) seekFromClientX(event.clientX);
          }}
          onPointerUp={(event) => {
            dragging.current = false;
            setScrubbing(false);
            event.currentTarget.releasePointerCapture(event.pointerId);
            if (!reduced && visible.current) void videoRef.current?.play().catch(() => {});
          }}
          className={cn(
            "absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none place-items-center",
            "rounded-full border-2 border-ink bg-surface shadow-card transition-transform duration-150",
            scrubbing ? "scale-110 cursor-grabbing" : "hover:scale-105",
          )}
          style={{ left: `${progress * 100}%` }}
        >
          <span aria-hidden="true" className="text-xs font-semibold tracking-tight text-ink">
            ‹ ›
          </span>
        </button>
      </div>
    </div>
  );
}
