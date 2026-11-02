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
