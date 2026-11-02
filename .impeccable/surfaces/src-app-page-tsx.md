---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/pricing/page.tsx","src/app/book/page.tsx","src/app/contact/page.tsx"]
---

# Home page and site-wide world

Scope: `/` in Persuade mode. This world also carries `/pricing`, `/book` and `/contact`.

Audience and job: people in Melbourne, mostly on a phone from Instagram, deciding whether to trust a small business with a suit they haven't seen. The one action is "Book a fitting".

Owner's answers: the first belief to earn is "a real person fits me". The look that would be wrong is "too luxury". Expect uneven phone photos at launch, so the layout never relies on a good photo or a particular crop.

Chosen by the owner on the decision page. The chosen first-screen sketch is `.impeccable/mocks/decision/pattern-card.html`. Match its arrangement, palette, type and density. The build path is code-led.

## Direction contract

THESIS: The site is a tailor's working pattern, marked by a hand you're about to meet. It owns "a real person measures and fits you". It refuses the dark photo, hushed serif and gold of a luxury tailor, and the cream, high-contrast serif, red accent and hairlines of the old site.

OWN-WORLD: Colour strategy is Committed: flat ochre pattern card (#D9A441) owns most of every marketing page, with navy (#14233A) as both the ink on the card and the cutting table behind it. Timber (#2E1C11) is the Saigon ground. Chalk (#F0F3F4, cool so it never reads as cream; the detector flags warmer off-whites such as #F2F2EC) is the drawn line on card and the calm surface for forms and the calendar. Lantern red (#7F1A16, hover darker) is for booking actions and nothing else. Keep the token names `--color-lantern`, `--color-lantern-dark` and `--color-paper` (paper is chalk). Chalk on ochre is 2:1, so it's for lines only, never text. Navy on ochre is 7:1.

Type: Besley for headings and numerals, Be Vietnam Pro for everything else, both from Google Fonts under the SIL Open Font Licence. No third face and no fake handwriting: chalk marks are drawn lines, and words stay in these two faces.

Components: sections are pieces cut from card, so their edges carry real pattern geometry (shoulder slope, neck curve, armhole curve) drawn with inline SVG, not rectangles with a decorative divider. Pattern marks: triangular notches cut into an edge, a dashed seam allowance inside it, a grainline double arrow, a punched hole. Use only a few per section. Buttons are square-cornered flat rectangles with one small notch. Photos are plain rectangles with no shadow. An empty photo slot is a chalk-dashed rectangle in a slightly deeper ochre, reading "Photo needed" and the brief. `[TODO]` markers stay fully readable inside a dashed outline, so they look like a fitter's open question. No shadows, gradients, pills, tracked uppercase labels or eyebrows above headings. A hover is a flat colour swap.

Raised from the challengers:
- Numbers lead (from Nixie Counter): $890, 40%, 45 minutes and Free each keep a fixed place and are the biggest thing in their block, always in Besley numerals.
- Overlap means order (from Sticker Case): one piece sits on another only when it comes later in the process. Nothing overlaps for decoration.
- One gesture (from Drawcord Cape): the chalk seam is the only thing that moves on scroll, so it reads as one act.
- Always located (from Rain-Dark City): a section names its city wherever `site.ts` says so, and the Made in Saigon step sits on timber. Choose fabric has no stated city, so it gets no city label.

Guards: ochre with red is close to two Vietnamese flags, so never use a star on red, or three parallel stripes in any colour on ochre. Red is never a line or stripe on the card. The pattern is a visual language, not a claim: no copy may say the workshop uses paper patterns unless the owner confirms it and adds it to `site.ts`. The pattern pieces stay flat drawings with no figures or people.

STORY: In the first screen the visitor understands that these are made-to-measure suits, made in Saigon, measured and fitted at their home or office in Melbourne, from $890. They believe a real person will come to them, that the terms are plain, and that this isn't a shop they can't afford. They tap "Book a fitting". Scrolling, the chalk seam carries them through the five numbered steps with the turnaround, then Saigon and Melbourne with the photos, then prices and payment terms, and the page closes on booking.

FIRST VIEWPORT: Phone, 390 by 844, not fixed at the top. Navy table across the top holds the name in Besley, about 22px, on the left, with Pricing and Contact on the right. The ochre card's top edge rises from about y=126 at the left, up a neck curve to about (104, 62), then runs straight down the shoulder to about (390, 122), with one notch and a dashed chalk seam 14 to 16px inside it. The tagline is the h1: Besley 600, about 58px, line-height 1, four lines, navy, left gutter 20px. Below it, three lines of 17px text: "Made-to-measure suits, made in Saigon. We measure and fit you at your home or office in Melbourne." The lower zone splits in two. On the left, "Suits from", $890 in Besley 700 at about 56px, then "45-minute visit. Nothing to pay when you book." On the right, a 4:5 portrait photo slot about 214 by 268 runs off the right edge. A grainline arrow and a punched hole sit in the gap above the price. The lantern sticky bar is the primary action, 64px tall: "Book a fitting | Measurement is free". There's no second fixed bar on phones. A photo only fills the slot, and no text moves when it arrives. All of this holds at 360 wide and on short phones: the slot shrinks first, and the tagline, offer and price stay on screen.

Desktop, 1440 by 900: the same one card. The shoulder edge runs the full width under the header, which also carries a "Book a fitting" button. The tagline sits across about eight columns at about 8vw on the left, with the text, $890 and a large "Book a fitting" button below it. The photo slot sits on the right, and an armhole curve cut into the card's right edge shows the navy table behind it.

Signature: the chalk seam. One dashed chalk line starts at the first screen and runs down the home page, drawing itself as you scroll with CSS scroll-driven animation. It passes five numbered notches, one per step, crosses onto the timber band at Made in Saigon and back onto card at the final fitting. Browsers without support and `prefers-reduced-motion` get the full line, static. No other scroll animation exists on the site.

FORM: The Pattern Card, a tailor's working pattern; position 6 of 7 on the ordered list. seed:9c23a8d3818e1b49

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Home page photo slots

The first-screen slot is a new `site.photos.fitter`, with the brief "The owner with a tape measure. A phone photo is fine." It serves the first belief. `site.photos.hero` (a finished suit, worn) and `site.photos.workshop` both stay, lower on the page beside the Saigon and Melbourne text.

## Other pages

- `/pricing`: each price hangs as its own pattern piece with a punched hole, and its "from" number is the largest thing on it. The pieces differ in shape and size, never three identical cards. Payment terms are one length drawn to scale, notched at 40% for the deposit, with the balance as the rest. The FAQ is plain text on chalk, with every `[TODO]` showing.
- `/book`: chalk white, because the calendar comes first. A short ochre piece with the shoulder edge holds the h1 and the 45-minute and Free numbers, stacked above the calendar so no column runs past the fold beside a short one. There's no sticky bar on this page.
- `/contact`: chalk white, with the enquiry form leading, its fields sitting on drawn lines and its errors in words as well as lantern red. Contact details and service area sit on one ochre piece, with their `[TODO]` markers showing.
- Shared: the header sits on the navy table, and the footer is the navy table again, with the policy links and the ABN `[TODO]`.

## Unresolved

Tagline wording (the owner may revisit it now that the name is Saigon Tailors), draft prices, and all the `[TODO]` facts in `site.ts`.
