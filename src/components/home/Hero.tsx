import type { ReactNode } from "react";
import { CutEdge } from "@/components/CutEdge";
import { PhotoSlot } from "@/components/PhotoSlot";
import { RouteMap } from "@/components/home/RouteMap";
import { SwingTag } from "@/components/home/SwingTag";
import { site } from "@/content/site";

/**
 * The first piece's top edge, cut out of the navy table, with its notch and seam. Drawn in real
 * pixels from the left of the page, never stretched, so a wider screen just shows more of the
 * shoulder. The seam's first point is where ChalkSeam takes over.
 */
function ShoulderEdge() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
      <svg className="absolute top-0 left-0 size-px overflow-visible lg:hidden">
        <path className="fill-navy" d="M-2000 0H2000V407L104 2C84 40 40 62 0 66H-2000Z" />
        <path className="fill-navy" d="M240 30.4 254 33.4 245.2 45.5Z" />
        <path className="seam" d="M10 96C10 88 14 83 24 81 58 75 98 52 116 18L2000 417" />
      </svg>

      <svg className="absolute top-0 left-0 hidden size-px overflow-visible lg:block">
        <path className="fill-navy" d="M-2000 0H4000V332L232 12C190 78 90 114 0 118H-2000Z" />
        <path className="fill-navy" d="M860 65.4 880 67.1 868 86Z" />
        <path className="seam" d="M20 140C20 134 24 132 34 131 112 125 208 94 246 30L4000 349" />
      </svg>
    </div>
  );
}

/**
 * Cut into the piece's left edge with its point on the long seam, level with the middle of the
 * stop's number, showing what's behind the piece. `top` places it from the piece's top.
 */
function StopNotch({ fill, top }: { fill: string; top: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 16"
      preserveAspectRatio="none"
      className={`absolute left-0 h-4 w-(--seam) lg:h-6 ${fill} ${top}`}
    >
      <path d="M0 0 10 8 0 16Z" />
    </svg>
  );
}

/** A stop's number, the same size as its heading. Screen readers get the order from the headings. */
function StopNumber({ children, size }: { children: ReactNode; size: string }) {
  return (
    <span aria-hidden="true" className={`font-display font-bold ${size}`}>
      {children}
    </span>
  );
}

const row = "relative mx-auto grid max-w-page grid-cols-[2.75rem_1fr] px-gutter lg:grid-cols-[4.5rem_repeat(11,minmax(0,1fr))] lg:gap-x-8 lg:px-gutter-lg";

/**
 * The visit in its real order, as three numbered pieces of card: measured in Melbourne, made in
 * Saigon on timber, then fitted in Melbourne. Each piece rises over the one before it, because
 * each stop comes after the last, and the last one covers the foot of the workshop photo.
 */
export function Hero() {
  const [measured, made, fitted] = site.stops;
  const suits = site.prices[0];

  return (
    <>
      {/* The shoulder falls about 0.085px per pixel to the right, so on wide screens, where the page
          moves right, the top padding grows with the page's side margin and clears the seam. On desktop
          the last row sits at the left, where piece 2's edge rises least, so the bottom padding is shorter. */}
      <div className="relative pt-17 pb-[calc(var(--spacing-hem)+0.75rem)] lg:pt-[calc(8.5rem+var(--page-edge)*0.085)] lg:pb-[calc(var(--spacing-hem-lg)-0.5rem)]">
        <ShoulderEdge />
        <StopNotch
          fill="fill-navy"
          top="top-[calc(4.25rem+var(--text-stop)*0.51-0.5rem)] lg:top-[calc(8.5rem+var(--page-edge)*0.085+var(--text-stop)*0.51-0.75rem)]"
        />
        <div className={row}>
          <StopNumber size="text-stop">1</StopNumber>
          <h1 className="text-stop lg:col-span-11">{measured.title}</h1>
          {/* No booking button here: the header's (and the phone booking bar) is the one booking action. */}
          <p className="col-start-2 mt-3 max-w-measure lg:col-span-11 lg:col-start-2 lg:mt-5 lg:text-lede">
            {measured.text}
          </p>
        </div>
      </div>

      <section aria-labelledby="made-in-saigon" className="surface-timber relative pt-3 lg:pt-0">
        <CutEdge shape="shoulderRight" fill="fill-timber" />
        <StopNotch
          fill="fill-ochre"
          top="top-[calc(0.75rem+var(--text-stop-sm)*0.54-0.5rem)] lg:top-[calc(var(--text-stop-sm)*0.54-0.75rem)]"
        />
        <div className={row}>
          <StopNumber size="text-stop-sm">2</StopNumber>
          {/* Bottom padding on desktop keeps the sentence clear of piece 3's armhole edge. */}
          <div className="lg:col-span-4 lg:pb-14 xl:col-span-5">
            <h2 id="made-in-saigon" className="text-stop-sm">
              {made.title}
            </h2>
            {/* On wide screens the map sits with the Saigon sentence; on narrower ones it moves to piece 3. */}
            <div className="mt-4 hidden items-start gap-6 lg:flex">
              <p className="max-w-measure text-lede">{made.text}</p>
              <RouteMap className="hidden w-30 shrink-0 xl:block" />
            </div>
          </div>
          {/* The photo keeps its own 16:9 shape, so the tailor is never cut off. Edge to edge on phones,
              where the inset width leaves too little height for the tag. */}
          <div className="relative col-span-2 -mx-gutter mt-3 md:mx-0 lg:col-span-7 lg:col-start-6 lg:mt-0 xl:col-span-6 xl:col-start-7">
            <PhotoSlot photo={site.photos.workshop} sizes="(min-width: 1024px) 50vw, 100vw" preload />
            <SwingTag price={suits} />
          </div>
        </div>
      </section>

      {/* Bottom padding leaves room for the chalk "Every suit from $410 includes" piece's edge, which rises over it. */}
      <section
        aria-labelledby="fitted-in-melbourne"
        className="relative pt-3 pb-[calc(var(--spacing-hem)+1.5rem)] lg:pt-6 lg:pb-[calc(var(--spacing-hem-lg)+2rem)]"
      >
        <CutEdge shape="armhole" fill="fill-ochre" />
        {/* The hem's one notch, showing the timber behind, where the armhole curve sits 68% down
            its edge. Drawn apart from the stretched edge so it can't distort. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-full h-hem lg:h-hem-lg">
          <svg viewBox="0 0 14 14" className="absolute top-[68%] left-1/2 size-3.5 -translate-x-1/2 -translate-y-px">
            <path className="fill-timber" d="M0 0H14L7 14Z" />
          </svg>
        </div>
        <StopNotch
          fill="fill-navy"
          top="top-[calc(0.75rem+var(--text-stop-md)*0.525-0.5rem)] lg:top-[calc(1.5rem+var(--text-stop-md)*0.525-0.75rem)]"
        />
        <div className={row}>
          <StopNumber size="text-stop-md">3</StopNumber>
          <h2 id="fitted-in-melbourne" className="text-stop-md lg:col-span-6">
            {fitted.title}
          </h2>
          <div className="col-start-2 mt-3 flex items-start justify-between gap-4 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-center">
            <p className="max-w-measure lg:text-lede">{fitted.text}</p>
            <RouteMap ink="navy" className="w-26 shrink-0 xl:hidden" />
          </div>
        </div>
      </section>
    </>
  );
}
