import type { Metadata } from "next";
import { BookButton } from "@/components/BookButton";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, email or send a message to Saigon Cut, made-to-measure suits fitted at your home or office in Melbourne.",
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto grid max-w-page gap-8 px-gutter pt-10 pb-14 lg:grid-cols-12 lg:px-gutter-lg lg:pt-section">
        <div className="lg:col-span-6">
          <p className="flex items-center gap-3 text-xs font-medium tracking-label uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-ochre" />
            Home and office visits · Melbourne
          </p>
          <h1 className="mt-5 text-5xl sm:text-6xl xl:text-7xl">Contact</h1>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-lg">
            Send a message if you have a question about fabric, timing or a wedding party, or
            you&apos;re not ready to book yet. We&apos;ll get back to you by email or phone.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-page gap-14 border-t border-timber/15 px-gutter py-14 lg:grid-cols-12 lg:gap-8 lg:px-gutter-lg lg:py-section">
        <section aria-labelledby="reach-us" className="lg:col-span-4">
          <h2 id="reach-us" className="text-3xl sm:text-4xl">
            Reach us directly
          </h2>
          <div className="mt-8">
            <ContactDetails />
          </div>

          <div className="mt-12 border-l-2 border-ochre pl-5">
            <p>If you already know you want a suit, skip the message and book a free measurement.</p>
            <div className="mt-5">
              <BookButton />
            </div>
            <p className="mt-3 text-sm">{site.booking.note}.</p>
          </div>
        </section>

        <section aria-labelledby="send-a-message" className="lg:col-span-7 lg:col-start-6">
          <h2 id="send-a-message" className="text-3xl sm:text-4xl">
            Send a message
          </h2>
          <div className="mt-8">
            <EnquiryForm />
          </div>
        </section>
      </div>
    </>
  );
}
