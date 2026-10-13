import { site } from "@/content/site";

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works"
      className="mx-auto grid max-w-page gap-12 px-gutter py-section lg:grid-cols-12 lg:gap-8 lg:px-gutter-lg"
    >
      <div className="lg:sticky lg:top-8 lg:col-span-4 lg:self-start">
        <h2 id="how-it-works" className="text-4xl sm:text-5xl">
          How it works
        </h2>
        <p className="mt-8 font-display text-3xl text-navy">{site.turnaroundWeeks}</p>
        <p className="mt-2 text-sm">from placing your order to your final fitting</p>
      </div>

      <ol className="border-t border-timber/20 lg:col-span-7 lg:col-start-6">
        {site.process.map((step, i) => (
          <li
            key={step.title}
            className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-timber/20 py-6 sm:grid-cols-[4rem_1fr] sm:py-8"
          >
            <span aria-hidden="true" className="font-display text-2xl text-lantern">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-2xl">{step.title}</h3>
              <p className="mt-2 max-w-prose">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
