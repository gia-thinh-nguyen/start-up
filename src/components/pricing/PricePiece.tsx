import { priceAmount } from "@/components/figures";
import { Grainline } from "@/components/PatternMarks";
import { WithTodos } from "@/components/Todo";
import type { Price } from "@/content/site";

/**
 * Each piece's outline, drawn at the same height so every price sits level. The top edge is 100 by
 * 56 and the hem 100 by 32, both stretched to the piece's width. Each piece hangs from the hole where
 * its top edge rises highest. On phones an earlier piece sits in front of a later one's cord.
 */
const pieces = [
  {
    // A jacket front: neck curve, shoulder slope with a notch, then the armhole.
    top: "M0 34C8 33 16 24 20 3L60 12.4 63 22 66 13.8 84 18C87 32 93 42 100 46V56H0Z",
    seam: "M0 46C10 45 20 36 24 15L84 30C87 42 93 50 100 54",
    hem: "M0 0H100V12C70 30 34 30 0 18Z",
    hanger: "left-[34%] [--hole-y:0.6]",
    placed: "z-30 col-span-full -mr-gutter lg:col-span-5 lg:mr-0",
    body: "md:grid md:grid-cols-2 md:items-end md:gap-x-8 md:[&>ul]:mt-0 lg:block lg:[&>ul]:mt-6",
    label: "",
    grainline: true,
  },
  {
    // A shirt yoke: a shallow scoop for the collar between two shoulders.
    top: "M0 22 22 6C34 20 66 20 78 6L100 22V56H0Z",
    seam: "M0 34 21 18C34 32 66 32 79 18L100 34",
    hem: "M0 0H100V8C84 30 40 34 0 12Z",
    hanger: "left-1/2 [--hole-y:0.71]",
    placed: "z-20 col-span-5 lg:col-span-3",
    body: "",
    label: "min-h-[2lh] md:min-h-0",
    grainline: false,
  },
  {
    // A back panel, turned the other way: the shoulder rises to a neck at the right.
    top: "M0 30 28 20.4 31 28 34 18.3 70 6C74 18 86 28 100 28V56H0Z",
    seam: "M0 42 69 18C73 30 86 40 100 40",
    hem: "M0 0H100V26L0 8Z",
    hanger: "left-[62%] [--hole-y:0.64]",
    placed:
      "z-10 col-span-6 -mr-gutter lg:col-span-4 lg:-mr-[calc(var(--page-edge)+var(--spacing-gutter-lg))]",
    body: "",
    label: "min-h-[2lh] md:min-h-0",
    grainline: false,
  },
];

/** The punched hole, showing the table through it, and the cord up to the rail or the piece above. */
function Hanger({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -top-12 h-[calc(3rem+var(--zone)*var(--hole-y))] w-0.5 -translate-x-1/2 bg-paper ${className}`}
    >
      <svg viewBox="0 0 22 22" className="absolute top-full left-1/2 size-5.5 -translate-1/2">
        <circle cx="11" cy="11" r="9" className="fill-navy stroke-paper stroke-[2.25]" />
      </svg>
    </div>
  );
}

/**
 * Tabular figures built by hand: each digit sits in a cell of the same width, so prices line up down
 * and across. Besley's own tabular-nums draws a visibly lighter zero, which would spoil $890.
 */
function PriceFigure({ amount }: { amount: string }) {
  return (
    <>
      <span className="sr-only">{amount}</span>
      <span aria-hidden="true" className="whitespace-nowrap">
        {[...amount].map((char, i) =>
          /\d/.test(char) ? (
            <span key={i} className="inline-block w-[0.62em] text-center">
              {char}
            </span>
          ) : (
            char
          ),
        )}
      </span>
    </>
  );
}

export function PricePiece({ price, index }: { price: Price; index: number }) {
  const piece = pieces[index % pieces.length];

  return (
    <li className={`relative [--zone:3.5rem] lg:[--zone:5rem] ${piece.placed}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 56"
        preserveAspectRatio="none"
        className="-mb-px block h-(--zone) w-full overflow-visible fill-ochre"
      >
        <path d={piece.top} />
        <path className="seam" d={piece.seam} />
      </svg>

      <div className={`surface-card relative px-3.5 lg:px-7 ${piece.body}`}>
        <div>
          <div className={`flex items-end text-subheading ${piece.label}`}>
            <div>
              <h2 className="inline text-subheading">{price.item}</h2>{" "}
              <span className="font-sans text-body font-normal">from</span>
            </div>
          </div>
          <p className="mt-0.5 font-display text-price lg:text-price-lg">
            <PriceFigure amount={priceAmount(price)} />
          </p>
          {price.unit && <p className="mt-1 text-small">{price.unit}</p>}
        </div>

        <ul
          aria-label={`${price.item}: what you get`}
          className="mt-4 space-y-2 text-small hyphens-auto lg:mt-6 lg:text-body"
        >
          {price.includes.map((point) => (
            <li key={point}>
              <WithTodos text={point} />
            </li>
          ))}
        </ul>
      </div>

      <Hanger className={piece.hanger} />
      {piece.grainline && (
        <Grainline className="absolute top-9 left-[62%] max-h-24 md:hidden lg:top-12 lg:block lg:max-h-none" />
      )}

      <svg
        aria-hidden="true"
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        className="-mt-px block h-8 w-full fill-ochre lg:h-12"
      >
        <path d={piece.hem} />
      </svg>
    </li>
  );
}
