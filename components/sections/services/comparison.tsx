import type { CSSProperties } from "react";
import { Check, Minus, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { comparison } from "@/content/site/services";
import { cn } from "@/lib/utils";

/** A cell is a win, a loss, or a hedge. Drives the icon and the score. */
function kind(value: string): "yes" | "no" | "maybe" {
  if (value === "✓") return "yes";
  if (value === "✕") return "no";
  return "maybe";
}

/**
 * The comparison as a scoreboard. Three columns, each with a score that
 * counts what it wins; the "Us" column is a raised card that overlaps the
 * board. Checks stamp in row by row as the board scrolls into view, the
 * crosses fade, and the score bars under each heading fill to their
 * total. Everything is derived from the same rows as before.
 */
export function Comparison() {
  const total = comparison.rows.length;
  const scores = comparison.columns.map(
    (_, c) => comparison.rows.filter((r) => kind(r.values[c] ?? "") === "yes").length,
  );
  const last = comparison.columns.length - 1;

  return (
    <section className="fw-board relative overflow-hidden border-t border-line bg-band py-14 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[18ch] text-[clamp(1.625rem,3.2vw,2.5rem)] font-bold tracking-[-0.025em]">
              {comparison.title}
            </h2>
            <p className="max-w-[48ch] leading-relaxed text-muted">{comparison.intro}</p>
          </div>
        </Reveal>

        <Reveal className="mt-8 lg:mt-12">
          {/* The board proper, from a laptop up. */}
          <div className="fw-board-wrap hidden overflow-x-auto lg:block">
            <div
              className="grid min-w-[44rem] gap-x-4"
              style={{ gridTemplateColumns: `minmax(0,1.6fr) repeat(${comparison.columns.length}, minmax(0,1fr))` }}
            >
              {/* headings with score bars */}
              <div />
              {comparison.columns.map((column, c) => {
                const win = c === last;
                return (
                  <div
                    key={column}
                    className={cn(
                      "flex flex-col gap-2 rounded-t-tile px-5 pb-4 pt-5",
                      win && "fw-board-us-head bg-ink text-surface",
                    )}
                  >
                    <span className={cn("text-xs font-medium uppercase tracking-[0.12em]", win ? "text-cyan" : "text-muted")}>
                      {column}
                    </span>
                    <span className="text-2xl font-bold tabular-nums">
                      {scores[c]}
                      <span className={cn("ml-1 text-xs font-medium", win ? "text-surface/60" : "text-muted")}>
                        {comparison.scoreLabel}
                      </span>
                    </span>
                    <span className={cn("relative h-1 overflow-hidden rounded-full", win ? "bg-surface/15" : "bg-line")}>
                      <span
                        className={cn("fw-board-bar absolute inset-y-0 left-0 w-full origin-left rounded-full", win ? "bg-cyan" : "bg-muted/50")}
                        style={{ "--p": (scores[c] ?? 0) / total } as CSSProperties}
                      />
                    </span>
                  </div>
                );
              })}

              {/* rows */}
              {comparison.rows.map((row, r) => (
                <div key={row.label} className="contents">
                  <div
                    className="fw-board-row flex items-center border-t border-line py-4 pr-4 text-[0.9375rem] font-medium"
                    style={{ "--i": r } as CSSProperties}
                  >
                    {row.label}
                  </div>
                  {row.values.map((value, c) => {
                    const k = kind(value);
                    const win = c === last;
                    return (
                      <div
                        key={`${row.label}-${c}`}
                        className={cn(
                          "fw-board-row flex items-center gap-2 border-t px-5 py-4 text-[0.9375rem]",
                          win ? "fw-board-us border-surface/10 bg-ink text-surface" : "border-line text-muted",
                          win && r === comparison.rows.length - 1 && "rounded-b-tile",
                        )}
                        style={{ "--i": r } as CSSProperties}
                      >
                        {k === "yes" ? (
                          <span
                            className={cn(
                              "fw-stamp grid size-7 place-items-center rounded-full",
                              win ? "bg-cyan text-ink" : "bg-accent-soft text-accent",
                            )}
                          >
                            <Check className="size-4" strokeWidth={3} />
                          </span>
                        ) : k === "no" ? (
                          <span className="fw-board-no grid size-7 place-items-center rounded-full bg-ink/[0.05] text-muted/70">
                            <X className="size-4" strokeWidth={2.5} />
                          </span>
                        ) : (
                          <>
                            <span className="grid size-7 place-items-center rounded-full bg-ink/[0.05] text-muted/70">
                              <Minus className="size-4" strokeWidth={2.5} />
                            </span>
                            <span>{value}</span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Phones get the same verdicts stacked. The grid above is 44rem
              wide at minimum, so on a 375px screen it could only be dragged
              sideways — and dragging pushed the row label off screen, which
              left three ticks with nothing to say what they were about.
              One card per row keeps the label and its three answers
              together, and the strip on top carries the totals. */}
          <div className="flex flex-col gap-3 lg:hidden">
            <div className="grid grid-cols-3 gap-2">
              {comparison.columns.map((column, c) => {
                const win = c === last;
                return (
                  <div
                    key={column}
                    className={cn(
                      "flex flex-col gap-1.5 rounded-card border p-3",
                      win ? "border-ink bg-ink text-surface" : "border-line bg-surface",
                    )}
                  >
                    <span
                      className={cn(
                        "text-[0.625rem] font-medium uppercase tracking-[0.1em]",
                        win ? "text-cyan" : "text-muted",
                      )}
                    >
                      {column}
                    </span>
                    <span className="text-xl font-bold tabular-nums">
                      {scores[c]}
                      <span
                        className={cn(
                          "ml-1 text-[0.5625rem] font-medium",
                          win ? "text-surface/60" : "text-muted",
                        )}
                      >
                        {comparison.scoreLabel}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "relative h-1 overflow-hidden rounded-full",
                        win ? "bg-surface/15" : "bg-line",
                      )}
                    >
                      <span
                        className={cn(
                          "fw-board-bar absolute inset-y-0 left-0 w-full origin-left rounded-full",
                          win ? "bg-cyan" : "bg-muted/50",
                        )}
                        style={{ "--p": (scores[c] ?? 0) / total } as CSSProperties}
                      />
                    </span>
                  </div>
                );
              })}
            </div>

            {comparison.rows.map((row) => (
              <div key={row.label} className="rounded-card border border-line bg-surface p-4">
                <p className="text-[0.9375rem] font-semibold leading-snug">{row.label}</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {row.values.map((value, c) => {
                    const k = kind(value);
                    const win = c === last;
                    return (
                      <div
                        key={`${row.label}-phone-${c}`}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-xl px-1 py-2.5 text-center",
                          win ? "bg-ink text-surface" : "bg-band",
                        )}
                      >
                        <span
                          className={cn(
                            "text-[0.5625rem] font-medium uppercase tracking-[0.06em]",
                            win ? "text-cyan" : "text-muted",
                          )}
                        >
                          {comparison.columns[c]}
                        </span>
                        {k === "yes" ? (
                          <span
                            className={cn(
                              "grid size-6 place-items-center rounded-full",
                              win ? "bg-cyan text-ink" : "bg-accent-soft text-accent",
                            )}
                          >
                            <Check className="size-3.5" strokeWidth={3} />
                          </span>
                        ) : k === "no" ? (
                          <span className="grid size-6 place-items-center rounded-full bg-ink/[0.06] text-muted/70">
                            <X className="size-3.5" strokeWidth={2.5} />
                          </span>
                        ) : (
                          <>
                            <span className="grid size-6 place-items-center rounded-full bg-ink/[0.06] text-muted/70">
                              <Minus className="size-3.5" strokeWidth={2.5} />
                            </span>
                            <span
                              className={cn(
                                "text-[0.625rem] leading-tight",
                                win ? "text-surface/70" : "text-muted",
                              )}
                            >
                              {value}
                            </span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
