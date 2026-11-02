import type { Metadata } from "next";
import Link from "next/link";
import { BookingCalendar } from "@/components/book/BookingCalendar";
import { VisitPiece } from "@/components/book/VisitPiece";
import { CutEdge } from "@/components/CutEdge";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a fitting",
  description:
    "Book a free measurement for a made-to-measure suit. We come to your home or office in Melbourne, and there's nothing to pay when you book.",
};

export default function BookPage() {
  const { note, terms, noObligation, depositNote } = site.booking;
  const measureStep = site.process[1];

  return (
    <div className="overflow-x-clip">
      <div aria-hidden="true" className="h-hem bg-navy lg:h-hem-lg" />
      <VisitPiece />

      <section aria-label="Pick a time" className="surface-chalk relative">
        <CutEdge shape="shoulderRight" fill="fill-paper" />

        <div className="mx-auto max-w-page px-gutter pb-[calc(var(--spacing-hem)+2.5rem)] lg:px-gutter-lg lg:pb-[calc(var(--spacing-hem-lg)+3rem)]">
          <div className="max-w-booker">
            <p className="max-w-prose">
              {note}. {terms} {measureStep.text} {noObligation}
            </p>

            <div className="mt-5 lg:mt-8">
              <BookingCalendar />
            </div>

            <p className="mt-3 max-w-prose text-small">
              {depositNote}{" "}
              <Link href="/pricing" className="swap underline">
                See prices
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
