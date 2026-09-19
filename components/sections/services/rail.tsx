"use client";

import { useEffect, useState } from "react";
import { items } from "@/content/site/services";
import { cn } from "@/lib/utils";

/**
 * A rail of the seven services, fixed at the left edge on wide screens.
 * The one you are reading lights up (IntersectionObserver on each
 * section), and each dot is a link that scrolls there. Hidden below lg
 * where it would sit on the text.
 */
export function Rail() {
  const [active, setActive] = useState<string>(items[0]?.number ?? "01");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const sections = items
      .map((s) => document.getElementById(s.number))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((el) => observer.observe(el));

    const first = sections[0];
    const last = sections[sections.length - 1];
    const range = new IntersectionObserver(
      () => {
        if (!first || !last) return;
        const top = first.getBoundingClientRect().top;
        const bottom = last.getBoundingClientRect().bottom;
        setShown(top < window.innerHeight * 0.3 && bottom > window.innerHeight * 0.5);
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) },
    );
    sections.forEach((el) => range.observe(el));
    return () => {
      observer.disconnect();
      range.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label="Services on this page"
      className={cn(
        "fw-rail fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 xl:flex",
        shown ? "fw-rail-on" : "pointer-events-none",
      )}
    >
      {items.map((s) => {
        const on = s.number === active;
        return (
          <a
            key={s.number}
            href={`#${s.number}`}
            aria-current={on ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <span
              className={cn(
                "grid size-8 place-items-center rounded-full border text-[0.625rem] font-semibold tabular-nums transition-colors",
                on ? "border-ink bg-ink text-surface" : "border-line bg-surface text-muted group-hover:border-accent/50",
              )}
            >
              {s.number}
            </span>
            <span
              className={cn(
                "fw-rail-label whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-surface",
                on && "fw-rail-label-on",
              )}
            >
              {s.name}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
