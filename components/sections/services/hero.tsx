import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { WordRotate } from "@/components/ui/word-rotate";
import { items, hero } from "@/content/site/services";

/** Above the fold, so entrances are CSS only (M-04). */
export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="fw-aurora" style={{ opacity: 0.4 }}>
          <span className="fw-aurora-a" />
          <span className="fw-aurora-b" />
        </div>
        {/* The seven names as a slow ghost ticker behind the heading. */}
        <PauseOffscreen className="fw-ghost-ticker absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden">
          <div data-marquee-track className="flex w-max items-center gap-10 whitespace-nowrap">
            {[0, 1].map((copy) =>
              items.map((service) => (
                <span
                  key={`${copy}-${service.number}`}
                  className="fw-ghost text-[9vw] font-bold uppercase leading-none tracking-[-0.05em]"
                >
                  {service.name}
                </span>
              )),
            )}
          </div>
        </PauseOffscreen>
      </div>
      <Container className="relative">
        <div className="flex flex-col items-center gap-7 text-center">
          <p className="fw-rise text-xs font-medium uppercase tracking-[0.16em] text-accent">
            {hero.eyebrow}
          </p>

          <h1 className="fw-rise fw-d1 max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            <span className="relative">
              {hero.before}{" "}
              <WordRotate words={hero.rotatingWords} className="text-accent" />
            </span>{" "}
            {hero.after}
          </h1>

          <p className="fw-rise fw-d2 max-w-[56ch] text-lg leading-relaxed text-muted">
            {hero.intro}
          </p>

          <ul className="fw-rise fw-d3 mt-2 flex flex-wrap justify-center gap-3">
            {items.map((service, i) => (
              <li key={service.number} className="fw-pop" style={{ "--i": i + 4 } as CSSProperties}>
                <a
                  href={`#${service.number}`}
                  className="fw-chip-hover inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-surface px-4 py-3 shadow-card transition-colors hover:border-accent/40"
                >
                  <span className="text-[0.6875rem] font-medium tracking-[0.1em] text-accent">
                    {service.number}
                  </span>
                  <span className="text-sm font-medium">{service.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
