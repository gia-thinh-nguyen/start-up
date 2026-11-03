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
      <div aria-hidden="true" className="h-[calc(var(--spacing-bar)+env(safe-area-inset-bottom))] bg-navy" />
      {/*
        The notch sits at 50%, directly above the divider, because the 1fr columns centre it.
        It steps aside while someone types: above a phone keyboard it would cover the field, and a
        mis-tap would leave the page and lose their message.
      */}
      <Link
        href={site.booking.href}
        className="[body:has(input:focus,textarea:focus)_&]:hidden notched fixed inset-x-0 bottom-0 z-40 grid h-[calc(var(--spacing-bar)+env(safe-area-inset-bottom))] grid-cols-[1fr_auto_1fr] items-center gap-3 pb-[env(safe-area-inset-bottom)] whitespace-nowrap text-paper [--color-focus:var(--color-paper)] [--notch-at:50%] before:bg-lantern focus-visible:outline-offset-[-6px] active:before:bg-lantern-dark"
      >
        <span className="justify-self-end font-semibold">{site.booking.label}</span>
        <span aria-hidden="true" className="h-4 w-px bg-paper/45" />
        <span className="text-fine">{site.booking.note}</span>
      </Link>
    </div>
  );
}
