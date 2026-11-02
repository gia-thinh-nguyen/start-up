import Link from "next/link";
import { priceAmount, splitFigure } from "@/components/figures";
import { WithTodos } from "@/components/Todo";
import { site } from "@/content/site";

export function PricesTeaser() {
  const [lead, ...others] = site.prices;

  return (
    <section
      aria-labelledby="prices"
      className="mx-auto grid max-w-page gap-x-8 gap-y-10 px-gutter py-section lg:grid-cols-12 lg:px-gutter-lg"
    >
      <div className="lg:col-span-4">
        <h2 id="prices" className="text-title">
          Prices
        </h2>
        <p className="mt-3">{site.priceNote}</p>
        <p className="mt-3">
          <Link href="/pricing" className="swap -mx-1 px-1 font-medium underline">
            See full prices
          </Link>
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 lg:col-span-8 lg:gap-x-8">
        <li className="col-span-2 lg:col-span-1 lg:row-span-2">
          <p className="font-medium">{lead.item} from</p>
          <p className="mt-0.5 font-display text-numeral">{priceAmount(lead)}</p>
        </li>
        {others.map((price) => (
          <li key={price.item}>
            {/* Two lines held on phones, so both numbers sit level whichever label wraps. */}
            <p className="flex min-h-[2lh] items-end font-medium md:min-h-0">{price.item} from</p>
            <p className="mt-0.5 font-display text-heading">{priceAmount(price)}</p>
            {price.unit && <p className="mt-1 text-small">{price.unit}</p>}
          </li>
        ))}
      </ul>

      <dl className="grid gap-8 md:grid-cols-3 lg:col-span-8 lg:col-start-5 lg:gap-x-8">
        {site.payment.map((term) => {
          const { figure, rest } = splitFigure(term.value);
          return (
            <div key={term.label}>
              <dt className="font-medium">{term.label}</dt>
              <dd className="mt-0.5">
                {figure && <span className="block font-display text-numeral">{figure}</span>}
                {rest && (
                  <span className={figure ? "mt-1 block" : "block pt-1 font-display text-subheading"}>
                    <WithTodos text={rest} />
                  </span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
