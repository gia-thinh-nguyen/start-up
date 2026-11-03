import { BookButton } from "@/components/BookButton";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { CutEdge } from "@/components/CutEdge";
import { site } from "@/content/site";

/**
 * The one piece of card on the page: contact details, service area and the way to booking. On phones
 * it runs across the screen below the form. On desktop it lies beside the form and off the right of
 * the page, with a shoulder and armhole cut into it, and the footer's edge rises over its bottom.
 */
export function ContactPiece() {
  return (
    <section
      aria-labelledby="reach-us"
      className="surface-card relative isolate -mx-gutter px-gutter pt-4 pb-[calc(var(--spacing-hem)+3rem)] lg:col-span-5 lg:col-start-8 lg:mr-[calc(-1*(var(--spacing-gutter-lg)+var(--page-edge)))] lg:ml-0 lg:bg-transparent lg:pt-20 lg:pr-[calc(var(--spacing-gutter-lg)+var(--page-edge))] lg:pb-[calc(var(--spacing-hem-lg)+4rem)] lg:pl-[calc(7rem+0.2*var(--page-edge))]"
    >
      <div className="lg:hidden">
        <CutEdge shape="shoulderRight" fill="fill-ochre" />
      </div>

      {/* The cut is a fixed height, so a form full of errors makes the piece longer without bending it. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden flex-col lg:flex">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-[50rem] w-full shrink-0 fill-ochre">
          <path d="M10 5 100 0V100H0V62C8 50 15 24 10 5Z" />
          <path className="seam" d="M100 2.5 12.5 7.2C16.5 26 10.5 52 2.5 64.5V100" />
        </svg>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="min-h-0 w-full flex-1 bg-ochre">
          <path className="seam" d="M2.5 0V100" />
        </svg>
      </div>

      <h2 id="reach-us">Reach us directly</h2>
      <div className="mt-6">
        <ContactDetails />
      </div>

      <p className="mt-12 font-display text-numeral">Free</p>
      <p className="mt-2 mb-6 max-w-measure">
        If you already know you want a suit, skip the message and book a free measurement.{" "}
        {site.booking.terms}
      </p>
      <BookButton size="lg" />
    </section>
  );
}
