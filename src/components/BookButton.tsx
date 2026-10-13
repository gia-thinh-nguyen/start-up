import Link from "next/link";
import { site } from "@/content/site";

const sizes = {
  sm: "px-5 py-2.5",
  lg: "px-7 py-4 text-lg",
};

export function BookButton({ size = "sm" }: { size?: keyof typeof sizes }) {
  return (
    <Link
      href={site.booking.href}
      className={`inline-block bg-lantern font-medium text-paper transition-colors hover:bg-lantern-dark ${sizes[size]}`}
    >
      {site.booking.label}
    </Link>
  );
}
