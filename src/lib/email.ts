import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import type { Enquiry } from "@/lib/enquiry";

let transport: Transporter | undefined;

function smtp() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  const port = Number(SMTP_PORT || 465);
  transport ??= nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // 465 is encrypted from the start; 587 upgrades to TLS, which requireTLS makes compulsory.
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return transport;
}

/**
 * Emails an enquiry to the business inbox through the business's own Zoho mailbox (SMTP).
 *
 * Sent as plain text only, so nothing a visitor types can become HTML in the inbox. SMTP_PASS should be a Zoho
 * app-specific password, so it can be revoked without changing the mailbox's own login.
 */
export async function sendEnquiryEmail(enquiry: Enquiry) {
  const transport = smtp();
  const to = process.env.CONTACT_TO_EMAIL;
  // Zoho only sends from the signed-in mailbox or one of its aliases.
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;

  if (!transport || !to || !from) {
    if (process.env.NODE_ENV === "development") {
      console.info("[enquiry] SMTP is not configured, so the email was not sent.");
      return;
    }
    throw new Error("SMTP environment variables are not set");
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

  // Never log the enquiry or the server's reply, only that it failed (the caller logs the error message).
  await transport.sendMail({
    from,
    to,
    replyTo: enquiry.email,
    // A line break in a header could add headers of the visitor's own, so the name is kept to one line.
    subject: `Website enquiry from ${enquiry.name.replace(/[\r\n]+/g, " ")}`,
    text,
  });
}
