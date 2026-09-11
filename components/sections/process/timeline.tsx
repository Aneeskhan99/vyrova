"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { MotionStage, m, useScroll, useSpring } from "@/components/motion/m";
import { steps } from "@/content/site/process";

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

function Step({ step, index }: { step: (typeof steps)[number]; index: number }) {
  return (
    <li className="relative">
      <Reveal
        delay={index * 0.04}
        className="grid grid-cols-[40px_1fr] gap-5 lg:grid-cols-[56px_1fr] lg:gap-8"
      >
        {/* Rail marker */}
        <div className="pt-1">
          <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-line bg-surface text-[0.6875rem] font-semibold tracking-[0.08em] text-accent shadow-card lg:size-14 lg:text-xs">
            {step.number}
          </span>
        </div>

        {/* Card */}
        <div className="pb-14 lg:pb-20">
          <div className="rounded-card border border-line bg-surface p-6 shadow-card transition-shadow duration-300 hover:shadow-lift lg:p-8">
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">
              {step.day}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] lg:text-2xl">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[54ch] leading-relaxed text-muted">
              {step.body}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
              {step.gets.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-band px-3 py-1.5 text-[0.8125rem] text-ink/80"
                >
                  <Check className="size-3.5 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </li>
  );
}

export function Timeline() {
  return (
    <section className="border-t border-line bg-ground py-20 lg:py-28">
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
