import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { CutEdge } from "@/components/CutEdge";
import { PaymentScale, TermValue } from "@/components/PaymentScale";
import { WithTodos } from "@/components/Todo";
import { site } from "@/content/site";

/** The measurement costs nothing, so it takes up no length and sits above the line. */
export function PaymentLength() {
  const [measurement] = site.payment;
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

        <div className="mt-12 lg:mt-16">
          <PaymentScale on="card" />
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
