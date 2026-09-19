"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import { Mark } from "@/components/brand/mark";
import { Reveal } from "@/components/motion/reveal";
import { faq } from "@/content/site/home";
import { cn } from "@/lib/utils";

type Turn = { q: number; answered: boolean };

const ANSWER_DELAY = 900;
const NEXT_DELAY = 3600;
const RESTART_DELAY = 5200;
const MANUAL_PAUSE = 15000;

/**
 * The FAQ as a conversation that runs itself. While the section is on
 * screen the questions are asked one after another: the live chip lights
 * up with the brand gradient, its text slides into the thread as your
 * message, three dots bounce, and the scripted answer arrives. After the
 * last one the thread clears and starts again. Choosing a chip yourself
 * asks it at once and pauses the autoplay for a while.
 *
 * Every answer is the same text the old accordion held — nothing is
 * generated — and the header says so.
 */
export function Faq() {
  const [turns, setTurns] = useState<Turn[]>([{ q: 0, answered: true }]);
  const [active, setActive] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [inView, setInView] = useState(false);
  const [auto, setAuto] = useState(true);
  const section = useRef<HTMLElement>(null);
  const thread = useRef<HTMLOListElement>(null);
  const timers = useRef<number[]>([]);

  const asked = new Set(turns.map((t) => t.q));
  const later = (fn: () => void, ms: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timers.current.push(window.setTimeout(fn, reduce ? Math.min(ms, 300) : ms));
  };

  function send(q: number, fresh = false) {
    setBusy(true);
    setActive(q);
    setTurns((prev) => (fresh ? [] : prev).concat({ q, answered: false }));
    later(() => {
      setTurns((prev) => prev.map((t) => (t.q === q ? { ...t, answered: true } : t)));
      setBusy(false);
    }, ANSWER_DELAY);
  }

  function ask(q: number) {
    if (busy || asked.has(q)) return;
    send(q);
  }

  function askByHand(q: number) {
    setAuto(false);
    ask(q);
    later(() => setAuto(true), MANUAL_PAUSE);
  }

  // Autoplay: next unasked question, or a restart once all are answered.
  useEffect(() => {
    if (!inView || !auto || busy) return;
    const next = faq.items.findIndex((_, i) => !asked.has(i));
    const id = window.setTimeout(
      () => {
        if (next === -1) {
          send(0, true);
        } else {
          ask(next);
        }
      },
      next === -1 ? RESTART_DELAY : NEXT_DELAY,
    );
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, auto, busy, turns]);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((e) => e.isIntersecting)),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = thread.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [turns]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  return (
    <section ref={section} className="border-y border-line bg-band py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,27rem)_minmax(0,1fr)] lg:gap-10">
          <Reveal>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {faq.eyebrow}
              </p>
              <h2 className="whitespace-pre-line text-[clamp(1.5rem,2.4vw,2.125rem)] font-bold leading-[1.1] tracking-[-0.025em]">
                {faq.title}
              </h2>
              <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed text-muted lg:text-base">{faq.intro}</p>

              <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                {faq.chat.prompt}
              </p>
              <ul className="flex flex-wrap items-start gap-2">
                {faq.items.map((item, i) => {
                  const done = asked.has(i);
                  const live = active === i;
                  return (
                    <li key={item.q}>
                      <button
                        type="button"
                        onClick={() => askByHand(i)}
                        disabled={(done && !live) || busy}
                        aria-pressed={done}
                        aria-current={live ? "step" : undefined}
                        className={cn(
                          "fw-chip relative rounded-full border px-3.5 py-2 text-left text-[0.8125rem] font-medium transition-colors sm:px-4 sm:text-sm",
                          live
                            ? "fw-chip-live border-transparent text-ink"
                            : done
                              ? "border-line bg-band text-muted"
                              : "border-line bg-surface text-ink hover:border-accent/50 hover:text-accent",
                          busy && !done && !live && "opacity-60",
                        )}
                      >
                        <span className={cn("relative", live && "fw-chip-text")}>{item.q}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="fw-chat flex flex-col overflow-hidden rounded-tile border border-line bg-surface shadow-lift">
              <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
                <Mark id="chat" className="size-8" />
                <div className="flex min-w-0 flex-col">
                  <span className="text-sm font-semibold">{faq.chat.title}</span>
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="relative flex size-2">
                      <span className="fw-pulse absolute inline-flex size-full rounded-full bg-accent/70" />
                      <span className="relative inline-flex size-2 rounded-full bg-accent" />
                    </span>
                    {faq.chat.status}
                  </span>
                </div>
              </div>

              <ol
                ref={thread}
                role="log"
                aria-live="polite"
                className="flex max-h-[30rem] min-h-[22rem] flex-col gap-4 overflow-y-auto scroll-smooth px-5 py-6"
              >
                {turns.map((turn) => {
                  const item = faq.items[turn.q];
                  if (!item) return null;
                  return (
                    <li key={turn.q} className="flex flex-col gap-3">
                      <div className="fw-bubble-in flex justify-end">
                        <p className="max-w-[80%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[0.9375rem] leading-relaxed text-surface">
                          {item.q}
                        </p>
                      </div>
                      <div className="fw-bubble-in flex items-end gap-2.5">
                        <Mark id={`a-${turn.q}`} className="size-6 shrink-0" />
                        {turn.answered ? (
                          <p className="max-w-[80%] rounded-2xl rounded-bl-md border border-line bg-band px-4 py-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                            {item.a}
                          </p>
                        ) : (
                          <span
                            aria-label={faq.chat.typing}
                            className="fw-typing inline-flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-band px-4 py-3"
                          >
                            <span className="size-1.5 rounded-full bg-muted" />
                            <span className="size-1.5 rounded-full bg-muted" />
                            <span className="size-1.5 rounded-full bg-muted" />
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
