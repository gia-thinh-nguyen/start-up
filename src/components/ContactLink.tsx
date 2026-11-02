import { isTodo, WithTodos } from "@/components/Todo";

type Props = {
  text: string;
  href: string;
  external?: boolean;
};

/** A phone, email or social link. Shows its [TODO] with no link until site.ts holds the real value. */
export function ContactLink({ text, href, external }: Props) {
  if (isTodo(text) || isTodo(href)) return <WithTodos text={text} />;

  return (
    <a
      href={href}
      className="swap break-words underline"
      {...(external && { rel: "noopener noreferrer", target: "_blank" })}
    >
      {text}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
