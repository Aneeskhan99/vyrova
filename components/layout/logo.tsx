import { cn } from "@/lib/utils";

/**
 * Placeholder wordmark. The real logo has not been designed yet —
 * replace the square with the final mark and keep the same footprint so
 * nothing in the nav or footer needs to move.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden="true" className="size-7 rounded-lg bg-cyan" />
      <span className="text-[1.0625rem] font-bold tracking-tight">FrameWell</span>
    </span>
  );
}
