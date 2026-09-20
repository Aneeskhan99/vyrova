import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { WordRotate } from "@/components/ui/word-rotate";
import { items, hero } from "@/content/site/services";

/** Above the fold, so entrances are CSS only (M-04). */
export function Hero() {
  return (
    <section className="relative overflow-hidden py-14 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="fw-aurora" style={{ opacity: 0.4 }}>
          <span className="fw-aurora-a" />
          <span className="fw-aurora-b" />
        </div>
        {/* The seven names as a slow ghost ticker behind the heading.
            Centred in the section on a laptop; on a phone the section is
            short enough that the middle landed on the service pills, so it
            sits just under the headline instead. */}
        <PauseOffscreen className="fw-ghost-ticker absolute inset-x-0 top-[10.75rem] translate-y-0 overflow-hidden lg:top-1/2 lg:-translate-y-1/2">
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
        <div className="flex flex-col gap-5 lg:items-center lg:gap-7 lg:text-center">
          <p className="fw-rise text-xs font-medium uppercase tracking-[0.16em] text-accent">
            {hero.eyebrow}
          </p>

          <h1 className="fw-rise fw-d1 max-w-[18ch] text-[clamp(1.75rem,5vw,4rem)] font-bold leading-[1.08] tracking-[-0.035em]">
            <span className="relative">
              {hero.before}{" "}
              <WordRotate words={hero.rotatingWords} className="text-accent" />
            </span>{" "}
            {hero.after}
          </h1>

          <p className="fw-rise fw-d2 max-w-[56ch] text-[0.9375rem] leading-relaxed text-muted lg:text-lg">
            {hero.intro}
          </p>

          {/* Seven names, three rows, nothing off screen. Wrapped pills
              pack two to a row at any readable size on a phone, so below a
              laptop this is a three column grid instead: equal cells, the
              longer names running to a second line inside their own pill
              rather than pushing the row wider than the screen. */}
          <ul className="fw-rise fw-d3 mt-1 grid grid-cols-3 gap-2 lg:mt-2 lg:flex lg:flex-wrap lg:justify-center lg:gap-3">
            {items.map((service, i) => (
              <li key={service.number} className="fw-pop h-full" style={{ "--i": i + 4 } as CSSProperties}>
                <a
                  href={`#${service.number}`}
                  className="fw-chip-hover flex h-full flex-col items-start gap-0.5 rounded-2xl border border-line bg-surface px-2.5 py-2 shadow-card transition-colors hover:border-accent/40 lg:inline-flex lg:flex-row lg:items-center lg:gap-2.5 lg:whitespace-nowrap lg:rounded-full lg:px-4 lg:py-3"
                >
                  <span className="text-[0.5625rem] font-medium tracking-[0.1em] text-accent lg:text-[0.6875rem]">
                    {service.number}
                  </span>
                  <span className="text-[0.6875rem] font-medium leading-tight lg:text-sm lg:leading-normal">{service.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
