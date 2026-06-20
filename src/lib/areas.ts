import areasData from "../../content/areas.json";

export type VenueArea = (typeof areasData)[number];

export function getVenueAreas(): VenueArea[] {
  return areasData;
}
