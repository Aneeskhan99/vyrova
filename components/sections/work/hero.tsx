import { Container } from "@/components/layout/container";
import { Gallery } from "@/components/sections/work/gallery";
import { hero } from "@/content/site/work";

/**
 * Above the fold, so the heading uses the CSS entrance classes (M-04).
 * The filter tabs and grid live in Gallery, which is the only client
 * component on this page's first screen.
 */
export function Hero() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6">
          <p className="fw-rise text-xs font-medium uppercase tracking-[0.16em] text-accent">
            {hero.eyebrow}
          </p>
          <h1 className="fw-rise fw-d1 max-w-[18ch] whitespace-pre-line text-[clamp(2.25rem,5.4vw,4.25rem)] font-bold leading-[1.03] tracking-[-0.035em]">
            {hero.title}
          </h1>
          <p className="fw-rise fw-d2 max-w-[56ch] text-lg leading-relaxed text-muted">
            {hero.intro}
          </p>
        </div>

        <div className="fw-rise fw-d3 mt-12">
          <Gallery />
        </div>
      </Container>
    </section>
  );
}
