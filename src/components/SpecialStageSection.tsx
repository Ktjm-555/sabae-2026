import { SectionTitle } from "@/components/SectionTitle";
import { SpecialStageDanceContestBlock } from "@/components/SpecialStageDanceContestBlock";
import { SpecialStageDateBar } from "@/components/SpecialStageDateBar";
import { SpecialStageFukuiBlock } from "@/components/SpecialStageFukuiBlock";
import { SpecialStageLdhBlock } from "@/components/SpecialStageLdhBlock";
import { SpecialStageTgcBlock } from "@/components/SpecialStageTgcBlock";
import { SpecialStageWankoSobaBlock } from "@/components/SpecialStageWankoSobaBlock";
import { getSpecialStages } from "@/lib/specialStages";

export function SpecialStageSection() {
  const stages = getSpecialStages();
  const fashionShow = stages.find((stage) => stage.id === "fashion-show");
  const tgcStage = stages.find((stage) => stage.id === "tgc-stage");
  const ldhStage = stages.find((stage) => stage.id === "ldh-workshop");
  const danceContest = stages.find((stage) => stage.id === "dance-contest");
  const wankoSoba = stages.find((stage) => stage.id === "wanko-soba");

  return (
    <section
      id="special-stage"
      className="relative z-10 scroll-mt-24 -mt-6 bg-background-sky pb-10 sm:-mt-8 sm:pb-14 lg:-mt-10 lg:pb-16"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionTitle title="スペシャルステージ" subtitle="SPECIAL STAGE" />

        <p className="mx-auto max-w-[1296px] whitespace-pre-line text-left text-base font-medium leading-8 text-foreground min-[801px]:text-center sm:text-lg lg:text-xl lg:leading-8">
          {`ファッションショー×トーク×ダンス 非日常感あふれるステージで鯖江の魅力を体感しよう！
※17日(土)は事前申込制／詳細は決まり次第お知らせいたします。`}
        </p>

        <div className="mx-auto mt-10 flex max-w-[1296px] flex-col gap-14 sm:mt-12 sm:gap-16 lg:mt-14 lg:gap-20">
          {fashionShow?.dateBar ? (
            <div className="flex flex-col gap-8 lg:gap-10">
              <div className="-mx-4 sm:-mx-6 lg:mx-0">
                <SpecialStageDateBar
                  date={fashionShow.dateBar.date}
                  day={fashionShow.dateBar.day}
                  title={fashionShow.dateBar.title}
                  titleHighlight={fashionShow.dateBar.titleHighlight}
                />
              </div>
              <SpecialStageFukuiBlock stage={fashionShow} />
            </div>
          ) : null}

          {tgcStage ? <SpecialStageTgcBlock stage={tgcStage} /> : null}

          {ldhStage?.dateBar ? (
            <div className="flex flex-col gap-8 lg:gap-10">
              <div className="-mx-4 sm:-mx-6 lg:mx-0">
                <SpecialStageDateBar
                  date={ldhStage.dateBar.date}
                  day={ldhStage.dateBar.day}
                  title={ldhStage.dateBar.title}
                  titleHighlight={ldhStage.dateBar.titleHighlight}
                />
              </div>
              <SpecialStageLdhBlock stage={ldhStage} />
            </div>
          ) : null}

          {danceContest?.dateBar ? (
            <div className="flex flex-col gap-8 lg:gap-10">
              <div className="-mx-4 sm:-mx-6 lg:mx-0">
                <SpecialStageDateBar
                  date={danceContest.dateBar.date}
                  day={danceContest.dateBar.day}
                  title={danceContest.dateBar.title}
                  titleHighlight={danceContest.dateBar.titleHighlight}
                />
              </div>
              <SpecialStageDanceContestBlock stage={danceContest} />
            </div>
          ) : null}

          {wankoSoba?.dateBar ? (
            <div className="flex flex-col gap-8 lg:gap-10">
              <div className="-mx-4 sm:-mx-6 lg:mx-0">
                <SpecialStageDateBar
                  date={wankoSoba.dateBar.date}
                  day={wankoSoba.dateBar.day}
                  title={wankoSoba.dateBar.title}
                  titleHighlight={wankoSoba.dateBar.titleHighlight}
                />
              </div>
              <SpecialStageWankoSobaBlock stage={wankoSoba} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
