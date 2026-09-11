import { ArrowRight } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { UiMock } from "@/components/sections/shared/ui-mock";
import { cn } from "@/lib/utils";

/** Placeholder cover tints until real project stills exist. */
const TINTS = [
  "from-cyan/30 to-accent/20",
  "from-indigo-200/60 to-indigo-300/40",
  "from-emerald-200/60 to-emerald-300/40",
  "from-amber-200/60 to-amber-300/40",
  "from-violet-200/60 to-violet-300/40",
] as const;

export type Project = {
  name: string;
  note: string;
  category: string;
};

export function ProjectCard({
  name,
  note,
  category,
  index,
  showCategory = false,
  className,
}: Project & {
  index: number;
  showCategory?: boolean;
  className?: string;
}) {
  const tint = TINTS[index % TINTS.length];

  return (
    <MagicCard
      className={cn(
        "fw-tilt rounded-tile border border-line bg-surface shadow-card",
        className,
      )}
    >
      <article className="flex h-full flex-col">
        <div
          className={cn(
            "relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br p-7",
            tint,
          )}
        >
          <UiMock className="shadow-card" bars={8} highlight={index % 8} />
          {showCategory ? (
            <span className="absolute left-5 top-5 rounded-full bg-surface/85 px-2.5 py-1 text-[0.6875rem] font-medium text-accent">
              {category}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 items-center justify-between gap-4 px-6 py-5">
          <div className="flex min-w-0 flex-col gap-0.5">
            <h3 className="truncate font-semibold">{name}</h3>
            <p className="truncate text-[0.8125rem] text-muted">{note}</p>
          </div>
          <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-accent" />
        </div>
      </article>
    </MagicCard>
  );
}
