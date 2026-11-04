import { ContactLink } from "@/components/ContactLink";
import { WithTodos } from "@/components/Todo";
import { site } from "@/content/site";

function Detail({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-small font-semibold">{term}</dt>
      <dd className="mt-0.5 text-lede">{children}</dd>
    </div>
  );
}

export function ContactDetails() {
  const { contact, serviceArea } = site;

  return (
    <dl className="space-y-4">
      <Detail term="Phone">
        <ContactLink text={contact.phone} href={contact.phoneHref} />
      </Detail>
      <Detail term="Email">
        <ContactLink text={contact.email} href={`mailto:${contact.email}`} />
      </Detail>
      {contact.instagram && (
        <Detail term="Instagram">
          <ContactLink text={contact.instagram.label} href={contact.instagram.href} external />
        </Detail>
      )}
      <Detail term="Where we fit">
        <WithTodos text={serviceArea.summary} />
        {serviceArea.suburbs.length > 0 && (
          <span className="mt-1 block text-body">{serviceArea.suburbs.join(", ")}</span>
        )}
      </Detail>
      <Detail term="Travel">
        <WithTodos text={serviceArea.travelFee} />
      </Detail>
    </dl>
  );
}
