"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard, type Project } from "@/components/sections/shared/project-card";
import { FILTERS, FILTER_QUERY, flow, projects } from "@/content/site/work";
import {
  DESIGN_KIND,
  designCover,
  designProjects,
} from "@/content/site/design-projects";
import { cn } from "@/lib/utils";

/**
 * Filter tabs and the grid they filter. One client component rather
 * than two, because the tabs and the grid share a single piece of state.
 *
 * The delivered website designs join the hand-listed films here, each as
 * an internal card whose cover morphs into its project page.
 *
 * `?filter=<key>` in the URL preselects a tab, so the Wall's "see all
 * design work" link lands on the design view. Read once on mount; static
 * export has no server to read the query for us.
 */
const ALL: readonly Project[] = [
  ...projects.map((p) => ({
    name: p.name,
    note: p.note,
    category: p.category,
    videoSrc: "videoSrc" in p ? p.videoSrc : null,
    image: "image" in p ? p.image : null,
    href: "href" in p ? p.href : null,
  })),
  ...designProjects.map((p) => ({
    name: p.client,
    note: `${DESIGN_KIND} · ${p.sector}`,
    category: DESIGN_KIND,
    image: designCover(p.slug),
    href: `/work/${p.slug}/`,
    internal: true,
    tint: p.palette[0],
    vt: `vy-${p.slug}`,
  })),
];

export function Gallery() {
  const [active, setActive] = useState<string>(FILTERS[0]);
  const list = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const track = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const hold = useRef(false);
  const onScreen = useRef(false);
  const idle = useRef<number | null>(null);

  // The sliding pill: measure the active tab and move one highlight
  // behind it (transform only), instead of restyling each button.
  useLayoutEffect(() => {
    const el = list.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    const box = list.current;
    if (!el || !box) return;
    setPill({ x: el.offsetLeft - box.offsetLeft, w: el.offsetWidth });
  }, [active]);

  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("filter");
    if (!key) return;
    const match = FILTER_QUERY[key as keyof typeof FILTER_QUERY];
    if (match) setActive(match);
  }, []);

  const visible =
    active === FILTERS[0] ? ALL : ALL.filter((project) => project.category === active);

  const n = visible.length;

  /** Distance from one card's centre to the next, in px. */
  function pitchOf(root: HTMLUListElement) {
    const item = root.querySelector<HTMLElement>("[data-flow]");
    if (!item) return 0;
    const gap = parseFloat(getComputedStyle(root).columnGap || "0") || 24;
    return item.offsetWidth + gap;
  }

  // The set is rendered twice. Once the scroller is inside the second
  // copy, an instant jump back by one set keeps the ride endless with
  // nothing visible changing — the card under the cursor is identical.
  function settle(root: HTMLUListElement) {
    const pitch = pitchOf(root);
    if (!pitch || !n) return;
    if (root.scrollLeft >= n * pitch - 1) {
      root.scrollTo({ left: root.scrollLeft - n * pitch, behavior: "instant" });
    }
  }

  // Which card is centred, from the scroll position, once per frame.
  useEffect(() => {
    const root = track.current;
    if (!root) return;
    root.scrollTo({ left: 0 });
    setCurrent(0);
    let frame = 0;
    const read = () => {
      frame = 0;
      const pitch = pitchOf(root);
      if (!pitch || !n) return;
      setCurrent(Math.round(root.scrollLeft / pitch) % n);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    const onEnd = () => settle(root);
    root.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("scrollend", onEnd);
    return () => {
      root.removeEventListener("scroll", onScroll);
      root.removeEventListener("scrollend", onEnd);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function step(dir: 1 | -1) {
    const root = track.current;
    if (!root) return;
    settle(root);
    const pitch = pitchOf(root);
    if (!pitch || !n) return;
    let at = Math.round(root.scrollLeft / pitch);
    if (dir === -1 && at === 0) {
      // Wrap backwards: jump to the same card in the second copy first.
      root.scrollTo({ left: n * pitch, behavior: "instant" });
      at = n;
    }
    root.scrollTo({ left: (at + dir) * pitch, behavior: "smooth" });
  }

  // Manual use pauses the ride for a moment.
  function stepByHand(dir: 1 | -1) {
    hold.current = true;
    if (idle.current) window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => {
      hold.current = false;
    }, 6000);
    step(dir);
  }

  // The ride: one card every few seconds while on screen and not held.
  useEffect(() => {
    const root = track.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        onScreen.current = entries.some((e) => e.isIntersecting);
      },
      { threshold: 0.4 },
    );
    observer.observe(root);
    const tick = window.setInterval(() => {
      if (!onScreen.current || hold.current || document.hidden) return;
      step(1);
    }, 3200);
    return () => {
      observer.disconnect();
      window.clearInterval(tick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter projects by service"
        className={cn(
          "flex gap-1 sm:-mx-0 sm:overflow-x-auto",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        <div
          ref={list}
          className="relative flex w-full flex-wrap justify-center gap-1 rounded-[1.75rem] border border-line bg-surface p-1.5 shadow-card sm:w-max sm:min-w-full sm:flex-nowrap sm:justify-start sm:gap-1"
        >
          {pill ? (
            <span
              aria-hidden="true"
              className="fw-tab-pill absolute inset-y-1.5 left-0 hidden rounded-full bg-ink sm:block"
              style={{ "--x": `${pill.x}px`, "--w": `${pill.w}px` } as CSSProperties}
            />
          ) : null}
          {FILTERS.map((filter) => {
            const isActive = filter === active;
            const count =
              filter === FILTERS[0] ? ALL.length : ALL.filter((p) => p.category === filter).length;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(filter)}
                className={cn(
                  "relative z-10 whitespace-nowrap rounded-full px-3 py-1.5 text-center text-[0.75rem] font-medium sm:flex-1 sm:px-4 sm:py-2.5 sm:text-sm",
                  "transition-colors duration-300",
                  isActive
                    ? "bg-ink text-surface sm:bg-transparent"
                    : "text-muted hover:text-ink",
                )}
              >
                {filter}
                <span className={cn("ml-1 text-[0.625rem] sm:ml-1.5 sm:text-xs", isActive ? "text-surface/70" : "text-muted/70")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cover flow. A native horizontal scroller with snap points; each
          card's tilt, scale and opacity come from its own inline view
          timeline, so the one in the middle stands square and the rest
          turn away on either side. It rides on its own, one card every
          few seconds, and never stops: the set is doubled and the scroll
          position wraps invisibly. Hovering holds it; arrows and a
          counter for mouse users. */}
      <div className="fw-flow relative mt-8 lg:mt-12">
        <ul
          ref={track}
          className="fw-flow-track"
          onPointerEnter={() => {
            hold.current = true;
          }}
          onPointerLeave={() => {
            hold.current = false;
          }}
        >
          {[0, 1].map((copy) =>
            visible.map((project, i) => (
              <li
                key={`${copy}-${project.name}-${project.note}`}
                data-flow={copy * n + i}
                aria-hidden={copy === 1}
                className="fw-flow-item"
              >
                <ProjectCard
                  {...project}
                  vt={copy === 0 ? project.vt : null}
                  index={i}
                  showCategory
                  className="h-full"
                />
              </li>
            )),
          )}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="hidden text-xs text-muted sm:block">{flow.hint}</p>
          <div className="flex items-center gap-3">
            <span className="text-sm tabular-nums text-muted">
              <span className="font-semibold text-ink">{String(current + 1).padStart(2, "0")}</span>{" "}
              {flow.of} {String(visible.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => stepByHand(-1)}
              aria-label={flow.prev}
              className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink shadow-card transition-colors hover:border-accent/50 disabled:opacity-40"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => stepByHand(1)}
              aria-label={flow.next}
              className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink shadow-card transition-colors hover:border-accent/50 disabled:opacity-40"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
