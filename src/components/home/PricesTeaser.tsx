import Link from "next/link";
import { CutEdge } from "@/components/CutEdge";
import { priceAmount } from "@/components/figures";
import { PaymentScale, TermValue } from "@/components/PaymentScale";
import { site } from "@/content/site";

/**
 * The one piece of home that shows the table, so the prices stand apart from the card around them.
 * It follows the timber Saigon piece directly, and its edge rises over that.
 */
export function PricesTeaser() {
  const [lead, ...others] = site.prices;
  const [measurement] = site.payment;

  return (
    <section aria-labelledby="prices" className="surface-table relative">
      <CutEdge shape="shoulderLeft" fill="fill-navy" />

      <div className="mx-auto grid max-w-page gap-x-8 gap-y-10 px-gutter pt-6 pb-[calc(var(--spacing-hem)+3rem)] lg:grid-cols-12 lg:px-gutter-lg lg:pt-10 lg:pb-[calc(var(--spacing-hem-lg)+4rem)]">
        <div className="lg:col-span-4">
          <h2 id="prices" className="text-title">
            Prices
          </h2>
          <p className="mt-3">{site.priceNote}</p>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 lg:col-span-8 lg:gap-x-8">
          <li className="col-span-2 lg:col-span-1 lg:row-span-2">
            <p className="font-medium">{lead.item} from</p>
            <p className="mt-0.5 font-display text-numeral">{priceAmount(lead)}</p>
            {lead.unit && <p className="mt-1 text-small">{lead.unit}</p>}
          </li>
          {others.map((price) => (
            <li key={price.item}>
              {/* Two lines held on phones, so both numbers sit level whichever label wraps. */}
              <p className="flex min-h-[2lh] items-end font-medium md:min-h-0">
                {price.item}
                {!price.instead && " from"}
              </p>
              {price.instead ? (
                <p className="mt-1.5">
                  <Link href={price.instead.href} className="swap -mx-1 px-1 font-medium underline">
                    {price.instead.label}
                  </Link>
                </p>
              ) : (
                <p className="mt-0.5 font-display text-heading">{priceAmount(price)}</p>
              )}
              {price.unit && <p className="mt-1 text-small">{price.unit}</p>}
            </li>
          ))}
        </ul>

        <div className="lg:col-span-8 lg:col-start-5">
          <dl className="mb-8">
            <dt className="font-medium">{measurement.label}</dt>
            <dd className="mt-0.5">
              <TermValue term={measurement} compact />
            </dd>
          </dl>
          <PaymentScale on="table" compact />
          <p className="mt-8">
            <Link href="/pricing" className="swap -mx-1 px-1 font-medium underline">
              See full prices
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
