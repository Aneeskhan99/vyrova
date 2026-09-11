import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { BorderBeam } from "@/components/ui/border-beam";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { packages } from "@/content/site/services";
import { cn } from "@/lib/utils";

export function Packages() {
  return (
    <section id="packages" className="py-24 lg:py-32">
      <Container>
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

        <Stagger
          className="mt-14 grid gap-5 lg:grid-cols-3"
          itemClassName="h-full"
          step={0.09}
        >
          {packages.plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "relative flex h-full flex-col gap-6 overflow-hidden rounded-tile border p-8",
                plan.featured
                  ? "border-transparent bg-ink text-surface"
                  : "border-line bg-surface",
              )}
            >
              {plan.featured ? <BorderBeam surfaceClassName="bg-ink" /> : null}

              <div className="relative flex flex-col gap-1.5">
                <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                <p
                  className={cn(
                    "text-sm",
                    plan.featured ? "text-surface/65" : "text-muted",
                  )}
                >
                  {plan.summary}
                </p>
              </div>

              <ul className="relative flex flex-1 flex-col gap-3">
                {plan.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full bg-cyan"
                    />
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
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
