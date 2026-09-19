"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type Scene = { readonly at: number; readonly label: string; readonly line: string };

/**
 * A small cinema for one film: the picture, a transport (play, sound,
 * timecode, progress) and a filmstrip of its scenes. The strip is the
 * point — the film is a sequence of ideas, and each frame is a door
 * into one of them. The active frame follows playback; clicking a frame
 * seeks. Plays muted when it scrolls into view, pauses when it leaves.
 */
export function Cinema({
  src,
  poster,
  scenes,
  duration,
  labels,
  className,
}: {
  src: string;
  poster: string;
  scenes: readonly Scene[];
  duration: number;
  labels: {
    play: string;
    pause: string;
    unmute: string;
    mute: string;
    scenesLabel: string;
    sceneHint: string;
  };
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const total = duration;

  const current = scenes.reduce((acc, s, i) => (time + 0.05 >= s.at ? i : acc), 0);

  useEffect(() => {
    const el = root.current;
    const v = video.current;
    if (!el || !v) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const on = entries.some((e) => e.isIntersecting);
        if (on) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  function seek(at: number) {
    const v = video.current;
    if (!v) return;
    v.currentTime = at;
    setTime(at);
    v.play().catch(() => {});
  }

  const fmt = (t: number) =>
    `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

  return (
    <div ref={root} className={cn("flex flex-col gap-5", className)}>
      <div className="fw-cinema relative overflow-hidden rounded-tile border border-surface/10 bg-black shadow-lift">
        <video
          ref={video}
          src={src}
          poster={poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onClick={toggle}
          className="block aspect-video w-full cursor-pointer object-cover"
        />
        {/* scene caption */}
        <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 text-surface">
          <span className="rounded-full bg-ink/70 px-2.5 py-1 text-[0.6875rem] font-semibold tabular-nums backdrop-blur">
            {String(current + 1).padStart(2, "0")} · {scenes[current]?.label}
          </span>
        </div>
        {/* transport */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-4 pt-10 text-surface">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? labels.pause : labels.play}
            className="grid size-10 place-items-center rounded-full bg-surface text-ink transition-transform hover:scale-105"
          >
            {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? labels.unmute : labels.mute}
            aria-pressed={!muted}
            className="grid size-10 place-items-center rounded-full border border-surface/30 bg-ink/40 backdrop-blur transition-colors hover:bg-ink/70"
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
          <span className="text-xs tabular-nums text-surface/80">
            {fmt(time)} / {fmt(total)}
          </span>
          <span className="relative ml-2 h-1 flex-1 overflow-hidden rounded-full bg-surface/20">
            <span
              className="fw-cinema-bar absolute inset-y-0 left-0 w-full origin-left bg-cyan"
              style={{ "--p": total ? time / total : 0 } as CSSProperties}
            />
          </span>
        </div>
      </div>

      <div className="flex items-baseline justify-between px-1">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-surface/60">
          {labels.scenesLabel}
        </span>
        <span className="text-xs text-surface/50">{labels.sceneHint}</span>
      </div>

      <div className="fw-filmstrip -mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
        <ol className="flex w-max gap-2">
          {scenes.map((scene, i) => {
            const live = i === current;
            return (
              <li key={scene.at}>
                <button
                  type="button"
                  onClick={() => seek(scene.at)}
                  aria-current={live ? "true" : undefined}
                  className={cn(
                    "group flex w-36 flex-col gap-2 rounded-lg p-1.5 text-left transition-colors sm:w-40",
                    live ? "bg-surface/10" : "hover:bg-surface/5",
                  )}
                >
                  <span
                    className={cn(
                      "relative block aspect-video overflow-hidden rounded-md border",
                      live ? "border-cyan" : "border-surface/15",
                    )}
                  >
                    <img
                      src={`/videos/scenes/showreel-${String(i + 1).padStart(2, "0")}.webp`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={480}
                      height={270}
                      className={cn(
                        "size-full object-cover transition-opacity duration-300",
                        live ? "opacity-100" : "opacity-60 group-hover:opacity-90",
                      )}
                    />
                    <span className="absolute left-1.5 top-1.5 rounded bg-ink/70 px-1.5 py-0.5 text-[0.625rem] font-semibold tabular-nums text-surface">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="flex flex-col gap-0.5 px-0.5">
                    <span className={cn("text-xs font-semibold", live ? "text-cyan" : "text-surface/85")}>
                      {scene.label}
                    </span>
                    <span className="truncate text-[0.6875rem] text-surface/50">{scene.line}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
