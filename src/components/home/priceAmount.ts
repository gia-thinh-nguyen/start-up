import type { Price } from "@/content/site";
import { formatFromPrice } from "@/lib/price";

/** The number on its own, so it can be the biggest thing in its block. */
export function priceAmount(price: Price) {
  return formatFromPrice(price.fromAud).replace(/^From /, "");
}
