# Southern Passage — Plan

Oct 5, 2026 · @Tim

**Start here:** [GUIDE.md](GUIDE.md) is the step-by-step to-do list for the website MVP.

## The business

Southern Passage is a Melbourne start-up selling made-to-measure suits: made in Saigon, Vietnam, measured and fitted in Melbourne by the owner.

- **Name:** Southern Passage (or Southern Passage Tailoring)
- **Tagline:** Tailored in Saigon, Fitted in Melbourne (alternative: The Sharpest Cut from Saigon to Melbourne)
- **Product:** tailored suits (not silk); shirts, wedding and group packages later
- **Website goal:** get people to book a fitting, not to check out a cart
- **Payment model:** free measurement, 40% deposit when ordering, balance at the final fitting

## Tech stack

| Layer | Pick | When |
|---|---|---|
| Website | Next.js (App Router, TypeScript) | MVP |
| Hosting | Vercel Pro (~US$20/month) | MVP |
| Booking | Cal.com | MVP |
| Payments | Square (card reader in person, Invoices remotely) | MVP |
| Orders and clients | Airtable | MVP |
| Email | Google Workspace (hello@) + Resend for form emails | MVP |
| Spam protection | Cloudflare Turnstile + honeypot + rate limiting | MVP |
| Analytics | Plausible or GA4 | MVP |
| Fonts | Google Fonts | MVP |
| Content (CMS) | One content file in the code for the MVP, then Sanity | After launch |
| Instagram feed | Behold | After launch |
| Client accounts | Supabase | Later |

Reasons, alternatives and setup details: [docs/tech-stack.md](docs/tech-stack.md).

## Roadmap

| Phase | Timing | Work |
|---|---|---|
| 0. Setup | Week 1 | Decisions, accounts, domain ([GUIDE.md](GUIDE.md) parts 1–2) |
| 1. Build MVP | Weeks 2–4 | Home, pricing, booking, contact, policies ([GUIDE.md](GUIDE.md) part 3) |
| 2. Launch | Week 5 | Lawyer check of policies, pre-launch checklist, soft launch, first reviews |
| 3. Grow | Months 2–6 | Our story, lookbook, weddings, FAQ, reviews, Sanity, gift vouchers, blog, partner outreach, small ad tests |
| 4. Scale | Month 6+ | Client accounts, order status updates, accessories shop |
| Side project | After launch | Order platform: cloud engineering portfolio project |

## All docs

| File | What's in it |
|---|---|
| [GUIDE.md](GUIDE.md) | Step-by-step to-do list for the MVP, open decisions |
| [CLAUDE.md](CLAUDE.md) | Build rules Claude Code follows automatically (design, copy, security, accessibility) |
| [docs/website.md](docs/website.md) | Site map, what each page and component contains, later features |
| [docs/tech-stack.md](docs/tech-stack.md) | Why each tool, Cal.com setup, Sanity content model, payments |
| [docs/claude-prompts.md](docs/claude-prompts.md) | How to prompt each step, review prompts, pre-launch checklist |
| [docs/legal.md](docs/legal.md) | ABN, GST, insurance, policies, honest marketing, imports |
| [docs/operations-and-marketing.md](docs/operations-and-marketing.md) | Order tracker, workshop handoff, photography, marketing ideas |
| [docs/order-platform.md](docs/order-platform.md) | Cloud engineering portfolio project (Go, AWS, k3s, Terraform) |
