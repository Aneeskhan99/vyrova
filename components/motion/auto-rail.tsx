"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

type AutoRailProps = {
  children: ReactNode;
  /** Milliseconds each card is held before the rail steps on. */
  interval?: number;
  /** The rail only walks itself below this width. */
  until?: number;
};

/** The scroller is either this element or the one child that scrolls. */
function railOf(host: HTMLElement): HTMLElement | null {
  const scrolls = (el: HTMLElement) => {
    const overflow = getComputedStyle(el).overflowX;
    return overflow === "auto" || overflow === "scroll";
  };
  if (scrolls(host)) return host;
  const child = host.firstElementChild as HTMLElement | null;
  return child && scrolls(child) ? child : null;
}

/**
 * A sideways rail that walks itself along on phones: every `interval`
 * it glides to the next card and wraps back to the first at the end.
 * A touch or a hover stops it, and it starts again a few seconds after
 * the last interaction, so nothing moves under a reader's thumb.
 * Off screen it does nothing, and reduced motion turns it off for good.
 * Scrolling stays native, so the rail is swipeable either way.
 *
 * It wraps the scroller rather than being it, so the markup inside is
 * free to be whatever the section needs.
 */
export function AutoRail({ children, interval = 3200, until = 768 }: AutoRailProps) {
  const host = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = host.current;
    if (!node || reduced) return;
    if (!window.matchMedia(`(max-width: ${until - 1}px)`).matches) return;

    let held = 0;
    const hold = () => {
      held = Date.now();
    };

    function step() {
      const node = host.current;
      const el = node ? railOf(node) : null;
      if (!el) return;

      // On screen by geometry, so the rail keeps its own counsel even
      // when the tab is throttled and observers stop reporting.
      const box = el.getBoundingClientRect();
      if (box.bottom <= 0 || box.top >= window.innerHeight) return;
      if (Date.now() - held < 6000) return;
      if (document.hidden) return;

      // A child may be the track holding the cards (wider than the rail)
      // so descend until something is card sized: that width is the step.
      let card = el.firstElementChild as HTMLElement | null;
      let width = card ? card.getBoundingClientRect().width : 0;
      while (card && (width === 0 || width > el.clientWidth + 1)) {
        const child = card.firstElementChild as HTMLElement | null;
        if (!child) break;
        card = child;
        width = card.getBoundingClientRect().width;
      }
      if (!card || width < 40) return;

      const pitch = width + 16;
      const end = el.scrollWidth - el.clientWidth - 4;
      const from = el.scrollLeft;
      const to = from >= end ? 0 : Math.min(from + pitch, end + 4);
      if (Math.abs(to - from) < 2) return;

      // Mandatory snapping can grab a different snap point mid-glide and
      // throw the rail to one end, so it is off for the length of the
      // step. The glide itself is the browser's, which is smoother than
      // anything stepped from script.
      el.style.scrollSnapType = "none";
      el.scrollTo({ left: to, behavior: "smooth" });

      window.setTimeout(() => {
        // Frames are not guaranteed (background tab, window behind
        // another): if the glide never ran, land the step outright.
        if (Math.abs(el.scrollLeft - to) > 8) el.scrollLeft = to;
        el.style.scrollSnapType = "";
      }, 800);
    }

    const timer = window.setInterval(step, interval);
    const events = ["pointerdown", "touchstart", "wheel", "mouseenter"] as const;
    for (const event of events) {
      node.addEventListener(event, hold, { passive: true });
    }

    return () => {
      window.clearInterval(timer);
      for (const event of events) node.removeEventListener(event, hold);
    };
  }, [interval, reduced, until]);

  return <div ref={host}>{children}</div>;
}
