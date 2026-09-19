"use client";

/**
 * Word Rotate — adapted from Magic UI (magicui.design/docs/components/word-rotate)
 * Vendored 2026-09-11, rewritten without an animation library: React
 * remounts the span when the key changes, which replays the CSS
 * animation.
 *
 * The words differ in width, and the text after them is meant to move
 * with them rather than sit at a fixed distance. A hard width change
 * would snap the rest of the line sideways, so every word is measured
 * once and the wrapper transitions between those widths — the sentence
 * reflows smoothly instead of jumping.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type WordRotateProps = {
  words: readonly string[];
  /** Milliseconds each word is held. */
  interval?: number;
  className?: string;
};

export function WordRotate({ words, interval = 2400, className }: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const [widths, setWidths] = useState<number[]>([]);
  const measureRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const first = words[0] ?? "";

  // Measure every word once, then again after the webfont swaps in —
  // widths taken against the fallback face would be wrong.
  useLayoutEffect(() => {
    const measure = () => {
      const el = measureRef.current;
      if (!el) return;
      const next = Array.from(el.children).map(
        (child) => (child as HTMLElement).getBoundingClientRect().width,
      );
      if (next.some((w) => w > 0)) setWidths(next);
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [words]);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [interval, reduced, words.length]);

  if (reduced) {
    return <span className={className}>{first}</span>;
  }

  const width = widths[index];
  // Until the measuring pass has run (server render, and the first paint
  // before hydration), there is no width to give the wrapper. Laying the
  // word out absolutely at that point collapses the wrapper to zero and
  // the rest of the sentence prints straight over the word. So the word
  // stays in normal flow until a real measurement exists, and only then
  // switches to the absolute + fixed-width mode that lets the line
  // reflow smoothly between words.
  const measured = typeof width === "number" && width > 0;

  return (
    <>
      {/*
        Copy of every word, used only for measurement. It is collapsed to
        a zero-size clipping box: laid out at natural size inside (so the
        widths are real) but contributing nothing to the page, which would
        otherwise widen the document and add a horizontal scrollbar.
        Each word is w-max so the zero-width parent cannot squeeze it.

        visibility:hidden matters as much as the zero size: it keeps the
        element measurable (unlike display:none) while removing its text
        from the heading's content, so the h1 reads as the sentence it is
        rather than as every candidate word run together.
      */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-0 top-0 block size-0 overflow-hidden",
          className,
        )}
        style={{ visibility: "hidden" }}
      >
        {words.map((word) => (
          <span key={word} className="block w-max whitespace-nowrap">
            {word}
          </span>
        ))}
      </span>

      <span
        className={cn("relative inline-block align-bottom", className)}
        style={
          measured
            ? {
                width: `${width}px`,
                transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }
            : undefined
        }
      >
        {/* Once measured, absolute so the word itself never sets the
            wrapper width — the measured value above is the single source
            of truth. Before that it is in flow, so it still occupies its
            own space and nothing overlaps it. */}
        <span
          key={index}
          className={cn(
            "fw-word whitespace-nowrap",
            measured ? "absolute left-0 top-0" : "inline-block",
          )}
        >
          {words[index]}
        </span>
        {/* Keeps the line box the right height without affecting width.
            Only needed while the word is out of flow. */}
        {measured ? (
          <span aria-hidden="true" className="invisible">
            &nbsp;
          </span>
        ) : null}
      </span>
    </>
  );
}
