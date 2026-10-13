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
  /** "From" price in whole AUD. null until decided. */
  fromAud: number | null;
  /** Shown under the price when it isn't per item, e.g. "per suit". */
  unit?: string;
  includes: string[];
};

export type PaymentTerm = {
  label: string;
  value: string;
  detail: string;
};

export type Question = {
  question: string;
  answer: string;
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
  booking: Link & {
    note: string;
    /** Cal.com username, e.g. "saigoncut". null shows a labelled placeholder. */
    calUsername: string | null;
    /** The Cal.com event type shown on the booking page. */
    event: {
      /** Must match the event's URL slug in Cal.com. */
      slug: string;
      name: string;
      /** Must match the event's length in Cal.com. */
      minutes: number;
      where: string;
    };
  };
  nav: Link[];
  policies: {
    privacy: Link;
    refunds: Link;
    orderTerms: Link;
  };
  contact: {
    phone: string;
    email: string;
    instagram: Link;
  };
  serviceArea: {
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
  priceNote: string;
  payment: PaymentTerm[];
  faq: Question[];
  abn: string;
};

const turnaroundWeeks = "[TODO: standard turnaround, e.g. 4–6 weeks]";
const weddingLeadTime = "[TODO: minimum wedding lead time, e.g. 3 months]";

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
    calUsername: "gia-thinh-nguyen",
    event: {
      slug: "home-visit",
      name: "Home or office visit",
      minutes: 45,
      where: "Your home or office in Melbourne",
    },
  },

  nav: [
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],

  policies: {
    privacy: { label: "Privacy", href: "/policies/privacy" },
    refunds: { label: "Refunds", href: "/policies/refunds" },
    orderTerms: { label: "Order terms", href: "/policies/order-terms" },
  },

  contact: {
    phone: "[TODO: phone number]",
    email: "[TODO: hello@ email address]",
    instagram: {
      label: "[TODO: @instagram handle]",
      href: "[TODO: Instagram profile URL]",
    },
  },

  serviceArea: {
    summary: "[TODO: e.g. Home and office visits across Melbourne]",
    suburbs: [],
    travelFee: "[TODO: travel fee, or remove if none]",
  },

  turnaroundWeeks,
  weddingLeadTime,

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

  // TODO: draft prices to get the page built. Confirm every number before launch.
  prices: [
    {
      item: "Suits",
      fromAud: 890,
      includes: [
        "Two-piece suit: jacket and trousers",
        "Cut and sewn to your measurements in Saigon",
        "Your choice of lapels, buttons and lining",
        "Final fitting and adjustments in Melbourne",
      ],
    },
    {
      item: "Shirts",
      fromAud: 129,
      includes: [
        "Made to your measurements in Saigon",
        "Your choice of collar and cuffs",
        "Measured at the same free appointment as your suit",
      ],
    },
    {
      item: "Wedding packages",
      fromAud: 790,
      unit: "per suit, for 4 or more",
      includes: [
        "Suits for the groom and groomsmen in matching fabric",
        "Everyone measured and fitted in Melbourne",
        `Book at least ${weddingLeadTime} before the wedding`,
      ],
    },
  ],

  // Not registered for GST yet. Once registered, prices must include GST:
  // change this to "All prices are in AUD and include GST."
  priceNote: "All prices are in AUD.",

  payment: [
    {
      label: "Measurement",
      value: "Free",
      detail: "Nothing to pay when you book or when you're measured.",
    },
    {
      label: "Deposit",
      value: "40% when you place your order",
      detail:
        "Paid once you've chosen your fabric and details, and you know the full price. [TODO: when the deposit stops being refundable, e.g. once your fabric is cut]",
    },
    {
      label: "Balance",
      value: "The rest at your final fitting",
      detail: "Paid in Melbourne, once you've tried your suit on.",
    },
  ],

  faq: [
    {
      question: "How long does it take?",
      answer: `Usually ${turnaroundWeeks} from placing your order to your final fitting. For a wedding, book your measurement at least ${weddingLeadTime} before the day.`,
    },
    {
      question: "What if it needs alterations?",
      answer:
        "Adjustments at your final fitting are included in the price. [TODO: what counts as an alteration and what counts as a remake, and whether later alterations cost extra]",
    },
    {
      question: "Is the fit guaranteed?",
      answer:
        "[TODO: fit guarantee terms, e.g. free alterations within 30 days of your final fitting.] This doesn't change your rights under Australian Consumer Law.",
    },
  ],

  abn: "[TODO: ABN]",
};
