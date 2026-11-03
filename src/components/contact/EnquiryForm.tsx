"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { sendEnquiry } from "@/app/contact/actions";
import { BookButton } from "@/components/BookButton";
import { Turnstile } from "@/components/contact/Turnstile";
import { WithTodos } from "@/components/Todo";
import { site } from "@/content/site";
import { honeypotField, limits, type EnquiryField, type EnquiryState } from "@/lib/enquiry";

const initialState: EnquiryState = { status: "idle" };

const fieldClass =
  "block w-full bg-transparent focus-visible:outline-offset-1 autofill:shadow-[inset_0_0_0_100vmax_var(--color-paper)] autofill:[-webkit-text-fill-color:var(--color-navy)]";
const inputClass = `${fieldClass} min-h-11 border-b-2 border-navy pt-1 pb-1.5 aria-[invalid=true]:border-b-4 aria-[invalid=true]:border-lantern`;
const messageClass = `${fieldClass} ruled resize-y aria-[invalid=true]:[--rule-color:var(--color-lantern)]`;

/** How long to wait for Cloudflare's script before saying the form can't send. */
const spamCheckTimeoutMs = 10_000;

/** A notch-shaped mark, so an error stands out by shape as well as colour. */
function NotchMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 14" className={`size-3.5 shrink-0 ${className}`}>
      <path d="M0 0H14L7 14Z" />
    </svg>
  );
}

function ErrorText({ children, className = "", ...props }: React.ComponentProps<"p">) {
  return (
    <p {...props} className={`flex gap-2 font-medium text-lantern outline-none ${className}`}>
      <NotchMark className="mt-1 fill-lantern" />
      <span>{children}</span>
    </p>
  );
}

function Field({
  name,
  label,
  note,
  error,
  children,
}: {
  name: EnquiryField;
  label: string;
  note?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="flex items-baseline justify-between gap-4 font-semibold">
        {label}
        {note && <span className="text-small font-normal">{note}</span>}
      </label>
      {children}
      {error && (
        <ErrorText id={`${name}-error`} className="mt-2 text-small">
          {error}
        </ErrorText>
      )}
    </div>
  );
}

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);
  const form = useRef<HTMLFormElement>(null);
  const sent = useRef<HTMLHeadingElement>(null);
  const [spamCheckMissing, setSpamCheckMissing] = useState(false);

  // Without Cloudflare's script the server turns every message away, so say so before they write one.
  useEffect(() => {
    const timeout = setTimeout(() => setSpamCheckMissing(!window.turnstile), spamCheckTimeoutMs);
    return () => clearTimeout(timeout);
  }, []);

  // Move focus to the result, so keyboard and screen-reader users hear what happened.
  useEffect(() => {
    if (state.status === "sent") sent.current?.focus();
    if (state.status === "error") {
      const target =
        form.current?.querySelector<HTMLElement>("[aria-invalid=true]") ??
        form.current?.querySelector<HTMLElement>("[role=alert]");
      target?.focus();
    }
  }, [state]);

  if (state.status === "sent") {
    return (
      <div className="border-t-2 border-navy">
        <NotchMark className="ml-6 fill-navy" />
        <h2 ref={sent} tabIndex={-1} className="mt-5 outline-none">
          Thanks, your message is on its way.
        </h2>
        <p className="mt-4 mb-6 max-w-measure text-lede">
          We&apos;ll reply by email, or by phone if you left a number.
        </p>
        <BookButton size="lg" />
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : undefined;

  function fieldProps(name: EnquiryField) {
    return {
      id: name,
      name,
      maxLength: limits[name],
      defaultValue: values?.[name],
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
    };
  }

  return (
    <form ref={form} action={formAction} className="relative space-y-8">
      {state.status === "error" && (
        <ErrorText role="alert" tabIndex={-1}>
          <WithTodos text={state.message} />
        </ErrorText>
      )}

      <Field name="name" label="Name" error={errors.name}>
        <input type="text" autoComplete="name" required className={inputClass} {...fieldProps("name")} />
      </Field>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field name="email" label="Email" error={errors.email}>
          <input type="email" autoComplete="email" required className={inputClass} {...fieldProps("email")} />
        </Field>
        <Field name="phone" label="Phone" note="Optional" error={errors.phone}>
          <input type="tel" autoComplete="tel" className={inputClass} {...fieldProps("phone")} />
        </Field>
      </div>

      <Field
        name="message"
        label="Message"
        note={`Up to ${limits.message.toLocaleString("en-AU")} characters`}
        error={errors.message}
      >
        <textarea rows={5} required className={messageClass} {...fieldProps("message")} />
      </Field>

      {/* Honeypot: hidden from people and screen readers. Bots fill it in and get ignored. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={honeypotField}>Leave this empty</label>
        <input id={honeypotField} name={honeypotField} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Turnstile resetSignal={state} />

      {spamCheckMissing && (
        <ErrorText role="alert">
          Our spam check didn&apos;t load, so this form can&apos;t send right now. Please reload the page, or
          email <WithTodos text={site.contact.email} />.
        </ErrorText>
      )}

      <noscript>
        <p className="text-small font-medium">
          This form needs JavaScript. You can email us at <WithTodos text={site.contact.email} /> instead.
        </p>
      </noscript>

      <div>
        <button
          type="submit"
          // Not `disabled`, which would throw keyboard focus off the button while it sends.
          aria-disabled={pending}
          onClick={pending ? (event) => event.preventDefault() : undefined}
          className="notched w-full px-7 py-4 text-lede font-semibold text-paper before:bg-navy hover:before:bg-timber active:before:bg-timber aria-disabled:cursor-wait aria-disabled:text-navy aria-disabled:outline-2 aria-disabled:-outline-offset-2 aria-disabled:outline-navy aria-disabled:outline-dashed aria-disabled:before:bg-transparent sm:w-auto sm:min-w-56"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p role="status" className="sr-only">
          {pending ? "Sending your message." : ""}
        </p>
        <p className="mt-3 max-w-measure text-small">
          We only use your details to reply to you. See our{" "}
          <Link href={site.policies.privacy.href} className="swap underline">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
