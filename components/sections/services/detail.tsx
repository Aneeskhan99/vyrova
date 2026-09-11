import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ServiceVisual } from "@/components/sections/services/service-visual";
import { items } from "@/content/site/services";
import { cn } from "@/lib/utils";

/**
 * The five services, alternating sides. Each row is its own anchor so
 * the chips in the hero can jump straight to one.
 */
export function Detail() {
  return (
    <section className="pb-8">
      <Container>
        {items.map((service, i) => {
          const flipped = i % 2 === 1;
          return (
            <article
              key={service.number}
              id={service.number}
              className={cn(
                "grid items-center gap-12 border-t border-line py-16 lg:grid-cols-2 lg:gap-20 lg:py-20",
                i === 0 && "border-t-0",
              )}
            >
              <Reveal className={cn(flipped && "lg:order-2")}>
                <div className="flex flex-col gap-5">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                    {service.number} · {service.name}
                  </p>
                  <h2 className="max-w-[16ch] text-[clamp(1.625rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.025em]">
                    {service.headline}
                  </h2>
                  <p className="max-w-[46ch] leading-relaxed text-muted">
                    {service.body}
                  </p>

                  <ul className="flex flex-col gap-2.5 pt-1">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="size-2 shrink-0 rounded-full bg-cyan"
                        />
                        <span className="text-[0.9375rem]">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="mt-2 inline-flex items-center gap-2 self-start whitespace-nowrap rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-surface transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Get a quote
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </div>
              </Reveal>

              <Reveal className={cn(flipped && "lg:order-1")}>
                <ServiceVisual kind={service.visual} />
              </Reveal>
            </article>
          );
        })}
      </Container>
    </section>
  );
}
