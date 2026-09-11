import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Ripple } from "@/components/ui/ripple";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { hero } from "@/content/site/process";

/**
 * Above the fold, so this stays CSS only — no Motion import anywhere in
 * this file's tree (M-04). The ripple is keyframes, the entrance is
 * .fw-rise, the counter is an IntersectionObserver.
 */
export function Hero() {
  const [line1, line2] = hero.title.split("\n");

  return (
    <section className="relative isolate overflow-hidden py-24 lg:py-32">
      <Ripple />

      <Container>
        <div className="relative flex flex-col items-center gap-7 text-center">
          <p className="fw-rise text-xs font-medium uppercase tracking-[0.16em] text-accent">
            {hero.eyebrow}
          </p>

          <h1 className="fw-rise fw-d1 max-w-[20ch] text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            {line1}
            <br />
            <span className="text-accent">{line2}</span>
          </h1>

          <p className="fw-rise fw-d2 max-w-[58ch] text-lg leading-relaxed text-muted">
            {hero.intro}
          </p>

          <div className="fw-rise fw-d3 mt-2 flex flex-wrap items-center justify-center gap-4">
            <ShimmerButton href={hero.primary.href}>
              {hero.primary.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </ShimmerButton>
            <a
              href={hero.secondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium shadow-card transition-colors hover:border-accent/40"
            >
              {hero.secondary.label}
            </a>
          </div>

          <div className="fw-rise fw-d4 mt-6 flex flex-col items-center gap-1">
            <span className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.04em] text-accent">
              <NumberTicker value={hero.counter.value} suffix={hero.counter.suffix} />
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              {hero.counter.label}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
