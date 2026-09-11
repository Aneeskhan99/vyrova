import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/ui/marquee";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { Reveal } from "@/components/motion/reveal";
import { LOOP } from "@/lib/motion";
import { testimonials } from "@/content/site/home";

export function Testimonials() {
  return (
    <section className="overflow-hidden py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-[40rem] flex-col items-center gap-4 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {testimonials.eyebrow}
            </p>
            <h2 className="text-[clamp(1.875rem,3.8vw,3rem)] font-bold tracking-[-0.025em]">
              {testimonials.title}
            </h2>
          </div>
        </Reveal>
      </Container>

      <PauseOffscreen className="mt-14">
        <Marquee duration={LOOP.marqueeSlow} itemGap="1.25rem" pauseOnHover>
          {testimonials.quotes.map((item) => (
            <figure
              key={item.name}
              className="flex h-[13.5rem] w-[23rem] shrink-0 flex-col justify-between rounded-tile border border-line bg-surface p-7"
            >
              <blockquote className="text-[1.0625rem] leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="size-9 shrink-0 rounded-full border border-accent/40 bg-cyan/25"
                />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold">{item.name}</span>
                  <span className="truncate text-[0.8125rem] text-muted">
                    {item.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </PauseOffscreen>
    </section>
  );
}
