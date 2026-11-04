import { CollarNotch, CutEdge } from "@/components/CutEdge";
import { WithTodos } from "@/components/Todo";
import { site } from "@/content/site";

/** The short piece of card above the calendar: what the visit is and that it's free. */
export function VisitPiece() {
  const { event, noObligation } = site.booking;
  const [measurement] = site.payment;

  return (
    <section aria-labelledby="book-title" className="surface-card relative">
      <CutEdge shape="collar" fill="fill-ochre" />
      <CollarNotch />

      <div className="mx-auto max-w-page px-gutter pt-2 pb-[calc(var(--spacing-hem)+0.5rem)] lg:px-gutter-lg lg:pb-[calc(var(--spacing-hem-lg)+1rem)] xl:flex xl:items-start xl:justify-between xl:gap-8">
        <div className="xl:shrink-0">
          <h1 id="book-title">{site.booking.label}</h1>
          <p className="mt-1 font-display text-subheading lg:mt-3">{event.name}</p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 md:grid-cols-[auto_auto] md:justify-start md:gap-x-8 xl:mt-0">
          <div>
            <dt className="text-small font-medium md:text-body">Length</dt>
            <dd className="flex items-baseline gap-x-1.5 font-display whitespace-nowrap lg:gap-x-3">
              <span className="text-numeral">{event.minutes}</span>
              <span className="text-subheading lg:text-heading">minutes</span>
            </dd>
            <dd className="mt-1.5 text-small md:text-body">{event.where}</dd>
          </div>

          <div>
            <dt className="text-small font-medium md:text-body">{measurement.label}</dt>
            <dd className="font-display text-numeral">{measurement.value}</dd>
            <dd className="mt-1.5 text-small md:text-body">{noObligation}</dd>
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
