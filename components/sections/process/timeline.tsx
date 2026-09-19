"use client";

import { useRef, type CSSProperties } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { MotionStage, m, useScroll, useSpring } from "@/components/motion/m";
import { steps, stepLabels } from "@/content/site/process";
import { BorderBeam } from "@/components/ui/border-beam";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";

/**
 * The split this whole page is built around (M-07).
 *
 * The RAIL uses Motion: a scroll position smoothed by a spring is the
 * one thing CSS has no answer for, and if the Motion chunk is slow the
 * rail simply stays unfilled — nothing is hidden.
 *
 * The STEPS use <Reveal>, which is CSS. They must not start at
 * opacity 0 under Motion's control: `LazyMotion` fetches its features
 * asynchronously, so a Motion-driven entrance leaves six blank cards on
 * screen for as long as that chunk takes to arrive.
 */
function Rail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.65"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // bottom-14 / lg:bottom-20 mirror the per-step padding below, so the
  // rail stops at the last card instead of running into empty space.
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute bottom-14 left-[19px] top-2 w-px bg-line lg:bottom-20 lg:left-[27px]"
    >
      <MotionStage>
        <m.div
          style={{ scaleY: fill }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-cyan via-accent to-accent"
        />
      </MotionStage>
    </div>
  );
}

/** "Day 3 to 5" → [3, 5]; "Day 10" → [10, 10]. Drives the day meter. */
function span(day: string): [number, number] {
  const nums = day.match(/\d+/g)?.map(Number) ?? [1];
  return [nums[0] ?? 1, nums[nums.length - 1] ?? nums[0] ?? 1];
}

function Step({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const [from, to] = span(step.day);
  return (
    <li className="fw-step relative" style={{ "--i": index } as CSSProperties}>
      <Reveal
        delay={index * 0.04}
        className="grid grid-cols-[36px_minmax(0,1fr)] gap-3 lg:grid-cols-[56px_minmax(0,1fr)] lg:gap-8"
      >
        {/* Rail marker: pops in, pings, and once the card is passed it
            becomes a filled check. */}
        <div className="pt-1">
          <span className="fw-step-dot relative z-10 flex size-9 items-center justify-center rounded-full border border-line bg-surface text-[0.625rem] font-semibold tracking-[0.08em] text-accent shadow-card lg:size-14 lg:text-xs">
            {step.number}
            <span aria-hidden="true" className="fw-step-ping absolute inset-0 rounded-full border-2 border-accent" />
            <span aria-hidden="true" className="fw-step-dot-done absolute inset-0 grid place-items-center rounded-full bg-accent text-surface">
              <Check className="size-4 lg:size-5" strokeWidth={3} />
            </span>
          </span>
        </div>

        {/* Card: swings in around the rail, holds while you read it, then
            settles back and is stamped Done as it leaves. A beam runs the
            border of the card you are on. */}
        <div className="fw-step-swing pb-14 lg:pb-20">
          <PauseOffscreen className="fw-step-card group relative min-w-0 overflow-hidden rounded-card border border-line bg-surface p-5 pb-4 shadow-card transition-shadow duration-300 hover:shadow-lift lg:p-8">
            <BorderBeam />
            <span aria-hidden="true" className="fw-step-veil pointer-events-none absolute inset-0 rounded-[inherit] bg-ground" />
            <span aria-hidden="true" className="fw-step-done absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[0.6875rem] font-semibold text-surface lg:right-7 lg:top-7">
              <Check className="size-3" strokeWidth={3} />
              {stepLabels.done}
            </span>

            <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">
                {step.day}
              </p>
              {/* day meter: where this step sits in the ten days */}
              <span aria-hidden="true" className="relative h-1.5 w-24 overflow-hidden rounded-full bg-band lg:w-40">
                <span
                  className="fw-step-meter absolute inset-y-0 rounded-full bg-gradient-to-r from-cyan to-accent"
                  style={{ left: `${((from - 1) / 10) * 100}%`, width: `${((to - from + 1) / 10) * 100}%` }}
                />
              </span>
              <span className="text-[0.6875rem] text-muted">{stepLabels.dayOf}</span>
            </div>
            <h3 className="relative mt-2.5 text-lg font-semibold tracking-[-0.02em] lg:mt-3 lg:text-2xl">
              {step.title}
            </h3>
            <p className="relative mt-2 max-w-[54ch] text-[0.875rem] leading-relaxed text-muted lg:mt-3 lg:text-base">{step.body}</p>

            <ul className="fw-xscroll relative mt-4 flex min-w-0 max-w-full gap-2 overflow-x-auto border-t border-line pt-4 lg:mt-5 lg:flex-wrap lg:overflow-visible lg:pt-5">
              {step.gets.map((item, j) => (
                <li
                  key={item}
                  className="fw-step-chip inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-band px-2.5 py-1 text-[0.75rem] text-ink/80 lg:gap-2 lg:px-3 lg:py-1.5 lg:text-[0.8125rem]"
                  style={{ "--j": j } as CSSProperties}
                >
                  <Check className="size-3.5 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </PauseOffscreen>
        </div>
      </Reveal>
    </li>
  );
}

export function Timeline() {
  return (
    <section className="overflow-hidden border-t border-line bg-ground py-20 lg:py-28">
      <Container>
        <div className="relative">
          <Rail />
          <ol className="relative">
            {steps.map((step, i) => (
              <Step key={step.number} step={step} index={i} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
