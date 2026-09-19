import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { principles } from "@/content/site/about";

/**
 * Four rules, four cards that arrive from alternate sides with a slight
 * twist (scroll-driven), lean towards the cursor, and carry a ghost
 * numeral that slides across when hovered. The rule's title underlines
 * itself on hover.
 */
export function Principles() {
  return (
    <section className="overflow-hidden border-t border-line bg-surface py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="max-w-[70ch]">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {principles.eyebrow}
            </p>
            <h2 className="mt-3 whitespace-nowrap text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] max-sm:whitespace-normal">
              {principles.title}
            </h2>
          </div>
        </Reveal>

        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {principles.items.map((item, i) => (
            <li key={item.number} className="fw-rule" style={{ "--i": i, "--dir": i % 2 === 0 ? -1 : 1 } as CSSProperties}>
              <TiltCard className="fw-rule-card h-full rounded-card" max={5}>
                <article className="relative h-full overflow-hidden rounded-card border border-line bg-ground p-7 shadow-card lg:p-9">
                  <span aria-hidden="true" className="fw-rule-num pointer-events-none absolute -right-3 -top-8 select-none text-[9rem] font-bold leading-none tracking-[-0.06em]">
                    {item.number}
                  </span>
                  <span className="relative text-[0.6875rem] font-semibold tracking-[0.14em] text-accent">
                    {item.number}
                  </span>
                  <h3 className="relative mt-3 text-lg font-semibold tracking-[-0.015em] lg:text-xl">
                    <span className="fw-rule-title">{item.title}</span>
                  </h3>
                  <p className="relative mt-3 leading-relaxed text-muted">{item.body}</p>
                </article>
              </TiltCard>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
