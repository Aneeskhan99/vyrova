import { Container } from "./container";
import { FOOTER_LINKS } from "@/content/site/nav";
import { SITE } from "@/lib/seo";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container>
        <div className="flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-muted">
            © {new Date().getFullYear()} {SITE.name}. Dubai · Remote worldwide.
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[0.8125rem] font-medium text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
