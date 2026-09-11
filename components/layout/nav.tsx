import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { Logo } from "./logo";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { NAV_LINKS } from "@/content/site/nav";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ground/80 backdrop-blur-md">
      <Container>
        <nav
          aria-label="Main"
          className="flex h-20 items-center justify-between gap-6"
        >
          <a href="/" aria-label="FrameWell home">
            <Logo />
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.9375rem] font-medium text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <MagneticButton href="#contact">
            Start a project
            <ArrowRight aria-hidden="true" className="size-4" />
          </MagneticButton>
        </nav>
      </Container>
    </header>
  );
}
