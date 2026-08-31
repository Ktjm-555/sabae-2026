import asobiBoothsData from "../../content/booths/asobi.json";
import gourmetBoothsData from "../../content/booths/gourmet.json";
import highSchoolBoothsData from "../../content/booths/high-school.json";

export type GourmetBooth = (typeof gourmetBoothsData)[number];
export type AsobiBooth = (typeof asobiBoothsData)[number];

type FigmaCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BoothBooth = {
  id: string;
  title: string;
  squareNumber: string;
  squareColor: string;
  imageAlt: string;
  exhibitor?: string;
  note?: string;
  noteColor?: string;
  image?: string;
  imageCrop?: {
    desktop: FigmaCrop;
    sp: FigmaCrop;
  };
};

export function getGourmetBooths(): GourmetBooth[] {
  return gourmetBoothsData;
}

export function getAsobiBooths(): AsobiBooth[] {
  return asobiBoothsData;
}

export function getHighSchoolBooths(): BoothBooth[] {
  return highSchoolBoothsData;
}
