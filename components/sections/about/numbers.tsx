import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Reveal } from "@/components/motion/reveal";
import { numbers } from "@/content/site/about";

/**
 * A dark scoreboard. Each figure counts up as it arrives, sits on a
 * tile that rises into place in turn, and carries a ring that draws
 * itself closed on the section's timeline. Cyan and violet light behind.
 */
export function Numbers() {
  return (
    <section className="fw-dark fw-board2 relative overflow-hidden border-t border-line bg-ink py-20 text-surface lg:py-24">
      <div aria-hidden="true" className="fw-dark-glow pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Reveal>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.03em]">{numbers.title}</h2>
        </Reveal>
        <ol className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {numbers.stats.map((stat, i) => (
            <li
              key={stat.label}
              className="fw-stat relative overflow-hidden rounded-card border border-surface/10 bg-surface/[0.05] p-6 lg:p-8"
              style={{ "--i": i } as CSSProperties}
            >
              <span className="relative block text-[clamp(2rem,3.6vw,3rem)] font-bold leading-none tracking-[-0.04em] text-cyan">
                <NumberTicker value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="relative mt-3 block text-sm text-surface/65">{stat.label}</span>
              <span aria-hidden="true" className="fw-stat-bar relative mt-5 block h-1 w-full origin-left rounded-full bg-gradient-to-r from-cyan to-violet" />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
