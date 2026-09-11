import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { deliverables } from "@/content/site/services";
import { cn } from "@/lib/utils";

/**
 * Dark band. The palette inverts here, so colours come from the same
 * tokens used at reduced opacity rather than new hex values (T-01).
 */
export function Deliverables() {
  return (
    <section className="border-y border-line bg-ink py-24 text-surface lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <div className="flex flex-col gap-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-cyan">
                {deliverables.eyebrow}
              </p>
              <h2 className="max-w-[14ch] text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.06] tracking-[-0.03em]">
                {deliverables.title}
              </h2>
              <p className="max-w-[46ch] leading-relaxed text-surface/70">
                {deliverables.intro}
              </p>

              <ul className="flex flex-wrap gap-2 pt-2">
                {deliverables.formats.map((format) => (
                  <li
                    key={format}
                    className="rounded-full border border-surface/15 bg-surface/[0.08] px-3 py-1.5 text-xs font-medium"
                  >
                    {format}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Stagger className="flex flex-col gap-3" step={0.09}>
            {deliverables.items.map((item, i) => (
              <div
                key={item.title}
                className={cn(
                  "flex items-center gap-4 rounded-card border p-5",
                  i === 0
                    ? "border-transparent bg-surface text-ink"
                    : "border-surface/12 bg-surface/[0.06]",
                )}
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl",
                    i === 0 ? "bg-cyan text-ink" : "bg-cyan/20 text-cyan",
                  )}
                >
                  <Check aria-hidden="true" className="size-[18px]" strokeWidth={2.5} />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-semibold">{item.title}</span>
                  <span
                    className={cn(
                      "text-[0.8125rem]",
                      i === 0 ? "text-muted" : "text-surface/60",
                    )}
                  >
                    {item.note}
                  </span>
                </span>
              </div>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
