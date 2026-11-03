import { CutEdge } from "@/components/CutEdge";
import { WithTodos } from "@/components/Todo";
import { site, type Step } from "@/content/site";

const inSaigon = (step?: Step) => step?.title.includes("Saigon") ?? false;

/**
 * Cut into the piece's left edge with its point on the long seam, showing what's behind the piece.
 * Sits level with the middle of the step's number, below the row's top padding.
 */
function Notch({ fill }: { fill: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 16"
      preserveAspectRatio="none"
      className={`absolute top-[calc(1.5rem+var(--text-numeral)/2-0.5rem)] left-0 h-4 w-(--seam) lg:top-[calc(2rem+var(--text-numeral)/2-0.75rem)] lg:h-6 ${fill}`}
    >
      <path d="M0 0 10 8 0 16Z" />
    </svg>
  );
}

function StepRow({ step, number, follows }: { step: Step; number: number; follows?: Step }) {
  const saigon = inSaigon(step);
  const afterSaigon = inSaigon(follows);

  return (
    <li className={`relative ${saigon ? "surface-timber mt-hem lg:mt-hem-lg" : ""}`}>
      {saigon && <CutEdge shape="shoulderLeft" fill="fill-timber" />}
      {afterSaigon && <CutEdge shape="armhole" fill="fill-ochre" />}
      <Notch fill={saigon ? "fill-ochre" : "fill-navy"} />

      <div
        className={`relative mx-auto max-w-page px-gutter lg:px-gutter-lg ${saigon ? "pt-6 pb-[calc(var(--spacing-hem)+2rem)] lg:pt-8 lg:pb-[calc(var(--spacing-hem-lg)+2.5rem)]" : "py-6 lg:py-8"}`}
      >
        <div className="grid grid-cols-[3rem_1fr] gap-x-2 lg:grid-cols-12 lg:gap-x-8">
          <span aria-hidden="true" className="font-display text-numeral lg:col-span-1">
            {number}
          </span>
          <h3 className="self-center lg:col-span-5 lg:text-heading">{step.title}</h3>
          <p className="col-start-2 mt-1 max-w-measure lg:col-span-5 lg:col-start-7 lg:mt-0 lg:self-center lg:text-lede">
            {step.text}
          </p>
        </div>
      </div>
    </li>
  );
}

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="pt-section">
      <div className="mx-auto grid max-w-page gap-5 px-gutter pb-6 lg:grid-cols-12 lg:gap-8 lg:px-gutter-lg lg:pb-10">
        <h2 id="how-it-works" className="lg:col-span-6">
          From booking to final fitting
        </h2>
        <div className="max-w-measure lg:col-span-5 lg:col-start-7">
          <p className="font-display text-subheading">
            <WithTodos text={site.turnaroundWeeks} />
          </p>
          <p className="mt-1.5 text-small">from placing your order to your final fitting</p>
        </div>
      </div>

      <ol>
        {site.process.map((step, i) => (
          <StepRow key={step.title} step={step} number={i + 1} follows={site.process[i - 1]} />
        ))}
      </ol>
    </section>
  );
}
