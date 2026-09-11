import { Container } from "@/components/layout/container";
import { WordRotate } from "@/components/ui/word-rotate";
import { items, hero } from "@/content/site/services";

/** Above the fold, so entrances are CSS only (M-04). */
export function Hero() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
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
            {items.map((service) => (
              <li key={service.number}>
                <a
                  href={`#${service.number}`}
                  className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-surface px-4 py-3 shadow-card transition-colors hover:border-accent/40"
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
