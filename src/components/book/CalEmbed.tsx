"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

/** How long to wait for Cal.com before offering the other ways to book. */
const loadTimeoutMs = 15_000;

/** Reads a colour token from globals.css so the calendar matches the site. */
function token(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--color-${name}`).trim();
}

/**
 * Cal.com's inline booking calendar.
 *
 * It loads a script from app.cal.com and shows the calendar in an iframe, so the
 * Content-Security-Policy (Step 7) must allow https://app.cal.com in script-src and frame-src.
 * Cal.com receives the visitor's name, contact details and booking answers, so the
 * privacy policy (Step 6) must name it.
 *
 * `otherWays` is what to do if the calendar can't be used. It moves to the top if the calendar fails.
 */
export function CalEmbed({ calLink, otherWays }: { calLink: string; otherWays: React.ReactNode }) {
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    const timeout = setTimeout(() => setStatus((now) => (now === "loading" ? "failed" : now)), loadTimeoutMs);
    getCalApi()
      .then((cal) => {
        const colours = {
          "cal-brand": token("lantern"),
          "cal-brand-emphasis": token("lantern-dark"),
          "cal-brand-text": token("paper"),
          "cal-bg": token("paper"),
          "cal-bg-muted": token("paper"),
          "cal-bg-subtle": token("paper"),
          "cal-bg-emphasis": token("ochre"),
          "cal-text": token("navy"),
          "cal-text-emphasis": token("navy"),
          "cal-text-subtle": token("navy"),
          "cal-text-muted": token("navy"),
          "cal-border": token("navy"),
          "cal-border-subtle": token("navy"),
        };
        cal("ui", {
          // On a phone or tablet Cal stacks its columns, so its copy pushes the month off the screen,
          // and our page already shows the appointment. On desktop, hiding it squeezes the month.
          hideEventTypeDetails: window.matchMedia("(width < 64rem)").matches,
          cssVarsPerTheme: { light: colours, dark: colours },
        });
        cal("on", { action: "linkReady", callback: () => setStatus("ready") });
        cal("on", { action: "linkFailed", callback: () => setStatus("failed") });
      })
      .catch(() => setStatus("failed"));
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {status === "failed" && (
        <p role="alert" className="mb-4 text-lede">
          <span className="font-semibold">The calendar didn&apos;t load.</span> {otherWays}
        </p>
      )}
      {status === "loading" && (
        <>
          <p role="status" className="mb-4">
            Loading the calendar…
          </p>
          <noscript>
            <p className="mb-4">The calendar needs JavaScript. {otherWays}</p>
          </noscript>
        </>
      )}

      {/* On a phone Cal adds its own side padding, so the frame runs past our gutter to line up with it. */}
      <div className={`-mx-gutter md:mx-0 ${status === "failed" ? "" : "min-h-[36rem]"}`}>
        <Cal calLink={calLink} config={{ theme: "light", layout: "month_view" }} className="w-full" />
      </div>

      {status === "ready" && <p className="mt-4 text-small">Calendar not working? {otherWays}</p>}
    </>
  );
}
