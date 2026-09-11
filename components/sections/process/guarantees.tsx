"use client";

import { useRef, type PointerEvent } from "react";
import { Container } from "@/components/layout/container";
import {
  MotionStage,
  m,
  useMotionValue,
  useSpring,
  useTransform,
} from "@/components/motion/m";
import { guarantees } from "@/content/site/process";

/**
 * Motion earns its place here for one reason: a pointer position fed
 * through a spring into `rotateX` / `rotateY` (M-07). CSS can tilt on
 * hover, but it cannot follow the cursor or settle with physics when it
 * leaves.
 */
function Card({ item }: { item: (typeof guarantees.items)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 240, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), spring);

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
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative rounded-card border border-line bg-surface p-7 shadow-card transition-shadow duration-300 hover:shadow-lift lg:p-9"
    >
      <span className="block text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-none tracking-[-0.04em] text-accent">
        {item.value}
      </span>
      <h3 className="mt-5 text-lg font-semibold leading-snug tracking-[-0.015em]">
        {item.headline}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
    </m.div>
  );
}

export function Guarantees() {
  return (
    <section className="border-t border-line bg-surface py-20 lg:py-28">
      <Container>
        <MotionStage>
          <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em]">
            {guarantees.title}
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {guarantees.items.map((item) => (
              <Card key={item.value} item={item} />
            ))}
          </div>
        </MotionStage>
      </Container>
    </section>
  );
}
