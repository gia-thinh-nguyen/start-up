/**
 * Public settings for the services the site connects to. Page copy lives in src/content/site.ts instead.
 *
 * Client components import this file, so it can end up in the browser. Only values that are safe to publish go
 * here: never a password, API key or webhook secret (those live in Parameter Store, see src/lib/secrets.ts).
 */
export const config = {
  cal: {
    username: "gia-thinh-nguyen",
    /** The home-visit event type. Bookings of other events are left alone. */
    event: {
      /** Must match the event's URL slug in Cal.com. */
      slug: "home-visit",
      /** Must match the identifier of the event's required Postcode question in Cal.com. */
      postcodeField: "postcode",
    },
  },

  /** Cloudflare Turnstile. Only accepted on the hostnames listed for the widget in Cloudflare. */
  turnstile: {
    siteKey: "0x4AAAAAAFz8OwvHYWSFytph",
  },

  /** The Zoho mailbox that sends enquiries to itself. Its app password is SMTP_PASS. */
  smtp: {
    host: "smtp.zoho.com.au",
    /** Encrypted from the first byte (SMTPS). */
    port: 465,
    mailbox: "enquiries@saigontailors.com.au",
  },

  parameterStore: {
    region: "ap-southeast-2",
    /** Folder for secrets that are the same on every branch. The rest sit under each branch's SECRETS_PATH. */
    sharedPath: "/saigon-tailors",
  },
} as const;
