import { cn } from "@/lib/utils";

/**
 * A generic product interface used as placeholder artwork until real
 * client screenshots exist. Deliberately abstract: no invented logos,
 * no fake metrics (C-04).
 */
export function UiMock({
  className,
  bars = 10,
  highlight = 7,
}: {
  className?: string;
  bars?: number;
  highlight?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex size-full overflow-hidden rounded-xl border border-line bg-surface",
        className,
      )}
    >
      <div className="hidden w-[22%] shrink-0 flex-col gap-2.5 border-r border-line bg-band p-4 sm:flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn("h-2 rounded-full", i === 1 ? "bg-ink/45" : "bg-ink/12")}
            style={{ width: `${70 - i * 6}%` }}
          />
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div className="flex gap-2.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex h-12 flex-1 flex-col justify-end rounded-lg bg-band p-2"
            >
              <span className="h-2 w-2/3 rounded-full bg-ink/25" />
            </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 items-end gap-[3%] rounded-lg bg-band p-3">
          {Array.from({ length: bars }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "flex-1 rounded-t-sm",
                i === highlight ? "bg-cyan" : "bg-cyan/40",
              )}
              style={{ height: `${28 + ((i * 53) % 62)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
