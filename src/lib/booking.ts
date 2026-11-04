import "server-only";
import type Stripe from "stripe";
import { config } from "@/config";
import { site } from "@/content/site";
import { cancelBooking, getBooking, type Booking } from "@/lib/cal";
import { getStripe } from "@/lib/stripe";
import { postcodePattern, travelZone } from "@/lib/travel";

/** Where a home-visit booking stands once the travel fee has been dealt with. */
export type Settled =
  | { kind: "booked"; start: string }
  | { kind: "paid"; start: string }
  | { kind: "pay"; start: string; url: string; payBy: Date }
  | { kind: "outside" }
  | { kind: "unpaid" }
  | { kind: "cancelled" }
  | { kind: "not-found" };

const { slug, postcodeField } = config.cal.event;
const { feeAud, payWithinMinutes, cancelReasons } = site.serviceArea;

/** The site's own address, for Stripe to send people back to. Set SITE_URL for each Amplify branch. */
function siteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  throw new Error("SITE_URL is not set");
}

/** In Melbourne time whatever the visitor's own time zone, e.g. "Thursday 12 November" and "10:30 am". */
export function visitTime(start: string | Date) {
  const at = new Date(start);
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-AU", { timeZone: "Australia/Melbourne", ...options }).format(at);
  return {
    date: format({ weekday: "long", day: "numeric", month: "long" }),
    time: format({ hour: "numeric", minute: "2-digit" }),
  };
}

function feeZone(booking: Booking) {
  const postcode = String(booking.bookingFieldsResponses[postcodeField] ?? "").trim();
  return postcodePattern.test(postcode) ? travelZone(postcode) : "unknown";
}

/** Every Stripe payment page opened for this booking. There's no database: Stripe's own records are the record. */
async function feeSessions(booking: Booking) {
  const sessions: Stripe.Checkout.Session[] = [];
  const since = Math.floor(new Date(booking.createdAt).getTime() / 1000) - 60;
  const stripe = await getStripe();
  for await (const session of stripe.checkout.sessions.list({ created: { gte: since }, limit: 100 })) {
    if (session.metadata?.bookingUid === booking.uid) sessions.push(session);
  }
  return sessions;
}

/**
 * Opens a Stripe payment page that expires in payWithinMinutes. The webhook and the confirmation page can both
 * get here at once, so the request is keyed to the booking and the minute: Stripe returns the same page to both.
 */
async function openFeeSession(booking: Booking) {
  const minute = Math.floor(Date.now() / 60_000);
  // From the start of the next minute, so it's never less than Stripe's 30-minute minimum away.
  const expiresAt = (minute + 1) * 60 + payWithinMinutes * 60;
  const back = `${siteUrl()}/book/confirm?uid=${booking.uid}`;
  const { date, time } = visitTime(booking.start);

  const stripe = await getStripe();
  return stripe.checkout.sessions.create(
    {
      mode: "payment",
      // Cards only (Apple Pay and Google Pay count as cards), so the fee is paid the moment the page completes.
      allowed_payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "aud",
            unit_amount: feeAud * 100,
            product_data: {
              name: "Travel fee",
              description: `${site.booking.event.name}, ${date} at ${time}`,
            },
          },
        },
      ],
      customer_email: booking.attendees[0]?.email,
      metadata: { bookingUid: booking.uid },
      payment_intent_data: { metadata: { bookingUid: booking.uid } },
      expires_at: expiresAt,
      success_url: back,
      cancel_url: `${back}&back=1`,
    },
    { idempotencyKey: `travel-fee-${booking.uid}-${minute}` },
  );
}

function payAt(booking: Booking, session: Stripe.Checkout.Session): Settled {
  return { kind: "pay", start: booking.start, url: session.url ?? "", payBy: new Date(session.expires_at * 1000) };
}

/**
 * Moves a home-visit booking on as far as it can go: leaves a free visit alone, cancels one outside the area,
 * opens a payment page for the travel fee, and cancels the booking once that page expires unpaid.
 * Safe to call any number of times, so the confirmation page and both webhooks all use it.
 */
export async function settleBooking(uid: string): Promise<Settled> {
  const booking = await getBooking(uid);
  if (!booking || booking.eventType.slug !== slug) return { kind: "not-found" };

  if (booking.status === "cancelled" || booking.status === "rejected") {
    if (booking.cancellationReason === cancelReasons.outside) return { kind: "outside" };
    if (booking.cancellationReason === cancelReasons.unpaid) return { kind: "unpaid" };
    return { kind: "cancelled" };
  }

  // A moved booking keeps whatever was settled for the one it replaced, so nobody pays twice.
  if (booking.rescheduledFromUid) return { kind: "booked", start: booking.start };

  const zone = feeZone(booking);
  if (zone === "free") return { kind: "booked", start: booking.start };
  if (zone === "far" || zone === "unknown") {
    await cancelBooking(uid, cancelReasons.outside);
    return { kind: "outside" };
  }

  const sessions = await feeSessions(booking);
  if (sessions.some((session) => session.payment_status === "paid")) return { kind: "paid", start: booking.start };

  const open = sessions.find((session) => session.status === "open" && session.url);
  if (open) return payAt(booking, open);

  if (sessions.length > 0) {
    await cancelBooking(uid, cancelReasons.unpaid);
    return { kind: "unpaid" };
  }
  return payAt(booking, await openFeeSession(booking));
}
