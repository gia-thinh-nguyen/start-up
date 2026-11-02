/** A punched hole, in chalk. */
export function PunchedHole({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 22 22" className={`size-5.5 ${className}`}>
      <circle cx="11" cy="11" r="9" className="fill-none stroke-paper stroke-[2.25]" />
    </svg>
  );
}

/** The grainline: a double arrow in chalk. Its length comes from the height set on it. */
export function Grainline({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 110" className={`h-27.5 w-4.5 ${className}`}>
      <path
        d="M9 2V108M2 13 9 2 16 13M2 97 9 108 16 97"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="fill-none stroke-paper stroke-[2.25]"
      />
    </svg>
  );
}
