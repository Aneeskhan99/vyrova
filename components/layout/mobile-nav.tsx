"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS, NAV_LABELS } from "@/content/site/nav";

/**
 * Phone navigation: a three line button that opens the page list.
 * Only mounted below md, so the desktop bar ships none of this. The
 * panel is plain links, so tapping one navigates as normal.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? NAV_LABELS.close : NAV_LABELS.open}
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-band"
      >
        {open ? (
          <X aria-hidden="true" className="size-6" />
        ) : (
          <Menu aria-hidden="true" className="size-6" />
        )}
      </button>

      {open ? (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 bottom-0 top-20 z-40 cursor-default bg-ink/20"
          />
          <div className="fw-sheet absolute inset-x-0 top-full z-50 border-b border-line bg-ground shadow-lift">
            <ul className="flex flex-col px-5 py-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-line/70 last:border-0">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-base font-semibold text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-5 pb-5">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-surface"
              >
                {NAV_LABELS.cta}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
