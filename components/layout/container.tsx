import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page gutter and max width, set once and reused (T-04). */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-wide px-5 sm:px-8 lg:px-12 2xl:max-w-ultra 2xl:px-16", className)}>
      {children}
    </div>
  );
}
