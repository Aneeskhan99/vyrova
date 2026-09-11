import { cn } from "@/lib/utils";

/**
 * Abstract artwork for each service row. Deliberately generic shapes —
 * no invented client logos, no fake metrics (C-04). Swap these for real
 * stills once there is work cleared for publication.
 */
export function ServiceVisual({ kind }: { kind: string }) {
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
      <div className="flex h-full flex-col justify-center gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2.5 rounded-full",
              i % 3 === 0 ? "bg-accent/70" : "bg-ink/15",
            )}
            style={{ width: `${40 + ((i * 97) % 55)}%`, marginLeft: i % 2 ? 24 : 0 }}
          />
        ))}
      </div>
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
