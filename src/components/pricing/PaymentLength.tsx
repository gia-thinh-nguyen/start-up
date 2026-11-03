import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { CutEdge } from "@/components/CutEdge";
import { splitFigure } from "@/components/figures";
import { WithTodos } from "@/components/Todo";
import { site, type PaymentTerm } from "@/content/site";

/** The term's figure, if it has one, in numerals. Wordier values stay at heading size. */
function TermValue({ term }: { term: PaymentTerm }) {
  const { figure, rest } = splitFigure(term.value);

  return (
    <>
      {figure && <span className="block font-display text-numeral">{figure}</span>}
      {rest && (
        <span className={figure ? "mt-1 block font-medium" : "block font-display text-subheading"}>
          {rest}
        </span>
      )}
      <span className="mt-3 block max-w-measure">
        <WithTodos text={term.detail} />
      </span>
    </>
  );
}

const onLength = "flex h-(--length) items-center pl-3.5 font-medium text-paper lg:pl-5";

/**
 * Everything you pay, as one length drawn to scale. The columns are exactly 40 and 60 parts, so the
 * notch and the balance's text start where the deposit ends. The measurement costs nothing, so it
 * takes up no length and sits above the line.
 */
export function PaymentLength() {
  const [measurement, deposit, balance] = site.payment;
  const { orderTerms, refunds } = site.policies;

  return (
    <section aria-labelledby="how-you-pay" className="surface-card relative">
      <CutEdge shape="neck" fill="fill-ochre" />

      <div className="mx-auto max-w-page px-gutter pt-6 pb-section lg:px-gutter-lg lg:pt-10">
        <div className="grid gap-y-8 md:grid-cols-[2fr_3fr]">
          <h2 id="how-you-pay" className="text-title">
            How you pay
          </h2>

          <dl>
            <dt className="font-medium">{measurement.label}</dt>
            <dd className="mt-0.5">
              <TermValue term={measurement} />
              <span className="mt-2 block max-w-measure">
                <WithTodos text={site.serviceArea.travelFee} />
              </span>
              <span className="mt-5 hidden md:block">
                <BookButton size="lg" />
              </span>
            </dd>
          </dl>
        </div>

        <div className="relative mt-12 [--length:3.5rem] lg:mt-16 lg:[--length:4.5rem]">
          <div
            aria-hidden="true"
            className="notched absolute inset-x-0 top-0 h-(--length) [--notch-at:40%] [--notch-depth:0.875rem] [--notch-half:0.625rem] before:bg-navy"
          />
          <dl className="relative grid grid-cols-[2fr_3fr]">
            <dt className={`${onLength} col-start-1 row-start-1`}>{deposit.label}</dt>
            <dd className="col-span-2 row-start-2 mt-6 md:col-span-1 md:pr-8">
              <TermValue term={deposit} />
            </dd>
            <dt className={`${onLength} col-start-2 row-start-1`}>{balance.label}</dt>
            <dd className="col-start-2 row-start-3 mt-6 md:row-start-2">
              <TermValue term={balance} />
            </dd>
          </dl>
        </div>

        <p className="mt-10 max-w-measure text-small">
          The full details are in our{" "}
          <Link href={orderTerms.href} className="swap underline">
            order terms
          </Link>{" "}
          and{" "}
          <Link href={refunds.href} className="swap underline">
            refund policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
