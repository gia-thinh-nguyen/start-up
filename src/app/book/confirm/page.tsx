import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BookingOutcome, type Outcome } from "@/components/book/BookingOutcome";
import { CollarNotch, CutEdge } from "@/components/CutEdge";
import { settleBooking, type Settled } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Your booking",
  robots: { index: false },
};

/**
 * Where the calendar sends people once they've booked, and where Stripe sends them back to. Each visit settles
 * the booking again, so a refresh always shows where it stands.
 */
export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { uid, back } = await searchParams;
  if (typeof uid !== "string") notFound();

  let settled: Settled | undefined;
  try {
    settled = await settleBooking(uid);
  } catch {
    console.error("[book/confirm] could not settle a booking");
  }

  if (settled?.kind === "not-found") notFound();
  // Straight on to Stripe the first time. Coming back from Stripe without paying shows a Pay button instead.
  if (settled?.kind === "pay" && back === undefined) redirect(settled.url);

  const outcome: Outcome = settled ?? { kind: "error" };

  return (
    <div className="overflow-x-clip">
      <div aria-hidden="true" className="h-hem bg-navy lg:h-hem-lg" />
      <section className="surface-card relative">
        <CutEdge shape="collar" fill="fill-ochre" />
        <CollarNotch />
        <div className="mx-auto max-w-page px-gutter pt-2 pb-[calc(var(--spacing-section)+var(--spacing-hem))] lg:px-gutter-lg lg:pb-[calc(var(--spacing-section)+var(--spacing-hem-lg))]">
          <BookingOutcome outcome={outcome} />
        </div>
      </section>
    </div>
  );
}
