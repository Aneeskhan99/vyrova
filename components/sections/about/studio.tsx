"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { studio } from "@/content/site/about";

/**
 * The clocks are real, which means they cannot be rendered on the
 * server: the build machine's idea of "now" is not the visitor's, and a
 * static export bakes HTML once. So the placeholder ships in the HTML
 * and the time fills in after mount — no hydration mismatch (S-05).
 */
type Reading = { text: string; h: number; m: number };

function useClocks() {
  const [times, setTimes] = useState<Reading[]>(() =>
    studio.clocks.map(() => ({ text: "--:--", h: 0, m: 0 })),
  );

  useEffect(() => {
    const read = () =>
      setTimes(
        studio.clocks.map((clock) => {
          const parts = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: clock.zone,
          }).formatToParts(new Date());
          const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
          const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
          return { text: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`, h, m };
        }),
      );

    read();
    const id = window.setInterval(read, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return times;
}

/** An analog face: hour and minute hands from the reading, a sweeping
    second hand on a 60s CSS loop, day or night dial by the hour. */
function Face({ h, m, home }: { h: number; m: number; home: boolean }) {
  const night = h < 7 || h >= 19;
  return (
    <span
      className={
        "fw-clock relative grid size-16 shrink-0 place-items-center rounded-full border " +
        (night ? "border-surface/15 bg-ink text-surface" : "border-line bg-surface text-ink")
      }
      style={{ "--h": `${(h % 12) * 30 + m * 0.5}deg`, "--m": `${m * 6}deg` } as CSSProperties}
    >
      <span className="fw-clock-hour absolute left-1/2 top-1/2 h-4 w-0.5 origin-bottom rounded-full bg-current" />
      <span className="fw-clock-min absolute left-1/2 top-1/2 h-6 w-0.5 origin-bottom rounded-full bg-current" />
      <span className={"fw-clock-sec absolute left-1/2 top-1/2 h-7 w-px origin-bottom " + (home ? "bg-accent" : "bg-cyan")} />
      <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
    </span>
  );
}

export function Studio() {
  const times = useClocks();

  return (
    <section className="border-t border-line bg-surface py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {studio.eyebrow}
            </p>
            <h2 className="mt-3 max-w-[18ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em]">
              {studio.title}
            </h2>
            <p className="mt-4 max-w-[54ch] leading-relaxed text-muted">
              {studio.body}
            </p>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
              {studio.facts.map((fact) => (
                <div key={fact.label} className="bg-surface px-5 py-4">
                  <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="flex flex-col gap-3">
              {studio.clocks.map((clock, i) => (
                <li
                  key={clock.city}
                  className={
                    clock.home
                      ? "fw-tz flex items-center justify-between gap-4 rounded-card border border-accent/30 bg-accent-soft px-5 py-4"
                      : "fw-tz flex items-center justify-between gap-4 rounded-card border border-line bg-ground px-5 py-4"
                  }
                  style={{ "--i": i } as CSSProperties}
                >
                  <span className="flex items-center gap-4">
                    <Face h={times[i]?.h ?? 0} m={times[i]?.m ?? 0} home={clock.home} />
                    <span className="flex flex-col">
                      <span className="font-medium">{clock.city}</span>
                      {clock.home ? (
                        <span className="flex items-center gap-1.5 text-xs text-accent">
                          <span className="relative flex size-2">
                            <span className="fw-pulse absolute inset-0 rounded-full bg-accent/50" />
                            <span className="relative size-2 rounded-full bg-accent" />
                          </span>
                          {studio.overlap.ours}
                        </span>
                      ) : null}
                    </span>
                  </span>
                  <span className="font-mono text-2xl tracking-[-0.02em] tabular-nums" suppressHydrationWarning>
                    {times[i]?.text ?? "--:--"}
                  </span>
                </li>
              ))}
            </ul>

            {/* our working day, drawn in each city's local time */}
            <div className="mt-6 rounded-card border border-line bg-ground p-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-semibold">{studio.overlap.title}</span>
                <span className="text-xs text-muted">{studio.overlap.note}</span>
              </div>
              <ol className="mt-4 flex flex-col gap-2.5">
                {studio.clocks.map((clock, i) => {
                  const off = studio.overlap.offsets[i] ?? 0;
                  const a = studio.overlap.start + off;
                  const b = studio.overlap.end + off;
                  return (
                    <li key={clock.city} className="grid grid-cols-[5rem_1fr] items-center gap-3 text-xs">
                      <span className="text-muted">{clock.city}</span>
                      <span className="relative h-3 overflow-hidden rounded-full bg-line/60">
                        {Array.from({ length: 24 }).map((_, hh) => (
                          <span key={hh} className="absolute inset-y-0 w-px bg-surface" style={{ left: `${(hh / 24) * 100}%` }} />
                        ))}
                        <span
                          className={"fw-tz-bar absolute inset-y-0 origin-left rounded-full " + (clock.home ? "bg-accent" : "bg-cyan/70")}
                          style={{ left: `${(a / 24) * 100}%`, width: `${((b - a) / 24) * 100}%`, "--i": i } as CSSProperties}
                        />
                        <span
                          className="absolute inset-y-0 w-0.5 bg-ink"
                          style={{ left: `${(((times[i]?.h ?? 0) + (times[i]?.m ?? 0) / 60) / 24) * 100}%` }}
                          suppressHydrationWarning
                        />
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
