# Rules for every redesign step

You are doing one step of the Saigon Cut redesign. The plan is in `redesign/README.md`. The owner started this step, and that is their OK for it under `CLAUDE.md`, so don't stop to present a plan or wait for approval.

The redesign replaces how the site looks and how pages are structured. It does not change what the business offers, what it charges, or how the forms and bookings work.

## Using Impeccable

Follow the `impeccable` skill's Setup section, including `impeccable context`, before doing anything else. If the skill isn't already loaded, load it with the Skill tool. `PRODUCT.md` is the owner-approved product record, so don't run `init` or reopen it.

From step 03 on, the visual world is settled. Read it with `.claude/skills/impeccable/scripts/impeccable surface-brief read src/app/page.tsx`. Treat each page as a precisely specified surface inside that world: don't run `concept-seed` or `serve-question`, and don't reopen the direction.

The finish review and `DESIGN.md` belong to step 10. Don't run them earlier.

## Where Impeccable and CLAUDE.md disagree, CLAUDE.md wins

Follow every rule in `CLAUDE.md`. These are the places where Impeccable's guidance would otherwise pull the other way:

- **Facts.** Impeccable says to author any missing content. Not here. `src/content/site.ts` is the only source of business facts. Every `[TODO]` marker stays in place and stays visible on the page. Never fill one in, and never add a claim, number, name, review or guarantee. You may reword copy to fit a layout, as long as it says the same thing and follows section 2 of `CLAUDE.md`.
- **Imagery.** Impeccable says to ship real imagery. There are no photos yet, and `CLAUDE.md` rules out AI-generated people, stock photos that look like customers, abstract 3D shapes and fake product shots. Don't generate or download images. Keep photo slots as clearly labelled placeholders through `PhotoSlot`, and add new slots to `site.photos` when the design needs them, each with a brief. Every page must look deliberate with the placeholders showing, and better once photos arrive. Layouts must not depend on how a photo happens to be cropped.
- **Palette and type.** The colour families and the serif and sans pairing in `PRODUCT.md` are the owner's. How they're used is open. Off-white doesn't have to be cream, and colour can own whole regions of a page.
- **Motion.** Keep it subtle, and respect `prefers-reduced-motion`. No fade-up on every element.

If a rule stops you doing something the step asks for, don't quietly break it. Write it down in `redesign/NOTES.md`.

## Don't change these

`package.json`, `package-lock.json`, `next.config.ts`, `.env.example`, `CLAUDE.md`, `GUIDE.md`, `docs/`, `src/lib/`, `src/app/contact/actions.ts` and `src/components/contact/Turnstile.tsx`.

Add no packages. Fonts come from Google Fonts through `next/font`, and motion is CSS.

`CalEmbed.tsx` reads `--color-lantern`, `--color-lantern-dark` and `--color-paper` from `globals.css` at runtime. Keep those token names, or update `CalEmbed.tsx` in the same step.

## Working conditions

- The dev server runs at `http://localhost:3111`. Don't start or stop servers. If it isn't responding, say so in your final message.
- To see your work, run `node redesign/tools/shot.mjs pricing` with any of `home`, `pricing`, `book` and `contact`. It writes `<page>-desktop.png`, `<page>-mobile.png` and `-fold.png` versions to `.impeccable/review/`, and reports sideways scrolling and h1 counts. Look at the phone screenshots first, because most visitors arrive from Instagram on a phone.
- Follow `AGENTS.md`: read the relevant guide in `node_modules/next/dist/docs/` before using a Next.js API you aren't sure of.
- Use the Bash tool for commands, not PowerShell. You start in the repo root, so don't use `cd`, and keep temporary files inside `.impeccable/`.
- Run one command per call, with no `;`, `&&`, loops or `echo $?`. Chained commands get refused, and you're told the exit status anyway.
- These commands are allowed. With nobody at the keyboard, anything else gets refused, so don't give up on checking your work because one command was refused:
  - `.claude/skills/impeccable/scripts/impeccable <verb>`
  - `npm run lint`, `npm run build`, `npx tsc --noEmit`, `npx eslint`, `npm audit`, `npm ls`
  - `node redesign/tools/shot.mjs`
  - `git status`, `git diff`, `git log`, `git show`
  - `curl -s http://localhost:3111/<path>`
  - `rm src/<path>` for files nothing uses any more, and `rm .impeccable/<path>` for your temporary files
- Don't commit, push or change branches. The runner commits after its checks pass.
- An earlier attempt may have left partial work. Check `git status` first and carry on from there.
- Delete components and tokens that nothing uses any more. No dead code.

## When nobody can answer

If no one is at the keyboard, the owner has told you to proceed. Choose whatever keeps to `CLAUDE.md`, and record the choice in `redesign/NOTES.md`. Impeccable's closing questions are already answered: fix priority 0 and 1 issues, keep the tone of the direction contract, and treat the facts in `site.ts` as off limits.

Add to `redesign/NOTES.md` under a heading for this step: decisions the owner may want to reverse, rule conflicts, and anything only the owner can supply. Keep it short and specific.

End with a short message saying what changed and what's still open.
