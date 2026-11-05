import { CutEdge } from "@/components/CutEdge";
import { priceAmount } from "@/components/figures";
import { ItemNotch } from "@/components/ItemNotch";
import { WithTodos } from "@/components/Todo";
import { site } from "@/content/site";

/**
 * The long seam is chalk, so on this chalk piece it is redrawn in navy, above it. It starts where the
 * neck edge meets the seam and stops where the Saigon piece's shoulder edge covers it.
 */
function NavySeam() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[calc(var(--spacing-hem)*-0.28)] bottom-[calc(var(--spacing-hem)*0.32)] z-10 lg:top-[calc(var(--spacing-hem-lg)*-0.28)] lg:bottom-[calc(var(--spacing-hem-lg)*0.32)]"
    >
      <svg className="seam-draws absolute left-[calc(var(--seam)-1.5px)] h-full w-[3px]">
        <line className="seam stroke-navy" x1="1.5" y1="0" x2="1.5" y2="100%" />
      </svg>
    </div>
  );
}

/**
 * What the $410 buys and how long it takes. Set on chalk so this reading block
 * stands apart from the ochre stops above it. Its bottom padding leaves room for the Saigon piece's edge.
 */
export function Included() {
  const suits = site.prices[0];

  return (
    <section aria-labelledby="included" className="surface-chalk relative">
      <CutEdge shape="neck" fill="fill-paper" />
      <NavySeam />
      <div className="mx-auto grid max-w-page gap-y-10 px-gutter pt-8 pb-[calc(var(--spacing-section)+var(--spacing-hem))] lg:grid-cols-12 lg:gap-x-8 lg:px-gutter-lg lg:pt-12 lg:pb-[calc(var(--spacing-section)+var(--spacing-hem-lg))]">
        <div className="lg:col-span-5">
          {/* Names the price, so the list reads as what that price buys. "From" because fabric changes it. */}
          <h2 id="included">Every suit from {priceAmount(suits)} includes</h2>
          <p className="mt-4 max-w-measure text-lede">{site.booking.beforeYouPay}</p>
        </div>

        <ul className="grid gap-4 text-lede lg:col-span-6 lg:col-start-7">
          {suits.includes.map((item) => (
            <li key={item} className="flex gap-3">
              <ItemNotch />
              {item}
            </li>
          ))}
        </ul>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3>How long it takes</h3>
          <p className="mt-2 max-w-measure">
            <WithTodos text={site.turnaroundWeeks} /> from placing your order to your final fitting.
          </p>
        </div>
      </div>
    </section>
  );
}
