import type { Metadata } from "next";
import { BookingCalendar } from "@/components/book/BookingCalendar";
import { VisitPiece } from "@/components/book/VisitPiece";
import { CutEdge } from "@/components/CutEdge";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a fitting",
  description: `Book a free measurement for a made-to-measure suit, made in Saigon. We come to your home or office in Melbourne. ${site.serviceArea.travelFee}`,
};

export default function BookPage() {
  return (
    <div className="overflow-x-clip">
      <div aria-hidden="true" className="h-hem bg-navy lg:h-hem-lg" />
      <VisitPiece />

      <section aria-labelledby="pick-a-time" className="surface-chalk relative">
        <CutEdge shape="shoulderRight" fill="fill-paper" />

        <div className="mx-auto max-w-page px-gutter pb-[calc(var(--spacing-hem)+2.5rem)] lg:px-gutter-lg lg:pb-[calc(var(--spacing-hem-lg)+3rem)]">
          <h2 id="pick-a-time" className="text-subheading md:mx-auto md:max-w-booker-sm lg:max-w-booker">
            Pick a time
          </h2>
          <div className="mt-3 lg:mt-4">
            <BookingCalendar />
          </div>
        </div>
      </section>
    </div>
  );
}
