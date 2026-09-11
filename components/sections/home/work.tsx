import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/ui/marquee";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/sections/shared/project-card";
import { LOOP } from "@/lib/motion";
import { work } from "@/content/site/home";

/**
 * Two rows travelling in opposite directions, continuously rather than
 * only while the page scrolls — so the section is alive even when the
 * reader stops. Hovering anywhere on a row stops it so a card can
 * actually be read, and the cards lift under the cursor.
 *
 * CSS animation rather than a scroll-linked transform: no animation
 * library, no work on the scroll thread, and it pauses off-screen (M-06).
 */
export function Work() {
  return (
    <section id="work" className="overflow-hidden py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {work.eyebrow}
              </p>
              <h2 className="text-[clamp(1.875rem,3.8vw,3rem)] font-bold tracking-[-0.025em]">
                {work.title}
              </h2>
              <p className="max-w-[44ch] leading-relaxed text-muted">{work.intro}</p>
            </div>
            <a
              href={work.cta.href}
              className="inline-flex items-center gap-2 self-start whitespace-nowrap text-[0.9375rem] font-semibold text-accent"
            >
              {work.cta.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </Reveal>
      </Container>

      <PauseOffscreen className="mt-14 flex flex-col gap-5">
        <Marquee duration={LOOP.marqueeSlow} itemGap="1.25rem" pauseOnHover>
          {work.rowOne.map((item, i) => (
            <ProjectCard
              key={item.name}
              name={item.name}
              note={item.note}
              category={item.category}
              index={i}
              className="w-[19rem] shrink-0 sm:w-[25rem]"
            />
          ))}
        </Marquee>
        <Marquee
          duration={LOOP.marqueeSlow}
          itemGap="1.25rem"
          pauseOnHover
          reverse
        >
          {work.rowTwo.map((item, i) => (
            <ProjectCard
              key={item.name}
              name={item.name}
              note={item.note}
              category={item.category}
              index={i + 4}
              className="w-[19rem] shrink-0 sm:w-[25rem]"
            />
          ))}
        </Marquee>
      </PauseOffscreen>
    </section>
  );
}
