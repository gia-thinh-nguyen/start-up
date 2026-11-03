/**
 * The long seam down the card's left edge. It starts where the first screen's shoulder seam turns
 * down, passes each step's notch, and stops where the footer's edge cuts it off.
 */
export function ChalkSeam() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-24 bottom-[calc(var(--spacing-hem)*0.375)] lg:top-35 lg:bottom-[calc(var(--spacing-hem-lg)*0.375)]"
    >
      <svg className="seam-draws absolute left-[calc(var(--seam)-1.5px)] h-full w-[3px]">
        <line className="seam" x1="1.5" y1="0" x2="1.5" y2="100%" />
      </svg>
    </div>
  );
}
