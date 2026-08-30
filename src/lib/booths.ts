import gourmetBoothsData from "../../content/booths/gourmet.json";

export type GourmetBooth = (typeof gourmetBoothsData)[number];

export function getGourmetBooths(): GourmetBooth[] {
  return gourmetBoothsData;
}
