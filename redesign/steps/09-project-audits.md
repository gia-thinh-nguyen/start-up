# Step 09: the project's own audits

`GUIDE.md` requires three reviews after any page work. Run the three prompts under "Review prompts" in `docs/claude-prompts.md`, in order, over all of `src/`:

1. Design and copy audit
2. Security audit
3. Legal, honesty and copyright audit

Judge the work as a strict outsider would, not as its author.

Fix everything you can inside the redesign's limits. Problems in protected files can't be fixed in this step, so record them in `redesign/NOTES.md` with a severity and a suggested fix.

`GUIDE.md` Step 6 (policies) and Step 7 (SEO, analytics, security headers, 404 page) haven't been built, and the redesign doesn't build them. List what's missing in `redesign/NOTES.md` in one short entry rather than building it or repeating it per page.

Mark anything the owner should check with a lawyer.

Done when: the three audits have run, what could be fixed is fixed, and every remaining finding is in `redesign/NOTES.md`.
