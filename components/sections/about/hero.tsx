import { Container } from "@/components/layout/container";
import { DotPattern } from "@/components/ui/dot-pattern";
import { hero } from "@/content/site/about";

/** Above the fold: CSS entrances only, no Motion in this tree (M-04). */
export function Hero() {
  const [line1, line2] = hero.title.split("\n");

  return (
    <section className="relative isolate overflow-hidden py-24 lg:py-32">
      <DotPattern className="[mask-image:radial-gradient(60%_50%_at_50%_40%,white,transparent)]" />

      <Container>
        <div className="relative flex flex-col items-center gap-7 text-center">
          <p className="fw-rise text-xs font-medium uppercase tracking-[0.16em] text-accent">
            {hero.eyebrow}
          </p>

          <h1 className="fw-rise fw-d1 max-w-[20ch] text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            {line1}
            <br />
            <span className="text-accent">{line2}</span>
          </h1>

          <p className="fw-rise fw-d2 max-w-[62ch] text-lg leading-relaxed text-muted">
            {hero.intro}
          </p>
        </div>
      </Container>
    </section>
  );
}
