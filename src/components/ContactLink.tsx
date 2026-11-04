import { isTodo, WithTodos } from "@/components/Todo";

type Props = {
  text: string;
  href: string;
  external?: boolean;
};

/** A phone, email or social link. Shows its [TODO] with no link until site.ts holds the real value. */
export function ContactLink({ text, href, external }: Props) {
  if (isTodo(text) || isTodo(href)) return <WithTodos text={text} />;

  // If an email address has to wrap on a narrow screen, it breaks after the @ rather than mid-word.
  const [local, domain] = text.split("@");

  return (
    <a
      href={href}
      className="swap break-words underline"
      {...(external && { rel: "noopener noreferrer", target: "_blank" })}
    >
      {domain === undefined ? (
        text
      ) : (
        <>
          {local}@<wbr />
          {domain}
        </>
      )}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
