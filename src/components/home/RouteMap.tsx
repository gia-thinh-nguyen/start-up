/**
 * Vietnam and Australia in chalk outline, with a stitched line running down from Saigon to
 * Melbourne. Simplified coastlines, projected so 1 unit is 0.2 degrees: x = (longitude - 100) * 5,
 * y = (24 - latitude) * 5. The headings beside it name both cities, so it's hidden from screen readers.
 */
const vietnam =
  "M40 12.5L34 16.5L29.5 22L29 26.5L32.5 32L36 37L41 39.5L44 44L46 51L47 57L46 62L40 65.5L34 68L33 70.5L28 74L25 77L24 72L22.5 68L26 65.5L31 62L37 58.5L38 53L36.5 48L37.5 44.5L33 39.5L28 34.5L25.5 28.5L20.5 24L20.5 20.5L16 17L11 13L10.5 8L16 7L22.5 6L27 4L33.5 6Z";
const australia =
  "M212.5 173.5L217.5 190L227.5 197.5L231.5 215L245 227.5L254 237.5L266 247.5L268 263L264.5 277.5L256.5 289L251 300L249.5 307.5L237.5 310L231.5 315.5L224.5 311.5L217.5 314L205 310.5L198 306L192.5 298L190.5 291L187.5 295.5L182.5 291.5L177.5 294.5L171 283L156 277.5L145 278.5L130 281.5L120 287L109.5 289.5L97.5 292L89.5 295.5L75 291.5L78.5 280L73 264L67 251L69 238L70.5 229L83.5 223L95 220L105 217.5L111 207L118 201L125 193L135 189L142 194.5L148 187.5L154 182L163 177.5L174 180L183 181L179.5 188L177.5 195L187.5 201L197.5 207.5L204 207L207.5 196L208 183Z";
const tasmania = "M223 323.5L241.5 324.5L240 336L234 338L226 331Z";

/** Saigon (10.78° N, 106.70° E) and Melbourne (37.81° S, 144.96° E). */
const saigon = [33.5, 66.1];
const melbourne = [224.8, 309.1];

/** Chalk on timber or the table; navy on the card, where chalk is too faint to read. */
const inks = {
  paper: "stroke-paper",
  navy: "stroke-navy",
};

export function RouteMap({ ink = "paper", className = "" }: { ink?: keyof typeof inks; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 345"
      fill="none"
      strokeLinejoin="round"
      className={`${inks[ink]} [&_*]:[vector-effect:non-scaling-stroke] ${className}`}
    >
      <g className="stroke-[1.5]">
        <path d={vietnam} />
        <path d={australia} />
        <path d={tasmania} />
      </g>
      <path className="seam" style={{ stroke: "inherit" }} d={`M${saigon.join(" ")}C120 120 200 200 ${melbourne.join(" ")}`} />
      <circle cx={saigon[0]} cy={saigon[1]} r="5" className="stroke-[2.25]" />
      <circle cx={melbourne[0]} cy={melbourne[1]} r="5" className="stroke-[2.25]" />
    </svg>
  );
}
