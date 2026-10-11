# Building with Claude

These prompts, together with the rules in [CLAUDE.md](../CLAUDE.md), steer Claude away from a generic "vibe-coded" site: obvious AI design and copy, copyright problems and security holes. The step-by-step order for using them is in [GUIDE.md](../GUIDE.md#how-to-build-each-step-with-claude).

## How to use

The build rules (design, copy, honesty, security, accessibility, code quality) live in [CLAUDE.md](../CLAUDE.md). Claude Code reads that file automatically at the start of every session, so you never paste them.

1. Run `/clear` so each step starts fresh.
2. Name the step. [CLAUDE.md](../CLAUDE.md) already loads `GUIDE.md` and `docs/website.md`, and tells Claude when to read the tech-stack and legal docs, so you don't attach anything:

   ```text
   Do Step 2 (Home page).
   ```

3. Attach your real assets when a step needs them: logo, photos, prices, wording you've written.
4. After each page or feature, paste the review prompts below so Claude audits its own work.
5. Before going live, work through the pre-launch checklist yourself. Don't rely only on AI review.

To change a rule for every session, edit [CLAUDE.md](../CLAUDE.md).

## Review prompts

Run these after each page or feature. Each asks Claude to judge the work as a strict outsider would, not to defend it.

**Design and copy audit**

```text
Review the page you just built as a demanding creative director who hates generic AI-made websites. List every place that looks like a template or AI output: gradients, centred hero, identical card grids, decorative icons, overused fonts, scroll animations everywhere. Then list every phrase that sounds AI-written (elevate, seamless, curated, timeless, "not just X", triplets, em-dash overuse, vague claims). For each item, show the fix. Then apply the fixes.
```

**Security audit**

```text
Act as a security reviewer. Audit the code for: exposed secrets or keys, missing server-side validation, XSS (raw HTML from user input), missing spam protection or rate limits on forms, unverified webhooks, card data touching our server, missing security headers, personal data (names, phone numbers, body measurements) in URLs, logs or analytics, verbose error messages, outdated or unknown npm packages (run npm audit), and unprotected admin routes. Rank findings high/medium/low, explain each in plain English, and fix the high ones.
```

**Legal, honesty and copyright audit**

```text
Check the site for: invented reviews, ratings, customer numbers, awards or press mentions; text or images copied or closely imitated from other brands; images or fonts without a commercial licence; brand or mill names we haven't confirmed; unclear or misleading country-of-origin claims; prices that don't show AUD including GST; refund wording that conflicts with Australian Consumer Law; and a privacy policy that doesn't cover body measurements. List each issue with the exact location and a suggested fix. Mark anything I should check with a lawyer.
```

## Pre-launch checklist

Check these yourself before the site goes live. AI review can miss things.

- [ ] Every [TODO] and placeholder is replaced with real content
- [ ] No made-up reviews, ratings, customer numbers or awards anywhere
- [ ] All photos are your own or properly licensed, with sources recorded
- [ ] The site says clearly that suits are made in Saigon
- [ ] Prices are in AUD including GST, and payment terms match: free measurement, 40% deposit, balance at final fitting
- [ ] A lawyer or a template service has checked the privacy policy and refund policy
- [ ] A test booking works end to end, including the confirmation email and SMS
- [ ] A test deposit in Square sandbox mode works, and no card details touch your own site
- [ ] Forms reject spam and show friendly errors
- [ ] No API keys appear in the page source (view source and search for "key" and "secret")
- [ ] Security headers pass at securityheaders.com
- [ ] Lighthouse mobile scores 90+ and the site works on your own phone
- [ ] You can use the site with the keyboard alone, and the contrast checker passes
- [ ] Read every page aloud: if a sentence sounds like an ad or a robot, rewrite it

