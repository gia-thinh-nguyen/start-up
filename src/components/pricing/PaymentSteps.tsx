import Link from "next/link";
import { site } from "@/content/site";

export function PaymentSteps() {
  const { orderTerms, refunds } = site.policies;
  const linkClass = "underline decoration-ochre underline-offset-4 hover:text-paper";

  return (
    <section
      aria-labelledby="how-you-pay"
      className="bg-navy text-paper [--color-focus:var(--color-ochre)]"
    >
      <div className="mx-auto grid max-w-page gap-12 px-gutter py-section lg:grid-cols-12 lg:gap-8 lg:px-gutter-lg">
        <div className="lg:col-span-4">
          <h2 id="how-you-pay" className="text-4xl text-paper sm:text-5xl">
            How you pay
          </h2>
          <p className="mt-6 text-paper/80">
            Nothing is due until you&apos;ve been measured and chosen your fabric.
          </p>
          <p className="mt-6 text-sm text-paper/80">
            The full details are in our{" "}
            <Link href={orderTerms.href} className={linkClass}>
              order terms
            </Link>{" "}
            and{" "}
            <Link href={refunds.href} className={linkClass}>
              refund policy
            </Link>
            .
          </p>
        </div>

        <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:col-span-7 lg:col-start-6">
          {site.payment.map((term, i) => (
            <li key={term.label} className="border-t border-paper/25 pt-5">
              <h3 className="font-sans text-xs font-medium tracking-label text-ochre uppercase">
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")} · </span>
                {term.label}
              </h3>
              <p className="mt-3 font-display text-2xl">{term.value}</p>
              <p className="mt-3 text-sm text-paper/80">{term.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
