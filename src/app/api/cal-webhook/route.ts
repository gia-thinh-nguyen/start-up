import { createHmac, timingSafeEqual } from "node:crypto";
import { settleBooking } from "@/lib/booking";
import { bookingUidPattern } from "@/lib/cal";

/**
 * Cal.com calls this when a booking is created (Cal.com → Settings → Developer → Webhooks, trigger
 * "Booking created", with a secret). It settles the travel fee even if the customer closed the page
 * straight after booking, so the payment window starts either way.
 */

function signedByCal(body: string, signature: string | null) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(body).digest("hex"));
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function POST(request: Request) {
  const body = await request.text();
  if (!signedByCal(body, request.headers.get("x-cal-signature-256"))) {
    return new Response(null, { status: 401 });
  }

  let event: { triggerEvent?: unknown; payload?: { uid?: unknown } };
  try {
    event = JSON.parse(body);
  } catch {
    return new Response(null, { status: 400 });
  }

  const uid = event.payload?.uid;
  if (event.triggerEvent !== "BOOKING_CREATED" || typeof uid !== "string" || !bookingUidPattern.test(uid)) {
    // Cal.com's test ping and other triggers need nothing done.
    return new Response(null, { status: 204 });
  }

  try {
    await settleBooking(uid);
  } catch {
    // No details: the response goes to Cal.com, and the booking holds personal data.
    console.error("[cal-webhook] could not settle a booking");
    return new Response(null, { status: 500 });
  }
  return new Response(null, { status: 204 });
}
