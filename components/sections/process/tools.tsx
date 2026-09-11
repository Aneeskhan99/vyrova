import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/ui/marquee";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { Reveal } from "@/components/motion/reveal";
import { tools } from "@/content/site/process";

const HALF = Math.ceil(tools.names.length / 2);

/**
 * Deliberately no Motion here — two CSS marquees and a keyframe drift.
 * An infinite loop is the one thing CSS does better than any library,
 * because it never touches the main thread (M-07).
 */
export function Tools() {
  const rowOne = tools.names.slice(0, HALF);
  const rowTwo = tools.names.slice(HALF);

  return (
    <section className="border-t border-line bg-ground py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="max-w-[46ch]">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {tools.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em]">
              {tools.title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{tools.intro}</p>
          </div>
        </Reveal>
      </Container>

      <PauseOffscreen className="mt-12 flex flex-col gap-4">
        <Marquee duration={44} fade pauseOnHover repeat={3} itemGap="1rem">
          {rowOne.map((name, i) => (
            <Pill key={name} name={name} index={i} />
          ))}
        </Marquee>
        <Marquee
          duration={52}
          reverse
          fade
          pauseOnHover
          repeat={3}
          itemGap="1rem"
        >
          {rowTwo.map((name, i) => (
            <Pill key={name} name={name} index={i} />
          ))}
        </Marquee>
      </PauseOffscreen>
    </section>
  );
}

function Pill({ name, index }: { name: string; index: number }) {
  return (
    <span
      className="fw-float inline-flex items-center rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium shadow-card transition-colors hover:border-accent/40"
      style={{ animationDelay: `${(index % 5) * 0.4}s` }}
    >
      {name}
    </span>
  );
}
