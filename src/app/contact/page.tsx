import type { Metadata } from "next";
import { ContactPiece } from "@/components/contact/ContactPiece";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { CollarNotch, CutEdge } from "@/components/CutEdge";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, email or send a message to ${site.name}, made-to-measure suits made in Saigon and fitted at your home or office in Melbourne.`,
};

export default function ContactPage() {
  return (
    <div className="overflow-x-clip">
      <div aria-hidden="true" className="h-hem bg-navy lg:h-hem-lg" />

      <div className="surface-chalk relative">
        <CutEdge shape="collar" fill="fill-paper" />
        <CollarNotch />

        <div className="mx-auto grid max-w-page px-gutter lg:grid-cols-12 lg:gap-x-8 lg:px-gutter-lg">
          <section
            aria-labelledby="contact-title"
            className="pt-2 pb-[calc(var(--spacing-hem)+2.5rem)] lg:col-span-6 lg:pb-[calc(var(--spacing-hem-lg)+4rem)]"
          >
            <h1 id="contact-title">Send us a message</h1>
            <p className="mt-4 mb-8 max-w-measure text-lede lg:mt-7 lg:mb-10">
              Write to us if you have a question about fabric, timing or a wedding party, or you&apos;re
              not ready to book yet. We&apos;ll get back to you by email or phone. You can also{" "}
              <a href="#reach-us" className="swap underline">
                call or email us
              </a>
              .
            </p>
            <EnquiryForm />
          </section>

          <ContactPiece />
        </div>
      </div>
    </div>
  );
}
