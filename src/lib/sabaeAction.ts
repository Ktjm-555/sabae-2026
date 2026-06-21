import sabaeActionData from "../../content/sabae-action.json";

export type SabaeActionItem = (typeof sabaeActionData.items)[number];
export type SabaeActionContent = typeof sabaeActionData;

export function getSabaeActionContent(): SabaeActionContent {
  return sabaeActionData;
}
