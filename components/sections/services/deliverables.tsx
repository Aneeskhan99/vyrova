import type { CSSProperties } from "react";
import { Check, Download } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { deliverables } from "@/content/site/services";

/**
 * The kit unpacks. On the right, a delivery panel: six files start as one
 * stacked pile and, as the section scrolls into view, fan out into a
 * list (each card's translate is on the section's view timeline, offset
 * by its index). Each card's progress bar fills and its check stamps in
 * once it has settled. Everything is transform and opacity.
 */
export function Deliverables() {
  const n = deliverables.items.length;
  return (
    <section className="fw-dark fw-kit relative overflow-hidden border-y border-line bg-ink py-24 text-surface lg:py-32">
      <div aria-hidden="true" className="fw-dark-glow pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="lg:sticky lg:top-32">
            <div className="flex flex-col gap-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-cyan">
                {deliverables.eyebrow}
              </p>
              <h2 className="max-w-[14ch] text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.06] tracking-[-0.03em]">
                {deliverables.title}
              </h2>
              <p className="max-w-[46ch] leading-relaxed text-surface/70">{deliverables.intro}</p>
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

              {/* delivered meter: fills with the same scroll that unpacks the kit */}
              <div className="mt-2 flex items-center gap-4">
                <span className="fw-kit-ring relative grid size-16 place-items-center rounded-full">
                  <Check className="relative size-6 text-cyan" strokeWidth={3} />
                </span>
                <span className="flex flex-col">
                  <span className="text-2xl font-bold tabular-nums">
                    <span className="fw-kit-count" data-n={n}>
                      {n}
                    </span>{" "}
                    / {n}
                  </span>
                  <span className="text-sm text-surface/60">{deliverables.delivered}</span>
                </span>
              </div>
            </div>
          </Reveal>

          <div className="fw-kit-panel rounded-tile border border-surface/10 bg-surface/[0.04] p-3 backdrop-blur sm:p-4">
            <div className="flex items-center justify-between px-2 pb-3 pt-1">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Download className="size-4 text-cyan" />
                {deliverables.inboxTitle}
              </span>
              <span className="text-xs text-surface/55">{deliverables.inboxNote}</span>
            </div>
            <ol className="flex flex-col gap-3">
              {deliverables.items.map((item, i) => (
                <li
                  key={item.title}
                  className="fw-kit-card relative flex items-center gap-4 rounded-card border border-surface/12 bg-ink p-4 shadow-lift"
                  style={{ "--i": i, "--n": n } as CSSProperties}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface/[0.08] font-mono text-[0.625rem] font-semibold tracking-wide text-cyan">
                    {deliverables.kinds[i] ?? "FILE"}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className="flex items-center justify-between gap-3">
                      <span className="truncate font-semibold">{item.title}</span>
                      <span className="fw-kit-check grid size-5 shrink-0 place-items-center rounded-full bg-cyan text-ink">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                    </span>
                    <span className="truncate text-[0.8125rem] text-surface/60">{item.note}</span>
                    <span className="relative h-1 overflow-hidden rounded-full bg-surface/10">
                      <span className="fw-kit-bar absolute inset-y-0 left-0 w-full origin-left rounded-full bg-cyan" />
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
