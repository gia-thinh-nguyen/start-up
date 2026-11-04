import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { NavLink } from "@/components/NavLink";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="surface-table">
      {/* Below 320px (or with large text) the links drop under the wordmark instead of running off the screen. */}
      <div className="mx-auto flex min-h-header max-w-page flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-gutter pt-4.5 pb-2 md:items-center md:py-0 lg:h-header-lg lg:px-gutter-lg">
        <Link
          href="/"
          className="swap -mx-1.5 px-1.5 font-display text-wordmark whitespace-nowrap"
        >
          {site.name}
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-2.5 text-fine font-medium min-[23rem]:gap-4.5 min-[23rem]:text-small md:gap-8 md:text-body">
            {site.nav.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} />
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
