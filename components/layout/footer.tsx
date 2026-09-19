import { Container } from "./container";
import { FOOTER_LINKS, FOOTER_PLACES } from "@/content/site/nav";
import { SITE } from "@/lib/seo";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container>
        <div className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-12">
          <p className="order-2 text-[0.8125rem] text-muted sm:order-none">
            © {new Date().getFullYear()} {SITE.name}. {FOOTER_PLACES}
          </p>
          <ul className="order-1 flex w-full items-center justify-between gap-x-3 sm:order-none sm:w-auto sm:flex-wrap sm:justify-start sm:gap-x-7 sm:gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="whitespace-nowrap text-[0.6875rem] font-medium text-muted transition-colors hover:text-ink sm:text-[0.8125rem]"
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
