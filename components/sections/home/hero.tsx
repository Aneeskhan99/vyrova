import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { DotPattern } from "@/components/ui/dot-pattern";
import { WordRotate } from "@/components/ui/word-rotate";
import { Orbit, OrbitRing } from "@/components/ui/orbiting-circles";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { LOOP } from "@/lib/motion";
import { hero } from "@/content/site/home";

/**
 * Above the fold, so every entrance here is a CSS animation (M-04).
 * The text is present and readable in the static HTML; JavaScript only
 * adds the word rotation and the counting stats.
 */
export function Hero() {
  const INNER_RADIUS = 170;
  const OUTER_RADIUS = 260;
  const orbitItems = hero.orbit;

  return (
    <section className="relative overflow-hidden">
      <DotPattern gap={26} className="opacity-60" />
      {/* Fades the dot grid out towards the edges of the section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 35% 40%, transparent 0%, var(--color-ground) 78%)",
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-14 py-20 lg:grid-cols-[minmax(0,1fr)_480px] lg:py-28">
          <div className="flex flex-col items-start gap-7">
            <p className="fw-rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-2 text-[0.8125rem] font-medium text-muted">
              <span aria-hidden="true" className="size-2 rounded-full bg-cyan" />
              {hero.eyebrow}
            </p>

            <h1 className="fw-rise fw-d1 text-[clamp(2.5rem,6.4vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {hero.headlineBefore}
                <span className="rounded-2xl border border-accent/40 bg-cyan/20 px-4 pb-1 text-accent">
                  <WordRotate words={hero.rotatingWords} />
                </span>
                {hero.headlineAfter}
              </span>
              <span className="block">{hero.headlineSecondLine}</span>
            </h1>

            <p className="fw-rise fw-d2 max-w-[46ch] text-lg leading-relaxed text-muted">
              {hero.subhead}
            </p>

            <div className="fw-rise fw-d3 flex flex-wrap items-center gap-4">
              <ShimmerButton href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </ShimmerButton>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-6 py-4 text-base font-semibold transition-colors hover:border-ink/25"
              >
                <Play aria-hidden="true" className="size-4 fill-ink" />
                {hero.secondaryCta.label}
              </a>
            </div>

            <dl className="fw-rise fw-d4 mt-4 flex flex-wrap gap-x-14 gap-y-6">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <dt className="order-2 text-sm text-muted">{stat.label}</dt>
                  <dd className="order-1 text-[1.75rem] font-semibold tracking-tight">
                    <NumberTicker value={stat.value} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Orbiting services. Decorative — the same information is in
              the services section below, so nothing is lost here (M-09). */}
          <PauseOffscreen className="fw-rise fw-d2 relative mx-auto hidden aspect-square w-full max-w-[480px] lg:block">
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/25 blur-3xl" />
              <OrbitRing size={OUTER_RADIUS * 2} />
              <OrbitRing size={INNER_RADIUS * 2} />

              {orbitItems.slice(0, 3).map((item, i) => (
                <Orbit
                  key={item}
                  radius={INNER_RADIUS}
                  duration={LOOP.orbitInner}
                  angle={i * 120}
                >
                  <span className="flex size-16 items-center justify-center rounded-full border border-line bg-surface text-xs font-semibold text-accent shadow-card">
                    {item}
                  </span>
                </Orbit>
              ))}

              {orbitItems.slice(3).map((item, i) => (
                <Orbit
                  key={item}
                  radius={OUTER_RADIUS}
                  duration={LOOP.orbitOuter}
                  angle={i * 120 + 60}
                  reverse
                >
                  <span className="flex size-[68px] items-center justify-center rounded-full border border-line bg-surface text-xs font-semibold text-accent shadow-card">
                    {item}
                  </span>
                </Orbit>
              ))}

              <div className="absolute left-1/2 top-1/2 flex size-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2.25rem] border border-line bg-surface shadow-lift">
                <span className="size-16 rounded-2xl bg-cyan" />
              </div>
            </div>
          </PauseOffscreen>
        </div>
      </Container>
    </section>
  );
}
