import asobiBoothsData from "../../content/booths/asobi.json";
import gourmetBoothsData from "../../content/booths/gourmet.json";
import highSchoolBoothsData from "../../content/booths/high-school.json";
import partnerBoothsData from "../../content/booths/partners.json";

export type GourmetBooth = (typeof gourmetBoothsData)[number];
export type AsobiBooth = (typeof asobiBoothsData)[number];

type FigmaCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BoothDetail = {
  body?: string;
};

export type BoothBooth = {
  id: string;
  title: string;
  imageAlt: string;
  squareNumber?: string;
  squareColor?: string;
  exhibitor?: string;
  note?: string;
  noteColor?: string;
  squarePending?: boolean;
  image?: string;
  imageBackgroundColor?: string;
  imageSpFit?: string;
  imageCrop?: {
    desktop: FigmaCrop;
    sp: FigmaCrop;
  };
  detail?: BoothDetail;
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

export function getPartnerBooths(): BoothBooth[] {
  return partnerBoothsData;
}
