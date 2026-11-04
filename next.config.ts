import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Cal.com (booking calendar) and Cloudflare Turnstile (contact form spam check) each load a script and show an iframe.
const embeds = ["https://app.cal.com", "https://challenges.cloudflare.com"].join(" ");

/**
 * Without nonces, so pages stay static and fast. Next.js needs 'unsafe-inline' for its own inline scripts then;
 * every other script must come from this site or the two embeds. In development React also needs 'unsafe-eval'.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${embeds}${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  `frame-src ${embeds}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
