import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { BorderBeam } from "@/components/ui/border-beam";
import { LazyVideo } from "@/components/motion/lazy-video";
import { ServiceVisual } from "@/components/sections/services/service-visual";
import { services } from "@/content/site/home";

/**
 * Services as a deck of cards. Every card is sticky under the nav, so as
 * the page scrolls each new service deals onto the pile and the one
 * beneath sinks back a step: smaller, quieter, still visible at its
 * offset edge. The sink is a scroll-driven keyframe (transform + opacity)
 * over the deck's own view timeline, sliced per card, so it tracks the
 * scrollbar exactly. Without scroll-driven support the cards still
 * stack; they just don't shrink.
 *
 * Each card carries one brand tint as a soft wash in its corner, drawn
 * from the theme tokens, so the pile reads as one family.
 */
const TINTS = [
  "var(--color-cyan)",
  "var(--color-violet)",
  "var(--color-indigo)",
  "var(--color-accent)",
  "var(--color-cyan)",
  "var(--color-violet)",
  "var(--color-indigo)",
] as const;

export function Services() {
  const n = services.items.length;

  return (
    <section id="services" className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {services.eyebrow}
              </p>
              <h2 className="whitespace-nowrap text-[clamp(1.5rem,2.7vw,2.5rem)] font-bold leading-[1.06] tracking-[-0.025em] max-sm:whitespace-normal">
                {services.title}
              </h2>
            </div>
          </div>
        </Reveal>

        <ol className="fw-deck mt-14" style={{ "--n": n } as CSSProperties}>
          {services.items.map((item, i) => {
            const number = String(i + 1).padStart(2, "0");
            const image = "image" in item ? item.image : null;
            return (
              <li
                key={item.title}
                className="fw-deck-card"
                style={{ "--i": i, "--tint": TINTS[i % TINTS.length] } as CSSProperties}
              >
                <article className="fw-deck-face relative grid overflow-hidden rounded-tile lg:min-h-[30rem] border border-line bg-surface shadow-lift lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                  {i === 0 ? <BorderBeam /> : null}

                  <div className="relative flex flex-col justify-between gap-10 p-8 lg:p-12">
                    <span
                      aria-hidden="true"
                      className="fw-deck-num pointer-events-none absolute -left-3 -top-8 select-none text-[9rem] font-bold leading-none tracking-[-0.06em] lg:-top-12 lg:text-[13rem]"
                    >
                      {number}
                    </span>
                    <div className="relative flex flex-col gap-5">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                        {number} {services.countLabel} {String(n).padStart(2, "0")}
                      </p>
                      <h3 className="text-[clamp(1.5rem,2.5vw,2.125rem)] font-bold leading-[1.08] tracking-[-0.03em]">
                        {item.title}
                      </h3>
                      <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">
                        {item.body}
                      </p>
                    </div>
                    <a
                      href={`/services/#${number}`}
                      className="group relative inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink"
                    >
                      {services.open}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 text-accent transition-transform group-hover:translate-x-1"
                      />
                    </a>
                  </div>

                  <div className="fw-deck-media relative flex items-center p-4 pt-0 lg:p-6 lg:pl-0">
                    {i === 0 ? (
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card border border-line bg-surface shadow-card">
                        <LazyVideo src="/videos/saas-animation-stripe.mp4" />
                      </div>
                    ) : (
                      <ServiceVisual kind={item.visual ?? ""} videoSrc={item.videoSrc} image={image} />
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

