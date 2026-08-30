import asobiBoothsData from "../../content/booths/asobi.json";
import gourmetBoothsData from "../../content/booths/gourmet.json";

export type GourmetBooth = (typeof gourmetBoothsData)[number];
export type AsobiBooth = (typeof asobiBoothsData)[number];

export function getGourmetBooths(): GourmetBooth[] {
  return gourmetBoothsData;
}

export function getAsobiBooths(): AsobiBooth[] {
  return asobiBoothsData;
}
