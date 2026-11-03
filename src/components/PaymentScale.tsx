import { splitFigure } from "@/components/figures";
import { WithTodos } from "@/components/Todo";
import { site, type PaymentTerm } from "@/content/site";

/**
 * The term's figure, if it has one, in numerals. Wordier values stay at heading size. Compact is for
 * a block where something else leads, and leaves out the term's detail.
 */
export function TermValue({ term, compact = false }: { term: PaymentTerm; compact?: boolean }) {
  const { figure, rest } = splitFigure(term.value);

  return (
    <>
      {figure && (
        <span className={`block font-display ${compact ? "text-heading" : "text-numeral"}`}>{figure}</span>
      )}
      {rest && (
        <span className={figure ? "mt-1 block font-medium" : "block font-display text-subheading"}>
          {rest}
        </span>
      )}
      {!compact && (
        <span className="mt-3 block max-w-measure">
          <WithTodos text={term.detail} />
        </span>
      )}
    </>
  );
}

const surfaces = {
  card: { deposit: "bg-navy text-paper", balance: "bg-paper text-navy", notch: "fill-ochre" },
  table: { deposit: "bg-ochre text-navy", balance: "bg-paper text-navy", notch: "fill-navy" },
};

const onLength = "flex h-(--length) items-center pl-3.5 font-medium lg:pl-5";

/**
 * Everything you pay after the free measurement, as one length drawn to scale. The columns are
 * exactly 40 and 60 parts, so the notch and the balance start where the deposit ends. On phones each
 * part drops to its own row, still at its true length and place, so its text stays under its label.
 */
export function PaymentScale({ on, compact = false }: { on: keyof typeof surfaces; compact?: boolean }) {
  const [, deposit, balance] = site.payment;
  const colours = surfaces[on];

  return (
    <dl className="relative grid grid-cols-[2fr_3fr] [--length:3.5rem] lg:[--length:4.5rem]">
      <dt className={`${onLength} ${colours.deposit} col-start-1 row-start-1`}>{deposit.label}</dt>
      <dd className="col-span-2 row-start-2 mt-4 md:col-span-1 md:mt-6 md:pr-8">
        <TermValue term={deposit} compact={compact} />
      </dd>
      <dt className={`${onLength} ${colours.balance} col-start-2 row-start-3 mt-8 md:row-start-1 md:mt-0`}>
        {balance.label}
      </dt>
      <dd className="col-start-2 row-start-4 mt-4 md:row-start-2 md:mt-6">
        <TermValue term={balance} compact={compact} />
      </dd>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 14"
        className={`absolute top-0 left-[40%] hidden h-3.5 w-5 -translate-x-1/2 md:block ${colours.notch}`}
      >
        <path d="M0 0H20L10 14Z" />
      </svg>
    </dl>
  );
}
