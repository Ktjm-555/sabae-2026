import { SectionTitle } from "@/components/SectionTitle";
import { SpecialStageDanceContestBlock } from "@/components/SpecialStageDanceContestBlock";
import { SpecialStageDateBar } from "@/components/SpecialStageDateBar";
import { SpecialStageFukuiBlock } from "@/components/SpecialStageFukuiBlock";
import { SpecialStageLdhBlock } from "@/components/SpecialStageLdhBlock";
import { SpecialStageTgcBlock } from "@/components/SpecialStageTgcBlock";
// import { SpecialStageWankoSobaBlock } from "@/components/SpecialStageWankoSobaBlock";
import { VenueMapWaveBottom } from "@/components/VenueMapWaveBottom";
import { VenueMapSection } from "@/components/VenueMapSection";
import { getSpecialStages } from "@/lib/specialStages";

export function SpecialStageSection() {
  const stages = getSpecialStages();
  const fashionShow = stages.find((stage) => stage.id === "fashion-show");
  const tgcStage = stages.find((stage) => stage.id === "tgc-stage");
  const ldhStage = stages.find((stage) => stage.id === "ldh-workshop");
  const danceContest = stages.find((stage) => stage.id === "dance-contest");
  // const wankoSoba = stages.find((stage) => stage.id === "wanko-soba");

  return (
    <>
      <section
        id="special-stage"
        className="relative z-10 scroll-mt-24 -mt-6 bg-background-sky pb-0 sm:-mt-8 lg:-mt-10"
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 lg:pt-8">
          <p className="mb-2 text-center font-display text-[18px] font-bold text-primary lg:mb-3 lg:text-[24px]">
            めがねのまちさばえ応援プロジェクト
          </p>
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
                    titleSpLine2={fashionShow.dateBar.titleSpLine2}
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
                    titleSpLine2={ldhStage.dateBar.titleSpLine2}
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
                    titleSpLine2={danceContest.dateBar.titleSpLine2}
                    titleSpCompact={danceContest.dateBar.titleSpCompact}
                    titleHighlightNoSpace={danceContest.dateBar.titleHighlightNoSpace}
                  />
                </div>
                <SpecialStageDanceContestBlock stage={danceContest} />
              </div>
            ) : null}

            {/* 一時非表示: 食べて、つながる、さばえの輪（わんこそば大会）
            {wankoSoba?.dateBar ? (
              <div className="flex flex-col gap-8 lg:gap-10">
                <div className="-mx-4 sm:-mx-6 lg:mx-0">
                  <SpecialStageDateBar
                    date={wankoSoba.dateBar.date}
                    day={wankoSoba.dateBar.day}
                    title={wankoSoba.dateBar.title}
                    titleHighlight={wankoSoba.dateBar.titleHighlight}
                    titleSpLine2={wankoSoba.dateBar.titleSpLine2}
                    titleSpCompact={wankoSoba.dateBar.titleSpCompact}
                  />
                </div>
                <SpecialStageWankoSobaBlock stage={wankoSoba} />
              </div>
            ) : null}
            */}
          </div>

          <div
            className="h-20 sm:h-24 lg:h-28"
            aria-hidden="true"
          />
        </div>
        <VenueMapWaveBottom className="relative z-[1] -mt-8 sm:-mt-10 lg:-mt-12" />
      </section>

      <VenueMapSection />
    </>
  );
}
