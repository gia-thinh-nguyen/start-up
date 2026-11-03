import { CalEmbed } from "@/components/book/CalEmbed";
import { isTodo, WithTodos } from "@/components/Todo";
import { site } from "@/content/site";

/** The Cal.com calendar, or a labelled placeholder until Cal.com is connected. */
export function BookingCalendar() {
  const { calUsername, event } = site.booking;
  const { phone } = site.contact;

  if (!calUsername) {
    return (
      <div className="flex min-h-[24rem] items-end border-[1.5px] border-dashed border-current p-5">
        <p className="text-small">
          <span className="block font-semibold">Calendar not connected</span>
          Add the Cal.com username to booking.calUsername in src/content/site.ts.
        </p>
      </div>
    );
  }

  const calLink = `${calUsername}/${event.slug}`;

  return (
    <CalEmbed
      calLink={calLink}
      otherWays={
        <>
          <a href={`https://cal.com/${calLink}`} className="swap underline">
            Book on Cal.com
          </a>{" "}
          or call{" "}
          {isTodo(phone) ? (
            <WithTodos text={phone} />
          ) : (
            <a href={`tel:${phone}`} className="swap underline">
              {phone}
            </a>
          )}
          .
        </>
      }
    />
  );
}
