import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { config } from "@/config";
import type { Enquiry } from "@/lib/enquiry";
import { getSecret } from "@/lib/secrets";

// Enquiries are sent from and to the business's own Zoho mailbox, so a reply comes from the address customers know.
const { host, port, mailbox } = config.smtp;

let transport: Transporter | undefined;

async function smtp() {
  const password = await getSecret("SMTP_PASS");
  if (!password) return null;

  transport ??= nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: { user: mailbox, pass: password },
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
  const transport = await smtp();

  if (!transport) {
    if (process.env.NODE_ENV === "development") {
      console.info("[enquiry] SMTP_PASS is not set, so the email was not sent.");
      return;
    }
    throw new Error("SMTP_PASS is not set");
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
    from: mailbox,
    to: mailbox,
    replyTo: enquiry.email,
    // A line break in a header could add headers of the visitor's own, so the name is kept to one line.
    subject: `Website enquiry from ${enquiry.name.replace(/[\r\n]+/g, " ")}`,
    text,
  });
}
