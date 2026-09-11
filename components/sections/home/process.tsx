import {
  Clapperboard,
  MessageSquare,
  PackageCheck,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { process } from "@/content/site/home";

/** Content keys to icons (C-01). */
const ICONS: Record<string, LucideIcon> = {
  brief: MessageSquare,
  script: PenLine,
  animate: Clapperboard,
  deliver: PackageCheck,
};

export function Process() {
  return (
    <section id="process" className="border-y border-line bg-band py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {process.eyebrow}
            </p>
            <h2 className="max-w-[20ch] text-[clamp(1.875rem,3.8vw,3rem)] font-bold tracking-[-0.025em]">
              {process.title}
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-14">
          {/* The numbers are a real sequence, so a line joining them is
              information rather than decoration. Desktop only, where the
              cards actually sit in a row. */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[4.5rem] hidden border-t border-dashed border-ink/15 lg:block"
          />

          <Stagger
            className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            itemClassName="h-full"
          >
            {process.steps.map((step) => {
              const Icon = ICONS[step.icon] ?? MessageSquare;
              return (
                <article
                  key={step.number}
                  className="group fw-tilt relative flex h-full flex-col gap-4 overflow-hidden rounded-tile border border-line bg-surface p-7 hover:border-accent/40 hover:shadow-lift"
                >
                  {/* Oversized numeral, sitting behind the content. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-5 text-[5.5rem] font-bold leading-none tracking-tight text-ink/[0.045] transition-colors duration-300 group-hover:text-accent/10"
                  >
                    {step.number}
                  </span>

                  <span className="relative flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon className="size-[22px]" strokeWidth={1.75} />
                  </span>

                  <div className="relative flex items-baseline gap-2.5">
                    <span className="text-[0.8125rem] font-medium tracking-[0.1em] text-accent">
                      {step.number}
                    </span>
                    <span className="text-[0.8125rem] text-muted">{step.day}</span>
                  </div>

                  {/* Grows on hover — the only thing that moves in the card
                      besides the lift, so it reads as a deliberate accent. */}
                  <span
                    aria-hidden="true"
                    className="relative h-0.5 w-10 origin-left rounded-full bg-cyan transition-transform duration-500 ease-out group-hover:scale-x-[3.2]"
                  />

                  <h3 className="relative text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="relative text-[0.9375rem] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </article>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
