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
      const brand = {
        "cal-brand": token("lantern"),
        "cal-brand-emphasis": token("lantern-dark"),
        "cal-brand-text": token("paper"),
      };
      // Our page already shows the appointment name, length and place.
      cal("ui", { hideEventTypeDetails: true, cssVarsPerTheme: { light: brand, dark: brand } });
    });
  }, []);

  return (
    <div className="min-h-[36rem]">
      <Cal calLink={calLink} config={{ theme: "light", layout: "month_view" }} className="w-full" />
    </div>
  );
}
