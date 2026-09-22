"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FilmTile } from "@/components/motion/film-tile";
import {
  FILTERS,
  FILTER_QUERY,
  cardLabels,
  index as copy,
  projects,
} from "@/content/site/work";
import {
  DESIGN_KIND,
  designCover,
  designProjects,
} from "@/content/site/design-projects";
import { posterFor } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Every project as an index: a set of typographic lines on the left, one
 * preview frame on the right. Reading a line lights it and swaps the
 * frame; opening it is the same click it always was.
 *
 * This replaced a cover-flow carousel that mounted all twenty one cards
 * twice for an endless loop, each one tilting on its own view timeline
 * under a mirrored reflection. Forty two promoted layers, every one
 * painted twice, is what made this page crawl while the rest of the site
 * stayed quick. Here nothing is duplicated, no card is promoted, and the
 * only cover ever fetched is the one someone actually looked at — the
 * lines themselves are text, so a filter change costs nothing.
 *
 * `?filter=<key>` in the URL preselects a tab, so the Wall's "see all
 * design work" link lands on the design view. Read once on mount; static
 * export has no server to read the query for us.
 */
type Row = {
  name: string;
  note: string;
  category: string;
  /** Still shown in the frame: a screenshot, or a film's poster. */
  cover: string | null;
  videoSrc: string | null;
  /** Shot 9:16. Stood in a phone rather than letterboxed into the stage. */
  vertical: boolean;
  href: string | null;
  internal: boolean;
  tint: string | null;
};

const ALL: readonly Row[] = [
  ...projects.map((p) => {
    const videoSrc = "videoSrc" in p ? p.videoSrc : null;
    const image = "image" in p ? p.image : null;
    return {
      name: p.name,
      note: p.note,
      category: p.category,
      cover: image ?? (videoSrc ? posterFor(videoSrc) : null),
      videoSrc,
      vertical: "vertical" in p ? p.vertical : false,
      href: "href" in p ? p.href : null,
      internal: false,
      tint: null,
    };
  }),
  ...designProjects.map((p) => ({
    name: p.client,
    note: `${DESIGN_KIND} · ${p.sector}`,
    category: DESIGN_KIND,
    cover: designCover(p.slug),
    videoSrc: null,
    vertical: false,
    href: `/work/${p.slug}/`,
    internal: true,
    tint: p.palette[0],
  })),
];

/** Covers belonging to a 9:16 film, which the frame blurs into a backdrop. */
const TALL_COVERS = new Set(
  ALL.filter((row) => row.vertical && row.cover).map((row) => row.cover as string),
);

export function Gallery() {
  const [active, setActive] = useState<string>(FILTERS[0]);
  const [at, setAt] = useState(0);
  /** Covers already looked at, so the cross-fade has two layers to work with. */
  const [seen, setSeen] = useState<readonly string[]>([]);
  const [filmOn, setFilmOn] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  /** Touch: the first tap previews, the second opens. */
  const coarse = useRef(false);

  const visible =
    active === FILTERS[0] ? ALL : ALL.filter((row) => row.category === active);
  const n = visible.length;
  const current = n ? visible[Math.min(at, n - 1)] : null;

  // The sliding pill: measure the active tab and move one highlight
  // behind it (transform only), instead of restyling each button. The
  // pill is absolutely placed inside the tab strip, and offsetLeft is
  // already measured from the strip because the strip is the positioned
  // ancestor — subtracting the strip's own offset, as this did, pushed
  // the pill a page gutter to the left of the tab it was lighting.
  //
  // Re-measured when the strip resizes and once the web font has loaded,
  // since both change where the tabs sit.
  useLayoutEffect(() => {
    const box = list.current;
    if (!box) return;
    const measure = () => {
      const el = box.querySelector<HTMLButtonElement>('[aria-selected="true"]');
      if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    coarse.current = window.matchMedia("(hover: none)").matches;
    const key = new URLSearchParams(window.location.search).get("filter");
    if (!key) return;
    const match = FILTER_QUERY[key as keyof typeof FILTER_QUERY];
    if (match) setActive(match);
  }, []);

  useEffect(() => {
    setAt(0);
  }, [active]);

  // Keep the shown cover mounted from here on, so returning to it is a
  // fade rather than a fetch.
  const cover = current?.cover ?? null;
  useEffect(() => {
    if (!cover) return;
    setSeen((list) => (list.includes(cover) ? list : [...list, cover]));
  }, [cover]);

  // A film only starts once the line has been held for a moment, so
  // running an eye down the list never opens six video connections.
  const film = current?.videoSrc ?? null;
  useEffect(() => {
    setFilmOn(false);
    if (!film) return;
    const timer = window.setTimeout(() => setFilmOn(true), 420);
    return () => window.clearTimeout(timer);
  }, [film]);

  const openLabel = current
    ? current.videoSrc
      ? copy.play
      : current.internal
        ? cardLabels.openInternal
        : cardLabels.openExternal
    : "";

  const shots = seen.map((src) => (
    <img
      key={src}
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      width={1280}
      height={800}
      className={cn("fw-idx-shot", TALL_COVERS.has(src) && "is-tall", src === cover && "is-on")}
    />
  ));

  return (
    <section className="border-t border-line bg-ground py-12 lg:py-20">
      <Container>
        <div
          role="tablist"
          aria-label={copy.filterLabel}
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
                style={{ "--fw-pill-x": `${pill.x}px`, "--fw-pill-w": `${pill.w}px` } as CSSProperties}
              />
            ) : null}
            {FILTERS.map((filter) => {
              const isActive = filter === active;
              const count =
                filter === FILTERS[0]
                  ? ALL.length
                  : ALL.filter((row) => row.category === filter).length;
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
                    isActive ? "bg-ink text-surface sm:bg-transparent" : "text-muted hover:text-ink",
                  )}
                >
                  {filter}
                  <span
                    className={cn(
                      "ml-1 text-[0.625rem] sm:ml-1.5 sm:text-xs",
                      isActive ? "text-surface/70" : "text-muted/70",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {n === 0 ? (
          <p className="mt-10 text-[0.9375rem] text-muted lg:mt-14">{copy.empty}</p>
        ) : (
          <div className="mt-6 flex flex-col gap-6 lg:mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,31rem)]">
            {/* The frame. Sticky on both: pinned under the bar on a phone,
                riding the column on a laptop. */}
            <div className="sticky top-[4.25rem] z-10 -mx-5 bg-ground px-5 pb-3 lg:top-28 lg:order-2 lg:mx-0 lg:self-start lg:bg-transparent lg:px-0 lg:pb-0">
              <div
                className="fw-idx-frame"
                style={current?.tint ? ({ "--tint": current.tint } as CSSProperties) : undefined}
              >
                <span aria-hidden="true" className="fw-idx-glow" />
                {current?.videoSrc ? (
                  <div className={cn("fw-idx-stage", current.vertical && "is-tall")}>
                    {shots}
                    {current.vertical ? (
                      // 9:16 in a 16:10 frame is mostly letterbox, so the
                      // poster blurs out to fill the stage and the film itself
                      // stands in a phone on top of it.
                      <div className="fw-idx-phone">
                        {filmOn ? (
                          <FilmTile src={current.videoSrc} className="size-full" />
                        ) : cover ? (
                          <img
                            src={cover}
                            alt=""
                            aria-hidden="true"
                            width={720}
                            height={1280}
                            className="size-full object-cover"
                          />
                        ) : null}
                      </div>
                    ) : filmOn ? (
                      <div className="absolute inset-0">
                        <FilmTile src={current.videoSrc} className="size-full" />
                      </div>
                    ) : null}
                  </div>
                ) : current?.href ? (
                  <a
                    href={current.href}
                    target={current.internal ? undefined : "_blank"}
                    rel={current.internal ? undefined : "noopener noreferrer"}
                    aria-label={`${current.name} — ${openLabel}`}
                    className="fw-idx-stage block"
                  >
                    {shots}
                  </a>
                ) : (
                  <div className="fw-idx-stage">{shots}</div>
                )}

                <div className="mt-4 hidden items-end justify-between gap-5 lg:flex">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="fw-idx-open">
                      {current?.videoSrc ? (
                        <Play aria-hidden="true" className="size-3 fill-current" />
                      ) : null}
                      {openLabel}
                    </span>
                    <h3 className="truncate text-xl font-bold tracking-tight">{current?.name}</h3>
                    <p className="truncate text-[0.8125rem] text-muted">{current?.note}</p>
                  </div>
                  <span className="shrink-0 text-sm tabular-nums text-muted">
                    <span className="font-semibold text-ink">
                      {String(Math.min(at, n - 1) + 1).padStart(2, "0")}
                    </span>{" "}
                    {copy.of} {String(n).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* The index itself. Text only — no covers, no tilt, no layers. */}
            <div className="lg:order-1">
              <ol className="fw-idx">
                {visible.map((row, i) => {
                  const isAt = i === Math.min(at, n - 1);
                  const label = row.videoSrc
                    ? copy.play
                    : row.internal
                      ? cardLabels.openInternal
                      : cardLabels.openExternal;
                  const body = (
                    <>
                      <span className="fw-idx-n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="fw-idx-text">
                        <span className="fw-idx-name">{row.name}</span>
                        <span className="fw-idx-note">{row.note}</span>
                      </span>
                      <span className="fw-idx-cat">{row.category}</span>
                      <span className="fw-idx-go" aria-hidden="true">
                        {row.videoSrc ? (
                          <Play className="size-3.5 fill-current" />
                        ) : row.internal ? (
                          <ArrowRight className="size-4" />
                        ) : (
                          <ArrowUpRight className="size-4" />
                        )}
                      </span>
                    </>
                  );
                  return (
                    <li key={`${row.name}-${row.note}`} className="fw-idx-li">
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.internal ? undefined : "_blank"}
                          rel={row.internal ? undefined : "noopener noreferrer"}
                          aria-label={`${row.name} — ${label}`}
                          onPointerEnter={() => setAt(i)}
                          onFocus={() => setAt(i)}
                          onClick={(e) => {
                            if (coarse.current && !isAt) {
                              e.preventDefault();
                              setAt(i);
                            }
                          }}
                          className={cn("fw-idx-row", isAt && "is-at")}
                        >
                          {body}
                        </a>
                      ) : (
                        <button
                          type="button"
                          aria-label={`${row.name} — ${label}`}
                          onPointerEnter={() => setAt(i)}
                          onFocus={() => setAt(i)}
                          onClick={() => setAt(i)}
                          className={cn("fw-idx-row w-full text-left", isAt && "is-at")}
                        >
                          {body}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ol>
              <p className="mt-5 text-xs text-muted">
                <span className="hidden sm:inline">{copy.hint}</span>
                <span className="sm:hidden">{copy.tapHint}</span>
              </p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
