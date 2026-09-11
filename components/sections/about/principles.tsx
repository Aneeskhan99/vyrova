import { Container } from "@/components/layout/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { principles } from "@/content/site/about";

export function Principles() {
  return (
    <section className="border-t border-line bg-surface py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="max-w-[46ch]">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {principles.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em]">
              {principles.title}
            </h2>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
          {principles.items.map((item) => (
            <MagicCard
              key={item.number}
              className="fw-tilt h-full rounded-card border border-line bg-ground p-7 shadow-card lg:p-9"
            >
              <div className="relative">
                <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-accent">
                  {item.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.015em] lg:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
              </div>
            </MagicCard>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
