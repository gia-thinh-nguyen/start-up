import type Stripe from "stripe";
import { settleBooking } from "@/lib/booking";
import { getSecret } from "@/lib/secrets";
import { getStripe } from "@/lib/stripe";

/**
 * Stripe calls this when a travel-fee payment page expires unpaid (Stripe → Developers → Webhooks, event
 * "checkout.session.expired"). Settling the booking then cancels it, which frees the time in Cal.com.
 * Stripe retries a failed call for up to three days, so an error here isn't lost.
 */
export async function POST(request: Request) {
  const secret = await getSecret("STRIPE_WEBHOOK_SECRET");
  const signature = request.headers.get("stripe-signature");
  if (!secret || !signature) return new Response(null, { status: 401 });

  let event: Stripe.Event;
  try {
    event = (await getStripe()).webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return new Response(null, { status: 401 });
  }

  if (event.type !== "checkout.session.expired") return new Response(null, { status: 204 });

  const uid = event.data.object.metadata?.bookingUid;
  if (!uid) return new Response(null, { status: 204 });

  try {
    await settleBooking(uid);
  } catch {
    console.error("[stripe-webhook] could not settle a booking");
    return new Response(null, { status: 500 });
  }
  return new Response(null, { status: 204 });
}
