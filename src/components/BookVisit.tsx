import { BookButton } from "@/components/BookButton";
import { CutEdge } from "@/components/CutEdge";
import { PunchedHole } from "@/components/PatternMarks";
import { WithTodos } from "@/components/Todo";
import { site } from "@/content/site";

/** Where a page closes, on card. The footer's edge rises over its bottom, so it leaves room for that. */
export function BookVisit() {
  const { event, noObligation } = site.booking;
  const { serviceArea } = site;

  return (
    <div className="surface-card relative pt-6 lg:pt-10">
      <CutEdge shape="armhole" fill="fill-ochre" />

      <section
        aria-labelledby="book-visit"
        className="mx-auto grid max-w-page gap-x-8 gap-y-6 px-gutter pt-4 pb-[calc(var(--spacing-section)+var(--spacing-hem))] lg:grid-cols-12 lg:px-gutter-lg lg:pb-[calc(var(--spacing-section)+var(--spacing-hem-lg))]"
      >
        <div className="lg:col-span-5">
          <PunchedHole className="mb-4" />
          <h2 id="book-visit">Book your free measurement</h2>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:self-end">
          <p className="font-display text-numeral">{event.minutes} minutes</p>
          <p className="mt-2 max-w-measure text-lede">
            {event.where}. {noObligation}
          </p>
          {/* The travel line names the area too, so the summary would only repeat "home or office" and Keysborough. */}
          <p className="mt-2 mb-6 max-w-measure">
            <WithTodos text={serviceArea.travelFee} />
          </p>
          <BookButton size="lg" />
        </div>
      </section>
    </div>
  );
}
