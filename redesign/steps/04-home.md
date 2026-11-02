# Step 04: home page

Use the `impeccable` skill. Build the home page from scratch to match the direction contract's FIRST VIEWPORT, THESIS and STORY blocks. Read `.claude/skills/impeccable/reference/craft-floor.md` before editing.

Files: `src/app/page.tsx` and `src/components/home/`. Replace, rename or delete the existing components (`Hero`, `HowItWorks`, `SaigonMelbourne`, `PricesTeaser`) as the design needs.

The page must still contain, with all content from `site.ts`:

- the name, the tagline and a "Book a fitting" button, near the top
- the statement that suits are made in Saigon and fitted in Melbourne
- that measurement is free
- how it works: book, measure, choose fabric, made in Saigon, final fitting in Melbourne, with the turnaround (which shows as a `[TODO]` for now)
- a labelled slot for the hero photo and the workshop photo, and the Saigon and Melbourne text
- "from" prices, or a clear way to reach them, and a link to `/pricing`

Build the direction's signature interaction here if it names one.

Done when: someone who reads the first phone screen for 10 seconds knows what you sell, where it's made, and how to book. Check that against `home-mobile-fold.png`.
