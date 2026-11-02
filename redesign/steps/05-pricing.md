# Step 05: pricing page

Use the `impeccable` skill. Build `/pricing` from scratch inside the world, following the line about it in the surface brief. Read `.claude/skills/impeccable/reference/craft-floor.md` before editing.

Files: `src/app/pricing/page.tsx` and `src/components/pricing/`. Keep the page's `metadata`. Don't use a row of three identical cards.

The page must still contain, with all content from `site.ts`:

- each "from" price in AUD, formatted with `src/lib/price.ts`, with its unit and what it includes
- `priceNote`, unchanged, because it's where the GST wording goes later
- that measurement is free
- the payment terms: free measurement, 40% deposit when ordering, balance at the final fitting
- the short FAQ on turnaround, alterations and the fit guarantee, including its Australian Consumer Law sentence
- a way to book

Prices need tabular numerals, and a visitor should be able to compare them at a glance on a phone.

Done when: every price and term matches `site.ts`, and every open item still shows as `[TODO]`.
