# Step 06: book a fitting page

Use the `impeccable` skill. Build `/book` from scratch inside the world, following the line about it in the surface brief. This is where the site's one job gets finished, so keep it calm and direct. Read `.claude/skills/impeccable/reference/craft-floor.md` before editing.

Files: `src/app/book/page.tsx` and `src/components/book/`. Keep the page's `metadata`.

The page must still contain, with all content from `site.ts`:

- the Cal.com calendar, working, through `BookingCalendar` and `CalEmbed`
- the labelled placeholder that `BookingCalendar` shows when `calUsername` is empty, and its "Calendar not loading?" links to Cal.com and the phone number
- a short line above it: measurement is free, nothing to pay when you book, what happens at the visit, and no obligation to order
- the appointment's length, where it happens, its cost, and the travel fee (a `[TODO]` for now)
- a link to `/pricing`

Keep the calendar's colours in step with the new tokens. Its iframe sets its own background, so check how it sits against the page in `book-desktop.png` and `book-mobile.png`. On a phone, the calendar should be reachable with little scrolling.

Done when: the calendar loads in the page and looks like part of it, and a visitor can tell it's free before they pick a time.
