import { site } from "@/content/site";

const linkClass = "underline decoration-ochre underline-offset-4 hover:text-navy";

export function ContactDetails() {
  const { contact, serviceArea } = site;

  const details = [
    {
      term: "Phone",
      value: (
        <a href={`tel:${contact.phone}`} className={linkClass}>
          {contact.phone}
        </a>
      ),
    },
    {
      term: "Email",
      value: (
        <a href={`mailto:${contact.email}`} className={`break-words ${linkClass}`}>
          {contact.email}
        </a>
      ),
    },
    {
      term: "Instagram",
      value: (
        <a href={contact.instagram.href} className={linkClass} rel="noopener noreferrer" target="_blank">
          {contact.instagram.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ),
    },
    {
      term: "Area",
      value: (
        <>
          {serviceArea.summary}
          {serviceArea.suburbs.length > 0 && (
            <span className="mt-2 block text-sm">{serviceArea.suburbs.join(", ")}</span>
          )}
        </>
      ),
    },
    { term: "Travel", value: serviceArea.travelFee },
  ];

  return (
    <dl className="border-t border-timber/20">
      {details.map((item) => (
        <div
          key={item.term}
          className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-timber/20 py-4"
        >
          <dt className="text-xs font-medium tracking-label text-lantern uppercase">{item.term}</dt>
          <dd className="min-w-0">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
