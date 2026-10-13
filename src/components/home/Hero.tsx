import { BookButton } from "@/components/BookButton";
import { PhotoSlot } from "@/components/PhotoSlot";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8">
      {/* Left padding lines the text up with the header on wide screens; the photo runs to the edge. */}
      <div className="px-gutter pt-10 pb-14 lg:col-span-5 lg:flex lg:flex-col lg:justify-end lg:py-section lg:pr-0 lg:pl-[max(var(--spacing-gutter-lg),calc((100vw-var(--container-page))/2+var(--spacing-gutter-lg)))]">
        <p className="flex items-center gap-3 text-xs font-medium tracking-label uppercase">
          <span aria-hidden="true" className="h-px w-8 bg-ochre" />
          Made-to-measure suits · Melbourne
        </p>
        <h1 className="mt-5 text-5xl sm:text-6xl xl:text-7xl">{site.tagline}</h1>
        <p className="mt-6 max-w-sm text-lg">{site.origin}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <BookButton size="lg" />
          <p className="text-sm">{site.booking.note}</p>
        </div>
      </div>

      <PhotoSlot
        photo={site.photos.hero}
        sizes="(min-width: 1024px) 58vw, 100vw"
        preload
        className="order-first aspect-[4/5] max-h-[60svh] w-full lg:order-none lg:col-span-7 lg:aspect-auto lg:max-h-none lg:min-h-[44rem]"
      />
    </section>
  );
}
