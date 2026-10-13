import type { Metadata } from "next";
import Link from "next/link";
import { BookingCalendar } from "@/components/book/BookingCalendar";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a fitting",
  description:
    "Book a free measurement for a made-to-measure suit. We come to your home or office in Melbourne, and there's nothing to pay when you book.",
};

export default function BookPage() {
  const { event } = site.booking;

  const details = [
    { term: "Length", value: `${event.minutes} minutes` },
    { term: "Where", value: event.where },
    { term: "Cost", value: "Free. Nothing to pay when you book." },
    { term: "Travel", value: site.serviceArea.travelFee },
  ];

  return (
    <>
      <section className="mx-auto grid max-w-page gap-8 px-gutter pt-10 pb-14 lg:grid-cols-12 lg:px-gutter-lg lg:pt-section">
        <div className="lg:col-span-6">
          <p className="flex items-center gap-3 text-xs font-medium tracking-label uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-ochre" />
            We come to you · Melbourne
          </p>
          <h1 className="mt-5 text-5xl sm:text-6xl xl:text-7xl">Book a fitting</h1>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-lg">
            Measurement is free, and there&apos;s nothing to pay when you book. We come to your home
            or office, take your measurements and talk through the cut, lapels, buttons and lining.
          </p>
          <p className="mt-4 text-sm">
            There&apos;s no obligation to order. If you go ahead, a 40% deposit places your order
            once you&apos;ve chosen your fabric.{" "}
            <Link
              href="/pricing"
              className="underline decoration-ochre underline-offset-4 hover:text-navy"
            >
              See prices
            </Link>
            .
          </p>
        </div>
      </section>

      <section
        aria-labelledby="pick-a-time"
        className="mx-auto grid max-w-page gap-10 border-t border-timber/15 px-gutter py-14 lg:grid-cols-12 lg:gap-8 lg:px-gutter-lg lg:py-section"
      >
        <div className="lg:col-span-4">
          <h2 id="pick-a-time" className="text-3xl sm:text-4xl">
            {event.name}
          </h2>
          <dl className="mt-8 border-t border-timber/20">
            {details.map((item) => (
              <div
                key={item.term}
                className="grid grid-cols-[6rem_1fr] gap-4 border-b border-timber/20 py-4"
              >
                <dt className="text-xs font-medium tracking-label text-lantern uppercase">
                  {item.term}
                </dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-8">
          <BookingCalendar />
        </div>
      </section>
    </>
  );
}
