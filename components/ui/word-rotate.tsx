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
        style={{
          width: width ? `${width}px` : undefined,
          transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Absolute so the word itself never sets the wrapper width —
            the measured value above is the single source of truth. */}
        <span
          key={index}
          className="fw-word absolute left-0 top-0 whitespace-nowrap"
        >
          {words[index]}
        </span>
        {/* Keeps the line box the right height without affecting width. */}
        <span aria-hidden="true" className="invisible">
          &nbsp;
        </span>
      </span>
    </>
  );
}
