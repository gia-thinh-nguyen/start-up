/** The contact form's fields, limits and server-side validation. */

export type EnquiryField = "name" | "email" | "phone" | "message";

export type Enquiry = Record<EnquiryField, string>;

export type EnquiryState =
  | { status: "idle" }
  | { status: "sent" }
  | {
      status: "error";
      message: string;
      errors: Partial<Record<EnquiryField, string>>;
      /** Sent back so the form keeps what the person typed. */
      values: Enquiry;
    };

export const limits: Record<EnquiryField, number> = {
  name: 100,
  email: 254,
  phone: 30,
  message: 2000,
};

/** The hidden field that real people never see or fill in. */
export const honeypotField = "website";

// Control characters, except tab and newline in the message.
const controlChars = /[\u0000-\u0008\u000B-\u001F\u007F]/g;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9 +()-]*$/;

function text(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

/** One line only, so a name can't add lines to an email subject. */
function singleLine(value: string) {
  return value.replace(/\s+/g, " ").replace(controlChars, "").trim();
}

export function readEnquiry(formData: FormData): Enquiry {
  return {
    name: singleLine(text(formData, "name")),
    email: singleLine(text(formData, "email")),
    phone: singleLine(text(formData, "phone")),
    message: text(formData, "message").replace(/\r\n?/g, "\n").replace(controlChars, "").trim(),
  };
}

export function validateEnquiry(enquiry: Enquiry) {
  const errors: Partial<Record<EnquiryField, string>> = {};

  if (!enquiry.name) errors.name = "Please enter your name.";
  else if (enquiry.name.length > limits.name) errors.name = "Please shorten your name.";

  if (!enquiry.email) errors.email = "Please enter your email address.";
  else if (enquiry.email.length > limits.email || !emailPattern.test(enquiry.email))
    errors.email = "Please check your email address, e.g. name@example.com.";

  if (enquiry.phone.length > limits.phone || !phonePattern.test(enquiry.phone))
    errors.phone = "Please use numbers only, e.g. 0400 000 000.";

  if (!enquiry.message) errors.message = "Please write a message.";
  else if (enquiry.message.length > limits.message)
    errors.message = `Please keep your message under ${limits.message} characters.`;

  return errors;
}
