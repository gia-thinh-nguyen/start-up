import "server-only";
import type { Enquiry } from "@/lib/enquiry";

/**
 * Emails an enquiry to the hello@ inbox through Resend.
 *
 * Sent as plain text only, so nothing a visitor types can become HTML in the inbox.
 * Resend receives the enquiry, so the privacy policy (Step 6) must name it.
 */
export async function sendEnquiryEmail(enquiry: Enquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV === "development") {
      console.info("[enquiry] Resend is not configured, so the email was not sent.");
      return;
    }
    throw new Error("Resend environment variables are not set");
  }

  const text = [
    "New enquiry from the website",
    "",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || "Not given"}`,
    "",
    "Message:",
    enquiry.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.email,
      subject: `Website enquiry from ${enquiry.name}`,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  // Log the status only, never the enquiry itself.
  if (!response.ok) throw new Error(`Resend responded ${response.status}`);
}
