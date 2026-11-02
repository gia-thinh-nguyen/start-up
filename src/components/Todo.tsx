const marker = /(\[TODO:[^\]]*\])/;

/** True if this text is still waiting on a fact, so it can't be used as a link yet. */
export function isTodo(text: string) {
  return marker.test(text);
}

/** Renders copy from site.ts, drawing a dashed outline around each [TODO: …] so it stays visible. */
export function WithTodos({ text }: { text: string }) {
  return text.split(marker).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="todo">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
