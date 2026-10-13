# Tech stack: reasons and setup

Why each tool was picked, the alternatives considered, and how to set them up. The short version is in [plan.md](../plan.md).

**MVP note:** the MVP skips Sanity. Content lives in one file in the code (e.g. `src/content/site.ts`) and moves to Sanity after launch.

## Platform options

| Option | Tools | Best for |
|---|---|---|
| No-code | Squarespace with built-in Acuity scheduling | Fast launch, polished templates, booking and payments in one place |
| No-code + shop | Shopify with a booking app | Selling ready-made items (ties, shirts, gift vouchers) early |
| **Custom build (chosen)** | Next.js, Sanity CMS, Cal.com bookings, Square payments | Full control and future client accounts; more upkeep |

If you need to be live in a week, Squarespace + Acuity is still a fine stopgap and the content carries over.

## Layer by layer

| Layer | Pick | Why | Cost to start |
|---|---|---|---|
| Framework | Next.js (App Router) | Fast, good SEO, works with every tool below | Free |
| Hosting | Vercel Pro | Best fit for Next.js. The free Hobby plan is for non-commercial use only, so a business site needs Pro (or use Netlify / Cloudflare Pages, whose free tiers allow commercial use) | ~US$20/month |
| CMS | Sanity (after launch) | See comparison below | Free plan |
| Booking | Cal.com | See comparison below | Free plan (AU SMS uses credits) |
| Payments | Square | Deposits and balances are taken in person, including at home/office visits; card reader + invoices | Per-transaction fees only |
| Clients and orders (launch) | Airtable (or Notion / Google Sheets) | Track measurements, fabric, deposit, production stage | Free tier |
| Client accounts (later) | Supabase (Postgres + login) | Saved measurements behind a proper login with access rules | Free tier to start |
| Email | Google Workspace (hello@ address) + Resend for form emails | Professional address; reliable website emails | Low monthly |
| Analytics | Plausible or GA4 | Track "Book a fitting" clicks and completed bookings | Free to low |
| Instagram feed | Behold (after launch) | Simple Instagram embed for Next.js | Free tier |
| Spam protection | Cloudflare Turnstile + honeypot field + rate limiting | Keeps bots off the enquiry form without annoying real people | Free |
| Fonts | Google Fonts (refined serif for headings, clean sans for body) | Free commercial licence; no Inter/Roboto-everywhere look | Free |

## Booking: Cal.com

| Tool | Strengths | Weaknesses | Verdict |
|---|---|---|---|
| **Cal.com** | Embeds natively in Next.js (React embed), so booking feels like part of the site; unlimited event types; custom booking questions; Google Calendar sync; webhooks to send bookings to Airtable/Supabase; free for one user; SMS and WhatsApp reminder workflows on every plan | SMS to Australian numbers uses paid credits (only US/Canada SMS is free); its built-in payments are Stripe-only (not needed, since booking is free) | **Pick** |
| Square Appointments | Free plan for one staff member includes unlimited SMS and email reminders in Australia; same app as Square payments; customer directory for notes | Booking page looks like Square, less control over design and questions | Best alternative if you want booking, payments and client notes in one app |
| Calendly | Polished, well known | SMS reminders, branding removal and workflows are on paid plans | Skip |
| Acuity | Good intake forms | Only makes sense on Squarespace | Only for the no-code path |

### Cal.com setup

- **Event types** (home visits only, no studio). The slug and length must match `booking.event` in `src/content/site.ts`:
  - Home or office visit (`home-visit`), 45 min, Melbourne metro only, attendee enters an address, 30 min travel buffer
  - Wedding party consult: after launch, with the Weddings page. Decide first whether it includes measuring.
  - Final fitting, 30 min (hidden: private link sent to clients, not shown publicly)
- **Booking questions:** occasion, date needed by, number of suits (for wedding parties), budget range, style references (link or upload), mobile number for SMS, how they heard about you
- **Rules:** at least 24 hours' notice, a cap on bookings per day, synced with the owner's Google Calendar so personal events block slots
- **Reminders:** email confirmation on booking; SMS 24 hours before and 2 hours before home visits
- **Webhook (after launch):** each new booking creates a client record in Airtable automatically

## CMS: Sanity (after launch)

| CMS | Strengths | Weaknesses | Verdict |
|---|---|---|---|
| **Sanity** | Hosted, so there's no server to maintain; generous free plan (20 users, 10,000 documents, 100 GB assets); strong image cropping and focal points, ideal for the lookbook; live visual editing with Next.js; structured content for prices, fabrics, FAQs, reviews | Needs some developer setup; its query language (GROQ) takes a little learning | **Pick** |
| Payload | Open source, runs inside the Next.js app, built-in logins, so it could also power client accounts | You run the database and file storage yourself; more upkeep | Choose instead if you want content and client accounts in one system |
| Storyblok | Best drag-and-drop page builder for non-technical editors | Paid tiers get expensive quickly | Only if the owner wants to build whole pages |
| Keystatic / TinaCMS | Git-based, free, simple | Weaker for image-heavy galleries and non-technical editing | Skip |
| Contentful | Enterprise grade | Expensive and more than this site needs | Skip |

### Content to model in Sanity

- **Site settings:** phone, email, address/service area, Instagram, turnaround time, booking link
- **Price items:** suit, shirt, wedding package; "from" price, what's included
- **Fabrics:** name, mill (only once you've confirmed you stock it), composition, weight, season, colour, swatch photo, price tier
- **Image credits:** source and licence for every photo, so you can prove you're allowed to use it
- **Lookbook entries:** photos, fabric used, occasion, styling notes
- **Reviews:** name, quote, photo, occasion, date, source (Google/Instagram)
- **FAQs:** question, answer, category
- **Policies:** privacy, refunds, order terms

Keep client measurements and personal details **out of the CMS**. They go in Airtable now and Supabase later, both with proper access control.

## Payments: Square

**Payment model:** booking and measurement are free. Customers pay a 40% deposit when they place the order (after measuring and choosing fabric), and the balance at the final fitting.

- Square's card reader works anywhere, including home/office visits, for both the deposit and the balance.
- Square Invoices cover anyone paying remotely.
- Square Gift Cards cover the later gift-voucher phase.

Card fees as of Oct 2026 are about 1.6% in person and 2.2% online in Australia; check current rates. Only add Stripe if you later build a custom online checkout.
