import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { site } from "@/content/site";
import { formatFromPrice } from "@/lib/price";

export function PricesTeaser() {
  const { payment } = site;
  const terms = [
    { label: "Measurement", value: payment.measurement },
    { label: "Deposit", value: payment.deposit },
    { label: "Balance", value: payment.balance },
  ];

  return (
    <section
      aria-labelledby="prices"
      className="mx-auto grid max-w-page gap-12 px-gutter py-section lg:grid-cols-12 lg:gap-8 lg:px-gutter-lg"
    >
      <div className="lg:col-span-5">
        <h2 id="prices" className="text-4xl sm:text-5xl">
          Prices
        </h2>
        <p className="mt-6 max-w-sm">All prices are in AUD and include GST.</p>
        <dl className="mt-8 space-y-3 text-sm">
          {terms.map((term) => (
            <div key={term.label} className="grid grid-cols-[7rem_1fr] gap-4">
              <dt className="font-medium">{term.label}</dt>
              <dd>{term.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <ul className="border-t border-timber/20">
          {site.prices.map((price) => (
            <li
              key={price.item}
              className="flex items-baseline justify-between gap-4 border-b border-timber/20 py-5"
            >
              <span className="font-display text-2xl text-navy">{price.item}</span>
              <span className="text-right">{formatFromPrice(price.fromAud)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <BookButton size="lg" />
          <Link
            href="/pricing"
            className="underline decoration-ochre decoration-2 underline-offset-4 hover:decoration-lantern"
          >
            See full prices
          </Link>
        </div>
      </div>
    </section>
  );
}
