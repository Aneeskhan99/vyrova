"use client";

/**
 * SiteTour — a live website shown the way you actually meet one: inside a
 * browser, moving. The chrome is real enough to read as a browser (dots, a
 * URL that is itself the link), and the shots advance on a timer with the
 * dwell drawn as a filling bar on each label, so the rail doubles as a
 * progress readout rather than a row of anonymous dots.
 *
 * Hovering holds the current shot — nobody likes reading something that
 * slides away under them. Stops when scrolled out of view (M-06) and shows
 * a single still under prefers-reduced-motion (M-05).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type Shot = { readonly src: string; readonly label: string; readonly note: string };

const DWELL = 4200;

export function SiteTour({
  shots,
  url,
  host,
  className,
}: {
  shots: readonly Shot[];
  url: string;
  host: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const held = useRef(false);
  const onScreen = useRef(true);
  const startedAt = useRef<number>(0);
  const raf = useRef<number | null>(null);
  // The rAF loop reads elapsed without re-subscribing, so it is mirrored here.
  const elapsedRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  const goTo = useCallback((next: number) => {
    setIndex(((next % shots.length) + shots.length) % shots.length);
    setElapsed(0);
    elapsedRef.current = 0;
    startedAt.current = performance.now();
  }, [shots.length]);

  useEffect(() => {
    if (reduced || shots.length < 2) return;
    startedAt.current = performance.now();

    const tick = (now: number) => {
      if (held.current || !onScreen.current) {
        // Freeze the clock rather than the frame, so releasing a hover
        // gives the reader the rest of their time instead of an instant cut.
        startedAt.current = now - elapsedRef.current;
      } else {
        let gone = now - startedAt.current;
        // A backgrounded tab pauses rAF entirely, so coming back can leave a
        // gap of minutes. Without this the tour would snap forward the
        // instant the reader returns to it.
        if (gone > DWELL * 2) {
          startedAt.current = now;
          gone = 0;
        }
        elapsedRef.current = gone;
        setElapsed(gone);
        if (gone >= DWELL) {
          elapsedRef.current = 0;
          startedAt.current = now;
          setElapsed(0);
          setIndex((i) => (i + 1) % shots.length);
        }
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [reduced, shots.length]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) onScreen.current = entry.isIntersecting;
      },
      { rootMargin: "140px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const progress = reduced ? 0 : Math.min(elapsed / DWELL, 1);
  const current = shots[index];

  return (
    <div
      ref={rootRef}
      className={cn("flex flex-col gap-5", className)}
      onPointerEnter={() => { held.current = true; }}
      onPointerLeave={() => { held.current = false; }}
    >
      <div className="overflow-hidden rounded-tile border border-line bg-surface shadow-lift">
        {/* Browser chrome. The address bar is the actual link — that is where
            a visitor already expects the real site to live. */}
        <div className="flex items-center gap-3 border-b border-line bg-band px-4 py-3">
          <span className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-muted/30" />
            <span className="size-2.5 rounded-full bg-muted/30" />
            <span className="size-2.5 rounded-full bg-muted/30" />
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.75rem] text-muted transition-colors hover:border-[var(--tour-accent)]"
          >
            <span aria-hidden="true" className="text-[0.6875rem]">🔒</span>
            <span className="truncate font-medium text-ink">{host}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="ml-auto size-3.5 shrink-0 text-muted transition-colors group-hover:text-[var(--tour-accent)]"
            />
          </a>
          <span className="hidden shrink-0 items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted sm:flex">
            <span className="size-1.5 rounded-full bg-[var(--tour-accent)]" />
            Live
          </span>
        </div>

        <div className="relative aspect-[1400/675] w-full overflow-hidden bg-band">
          {shots.map((shot, i) => (
            <img
              key={shot.src}
              src={shot.src}
              alt={`${host} — ${shot.label}`}
              width={1400}
              height={675}
              // Not lazy: these sit at opacity 0 until their turn, and a
              // fully transparent image never trips the lazy loader — the
              // first advance would land on a blank frame. Four shots, so
              // they all load, with only the first one prioritised.
              loading="eager"
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              className={cn(
                "absolute inset-0 size-full object-cover object-top transition-[opacity,transform] duration-700 ease-out",
                i === index ? "z-10 scale-100 opacity-100" : "scale-[1.03] opacity-0",
              )}
            />
          ))}

          <span className="absolute bottom-4 left-4 z-20 rounded-full bg-ink/80 px-3 py-1.5 text-[0.75rem] font-medium text-surface backdrop-blur-sm">
            {current?.note}
          </span>
        </div>
      </div>

      {/* The rail: each label carries its own progress bar, so the timer is
          visible instead of being a surprise. */}
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {shots.map((shot, i) => (
          <li key={shot.label}>
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "group flex w-full flex-col gap-2 rounded-card border px-3.5 py-2.5 text-left transition-colors",
                i === index
                  ? "border-[var(--tour-accent)] bg-surface"
                  : "border-line bg-surface/60 hover:border-muted/40",
              )}
            >
              <span
                className={cn(
                  "text-[0.8125rem] font-semibold transition-colors",
                  i === index ? "text-ink" : "text-muted group-hover:text-ink",
                )}
              >
                {shot.label}
              </span>
              <span className="h-0.5 w-full overflow-hidden rounded-full bg-line">
                <span
                  className="block h-full rounded-full bg-[var(--tour-accent)]"
                  style={{
                    width: i === index ? `${progress * 100}%` : "0%",
                    transition: progress === 0 ? "none" : "width 90ms linear",
                  }}
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
