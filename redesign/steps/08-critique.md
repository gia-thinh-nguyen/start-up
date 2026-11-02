# Step 08: critique and audit

Use the `impeccable` skill to review the whole site as a strict outsider, then fix what it finds.

1. Run `critique` on each of `/`, `/pricing`, `/book` and `/contact`. Apply the priority 0 and 1 fixes for each page before moving to the next. Close each one with `Questions skipped: owner already answered in redesign/preamble.md`.
2. Run `audit` across all four pages and fix anything critical or high: accessibility, contrast, responsive behaviour and performance.
3. Run `harden` on the enquiry form and the booking page: errors, long text, and what happens when the calendar or Turnstile fails to load. The server code stays as it is.
4. Run the detector on the live site and fix what it finds:

   `.claude/skills/impeccable/scripts/impeccable detect --no-advisory http://localhost:3111/ http://localhost:3111/pricing http://localhost:3111/book http://localhost:3111/contact`

   A `[TODO]` marker that looks awkward isn't a finding to fix. It has to stay visible until the owner replaces it.

A detector finding can only be ignored if it's a clear false positive you can explain. Use the narrowest ignore the skill's `reference/hooks.md` describes, name the evidence in `--reason`, and list it in `redesign/NOTES.md`. Never ignore a finding just to get past this step.

Put lower-priority issues in `redesign/NOTES.md` rather than fixing them all.

Done when: all four pages have had their priority 0 and 1 fixes, the audit has no critical or high issues left, and the detector is clean.
