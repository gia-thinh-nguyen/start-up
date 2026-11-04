---
name: Saigon Tailors
description: Tailored in Saigon, Fitted in Melbourne. Made-to-measure suits, drawn as a tailor's working pattern.
colors:
  ochre: "#d9a441"
  ochre-deep: "#cf9833"
  navy: "#14233a"
  timber: "#2e1c11"
  paper: "#f0f3f4"
  lantern: "#7f1a16"
  lantern-dark: "#641310"
typography:
  stop:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "clamp(2.75rem, 1.9rem + 3.6vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  stop-md:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "clamp(1.625rem, 1.1rem + 2.3vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.018em"
  stop-sm:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "clamp(1.375rem, 0.95rem + 1.9vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "clamp(2.75rem, 1.83rem + 4.07vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "clamp(2rem, 1.6rem + 1.85vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  subheading:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.2
  numeral:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "clamp(3.5rem, 2.25rem + 5.1vw, 7rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "lnum"
  price:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "clamp(2.25rem, min(10vw, 18vw - 1.25rem), 4.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "lnum"
  price-lg:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "clamp(4rem, min(7vw, 10vw - 2.4rem), 6.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "lnum"
  wordmark:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "clamp(1.25rem, 0.825rem + 2.25vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.005em"
  lede:
    fontFamily: "Be Vietnam Pro, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.42
  body:
    fontFamily: "Be Vietnam Pro, ui-sans-serif, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.45
  small:
    fontFamily: "Be Vietnam Pro, ui-sans-serif, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
  fine:
    fontFamily: "Be Vietnam Pro, ui-sans-serif, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.35
  tag:
    fontFamily: "Be Vietnam Pro, ui-sans-serif, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.3
rounded:
  none: "0px"
spacing:
  gutter: "1.25rem"
  gutter-lg: "2.5rem"
  section: "5rem"
  header: "3.75rem"
  header-lg: "5rem"
  bar: "4rem"
  hem: "3rem"
  hem-lg: "4.5rem"
  page: "90rem"
  measure: "38rem"
  booker: "65rem"
  booker-sm: "45rem"
components:
  button-book:
    backgroundColor: "{colors.lantern}"
    textColor: "{colors.paper}"
    typography: "{typography.small}"
    rounded: "{rounded.none}"
    padding: "0.625rem 1.25rem"
  button-book-hover:
    backgroundColor: "{colors.lantern-dark}"
    textColor: "{colors.paper}"
  button-book-lg:
    backgroundColor: "{colors.lantern}"
    textColor: "{colors.paper}"
    typography: "{typography.lede}"
    rounded: "{rounded.none}"
    padding: "1rem 1.75rem"
  booking-bar:
    backgroundColor: "{colors.lantern}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "{spacing.bar}"
    width: "100%"
  button-send:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    typography: "{typography.lede}"
    rounded: "{rounded.none}"
    padding: "1rem 1.75rem"
  button-send-hover:
    backgroundColor: "{colors.timber}"
    textColor: "{colors.paper}"
  surface-card:
    backgroundColor: "{colors.ochre}"
    textColor: "{colors.navy}"
    rounded: "{rounded.none}"
  surface-chalk:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
    rounded: "{rounded.none}"
  surface-table:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
  surface-timber:
    backgroundColor: "{colors.timber}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
  swing-tag:
    backgroundColor: "{colors.ochre}"
    textColor: "{colors.navy}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: "2.5rem 0.625rem 1rem"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    height: "2.75rem"
---

# Design System: Saigon Tailors

## Overview

**Creative North Star: "The Pattern Card"**

The site is a tailor's working pattern, marked by a hand you're about to meet. Every marketing page is mostly one flat ochre card laid on a navy cutting table. Sections are pieces cut from that card: their top edges carry real garment geometry (a neck curve, a shoulder slope, an armhole), drawn as inline SVG and rising over the piece before them. On the card, chalk draws the working marks: a dashed seam allowance inside each cut edge, triangular notches, a grainline double arrow, a punched hole. Timber is the Saigon ground, and the only sections set on it are the ones about Saigon.

The world is flat, square and specific. There are no shadows, no radii, no soft gradients and no decorative motion; depth comes from one piece of card sitting on another, and a piece only sits on one that comes earlier in the process. Numbers carry the persuasion: $410, 40%, 30 minutes and Free are set in Besley numerals as the largest thing in their block. Unfilled facts stay visible as dashed `[TODO]` outlines, like a fitter's open question, rather than being hidden or invented.

It refuses the luxury tailor (dark photography, hushed serif, gold) and the previous site (cream ground, high-contrast serif, red accent, hairlines). It is warm, plain and working, and it should never read as "too luxury".

**Key Characteristics:**
- One committed colour: flat ochre card over navy table, with timber for Saigon and chalk for lines and form surfaces.
- Section edges are cut pattern geometry, never rectangles with a divider.
- Chalk marks are drawn lines: dashed seams, notches, grainline, punched hole. A few per section, not many.
- Lantern red appears only where someone books.
- Two faces: Besley for headings and numerals, Be Vietnam Pro for everything else.
- Square corners, no shadows; hover is a flat colour swap.
- One gesture moves: the home page's long chalk seam draws itself on scroll.

## Colors

A committed palette: ochre owns most of every marketing page, navy is both its ink and the table under it, and every other colour has one narrow job.

### Primary
- **Pattern Card Ochre** (#d9a441): the card. Most section grounds on home, `/pricing` pieces, the `/book` and `/contact` header pieces. Takes navy text only. Also the focus ring, link-swap fill and selection on navy and timber.
- **Deep Card Ochre** (#cf9833): an empty photo slot on the card, just deep enough to read as a hole waiting for a photo.

### Secondary
- **Cutting Table Navy** (#14233a): the ink on card and chalk, and the table behind the card: header, footer, the `/pricing` rail, home's Prices piece, the page background and scrollbar track. Also fills notches cut into ochre (the notch shows the table behind), the punched holes on price pieces and the swing tag, the includes-list markers, and the route map when it is drawn on the card.
- **Saigon Timber** (#2e1c11): the Saigon ground. Used only for home's "Made in Saigon, Vietnam" piece and the Saigon section, and for the Send button's hover.

### Tertiary
- **Lantern Red** (#7f1a16): booking actions: the Book a fitting button, the phone booking bar, Cal.com's brand and selected-day colour, and the caret and form accent colour. Paper on lantern is about 9:1.
- **Lantern Dark** (#641310): hover and active state for lantern, and Cal.com's brand emphasis.

### Neutral
- **Chalk** (#f0f3f4): token name `paper`. A cool off-white so it never reads as cream. Every drawn line on the card (seams, grainline, punched-hole rings, cords, photo-slot outlines), the route map on timber, the text colour on navy, timber and lantern, and the calm surface for `/book`, `/contact`, the calendar, and home's "Every suit from $410 includes" piece, the reading block between the ochre stops and the timber Saigon piece (owner, 4 November 2026).

### Named Rules
**The Lantern Is For Booking Rule.** Lantern red is for booking actions and nothing else: never a line, stripe, border or decoration on the card. The one sanctioned exception is form validation on `/contact` (owner decision), where errors also carry words and a notch mark so colour is never the only signal.

**The Chalk Is a Line Rule.** Chalk on ochre is about 2:1, so chalk on the card is for drawn lines only, never text. Text on ochre is always navy (about 7:1). A drawing that has to be read on the card, such as the route map, is drawn in navy instead.

**The Surface Declares Rule.** Every section declares exactly one surface: card, chalk, table or timber. The surface sets its text colour, focus-ring colour, selection colour and link-swap pair together; never set those piecemeal. Card and chalk swap to navy with chalk text; table and timber swap to ochre with navy text.

**The Flag Guard Rule.** Ochre with red sits close to two Vietnamese flags: never a star on red, and never three parallel stripes of any colour on ochre.

## Typography

**Display Font:** Besley (with Georgia, serif)
**Body Font:** Be Vietnam Pro (with ui-sans-serif, sans-serif)

**Character:** Besley's sturdy, slightly old-fashioned slab-leaning serif gives headings and figures the weight of something written on a pattern; Be Vietnam Pro, a Vietnamese-designed sans, keeps everything else plain and readable on a phone. Both are Google Fonts under the SIL Open Font Licence. Body loads at 400, 500 and 600; Besley is variable and used at 600 and 700.

### Hierarchy
- **Stop** (600, `clamp(2.75rem, …, 4.25rem)`, 1.02, -0.02em): home's h1, "Measured in Melbourne", the first of the three numbered stops. One line in 8 columns on desktop; on phones "Measured in" fits beside its numeral.
- **Stop medium** (600, `clamp(1.625rem, …, 3.75rem)`, 1.05): the third stop's h2, "Fitted in Melbourne", one line on phones.
- **Stop small** (600, `clamp(1.375rem, …, 3rem)`, 1.08): the second stop's h2, "Made in Saigon, Vietnam", one line on phones. The three stop sizes are for home's first screen only; each stop's Besley numeral is set at its heading's size.
- **Title** (600, `clamp(2.75rem, …, 5.5rem)`, 1.1): every other page's h1, and the footer wordmark line. Leading stays at 1.1 so descenders clear the line below.
- **Heading** (600, `clamp(2rem, …, 3.25rem)`, 1.08): h2.
- **Subheading** (600, 1.375rem, 1.2): h3, price-piece names, footer column heads.
- **Numeral** (700, `clamp(3.5rem, …, 7rem)`, 1, -0.03em): the figures that lead a block (30 minutes, Free, 40%, the lead price in home's Prices piece) in Besley.
- **Price / Price large** (700, `clamp(2.25rem, …, 4.5rem)` / `clamp(4rem, …, 6.5rem)`, 1): the "from" figure on each `/pricing` piece. On phones Price grows at `min(10vw, 18vw - 1.25rem)`, so a piece's figure leads it without crowding its list. The home swing tag keeps Price's weight and tracking but sets its own size, `--tag-price` (`clamp(2.25rem, 3.75vw, 3.75rem)`, 36px on phones), so the tag grows more slowly than the photo it hangs on.
- **Wordmark** (600, `clamp(1.25rem, …, 1.75rem)`): "Saigon Tailors" in the header, about 22px on phones.
- **Lede** (400, `clamp(1.0625rem, …, 1.375rem)`, 1.42): intro sentences, large buttons.
- **Body** (400, 1.0625rem, 1.45): running text, capped at the 38rem measure.
- **Small** (400, 0.9375rem, 1.4) and **Fine** (400, 0.875rem, 1.35): units, notes, photo briefs and captions, the booking bar's second line, the copyright line.
- **Tag** (400, 0.8125rem, 1.3): the swing tag's small lines below 48rem, where the tag is a third of the photo's width. Nothing else uses it; from 48rem the tag steps up to Fine, and to Small from 80rem.

### Named Rules
**The Two Faces Rule.** Besley and Be Vietnam Pro, nothing else. No third face and no fake handwriting: chalk marks are drawn lines, and words stay in these two faces.

**The Numbers Lead Rule.** A block's figure is set in Besley numerals and is the biggest thing in that block, with a visible label beside it. Only one figure leads per block; supporting figures step down to heading size. Stop numerals are a sequence, not a figure: they match their heading's size and are hidden from screen readers, because the headings already carry the order.

**The Lighter Zero Rule.** Never use `tabular-nums` on Besley; its tabular zero is visibly lighter. Where figures must align, put each digit in a fixed-width cell (0.62em) and give screen readers the whole string.

**The No Label Caps Rule.** No tracked uppercase labels and no eyebrows above headings. Weight and size carry hierarchy.

## Layout

Mobile-first: most visitors arrive from Instagram on a phone. Content sits in a 90rem page column with a 1.25rem gutter (2.5rem from 64rem wide). Desktop compositions run on a 12-column grid with asymmetric splits (heading across 5 to 6 columns, text from column 7), never a centred stack. Body text is capped at the 38rem measure. Sections are separated by `section` (5rem) of top space and by their cut edges, not by rules. A piece that follows another directly takes no top space and cuts its edge straight onto it: home's navy Prices piece rises onto the timber Saigon piece.

A cut edge rises `hem` (3rem; `hem-lg` 4.5rem on desktop) over the piece before it, so the last block of every piece needs at least that much space below its content. The header is `header` (3.75rem; 5rem on desktop) tall on the navy table. On phones a 4rem lantern booking bar is fixed to the bottom of every page except `/book`, with a navy spacer so it never covers the end of the page and scroll padding so focus never lands under it.

Pieces are full-width bands whose colour reaches the screen edge while their words keep to the page column; the long seam and the third price piece also reach past the column. Home's three numbered stops share one row grid: a 2.75rem numeral column beside the content on phones, and a 4.5rem numeral column plus 11 columns from 64rem, so every stop's numeral and heading line up on the same left edge. `/book` centres Cal.com in a `booker` (65rem) frame, or `booker-sm` (45rem) where Cal hides its event details below 1024px.

Breakpoints are Tailwind's `sm` 40rem, `md` 48rem, `lg` 64rem and `xl` 80rem.

**The Overlap Means Order Rule.** One piece overlaps another only when it comes later in the process: "Fitted in Melbourne" rises over the foot of the Saigon workshop photo. Nothing overlaps for decoration. The one hung object is the swing tag, which hangs on the photo of the rail it prices (owner's composition) and sits above piece 3, so where it is taller than the photo it hangs over that edge rather than under it.

**The Always Located Rule.** A section names its city wherever the content says so, and Saigon content sits on timber.

## Elevation & Depth

The system is completely flat. Radius and shadow tokens are reset to nothing in the theme. Depth is conveyed only by pieces of card laid over the table and over each other, with cut edges and notches revealing the colour behind, and by tags that hang on chalk cords through punched holes: the price pieces from the `/pricing` rail, and home's swing tag from the top of the workshop photo.

**The Flat Card Rule.** No box shadows, drop shadows, glows, blur or glass, ever. If something needs to read as on top, cut its edge over what it covers.

## Shapes

Every corner is square (0px). Rectangles are reserved for buttons, the booking bar, form fields, the payment length and photos; section boundaries are always cut pattern edges.

The cut-edge vocabulary, each a 100 by 48 SVG stretched to the full width, with its chalk seam drawn 15 units inside:
- **Shoulder left**: a shoulder falling to the right.
- **Shoulder right**: a shoulder rising to the right.
- **Collar**: a neck curve at the left, then the shoulder falling to the right, with one navy notch, on the `/book` and `/contact` pieces.
- **Armhole**: one long curve; also the edge where home's "Fitted in Melbourne" piece rises over the workshop photo, with one timber notch at the middle of its width.
- **Neck**: a neck curve at the right, shoulder falling to the left.
- **Hem edge**: the footer's top edge, a neck curve and shoulder in the same slope as the first screen, with one notch.

Home's first edge is the one exception to stretching: a neck curve then a long shoulder falling to the right, cut out of the navy table and drawn in real pixels from the page's left, so a wider screen shows more of the shoulder rather than a distorted one. It has one navy notch, and its seam turns down into the long chalk seam.

Notches are small triangles (14px; 10 by 16 where they sit on the long seam beside each stop, and as includes-list markers) drawn apart from the stretched edge so they never distort. Price pieces each have their own outline (a jacket front, a shirt yoke, a back panel) and their own hem, so no two are alike. The swing tag has its top corners cut away (from 22% to 78% across, down 15% of its height).

## Components

### Buttons
Square, flat, and cut with one small notch in the top edge, 1.5rem in from the right (0.75rem wide, 0.5rem deep), which shows whatever is behind the button. The fill is a pseudo-element so the notch never clips the focus ring.
- **Shape:** square corners (0px), one notch.
- **Book a fitting:** lantern with chalk text, semibold; small (0.625rem by 1.25rem padding, small text) in the header, large (1rem by 1.75rem, lede text) in closing sections and on `/contact` and `/pricing`.
- **One per screen:** home's first screen has no in-page Book button (owner, 4 November 2026). The header's small button is its booking action, and below 48rem the booking bar is.
- **Hover / Active:** flat swap to lantern-dark over 120ms. No lift, no shadow.
- **Focus:** 2px outline in the surface's focus colour, 3px offset.
- **Send message:** the same notched rectangle in navy, swapping to timber on hover. Pending turns into a dashed 2px navy outline reading "Sending…", the same language as a `[TODO]`.

### Booking bar (phones)
Fixed to the bottom on every page but `/book`, 4rem plus the safe-area inset, lantern with chalk text. "Book a fitting" and "Measurement is free" sit either side of a faint chalk divider, with the notch centred above it. It steps aside while a form field has focus.

### Surfaces
`surface-card`, `surface-chalk`, `surface-table` and `surface-timber` are the four section grounds. Each sets background, text, focus ring and swap pair together (see Colors). No border, no radius, no shadow; padding comes from the gutter and section tokens.

### Inputs / Fields
- **Style:** transparent field on chalk, navy 2px bottom rule only, square, at least 2.75rem tall. The message field is written on ruled lines (2.25rem pitch, 2px navy lines) that scroll with the text.
- **Focus:** the surface's navy outline, 1px offset.
- **Error:** the bottom rule thickens to 4px lantern (the message field's lines turn lantern), and the message appears below in lantern, medium weight, led by a lantern notch mark. Errors are always words, never colour alone.

### Navigation
Header on the navy table: the wordmark in Besley at left, Pricing and Contact at right in Be Vietnam Pro medium (fine on the narrowest phones, small, then body from 48rem), and the small Book button from 48rem. Links hover with a flat block swap to ochre with navy text. The current page's link is underlined and marked `aria-current`.

### Links
Text links are underlined (0.09em thick, 0.2em offset) and hover as a flat block of the surface's swap colour, never a colour-only change.

### Pattern marks
Drawn in chalk at a 2.25 stroke; use only a few per section.
- **Seam:** a dashed chalk stroke (dash 8, gap 6), non-scaling, inside every cut edge.
- **Notch:** a small triangle cut into an edge, filled with the colour behind.
- **Grainline:** a vertical double arrow, its length set by its height.
- **Punched hole:** a 22px chalk ring; on `/pricing` filled navy to show the table through it, hanging from a chalk cord.

### Payment length
Everything paid after the free measurement drawn as one length to true scale: 40 parts deposit, 60 parts balance, with a notch at 40%. Deposit is navy and balance chalk on card; deposit is ochre and balance chalk on the table. One bar from 48rem; on phones each part takes its own row at its true length and position, with its text under its label.

### Numbered stops (home's first screen)
The visit in its real order, as three pieces of card: 1 "Measured in Melbourne" on ochre, cut from the navy table, with its sentence under the h1, aligned to it, and no Book button (the header's is the action); 2 "Made in Saigon, Vietnam" on timber with a shoulder-right edge and the workshop photo at its own 16:9 (edge to edge on phones, inset from 48rem, 7 columns at 64rem and 6 from 80rem); 3 "Fitted in Melbourne" on ochre, rising over the photo's foot with the armhole edge. Each stop leads with its Besley 700 numeral at its heading's size (Stop, Stop small, Stop medium), hidden from screen readers. Each piece has exactly one notch, cut into its left edge with its point on the long seam, level with the middle of its numeral, filled with the colour behind (navy, ochre, navy). The tagline is not on the first screen.

### Swing tag
A price tag hung on a chalk cord (2.25) from the top of the workshop photo, at its right, as if from the rail of jackets in it. Ochre card with navy text, top corners cut away, turned 3 degrees anticlockwise, with a navy-filled punched hole ringed in chalk. It reads "Suits from AUD" (medium), the price in Besley 700 at `--tag-price`, and the price's unit ("including shipping"), nothing more (owner, 4 November 2026); the small lines are Tag below 48rem, Fine from 48rem and Small from 80rem. Below 48rem it is 34% of the photo's width, 2% from its right, so its left edge stays right of 64% of the photo and clear of the tailor; from 48rem it is sized from its price (`max(10.5rem, tag price × 2.95)`, so "including shipping" holds one line), 0.75rem from the right, 1rem from 64rem and 2rem from 80rem. It sits above piece 3 and hangs over its edge where it is taller than the photo.

### Route map
A small outline map: Vietnam above Australia, projected from real coordinates, with a stitched seam running down from a ring at Saigon to a ring at Melbourne. Coastlines are 1.5 and the seam and rings 2.25, non-scaling. It has two inks: navy on the card, in the "Fitted in Melbourne" piece below 80rem (6.5rem wide); chalk on timber, beside the Saigon sentence in the "Made in Saigon" piece from 80rem (7.5rem wide). It has no labels or distance, and it is hidden from screen readers because the headings beside it name both cities.

### Includes list
"Every suit from $410 includes" is a chalk piece with a neck edge rising over piece 3, so it reads apart from the ochre stops; the timber Saigon piece rises straight onto it. Each item is led by a 10 by 16 navy notch pointing at the text, at lede size. The turnaround (3–4 weeks) sits under it as one h3 block. There is no fabric block: the range is in-house and not described on the site (owner, 4 November 2026).

### Photo slot
A plain rectangle with no shadow or radius. A photo's width and height in the content file set the slot's aspect ratio, so the photo fills it at its own shape and nothing moves when it arrives. Empty, it is a deep-ochre rectangle, sized by its layout, with a chalk seam outline and, at the bottom, "Photo needed" in semibold over the photo brief (fine, small from 48rem). On home: the workshop photo in the "Made in Saigon" piece (16:9); and the handshake photo in the Saigon section (about 2:3), 72% wide at the right on phones, 5 columns from 48rem and 4 from 64rem, with the text block level with its foot. A photo may carry a caption in the content file, set as a small-text figcaption under it where the page must say where it was taken: the handshake reads "In the Saigon shop."

**The Whole Photo Rule.** A photo shows at its own shape, so nobody in it is cut off. CSS never crops: no focus points, no fixed aspect ratios on a photo. If a layout needs another shape, the owner supplies a crop at that exact size.

### [TODO] marker
Any unfilled fact from the content file shows in full inside a 1.5px dashed outline in the current text colour, 0.3em side padding, repeating on each wrapped line. A `[TODO]` contact detail is never a link.

### The chalk seam (signature)
One dashed chalk line runs down the home page's card, 10px inside the left edge on phones and 20px from 64rem, starting where the first screen's shoulder seam turns down, passing the notch beside each numbered stop, crossing the timber and table pieces and stopping at the footer's edge. Where it crosses the chalk "Every suit from $410 includes" piece it is redrawn in navy above itself, because chalk on chalk would vanish. Where scroll-driven animation is supported and motion is allowed, it draws itself with its tip held a quarter of the way up the screen (`cubic-bezier(0.16, 1, 0.3, 1)` easing family; linear on the scroll timeline). Otherwise it is drawn whole and static.

**The One Gesture Rule.** The chalk seam is the only thing that moves on scroll, anywhere on the site. Everything else is still apart from 120ms colour swaps, and `prefers-reduced-motion` reduces all animation and transition to near zero and turns off smooth scrolling.

**The Open Question Rule.** A missing fact is shown as a dashed `[TODO]`, never hidden, softened or invented.

## Do's and Don'ts

### Do:
- **Do** declare one surface per section (card, chalk, table or timber) and let it set text, focus, selection and link swap.
- **Do** cut section edges from the pattern vocabulary (shoulder, collar, armhole, neck, hem) with a chalk seam inside, rising `hem` over the piece before.
- **Do** keep text on ochre navy; chalk on the card is for lines only.
- **Do** reserve lantern for booking actions (and `/contact` field errors, with words and a notch mark).
- **Do** set leading figures in Besley numerals as the biggest thing in their block, with a visible label.
- **Do** make every hover a flat colour swap and every corner square.
- **Do** show unfilled facts with the dashed `[TODO]` outline, and empty photos as a labelled deep-ochre slot with a chalk-dashed outline.
- **Do** give every photo its width and height in the content file, so its slot takes the photo's own shape.
- **Do** design at 390 by 844 first, with the booking bar in view. On home the first screen is the three numbered stops in their real order, with the price on the swing tag.
- **Do** put Saigon on timber, and name a section's city wherever the content does.

### Don't:
- **Don't** use shadows, radii, pills, glass, glows, or colour gradients. The ruled message field's hard-edged lines are drawn lines, not a gradient fill.
- **Don't** use tracked uppercase labels or eyebrows above headings.
- **Don't** add a third typeface, handwriting fonts, icon-library icons or emoji; all marks are drawn in this repo as inline SVG.
- **Don't** use lantern red as a line, stripe or decoration, put a star on red, or lay three parallel stripes on ochre.
- **Don't** overlap pieces for decoration; a piece only sits on one that comes earlier in the process. The swing tag hanging on the workshop photo is the one hung object.
- **Don't** crop a photo in CSS. If a layout needs another shape, ask the owner for a crop at that exact size.
- **Don't** add scroll or entrance animation beyond the chalk seam.
- **Don't** use `tabular-nums` on Besley.
- **Don't** lay out a row of identical cards; price pieces differ in shape and size.
- **Don't** drift toward luxury (dark photo grounds, gold, hushed serif) or back to the old site (cream ground, red accent, hairlines). Chalk stays cool (#f0f3f4), never cream.
- **Don't** draw people or figures on the pattern pieces, or imply in visuals or copy that the workshop uses paper patterns unless the owner confirms it.
