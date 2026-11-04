import "server-only";
import { getSecret } from "@/lib/secrets";

// Cloudflare's test secret: always passes. Used in development, where the widget uses the matching test site key.
const testSecret = "1x0000000000000000000000000000000AA";

/** Asks Cloudflare whether the Turnstile token from the form is genuine. Tokens are single-use. */
export async function verifyTurnstile(token: string, ip: string | null) {
  const secret =
    process.env.NODE_ENV === "development" ? testSecret : await getSecret("TURNSTILE_SECRET_KEY");
  if (!secret) throw new Error("TURNSTILE_SECRET_KEY is not set");
  if (!token || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Turnstile responded ${response.status}`);

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}
