import { BookButton } from "@/components/BookButton";
import { Grainline, PunchedHole } from "@/components/PatternMarks";
import { PhotoSlot } from "@/components/PhotoSlot";
import { priceAmount } from "@/components/home/priceAmount";
import { site } from "@/content/site";

/**
 * The card's top edge, cut out of the navy table, with its notch and seam. Drawn in real pixels from
 * the left of the page, never stretched, so a wider screen just shows more of the shoulder. The
 * seam's first point is where ChalkSeam takes over.
 */
function ShoulderEdge() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-page">
      <svg className="absolute top-0 left-0 size-px overflow-visible lg:hidden">
        <path
          className="fill-navy"
          d="M-2000 0H2000V407L104 2C84 40 40 62 0 66H-2000Z"
        />
        <path className="fill-navy" d="M240 30.4 254 33.4 245.2 45.5Z" />
        <path className="seam" d="M10 96C10 88 14 83 24 81 58 75 98 52 116 18L2000 417" />
      </svg>

      <svg className="absolute top-0 left-0 hidden size-px overflow-visible lg:block">
        <path
          className="fill-navy"
          d="M-2000 0H4000V332L232 12C190 78 90 114 0 118H-2000Z"
        />
        <path className="fill-navy" d="M860 65.4 880 67.1 868 86Z" />
        <path className="seam" d="M20 140C20 134 24 132 34 131 112 125 208 94 246 30L4000 349" />
      </svg>
    </div>
  );
}

/** Cut into the card's right edge, where it crosses the shoulder, showing the table behind. */
function Armhole() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 170 380"
      className="pointer-events-none absolute top-0 right-0 hidden h-auto w-[11.8vw] lg:block"
    >
      <path className="fill-navy" d="M170 30C150 110 46 170 32 262 26 318 88 372 170 380Z" />
    </svg>
  );
}

export function Hero() {
  const suits = site.prices[0];

  return (
    <section className="relative">
      <ShoulderEdge />
      <Armhole />

      <div className="relative mx-auto max-w-page px-gutter pt-22.5 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-gutter-lg lg:pt-38">
        {/* Wide enough on desktop for the two lines to break at the comma. */}
        <h1 className="max-w-[6.2em] text-display lg:col-span-11 lg:max-w-[10.6em]">{site.tagline}</h1>

        <div className="lg:col-span-4 lg:row-start-2 lg:mt-10">
          <p className="mt-3.5 max-w-[21.25rem] text-lede lg:mt-0">{site.intro}</p>
          <div className="mt-8 hidden md:block">
            <BookButton size="lg" />
          </div>
        </div>

        <div className="relative mt-3 -mr-gutter flex gap-1.5 tall:mt-6 lg:contents">
          <PunchedHole className="absolute top-1.5 left-1 hidden tall:block lg:static lg:col-start-9 lg:row-start-2 lg:mt-10 lg:block" />
          <Grainline className="absolute top-2 left-30 hidden tall:block lg:static lg:col-start-8 lg:row-start-2 lg:mt-10 lg:block lg:h-48 lg:w-auto lg:justify-self-end" />

          <div className="flex min-w-0 flex-1 flex-col tall:justify-end lg:col-span-3 lg:col-start-5 lg:row-start-2 lg:mt-10 lg:block">
            <p className="text-small font-medium md:text-body">{suits.item} from</p>
            <p className="mt-0.5 mb-2 font-display text-numeral">{priceAmount(suits)}</p>
            <p className="text-small md:text-body">
              {site.booking.event.minutes}-minute visit. {site.booking.terms}
            </p>
          </div>

          <PhotoSlot
            photo={site.photos.fitter}
            sizes="(min-width: 1024px) 28vw, 214px"
            preload
            bleedRight
            className="aspect-[4/5] h-slot shrink-0 md:h-96 lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:-mr-[calc(var(--page-edge)+var(--spacing-gutter-lg))] lg:mt-10 lg:aspect-square lg:h-auto"
          />
        </div>
      </div>
    </section>
  );
}
