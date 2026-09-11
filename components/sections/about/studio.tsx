"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { studio } from "@/content/site/about";

/**
 * The clocks are real, which means they cannot be rendered on the
 * server: the build machine's idea of "now" is not the visitor's, and a
 * static export bakes HTML once. So the placeholder ships in the HTML
 * and the time fills in after mount — no hydration mismatch (S-05).
 */
function useClocks() {
  const [times, setTimes] = useState<string[]>(() =>
    studio.clocks.map(() => "--:--"),
  );

  useEffect(() => {
    const read = () =>
      setTimes(
        studio.clocks.map((clock) =>
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: clock.zone,
          }).format(new Date()),
        ),
      );

    read();
    const id = window.setInterval(read, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return times;
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
                      ? "flex items-center justify-between rounded-card border border-accent/30 bg-accent-soft px-6 py-5"
                      : "flex items-center justify-between rounded-card border border-line bg-ground px-6 py-5"
                  }
                >
                  <span className="flex items-center gap-3">
                    {clock.home ? (
                      <span className="relative flex size-2.5">
                        <span className="fw-pulse absolute inset-0 rounded-full bg-accent/50" />
                        <span className="relative size-2.5 rounded-full bg-accent" />
                      </span>
                    ) : (
                      <span className="size-2.5 rounded-full bg-line" />
                    )}
                    <span className="font-medium">{clock.city}</span>
                  </span>
                  <span
                    className="font-mono text-2xl tracking-[-0.02em] tabular-nums"
                    suppressHydrationWarning
                  >
                    {times[i] ?? "--:--"}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
