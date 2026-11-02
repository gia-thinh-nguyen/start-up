import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="surface-table">
      <div className="mx-auto flex h-header max-w-page items-baseline justify-between gap-4 px-gutter pt-4.5 md:items-center md:pt-0 lg:h-header-lg lg:px-gutter-lg">
        <Link
          href="/"
          className="swap -mx-1.5 px-1.5 font-display text-wordmark whitespace-nowrap"
        >
          {site.name}
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-4.5 text-small font-medium md:gap-8 md:text-body">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="swap -mx-1.5 inline-block px-1.5 py-1.5">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="hidden md:block">
              <BookButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
