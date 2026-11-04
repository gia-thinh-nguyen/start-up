# Redesign notes

## Summary for the owner

### The finish reviewer's verdict

**ship**, in its words: "every material fix and regression is resolved: fixes 1 to 8 and regressions 1 to 3." It limits that: "This ship covers the scored fixes and regressions only, as seen in the captures I re-read. It is not a fresh review of the whole site." Its first review returned "fix" with eight items. Two rounds closed them, along with three regressions the first round caused.

### The direction

The Pattern Card: each page is a flat ochre tailor's pattern piece, with cut edges, notches and a chalk seam, laid on a navy cutting table. It says plainly that the suits are made in Saigon and that a real person measures and fits you in Melbourne.

### Only you can supply

- **Photos:** the `fitter` (you with a tape measure), `hero` (a finished suit, worn) and `workshop` slots, each with alt text, a source, and written consent from anyone pictured.
- **Facts:** 20 `[TODO]` markers remain in `src/content/site.ts`, and they show on the site. They cover:
  - turnaround and wedding lead time
  - phone, email and Instagram
  - service area and travel fee
  - when the deposit stops being refundable, alteration terms and the fit guarantee
  - a sentence about the workshop and one about you
  - alt text and a source for each of the three photos
  - the ABN

  The prices `$890`, `$129` and `$790` are drafts, flagged in a comment.
- **Decisions:**
  - whether to keep the tagline, which repeats "Saigon" after the new name
  - whether to rename "Book a fitting", since the site uses "fitting" for both visits
  - Cal.com's display name and avatar, which show "Gia Thinh Nguyen"
  - whether to hide Cal's 12h/24h toggle
  - the reversible design choices listed under each step below
- **Setup:**
  - the Turnstile keys in Vercel
  - the policy pages
  - security headers (GUIDE Steps 6 and 7)
  - confirmation that "Saigon Tailors" is free as a business name, trademark and domain

### Check with a lawyer

- **"Free" and "nothing to pay":** these sit beside an undecided travel fee.
- **"From" prices:** whether they include shipping and import costs, and whether they're achievable.
- **Deposit, alteration and fit guarantee wording:** keep the Australian Consumer Law line.
- **Privacy policy:** body measurements, and data going to Saigon, Cal.com, Zoho, Cloudflare, Square and Stripe.
- **Origin:** whether "Made in Saigon" is enough as a country-of-origin claim.
- **The business name:** before you print or buy anything.

Details are under Step 09.

### Still wrong or unproven

- **Broken links:** the policy pages don't exist, but the footer, `/pricing` and the form link to them, so those links return 404.
- **Security headers:** none are set yet. `npm audit` reports 17 dev-tool issues.
- **Cal's toggle:** the selected 12h/24h state inside the calendar looks low contrast by eye. Our colours can't reach it.
- **Not seen in a real browser:**
  - the seam drawing as you scroll
  - the calendar recovering after a window resize
  - a real booking or message sent end to end
  - a screen reader
  - a Lighthouse score
- **The reviewer's ceiling note, not fixed:** the seam reads as a straight rule down the margin more than as one drawn gesture.

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
- `scripts/shot.mjs`: an optional `--wait <ms>`. Cal takes longer than the default 2 seconds, so without it the screenshots only show the spinner. Use `--wait 15000 book` to see the calendar.

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

## Step 08: critique and audit

Critique scores, before fixes: home 19/32, pricing 23/36, book 17/32, contact 26/40. Audit: no critical or high site issues left. Detector (`--no-advisory`): clean on all four pages, with no ignores added.

### Decisions the owner may want to reverse

- **Booking bar hides while typing.** On `/contact` the phone bar disappears while a form field has focus. Above a keyboard it would cover the field, and a mis-tap would lose the message. `PRODUCT.md` says the bar stays on screen, so this is a small exception. To reverse it, remove the `has(...)` class in `StickyBookButton.tsx`.
- **Hero price label.** It now reads "Suits from AUD", then `$890`. `CLAUDE.md` requires AUD, but it's less graceful than "Suits from".
- **Step 1 copy.** It now says "This first visit is your free measurement", so "Book a fitting" isn't mistaken for the final fitting. The button label is unchanged. Whether to rename it is the owner's call, because the site uses "fitting" for both visits.
- **Service area and travel fee on closing sections.** Home and pricing now show those two `[TODO]`s next to "Book". The travel fee `[TODO]` also sits directly under "Free", because "nothing to pay" can't be fully trusted until it's answered.
- **`/book` order.** The deposit note and prices link moved above the calendar, with a visible "Pick a time" heading. Cal's details are hidden below 1024 wide, not 768.
- **Text width.** All body text is now capped at 38rem (`max-w-measure`). Tailwind's `max-w-prose` had been giving about 90 characters a line, not the 38rem the token intended, so some paragraphs re-wrapped and `/pricing` grew slightly on desktop.
- **Message limit.** The Message label now says "Up to 2,000 characters", because the field otherwise stops accepting text with no explanation.

### False positives, no ignore added

Both are advisories, so `--no-advisory` doesn't report them and no ignore was needed:

- `straggler` on `/contact`: the travel fee `[TODO]`, which has to stay as written.
- `repeating-stripes-gradient` on `body`: most likely the `ruled` message field, the only repeating gradient in `src`. It draws writing lines that scroll with the text.

The audit's own contrast sweep flagged Deposit and Balance on `/pricing` at 2.02:1. That's also false: the sweep can't see the navy bar drawn by a sibling element behind them. The text is chalk on navy.

### How failures were checked

`shot.mjs` gained `--block`, `--eval` and `--eval-file`.

- **Calendar blocked:** a "didn't load" alert with the other ways to book appears, and the page closes up. With Cal working, no alert appears after the 15-second timeout passes.
- **Turnstile blocked:** after 10 seconds a message above Send says the form can't send, and gives the email `[TODO]`. Step 07's blank widget is a capture artefact: it renders in a viewport tall enough to hold the page.
- **Errors:** real invalid submissions, with long values, show every field error and keep what was typed. Nothing was sent.
- **Sent state:** reached through the honeypot, so no email was sent.

### Not checked

- A real message or a real booking, end to end.
- The "Sending…" state since its change to `aria-disabled`. The code is simple, but it was never captured, because sends return too fast to catch without a throttle.
- A real phone: keyboard behaviour with the bar, and Instagram's in-app browser.
- A screen reader. The code follows the patterns, but nobody has listened to it.
- A Lighthouse score. It isn't on the allowed commands. Run it on the Vercel preview, since dev server numbers mean little.
- 360 wide was not rendered. 320 and 390 both pass.
- Seam drawing on scroll, still unseen with motion on (see step 04).

### Lower priority, not fixed

- **All pages:** the nav has no current-page mark.
- **Home:** prices and payment terms aren't grouped, and the link comes before the prices.
- **Home and pricing:** wedding buyers have one price and no lead time until the `[TODO]` is filled, and the unit line is small. There's no stated route for group orders.
- **Pricing:** on phones the Deposit and Balance labels sit far from the text they label, and the Balance text comes after the Deposit text. The FAQ has no link to `/contact`.
- **Book:** the calendar's frame starts about 24px right of the page's left edge on desktop, because of Cal's own padding. Nothing says what to do to reschedule or what to have ready. Those are facts for the owner.
- **Contact:**
  - After sending, the h1 and lede stay on screen, and no reply time is given because that fact doesn't exist yet.
  - The footer repeats the contact details just below the ochre piece.
  - The browser's own bubbles appear for empty required fields before the site's better-written errors.
  - The grainline beside the desktop Book button looks placed.
- **Reduced motion:** it's a global near-zero duration. That's harmless today because only colour swaps and the seam move.

### Outside the design work

- **`npm audit`:** 17 issues (16 moderate, 1 high). All sit under ESLint and `eslint-config-next`, so they're dev tooling and don't ship to visitors. `package.json` and the lockfile are frozen. Run `npm audit fix` after the redesign for the zod one, and don't use `--force`, which would install a much older eslint.
- **Security headers:** `next.config.ts` sets none yet, and the file is frozen here. `CLAUDE.md` section 4 requires them before launch, and the CSP must allow Cal.com and Cloudflare.
- **Build warning:** Next.js notices a stray `package-lock.json` in `C:\Users\Thinh`, outside this repo, and ignores it. It's harmless, but worth removing if it isn't needed.

### Only the owner can supply

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in Vercel. In production an empty site key means the form has no real spam check, and `Turnstile.tsx` is frozen, so the missing key is untested.
- How soon you reply to messages, and who reads them, if you want the sent message to say so.
- What a customer should have ready for the visit, and how to reschedule.
- Everything still open in earlier steps: photos, the `[TODO]` facts, confirmed prices and the policy pages.

## Step 09: project audits

All three prompts in `docs/claude-prompts.md` ran over `src/`. **LAWYER** marks anything to check with a lawyer. None of this is legal advice.

### Fixed, and the owner may want to reverse

- **Origin names the country.** The footer on every page now says "Made in Saigon, Vietnam." `/pricing`, `/book` and `/contact` didn't otherwise say Vietnam. Their search descriptions on `/book` and `/contact` didn't mention Saigon either, and now do.
- **Privacy line on the form.** "We only use your details to reply to you" is now "We use your details to reply to you". "Only" was an absolute promise, made with no policy behind it, and Resend and Cloudflare both handle data from this form. **LAWYER:** check the final wording against the privacy policy.
- **Home heading.** "How it works" is now "From booking to final fitting", because the old heading is on every template. The new one wraps to two lines on desktop.
- **Repeated copy on home.**
  - The Saigon section repeated step 4 word for word. It now says "Your measurements go to Saigon, Vietnam, and your suit is cut and sewn there." That follows from the existing copy, but the owner should confirm it.
  - Step 1 no longer says "nothing to pay when you book", which already appears on the first screen and in the closing section.
- **`/contact` marks.** I removed the punched hole and grainline floating beside the Book button on desktop, which step 08 said looked placed. The piece's edge and seam remain.
- **`/book` heading.** "Home or office visit" looks the same but is now a paragraph. It was an `h2` with nothing under it.

### Design and copy: flagged, kept on purpose

- **Stat-like numerals.** `Free`, `40%` and `45 minutes` are close to the stat-row template, most of all the three payment terms on home and the unlabelled `Free` on `/contact`. The direction contract asks for numbers to lead, so they stay.
- **"Suits from AUD".** It still reads awkwardly (see step 08). It's the plainest way to show AUD beside `$890` at that width.
- **Clean results.** No banned words, em dashes, exclamation marks or question headings beyond the FAQ's real questions. No gradients except the message field's ruled lines, no icon library, no scroll animation beyond the seam. Cal.com's rounded date cells sit inside its iframe.

### Security: open findings

Nothing here can be fixed in this step, because the files are protected or the work belongs to GUIDE Step 7.

| Severity | Finding | Where | Suggested fix |
|---|---|---|---|
| High before launch | No security headers. The dev server's response has no CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy` or `frame-ancestors`, and it sends `X-Powered-By: Next.js`. | `next.config.ts` | Add them in Step 7, and set `poweredByHeader: false`. The CSP must allow `app.cal.com` and `challenges.cloudflare.com`. Test bookings and the form on a preview afterwards. |
| Medium | The rate limit lives in memory, so each Vercel instance counts separately and it resets when the instance does. Turnstile and the honeypot carry most of the load. | `src/lib/rate-limit.ts` | Swap to `@upstash/ratelimit` before launch, or as soon as any spam gets through. |
| Medium | If the Turnstile site key is missing in production, the widget can't work and every real message is refused. It fails safely, but enquiries stop with an unhelpful "wait for the tick" message. The `spamCheckMissing` notice only covers the script not loading. | `Turnstile.tsx`, `src/lib/turnstile.ts`, Vercel settings | Set the keys, then send one real test message from the production URL. |
| Low | Failed validation counts toward the 10-an-hour limit, so someone correcting a form repeatedly could be locked out. | `src/app/contact/actions.ts` | Check the limit only after validation passes, leaving the honeypot and Turnstile where they are. |
| Low | The rate limit's IP header can only be trusted on Vercel. Elsewhere a visitor could fake it. | `src/app/contact/actions.ts` | No change while hosted on Vercel. Revisit if hosting moves. |
| Low | C1 control characters (`\u0080`–`\u009F`) aren't stripped from form input. Line breaks are handled, so a name still can't add lines to an email. | `src/lib/enquiry.ts` | Extend `controlChars`. |
| Low | `@types/node`, `@types/react`, `@types/react-dom`, `eslint` and `typescript` use `^` ranges, and `CLAUDE.md` says to pin versions. | `package.json` | Pin them after the redesign. |
| Low | `npm audit` reports 17 issues (16 moderate, 1 high), all in dev tooling under ESLint. `npm audit --omit=dev` finds none. | `package-lock.json` | `npm audit fix` after the redesign, without `--force`. |
| Low | If `calUsername` is ever set to null, the placeholder shows a source file path to visitors. | `BookingCalendar.tsx` | Keep it set in production. |

Checked with nothing found:

- **Secrets:** none in the repo, none in the production client bundle, and no `.env` file in git history. The one secret-pattern match, in `package-lock.json`, is part of a hash. The Turnstile "secret" in the source is Cloudflare's public test value, used only in development.
- **Forms:** input is validated on the server, there's no raw HTML, and email is plain text. Logs carry no visitor details.
- **Not present:** card data, body measurements, analytics, admin routes and webhooks. The last two need checking when Square is added.

### Legal, honesty and copyright: open findings

Clean: no invented reviews, ratings, counts, awards or press, no mill or brand names, no "Made in Australia", all prices in AUD, and no GST wording. No images are in the repo.

Fonts, both under the SIL Open Font Licence through Google Fonts: Besley and Be Vietnam Pro. All icons and marks are drawn in this repo.

| Location | Issue | Suggested fix |
|---|---|---|
| `site.ts` `payment[0]`, `booking.note`, `stops[0]`, `serviceArea.travelFee`; shown on home, `/pricing`, `/book`, `/contact` and the phone booking bar | **LAWYER.** From 5 November 2026, visits 25 to 40 km away pay a $15 travel fee when booking, while the site says "Measurement is free". The fee is stated beside "Free" on `/book`, `/pricing`, home's closing section and `/contact`, but not on home's first screen ("Free, at your home or office") or the phone booking bar ("Measurement is free"). "Nothing to pay when you book" was removed. | Ask whether "free" needs the fee beside it everywhere, including the first screen and the booking bar. |
| `site.ts` `serviceArea.feeRefund`; `/book` | **LAWYER.** The travel fee is refunded only if the customer cancels at least 24 hours before the visit, and always if the owner cancels. | Check the wording, and put the same rule in the refund policy. |
| `site.ts` `prices`; `/pricing` | **LAWYER.** The site says suits are shipped from Saigon but not who pays shipping or import costs. A "from" price must include compulsory charges, and must be a price someone can really get. | Confirm the `from` prices include shipping and any duty, and that `$890`, `$129` and `$790` are achievable. Then confirm the drafts. |
| `site.ts` `prices[0].includes`; `/pricing` intro | "Your choice of lapels, buttons and lining" is listed as included, while the page says the final price depends on the fabric and details chosen. | Say which choices can change the price. |
| `site.ts` `payment[1]`; `/pricing` | **LAWYER.** The owner's rule (5 November 2026): the 40% deposit is never refunded for a change of mind. The site says "the deposit isn't refunded if you change your mind" with the Australian Consumer Law sentence beside it. | Check the wording, and whether keeping the full 40% is fair under the unfair contract terms rules. Put the same rule in the order terms. |
| `site.ts` `faq[1]`, `faq[2]` | **LAWYER.** Alteration and fit guarantee terms are undecided. The Consumer Law sentence is already there and should stay. | Have the final terms checked. Never write "no refunds". |
| Privacy policy, not built | **LAWYER.** It must cover names, contact details, body measurements and photos. It must also cover data going overseas: measurements to the Saigon workshop, and data to Cal.com, Zoho (which holds the enquiry emails), Cloudflare, Square and Stripe (the travel fee, with the customer's email). IP addresses are checked by Cloudflare and briefly held for the rate limit. | Draft it in Step 6. Ask whether the form needs a fuller collection notice naming these providers. |
| `site.ts` `origin`, `intro`, `tagline` | **LAWYER.** "Made in Saigon" names a city, and the first screen doesn't say Vietnam. Fabric origin isn't stated. | Ask whether this is clear enough as a country-of-origin claim. `intro` is the contract's wording, so it was left. |
| `site.ts` `name`; footer | **LAWYER.** "Saigon Tailors" hasn't been checked as a business name, trademark or domain, and the ABN is a `[TODO]`. Nothing was checked in this step. | Search ASIC and IP Australia before printing or buying anything. |
| `site.ts` `photos` | Sources are all `[TODO]`. The `fitter` alt example shows a customer, who would have to agree to appear. | Record each source and get written consent from anyone pictured. |
| Cal.com account | Visitors see the owner's personal name in the booking link (`gia-thinh-nguyen`) and on the calendar. | The owner's choice. Change the username and `calUsername` together if the business name should show. |

### Not built: GUIDE Steps 6 and 7

- **Step 6:** the three policy pages. `/policies/privacy`, `/refunds` and `/order-terms` return 404, yet the footer, `/pricing` and the form's privacy line all link to them. **LAWYER:** the review is required before launch.
- **Step 7:** `sitemap.xml`, `robots.txt`, analytics, security headers, an on-brand 404 page and a Lighthouse run. There's also no favicon or social share image.

### Not checked

- A real message or booking, end to end, in this step.
- Headers on a production deployment. The check above ran against the dev server, and `next.config.ts` sets none.
- Whether Cal.com or Turnstile set cookies. The privacy policy needs this answer.

## Step 10: finish

Polish ran first, then the finish review with two fix rounds.

Final checks: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass. The detector (`--no-advisory`) is clean on all four pages. All eight desktop and mobile screenshots were re-captured and render correctly. `DESIGN.md` and `.impeccable/design.json` hold the real tokens.

### Decisions the owner may want to reverse

- **Payment length on phones is two rows.** On a 390px phone a single bar gives the 40% part about 140px, too narrow for the deposit's detail and its `[TODO]`. So on phones each part drops to its own row, still at its true length and position, with its text directly under its label. From 768 wide it's one notched bar. The alternative is one unlabelled bar above stacked values, which loses the label-over-value pairing.
- **Prices on home sit on the navy table.** This reverses step 04's "no navy section between the header and footer". The reviewer found Melbourne, Prices and Book ran as about 1,550px of unbroken ochre, so Prices is now its own piece with cut edges.
- **Home's payment terms are the notched 40/60 bar from `/pricing`** (`PaymentScale`), with Free and 40% stepped down so `$890` alone leads. The bar is two colours: navy and chalk on card, ochre and chalk on the table.
- **Closing sections.** "Book your free measurement" is a size smaller, so "45 minutes" leads.
- **`/book`.**
  - The sentence "We take your measurements and talk through the cut…" is gone, because it repeats home's step 2.
  - The figures carry visible labels, Length and Measurement, and Free's line is now "Nothing to pay when you book."
  - The calendar is centred on the page, with "Pick a time" and the deposit note on one row the calendar's width.
  - At 1440, four week rows show on the first screen.
- **`/contact`.** "Measurement" now labels the Free figure.
- **Nav.** The current page's link is underlined, and screen readers announce it as the current page.
- **Home's "See full prices" link** comes after the prices, not before them.
- **Wide screens.** The long seam, the step notches and the first screen's neck curve now run from the screen's left edge, not the page column. The first-screen photo slot's height stops at 28rem, and the armhole stops growing at 170px.
- **Tablets, 768 to 1023.** The Saigon and Melbourne photos sit beside their text instead of stacking.

### Tools

`shot.mjs` gained `--settle <ms>`. Its normal full-page shot briefly resizes the page, and Cal.com's calendar then sometimes laid itself out at 960px with its times column overflowing the frame. Use `--wait 25000 --settle 10000 book` for a clean `/book` capture.

### Not checked

- **Cal.com after a real window resize.** The overflow above only appeared when the capture tool resized the page. Resize a desktop browser window on `/book` once to confirm the calendar recovers.
- **Seam drawing on scroll.** It was measured with the animation applied by script at 390 and 1920: the tip stays three-quarters of the way down the screen. Nobody has watched it with motion on.
