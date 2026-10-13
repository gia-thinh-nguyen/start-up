/**
 * All site content and business facts in one place.
 * When Sanity is added after launch, only this file changes.
 *
 * Anything not yet decided (GUIDE.md Part 1) is marked [TODO: …].
 * Search for "TODO" before launch: every one must be replaced.
 */

export type Link = {
  label: string;
  href: string;
};

export type Price = {
  item: string;
  /** "From" price in whole AUD, including GST. null until decided. */
  fromAud: number | null;
  includes: string;
};

export type Photo = {
  /** Path under /public, e.g. "/photos/hero.jpg". null shows a labelled placeholder. */
  src: string | null;
  alt: string;
  /** Photographer or licence. Every photo needs one before launch. */
  source: string;
  /** What to shoot. Shown on the placeholder until the photo is added. */
  brief: string;
};

export type Step = {
  title: string;
  text: string;
};

export type Place = {
  city: string;
  text: string;
};

export type Site = {
  name: string;
  tagline: string;
  origin: string;
  description: string;
  booking: Link & { note: string };
  nav: Link[];
  policies: Link[];
  contact: {
    phone: string;
    email: string;
    instagram: Link;
  };
  serviceArea: {
    studio: string;
    summary: string;
    suburbs: string[];
    travelFee: string;
  };
  turnaroundWeeks: string;
  weddingLeadTime: string;
  process: Step[];
  places: Place[];
  photos: {
    hero: Photo;
    workshop: Photo;
  };
  prices: Price[];
  payment: {
    measurement: string;
    deposit: string;
    balance: string;
  };
  abn: string;
};

export const site: Site = {
  name: "Saigon Cut",
  tagline: "Tailored in Saigon, Fitted in Melbourne",
  origin: "Made in Saigon. Measured and fitted in Melbourne.",
  description:
    "Made-to-measure suits, made in Saigon and fitted in Melbourne. Book a free measurement.",

  booking: {
    label: "Book a fitting",
    href: "/book",
    note: "Measurement is free",
  },

  nav: [
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],

  policies: [
    { label: "Privacy", href: "/policies/privacy" },
    { label: "Refunds", href: "/policies/refunds" },
    { label: "Order terms", href: "/policies/order-terms" },
  ],

  contact: {
    phone: "[TODO: phone number]",
    email: "[TODO: hello@ email address]",
    instagram: {
      label: "[TODO: @instagram handle]",
      href: "[TODO: Instagram profile URL]",
    },
  },

  serviceArea: {
    studio: "[TODO: studio address, or remove if home-based]",
    summary: "[TODO: e.g. Home and office visits across Melbourne]",
    suburbs: [],
    travelFee: "[TODO: travel fee, or remove if none]",
  },

  turnaroundWeeks: "[TODO: standard turnaround, e.g. 4–6 weeks]",
  weddingLeadTime: "[TODO: minimum wedding lead time]",

  process: [
    {
      title: "Book",
      text: "Choose a time online. Measurement is free and there's nothing to pay when you book.",
    },
    {
      title: "Measure",
      text: "We take your measurements and talk through the cut, lapels, buttons and lining.",
    },
    {
      title: "Choose fabric",
      text: "Pick your fabric and settle the details. A 40% deposit places your order.",
    },
    {
      title: "Made in Saigon",
      text: "Your suit is cut and sewn to your measurements in Saigon, Vietnam, then shipped to Melbourne.",
    },
    {
      title: "Final fitting in Melbourne",
      text: "Try it on, and we make any adjustments it needs. You pay the balance at this fitting.",
    },
  ],

  places: [
    {
      city: "Saigon",
      text: "Your suit is cut and sewn to your measurements in Saigon, Vietnam. [TODO: a sentence about the workshop, e.g. who sews the suits and how long they've been doing it]",
    },
    {
      city: "Melbourne",
      text: "You're measured in Melbourne before anything is cut, and fitted here when your suit arrives. [TODO: a sentence about the owner: who they are and why they started Saigon Cut]",
    },
  ],

  photos: {
    hero: {
      src: null,
      alt: "[TODO: describe the photo, e.g. Man in a navy two-piece suit]",
      source: "[TODO: photographer or licence]",
      brief: "A finished suit, worn. Portrait, at least 1600px tall.",
    },
    workshop: {
      src: null,
      alt: "[TODO: describe the photo]",
      source: "[TODO: photographer or licence]",
      brief: "The Saigon workshop, fabric, or a suit being made. Landscape.",
    },
  },

  prices: [
    { item: "Suits", fromAud: null, includes: "[TODO: what the suit price includes]" },
    { item: "Shirts", fromAud: null, includes: "[TODO: what the shirt price includes]" },
    {
      item: "Wedding packages",
      fromAud: null,
      includes: "[TODO: what the wedding package includes]",
    },
  ],

  payment: {
    measurement: "Free",
    deposit: "40% when you place your order",
    balance: "The rest at your final fitting",
  },

  abn: "[TODO: ABN]",
};
