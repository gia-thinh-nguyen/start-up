# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People in Melbourne who need a suit made to measure, including grooms and groomsmen ordering as a group. Most arrive from Instagram on a phone. They are deciding whether to trust a small business with a garment they haven't seen yet, and what it will cost.

Age, income and occupation have not been researched. Don't assume them.

## Product Purpose

The site has one job: get people to book a free measurement. Success is "Book a fitting" clicks that become bookings. It is not a shop, and there is no cart or online checkout.

## Positioning

Suits are cut and sewn to measure in Saigon, Vietnam. The owner measures and fits each customer in person in Melbourne, at the customer's home or office. Prices are published up front as "from" prices in AUD.

## Operating Context

- The customer path is: book, measure, choose fabric, made in Saigon, final fitting and adjustments in Melbourne.
- Payment: free measurement, 40% deposit when ordering, balance at the final fitting. Payments are taken outside the site with Square.
- Bookings run through a Cal.com calendar embedded in an iframe on `/book`.
- People not ready to book use the enquiry form on `/contact`, protected by a honeypot, Cloudflare Turnstile and rate limiting.
- On phones, a sticky "Book a fitting" bar stays on screen on every page except `/book`.

## Capabilities and Constraints

- Routes today: `/`, `/pricing`, `/book`, `/contact`. The footer links to `/policies/privacy`, `/policies/refunds` and `/policies/order-terms`, which are not built yet.
- All content and business facts live in `src/content/site.ts`, which moves to Sanity CMS after launch.
- Stack: Next.js App Router, TypeScript strict mode, Tailwind CSS v4, hosted on Vercel.
- Undecided, shown on the site as `[TODO]` markers: turnaround, wedding lead time, phone, email, Instagram, ABN, service area, travel fee, fit guarantee, alteration terms, when the deposit stops being refundable, and sentences about the workshop and the owner.
- The tagline is not final.
- Prices in `site.ts` are drafts awaiting confirmation.
- Not registered for GST, so prices don't mention it.

## Brand Commitments

Binding, from the owner's `CLAUDE.md`:

- Name: Saigon Tailors (the owner's rename of 2 November 2026; `CLAUDE.md` still shows the old name, Saigon Cut). Tagline: "Tailored in Saigon, Fitted in Melbourne".
- Palette: ochre, deep lantern red, dark timber brown, navy and off-white, defined as tokens.
- Type: a refined serif for headings and a clean sans for body text, both from Google Fonts.
- An editorial look appropriate to menswear, with layouts that vary between sections.
- Voice: short, plain, specific Australian English; warm and confident.
- Never: purple, blue or pink gradients, glowing blobs, glassmorphism, neon, emoji or generic icons as decoration, pill-shaped everything, heavy shadows on every card, abstract 3D shapes, AI-generated people, or scroll animation on every element.
- Always say plainly that suits are made in Saigon. Never "Made in Australia" or a vague origin claim.

## Evidence on Hand

- Photos: none yet. `src/content/site.ts` holds labelled slots for a hero photo and a workshop photo, and a brief for each.
- Logo: none. A text wordmark is the identity for now.
- Reviews, testimonials, ratings, client names, customer counts, awards and press: none exist. Never invent them. Fake reviews breach Australian Consumer Law.
- Fabric mills and brands: none confirmed. Don't name any.

## Product Principles

1. Every page leads to booking the free measurement.
2. Say where the suit is made and who fits it, in plain words, early.
3. Show the price and the payment terms before anyone has to ask.
4. Show only what is true today. A labelled gap is better than an invented fact.
5. Design for a phone first, because that's where people arrive.

## Accessibility & Inclusion

WCAG 2.2 AA: semantic HTML, one h1 per page, alt text on every image, visible focus states, full keyboard navigation, colour contrast of at least 4.5:1, and motion that respects `prefers-reduced-motion`.
