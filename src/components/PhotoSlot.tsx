import Image from "next/image";
import type { Photo } from "@/content/site";

type Props = {
  photo: Photo;
  /** Passed to next/image so phones don't download desktop-sized files. */
  sizes: string;
  /** Only for the photo that is visible on first load. */
  preload?: boolean;
  /** Sets the slot's shape (aspect ratio, height, grid placement). */
  className?: string;
};

/** Shows the photo once its file is added, otherwise a labelled placeholder of the same shape. */
export function PhotoSlot({ photo, sizes, preload = false, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {photo.src ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-end border border-dashed border-current/40 bg-current/5 p-5">
          <p className="text-sm opacity-80">
            <span className="block text-xs font-medium tracking-label uppercase">Photo needed</span>
            {photo.brief}
          </p>
        </div>
      )}
    </div>
  );
}
