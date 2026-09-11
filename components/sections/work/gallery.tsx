"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/sections/shared/project-card";
import { FILTERS, projects } from "@/content/site/work";
import { cn } from "@/lib/utils";

/**
 * Filter tabs and the grid they filter. One client component rather
 * than two, because the tabs and the grid share a single piece of state.
 *
 * The active pill is the button's own background, not an absolutely
 * positioned element measured from it. A measured pill slides nicely but
 * needs a correct measurement to exist at all, and it cannot span a
 * wrapped row — at narrow widths it renders as a blob across two lines.
 * So the list scrolls sideways instead of wrapping, and the pill is
 * simply painted on the active tab.
 */
export function Gallery() {
  const [active, setActive] = useState<string>(FILTERS[0]);

  const visible =
    active === FILTERS[0]
      ? projects
      : projects.filter((project) => project.category === active);

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter projects by service"
        className={cn(
          "-mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0",
          // One row at every width; it scrolls rather than wrapping.
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        <div className="flex w-max gap-1 rounded-[1.75rem] border border-line bg-surface p-1.5 shadow-card">
          {FILTERS.map((filter) => {
            const isActive = filter === active;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(filter)}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium",
                  "transition-colors duration-200",
                  isActive
                    ? "bg-ink text-surface"
                    : "text-muted hover:bg-band hover:text-ink",
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>
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
    </>
  );
}
