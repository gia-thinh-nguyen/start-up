# Website: pages and components

What each page and component contains. **MVP** items are built before launch (see [GUIDE.md](../GUIDE.md)); the rest come after.

## Site map

| Page | When |
|---|---|
| Home: hero, how it works (short), booking button | MVP |
| Pricing | MVP |
| Book a fitting | MVP |
| Contact | MVP |
| Policies: privacy, refunds, order terms | MVP |
| How it works (full page) | After launch |
| Lookbook & fabrics | After launch |
| Weddings | After launch |
| Our story | After launch |
| FAQ | After launch (a short FAQ sits on the pricing page in the MVP) |

## Components

Every page should lead to the "Book a fitting" button.

| # | Component | What it contains | When |
|---|---|---|---|
| 1 | Hero section | One strong photo of a finished suit, the name and tagline, a "Book a fitting" button | MVP |
| 2 | How it works | Book → measure → choose fabric → made in Saigon → final fitting and adjustments in Melbourne, with turnaround time | MVP |
| 3 | Pricing | Transparent "from $X" prices (AUD; including GST once registered) for suits, shirts and wedding packages, plus what's included and that measurement is free | MVP |
| 4 | Booking | Cal.com embed: free measurement booking (studio or home/office visit), calendar, SMS reminders; no payment at booking | MVP |
| 5 | Contact and location | Address or service area, map, phone/email, Instagram link, short enquiry form for people not ready to book | MVP |
| 6 | Policies | Privacy policy, a refund policy that follows Australian Consumer Law for custom-made goods, and order terms | MVP |
| 7 | Sticky mobile button | "Book a fitting" fixed to the bottom of the screen on phones; most visitors will come from Instagram on mobile | MVP |
| 8 | Fabrics and lookbook | Gallery of fabrics, finished suits and styling ideas | After launch |
| 9 | Our story | The owner as tailor, the Saigon workshop, why it's quality and value; clearly states where suits are made | After launch |
| 10 | Reviews and client photos | Real testimonials and photos only, added as soon as you have them; link to Google reviews. Until then, leave the section out. Never invent reviews (fake reviews breach Australian Consumer Law) | After launch |
| 11 | FAQ | Turnaround, alterations, fit guarantee, wedding party lead times, payment terms (free measurement, 40% deposit when ordering, balance at final fitting) | After launch |
| 12 | Weddings page | Groom and groomsmen packages, lead times ("book 3+ months before"), group pricing, booking button; ranks for "wedding suits Melbourne" | After launch |
| 13 | Trust strip | Fit guarantee, "Measured in Melbourne, made in Saigon", free measurement, star rating only once real Google reviews exist | After launch |
| 14 | Instagram feed | Behold embed on the contact page | After launch |

## Later features

Add these once bookings are steady.

- **Gift vouchers:** an easy extra source of revenue (Square Gift Cards)
- **Wedding and group bookings:** a groomsmen package with a group discount, often the most profitable orders
- **Client accounts:** saved measurements for quick reorders (Supabase login + data from Airtable)
- **Online shop:** ties, shirts, pocket squares and other accessories
- **Blog or style guide:** suit care, what to wear to weddings, fabric guides (helps Google search)
- **Order status updates:** automatic email/SMS at each stage (in production, shipped, ready for fitting); this reassures clients during the overseas wait
- **"Need it by?" checker:** client enters their event date and sees whether there's time and the latest date to book
- **Reorder flow:** returning clients pick a new fabric and reuse saved measurements, with a quick check-fit appointment
- **Interstate/regional clients:** video consult, then fitting on a scheduled Melbourne visit or a trip to their city
