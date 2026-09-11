"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { MotionStage, m, EASE_OUT, DURATION } from "@/components/motion/m";
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
 */
export function Week() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="border-t border-line bg-surface py-20 lg:py-28">
      <Container>
        <MotionStage>
          <div className="max-w-[46ch]">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {week.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em]">
              {week.title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{week.intro}</p>
          </div>

          {/* Phase legend — hovering one dims the other days */}
          <div
            className="mt-10 flex flex-wrap gap-2"
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
                className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
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

          {/* Ten-day strip */}
          <ol className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-10 sm:gap-3">
            {week.days.map((day, i) => {
              const phase = week.phases[day.phase];
              const dim = active !== null && active !== day.phase;
              if (!phase) return null;

              return (
                <m.li
                  key={`${day.day}-${i}`}
                  animate={{ opacity: dim ? 0.3 : 1 }}
                  transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                  className="flex flex-col gap-2"
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
                </m.li>
              );
            })}
          </ol>
        </MotionStage>
      </Container>
    </section>
  );
}
