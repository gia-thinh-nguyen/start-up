import type { Metadata } from "next";
import { BookVisit } from "@/components/BookVisit";
import { CutEdge } from "@/components/CutEdge";
import { PaymentLength } from "@/components/pricing/PaymentLength";
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
    <div className="overflow-x-clip">
      <section className="surface-table pb-[calc(var(--spacing-hem)+2.5rem)] lg:pb-[calc(var(--spacing-hem-lg)+3.5rem)]">
        <div className="mx-auto flex max-w-page items-end justify-between gap-6 px-gutter pt-2 pb-4 lg:px-gutter-lg lg:pt-6 lg:pb-8">
          <h1>Prices</h1>
          <p className="max-w-40 pb-1 text-right text-small md:max-w-none lg:pb-3 lg:text-body">
            {site.priceNote} {site.booking.note}.
          </p>
        </div>

        <PriceList />

        <p className="mx-auto mt-6 max-w-page px-gutter text-lede lg:mt-8 lg:px-gutter-lg">
          <span className="block max-w-measure lg:ml-[calc((100%+1.5rem)*5/12)]">
            These are starting prices. Your final price depends on the fabric and details you choose,
            and you&apos;ll know it before you pay anything.
          </span>
        </p>
      </section>

      <PaymentLength />
      <PricingFaq />

      <div className="surface-card relative pt-6 lg:pt-10">
        <CutEdge shape="armhole" fill="fill-ochre" />
        <BookVisit />
      </div>
    </div>
  );
}
