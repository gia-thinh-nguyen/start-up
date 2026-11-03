import type { Metadata } from "next";
import Link from "next/link";
import { BookingCalendar } from "@/components/book/BookingCalendar";
import { VisitPiece } from "@/components/book/VisitPiece";
import { CutEdge } from "@/components/CutEdge";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a fitting",
  description:
    "Book a free measurement for a made-to-measure suit, made in Saigon. We come to your home or office in Melbourne, and there's nothing to pay when you book.",
};

export default function BookPage() {
  const { noObligation, depositNote } = site.booking;

  return (
    <div className="overflow-x-clip">
      <div aria-hidden="true" className="h-hem bg-navy lg:h-hem-lg" />
      <VisitPiece />

      <section aria-labelledby="pick-a-time" className="surface-chalk relative">
        <CutEdge shape="shoulderRight" fill="fill-paper" />

        <div className="mx-auto max-w-page px-gutter pb-[calc(var(--spacing-hem)+2.5rem)] lg:px-gutter-lg lg:pb-[calc(var(--spacing-hem-lg)+3rem)]">
          <div className="md:mx-auto md:flex md:max-w-booker-sm md:items-end md:justify-between md:gap-8 lg:max-w-booker">
            <h2 id="pick-a-time" className="text-subheading md:shrink-0">
              Pick a time
            </h2>
            <p className="mt-2 max-w-measure md:mt-0">
              {noObligation} {depositNote}{" "}
              <Link href="/pricing" className="swap underline">
                See prices
              </Link>
              .
            </p>
          </div>

          <div className="mt-3 lg:mt-4">
            <BookingCalendar />
          </div>
        </div>
      </section>
    </div>
  );
}
