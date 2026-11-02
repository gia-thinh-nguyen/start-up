import { PhotoSlot } from "@/components/PhotoSlot";
import { WithTodos } from "@/components/Todo";
import { CutEdge } from "@/components/home/CutEdge";
import { site } from "@/content/site";

export function SaigonMelbourne() {
  const [saigon, melbourne] = site.places;

  return (
    <>
      <section
        aria-labelledby="saigon"
        className="surface-timber relative mt-[calc(var(--spacing-section)+var(--spacing-hem))] lg:mt-[calc(var(--spacing-section)+var(--spacing-hem-lg))]"
      >
        <CutEdge shape="shoulderRight" fill="fill-timber" />
        <div className="mx-auto grid max-w-page gap-8 px-gutter pt-10 pb-34 lg:grid-cols-12 lg:gap-x-8 lg:px-gutter-lg lg:pt-14 lg:pb-52">
          <div className="lg:col-span-5">
            <h2 id="saigon" className="text-title">
              {saigon.city}
            </h2>
            <p className="mt-4 max-w-prose text-lede">
              <WithTodos text={saigon.text} />
            </p>
          </div>
          <PhotoSlot
            photo={site.photos.workshop}
            sizes="(min-width: 1024px) 60vw, 100vw"
            bleedRight
            className="-mr-gutter aspect-[3/2] lg:col-span-7 lg:-mr-[calc(var(--page-edge)+var(--spacing-gutter-lg))]"
          />
        </div>
      </section>

      <section aria-labelledby="melbourne" className="relative">
        <CutEdge shape="neck" fill="fill-ochre" />
        <div className="relative mx-auto grid max-w-page gap-8 px-gutter pb-section lg:grid-cols-12 lg:gap-x-8 lg:px-gutter-lg">
          {/* Sits on the Saigon piece on purpose: the fitting comes after the making. */}
          <PhotoSlot
            photo={site.photos.hero}
            sizes="(min-width: 1024px) 30vw, 70vw"
            className="-mt-20 aspect-[4/5] w-[72%] lg:col-span-4 lg:-mt-52 lg:w-auto"
          />
          <div className="lg:col-span-6 lg:col-start-6 lg:self-center">
            <h2 id="melbourne" className="text-title">
              {melbourne.city}
            </h2>
            <p className="mt-4 max-w-prose text-lede">
              <WithTodos text={melbourne.text} />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
