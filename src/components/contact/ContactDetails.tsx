import { ContactLink } from "@/components/ContactLink";
import { ItemNotch } from "@/components/ItemNotch";
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
      <Detail term="Travel from Keysborough">
        <ul className="mt-1 space-y-1.5">
          {serviceArea.travelBands.map(({ distance, cost }) => (
            <li key={distance} className="flex gap-3">
              <ItemNotch />
              <span>
                <span className="font-semibold">{distance}:</span> {cost}
              </span>
            </li>
          ))}
        </ul>
      </Detail>
    </dl>
  );
}
