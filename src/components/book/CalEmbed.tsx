"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

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
 */
export function CalEmbed({ calLink }: { calLink: string }) {
  useEffect(() => {
    getCalApi().then((cal) => {
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
        // On a phone our page already shows the appointment, and Cal's copy pushes the month off the
        // screen. Keep it on wider screens: hiding it there squeezes the month into Cal's details column.
        hideEventTypeDetails: window.matchMedia("(width < 48rem)").matches,
        cssVarsPerTheme: { light: colours, dark: colours },
      });
    });
  }, []);

  return (
    // On a phone Cal adds its own side padding, so the frame runs past our gutter to line up with it.
    <div className="-mx-gutter min-h-[36rem] md:mx-0">
      <Cal calLink={calLink} config={{ theme: "light", layout: "month_view" }} className="w-full" />
    </div>
  );
}
