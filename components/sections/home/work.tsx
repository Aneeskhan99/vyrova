"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/layout/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Reveal } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { UiMock } from "@/components/sections/shared/ui-mock";
import { work } from "@/content/site/home";
import { cn } from "@/lib/utils";

/**
 * Two rows drifting in opposite directions as the section scrolls.
 * Only `x` is animated (M-01), and the rows are wider than the viewport
 * by design so the drift never exposes an empty edge.
 */
export function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], ["-6%", "2%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["2%", "-6%"]);

  return (
    <section id="work" className="overflow-hidden py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {work.eyebrow}
              </p>
              <h2 className="text-[clamp(1.875rem,3.8vw,3rem)] font-bold tracking-[-0.025em]">
                {work.title}
              </h2>
              <p className="max-w-[44ch] leading-relaxed text-muted">{work.intro}</p>
            </div>
            <a
              href={work.cta.href}
              className="inline-flex items-center gap-2 self-start text-[0.9375rem] font-semibold text-accent"
            >
              {work.cta.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </Reveal>
      </Container>

      <div ref={ref} className="mt-14 flex flex-col gap-5">
        <motion.div
          style={reduced ? undefined : { x: xLeft }}
          className="flex w-max gap-5 px-5"
        >
          {work.rowOne.map((item, i) => (
            <WorkCard key={item.name} name={item.name} note={item.note} index={i} />
          ))}
        </motion.div>
        <motion.div
          style={reduced ? undefined : { x: xRight }}
          className="flex w-max gap-5 px-5"
        >
          {work.rowTwo.map((item, i) => (
            <WorkCard key={item.name} name={item.name} note={item.note} index={i + 4} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const TINTS = [
  "from-cyan/30 to-accent/20",
  "from-indigo-200/60 to-indigo-300/40",
  "from-emerald-200/60 to-emerald-300/40",
  "from-amber-200/60 to-amber-300/40",
] as const;

function WorkCard({
  name,
  note,
  index,
}: {
  name: string;
  note: string;
  index: number;
}) {
  const tint = TINTS[index % TINTS.length];

  return (
    <MagicCard className="w-[19rem] shrink-0 rounded-tile border border-line bg-surface shadow-card sm:w-[25rem]">
      <article>
        <div
          className={cn(
            "relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br p-7",
            tint,
          )}
        >
          <UiMock className="shadow-card" bars={8} highlight={index % 8} />
        </div>
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <div className="flex min-w-0 flex-col gap-0.5">
            <h3 className="truncate font-semibold">{name}</h3>
            <p className="truncate text-[0.8125rem] text-muted">{note}</p>
          </div>
          <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-accent" />
        </div>
      </article>
    </MagicCard>
  );
}
