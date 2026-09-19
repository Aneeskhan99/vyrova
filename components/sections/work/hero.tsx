import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { Gallery } from "@/components/sections/work/gallery";
import { hero } from "@/content/site/work";

/**
 * Above the fold. The headline arrives word by word through a mask (a
 * CSS entrance on transform, staggered per word), so the first thing on
 * the page is already moving without any script. Behind it, a faint
 * grid floor from the hero system on the home page.
 */
export function Hero() {
  const lines = hero.title.split("\n");
  let w = 0;

  return (
    <section className="relative overflow-hidden py-12 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[28rem]">
        <div className="fw-aurora" style={{ opacity: 0.35 }}>
          <span className="fw-aurora-a" />
          <span className="fw-aurora-b" />
        </div>
      </div>
      <Container className="relative">
        <div className="flex flex-col gap-4 lg:gap-6">
          <p className="fw-rise text-xs font-medium uppercase tracking-[0.16em] text-accent">
            {hero.eyebrow}
          </p>
          <h1 className="text-[clamp(1.5rem,3.4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.035em]">
            {lines.map((line, li) => (
              <span key={li} className="block">
                {line.split(" ").map((word, wi) => {
                  const i = w++;
                  return (
                    <span key={`${li}-${wi}`} className="fw-word inline-block overflow-hidden pb-[0.08em] align-bottom">
                      <span className="fw-word-in inline-block" style={{ "--i": i } as CSSProperties}>
                        {word}
                      </span>
                      {wi < line.split(" ").length - 1 ? "\u00A0" : null}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
          <p className="fw-rise fw-d2 max-w-none text-[0.9375rem] leading-relaxed text-muted lg:text-lg">
            {hero.intro}
          </p>
        </div>

        <div className="fw-rise fw-d3 mt-8 lg:mt-12">
          <Gallery />
        </div>
      </Container>
    </section>
  );
}
