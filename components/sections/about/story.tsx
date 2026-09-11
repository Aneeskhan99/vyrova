"use client";

import { useRef, type RefObject } from "react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { MotionStage, m, useScroll, useSpring } from "@/components/motion/m";
import { story } from "@/content/site/about";

/**
 * Motion drives the progress ring only (M-07): `pathLength` tied to a
 * scroll position and smoothed by a spring is not something CSS can
 * express. The chapters themselves use <Reveal>, so they are never
 * waiting on the async Motion chunk to become visible.
 */
function ProgressRing({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.75", "end 0.75"],
  });
  const draw = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <MotionStage>
      <svg viewBox="0 0 100 100" className="size-20" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          strokeWidth="3"
          className="stroke-line"
        />
        <m.circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          className="stroke-accent"
          style={{ pathLength: draw, rotate: -90, transformOrigin: "50% 50%" }}
        />
      </svg>
    </MotionStage>
  );
}

export function Story() {
  const listRef = useRef<HTMLOListElement>(null);

  return (
    <section className="border-t border-line bg-surface py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {story.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em]">
              {story.title}
            </h2>
            <div className="mt-8 hidden lg:block">
              <ProgressRing targetRef={listRef} />
            </div>
          </div>

          <ol ref={listRef} className="flex flex-col gap-5">
            {story.chapters.map((chapter, i) => (
              <li key={chapter.marker}>
                <Reveal delay={i * 0.05}>
                  <article className="rounded-card border border-line bg-ground p-7 shadow-card transition-shadow duration-300 hover:shadow-lift lg:p-9">
                    <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-accent">
                      {chapter.marker}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] lg:text-2xl">
                      {chapter.title}
                    </h3>
                    <p className="mt-3 max-w-[58ch] leading-relaxed text-muted">
                      {chapter.body}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
