#!/usr/bin/env node
/**
 * Rebuilds src/content/travel-distances.ts: the driving distance from Keysborough to each postcode.
 * Needs Node 22 or later and no packages. Run it again if the base moves.
 *
 *   node scripts/travel-distances.mjs                       from the centre of postcode 3173
 *   node scripts/travel-distances.mjs --from -38.0,145.17   from this latitude,longitude (e.g. your street)
 *
 * Postcode areas: ABS ASGS 2021 postal areas (CC BY 4.0). Driving distances: the public OSRM router on
 * OpenStreetMap data (ODbL), asked in a few small batches as its usage policy expects.
 */
import { writeFileSync } from "node:fs";

const keepKm = 45;
const searchKm = 60;
const basePostcode = "3173";
const output = "src/content/travel-distances.ts";

const fromArg = process.argv.indexOf("--from");
const from = fromArg > 0 ? process.argv[fromArg + 1].split(",").map(Number) : null;

/** Area-weighted centre of a polygon's outer ring. */
function centre(ring) {
  let area = 0, x = 0, y = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const [x0, y0] = ring[i];
    const [x1, y1] = ring[i + 1];
    const cross = x0 * y1 - x1 * y0;
    area += cross;
    x += (x0 + x1) * cross;
    y += (y0 + y1) * cross;
  }
  return { area: Math.abs(area / 2), lon: x / (3 * area), lat: y / (3 * area) };
}

async function postalAreas() {
  const query = new URLSearchParams({
    geometry: "145.17,-38.00",
    geometryType: "esriGeometryPoint",
    inSR: "4326",
    spatialRel: "esriSpatialRelIntersects",
    distance: String(searchKm),
    units: "esriSRUnit_Kilometer",
    outFields: "poa_code_2021",
    returnGeometry: "true",
    outSR: "4326",
    maxAllowableOffset: "0.002",
    f: "geojson",
  });
  const response = await fetch(`https://geo.abs.gov.au/arcgis/rest/services/ASGS2021/POA/MapServer/0/query?${query}`);
  const { features } = await response.json();
  const centres = {};
  for (const feature of features) {
    const { type, coordinates } = feature.geometry;
    const polygons = type === "Polygon" ? [coordinates] : coordinates;
    const largest = polygons.map((polygon) => centre(polygon[0])).sort((a, b) => b.area - a.area)[0];
    centres[feature.properties.poa_code_2021] = largest;
  }
  return centres;
}

async function drivingKm(origin, centres) {
  const codes = Object.keys(centres).sort();
  const km = {};
  for (let i = 0; i < codes.length; i += 80) {
    const batch = codes.slice(i, i + 80);
    const points = [origin, ...batch.map((code) => centres[code])].map((p) => `${p.lon},${p.lat}`).join(";");
    const response = await fetch(
      `https://router.project-osrm.org/table/v1/driving/${points}?sources=0&annotations=distance`,
      { headers: { "User-Agent": "saigon-tailors-travel-zones/1.0" } },
    );
    const body = await response.json();
    if (body.code !== "Ok") throw new Error(`OSRM: ${body.code} ${body.message ?? ""}`);
    batch.forEach((code, j) => (km[code] = Math.round(body.distances[0][j + 1] / 100) / 10));
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  return km;
}

const centres = await postalAreas();
const origin = from ? { lat: from[0], lon: from[1] } : centres[basePostcode];
const km = await drivingKm(origin, centres);
const rows = Object.entries(km)
  .filter(([, distance]) => distance <= keepKm)
  .sort(([a], [b]) => a.localeCompare(b));
const lines = [];
for (let i = 0; i < rows.length; i += 6) {
  lines.push(`  ${rows.slice(i, i + 6).map(([code, distance]) => `"${code}": ${distance}`).join(", ")},`);
}
const today = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
const base = from ? `${from[0]},${from[1]} in Keysborough` : `the centre of postcode ${basePostcode} (Keysborough)`;

writeFileSync(
  output,
  `/**
 * Driving distance in km from Keysborough to each postcode within ${keepKm} km, used to work out the travel fee.
 *
 * How it was made (${today}, by scripts/travel-distances.mjs): each postcode is the centre of its ABS postal area
 * (ASGS 2021, © Australian Bureau of Statistics, CC BY 4.0), and the distance is the shortest drive from
 * ${base}, routed on OpenStreetMap data (© OpenStreetMap contributors, ODbL) by the public OSRM router.
 * A postcode covers many streets, so one near a boundary can be a few km out either way: the owner checks those.
 *
 * Postcodes not listed are further than ${keepKm} km away, or have no postal area of their own (PO boxes, for example).
 */
export const drivingKm: Readonly<Record<string, number>> = {
${lines.join("\n")}
};
`,
);
console.log(`Wrote ${rows.length} postcodes to ${output}`);
