import specialStagesData from "../../content/special-stages.json";

export type SpecialStageModel = {
  name?: string;
  image?: string;
  imageAlt?: string;
  comingSoon?: boolean;
  tall?: boolean;
  noBackground?: boolean;
};

export type SpecialStage = {
  id: string;
  dateBar?: {
    date: string;
    day: string;
    title: string;
    titleHighlight: string;
  };
  badge: string;
  title: string;
  titlePrefix?: string;
  subtitle: string;
  description: string;
  image?: string;
  imageAlt?: string;
  models?: SpecialStageModel[];
};

export function getSpecialStages(): SpecialStage[] {
  return specialStagesData;
}
