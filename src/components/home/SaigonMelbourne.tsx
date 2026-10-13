import { PhotoSlot } from "@/components/PhotoSlot";
import { site } from "@/content/site";

export function SaigonMelbourne() {
  return (
    <section aria-labelledby="where-made" className="bg-navy text-paper">
      <div className="mx-auto grid max-w-page gap-12 px-gutter py-section lg:grid-cols-12 lg:gap-8 lg:px-gutter-lg">
        <PhotoSlot
          photo={site.photos.workshop}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="aspect-[3/2] lg:col-span-5 lg:aspect-auto lg:min-h-[32rem]"
        />

        <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <h2 id="where-made" className="text-4xl text-paper sm:text-5xl">
            Where your suit is made
          </h2>
          <dl className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-8">
            {site.places.map((place) => (
              <div key={place.city} className="border-t border-paper/25 pt-5">
                <dt className="text-xs font-medium tracking-label text-ochre uppercase">
                  {place.city}
                </dt>
                <dd className="mt-3 text-paper/90">{place.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
