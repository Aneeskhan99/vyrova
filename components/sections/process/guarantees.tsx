"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import { PenLine } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import {
  MotionStage,
  m,
  useMotionValue,
  useSpring,
  useTransform,
} from "@/components/motion/m";
import { NumberTicker } from "@/components/ui/number-ticker";
import { guarantees } from "@/content/site/process";

/** "48h" → 48 + "h", "100%" → 100 + "%", "2" → 2. */
function split(value: string): { n: number; suffix: string } {
  const m = /^(\d+)(.*)$/.exec(value);
  return m ? { n: Number(m[1]), suffix: m[2] ?? "" } : { n: 0, suffix: value };
}

/**
 * Three promises as three signed pages. Each card is paper (ruled lines,
 * a corner fold), the number counts up on arrival, an "In writing" stamp
 * slams onto it as it scrolls in, and a signature draws itself along the
 * foot. The spring tilt from before stays — Motion earns its place there.
 */
function Card({ item, index }: { item: (typeof guarantees.items)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 240, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), spring);
  const { n, suffix } = split(item.value);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, "--i": index } as CSSProperties}
      className="fw-paper group relative overflow-hidden rounded-card border border-line bg-surface p-7 shadow-card transition-shadow duration-300 hover:shadow-lift lg:p-9"
    >
      <span aria-hidden="true" className="fw-paper-fold absolute right-0 top-0 size-10" />
      <span aria-hidden="true" className="fw-stamp-mark absolute right-6 top-6 rounded-md border-2 border-accent px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-accent">
        {guarantees.stamp}
      </span>

      <span className="block text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-none tracking-[-0.04em] text-accent">
        <NumberTicker value={n} suffix={suffix} />
      </span>
      <h3 className="mt-5 text-lg font-semibold leading-snug tracking-[-0.015em]">{item.headline}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-dashed border-line pt-4">
        <span className="flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
          <PenLine className="size-3.5" />
          {guarantees.signed}
        </span>
        <svg viewBox="0 0 120 32" className="fw-sign h-8 w-32 text-ink" fill="none" aria-hidden="true">
          <path
            className="fw-sign-path"
            pathLength={1}
            d="M4 22c8-14 14-16 12-6s-6 14-2 8 10-18 14-10-2 16 4 8 10-14 14-8 0 12 6 6 12-14 16-8-4 14 4 8 12-12 18-8 4 10 10 6 10-10 16-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </m.div>
  );
}

export function Guarantees() {
  return (
    <section className="fw-promises relative overflow-hidden border-t border-line bg-surface py-20 lg:py-28">
      <Container>
        <MotionStage>
          <Reveal>
            <div className="flex flex-col gap-3">
              <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em]">
                {guarantees.title}
              </h2>
              <p className="max-w-[46ch] leading-relaxed text-muted">{guarantees.intro}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {guarantees.items.map((item, i) => (
              <Card key={item.value} item={item} index={i} />
            ))}
          </div>
        </MotionStage>
      </Container>
    </section>
  );
}
