# Website MVP guide

Your step-by-step to-do list for getting the Saigon Cut website live. Work from top to bottom and tick boxes as you go. Finish each step before starting the next.

**MVP goal:** a live site where people can see prices and book a free fitting. Everything else waits until after launch.

**MVP pages:** Home · Pricing · Book a fitting · Contact · Policies, plus a sticky "Book a fitting" button on phones.

**Timeline:** about 5 weeks.

| Part | When | What |
|---|---|---|
| 1. Decisions and materials | Start now | Prices, terms, photos |
| 2. Accounts and setup | Week 1 | ABN, domain, Cal.com, Square, GitHub, Vercel |
| 3. Build | Weeks 2–4 | 7 build steps |
| 4. Launch | Week 5 | Checks, domain, soft launch |

---

## Part 1. Decisions and materials (start now)

The code isn't what holds up a launch; these are. You can build with `[TODO]` placeholders, but you can't go live until every box here is ticked.

**Decisions**

- [ ] Starting prices ("from $X", AUD including GST) for suits, shirts and wedding packages
- [ ] Standard turnaround (weeks) and the minimum lead time for weddings
- [ ] Studio address or home-based? Home-visit service area and any travel fee
- [ ] Fit guarantee terms (e.g. free alterations within X days of the final fitting)
- [ ] When the deposit becomes non-refundable
- [ ] Trading name: Saigon Cut or Saigon Cut Tailoring
- [ ] Tagline: "Tailored in Saigon, Fitted in Melbourne" or "The Sharpest Cut from Saigon to Melbourne"

**Materials**

- [ ] Logo (a simple text wordmark is fine for now)
- [ ] 3–5 photos of finished suits: your own, or licensed for commercial use. The owner and friends wearing samples is fine until a professional shoot. Write down the source of every photo.
- [ ] A few rough sentences in your own words: who the owner is, how the process works, why Saigon
- [ ] List of suburbs covered by home and office visits

---

## Part 2. Accounts and setup (week 1)

**Business**

- [ ] Search the name on IP Australia (trademark check) before buying or printing anything
- [ ] Get an ABN and register the business name with ASIC
- [ ] Buy saigoncut.com.au (needs the ABN), plus the .com if available
- [ ] Set up Google Workspace with a hello@ address
- [ ] Set up a Google Business Profile: photos, hours, service area
- [ ] Get public liability insurance before the first home visit

**Tools**

- [ ] **Cal.com:** create the event types, booking questions, rules and reminders listed in [docs/tech-stack.md](docs/tech-stack.md#calcom-setup), and connect the owner's Google Calendar
- [ ] **Square:** create the account, order a card reader, and turn on sandbox mode for testing
- [ ] **Airtable:** create the order tracker with the stages in [docs/operations-and-marketing.md](docs/operations-and-marketing.md#behind-the-scenes-not-on-the-website)
- [ ] **GitHub:** create a **private** repo and push this project to it
- [ ] **Vercel:** import the repo so every push gets a preview link you can open on your phone

Done when: a test booking made on Cal.com shows up in the owner's Google Calendar and sends a confirmation email.

---

## Part 3. Build (weeks 2–4)

### How to build each step with Claude

The build rules are in [CLAUDE.md](CLAUDE.md), which Claude Code loads automatically. You don't paste them.

1. Run `/clear`, then name the step, e.g. `Do Step 2 (Home page).` CLAUDE.md already loads this guide and `docs/website.md`.
2. Read Claude's plan, approve it, and let it build.
3. Run the three review prompts (design and copy, security, legal) from [docs/claude-prompts.md](docs/claude-prompts.md#review-prompts).
4. Check it on your phone using the Vercel preview link.
5. Commit and push.

### Step 1. Foundations

- [ ] Fonts from Google Fonts: a refined serif for headings, a clean sans for body text
- [ ] Colour and spacing tokens: ochre, lantern red, timber brown, navy, off-white
- [ ] Header with navigation; footer with contact details, Instagram and policy links
- [ ] Sticky "Book a fitting" button on phones
- [ ] One content file (e.g. `src/content/site.ts`) holding prices, phone, email, turnaround and service area. When Sanity is added after launch, only this file changes.

Done when: an empty page with header, footer and sticky button looks right on both phone and desktop.

### Step 2. Home page

- [ ] Hero: one strong suit photo, the name, the tagline and a "Book a fitting" button
- [ ] How it works: book → measure → choose fabric → made in Saigon → final fitting in Melbourne, with the turnaround in weeks
- [ ] Clearly says suits are made in Saigon and fitted in Melbourne
- [ ] Links to the pricing page

Done when: someone who reads the page for 10 seconds knows what you sell, where it's made, and how to book.

### Step 3. Pricing page

- [ ] "From $X" prices in AUD including GST, and what each price includes
- [ ] Measurement is free
- [ ] Payment terms: free measurement, 40% deposit when ordering, balance at the final fitting
- [ ] Short FAQ: turnaround, alterations, fit guarantee

Done when: every price and term matches your Part 1 decisions, or is clearly marked `[TODO]`.

### Step 4. Book a fitting page

- [ ] Cal.com embedded in the page, showing the public event types
- [ ] A short line above it: measurement is free, no payment at booking, what to expect at the fitting

Done when: a test booking made from your site lands in the owner's Google Calendar and sends the confirmation.

### Step 5. Contact page

- [ ] Phone, email, service area and Instagram link
- [ ] Short enquiry form (name, contact details, message) for people not ready to book
- [ ] Form protection: server-side validation, a honeypot field, Cloudflare Turnstile and rate limiting
- [ ] Form emails sent through Resend to the hello@ address (verify your domain in Resend first)

Done when: a real enquiry arrives in the inbox, and a submission with the honeypot field filled in is rejected.

### Step 6. Policies

- [ ] Privacy policy, refund policy and order terms pages, drafted from a reputable template service and matching your Part 1 decisions
- [ ] Rules to follow are in [docs/legal.md](docs/legal.md). Never write "no refunds".
- [ ] Send the drafts to a lawyer or template service for review (this can take a while, so send them now)

Done when: the drafts are on the site and sent for review.

### Step 7. SEO, analytics and security

- [ ] A title and description for every page, plus `sitemap.xml` and `robots.txt`
- [ ] LocalBusiness structured data
- [ ] Analytics (Plausible or GA4) tracking "Book a fitting" clicks and completed bookings; mention it in the privacy policy
- [ ] Security headers: Content-Security-Policy, HSTS, X-Content-Type-Options, Referrer-Policy, frame-ancestors
- [ ] A simple, on-brand 404 page

Done when: Lighthouse on mobile scores 90+ and securityheaders.com passes.

---

## Part 4. Launch (week 5)

- [ ] Every `[TODO]` and placeholder is replaced with real content
- [ ] The lawyer-checked policies are on the site
- [ ] Work through the whole [pre-launch checklist](docs/claude-prompts.md#pre-launch-checklist) yourself
- [ ] Upgrade Vercel to Pro (~US$20/month; the free Hobby plan doesn't allow commercial sites) and connect the domain
- [ ] Add the website link to the Google Business Profile and the Instagram bio
- [ ] Soft launch: friends and family book test fittings and tell you what confused them
- [ ] Print a small card with a QR code to ask every client for a Google review at the final fitting

---

## After launch

Add these one at a time, in this order. Details for each are in [docs/website.md](docs/website.md).

1. Our story page
2. Lookbook and fabrics
3. Weddings page
4. Full FAQ page
5. Reviews section (real reviews only)
6. Trust strip
7. Sanity CMS, so the owner can edit content without you
8. Instagram feed and the Cal.com → Airtable webhook

After that come the larger features (gift vouchers, client accounts, order status updates) and the cloud engineering side project in [docs/order-platform.md](docs/order-platform.md).
