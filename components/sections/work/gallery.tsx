"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/sections/shared/project-card";
import { FILTERS, projects } from "@/content/site/work";
import { cn } from "@/lib/utils";

/**
 * Filter tabs with an indicator that slides to the active pill, and the
 * grid they filter. One client component rather than two, because the
 * tabs and the grid share a single piece of state.
 *
 * The indicator is positioned from the active button's measured box, so
 * it stays correct when the labels wrap at narrow widths.
 */
export function Gallery() {
  const [active, setActive] = useState<string>(FILTERS[0]);
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const move = () => {
      const current = list.querySelector<HTMLElement>('[data-active="true"]');
      if (current) {
        setIndicator({ left: current.offsetLeft, width: current.offsetWidth });
      }
    };

    move();
    const observer = new ResizeObserver(move);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  const visible =
    active === FILTERS[0]
      ? projects
      : projects.filter((project) => project.category === active);

  return (
    <>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Filter projects by service"
        className="relative inline-flex flex-wrap gap-1 rounded-[1.75rem] border border-line bg-surface p-1.5 shadow-card"
      >
        <span
          aria-hidden="true"
          className="absolute top-1.5 h-[calc(100%-0.75rem)] rounded-full bg-ink transition-[left,width] duration-300 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
        {FILTERS.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-active={isActive}
              onClick={() => setActive(filter)}
              className={cn(
                "relative z-10 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                isActive ? "text-surface" : "text-muted hover:text-ink",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        aria-live="polite"
      >
        {visible.map((project, i) => (
          <ProjectCard
            key={project.name + project.note}
            name={project.name}
            note={project.note}
            category={project.category}
            index={i}
            showCategory
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-muted">
          Nothing published under that service yet. Everything else is above.
        </p>
      ) : null}
    </>
  );
}
