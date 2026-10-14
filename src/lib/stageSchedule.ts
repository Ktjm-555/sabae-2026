import stageScheduleData from "../../content/stage-schedule.json";

export type StageSchedule = typeof stageScheduleData;

export function getStageSchedule(): StageSchedule {
  return stageScheduleData;
}
