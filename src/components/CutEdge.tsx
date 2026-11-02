const shapes = {
  /** A shoulder falling away to the right. */
  shoulderLeft: { cut: "M0 6 100 34V48H0Z", seam: "M0 21 100 49" },
  /** A shoulder rising to the right. */
  shoulderRight: { cut: "M0 34 100 4V48H0Z", seam: "M0 49 100 19" },
  /** A neck curve at the left, then the shoulder falling away to the right, as on the first screen. */
  collar: {
    cut: "M0 30C8 30 16 20 22 4L100 30V48H0Z",
    seam: "M0 45C8 45 16 35 22 19L100 45",
  },
  /** An armhole's long curve. */
  armhole: {
    cut: "M0 10C26 10 42 36 68 38 82 39 93 32 100 24V48H0Z",
    seam: "M0 25C26 25 42 51 68 53 82 54 93 47 100 39",
  },
  /** A neck curve at the right, with the shoulder falling away to the left. */
  neck: {
    cut: "M0 34 62 6C70 22 84 32 100 32V48H0Z",
    seam: "M0 49 60 21C68 37 84 47 100 47",
  },
};

type Props = {
  shape: keyof typeof shapes;
  /** The fill-* class of the piece this edge belongs to. */
  fill: string;
};

/**
 * The top edge of a piece, rising over the one before it, which needs at least hem-lg of space below
 * its content. A piece only ever sits on one that comes earlier in the process.
 */
export function CutEdge({ shape, fill }: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 48"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 bottom-full h-hem w-full translate-y-px overflow-visible lg:h-hem-lg ${fill}`}
    >
      <path d={shapes[shape].cut} />
      <path className="seam" d={shapes[shape].seam} />
    </svg>
  );
}
