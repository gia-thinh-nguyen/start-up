"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** A main navigation link, underlined on its own page. */
export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      className="swap -mx-1.5 inline-block px-1.5 py-1.5 aria-[current=page]:underline"
    >
      {label}
    </Link>
  );
}
