import { CalEmbed } from "@/components/book/CalEmbed";
import { site } from "@/content/site";

/** The Cal.com calendar, or a labelled placeholder until Cal.com is connected. */
export function BookingCalendar() {
  const { calUsername, event } = site.booking;
  const { phone } = site.contact;

  if (!calUsername) {
    return (
      <div className="flex min-h-[24rem] items-end border border-dashed border-current/40 bg-current/5 p-5">
        <p className="text-sm opacity-80">
          <span className="block text-xs font-medium tracking-label uppercase">
            Calendar not connected
          </span>
          Add the Cal.com username to booking.calUsername in src/content/site.ts.
        </p>
      </div>
    );
  }

  const calLink = `${calUsername}/${event.slug}`;
  const linkClass = "underline decoration-ochre underline-offset-4 hover:text-navy";

  return (
    <>
      <CalEmbed calLink={calLink} />
      <p className="mt-6 text-sm">
        Calendar not loading?{" "}
        <a href={`https://cal.com/${calLink}`} className={linkClass}>
          Book on Cal.com
        </a>{" "}
        or call{" "}
        <a href={`tel:${phone}`} className={linkClass}>
          {phone}
        </a>
        .
      </p>
    </>
  );
}
