import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { LazyVideo } from "@/components/motion/lazy-video";
import { Reveal } from "@/components/motion/reveal";
import { showcase } from "@/content/site/home";

/**
 * The showcase as a laptop on a desk. The lid is the tilting panel
 * (ContainerScroll: it lies back while the section is below the fold and
 * stands up as you scroll); the base sits under it with a reflection.
 * The three captions float around the machine as cards, each on its own
 * scroll-driven parallax speed, so the composition moves in depth.
 */
const CAPTION_POS = [
  "left-0 top-[14%] lg:-left-6",
  "right-0 top-[38%] lg:-right-8",
  "left-[6%] bottom-[10%] lg:left-[2%]",
] as const;
const CAPTION_SPEED = [1, 1.6, 0.7] as const;

export function Showcase() {
  return (
    <section id="showcase" className="overflow-hidden py-14 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex max-w-[48rem] flex-col gap-4 lg:mx-auto lg:items-center lg:text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {showcase.eyebrow}
            </p>
            <h2 className="text-[clamp(1.625rem,2.9vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.025em]">
              {showcase.title}
            </h2>
            <p className="max-w-[54ch] leading-relaxed text-muted">{showcase.intro}</p>
          </div>
        </Reveal>

        <div className="fw-desk relative mx-auto mt-8 max-w-[68rem] lg:mt-20">
          <ContainerScroll>
            <div className="fw-laptop mx-auto w-full">
              {/* lid */}
              <div className="fw-lid relative rounded-[1.5rem] border border-ink/70 bg-ink p-2.5 shadow-lift lg:rounded-[1.75rem] lg:p-3">
                <span aria-hidden="true" className="absolute left-1/2 top-1.5 size-1.5 -translate-x-1/2 rounded-full bg-surface/30" />
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem] bg-ink lg:rounded-[1.125rem]">
                  <LazyVideo src="/videos/saas-animation-stripe.mp4" />
                  <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-ink/70 px-2.5 py-1 text-[0.6875rem] font-medium text-surface/90 backdrop-blur">
                    {showcase.screenLabel}
                  </span>
                </div>
              </div>
              {/* base */}
              <div aria-hidden="true" className="fw-base relative mx-auto -mt-px h-5 w-[104%] max-w-none -translate-x-[2%] rounded-b-[1.25rem] rounded-t-sm border border-line bg-gradient-to-b from-surface to-line shadow-card lg:h-6">
                <span className="absolute left-1/2 top-0 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-ink/10" />
              </div>
              <div aria-hidden="true" className="fw-reflection mx-auto mt-2 h-24 w-[86%] rounded-[50%] bg-cyan/20 blur-2xl" />
            </div>
          </ContainerScroll>

          {/* Floating captions, parallax on their own view timelines. */}
          <ul className="pointer-events-none absolute inset-0 hidden lg:block">
            {showcase.captions.map((caption, i) => (
              <li
                key={caption.title}
                className={`fw-caption absolute ${CAPTION_POS[i] ?? ""}`}
                style={{ "--speed": CAPTION_SPEED[i] ?? 1 } as CSSProperties}
              >
                <div className="pointer-events-auto flex flex-col gap-1 rounded-card border border-line bg-surface/90 px-5 py-4 shadow-lift backdrop-blur">
                  <span className="text-sm font-semibold">{caption.title}</span>
                  <span className="text-xs text-muted">{caption.note}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-6 flex flex-col divide-y divide-line border-y border-line lg:hidden">
          {showcase.captions.map((caption) => (
            <div key={caption.title} className="flex items-baseline justify-between gap-3 py-2.5">
              <dt className="text-sm font-semibold">{caption.title}</dt>
              <dd className="text-right text-xs text-muted">{caption.note}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
