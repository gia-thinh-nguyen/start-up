import "server-only";

/**
 * A simple rate limit kept in memory.
 *
 * Vercel runs the site as several short-lived copies that don't share memory, so this is
 * best-effort: a determined sender could get past it. Turnstile and the honeypot do most of
 * the work. If spam gets through, swap this file for @upstash/ratelimit (same function shape).
 */

const windowMs = 60 * 60 * 1000;
const maxPerWindow = 10;
const hits = new Map<string, number[]>();

/** Records an attempt for this key and returns true if it's over the limit. */
export function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  recent.push(now);
  hits.set(key, recent);

  // Keep memory bounded: drop keys with no recent attempts.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(k);
    }
  }

  return recent.length > maxPerWindow;
}
