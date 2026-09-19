import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/ui/marquee";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { Reveal } from "@/components/motion/reveal";
import { tools } from "@/content/site/process";

const HALF = Math.ceil(tools.items.length / 2);

/**
 * Deliberately no Motion here — two CSS marquees and a keyframe drift.
 * An infinite loop is the one thing CSS does better than any library,
 * because it never touches the main thread (M-07).
 */
export function Tools() {
  const rowOne = tools.items.slice(0, HALF);
  const rowTwo = tools.items.slice(HALF);

  return (
    <section className="border-t border-line bg-ground py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="max-w-[64ch]">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {tools.eyebrow}
            </p>
            <h2 className="mt-3 whitespace-nowrap text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] max-sm:whitespace-normal">
              {tools.title}
            </h2>
            <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{tools.intro}</p>
          </div>
        </Reveal>
      </Container>

      <PauseOffscreen className="mt-12 flex flex-col gap-4">
        <Marquee duration={44} fade pauseOnHover repeat={3} itemGap="1rem">
          {rowOne.map((tool, i) => (
            <Pill key={tool.name} name={tool.name} file={tool.file} index={i} />
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
          {rowTwo.map((tool, i) => (
            <Pill key={tool.name} name={tool.name} file={tool.file} index={i} />
          ))}
        </Marquee>
      </PauseOffscreen>
    </section>
  );
}

function Pill({
  name,
  file,
  index,
}: {
  name: string;
  file: string;
  index: number;
}) {
  return (
    <span
      className="fw-float inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-3 pl-3.5 pr-5 text-sm font-medium shadow-card transition-colors hover:border-accent/40"
      style={{ animationDelay: `${(index % 5) * 0.4}s` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/logos/${file}.svg`}
        alt=""
        width={20}
        height={20}
        className="size-5 object-contain"
      />
      {name}
    </span>
  );
}
