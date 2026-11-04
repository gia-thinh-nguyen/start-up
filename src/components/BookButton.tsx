import Link from "next/link";
import { site } from "@/content/site";

const sizes = {
  sm: "px-5 py-2.5 text-small",
  lg: "px-7 py-4 text-lede",
};

/** The lantern booking button. It goes to /book unless it's given another step of booking, such as paying. */
export function BookButton({
  size = "sm",
  href = site.booking.href,
  label = site.booking.label,
}: {
  size?: keyof typeof sizes;
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className={`notched inline-block font-semibold text-paper before:bg-lantern hover:before:bg-lantern-dark active:before:bg-lantern-dark ${sizes[size]}`}
    >
      {label}
    </Link>
  );
}
