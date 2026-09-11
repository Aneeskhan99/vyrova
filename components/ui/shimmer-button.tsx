/**
 * Shimmer Button — adapted from Magic UI
 * (magicui.design/docs/components/shimmer-button). Vendored 2026-09-11.
 * The sweep is a CSS animation, so it costs no JS.
 */
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ShimmerButtonProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
};

export function ShimmerButton({ className, children, ...props }: ShimmerButtonProps) {
  return (
    <a
      {...props}
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-cyan px-7 py-4",
        "text-base font-semibold text-ink transition-transform duration-200",
        "hover:-translate-y-0.5 active:translate-y-0",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 w-1/3 -skew-x-12 bg-surface/40 blur-md"
        style={{ animation: "fw-shimmer 3.2s ease-in-out infinite" }}
      />
      <span className="relative">{children}</span>
    </a>
  );
}
