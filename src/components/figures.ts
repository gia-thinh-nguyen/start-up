import type { Price } from "@/content/site";
import { formatFromPrice } from "@/lib/price";

/** The number on its own, so it can be the biggest thing in its block. */
export function priceAmount(price: Price) {
  return formatFromPrice(price.fromAud).replace(/^From /, "");
}

/** Splits "40% when you place your order" so the figure can lead. Wordier values stay whole. */
export function splitFigure(value: string) {
  const match = value.match(/^(Free|\d+%)\s*(.*)$/);
  return match ? { figure: match[1], rest: match[2] } : { figure: null, rest: value };
}
