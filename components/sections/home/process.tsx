import type { CSSProperties } from "react";
import {
  Clapperboard,
  MessageSquare,
  PackageCheck,
  PenLine,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { AutoRail } from "@/components/motion/auto-rail";
import { Container } from "@/components/layout/container";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
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

/**
 * The process as a pipeline. A conveyor line runs behind the four steps
 * with a pulse of light travelling along it on a loop; as the pulse
 * reaches each step, that step's icon pings. Every card is two-sided:
 * hover (or focus) turns it over to show what lands in your inbox at
 * that step. All transform and opacity; the flip is a 3D rotate.
 */
export function Process() {
  const n = process.steps.length;

  return (
    <section id="process" className="overflow-hidden border-y border-line bg-band py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {process.eyebrow}
              </p>
              <h2 className="whitespace-nowrap text-[clamp(1.5rem,2.7vw,2.5rem)] font-bold tracking-[-0.025em] max-sm:whitespace-normal">
                {process.title}
              </h2>
            </div>
            <p className="inline-flex items-center gap-2 text-sm text-muted">
              <RotateCcw aria-hidden="true" className="size-4 text-accent" />
              {process.hint}
            </p>
          </div>
        </Reveal>

        <PauseOffscreen className="relative mt-14">
          {/* The conveyor: a track and a pulse that rides it, desktop only. */}
          <div aria-hidden="true" className="fw-conveyor absolute inset-x-[12%] top-[4.75rem] hidden lg:block">
            <span className="fw-conveyor-track absolute inset-x-0 top-1/2 h-px -translate-y-1/2" />
            <span className="fw-conveyor-pulse absolute top-1/2 h-2 w-24 -translate-y-1/2 rounded-full" />
          </div>

          <AutoRail>
          <Stagger
            className="fw-xscroll relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
            itemClassName="h-full w-[68vw] shrink-0 snap-start sm:w-auto"
          >
            {process.steps.map((step, i) => {
              const Icon = ICONS[step.icon] ?? MessageSquare;
              return (
                <article
                  key={step.number}
                  tabIndex={0}
                  className="fw-flip group relative h-full min-h-[15.5rem] outline-none sm:min-h-[19rem]"
                  style={{ "--i": i, "--n": n } as CSSProperties}
                >
                  <div className="fw-flip-inner relative h-full">
                    {/* front */}
                    <div className="fw-face fw-face-front flex h-full flex-col gap-3 rounded-tile border border-line bg-surface p-5 shadow-card sm:gap-4 sm:p-7">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-2 -top-5 text-[5.5rem] font-bold leading-none tracking-tight text-ink/[0.045]"
                      >
                        {step.number}
                      </span>
                      <span className="fw-ping relative flex size-10 items-center justify-center rounded-2xl bg-accent-soft text-accent sm:size-12">
                        <Icon className="size-[22px]" strokeWidth={1.75} />
                        <span aria-hidden="true" className="fw-ping-ring absolute inset-0 rounded-2xl border-2 border-accent" />
                      </span>
                      <div className="relative flex items-baseline gap-2.5">
                        <span className="text-[0.8125rem] font-medium tracking-[0.1em] text-accent">
                          {step.number}
                        </span>
                        <span className="text-[0.8125rem] text-muted">{step.day}</span>
                      </div>
                      <span aria-hidden="true" className="relative h-0.5 w-10 rounded-full bg-cyan" />
                      <h3 className="relative text-lg font-semibold tracking-tight sm:text-xl">{step.title}</h3>
                      <p className="relative text-[0.875rem] leading-relaxed text-muted sm:text-[0.9375rem]">{step.body}</p>
                    </div>
                    {/* back */}
                    <div className="fw-face fw-face-back absolute inset-0 flex h-full flex-col justify-between gap-3 rounded-tile bg-ink p-5 text-surface shadow-lift sm:gap-4 sm:p-7">
                      <div className="flex items-center justify-between">
                        <span className="text-[0.8125rem] font-medium tracking-[0.1em] text-cyan">
                          {step.number}
                        </span>
                        <span className="text-[0.6875rem] uppercase tracking-[0.16em] text-surface/60">
                          {step.backNote}
                        </span>
                      </div>
                      <p className="text-[clamp(1.25rem,1.6vw,1.5rem)] font-semibold leading-snug tracking-tight">
                        {step.outcome}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm text-surface/70">
                        <Icon className="size-4 text-cyan" strokeWidth={1.75} />
                        {step.title} · {step.day}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </Stagger>
          </AutoRail>
        </PauseOffscreen>
      </Container>
    </section>
  );
}
