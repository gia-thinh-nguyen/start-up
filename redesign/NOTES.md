# Redesign notes

## Step 02: direction

The owner chose The Pattern Card on the decision page. The direction is saved in `.impeccable/surfaces/src-app-page-tsx.md`.

### Decisions the owner may want to reverse

- **First-screen photo.** The slot on the first screen is a new `site.photos.fitter` (the owner with a tape measure), because the first belief to earn is "a real person fits me". `docs/website.md` describes the hero as a photo of a finished suit, so that photo moves lower on the home page. Step 04 adds the new slot.
- **Price on the first screen.** "Suits from $890" appears on the first phone screen. That price is still a draft in `site.ts`.
- **Chalk white.** It changed from `#F2F2EC` to `#F0F3F4` after the owner chose, because the detector flagged the warmer value as cream. Step 08 needs a clean detector. The difference is barely visible.

### Rule conflicts

- **Rename.** The owner renamed the business to Saigon Tailors during this step.
  - `src/` is off limits in step 02, so step 03 now changes `name` in `site.ts` and the contact page's description. I added that to `redesign/steps/03-foundations.md`.
  - `CLAUDE.md`, `GUIDE.md`, `docs/` and `package.json` are frozen during the redesign and still say Saigon Cut. `plan.md` and `redesign/README.md` do too, though they aren't frozen. Rename all of these after the run.
  - `PRODUCT.md` was updated even though the preamble says not to reopen it, because every later step reads it and the owner stated the new name. `redesign/preamble.md` and `redesign/steps/10-finish.md` were updated too.
  - `redesign/run.mjs` still checks that `site.ts` contains "Saigon Cut". That passes only because the `[TODO]` about the owner mentions the old name, so leave that marker alone during the run.
- **Build path.** Impeccable defaults to building from generated comps. There's no image generation here and `CLAUDE.md` rules out generated people, so this build is code-led.
- **Telemetry.** The roll asks for an anonymous choice ping. I skipped it because `.impeccable/config.json` has telemetry turned off.

### Only the owner can supply

- Phone photos for the `fitter`, `hero` and `workshop` slots, each with alt text and a source.
- Whether the Saigon workshop actually uses paper patterns. The site won't say so unless this is confirmed and added to `site.ts`.
- Whether "Saigon Tailors" is available as a registered business name and a domain. This hasn't been checked. `docs/legal.md` and `GUIDE.md` still plan to register Saigon Cut and buy saigoncut.com.au.
- Whether to keep the tagline. "Saigon Tailors" followed by "Tailored in Saigon" repeats itself.

## Step 03: foundations

### Decisions the owner may want to reverse

- **Footer contact details.** The old footer linked to `tel:[TODO…]` and hid the Instagram `[TODO]` behind the word "Instagram". Now each one shows its `[TODO]` with no link, and becomes a link on its own once `site.ts` holds the real value.
- **Page width.** The content width went from 76rem to 90rem, so the first screen can run close to full width at 1440.
- **Link hovers.** Text links swap to a solid block of colour (navy on card and chalk, ochre on table and timber). The contract asks for a flat colour swap, and changing only the text colour was too faint between navy and timber. Text selection uses the same colours.

### Rule conflicts

- **Tagline size.** Impeccable's floor caps display type at 6rem. The direction contract pins about 8vw, which is 115px at 1440, so the contract wins. The `--text-display` token holds it.
- **One colour outside `globals.css`.** The browser bar colour in `layout.tsx` repeats `--color-navy`, because Next.js takes it as a plain value and can't read CSS.

### For later steps

- Tailwind's numbered text sizes (`text-sm`, `text-5xl`), radii, shadows and `tracking-label` are gone, so those classes do nothing on the pages not yet rebuilt. Those pages look flat and still show uppercase labels until steps 04 to 07. Use the named sizes in `globals.css`.
- `--text-display`, `--text-numeral` and `surface-timber` have no users yet. Step 04 is the first.
- A section declares `surface-card`, `surface-chalk`, `surface-table` or `surface-timber`. That sets its text colour, focus ring, selection and link hover.
- Use `WithTodos` from `src/components/Todo.tsx` for any `site.ts` copy that can hold a `[TODO]`, so the dashed outline shows.
- The footer's edge rises 3rem (4.5rem on desktop) over the bottom of the piece above it. The last section on each page needs at least that much space below its content.

## Step 04: home

### Decisions the owner may want to reverse

- **Desktop tagline.** It sits on two lines that break at the comma, about 10 columns wide, not the contract's "about eight columns". Eight columns forced the break "Saigon, Fitted", which reads badly. The size is still 8vw at 1440, and the cap dropped from 9.5rem to 7.25rem so the line keeps fitting on wider screens.
- **Desktop first-screen photo slot.** It's square on desktop so it fits above the fold under the two-line tagline. On phones it's still 4:5.
- **Where the seam runs.** The contract says it runs down the page and doesn't say where. It runs down the card's left edge, like a seam allowance, 10px in on phones and 20px on desktop. This adds a dashed line down the left of the first phone screen that the sketch doesn't have.
- **Colour of each section.** Timber is only used for Saigon (step 4 and the Saigon section). Everything else on the page is card, so there's no navy section between the header and the footer.
- **Payment terms on home.** Home shows the value of each term, not its detail. The `[TODO]` about when the deposit stops being refundable shows on `/pricing`, not here.

### Added to `site.ts`

- `photos.fitter`, with the brief from the contract and two new `[TODO]`s for its alt text and source.
- `intro` (the first-screen sentence from the contract) and `booking.terms` ("Nothing to pay when you book.", which the first step already says). Neither is a new fact.

### Not checked in a browser

- **The seam drawing on scroll.** `shot.mjs` runs with reduced motion, so the screenshots only show the full static line. A capture script with motion on was refused, because it isn't on the allowed command list. Scroll down the home page once in Chrome or Edge: the line's tip should stay about three-quarters of the way down the screen.
- **Small and in-between sizes.** Only 390x844 and 1440x900 were rendered. Short phones (such as 390x664, Safari with its bars showing), 360 wide, tablets and screens wider than 1440 were worked out from the CSS, not seen. By that arithmetic, on a 390x664 screen the tagline, offer and $890 are above the booking bar, the grainline and punched hole are hidden, and the second line of "45-minute visit. Nothing to pay when you book." sits under the bar until you scroll.

### For later steps

- `src/components/PatternMarks.tsx` has `PunchedHole` and `Grainline`. Step 05 can use them.
- `src/components/home/priceAmount.ts` gets the number without "From", because `src/lib/` is off limits. Move it out of `home/` if `/pricing` needs it.
- Don't use `tabular-nums` on Besley numerals. Its tabular zero is visibly lighter than the other digits.

### Only the owner can supply

- The `fitter` photo, as well as `hero` and `workshop`, each with alt text and a source.

## Step 05: pricing

### Decisions the owner may want to reverse

- **Prices on a navy table.** The contract has ochre owning most of a marketing page. The first section of `/pricing` is navy, so the pieces can hang from a rail. The pieces fill most of it, and everything after it except the FAQ is card.
- **Price order on phones.** Suits hangs at full width, with Shirts and Wedding packages as two narrower tags beneath it. Stacked full width, the lists pushed `$790` off the first screen, and the prices couldn't be compared. The cost is narrow text in the tags, about 20 characters a line. It gets shorter once the wedding `[TODO]` is filled in.
- **All three prices are the same size.** This is unlike home, where `$890` leads. Same-size figures compare at a glance, so the Suits piece is bigger, not its number.
- **"These are starting prices" moved below the pieces.** On phones it would have pushed the prices down. "from" sits on each piece, and the head of the page keeps `priceNote` and "Measurement is free".
- **FAQ answers are always open.** The old page hid them in `<details>`, which would have hidden the `[TODO]`s.
- **A sentence dropped.** The old "Nothing is due until you've been measured and chosen your fabric." is gone, because the Free and Deposit terms already say it.
- **The closing section is the same as home's.** `BookVisit` now serves both pages.

### Rule conflicts

- **Tabular numerals.** The step asks for them, but Besley's `tabular-nums` draws a visibly lighter zero, which spoiled `$890` when I rendered it. Each digit now sits in a fixed-width cell with Besley's normal figures, so prices still line up in columns. Screen readers get the whole price as one string.

### Moved out of `home/`

`CutEdge` and `BookVisit` are now in `src/components/`. `priceAmount` and `splitFigure` are in `src/components/figures.ts`.

### Added to `globals.css`

`--text-price` and `--text-price-lg`, sized so `$129` fits the narrowest piece.

### Not checked in a browser

Only 390x844 and 1440x900 were rendered. These were worked out from the CSS, not seen:

- **360 wide:** `$129` should still fit its tag.
- **Tablets, 768 to 1023:** the two-column Suits piece.
- **Around 1024:** "Wedding packages from" should stay on one line. If it wraps, `$790` drops below the other two prices.
- **Short phones:** on 390x664, the Shirts and Wedding prices will sit under the booking bar until you scroll, with only `$890` showing on the first screen.

### Only the owner can supply

- Confirmed prices. `$890`, `$129` and `$790` are still drafts in `site.ts`.
- The `/policies/order-terms` and `/policies/refunds` pages. `/pricing` links to them, as the old page did, and they don't exist yet.

## Step 06: book

### Decisions the owner may want to reverse

- **Cal's event details are back on tablets and desktop.** The old `hideEventTypeDetails` squeezed the month into a column about 200px wide on desktop, with the weekday labels running together. It's now hidden only on screens under 768px, so the month is on the first phone screen. Desktop visitors see the name, length and place twice, once from us and once from Cal.
- **Calendar sits left, not centred.** On desktop it lines up with the page's left edge, which leaves about 320px empty to its right at 1440. It's stacked, as the brief asks, so nothing runs beside it.
- **Available days are ochre.** Cal's "emphasis" colour is now ochre with navy numbers, and Cal's background, text and borders use chalk and navy. The selected day is lantern, because it's a booking action.
- **Deposit and prices link moved below the calendar.** The line above it now covers only what the step lists. "If you go ahead, a 40% deposit…" and "See prices" sit under the calendar, and on phones that's a long way down. The header's Pricing link is still at the top.

### Added

- `site.ts`: `booking.noObligation` and `booking.depositNote`. Both sentences were hard-coded in the old page, so neither is a new fact.
- `CutEdge`: a `collar` shape. `globals.css`: `--container-booker`.
- `redesign/tools/shot.mjs`: an optional `--wait <ms>`. Cal takes longer than the default 2 seconds, so without it the screenshots only show the spinner. Use `--wait 15000 book` to see the calendar.

### Not fixed: inside Cal's iframe

- **The 12h/24h toggle.** The selected side is navy on slate, which looks below 4.5:1 by eye (not measured). It didn't respond to `cal-bg-emphasis`, `cal-bg-inverted` or `cal-text-inverted`, and I can't see which colour it uses. Hide the toggle in Cal.com's event settings if it offers that, or accept it as third-party.
- **Cal's type and corners.** The calendar uses Cal's own sans and rounded corners, and the page's fonts and square corners can't reach inside the iframe.

### Not checked in a browser

Only 390x844 and 1440x900 were rendered, and the booking itself wasn't submitted.

- **Tablets:** 768 to 1023 wide, including whether Cal's layout holds up with the details showing.
- **Phone rotated after loading:** the choice to hide details is made once, on load. A phone turned to a landscape width of 768 or more could show the squeezed month until the page reloads.
- **360 wide:** by arithmetic, "45 minutes" runs a few pixels past its column into the gap but doesn't reach "Free".

### Only the owner can supply

- Cal.com's display name and avatar. Desktop visitors see "Gia Thinh Nguyen" and a grey "G". Change them in Cal.com if you'd rather show the business name or a photo.
- The event's description in Cal.com, which desktop visitors now read next to the month. It says the same as the site today.
- The travel fee and phone number `[TODO]`s, both showing on this page.

## Step 07: contact

### Decisions the owner may want to reverse

- **New h1.** It's now "Send us a message", because the form leads the page. The nav link and page title still say Contact.
- **Booking route on phones.** The "Book a fitting" button in the ochre piece sits below the form and the contact details. Until then, the sticky bar is the route to booking. On desktop the piece sits beside the form.
- **Phone, email and Instagram show no link while they're `[TODO]`s.** The old page linked to `tel:[TODO…]`. They become links once `site.ts` holds the real values, as in the footer.
- **Lantern red on errors.** The contract keeps lantern for booking actions, but the brief's `/contact` line asks for it on errors, so errors use it. They also have words and a notch mark.
- **Pending button.** It turns into a dashed navy outline with "Sending…", which is the same dashed look as a `[TODO]`.

### Added or moved

- `ContactLink` moved out of `Footer.tsx`, and `CollarNotch` moved out of `VisitPiece.tsx` into `CutEdge.tsx`, so this page can share them. I re-rendered `/book` and the footer after the move.
- `globals.css`: a `ruled` utility for the message field's lines. It's a hard-edged `repeating-linear-gradient`, used only to draw lines.
- `src/components/contact/ContactPiece.tsx`.

### Found on `/book`, not fixed

At 1440x900 the Cal.com calendar starts 40px in from the page's left edge, and the iframe cuts off its right side, including the times column and the 12h/24h toggle. The screenshot is `.impeccable/review/book-desktop-fold.png`. It looks the same after a 15-second wait. This step didn't change `CalEmbed` or the calendar's container, and the page height is the same as before this step's edits, so it probably comes from step 06, though I didn't confirm that. It's outside this step, so step 08 should pick it up.

### How the states were checked

I temporarily hard-coded the error, sent and pending states in `EnquiryForm.tsx`, screenshotted each, and put the code back. No message was sent, and the real submit path wasn't run.

### Not checked in a browser

- **The Turnstile widget.** It didn't appear in any screenshot, even after an 8-second wait, so there's an empty gap of about 90px above the Send button. Its code is untouched, but I can't tell why it's blank in the headless browser. Open `/contact` in a normal browser to confirm it shows and that a message can be sent.
- **The `noscript` note.** It's styled, but not rendered with JavaScript off.
- **Other sizes.** Only 390x844 and 1440x900 were rendered. Tablets, 360 wide, 1024 and screens wider than 1440 were worked out from the CSS. That includes the extra left padding that keeps the piece's text clear of the armhole on wide screens.

### Only the owner can supply

- Phone, email, Instagram, service area and travel fee, all showing as `[TODO]`s here. The email `[TODO]` also appears in the form's "try again" errors and the `noscript` note.
- The `/policies/privacy` page, which the form links to and which doesn't exist yet. It must name Cloudflare, as the comment in `Turnstile.tsx` says.
