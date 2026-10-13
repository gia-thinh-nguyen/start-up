import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="border-b border-timber/15">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-gutter py-4 lg:px-gutter-lg lg:py-5">
        <Link
          href="/"
          className="font-display text-base tracking-label text-navy uppercase sm:text-lg"
        >
          {site.name}
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-5 text-sm sm:gap-8 sm:text-base">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="underline-offset-4 decoration-ochre decoration-2 hover:underline"
                >
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
