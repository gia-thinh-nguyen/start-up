import { site } from "@/content/site";

/** Native <details> rows: keyboard and screen-reader friendly with no JavaScript. */
export function PricingFaq() {
  return (
    <section
      aria-labelledby="questions"
      className="mx-auto grid max-w-page gap-10 px-gutter py-section lg:grid-cols-12 lg:gap-8 lg:px-gutter-lg"
    >
      <h2 id="questions" className="text-4xl sm:text-5xl lg:col-span-4">
        Common questions
      </h2>

      <div className="border-t border-timber/20 lg:col-span-7 lg:col-start-6">
        {site.faq.map((item) => (
          <details key={item.question} className="group border-b border-timber/20">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 font-display text-2xl text-navy [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="font-sans text-2xl leading-none text-lantern transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-prose pb-6">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
