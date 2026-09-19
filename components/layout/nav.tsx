import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { Logo } from "./logo";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MobileNav } from "./mobile-nav";
import { NAV_LINKS } from "@/content/site/nav";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ground/80 backdrop-blur-md">
      <Container>
        <nav
          aria-label="Main"
          className="relative flex h-16 items-center justify-between gap-6 lg:h-20"
        >
          <Link href="/" aria-label="VYROVA home">
            <Logo animate id="nav" />
          </Link>

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

          <MagneticButton href="#contact" className="hidden md:inline-flex">
            Start a project
            <ArrowRight aria-hidden="true" className="size-4" />
          </MagneticButton>

          <MobileNav />
        </nav>
      </Container>
    </header>
  );
}
