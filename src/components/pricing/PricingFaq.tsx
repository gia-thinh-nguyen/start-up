import { CutEdge } from "@/components/CutEdge";
import { WithTodos } from "@/components/Todo";
import { site } from "@/content/site";

/** Plain text on chalk, all open, so nothing is hidden and every [TODO] shows. */
export function PricingFaq() {
  return (
    <section aria-labelledby="questions" className="surface-chalk relative">
      <CutEdge shape="shoulderRight" fill="fill-paper" />

      <div className="mx-auto grid max-w-page gap-x-8 gap-y-8 px-gutter pt-8 pb-[calc(var(--spacing-section)+var(--spacing-hem))] lg:grid-cols-12 lg:px-gutter-lg lg:pt-12 lg:pb-[calc(var(--spacing-section)+var(--spacing-hem-lg))]">
        <h2 id="questions" className="lg:col-span-5">
          Common questions
        </h2>

        <div className="max-w-prose space-y-8 lg:col-span-6 lg:col-start-7">
          {site.faq.map((item) => (
            <div key={item.question}>
              <h3>{item.question}</h3>
              <p className="mt-2">
                <WithTodos text={item.answer} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
