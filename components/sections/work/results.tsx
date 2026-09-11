import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/ui/marquee";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { Reveal } from "@/components/motion/reveal";
import { LOOP } from "@/lib/motion";
import { results } from "@/content/site/work";

export function Results() {
  return (
    <section className="overflow-hidden py-20">
      <Container>
        <Reveal>
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] font-bold tracking-[-0.02em]">
            {results.title}
          </h2>
        </Reveal>
      </Container>

      <PauseOffscreen className="mt-10">
        <Marquee duration={LOOP.marquee} itemGap="1rem" repeat={2} reverse pauseOnHover>
          {results.items.map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-3.5"
            >
              <span className="text-xl font-bold tracking-tight">{item.value}</span>
              <span className="text-sm text-muted">{item.label}</span>
            </span>
          ))}
        </Marquee>
      </PauseOffscreen>
    </section>
  );
}
