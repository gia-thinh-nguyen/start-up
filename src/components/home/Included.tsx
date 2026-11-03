import { WithTodos } from "@/components/Todo";
import { site } from "@/content/site";

/** A small notch cut toward the text, marking each item like a notch on a pattern edge. */
function ItemNotch() {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 16" className="mt-[0.35em] h-4 w-2.5 shrink-0 fill-navy">
      <path d="M0 0 10 8 0 16Z" />
    </svg>
  );
}

/** What the $410 buys, what it's made from, and how long it takes. */
export function Included() {
  const suits = site.prices[0];

  return (
    <section aria-labelledby="included" className="pt-section">
      <div className="mx-auto grid max-w-page gap-y-10 px-gutter lg:grid-cols-12 lg:gap-x-8 lg:px-gutter-lg">
        <div className="lg:col-span-5">
          <h2 id="included">What a suit includes</h2>
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

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          <div>
            <h3>Fabric</h3>
            <p className="mt-2 max-w-measure">
              <WithTodos text={site.fabric} />
            </p>
          </div>
          <div>
            <h3>How long it takes</h3>
            <p className="mt-2 max-w-measure">
              <WithTodos text={site.turnaroundWeeks} /> from placing your order to your final fitting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
