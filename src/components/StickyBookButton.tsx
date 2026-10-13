"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

/** Booking bar fixed to the bottom of the screen on phones. Hidden on the booking page itself. */
export function StickyBookButton() {
  const pathname = usePathname();
  if (pathname.startsWith(site.booking.href)) return null;

  return (
    <div className="md:hidden">
      {/* Spacer so the fixed bar never covers the end of the page. */}
      <div aria-hidden="true" className="h-16 bg-navy" />
      <div className="fixed inset-x-0 bottom-0 z-40 bg-lantern pb-[env(safe-area-inset-bottom)] [--color-focus:var(--color-paper)]">
        <Link
          href={site.booking.href}
          className="flex h-16 items-center justify-center gap-3 font-medium text-paper focus-visible:outline-offset-[-6px]"
        >
          {site.booking.label}
          <span aria-hidden="true" className="h-4 w-px bg-paper/40" />
          <span className="text-sm font-normal text-paper/85">{site.booking.note}</span>
        </Link>
      </div>
    </div>
  );
}
