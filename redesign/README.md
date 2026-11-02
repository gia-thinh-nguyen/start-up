# Redesign with Impeccable

Rebuilds how the Saigon Cut site looks, page by page, using [Impeccable](https://github.com/pbakaus/impeccable). All of it happens on the `redesign/impeccable` branch, one commit per step. `main` isn't touched and nothing gets pushed.

## What changes and what doesn't

**Rebuilt from scratch:** tokens, fonts, the header, footer and buttons, and all four pages (`/`, `/pricing`, `/book`, `/contact`).

**Kept as is:** business facts and every `[TODO]` in `src/content/site.ts`, the contact form's server code and spam protection, the Cal.com booking, and the tech stack. These work and have nothing to do with the look. Rewriting them would only add risk.

**Added:** no new runtime packages. Next.js moves to a patched version, and Impeccable is dev tooling that stays out of the site itself.

**Not part of this:** the policies and SEO work (`GUIDE.md` Steps 6 and 7).

## The steps

| Step | What happens | Who's needed |
|---|---|---|
| 01 setup | Create the branch, upgrade Next.js, install Impeccable 4.8.0, save screenshots of the old site | Nobody |
| 02 direction | Choose the visual direction in a browser page | **You, about 10 minutes** |
| 03 foundations | Tokens, fonts, header, footer, buttons, photo slots | Nobody |
| 04 home | Home page | Nobody |
| 05 pricing | Pricing page | Nobody |
| 06 book | Booking page | Nobody |
| 07 contact | Contact page and form states | Nobody |
| 08 critique | Impeccable's critique, audit, harden and detector, with fixes | Nobody |
| 09 project-audits | The three audits from `docs/claude-prompts.md` | Nobody |
| 10 finish | Polish, independent finish review, `DESIGN.md`, summary in `redesign/NOTES.md` | Nobody |

## Run it all

In the VS Code terminal, from the `saigon-tailors` folder:

```text
node redesign/run.mjs
```

Claude Code opens at step 02 so you can choose. Type `/exit` when it says the direction is saved, and everything else runs by itself. If it stops, fix what it reports and run the same command again: it carries on from the first step without a commit.

If Claude Code won't open in your terminal at step 02, do that step in the Claude Code panel instead, using the line under "Or run the steps yourself". Then rerun the command above. It sees the saved direction and moves on.

| Command | What it does |
|---|---|
| `node redesign/run.mjs --status` | Shows what's done and what's next |
| `node redesign/run.mjs --only 05` | Runs one step |
| `node redesign/run.mjs --unattended` | Skips your choice at step 02. A dice roll picks the direction, within your palette and fonts. |
| `node redesign/run.mjs --max-budget 40` | Sets the cap per Claude session (default $25) |

Sessions use your Claude Code plan or API account, at the model and effort in your settings.

## Or run the steps yourself

1. Run `node redesign/run.mjs --only 01`.
2. In a second terminal, run `npm run dev -- -p 3111` and leave it running.
3. For each later step, paste this into Claude Code with the step's own file name:

   ```text
   /impeccable Read redesign/preamble.md, then do redesign/steps/02-direction.md.
   ```

4. When a step finishes, run `node redesign/run.mjs --check 02`. It runs the checks and commits. Then run `/clear` and start the next step.

## What the script checks

A step only gets committed if all of these pass. If one fails, Claude gets one attempt to fix it, and then the run stops.

- Lint and build pass.
- Protected files are unchanged: `package.json`, `next.config.ts`, `src/lib/`, the form's server code, `CLAUDE.md` and `docs/`.
- Every `[TODO]`, price and core fact in `site.ts` is still there.
- No banned copy from `CLAUDE.md`.
- The colours the Cal.com calendar reads still exist.
- No page scrolls sideways on phone or desktop, and each has exactly one h1.
- From step 08 on, the Impeccable detector is clean. (The old site has 8 findings.)

These checks can't judge taste. Look at the result yourself before merging.

## Afterwards

Your folder stays on the `redesign/impeccable` branch. Read `redesign/NOTES.md`, then look at the site with `npm run dev`. To try alternatives for one element, use `/impeccable live` in Claude Code. If you're happy, merge the branch. If not, `git switch main` puts you back on the old site, exactly as you left it.
