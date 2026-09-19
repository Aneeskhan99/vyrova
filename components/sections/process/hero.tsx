import type { CSSProperties } from "react";
import { ArrowRight, Check, Phone, Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { Ripple } from "@/components/ui/ripple";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { hero } from "@/content/site/process";

/**
 * Above the fold, so this stays CSS only (M-04). The empty flanks are
 * now the story itself: Monday's brief card on the left, Wednesday's
 * first cut on the right, and a route between them that a pulse travels
 * along, Mon → Tue → Wed, on a loop. The cards float on their own phase.
 */
export function Hero() {
  const [line1, line2] = hero.title.split("\n");

  return (
    <section className="relative isolate overflow-hidden py-14 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="fw-aurora" style={{ opacity: 0.35 }}>
          <span className="fw-aurora-a" />
          <span className="fw-aurora-b" />
        </div>
      </div>
      <Ripple />

      <Container>
        <div className="relative">
          {/* Monday, left */}
          <PauseOffscreen className="fw-rise fw-d3 absolute left-0 top-[58%] hidden w-56 -translate-y-1/2 xl:block 2xl:w-64">
            <div className="fw-float rounded-card border border-line bg-surface p-5 shadow-lift" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-accent-soft px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent">
                  {hero.monday.day}
                </span>
                <span className="text-xs text-muted">{hero.monday.time}</span>
              </div>
              <p className="mt-3 flex items-center gap-2 font-semibold">
                <Phone className="size-4 text-accent" />
                {hero.monday.label}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {hero.monday.items.map((item, i) => (
                  <li
                    key={item}
                    className="fw-hero-tick flex items-center gap-2 text-sm text-muted"
                    style={{ "--i": i } as CSSProperties}
                  >
                    <span className="fw-hero-tick-box grid size-4 place-items-center rounded-full bg-accent text-surface">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </PauseOffscreen>

          {/* Wednesday, right */}
          <PauseOffscreen className="fw-rise fw-d3 absolute right-0 top-[58%] hidden w-56 -translate-y-1/2 xl:block 2xl:w-64">
            <div className="fw-float rounded-card border border-line bg-ink p-5 text-surface shadow-lift" style={{ animationDelay: "1.6s" }}>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-cyan/20 px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-cyan">
                  {hero.wednesday.day}
                </span>
                <span className="text-xs text-surface/60">{hero.wednesday.time}</span>
              </div>
              <div className="relative mt-3 flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo/40 via-ink to-violet/30">
                <span className="fw-hero-play grid size-10 place-items-center rounded-full bg-surface text-ink">
                  <Play className="ml-0.5 size-4 fill-current" />
                </span>
                <span className="absolute inset-x-3 bottom-2 h-1 overflow-hidden rounded-full bg-surface/20">
                  <span className="fw-hero-scrub absolute inset-y-0 left-0 w-full origin-left bg-cyan" />
                </span>
              </div>
              <p className="mt-3 font-semibold">{hero.wednesday.label}</p>
              <p className="text-xs text-surface/60">{hero.wednesday.note}</p>
            </div>
          </PauseOffscreen>

          {/* the route between them */}
          <PauseOffscreen className="pointer-events-none absolute inset-x-56 top-[78%] hidden -translate-y-1/2 xl:block 2xl:inset-x-64">
            <div aria-hidden="true" className="fw-route relative mx-6 h-px border-t border-dashed border-line">
              <span className="fw-route-pulse absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-cyan" />
              {hero.route.map((d, i) => (
                <span
                  key={d}
                  className="absolute top-1/2 -translate-y-1/2 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted"
                  style={{ left: `${(i / (hero.route.length - 1)) * 100}%`, transform: "translate(-50%, 12px)" }}
                >
                  {d}
                </span>
              ))}
            </div>
          </PauseOffscreen>

          <div className="relative flex max-w-[44rem] flex-col gap-5 lg:mx-auto lg:items-center lg:gap-7 lg:text-center">
            <p className="fw-rise text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {hero.eyebrow}
            </p>
            <h1 className="fw-rise fw-d1 max-w-[20ch] text-[clamp(1.75rem,5vw,4rem)] font-bold leading-[1.08] tracking-[-0.035em]">
              {line1}
              <br />
              <span className="text-accent">{line2}</span>
            </h1>
            <p className="fw-rise fw-d2 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted lg:text-lg">{hero.intro}</p>
            <div className="fw-rise fw-d3 mt-1 flex items-center gap-2 lg:mt-2 lg:flex-wrap lg:justify-center lg:gap-4">
              <ShimmerButton href={hero.primary.href} className="px-4 py-3 text-[0.8125rem] lg:px-7 lg:py-4 lg:text-base">
                {hero.primary.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </ShimmerButton>
              <a
                href={hero.secondary.href}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-3.5 py-3 text-[0.8125rem] font-medium shadow-card transition-colors hover:border-accent/40 lg:px-6 lg:text-sm"
              >
                {hero.secondary.label}
              </a>
            </div>
            <div className="fw-rise fw-d4 mt-4 flex flex-col gap-1 lg:mt-6 lg:items-center">
              <span className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.04em] text-accent">
                <NumberTicker value={hero.counter.value} suffix={hero.counter.suffix} />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                {hero.counter.label}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
