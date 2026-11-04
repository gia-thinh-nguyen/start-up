---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/pricing/page.tsx","src/app/book/page.tsx","src/app/contact/page.tsx"]
---

# Home page and site-wide world

Scope: `/` in Persuade mode. This world also carries `/pricing`, `/book` and `/contact`.

Audience and job: people in Melbourne, mostly on a phone from Instagram, deciding whether to trust a small business with a suit they haven't seen. The one action is "Book a fitting".

Owner's answers: the first belief to earn is "a real person fits me". The look that would be wrong is "too luxury". The world (The Pattern Card) was chosen on 2 November 2026 and stays: same colours and fonts as `/pricing`, `/book` and `/contact`.

Home page redesigned on 4 November 2026. The owner said the old home page looked awful, mainly the first screen. Their answers: lead with Melbourne, because the order is measured in Melbourne, made in Saigon, fitted in Melbourne. The first screen must say "suits" without reading, show a low price ($410), show Vietnam, and hint at their own fabric. They chose the price-tag-on-the-rail layout, then the numbered version of it (sketch: `.impeccable/mocks/decision/rail-numbered.html`), with "Measured in Melbourne" as the headline, as the owner suggested. The tagline leaves the first screen because the three numbered headings say it in the real order.

Refined the same day at the owner's request: the in-page Book button no longer sits under the header's; photos are never cropped in CSS, so nobody in them is cut off; the phone price is smaller; the Melbourne section is gone (the handshake photo stays in Saigon); suits from $410 include shipping; shirts are an add-on from $85. Then: no in-page Book button on the first screen at all (the header's and the phone bar are the actions), a smaller tag with no fabric line, and a 3–4 week turnaround.

## Direction contract

THESIS: The first screen is the visit in its real order, three numbered pieces of the pattern card: 1 Measured in Melbourne, 2 Made in Saigon, Vietnam, 3 Fitted in Melbourne. It refuses a headline-and-buttons hero, and it refuses leading with Saigon, which made the old page read like an import shop.

OWN-WORLD: Unchanged Pattern Card. Ochre card (#D9A441) with navy ink, navy table (#14233A) behind, timber (#2E1C11) only for Saigon, chalk (#F0F3F4) for drawn lines and text on dark grounds, lantern (#7F1A16) only for booking. Besley for headings and numerals, Be Vietnam Pro for everything else. Cut pattern edges with a dashed chalk seam inside, notches, punched holes, square corners, no shadows. Step numbers are Besley numerals because the sequence is the point. The map is drawn in navy on ochre here, so it reads on the card without chalk text.

STORY: The visitor reads "1 Measured in Melbourne" and that it's free, at their home or office, in 30 minutes. They see the workshop's rail of jackets under "2 Made in Saigon, Vietnam", with a swing tag reading "Suits from AUD $410, including shipping", so they know it's suits and roughly what it costs. "3 Fitted in Melbourne" rises over the photo with the map: the suit comes back to them. They tap "Book a fitting" in the header or the phone's booking bar. Scrolling: every suit from $410 includes (shipping among it) and turnaround; the Saigon workshop with the handshake photo; prices, with a shirt as an add-on, and the 40/60 payment bar; booking.

FIRST VIEWPORT: Phone, 390 by 844. Navy header. Ochre piece 1 cut from the table with the collar edge and seam: "1" numeral at left beside the h1 "Measured in Melbourne" in Besley about 40px on two lines, then "Free, at your home or office. A 30-minute visit." (the booking bar carries "Measurement is free") Timber piece 2 with a shoulder edge: "2" and "Made in Saigon, Vietnam" in chalk, then the workshop photo edge to edge at its own 16:9, never cropped, with an ochre swing tag (punched hole, chalk cord from the rail) at its right, its left edge clear of the tailor (right of 64% of the photo), reading "Suits from AUD" over $410 in Besley 700 at 36px and "including shipping", and nothing else. Ochre piece 3 rises over the photo's foot with the armhole edge, one timber notch and a seam: "3 Fitted in Melbourne" in Besley about 26px (a step above piece 2), its full sentence, and the navy map at right, about 104px wide, all above the booking bar. Lantern booking bar, 64px. Desktop 1440 by 900: piece 1 a full-width band, the numeral and h1 on one line, and under the h1, aligned to it, the sentence, with no Book button (the header's is the action); piece 2 with its heading, sentence and chalk map at left and the photo at right at its own 16:9 (7 columns at 1024, 6 from 1280) with the tag; piece 3's heading at about 51px visible above the fold. Below 1280 the map stays in piece 3. Piece 3's heading also shows at 1024 by 768; at 1280 by 800 it sits at the fold.

FORM: Price tag on the rail, numbered version; position 1 of 7 on the ordered list (dealt as the roll's second card, then reworked by the owner). seed:1b4b683d7a56e1c5

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature: the chalk seam. One dashed line runs down the card's left edge from the collar, passing a notch at each numbered piece, and draws itself on scroll (CSS scroll-driven, static under reduced motion). No other scroll animation.

## Home page imagery

First screen: `workshop.png` (1520 by 855, 16:9) under "Made in Saigon, Vietnam". Saigon section: `hero.jpg` (1289 by 1970, about 2:3), the handshake, which was taken in the Saigon shop, captioned as such, beside the Saigon text and level with it. Both show at their own shape; a layout that needs another shape asks the owner for a crop at an exact size. There is no Melbourne section. Sources and consent for both photos are `[TODO]`. The workshop sign reads "VESTON" (Vietnamese for a suit jacket).

## Prices

Suits from $410 including shipping ($30 of it is shipping from Saigon; the page doesn't show the $30). "Add a shirt" from $85 with a suit order; it ships with the suit (owner, 4 November 2026). The wedding package shows no price and links to `/contact` with "Ask us for a group price". No "cheap" or comparison claims: the price speaks.

## Other pages

- `/pricing`: each price hangs as its own pattern piece with a punched hole; payment terms drawn to scale, notched at 40%; FAQ on chalk.
- `/book`: a short ochre piece with 30 minutes, Free and the travel line, then chalk with "Pick a time" and one calendar. `/book/confirm` shows the result on one ochre piece: booked, pay the $15 travel fee, or outside the area (owner, 5 November 2026). No sticky bar on either.
- `/contact`: chalk, form first, contact details on one ochre piece with their `[TODO]` markers.
- Shared: header and footer on the navy table.

## Unresolved

The workshop sentence, photo sources and consent, the tagline's future, piece 3 sitting at the fold on 1280 by 800 laptop screens.
