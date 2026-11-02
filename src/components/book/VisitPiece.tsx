import { CollarNotch, CutEdge } from "@/components/CutEdge";
import { WithTodos } from "@/components/Todo";
import { site } from "@/content/site";

/** The short piece of card above the calendar: what the visit is and that it's free. */
export function VisitPiece() {
  const { event, terms } = site.booking;

  return (
    <section aria-labelledby="book-title" className="surface-card relative">
      <CutEdge shape="collar" fill="fill-ochre" />
      <CollarNotch />

      <div className="mx-auto max-w-page px-gutter pt-2 pb-[calc(var(--spacing-hem)+0.5rem)] lg:px-gutter-lg lg:pb-[calc(var(--spacing-hem-lg)+1rem)] xl:flex xl:items-start xl:justify-between xl:gap-8">
        <div>
          <h1 id="book-title">{site.booking.label}</h1>
          <h2 className="mt-1 text-subheading lg:mt-3">{event.name}</h2>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 md:grid-cols-[auto_auto] md:justify-start md:gap-x-8 xl:mt-0">
          <div className="row-start-1 font-display">
            <dt className="sr-only">Length</dt>
            <dd className="flex items-baseline gap-1.5 lg:gap-3">
              <span className="text-numeral">{event.minutes}</span>
              <span className="text-subheading lg:text-heading">minutes</span>
            </dd>
          </div>

          <div className="row-start-2 mt-1.5 text-small md:text-body">
            <dt className="sr-only">Where</dt>
            <dd>{event.where}</dd>
          </div>

          <div className="row-span-2 row-start-1 grid grid-rows-subgrid">
            <dt className="sr-only">Cost</dt>
            <dd className="font-display text-numeral">Free</dd>
            <dd className="mt-1.5 text-small md:text-body">{terms}</dd>
          </div>

          <div className="col-span-2 mt-3 text-small md:text-body lg:mt-5">
            <dt className="inline font-semibold">Travel </dt>
            <dd className="inline">
              <WithTodos text={site.serviceArea.travelFee} />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
