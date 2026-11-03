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
  display:
    fontFamily: "Besley, Georgia, serif"
    fontSize: "min(max(min(14.87vw, 3.625rem), 8vw), 7.25rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
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
    fontSize: "clamp(2.25rem, min(12.5vw, 18vw - 1.25rem), 4.5rem)"
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
  slot: "min(16.75rem, calc((100vw - 11rem) * 1.25), max(10rem, calc(100svh - 36rem)))"
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
  photo-slot-empty:
    backgroundColor: "{colors.ochre-deep}"
    textColor: "{colors.navy}"
    typography: "{typography.fine}"
    rounded: "{rounded.none}"
    padding: "0.875rem"
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

The world is flat, square and specific. There are no shadows, no radii, no soft gradients and no decorative motion; depth comes from one piece of card sitting on another, and a piece only sits on one that comes earlier in the process. Numbers carry the persuasion: $890, 40%, 45 minutes and Free are set in Besley numerals as the largest thing in their block. Unfilled facts stay visible as dashed `[TODO]` outlines, like a fitter's open question, rather than being hidden or invented.

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
- **Cutting Table Navy** (#14233a): the ink on card and chalk, and the table behind the card: header, footer, the `/pricing` rail, home's Prices piece, the page background and scrollbar track. Also fills notches cut into ochre (the notch shows the table behind).
- **Saigon Timber** (#2e1c11): the Saigon ground. Used only for the Made in Saigon step and the Saigon section, and for the Send button's hover.

### Tertiary
- **Lantern Red** (#7f1a16): booking actions: the Book a fitting button, the phone booking bar, Cal.com's brand and selected-day colour, and the caret and form accent colour. Paper on lantern is about 9:1.
- **Lantern Dark** (#641310): hover and active state for lantern, and Cal.com's brand emphasis.

### Neutral
- **Chalk** (#f0f3f4): token name `paper`. A cool off-white so it never reads as cream. Every drawn line on the card (seams, grainline, punched hole, photo-slot outline), the text colour on navy, timber and lantern, and the calm surface for `/book`, `/contact` and the calendar.

### Named Rules
**The Lantern Is For Booking Rule.** Lantern red is for booking actions and nothing else: never a line, stripe, border or decoration on the card. The one sanctioned exception is form validation on `/contact` (owner decision), where errors also carry words and a notch mark so colour is never the only signal.

**The Chalk Is a Line Rule.** Chalk on ochre is about 2:1, so chalk on the card is for drawn lines only, never text. Text on ochre is always navy (about 7:1); on ochre-deep it is navy (about 6:1).

**The Surface Declares Rule.** Every section declares exactly one surface: card, chalk, table or timber. The surface sets its text colour, focus-ring colour, selection colour and link-swap pair together; never set those piecemeal. Card and chalk swap to navy with chalk text; table and timber swap to ochre with navy text.

**The Flag Guard Rule.** Ochre with red sits close to two Vietnamese flags: never a star on red, and never three parallel stripes of any colour on ochre.

## Typography

**Display Font:** Besley (with Georgia, serif)
**Body Font:** Be Vietnam Pro (with ui-sans-serif, sans-serif)

**Character:** Besley's sturdy, slightly old-fashioned slab-leaning serif gives headings and figures the weight of something written on a pattern; Be Vietnam Pro, a Vietnamese-designed sans, keeps everything else plain and readable on a phone. Both are Google Fonts under the SIL Open Font Licence. Body loads at 400, 500 and 600; Besley is variable and used at 600 and 700.

### Hierarchy
- **Display** (600, `min(max(min(14.87vw, 3.625rem), 8vw), 7.25rem)`, 1, -0.025em): the tagline, home's h1 only. About 58px on a 390 phone, 8vw on desktop, capped so the two-line desktop break at the comma holds.
- **Title** (600, `clamp(2.75rem, …, 5.5rem)`, 1.1): every other page's h1, and the footer wordmark line. Leading stays at 1.1 so descenders clear the line below.
- **Heading** (600, `clamp(2rem, …, 3.25rem)`, 1.08): h2.
- **Subheading** (600, 1.375rem, 1.2): h3, price-piece names, footer column heads, the turnaround line.
- **Numeral** (700, `clamp(3.5rem, …, 7rem)`, 1, -0.03em): the figures that lead a block (step numbers, 45 minutes, Free, 40%) in Besley.
- **Price / Price large** (700, `clamp(2.25rem, …, 4.5rem)` / `clamp(4rem, …, 6.5rem)`, 1): the "from" figure on each `/pricing` piece and on home, sized so the narrowest piece still fits `$129`.
- **Wordmark** (600, `clamp(1.25rem, …, 1.75rem)`): "Saigon Tailors" in the header, about 22px on phones.
- **Lede** (400, `clamp(1.0625rem, …, 1.375rem)`, 1.42): intro sentences, large buttons.
- **Body** (400, 1.0625rem, 1.45): running text, capped at the 38rem measure.
- **Small** (400, 0.9375rem, 1.4) and **Fine** (400, 0.875rem, 1.35): units, notes, photo briefs, the booking bar's second line, the copyright line.

### Named Rules
**The Two Faces Rule.** Besley and Be Vietnam Pro, nothing else. No third face and no fake handwriting: chalk marks are drawn lines, and words stay in these two faces.

**The Numbers Lead Rule.** A block's figure is set in Besley numerals and is the biggest thing in that block, with a visible label beside it. Only one figure leads per block; supporting figures step down to heading size. On home, `$890` alone leads the first screen.

**The Lighter Zero Rule.** Never use `tabular-nums` on Besley; its tabular zero is visibly lighter. Where figures must align, put each digit in a fixed-width cell (0.62em) and give screen readers the whole string.

**The No Label Caps Rule.** No tracked uppercase labels and no eyebrows above headings. Weight and size carry hierarchy.

## Layout

Mobile-first: most visitors arrive from Instagram on a phone. Content sits in a 90rem page column with a 1.25rem gutter (2.5rem from 64rem wide). Desktop compositions run on a 12-column grid with asymmetric splits (heading across 5 to 6 columns, text from column 7), never a centred stack. Body text is capped at the 38rem measure. Sections are separated by `section` (5rem) of top space and by their cut edges, not by rules.

A cut edge rises `hem` (3rem; `hem-lg` 4.5rem on desktop) over the piece before it, so the last block of every piece needs at least that much space below its content. The header is `header` (3.75rem; 5rem on desktop) tall on the navy table. On phones a 4rem lantern booking bar is fixed to the bottom of every page except `/book`, with a navy spacer so it never covers the end of the page and scroll padding so focus never lands under it.

The first-screen photo slot height is `slot`, which gives way first on narrow or short phones so the tagline, offer and price stay on screen. Things that run off the screen (the first-screen photo slot, the long seam, home's neck curve, the third price piece) reach past the page column to the screen edge. `/book` centres Cal.com in a `booker` (65rem) frame, or `booker-sm` (45rem) where Cal hides its event details below 1024px.

Breakpoints are Tailwind's `sm` 40rem, `md` 48rem and `lg` 64rem, plus a `tall` variant (min-height 52rem) that reveals the first screen's grainline and punched hole only when there is room above the price.

**The Overlap Means Order Rule.** One piece overlaps another only when it comes later in the process. Nothing overlaps for decoration.

**The Always Located Rule.** A section names its city wherever the content says so, and Saigon content sits on timber.

## Elevation & Depth

The system is completely flat. Radius and shadow tokens are reset to nothing in the theme. Depth is conveyed only by pieces of card laid over the table and over each other, with cut edges and notches revealing the colour behind, and by price pieces hanging from a rail on chalk cords through punched holes.

**The Flat Card Rule.** No box shadows, drop shadows, glows, blur or glass, ever. If something needs to read as on top, cut its edge over what it covers.

## Shapes

Every corner is square (0px). Rectangles are reserved for buttons, the booking bar, form fields, the payment length and photos; section boundaries are always cut pattern edges.

The cut-edge vocabulary, each a 100 by 48 SVG stretched to the full width, with its chalk seam drawn 15 units inside:
- **Shoulder left**: a shoulder falling to the right.
- **Shoulder right**: a shoulder rising to the right.
- **Collar**: a neck curve at the left, then the shoulder falling to the right, as on the first screen and the `/book` and `/contact` pieces.
- **Armhole**: one long curve; also cut into the first screen's right edge on desktop to show the table.
- **Neck**: a neck curve at the right, shoulder falling to the left.
- **Hem edge**: the footer's top edge, the same neck and shoulder as the first screen, with one notch.

Notches are small triangles (14px; 10 by 16 on the step list) drawn apart from the stretched edge so they never distort. Price pieces each have their own outline (a jacket front, a shirt yoke, a back panel) and their own hem, so no two are alike.

## Components

### Buttons
Square, flat, and cut with one small notch in the top edge, 1.5rem in from the right (0.75rem wide, 0.5rem deep), which shows whatever is behind the button. The fill is a pseudo-element so the notch never clips the focus ring.
- **Shape:** square corners (0px), one notch.
- **Book a fitting:** lantern with chalk text, semibold; small (0.625rem by 1.25rem padding, small text) in the header, large (1rem by 1.75rem, lede text) in closing sections and the hero.
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
- **Seam:** a dashed chalk stroke (dash 8, gap 6), non-scaling, inside every cut edge and around empty photo slots.
- **Notch:** a small triangle cut into an edge, filled with the colour behind.
- **Grainline:** a vertical double arrow, its length set by its height.
- **Punched hole:** a 22px chalk ring; on `/pricing` filled navy to show the table through it, hanging from a chalk cord.

### Payment length
Everything paid after the free measurement drawn as one length to true scale: 40 parts deposit, 60 parts balance, with a notch at 40%. Deposit is navy and balance chalk on card; deposit is ochre and balance chalk on the table. One bar from 48rem; on phones each part takes its own row at its true length and position, with its text under its label.

### Photo slot
A plain rectangle with no shadow or radius. A photo fills it with `object-cover` and nothing moves when it arrives. Empty, it is a deep-ochre rectangle with a chalk seam outline and, at the bottom, "Photo needed" in semibold over the photo brief in fine text.

### [TODO] marker
Any unfilled fact from the content file shows in full inside a 1.5px dashed outline in the current text colour, 0.3em side padding, repeating on each wrapped line. A `[TODO]` contact detail is never a link.

### The chalk seam (signature)
One dashed chalk line runs down the home page's card, 10px inside the left edge on phones and 20px from 64rem, starting where the first screen's shoulder seam turns down, passing a notch at each numbered step, crossing the timber band and stopping at the footer's edge. Where scroll-driven animation is supported and motion is allowed, it draws itself with its tip held a quarter of the way up the screen (`cubic-bezier(0.16, 1, 0.3, 1)` easing family; linear on the scroll timeline). Otherwise it is drawn whole and static.

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
- **Do** design at 390 by 844 first; the photo slot gives way before the tagline, offer and price.
- **Do** put Saigon on timber, and name a section's city wherever the content does.

### Don't:
- **Don't** use shadows, radii, pills, glass, glows, or colour gradients. The ruled message field's hard-edged lines are drawn lines, not a gradient fill.
- **Don't** use tracked uppercase labels or eyebrows above headings.
- **Don't** add a third typeface, handwriting fonts, icon-library icons or emoji; all marks are drawn in this repo as inline SVG.
- **Don't** use lantern red as a line, stripe or decoration, put a star on red, or lay three parallel stripes on ochre.
- **Don't** overlap pieces for decoration; a piece only sits on one that comes later in the process.
- **Don't** add scroll or entrance animation beyond the chalk seam.
- **Don't** use `tabular-nums` on Besley.
- **Don't** lay out a row of identical cards; price pieces differ in shape and size.
- **Don't** drift toward luxury (dark photo grounds, gold, hushed serif) or back to the old site (cream ground, red accent, hairlines). Chalk stays cool (#f0f3f4), never cream.
- **Don't** draw people or figures on the pattern pieces, or imply in visuals or copy that the workshop uses paper patterns unless the owner confirms it.
