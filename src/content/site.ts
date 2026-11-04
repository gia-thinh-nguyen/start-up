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
  /** Shown instead of a price when the owner chooses not to publish one. */
  instead?: Link;
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
  /** The file's own size in pixels. The slot takes this shape, so the photo is never cropped. */
  width?: number;
  height?: number;
  /** Shown under the photo where the page needs to say where it was taken. */
  caption?: string;
};

/** One stop of the visit, in order. The home page's first screen is these three. */
export type Stop = {
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
    terms: string;
    /** What happens before any money changes hands. */
    beforeYouPay: string;
    noObligation: string;
    depositNote: string;
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
    phoneHref: string;
    email: string;
    /** Left out for now (owner, 5 November 2026). Set it to show it on /contact and in the footer. */
    instagram?: Link;
  };
  serviceArea: {
    summary: string;
    suburbs: string[];
    travelFee: string;
  };
  turnaroundWeeks: string;
  weddingLeadTime: string;
  /** Measured in Melbourne, made in Saigon, fitted in Melbourne. */
  stops: [Stop, Stop, Stop];
  saigon: Place;
  photos: {
    workshop: Photo;
    handshake: Photo;
  };
  prices: Price[];
  priceNote: string;
  payment: PaymentTerm[];
  faq: Question[];
  abn: string;
};

// The owner's figure (4 November 2026).
const turnaroundWeeks = "3–4 weeks";
const weddingLeadTime = "[TODO: minimum wedding lead time, e.g. 3 months]";
/** Must match the event's length in Cal.com. */
const visitMinutes = 45;

export const site: Site = {
  name: "Saigon Tailors",
  tagline: "Tailored in Saigon, Fitted in Melbourne",
  origin: "Made in Saigon, Vietnam. Measured and fitted in Melbourne.",
  description:
    "Made-to-measure suits, made in Saigon and fitted in Melbourne. Book a free measurement.",

  booking: {
    label: "Book a fitting",
    href: "/book",
    note: "Measurement is free",
    terms: "Nothing to pay when you book.",
    beforeYouPay: "You choose your fabric and see the full price before you pay anything.",
    noObligation: "There's no obligation to order.",
    depositNote: "If you go ahead, a 40% deposit places your order once you've chosen your fabric.",
    calUsername: "gia-thinh-nguyen",
    event: {
      slug: "home-visit",
      name: "Home or office visit",
      minutes: visitMinutes,
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
    phone: "0435 663 904",
    // tel: links can't contain spaces, so the dialled number is kept separately.
    phoneHref: "tel:+61435663904",
    email: "enquiries@saigontailors.com.au",
  },

  // The owner's area and fee (5 November 2026). The fee is charged at the final fitting, never at the
  // measurement, so "Measurement is free" stays true for everyone.
  serviceArea: {
    summary: "Your home or office, within 40 km of Keysborough.",
    suburbs: [],
    travelFee:
      "No travel fee within 25 km of Keysborough. From 25 to 40 km it's $15, added to your balance at the final fitting. Further out, ask us for a quote.",
  },

  turnaroundWeeks,
  weddingLeadTime,

  stops: [
    {
      title: "Measured in Melbourne",
      // \u2011 is a non-breaking hyphen, so "45-minute" never splits across lines.
      text: `Free, at your home or office. A ${visitMinutes}\u2011minute visit.`,
    },
    {
      title: "Made in Saigon, Vietnam",
      text: "Your suit is cut and sewn to your measurements in Saigon, then shipped to Melbourne.",
    },
    {
      title: "Fitted in Melbourne",
      // Changes aren't made in Melbourne: they're marked at the fitting and the suit goes back to Saigon (owner, 4 November 2026).
      text: "When your suit arrives, we fit it on you at home or at work. Any changes are made back in Saigon.",
    },
  ],

  saigon: {
    city: "Saigon",
    text: "Your measurements go to Saigon, Vietnam, and your suit is cut and sewn there. [TODO: a sentence about the workshop, e.g. who sews the suits and how long they've been doing it]",
  },

  photos: {
    workshop: {
      src: "/photos/workshop.png",
      width: 1520,
      height: 855,
      alt: "A tailor in Saigon marking out suit fabric on a cutting table, in front of a rail of finished jackets",
      source: "[TODO: photographer, and written consent from the person pictured]",
      brief: "The Saigon workshop, with finished jackets in view. 16:9 landscape, at least 2000px wide.",
    },
    handshake: {
      src: "/photos/hero.jpg",
      // Its Vietnamese shop signs show, so say where it is, and nobody reads it as a Melbourne shop.
      caption: "In the Saigon shop.",
      alt: "A tailor with a tape measure around his neck shaking hands with a smiling customer in a black dinner suit and bow tie",
      source: "[TODO: photographer, and written consent from the person pictured]",
      brief: "A finished suit, worn. Portrait, at least 1600px tall.",
      width: 1289,
      height: 1970,
    },
  },

  // The owner's figures (4 November 2026): suits from $410, which includes $30 shipping from Saigon,
  // and a shirt added to a suit order from $85.
  prices: [
    {
      item: "Suits",
      fromAud: 410,
      unit: "including shipping",
      includes: [
        "Two-piece suit: jacket and trousers",
        "Cut and sewn to your measurements in Saigon",
        "Your choice of lapels, buttons and lining",
        "Shipping from Saigon to Melbourne",
        "Final fitting in Melbourne",
        // Owner, 4 November 2026: if the fit isn't right, that's on us, so the owner covers the work and the shipping both ways.
        "Any changes to get the fit right, made in Saigon, with shipping both ways",
      ],
    },
    {
      item: "Add a shirt",
      fromAud: 85,
      unit: "with a suit order",
      includes: [
        "Made to your measurements in Saigon",
        "Your choice of collar and cuffs",
        "Measured at the same free appointment as your suit",
        "Ships with your suit, so no extra shipping",
      ],
    },
    {
      item: "Wedding packages",
      // The owner chose not to publish a group price.
      fromAud: null,
      instead: { label: "Ask us for a group price", href: "/contact" },
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
        "If the fit isn't right, we mark the changes at your final fitting in Melbourne and send the suit back to Saigon to be altered or remade. We cover everything, including the shipping both ways. When it returns, we fit it on you again. [TODO: how long the return trip takes, and what happens if you want to change something you chose, such as the lapels, after it's made]",
    },
    {
      question: "Is the fit guaranteed?",
      answer:
        "[TODO: fit guarantee terms, e.g. free alterations within 30 days of your final fitting.] This doesn't change your rights under Australian Consumer Law.",
    },
  ],

  abn: "[TODO: ABN]",
};
