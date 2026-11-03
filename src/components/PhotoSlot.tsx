import Image from "next/image";
import type { Photo } from "@/content/site";

type Props = {
  photo: Photo;
  /** Passed to next/image so phones don't download desktop-sized files. */
  sizes: string;
  /** Only for the photo that is visible on first load. */
  preload?: boolean;
  /** Sets the slot's size and grid placement. A photo with a width and height sets its own shape. */
  className?: string;
};

/** Shows the photo once its file is added, otherwise a chalk-dashed placeholder of the same shape. */
export function PhotoSlot({ photo, sizes, preload = false, className = "" }: Props) {
  return (
    <div
      className={`relative overflow-hidden bg-ochre-deep text-navy ${className}`}
      style={photo.src && photo.width && photo.height ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined}
    >
      {photo.src ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          preload={preload}
          // Contain, never cover: if a slot ever differs from the photo's shape, nobody in it gets cut off.
          className="object-contain"
        />
      ) : (
        <>
          <svg
            aria-hidden="true"
            className="absolute inset-px h-[calc(100%-2px)] w-[calc(100%-2px)] overflow-visible"
          >
            <rect className="seam" width="100%" height="100%" />
          </svg>
          <p className="absolute inset-x-0 bottom-0 p-3.5 text-fine md:text-small">
            <strong className="block font-semibold">Photo needed</strong>
            {photo.brief}
          </p>
        </>
      )}
    </div>
  );
}
