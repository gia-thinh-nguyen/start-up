import "server-only";
import { getSecret } from "@/lib/secrets";

/**
 * The few Cal.com API v2 calls the booking flow needs: read a booking and cancel it.
 * https://cal.com/docs/api-reference/v2/bookings
 *
 * Needs CAL_API_KEY (Cal.com → Settings → Developer → API keys). Bookings hold names, emails and
 * addresses, so nothing here is ever logged.
 */

const apiBase = "https://api.cal.com/v2";
// Without this header Cal.com falls back to an older version of each endpoint.
const apiVersion = "2026-02-25";

export type Booking = {
  uid: string;
  status: "accepted" | "pending" | "awaiting_host" | "cancelled" | "rejected";
  start: string;
  createdAt: string;
  eventType: { slug: string };
  attendees: { name: string; email: string }[];
  bookingFieldsResponses: Record<string, unknown>;
  rescheduledFromUid?: string;
  cancellationReason?: string;
};

/** Booking uids are short random strings. Anything else never reaches Cal.com. */
export const bookingUidPattern = /^[A-Za-z0-9_-]{6,64}$/;

async function calFetch(path: string, init?: RequestInit) {
  const apiKey = await getSecret("CAL_API_KEY");
  if (!apiKey) throw new Error("CAL_API_KEY is not set");

  return fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": apiVersion,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
}

/** The booking, or null if Cal.com has no booking with this uid. */
export async function getBooking(uid: string): Promise<Booking | null> {
  if (!bookingUidPattern.test(uid)) return null;

  const response = await calFetch(`/bookings/${uid}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Cal.com responded ${response.status}`);

  const { data } = (await response.json()) as { data: unknown };
  // Recurring bookings come back as a list. The home visit never recurs, so those are ignored.
  if (!data || Array.isArray(data) || typeof data !== "object" || !("uid" in data)) return null;
  return data as Booking;
}

/**
 * Cancels the booking. Cal.com emails the customer the reason and frees the time. The confirmation page and a
 * webhook can both get here at once, so a booking that's already cancelled counts as done.
 */
export async function cancelBooking(uid: string, reason: string) {
  const response = await calFetch(`/bookings/${uid}/cancel`, {
    method: "POST",
    body: JSON.stringify({ cancellationReason: reason }),
  });
  if (response.ok) return;
  if ((await getBooking(uid))?.status === "cancelled") return;
  throw new Error(`Cal.com responded ${response.status}`);
}
