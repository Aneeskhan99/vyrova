import { ArrowRight, Play } from "lucide-react";
import { Mark } from "@/components/brand/mark";
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

/**
 * Above the fold, so every entrance here is a CSS animation (M-04) and
 * nothing in this section imports an animation library. The text is
 * readable in the static HTML; JavaScript only rotates the verb and
 * counts the stats.
 */
export function Hero() {
  const inner = hero.orbit.filter((item) => item.ring === "inner");
  const outer = hero.orbit.filter((item) => item.ring === "outer");

  // The stage is a screenful on a laptop, but capped. Uncapped, 100svh
  // left about 390px of empty floor under the content on a tall desktop,
  // because the slack all collected at the bottom (justify-start) while
  // the headline sat hard against the navbar. Capped and centred, the
  // leftover splits evenly above and below at every size. The bar is 5rem
  // from a laptop up, not the 4rem it is on a phone.
  return (
    <section className="fw-hero-stage relative overflow-hidden">
      {/* Backdrop: a slow aurora in the brand's cyan and violet, and a
          perspective grid floor that runs towards the horizon. Both are
          transform-only loops, paused when the hero is off screen. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <PauseOffscreen className="absolute inset-0">
          <div className="fw-aurora">
            <span className="fw-aurora-a" />
            <span className="fw-aurora-b" />
            <span className="fw-aurora-c" />
          </div>
          <div className="fw-floor">
            <div className="fw-floor-plane" />
          </div>
        </PauseOffscreen>
      </div>
      <DotPattern gap={26} className="opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 35% 40%, transparent 0%, color-mix(in oklab, var(--color-ground) 70%, transparent) 78%)",
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-10 pb-16 pt-12 lg:grid-cols-[auto_auto] lg:justify-center lg:gap-6 lg:pb-20 lg:pt-0 xl:gap-8">
          <div className="flex w-full min-w-0 max-w-[36rem] flex-col items-start gap-5 lg:w-[30rem] lg:gap-6 xl:w-[34rem] xl:max-w-[38rem] xl:gap-7">
            <h1 className="fw-rise text-[clamp(1.875rem,3vw,2.625rem)] font-bold leading-[1.06] tracking-[-0.035em]">
              {/* Ordinary inline text with real spaces, so the word after
                  the rotating one moves with it as it changes width. */}
              <span className="relative block lg:whitespace-nowrap">
                {hero.headlineBefore}{" "}
                <WordRotate words={hero.rotatingWords} className="text-accent" />{" "}
                {hero.headlineAfter}
              </span>
              <span className="block">{hero.headlineSecondLine}</span>
            </h1>

            <p className="fw-rise fw-d1 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">
              {hero.subhead}
            </p>

            <div className="fw-rise fw-d2 mt-2 flex w-full items-center gap-2 lg:mt-0 lg:w-auto lg:gap-4">
              <ShimmerButton href={hero.primaryCta.href} className="px-4 py-3 text-[0.8125rem] lg:px-7 lg:py-4 lg:text-base">
                {hero.primaryCta.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </ShimmerButton>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-3.5 py-3 text-[0.8125rem] font-semibold transition-colors hover:border-ink/25 lg:gap-2.5 lg:px-6 lg:py-4 lg:text-base"
              >
                <Play aria-hidden="true" className="size-4 fill-ink" />
                {hero.secondaryCta.label}
              </a>
            </div>

            <dl className="fw-rise fw-d3 mt-6 grid w-full grid-cols-3 gap-x-4 lg:mt-4 lg:gap-x-6 xl:gap-x-10">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <dt className="order-2 text-[0.75rem] leading-snug text-muted lg:text-[0.8125rem]">{stat.label}</dt>
                  <dd className="order-1 text-[1.5rem] font-semibold tracking-tight xl:text-[1.75rem]">
                    <NumberTicker value={stat.value} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Orbiting services. Decorative — the same five services are
              listed in full below, so nothing is lost here (M-09). */}
          <PauseOffscreen className="fw-rise fw-d1 relative hidden aspect-square w-[30rem] lg:block lg:translate-y-6 xl:w-[34rem]">
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/25 blur-3xl" />
              <div className="fw-sweep absolute left-1/2 top-1/2 size-[92%] rounded-full" />
              <OrbitRing size={OUTER_RADIUS * 2} />
              <OrbitRing size={INNER_RADIUS * 2} />

              {inner.map((item, i) => (
                <Orbit
                  key={item.label}
                  radius={INNER_RADIUS}
                  duration={LOOP.orbitInner}
                  angle={i * 120}
                >
                  <OrbitLogo
                    file={item.file}
                    label={item.label}
                    size="sm"
                    scale={item.scale}
                  />
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
                  <OrbitLogo
                    file={item.file}
                    label={item.label}
                    size="lg"
                    scale={item.scale}
                  />
                </Orbit>
              ))}

              <div className="absolute left-1/2 top-1/2 flex size-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <Mark id="hero" priority className="fw-mark-float size-32 drop-shadow-2xl" />
              </div>
            </div>
          </PauseOffscreen>
        </div>

        <a
          href="#clients"
          aria-label={hero.scrollCue}
          className="fw-rise fw-d4 absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink lg:flex"
        >
          {hero.scrollCue}
          <span className="fw-cue relative block h-10 w-px overflow-hidden bg-line">
            <span className="fw-cue-bar absolute inset-x-0 top-0 h-4 bg-accent" />
          </span>
        </a>
      </Container>
    </section>
  );
}

/**
 * One tool logo in its tile.
 *
 * The mark is an <img> pointing at /public/logos/<file>.svg, so a real
 * brand SVG replaces a placeholder by overwriting the file — no code
 * change, and no icon library in the hero bundle. Decorative: alt is
 * empty and the name is carried by the title, because the same tools
 * are named in text further down the page (M-09, A-01).
 *
 * `scale` exists because downloaded brand SVGs each carry their own
 * built-in padding; one logo always needs a nudge to sit right.
 */
function OrbitLogo({
  file,
  label,
  size,
  scale = 1,
}: {
  file: string;
  label: string;
  size: "sm" | "lg";
  scale?: number;
}) {
  const tile = size === "lg" ? 72 : 60;
  const mark = Math.round((size === "lg" ? 32 : 27) * scale);

  return (
    <span
      title={label}
      style={{ width: tile, height: tile }}
      className="flex items-center justify-center rounded-full border border-line bg-surface shadow-card"
    >
      {/* next/image is deliberately not used: it would put JavaScript in
          front of the hero for a 1 KB static SVG (M-04, P-02). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/logos/${file}.svg`}
        alt=""
        width={mark}
        height={mark}
        style={{ width: mark, height: mark }}
        className="object-contain"
      />
    </span>
  );
}
