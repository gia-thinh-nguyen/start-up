import Link from "next/link";
import { site } from "@/content/site";

const sizes = {
  sm: "px-5 py-2.5 text-small",
  lg: "px-7 py-4 text-lede",
};

export function BookButton({ size = "sm" }: { size?: keyof typeof sizes }) {
  return (
    <Link
      href={site.booking.href}
      className={`notched inline-block font-semibold text-paper before:bg-lantern hover:before:bg-lantern-dark active:before:bg-lantern-dark ${sizes[size]}`}
    >
      {site.booking.label}
    </Link>
  );
}
