import type { Metadata } from "next";
import { BookButton } from "@/components/BookButton";
import { PaymentSteps } from "@/components/pricing/PaymentSteps";
import { PriceList } from "@/components/pricing/PriceList";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Prices for made-to-measure suits, shirts and wedding packages, made in Saigon and fitted in Melbourne. Measurement is free.",
};

export default function PricingPage() {
  return (
    <>
      <section className="mx-auto grid max-w-page gap-8 px-gutter pt-10 pb-14 lg:grid-cols-12 lg:px-gutter-lg lg:pt-section">
        <div className="lg:col-span-6">
          <p className="flex items-center gap-3 text-xs font-medium tracking-label uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-ochre" />
            Made in Saigon · Fitted in Melbourne
          </p>
          <h1 className="mt-5 text-5xl sm:text-6xl xl:text-7xl">Prices</h1>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-lg">
            These are starting prices. Your final price depends on the fabric and details you
            choose, and you&apos;ll know it before you pay anything.
          </p>
          <p className="mt-4 text-sm">
            {site.priceNote} {site.booking.note}.
          </p>
        </div>
      </section>

      <PriceList />
      <PaymentSteps />
      <PricingFaq />

      <section className="border-t border-timber/15">
        <div className="mx-auto flex max-w-page flex-col items-start gap-8 px-gutter py-section lg:flex-row lg:items-center lg:justify-between lg:px-gutter-lg">
          <p className="max-w-xl font-display text-3xl text-navy sm:text-4xl">
            Start with a free measurement in Melbourne.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <BookButton size="lg" />
            <p className="text-sm">{site.booking.note}</p>
          </div>
        </div>
      </section>
    </>
  );
}
