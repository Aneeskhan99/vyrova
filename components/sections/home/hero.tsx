import {
  ArrowRight,
  Clapperboard,
  Code2,
  Film,
  Globe,
  MonitorPlay,
  Play,
  Scissors,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { DotPattern } from "@/components/ui/dot-pattern";
import { WordRotate } from "@/components/ui/word-rotate";
import { Orbit, OrbitRing } from "@/components/ui/orbiting-circles";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { LOOP } from "@/lib/motion";
import { hero } from "@/content/site/home";

const INNER_RADIUS = 160;
const OUTER_RADIUS = 248;

/** Content keys to icons. Content files stay free of components (C-01). */
const ICONS: Record<string, LucideIcon> = {
  animation: MonitorPlay,
  explainer: Clapperboard,
  wordpress: Globe,
  software: Code2,
  editing: Scissors,
  motion: Film,
};

/**
 * Above the fold, so every entrance here is a CSS animation (M-04) and
 * nothing in this section imports an animation library. The text is
 * readable in the static HTML; JavaScript only rotates the verb and
 * counts the stats.
 */
export function Hero() {
  const inner = hero.orbit.filter((item) => item.ring === "inner");
  const outer = hero.orbit.filter((item) => item.ring === "outer");

  return (
    <section className="relative overflow-hidden">
      <DotPattern gap={26} className="opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 35% 40%, transparent 0%, var(--color-ground) 78%)",
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-14 py-20 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-28">
          <div className="flex flex-col items-start gap-7">
            <h1 className="fw-rise text-[clamp(2.25rem,4.8vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.035em]">
              {/* Ordinary inline text with real spaces, so the word after
                  the rotating one moves with it as it changes width. */}
              <span className="relative block">
                {hero.headlineBefore}{" "}
                <WordRotate words={hero.rotatingWords} className="text-accent" />{" "}
                {hero.headlineAfter}
              </span>
              <span className="block">{hero.headlineSecondLine}</span>
            </h1>

            <p className="fw-rise fw-d1 max-w-[46ch] text-lg leading-relaxed text-muted">
              {hero.subhead}
            </p>

            <div className="fw-rise fw-d2 flex flex-wrap items-center gap-4">
              <ShimmerButton href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </ShimmerButton>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-surface px-6 py-4 text-base font-semibold transition-colors hover:border-ink/25"
              >
                <Play aria-hidden="true" className="size-4 fill-ink" />
                {hero.secondaryCta.label}
              </a>
            </div>

            <dl className="fw-rise fw-d3 mt-4 flex flex-wrap gap-x-14 gap-y-6">
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

          {/* Orbiting services. Decorative — the same five services are
              listed in full below, so nothing is lost here (M-09). */}
          <PauseOffscreen className="fw-rise fw-d1 relative mx-auto hidden aspect-square w-full max-w-[420px] lg:block">
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/25 blur-3xl" />
              <OrbitRing size={OUTER_RADIUS * 2} />
              <OrbitRing size={INNER_RADIUS * 2} />

              {inner.map((item, i) => (
                <Orbit
                  key={item.label}
                  radius={INNER_RADIUS}
                  duration={LOOP.orbitInner}
                  angle={i * 120}
                >
                  <OrbitIcon icon={item.icon} label={item.label} size="sm" />
                </Orbit>
              ))}

              {outer.map((item, i) => (
                <Orbit
                  key={item.label}
                  radius={OUTER_RADIUS}
                  duration={LOOP.orbitOuter}
                  angle={i * 120 + 60}
                  reverse
                >
                  <OrbitIcon icon={item.icon} label={item.label} size="lg" />
                </Orbit>
              ))}

              <div className="absolute left-1/2 top-1/2 flex size-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-line bg-surface shadow-lift">
                <span className="size-14 rounded-2xl bg-cyan" />
              </div>
            </div>
          </PauseOffscreen>
        </div>
      </Container>
    </section>
  );
}

function OrbitIcon({
  icon,
  label,
  size,
}: {
  icon: string;
  label: string;
  size: "sm" | "lg";
}) {
  const Icon = ICONS[icon] ?? MonitorPlay;
  return (
    <span
      title={label}
      className={
        size === "lg"
          ? "flex size-[68px] items-center justify-center rounded-full border border-line bg-surface text-accent shadow-card"
          : "flex size-16 items-center justify-center rounded-full border border-line bg-surface text-accent shadow-card"
      }
    >
      <Icon className={size === "lg" ? "size-6" : "size-[22px]"} strokeWidth={1.75} />
    </span>
  );
}
