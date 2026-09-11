"use client";

/**
 * Word Rotate — adapted from Magic UI (magicui.design/docs/components/word-rotate)
 * Vendored 2026-09-11, rewritten without an animation library: React
 * remounts the span when the key changes, which replays the CSS
 * animation. Keeps the hero free of Motion (P-01).
 */
import { useEffect, useState } from "react";
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
  const reduced = usePrefersReducedMotion();
  const first = words[0] ?? "";

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [interval, reduced, words.length]);

  // Reserve the width of the longest word so rotating never shifts
  // the rest of the headline (M-08).
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), first);

  if (reduced) {
    return <span className={className}>{first}</span>;
  }

  return (
    <span className={cn("relative inline-grid", className)}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {longest}
      </span>
      <span
        key={index}
        className="fw-word col-start-1 row-start-1 whitespace-nowrap"
      >
        {words[index]}
      </span>
    </span>
  );
}
