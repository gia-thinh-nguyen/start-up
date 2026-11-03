import { CutEdge } from "@/components/CutEdge";
import { PhotoSlot } from "@/components/PhotoSlot";
import { WithTodos } from "@/components/Todo";
import { site } from "@/content/site";

/**
 * The Saigon workshop, on timber. Its bottom padding leaves room for the Prices piece's edge, which
 * rises over it straight onto the timber.
 */
export function Saigon() {
  const { saigon, photos } = site;

  return (
    <section
      aria-labelledby="saigon"
      className="surface-timber relative mt-[calc(var(--spacing-section)+var(--spacing-hem))] lg:mt-[calc(var(--spacing-section)+var(--spacing-hem-lg))]"
    >
      <CutEdge shape="shoulderRight" fill="fill-timber" />
      <div className="mx-auto grid max-w-page gap-8 px-gutter pt-10 pb-[calc(var(--spacing-hem)+3rem)] md:grid-cols-12 lg:px-gutter-lg lg:pt-14 lg:pb-[calc(var(--spacing-hem-lg)+4rem)]">
        {/* Level with the foot of the photo, so the text and the photo read as one block. */}
        <div className="md:col-span-6 md:self-end md:pb-10">
          <h2 id="saigon" className="text-title">
            {saigon.city}
          </h2>
          <p className="mt-4 max-w-measure text-lede">
            <WithTodos text={saigon.text} />
          </p>
        </div>
        {/* Taken in the Saigon shop, so it stays on the Saigon piece, at its own portrait shape. */}
        <figure className="w-[72%] justify-self-end md:col-span-5 md:col-start-8 md:w-full lg:col-span-4 lg:col-start-8">
          <PhotoSlot photo={photos.handshake} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 72vw" />
          <figcaption className="mt-3 text-small">{photos.handshake.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
