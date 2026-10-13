import { site } from "@/content/site";
import { formatFromPrice } from "@/lib/price";

export function PriceList() {
  return (
    <ul className="mx-auto max-w-page px-gutter lg:px-gutter-lg">
      {site.prices.map((price) => (
        <li
          key={price.item}
          className="grid gap-6 border-t border-timber/20 py-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:py-14"
        >
          <h2 className="text-4xl sm:col-span-2 lg:col-span-5 lg:text-5xl">{price.item}</h2>

          <div className="lg:col-span-3">
            <p className="font-display text-3xl text-lantern">{formatFromPrice(price.fromAud)}</p>
            {price.unit && <p className="mt-1 text-sm">{price.unit}</p>}
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-sans text-xs font-medium tracking-label text-timber uppercase">
              Includes
            </h3>
            <ul className="mt-3 space-y-2">
              {price.includes.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-ochre" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
