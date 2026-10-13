const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

/** "From $1,200", or a TODO marker until the price is decided. */
export function formatFromPrice(fromAud: number | null): string {
  return fromAud === null ? "From $[TODO]" : `From ${aud.format(fromAud)}`;
}
