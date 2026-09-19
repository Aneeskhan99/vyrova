"use client";

import { useState, type CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { MotionStage, m } from "@/components/motion/m";
import { cn } from "@/lib/utils";
import { week } from "@/content/site/process";

type Tone = (typeof week.phases)[number]["tone"];

/**
 * Static maps, not template strings — Tailwind only sees class names it
 * can read in the source (T-02).
 */
const DOT: Record<Tone, string> = {
  setup: "bg-phase-setup",
  approve: "bg-phase-approve",
  build: "bg-phase-build",
  ship: "bg-phase-ship",
};

const BAR: Record<Tone, string> = {
  setup: "bg-phase-setup/15 text-phase-setup",
  approve: "bg-phase-approve/12 text-phase-approve",
  build: "bg-phase-build/12 text-phase-build",
  ship: "bg-phase-ship/8 text-phase-ship",
};

/**
 * `layoutId` is why this section uses Motion (M-07). One element is
 * shared across four buttons and Motion measures both positions and
 * tweens between them — the thing we could not do by hand on the
 * services tabs without it turning into a measured blob.
 *
 * The scroll entrance on the header, legend and day strip is <Reveal>
 * (CSS, M-03), not Motion — Motion here stays reserved for the shared
 * layout pill and the bar's spring, per the rule above. Each day card
 * gets its own <Reveal> with an index-based delay so the strip cascades
 * in left to right instead of popping in all at once; the hover "dim
 * the other days" effect is a plain Tailwind opacity class on an inner
 * wrapper so it never fights Reveal's own opacity transition on the
 * same element (Reveal already owns `[data-visible] { opacity }`, which
 * would beat a plain utility class in specificity).
 */
export function Week() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="border-t border-line bg-surface py-20 lg:py-28">
      <Container>
        <MotionStage>
          <Reveal className="max-w-[72ch]">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {week.eyebrow}
            </p>
            <h2 className="mt-3 whitespace-nowrap text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] max-sm:whitespace-normal">
              {week.title}
            </h2>
            <p className="mt-4 whitespace-nowrap leading-relaxed text-muted max-md:whitespace-normal">{week.intro}</p>
          </Reveal>

          {/* Phase legend — hovering one dims the other days */}
          <Reveal delay={0.08}>
            <div
              className="mt-8 flex gap-1 lg:mt-10 lg:flex-wrap lg:gap-2"
              onMouseLeave={() => setActive(null)}
            >
              {week.phases.map((phase, i) => (
                <button
                  key={phase.name}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(active === i ? null : i)}
                  aria-pressed={active === i}
                  className="relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[0.75rem] font-medium lg:gap-2 lg:px-4 lg:py-2 lg:text-sm"
                >
                  {active === i && (
                    <m.span
                      layoutId="fw-week-phase"
                      className="absolute inset-0 rounded-full border border-line bg-band"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span
                    className={`relative size-2 rounded-full ${DOT[phase.tone]}`}
                    aria-hidden="true"
                  />
                  <span className="relative">{phase.name}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Ten-day strip: a playhead sweeps the fortnight on a loop, the
              tiles rise in order as the strip enters, and each phase runs a
              band underneath. */}
          <ol className="fw-week relative mt-6 grid grid-cols-5 gap-2 sm:grid-cols-10 sm:gap-3">
            <li aria-hidden="true" className="fw-week-head pointer-events-none absolute -inset-y-3 left-0 hidden w-px bg-ink sm:block">
              <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-ink" />
            </li>
            {week.days.map((day, i) => {
              const phase = week.phases[day.phase];
              const dim = active !== null && active !== day.phase;
              if (!phase) return null;

              return (
                <li key={`${day.day}-${i}`} className="fw-week-day" style={{ "--i": i } as CSSProperties}>
                  <Reveal delay={0.12 + i * 0.035}>
                    <div
                      className={cn(
                        "fw-week-tile flex flex-col gap-2 transition-opacity duration-300",
                        dim && "opacity-30",
                      )}
                    >
                      <m.div
                        animate={{ scaleY: active === day.phase ? 1 : 0.55 }}
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                        className={`h-1.5 origin-bottom rounded-full ${DOT[phase.tone]}`}
                      />
                      <div
                        className={`rounded-xl px-2 py-3 text-center ${BAR[phase.tone]}`}
                      >
                        <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.12em] opacity-70">
                          {day.day}
                        </span>
                        <span className="mt-1 block text-xs font-medium leading-tight text-ink">
                          {day.work}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </MotionStage>
      </Container>
    </section>
  );
}
