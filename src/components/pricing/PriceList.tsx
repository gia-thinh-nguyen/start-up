import { PricePiece } from "@/components/pricing/PricePiece";
import { site } from "@/content/site";

/** The pieces hang on the navy table from one chalk rail. */
export function PriceList() {
  return (
    <div className="relative pt-12">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-paper" />
      <ul className="mx-auto grid max-w-page grid-cols-11 items-start gap-x-2 gap-y-3 px-gutter lg:grid-cols-12 lg:gap-x-6 lg:px-gutter-lg">
        {site.prices.map((price, index) => (
          <PricePiece key={price.item} price={price} index={index} />
        ))}
      </ul>
    </div>
  );
}
