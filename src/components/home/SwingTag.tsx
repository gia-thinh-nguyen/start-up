import { priceAmount } from "@/components/figures";
import type { Price } from "@/content/site";

/**
 * A price on a swing tag, hung on a chalk cord from the top of the workshop photo, as if from the
 * rail of jackets in it. Its punched hole shows the table through it. The price grows with the screen
 * more slowly than the photo, from 2.25rem on phones, so the tag leads its block without taking over
 * the first screen. The tailor stands between about 40% and 63% of the photo's width, so the tag's
 * left edge stays right of 64% at every width; on phones it's a share of the photo. It sits above
 * piece 3, so if it's ever taller than the photo it hangs over that edge rather than under it.
 */
export function SwingTag({ price }: { price: Price }) {
  return (
    <div className="absolute top-0 right-[2%] z-10 w-[34%] [--tag-price:clamp(2.25rem,3.75vw,3.75rem)] md:right-3 md:w-[max(10.5rem,calc(var(--tag-price)*2.95))] lg:right-4 xl:right-8">
      <svg aria-hidden="true" className="mx-auto block h-7 w-1 overflow-visible xl:h-10">
        <line x1="2" y1="0" x2="2" y2="100%" className="stroke-paper stroke-[2.25]" />
      </svg>
      <div className="surface-card relative -mt-4 -rotate-3 px-2.5 pt-10 pb-4 md:px-3.5 [clip-path:polygon(22%_0,78%_0,100%_15%,100%_100%,0_100%,0_15%)] xl:px-4.5 xl:pt-12 xl:pb-5">
        <svg aria-hidden="true" viewBox="0 0 22 22" className="absolute top-2.5 left-1/2 size-5.5 -translate-x-1/2 xl:top-3.5">
          <circle cx="11" cy="11" r="9" className="fill-navy stroke-paper stroke-[2.25]" />
        </svg>
        <p className="text-tag font-medium md:text-fine xl:text-small">{price.item} from AUD</p>
        <p className="mt-0.5 font-display text-price text-(length:--tag-price)">{priceAmount(price)}</p>
        {price.unit && <p className="text-tag md:text-fine xl:text-small">{price.unit}</p>}
      </div>
    </div>
  );
}
