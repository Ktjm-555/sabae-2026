import venueMapData from "../../content/venue-map.json";

export type VenueMapConfig = typeof venueMapData;

export function getVenueMapConfig(): VenueMapConfig {
  return venueMapData;
}
