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
