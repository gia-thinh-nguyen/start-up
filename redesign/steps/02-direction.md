# Step 02: choose the visual direction

This is the one step that needs the owner. They choose the look; nothing gets built here.

Use the `impeccable` skill to replace the site's visual world. Follow `reference/new-work.md`, sections 1 to 5, and stop before section 6.

- **Type of work:** a redesign. Keep the product truth, content and function. Treat the old look as evidence and anti-reference, never as something to polish.
- **Surface:** the home page, `src/app/page.tsx`, in Persuade mode. The world must also carry `/pricing`, `/book` and `/contact`.
- **Why the old look is being replaced:** Impeccable's detector flags `cream-palette` and `hero-eyebrow-chip` on all four pages. A cream ground, high-contrast serif, red accent and hairlines with tracked labels is one of the looks its calibration warns about, so don't land there again.
- **The biggest current weakness:** on a phone, an empty photo placeholder fills most of the first screen, pushing the name, the offer and the sense of what this is down the page. The direction must solve the first phone screen, with and without a photo.
- **Pinned by the owner:** the colour families and the serif and sans pairing in `PRODUCT.md`. Everything else about how they're used is open. Resolve any collision between a roll and these pins as `new-work.md` describes, field by field.
- **Also fixed:** the "Book a fitting" bar at the bottom of phone screens stays (`docs/website.md`), so the direction has to work with it. Don't add a second fixed bar at the top on phones.
- **Build path:** code-led. Image generation isn't available here, and `CLAUDE.md` rules out generated people and product shots anyway.

Ask the questions in section 2, then run `concept-seed` and present the decision page with `serve-question`. The owner chooses, and may re-roll or steer. Don't choose for them unless you were told to proceed without them.

Save the choice with:

`.claude/skills/impeccable/scripts/impeccable surface-brief write src/app/page.tsx <body-file> src/app/pricing/page.tsx src/app/book/page.tsx src/app/contact/page.tsx`

The brief must hold the six-block direction contract from section 5. Add one or two lines for each of the other three pages on how its structure should use the world, because later steps build from this brief without coming back to the owner. Check that it saved by reading it back.

Don't change any file in `src/`, and don't write `DESIGN.md`. When the direction is saved, tell the owner: "Direction saved. Type /exit to continue."
