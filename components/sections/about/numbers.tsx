import { Container } from "@/components/layout/container";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Stagger } from "@/components/motion/stagger";
import { numbers } from "@/content/site/about";

/**
 * CSS only. A counter is an IntersectionObserver and a rAF loop; adding
 * Motion here would buy nothing (M-07).
 */
export function Numbers() {
  return (
    <section className="border-t border-line bg-ground py-20 lg:py-24">
      <Container>
        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.03em]">
          {numbers.title}
        </h2>

        <Stagger className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-4">
          {numbers.stats.map((stat) => (
            <div key={stat.label} className="bg-surface px-6 py-8 lg:px-8 lg:py-10">
              <span className="block text-[clamp(2rem,3.6vw,3rem)] font-bold leading-none tracking-[-0.04em] text-accent">
                <NumberTicker value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-3 block text-sm text-muted">{stat.label}</span>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
