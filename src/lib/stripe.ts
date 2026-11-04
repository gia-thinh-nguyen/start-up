import "server-only";
import Stripe from "stripe";

let client: Stripe | undefined;

/**
 * Stripe's official library. Card details only ever go to Stripe's own payment page, never to this site.
 * Needs STRIPE_SECRET_KEY: a test key (sk_test_…) until launch, then the live one.
 */
export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("STRIPE_SECRET_KEY is not set");
  client ??= new Stripe(secretKey, { maxNetworkRetries: 2, timeout: 10_000 });
  return client;
}
