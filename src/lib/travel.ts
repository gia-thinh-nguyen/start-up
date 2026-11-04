import { site } from "@/content/site";
import { drivingKm } from "@/content/travel-distances";

/** free and fee get a calendar; far and unknown are asked to get a quote. */
export type TravelZone = "free" | "fee" | "far" | "unknown";

export const postcodePattern = /^\d{4}$/;

/** The travel zone for a four-digit postcode, from its driving distance to Keysborough. */
export function travelZone(postcode: string): TravelZone {
  if (!Object.hasOwn(drivingKm, postcode)) return "unknown";

  const km = drivingKm[postcode];
  const { freeKm, maxKm } = site.serviceArea;
  if (km <= freeKm) return "free";
  if (km <= maxKm) return "fee";
  return "far";
}
