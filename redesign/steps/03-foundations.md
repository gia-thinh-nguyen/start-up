# Step 03: foundations

Use the `impeccable` skill. Build the chosen world into the parts every page shares. Read `.claude/skills/impeccable/reference/craft-floor.md` before editing.

Rebuild these from the direction contract, rather than restyling what's there:

- `src/app/globals.css`: colour, type, spacing and motion tokens. Every value the site uses lives here. Also theme the browser surfaces: text selection, focus rings, underline offset and scrollbars.
- `src/app/layout.tsx`: fonts through `next/font/google`. Keep the skip link, the `metadata`, and the rule that keeps non-production builds out of search results.
- `src/components/Header.tsx` and `src/components/Footer.tsx`. All links and contact details still come from `site.ts`, and the policy links stay.
- `src/components/BookButton.tsx` and `src/components/StickyBookButton.tsx`. The sticky bar stays on phones and stays hidden on `/book`.
- `src/components/PhotoSlot.tsx`. The placeholder is on screen until photos arrive, so it must belong to the world while plainly saying that a photo is needed and what to shoot.

Also apply the owner's rename, which is the one fact this step changes. In `src/content/site.ts`, set `name` to `"Saigon Tailors"`. In the `metadata` of `src/app/contact/page.tsx`, replace the hardcoded "Saigon Cut" with `site.name`. Leave every `[TODO]` exactly as it is.

The four pages will look unfinished between steps. That's expected. They must still build and render.

Done when: on phone and desktop, the header, footer, booking button, sticky bar and an empty photo slot all clearly belong to the new world.
