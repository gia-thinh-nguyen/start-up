import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { site } from "@/content/site";
import { visitTime, type Settled } from "@/lib/booking";

/** Anything but "pay" on the way in, which goes straight to Stripe, and "not-found", which is a 404. */
export type Outcome = Exclude<Settled, { kind: "not-found" }> | { kind: "error" };

const { feeAud, maxKm, payWithinMinutes, feeRefund } = site.serviceArea;

/** The visit's time leads in Besley, as "30 minutes" does on /book, with the day under it. */
function VisitTime({ start }: { start: string }) {
  const { date, time } = visitTime(start);
  return (
    <dl className="mt-6 lg:mt-8">
      <dt className="text-small font-medium md:text-body">Your visit</dt>
      <dd className="font-display text-numeral whitespace-nowrap">{time}</dd>
      <dd className="mt-1 font-display text-subheading lg:text-heading">{date}</dd>
    </dl>
  );
}

function Text({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 max-w-measure text-lede">{children}</p>;
}

const quoteLink = (
  <Link href="/contact" className="swap -mx-1 px-1 font-medium underline">
    Ask us for a quote
  </Link>
);

/** The title and body for each way a booking can end up. The h1 is the page's only one. */
export function BookingOutcome({ outcome }: { outcome: Outcome }) {
  switch (outcome.kind) {
    case "booked":
    case "paid":
      return (
        <>
          <h1>You&apos;re booked</h1>
          <VisitTime start={outcome.start} />
          {outcome.kind === "paid" && (
            <Text>
              Travel fee of ${feeAud} paid. {feeRefund}
            </Text>
          )}
          <Text>
            We&apos;ll come to the address you gave. Your confirmation email from Cal.com has the details, with links
            to move or cancel the visit.
          </Text>
        </>
      );

    case "pay": {
      const { time } = visitTime(outcome.payBy);
      return (
        <>
          <h1>Pay the travel fee</h1>
          <VisitTime start={outcome.start} />
          <Text>
            We&apos;re holding this time until {time}. If the ${feeAud} isn&apos;t paid by then, we&apos;ll cancel the
            booking. {feeRefund}
          </Text>
          <div className="mt-6">
            <BookButton size="lg" href={outcome.url} label={`Pay $${feeAud}`} />
          </div>
        </>
      );
    }

    case "outside":
      return (
        <>
          <h1>We can&apos;t book that visit</h1>
          <Text>
            Your postcode is more than {maxKm} km from Keysborough, or we couldn&apos;t find it, so we&apos;ve
            cancelled the booking. {quoteLink}. If the postcode was wrong,{" "}
            <Link href={site.booking.href} className="swap -mx-1 px-1 font-medium underline">
              book again
            </Link>
            .
          </Text>
        </>
      );

    case "unpaid":
      return (
        <>
          <h1>This time was released</h1>
          <Text>
            The ${feeAud} travel fee wasn&apos;t paid within {payWithinMinutes} minutes, so we cancelled the booking.
            You&apos;re welcome to book again.
          </Text>
          <div className="mt-6">
            <BookButton size="lg" />
          </div>
        </>
      );

    case "cancelled":
      return (
        <>
          <h1>This booking was cancelled</h1>
          <Text>You&apos;re welcome to book another time.</Text>
          <div className="mt-6">
            <BookButton size="lg" />
          </div>
        </>
      );

    case "error":
      return (
        <>
          <h1>We couldn&apos;t check your booking</h1>
          <Text>
            Your time is still held. Refresh this page in a minute, or call us on{" "}
            <a href={site.contact.phoneHref} className="swap -mx-1 px-1 font-medium underline">
              {site.contact.phone}
            </a>
            .
          </Text>
        </>
      );
  }
}
