import { Mark, Wordmark } from "@/components/brand/mark";
import { cn } from "@/lib/utils";

/**
 * The VYROVA lockup. Mark left, outlined wordmark right, cap height tied to
 * the mark's optical centre. Fully inline SVG, so the header never waits on
 * a font or an image request.
 *
 * `fw-vt-logo` gives the lockup a view-transition-name: with cross-document
 * view transitions on, the logo holds still while the rest of the page
 * changes underneath it.
 */
export function Logo({
  className,
  animate = false,
  id = "logo",
}: {
  className?: string;
  animate?: boolean;
  id?: string;
}) {
  return (
    <span
      className={cn("fw-vt-logo inline-flex items-center gap-2.5", className)}
    >
      <Mark id={id} animate={animate} priority className="size-9" />
      <Wordmark className="h-[0.8125rem] text-ink" />
    </span>
  );
}
