import { BookButton } from "@/components/BookButton";
import { PunchedHole } from "@/components/PatternMarks";
import { site } from "@/content/site";

/** Where a page closes, on card. The footer's edge rises over its bottom, so it leaves room for that. */
export function BookVisit() {
  const { event, terms } = site.booking;

  return (
    <section
      aria-labelledby="book-visit"
      className="mx-auto grid max-w-page gap-x-8 gap-y-6 px-gutter pt-4 pb-[calc(var(--spacing-section)+var(--spacing-hem))] lg:grid-cols-12 lg:px-gutter-lg lg:pb-[calc(var(--spacing-section)+var(--spacing-hem-lg))]"
    >
      <div className="lg:col-span-6">
        <PunchedHole className="mb-4" />
        <h2 id="book-visit" className="text-title">
          Book your free measurement
        </h2>
      </div>

      <div className="lg:col-span-6 lg:col-start-7 lg:self-end">
        <p className="font-display text-numeral">{event.minutes} minutes</p>
        <p className="mt-2 mb-6 max-w-prose text-lede">
          {event.where}. {terms}
        </p>
        <BookButton size="lg" />
      </div>
    </section>
  );
}
