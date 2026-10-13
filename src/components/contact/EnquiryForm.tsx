"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { sendEnquiry } from "@/app/contact/actions";
import { Turnstile } from "@/components/contact/Turnstile";
import { site } from "@/content/site";
import { honeypotField, limits, type EnquiryField, type EnquiryState } from "@/lib/enquiry";

const initialState: EnquiryState = { status: "idle" };

const inputClass =
  "mt-2 block w-full border border-timber/70 bg-transparent px-4 py-3 text-base aria-[invalid=true]:border-lantern";

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
      <label
        htmlFor={name}
        className="flex items-baseline justify-between gap-4 text-xs font-medium tracking-label uppercase"
      >
        {label}
        {note && <span className="font-normal tracking-normal normal-case">{note}</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-lantern">
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);
  const form = useRef<HTMLFormElement>(null);
  const sent = useRef<HTMLDivElement>(null);

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
      <div ref={sent} tabIndex={-1} className="border-t border-timber/20 pt-8 outline-none">
        <p className="font-display text-3xl text-navy">Thanks, your message is on its way.</p>
        <p className="mt-4 max-w-prose">
          We&apos;ll reply by email, or by phone if you left a number.
        </p>
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
      className: inputClass,
    };
  }

  return (
    <form ref={form} action={formAction} className="relative space-y-6">
      {state.status === "error" && (
        <p role="alert" tabIndex={-1} className="border-l-2 border-lantern pl-4 text-lantern outline-none">
          {state.message}
        </p>
      )}

      <Field name="name" label="Name" error={errors.name}>
        <input type="text" autoComplete="name" required {...fieldProps("name")} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="email" label="Email" error={errors.email}>
          <input type="email" autoComplete="email" required {...fieldProps("email")} />
        </Field>
        <Field name="phone" label="Phone" note="Optional" error={errors.phone}>
          <input type="tel" autoComplete="tel" {...fieldProps("phone")} />
        </Field>
      </div>

      <Field name="message" label="Message" error={errors.message}>
        <textarea rows={6} required {...fieldProps("message")} />
      </Field>

      {/* Honeypot: hidden from people and screen readers. Bots fill it in and get ignored. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={honeypotField}>Leave this empty</label>
        <input id={honeypotField} name={honeypotField} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Turnstile resetSignal={state} />

      <noscript>
        <p className="text-sm">
          This form needs JavaScript. You can email us at {site.contact.email} instead.
        </p>
      </noscript>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-navy px-7 py-4 text-lg font-medium text-paper transition-colors hover:bg-timber disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className="max-w-xs text-sm">
          We only use your details to reply to you. See our{" "}
          <Link
            href={site.policies.privacy.href}
            className="underline decoration-ochre underline-offset-4 hover:text-navy"
          >
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
