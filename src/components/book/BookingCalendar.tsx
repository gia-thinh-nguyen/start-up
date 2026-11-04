import { CalEmbed } from "@/components/book/CalEmbed";
import { isTodo, WithTodos } from "@/components/Todo";
import { config } from "@/config";
import { site } from "@/content/site";

/** The Cal.com calendar for the home visit. */
export function BookingCalendar() {
  const { phone, phoneHref } = site.contact;
  const calLink = `${config.cal.username}/${config.cal.event.slug}`;

  return (
    <CalEmbed
      calLink={calLink}
      bookedPath="/book/confirm"
      otherWays={
        <>
          <a href={`https://cal.com/${calLink}`} className="swap underline">
            Book on Cal.com
          </a>{" "}
          or call{" "}
          {isTodo(phone) ? (
            <WithTodos text={phone} />
          ) : (
            <a href={phoneHref} className="swap underline">
              {phone}
            </a>
          )}
          .
        </>
      }
    />
  );
}
