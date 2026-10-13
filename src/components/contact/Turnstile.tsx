"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

// Cloudflare's test site key: always passes. Only used in development.
const siteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  (process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : "");

/**
 * Cloudflare Turnstile: checks the visitor is a person, usually without them doing anything.
 * It adds a hidden "cf-turnstile-response" field to the surrounding form.
 *
 * It loads a script from challenges.cloudflare.com and shows the check in an iframe, so the
 * Content-Security-Policy (Step 7) must allow https://challenges.cloudflare.com in script-src
 * and frame-src. Cloudflare checks the visitor's browser, so the privacy policy (Step 6) must name it.
 */
export function Turnstile({ resetSignal }: { resetSignal: unknown }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const turnstile = window.turnstile;
    if (!ready || !turnstile || !container.current) return;

    const id = turnstile.render(container.current, {
      sitekey: siteKey,
      theme: "light",
      size: "flexible",
    });
    widgetId.current = id;
    return () => {
      turnstile.remove(id);
      widgetId.current = null;
    };
  }, [ready]);

  // Each token works once, so get a fresh one after every attempt.
  useEffect(() => {
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }, [resetSignal]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setReady(true)}
      />
      <div ref={container} className="min-h-[65px]" />
    </>
  );
}
