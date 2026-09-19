"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { TiltCard } from "@/components/motion/tilt-card";
import { packages } from "@/content/site/services";
import { cn } from "@/lib/utils";

/**
 * Three plans under one spotlight. The cursor position is written to the
 * grid as two custom properties; every card's border lights up where the
 * light falls (a masked gradient ring), and the featured plan carries a
 * slowly turning conic border and floats a little. Bullets tick in one
 * by one when a card is hovered. No re-render per move.
 */
export function Packages() {
  const grid = useRef<HTMLDivElement>(null);

  function move(e: PointerEvent<HTMLDivElement>) {
    const el = grid.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--lit", "1");
    // each card's ring needs the light in its own coordinates
    el.querySelectorAll<HTMLElement>(".fw-plan-face").forEach((face) => {
      const f = face.getBoundingClientRect();
      face.style.setProperty("--ox", `${f.left - r.left}px`);
      face.style.setProperty("--oy", `${f.top - r.top}px`);
    });
  }
  function leave() {
    grid.current?.style.setProperty("--lit", "0");
  }

  return (
    <section id="packages" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="fw-plans-bg pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto flex max-w-[44rem] flex-col items-center gap-4 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {packages.eyebrow}
            </p>
            <h2 className="text-[clamp(1.875rem,3.8vw,3rem)] font-bold tracking-[-0.025em]">
              {packages.title}
            </h2>
            <p className="max-w-[52ch] leading-relaxed text-muted">{packages.intro}</p>
          </div>
        </Reveal>

        <div ref={grid} onPointerMove={move} onPointerLeave={leave} className="fw-plans relative mt-14">
          <Stagger className="grid gap-5 lg:grid-cols-3 lg:items-center" itemClassName="h-full" step={0.09}>
            {packages.plans.map((plan) => (
              <TiltCard key={plan.name} className="fw-plan h-full rounded-tile" max={4}>
                <article
                  className={cn(
                    "fw-plan-face relative flex h-full flex-col gap-6 rounded-tile border p-8",
                    plan.featured
                      ? "fw-plan-featured border-transparent bg-ink text-surface lg:-my-6 lg:py-14"
                      : "border-line bg-surface",
                  )}
                >
                  {plan.featured ? (
                    <span className="absolute -top-3.5 left-8 z-10 inline-flex items-center gap-1.5 rounded-full bg-cyan px-3 py-1 text-[0.6875rem] font-semibold text-ink">
                      <Sparkles className="size-3" />
                      {packages.badge}
                    </span>
                  ) : null}

                  <div className="relative flex flex-col gap-1.5">
                    <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                    <p className={cn("text-sm", plan.featured ? "text-surface/65" : "text-muted")}>
                      {plan.summary}
                    </p>
                  </div>

                  <ul className="relative flex flex-1 flex-col gap-3">
                    {plan.bullets.map((bullet, i) => (
                      <li
                        key={bullet}
                        className="fw-plan-bullet flex items-center gap-3"
                        style={{ "--i": i } as CSSProperties}
                      >
                        <span
                          className={cn(
                            "fw-plan-tick grid size-5 shrink-0 place-items-center rounded-full",
                            plan.featured ? "bg-cyan text-ink" : "bg-accent-soft text-accent",
                          )}
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span className="text-[0.9375rem]">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={cn(
                      "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5",
                      "text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5",
                      plan.featured ? "bg-cyan text-ink" : "bg-ink text-surface",
                    )}
                  >
                    {plan.cta}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </article>
              </TiltCard>
            ))}
          </Stagger>
          <p className="mt-6 hidden text-center text-xs text-muted lg:block">{packages.spotlightHint}</p>
        </div>
      </Container>
    </section>
  );
}
