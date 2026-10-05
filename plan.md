# Southern Passage — Website Plan

Oct 5, 2026 · @Tim

## Business context

Southern Passage is a Melbourne start-up selling made-to-measure suits: made in Saigon, Vietnam, measured and fitted in Melbourne by the owner.

- **Working name:** Southern Passage (full trading name option: Southern Passage Tailoring)
- **Tagline:** Tailored in Saigon, Fitted in Melbourne
- **Alternative tagline:** The Sharpest Cut from Saigon to Melbourne
- **Product:** tailored suits (not silk); shirts, wedding and group packages later
- **Main website goal:** get people to book a fitting, not to check out a cart

---

## Recommended tech stack

### Platform options

| Option | Tools | Best for |
|---|---|---|
| No-code | Squarespace with built-in Acuity scheduling | Fast launch, polished templates, booking and payments in one place |
| No-code + shop | Shopify with a booking app | Selling ready-made items (ties, shirts, gift vouchers) early |
| **Custom build (chosen)** | Next.js, Sanity CMS, Cal.com bookings, Square payments | Full control and future client accounts; more upkeep |

The rest of this plan assumes the custom build. If you need to be live in a week, Squarespace + Acuity is still a fine stopgap and the content carries over.

### Custom build, layer by layer

| Layer | Pick | Why | Cost to start |
|---|---|---|---|
| Framework | Next.js (App Router) | Fast, good SEO, works with every tool below | Free |
| Hosting | Vercel Pro | Best fit for Next.js. The free Hobby plan is for non-commercial use only, so a business site needs Pro (or use Netlify / Cloudflare Pages, whose free tiers allow commercial use) | ~US$20/month |
| CMS | **Sanity** | See comparison below | Free plan |
| Booking | **Cal.com** | See comparison below | Free plan (AU SMS uses credits) |
| Payments | **Square** | Deposits and balances are taken in person, including at home/office visits; card reader + invoices | Per-transaction fees only |
| Clients and orders (launch) | Airtable (or Notion / Google Sheets) | Track measurements, fabric, deposit, production stage | Free tier |
| Client accounts (later) | Supabase (Postgres + login) | Saved measurements behind a proper login with access rules | Free tier to start |
| Email | Google Workspace (hello@ address) + Resend for form emails | Professional address; reliable website emails | Low monthly |
| Analytics | Plausible or GA4 | Track "Book a fitting" clicks and completed bookings | Free to low |
| Instagram feed | Behold | Simple Instagram embed for Next.js | Free tier |
| Spam protection | Cloudflare Turnstile + honeypot field + rate limiting | Keeps bots off the enquiry form without annoying real people | Free |
| Fonts | Google Fonts (refined serif for headings, clean sans for body) | Free commercial licence; no Inter/Roboto-everywhere look | Free |

### Booking: why Cal.com

| Tool | Strengths | Weaknesses | Verdict |
|---|---|---|---|
| **Cal.com** | Embeds natively in Next.js (React embed), so booking feels like part of the site; unlimited event types; custom booking questions; Google Calendar sync; webhooks to send bookings to Airtable/Supabase; free for one user; SMS and WhatsApp reminder workflows on every plan | SMS to Australian numbers uses paid credits (only US/Canada SMS is free); its built-in payments are Stripe-only (not needed, since booking is free) | **Pick** |
| Square Appointments | Free plan for one staff member includes unlimited SMS and email reminders in Australia; same app as Square payments; customer directory for notes | Booking page looks like Square, less control over design and questions | Best alternative if you want booking, payments and client notes in one app |
| Calendly | Polished, well known | SMS reminders, branding removal and workflows are on paid plans | Skip |
| Acuity | Good intake forms | Only makes sense on Squarespace | Only for the no-code path |

**Cal.com setup**

- **Event types:**
  - Studio fitting, 60 min
  - Home or office visit, 75 min, Melbourne metro only, attendee enters an address, 30 min travel buffer
  - Wedding party consult, 45 min
  - Final fitting, 30 min (private link sent to clients, not shown publicly)
- **Booking questions:** occasion, date needed by, number of suits (for wedding parties), budget range, style references (link or upload), mobile number for SMS, how they heard about you
- **Rules:** at least 24 hours' notice, a cap on bookings per day, synced with the owner's Google Calendar so personal events block slots
- **Reminders:** email confirmation on booking; SMS 24 hours before and 2 hours before home visits
- **Webhook:** each new booking creates a client record in Airtable automatically

### CMS: why Sanity

| CMS | Strengths | Weaknesses | Verdict |
|---|---|---|---|
| **Sanity** | Hosted, so there's no server to maintain; generous free plan (20 users, 10,000 documents, 100 GB assets); strong image cropping and focal points, ideal for the lookbook; live visual editing with Next.js; structured content for prices, fabrics, FAQs, reviews | Needs some developer setup; its query language (GROQ) takes a little learning | **Pick** |
| Payload | Open source, runs inside the Next.js app, built-in logins, so it could also power client accounts | You run the database and file storage yourself; more upkeep | Choose instead if you want content and client accounts in one system |
| Storyblok | Best drag-and-drop page builder for non-technical editors | Paid tiers get expensive quickly | Only if the owner wants to build whole pages |
| Keystatic / TinaCMS | Git-based, free, simple | Weaker for image-heavy galleries and non-technical editing | Skip |
| Contentful | Enterprise grade | Expensive and more than this site needs | Skip |

**Content to model in Sanity**

- **Site settings:** phone, email, address/service area, Instagram, turnaround time, booking link
- **Price items:** suit, shirt, wedding package; "from" price, what's included
- **Fabrics:** name, mill (only once you've confirmed you stock it), composition, weight, season, colour, swatch photo, price tier
- **Image credits:** source and licence for every photo, so you can prove you're allowed to use it
- **Lookbook entries:** photos, fabric used, occasion, styling notes
- **Reviews:** name, quote, photo, occasion, date, source (Google/Instagram)
- **FAQs:** question, answer, category
- **Policies:** privacy, refunds, order terms

Keep client measurements and personal details **out of the CMS**. They go in Airtable now and Supabase later, both with proper access control.

### Payments

**Payment model:** booking and measurement are free. Customers pay a 40% deposit when they place the order (after measuring and choosing fabric), and the balance at the final fitting.

**Use Square for all payments:**

- Its card reader works anywhere, including home/office visits, for both the deposit and the balance.
- Square Invoices cover anyone paying remotely.
- Square Gift Cards cover the later gift-voucher phase.

Card fees as of Oct 2026 are about 1.6% in person and 2.2% online in Australia; check current rates. Only add Stripe if you later build a custom online checkout.

---

## Site map

- **Home:** hero, how it works (short), featured looks, reviews, booking button
- **How it works**
- **Pricing**
- **Lookbook & fabrics**
- **Weddings** (new, see below)
- **Our story**
- **FAQ**
- **Book a fitting**
- **Contact**
- **Policies:** privacy, refunds, order terms

---

## Launch components

These make up the first version of the site. Every page should lead to the "Book a fitting" button.

| # | Component | What it contains |
|---|---|---|
| 1 | Hero section | One strong photo of a finished suit, the name and tagline, a "Book a fitting" button |
| 2 | How it works | Book → measure → choose fabric → made in Saigon → final fitting and adjustments in Melbourne, with turnaround time |
| 3 | Pricing | Transparent "from $X" prices (AUD, including GST) for suits, shirts and wedding packages, plus what's included and that measurement is free |
| 4 | Fabrics and lookbook | Gallery of fabrics, finished suits and styling ideas |
| 5 | Our story | The owner as tailor, the Saigon workshop, why it's quality and value; clearly states where suits are made |
| 6 | Booking | Cal.com embed: free measurement booking (studio or home/office visit), calendar, SMS reminders; no payment at booking |
| 7 | Reviews and client photos | Real testimonials and photos only, added as soon as you have them; link to Google reviews. Until then, leave the section out or use a clearly marked placeholder. Never invent reviews (fake reviews breach Australian Consumer Law) |
| 8 | FAQ | Turnaround, alterations, fit guarantee, wedding party lead times, payment terms (free measurement, 40% deposit when ordering, balance at final fitting) |
| 9 | Contact and location | Address or service area, map, phone/email, Instagram feed, short enquiry form for people not ready to book |
| 10 | Policies | Privacy policy, a refund policy that follows Australian Consumer Law for custom-made goods, and order terms |
| 11 | Weddings page (new) | Groom and groomsmen packages, lead times ("book 3+ months before"), group pricing, booking button; ranks for "wedding suits Melbourne" |
| 12 | Sticky mobile button (new) | "Book a fitting" fixed to the bottom of the screen on phones; most visitors will come from Instagram on mobile |
| 13 | Trust strip (new) | Fit guarantee, "Measured in Melbourne, made in Saigon", free measurement, star rating only once real Google reviews exist |

---

## Behind the scenes (not on the website)

- **Client and order tracker (Airtable):** one record per order, moving through these stages:
  - Booked → Measured → Deposit paid → In production → Shipped → Arrived → Final fitting → Balance paid → Done
  - Store measurements, fabric, style choices (lapel, buttons, lining, vents), fitting photos and notes.
- **Standard measurement sheet:** the same fields every time, so the Saigon workshop gets consistent orders and the data moves cleanly into client accounts later.
- **Workshop handoff:** a fixed order format (PDF or shared sheet) with measurements, fabric code, style options and photos, plus a confirmed ship date.
- **Google Business Profile:** set up before launch, since it's the main way to appear for "tailor near me" and "suits Melbourne". Add photos, hours and service area.
- **Photography:** one professional shoot of 3–5 finished suits is the most valuable early marketing spend; until then, use the owner and friends wearing samples.
- **Imports:** shipments from Vietnam over A$1,000 need a formal import declaration, with duty and GST possibly owing. The Australia–Vietnam free trade agreements can cut duty with a certificate of origin. Ask a customs broker once.

---

## Marketing and growth suggestions

- **Reviews:** ask every client at the final fitting for a Google review and a photo. A small card with a QR code makes it easy.
- **Local SEO:**
  - A page per search intent: "made-to-measure suits Melbourne", "wedding suits Melbourne", "groomsmen suits"
  - LocalBusiness and FAQ structured data on the site
- **Instagram content:** fitting before/afters, fabric close-ups, Saigon workshop behind the scenes, "suit of the week".
- **Referral offer:** for example, $50 off the next order for both the client and the friend they refer.
- **Wedding partners:** venues, photographers, celebrants and bridal shops; offer a referral fee or a styled-shoot collaboration.
- **Vietnamese-language touchpoints (optional):** a Vietnamese FAQ or Instagram posts for Melbourne's large Vietnamese community (Footscray, Richmond, Springvale, Sunshine); the Saigon connection is a strong story here.
- **Conversion tracking:** measure "Book a fitting" clicks → bookings → orders so you know which channels actually make sales.

---

## Legal and business setup

- **ABN and business name:** get an ABN and register "Southern Passage" (or "Southern Passage Tailoring") with ASIC.
- **Trademark check:** search IP Australia before buying the domain and printing anything.
- **Domains:** southernpassage.com.au (needs an ABN), plus the .com if available.
- **GST:** register once turnover reaches A$75,000 (or earlier if it suits you).
- **Insurance:** public liability, especially for home and office visits.
- **Order terms:**
  - Deposit terms (e.g. the deposit becomes non-refundable once fabric is cut)
  - What counts as an alteration vs a remake
  - How long the fit guarantee lasts
  - What happens if a client misses the final fitting
- **Refund policy:** under Australian Consumer Law you don't have to refund change-of-mind on custom goods, but consumer guarantees still apply. Never write "no refunds".
- **Privacy policy:** under the Privacy Act, list what you collect (names, contact details, body measurements, photos) and where it's stored (Cal.com, Airtable, Square).
- **Lawyer check:** have a lawyer or a reputable template service review the refund policy, privacy policy and order terms before launch.
- **Country of origin:** say clearly that suits are made in Saigon. Never use "Made in Australia" or vague origin claims.
- **Prices:** always show AUD including GST.
- **Honest marketing:** no invented reviews, ratings, customer counts, awards or press mentions anywhere, including ads and Instagram.
- **Copyright:** use only your own photos or ones licensed for commercial use, and keep a record of each image's source. Never copy text, layouts, logos or images from other brands. Don't name fabric mills or brands you haven't confirmed you stock.

---

## Later-phase components

Add these once bookings are steady.

- **Gift vouchers:** an easy extra source of revenue (Square Gift Cards)
- **Wedding and group bookings:** a groomsmen package with a group discount, often the most profitable orders
- **Client accounts:** saved measurements for quick reorders (Supabase login + data from Airtable)
- **Online shop:** ties, shirts, pocket squares and other accessories
- **Blog or style guide:** suit care, what to wear to weddings, fabric guides (helps Google search)
- **Order status updates (new):** automatic email/SMS at each stage (in production, shipped, ready for fitting); this reassures clients during the overseas wait
- **"Need it by?" checker (new):** client enters their event date and sees whether there's time and the latest date to book
- **Reorder flow (new):** returning clients pick a new fabric and reuse saved measurements, with a quick check-fit appointment
- **Interstate/regional clients (new):** video consult, then fitting on a scheduled Melbourne visit or a trip to their city

---

## Building with Claude

These copy-paste prompts steer Claude away from a generic "vibe-coded" site: obvious AI design and copy, copyright problems and security holes.

### How to use

1. Start a new chat and paste the master build prompt, adding your task on the last line.
2. Attach your real assets: logo, photos, prices, wording you've written.
3. After each page or feature, paste the matching review prompt so Claude audits its own work.
4. Before going live, work through the pre-launch checklist yourself. Don't rely only on AI review.

### Master build prompt

Paste this whole block at the start of a build session. Replace the bracketed parts.

```text
You are a senior web designer and engineer building the website for Southern Passage, a Melbourne made-to-measure suit business. Suits are made in Saigon, Vietnam; I measure and fit customers in Melbourne. Tagline: "Tailored in Saigon, Fitted in Melbourne". The site's one job is to get people to book a free measurement. Payment model: free measurement, 40% deposit when ordering, balance at the final fitting.

Tech stack: Next.js (App Router, TypeScript) on Vercel, Sanity CMS, Cal.com embed for bookings, Square for payments, Cloudflare Turnstile for form spam protection.

Work to the standard of an independent design studio, not a template. Follow every rule below. If a rule blocks something I ask for, tell me instead of quietly breaking it.

## 1. Design — avoid the "AI-generated" look
Do NOT use:
- purple/blue/pink gradients, glowing blobs, glassmorphism or neon accents
- the default hero: giant centred headline + subheading + two buttons over a gradient
- a row of three identical feature cards with icons, repeated down the page
- emoji or generic icon-library icons as decoration
- Inter/Roboto/system font everywhere; pill-shaped everything; heavy drop shadows on every card
- fake dashboards, abstract 3D shapes or AI-generated people
- animations on every element (fade-up on scroll everywhere)
DO:
- design an editorial, menswear-appropriate look: a refined serif for headings paired with a clean sans for body text, loaded from Google Fonts
- use a restrained palette: ochre, deep lantern red, dark timber brown, navy, off-white; define colours and spacing as tokens
- vary layouts between sections (asymmetric grids, full-bleed photos, text beside images)
- let real photography carry the page; leave clearly labelled image slots where I must add my own photos
- keep motion subtle and respect prefers-reduced-motion

## 2. Copy — avoid AI writing patterns
Do NOT use these words or patterns: elevate, unlock, seamless, curated, bespoke experience, timeless elegance, "tailored to perfection", "in today's fast-paced world", "whether you're X or Y", "not just X, it's Y", groups of three adjectives, rhetorical questions as headings, exclamation marks, and heavy use of em dashes.
DO: write short, plain, specific Australian English sentences in a warm, confident voice. Use concrete facts (turnaround in weeks, what's included, where suits are made). If you don't know a fact, write [TODO: …] instead of inventing it.

## 3. Honesty, copyright and Australian law
- Never invent reviews, testimonials, client names, star ratings, customer counts, awards or press mentions. Use clearly marked placeholders. (Fake reviews breach Australian Consumer Law.)
- Never copy text, layouts, logos or images from competitor sites or other brands.
- Only use images I supply or ones with a licence that allows commercial use; record each image's source. No stock photos that look like real customers.
- Only use fonts and icons with commercial-use licences (e.g. Google Fonts); list them.
- Don't name fabric mills or brands (e.g. famous Italian mills) unless I confirm we actually stock them.
- State clearly that suits are made in Saigon. No "Made in Australia" or vague origin claims.
- Show prices in AUD including GST.
- The refund policy must not suggest customers lose their Australian Consumer Law rights; flag it for my review.
- The privacy policy must cover what we collect (names, contacts, body measurements) under the Privacy Act; flag it for my review.

## 4. Security
- Never put API keys, secrets or tokens in front-end code or the repo; use environment variables and add .env to .gitignore.
- Never handle card numbers yourself; use Square or Stripe hosted checkout or their official SDK.
- Verify webhook signatures; validate and sanitise all form input on the server; escape all output; never render user input as raw HTML.
- Protect forms from spam (honeypot plus Cloudflare Turnstile or similar) and rate-limit form endpoints.
- Set security headers: Content-Security-Policy, HSTS, X-Content-Type-Options, Referrer-Policy, frame-ancestors.
- Treat body measurements as personal data: collect the minimum, store them securely, never in URLs, logs or analytics.
- Use only well-known, actively maintained packages. Confirm each package exists before installing it (no made-up package names), pin versions, and run npm audit.
- Error pages and API errors must not expose stack traces or internal details.
- Any admin area needs proper authentication; staging sites must be noindex.

## 5. Accessibility and performance
- Meet WCAG 2.2 AA: semantic HTML, one h1 per page, alt text on every image, visible focus states, full keyboard navigation, colour contrast of at least 4.5:1.
- Optimise images (modern formats, correct sizes, lazy-load below the fold). Aim for a Lighthouse score of 90+ on mobile.
- Design mobile-first; most visitors will come from Instagram on a phone.

## 6. Code quality
- Keep code readable: small components, clear names, no dead code, no unused dependencies, no giant copy-pasted blocks.
- Use TypeScript in strict mode.
- Explain any decision that has a trade-off, and list anything I must set up myself (accounts, keys, DNS).

Before writing code, give me a short plan: pages, sections, components and packages. Wait for my OK.

My task: [describe the task, e.g. "build the homepage"]
```

### Review prompts

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

### Pre-launch checklist

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

---

## Roadmap

| Phase | Timing | Work |
|---|---|---|
| 0. Setup | Week 1 | ABN, business name, domain, Google Workspace, Google Business Profile, Square, Cal.com, Airtable |
| 1. Build | Weeks 2–4 | Next.js + Sanity, components 1–13, Cal.com embed and webhook, analytics, policies. Use the master prompt every session and run the three review prompts after each page or feature |
| 2. Launch | Week 5 | Photos and copy loaded, lawyer check of policies, pre-launch checklist completed by hand, soft launch to friends and family, first reviews |
| 3. Grow | Months 2–6 | Wedding packages, gift vouchers, blog, partner outreach, small ad tests |
| 4. Scale | Month 6+ | Client accounts, order status updates, accessories shop |

---

## Open decisions

- [ ] Starting prices ("from $X") for suits, shirts and wedding packages
- [ ] Standard turnaround (weeks) and the minimum lead time for weddings
- [ ] Studio address or home-based? Home-visit service area and any travel fee
- [ ] Fit guarantee terms (e.g. free alterations within X days of the final fitting)
- [ ] When the deposit becomes non-refundable
- [ ] Trading name: Southern Passage or Southern Passage Tailoring
- [ ] Tagline: "Tailored in Saigon, Fitted in Melbourne" or "The Sharpest Cut from Saigon to Melbourne"
