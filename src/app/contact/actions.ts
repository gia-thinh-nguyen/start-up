"use server";

import { headers } from "next/headers";
import { site } from "@/content/site";
import { sendEnquiryEmail } from "@/lib/email";
import { honeypotField, readEnquiry, validateEnquiry, type EnquiryState } from "@/lib/enquiry";
import { isRateLimited } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

const tryAgain = `Please try again, or email ${site.contact.email}.`;

export async function sendEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const enquiry = readEnquiry(formData);
  const failed = (message: string, errors = {}): EnquiryState => ({
    status: "error",
    message,
    errors,
    values: enquiry,
  });

  // Vercel sets x-forwarded-for itself, so visitors can't fake it.
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0].trim() ??
    requestHeaders.get("x-real-ip");

  if (isRateLimited(ip ?? "unknown")) {
    return failed(`You've sent a lot of messages in the last hour. ${tryAgain}`);
  }

  // A bot filled in the hidden field. Look like it worked, so it learns nothing, but send nothing.
  if (formData.get(honeypotField)) return { status: "sent" };

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) {
    return failed("Please check the highlighted fields.", errors);
  }

  try {
    const token = formData.get("cf-turnstile-response");
    const human = await verifyTurnstile(typeof token === "string" ? token : "", ip);
    if (!human) {
      return failed("We couldn't confirm you're not a bot. Please wait for the tick, then send again.");
    }

    await sendEnquiryEmail(enquiry);
  } catch (error) {
    // Log what went wrong without the visitor's details.
    console.error("[enquiry]", error instanceof Error ? error.message : "Unknown error");
    return failed(`Sorry, your message didn't send. ${tryAgain}`);
  }

  return { status: "sent" };
}
