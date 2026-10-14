import { SectionTitle } from "@/components/SectionTitle";
import { getStageSchedule } from "@/lib/stageSchedule";

export function StageScheduleSection() {
  const schedule = getStageSchedule();

  return (
    <section
      id="stage-schedule"
      className="scroll-mt-24 mx-auto max-w-[1400px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8"
    >
      <SectionTitle
        title="ステージスケジュール"
        subtitle="STAGE SCHEDULE"
        titleClassName="whitespace-nowrap text-[clamp(22px,7.5vw,32px)] lg:text-[40px]"
      />

      <div className="mx-auto grid max-w-[1294px] gap-5 lg:grid-cols-2 lg:gap-11">
        {schedule.days.map((day) => (
          <article
            key={day.date}
            className="rounded-[20px] bg-white px-5 pb-5 pt-5 shadow-[0_0_4px_2px_rgba(0,0,0,0.1)] sm:px-[23px] lg:min-h-[285px] lg:pb-5 lg:pt-[21px]"
          >
            <div className="flex items-baseline gap-1 text-black">
              <span className="font-sans text-[32px] font-bold leading-none lg:text-[36px] lg:leading-[30px]">
                {day.date}
              </span>
              <span className="font-sans text-xl font-bold leading-none lg:text-2xl lg:leading-[30px]">
                {day.day}
              </span>
            </div>

            <div className="mt-4 h-px bg-[#DCDCDC] lg:mt-5" aria-hidden="true" />

            <ul className="mt-4 lg:mt-[23px]">
              {day.items.map((item) => (
                <li
                  key={`${day.date}-${item.time}`}
                  className="flex text-base leading-7 text-foreground"
                >
                  <span className="shrink-0">{item.time}　</span>
                  <span className="font-bold">{item.title}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
