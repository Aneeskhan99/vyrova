import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { PauseOffscreen } from "@/components/motion/pause-offscreen";
import { codeSample } from "@/content/site/services";
import { cn } from "@/lib/utils";
import { LazyVideo } from "@/components/motion/lazy-video";

/**
 * Abstract artwork for each service row. Deliberately generic shapes —
 * no invented client logos, no fake metrics (C-04). Swap these for real
 * stills once there is work cleared for publication.
 */
export function ServiceVisual({
  kind,
  videoSrc,
  image,
}: {
  kind: string;
  videoSrc?: string | null;
  /** A delivered design's cover, for the services that are design. */
  image?: string | null;
}) {
  if (image) {
    return (
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-tile border border-line bg-surface shadow-lift">
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          width={800}
          height={500}
          className="size-full object-cover object-top"
        />
      </div>
    );
  }
  if (videoSrc) {
    return (
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-tile border border-line bg-surface shadow-lift">
        <LazyVideo src={videoSrc} />
      </div>
    );
  }

  if (kind === "code") {
    return (
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-tile bg-gradient-to-br from-cyan/25 to-indigo-200/50">
        <div className="absolute inset-[8%]">{renderKind(kind)}</div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-tile bg-gradient-to-br from-cyan/25 to-indigo-200/50">
      <div className="absolute inset-[12%] rounded-card bg-surface/90 shadow-lift" />
      <div className="absolute inset-[12%] p-6">{renderKind(kind)}</div>
    </div>
  );
}

function renderKind(kind: string) {
  if (kind === "ui") {
    return (
      <div className="flex h-full items-end gap-[3%]">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className={cn("flex-1 rounded-t-sm", i === 5 ? "bg-cyan" : "bg-cyan/40")}
            style={{ height: `${30 + ((i * 61) % 62)}%` }}
          />
        ))}
      </div>
    );
  }

  if (kind === "story") {
    return (
      <div className="flex h-full flex-col justify-between">
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="h-16 flex-1 rounded-lg bg-ink/[0.07]" />
          ))}
        </div>
        <div className="flex justify-center">
          <span className="grid size-14 place-items-center rounded-full bg-cyan">
            <span className="ml-1 border-y-[9px] border-l-[14px] border-y-transparent border-l-ink" />
          </span>
        </div>
      </div>
    );
  }

  if (kind === "web") {
    return (
      <div className="flex h-full flex-col gap-4">
        <span className="h-6 w-full rounded bg-ink/[0.07]" />
        <span className="h-3 w-1/2 rounded-full bg-ink/30" />
        <div className="flex flex-1 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="flex-1 rounded-lg bg-cyan/35" />
          ))}
        </div>
      </div>
    );
  }

  if (kind === "code") {
    return (
      <PauseOffscreen className="fw-code flex h-full flex-col overflow-hidden rounded-xl bg-ink text-surface shadow-lift">
        <div className="flex items-center gap-2 border-b border-surface/10 px-3 py-2">
          <span className="size-2.5 rounded-full bg-surface/25" />
          <span className="size-2.5 rounded-full bg-surface/25" />
          <span className="size-2.5 rounded-full bg-surface/25" />
          <span className="ml-2 rounded-md bg-surface/10 px-2 py-0.5 font-mono text-[0.6875rem] text-surface/70">
            {codeSample.file}
          </span>
        </div>
        <ol className="flex flex-1 flex-col justify-center gap-1 px-4 py-4 font-mono text-[0.8125rem] leading-relaxed">
          {codeSample.lines.map((line, i) => (
            <li key={line} className="fw-code-line flex gap-3" style={{ "--i": i } as CSSProperties}>
              <span className="w-4 shrink-0 text-right text-surface/30">{i + 1}</span>
              <span className="fw-code-text whitespace-pre text-surface/90">{tint(line)}</span>
            </li>
          ))}
          <li aria-hidden="true" className="flex gap-3">
            <span className="w-4 shrink-0" />
            <span className="fw-log-cursor inline-block h-4 w-2 bg-cyan" />
          </li>
        </ol>
        <div className="fw-code-toast mx-3 mb-3 flex items-center gap-2 self-start rounded-full bg-cyan px-3 py-1.5 text-[0.75rem] font-semibold text-ink">
          <Check className="size-3.5" strokeWidth={3} />
          {codeSample.status}
        </div>
      </PauseOffscreen>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <span className="h-1/2 w-2/3 self-center rounded-lg bg-ink/[0.07]" />
      <div className="flex gap-2 rounded-lg bg-ink/[0.05] p-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn("h-10 flex-1 rounded", i === 2 ? "bg-cyan" : "bg-cyan/35")}
          />
        ))}
      </div>
    </div>
  );
}

/** Colour a line of code by token, keywords and strings only. */
function tint(line: string) {
  const parts = line.split(/(\b(?:export|async|function|const|await|return)\b|"[^"]*")/g);
  return parts.map((part, i) => {
    if (/^(export|async|function|const|await|return)$/.test(part)) {
      return (
        <span key={i} className="text-violet">
          {part}
        </span>
      );
    }
    if (/^".*"$/.test(part)) {
      return (
        <span key={i} className="text-cyan">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
