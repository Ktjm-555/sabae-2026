import specialStagesData from "../../content/special-stages.json";

export type SpecialStageModel = {
  name?: string;
  image?: string;
  imageSp?: string;
  imageAlt?: string;
  imageCredit?: string;
  comingSoon?: boolean;
  tall?: boolean;
  noBackground?: boolean;
};

export type SpecialStagePerformer = {
  name?: string;
  image?: string;
  imageSp?: string;
  imageAlt?: string;
  comingSoon?: boolean;
};

export type SpecialStageButton = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

export type SpecialStageFlyer = {
  image: string;
  imageAlt?: string;
};

export type SpecialStageGuest = {
  label: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  imageSp?: string;
  imageAlt?: string;
};

export type SpecialStage = {
  id: string;
  dateBar?: {
    date: string;
    day: string;
    title: string;
    titleHighlight?: string;
    titleSpLine2?: string;
    titleSpCompact?: boolean;
    titleHighlightNoSpace?: boolean;
  };
  badge?: string;
  title?: string;
  titleSpLine2?: string;
  titleLine2?: string;
  producedBy?: string;
  subtitle: string;
  description: string;
  image?: string;
  imageSp?: string;
  imageAlt?: string;
  imageName?: string;
  models?: SpecialStageModel[];
  performers?: SpecialStagePerformer[];
  illustration?: string;
  illustrationAlt?: string;
  button?: SpecialStageButton;
  buttons?: SpecialStageButton[];
  flyers?: SpecialStageFlyer[];
  guests?: SpecialStageGuest[];
};

export function getSpecialStages(): SpecialStage[] {
  return specialStagesData;
}
