# Step 10: finish

Use the `impeccable` skill to close out the redesign, following `reference/new-work.md` section 7.

1. Run `polish` across all four pages.
2. Capture the final screenshots with `node redesign/tools/shot.mjs`, and open them to check they're valid.
3. Spawn the `impeccable-finish-reviewer` agent, fresh, with the packet section 7 lists: the original request ("remake the Saigon Tailors website with Impeccable"), the direction contract, the screenshot paths, the craft-floor path, and the current detector findings. Name all eight desktop and mobile screenshots as required. This is a code-led build, so there's no approved comp.
4. Act on its disposition as section 7 says, with at most two rounds, and record the final verdict at its actual scope.
5. Spawn the `impeccable-documenter` agent to write `DESIGN.md` and `.impeccable/design.json` from the built site. Check that both exist and that `DESIGN.md` holds real tokens.
6. Run `npm run lint`, `npm run build` and the detector one last time.

Then put a summary at the top of `redesign/NOTES.md` for the owner, in this order:

- The finish reviewer's verdict, in its own words.
- The chosen direction, in one sentence.
- What only the owner can supply: photos, facts, decisions. Include how many `[TODO]` markers remain in `src/`.
- Anything to check with a lawyer.
- Anything that's still wrong.

Keep the rest of the file below that summary.

Done when: the review and `DESIGN.md` are complete and the summary is written.
