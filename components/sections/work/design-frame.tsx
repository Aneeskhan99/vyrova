import type { CSSProperties } from "react";
import { designFull, type DesignProject } from "@/content/site/design-projects";
import { designDetail } from "@/content/site/design-projects";

/**
 * A browser frame that the full-length design scrolls through as the page
 * scrolls. The section is tall; the frame is sticky inside it; the image
 * translates upward on a CSS view timeline tied to the section. No
 * JavaScript, no animation library — and where scroll-driven animations are
 * not supported, the frame simply becomes a scrollable box, which is the
 * honest fallback for "here is the whole page".
 *
 * The image carries the project's view-transition-name, so with
 * cross-document transitions on, the card the visitor clicked morphs into
 * this frame.
 */
export function DesignFrame({ project }: { project: DesignProject }) {
  // How far the page has to scroll for the design to travel its full
  // length. Taller designs get a longer runway, clamped to keep the page
  // finite.
  const pages = Math.min(6, Math.max(2, project.fullHeight / 1500));

  return (
    <div
      className="fw-frame-scope relative"
      style={{ "--pages": pages } as CSSProperties}
    >
      <div className="fw-frame-runway">
        <div className="fw-frame-sticky">
          <div className="fw-frame relative overflow-hidden rounded-tile border border-line bg-surface shadow-lift">
            {/* browser chrome */}
            <div className="flex items-center gap-2 border-b border-line bg-band px-4 py-2.5">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
              </span>
              <span className="mx-auto flex h-6 w-[min(60%,22rem)] items-center justify-center rounded-md bg-surface text-[0.6875rem] text-muted">
                {project.live
                  ? project.live.replace(/^https?:\/\//, "")
                  : `${project.slug}.design`}
              </span>
            </div>
            <div className="fw-frame-view relative overflow-hidden">
              <img
                src={designFull(project.slug)}
                alt={`${project.client} — full page design`}
                width={1200}
                height={project.fullHeight}
                decoding="async"
                fetchPriority="high"
                className="fw-frame-track block w-full"
                style={{ viewTransitionName: `vy-${project.slug}` }}
              />
            </div>
          </div>
          <p className="fw-frame-hint mt-3 text-center text-xs text-muted">
            {designDetail.frameHint}
          </p>
        </div>
      </div>
    </div>
  );
}
