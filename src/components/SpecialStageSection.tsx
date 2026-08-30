import { SpecialStageYellowWaveTop } from "@/components/SpecialStageYellowWaveTop";
import { SectionTitle } from "@/components/SectionTitle";
import { VenueAreaButton } from "@/components/VenueAreaButton";
import { SpecialStageAreaLabel } from "@/components/SpecialStageAreaLabel";
import { SpecialStageDanceContestBlock } from "@/components/SpecialStageDanceContestBlock";
import { SpecialStageDateBar } from "@/components/SpecialStageDateBar";
import { SpecialStageFukuiBlock } from "@/components/SpecialStageFukuiBlock";
import { SpecialStageLdhBlock } from "@/components/SpecialStageLdhBlock";
import { SpecialStageShinakoBlock } from "@/components/SpecialStageShinakoBlock";
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
  const shinakoStage = stages.find((stage) => stage.id === "shinako-world-live");
  const danceContest = stages.find((stage) => stage.id === "dance-contest");
  // const wankoSoba = stages.find((stage) => stage.id === "wanko-soba");

  return (
    <>
      <section
        id="special-stage"
        className="relative z-10 scroll-mt-24 -mt-6 bg-background-sky pb-0 sm:-mt-8 lg:-mt-10"
      >
        <div className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-28 lg:pt-8">
          <SpecialStageAreaLabel date="10.17" day="sat" />

          <p className="mb-2 mt-6 text-center font-display text-[18px] font-bold text-primary sm:mt-8 lg:mb-3 lg:mt-10 lg:text-[24px]">
            めがねのまちさばえ応援プロジェクト
          </p>
          <SectionTitle title="スペシャルステージ" subtitle="SPECIAL STAGE" />

          <div className="mx-auto max-w-[1296px]">
            <div className="mb-4 flex justify-center sm:mb-5 lg:mb-6">
              <span className="inline-flex h-6 min-w-[74px] items-center justify-center rounded-[20px] bg-gold px-3 text-sm font-bold text-white lg:h-[30px] lg:min-w-[106px] lg:px-4 lg:text-xl">
                13:00～
              </span>
            </div>

            <div className="flex flex-col items-center gap-5 sm:gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-7">
              <div className="w-full max-w-[622px]">
                <p className="text-left text-base font-medium leading-8 text-foreground sm:text-lg lg:text-xl">
                  <span className="whitespace-pre-line lg:hidden">
                    {`ファッションショー×トーク×ダンス 非日常感あふれるステージで鯖江の魅力を体感しよう！
※17日(土)は事前申込制`}
                  </span>
                  <span className="hidden lg:block">
                    ファッションショー×トーク×ダンス 非日常感あふれるステージで鯖江の魅力を体感しよう！※17日(土)は事前申込制
                  </span>
                </p>
                <p className="mt-1.5 text-left text-base font-medium leading-[26px] text-foreground">
                  ※雨天時は「鯖江市総合体育館」へ会場変更。荒天中止の場合は10月15日(木) 17:00までに本サイト･SNSで発表いたします。
                </p>
              </div>
              <div className="shrink-0 lg:pt-2">
                <VenueAreaButton href="/ticket" label="入場券のお申込みはこちら" />
              </div>
            </div>
          </div>

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

            {shinakoStage?.dateBar ? (
              <div className="flex flex-col gap-8 lg:gap-10">
                <div className="-mx-4 sm:-mx-6 lg:mx-0">
                  <SpecialStageDateBar
                    date={shinakoStage.dateBar.date}
                    day={shinakoStage.dateBar.day}
                    title={shinakoStage.dateBar.title}
                    titleHighlight={shinakoStage.dateBar.titleHighlight}
                    titleSpLine2={shinakoStage.dateBar.titleSpLine2}
                  />
                </div>
                <SpecialStageShinakoBlock stage={shinakoStage} />
              </div>
            ) : null}
          </div>
        </div>

        {danceContest?.dateBar ? (
          <SpecialStageYellowWaveTop className="relative z-[1] -mt-12 sm:-mt-14 lg:-mt-16" />
        ) : null}

        {!danceContest?.dateBar ? (
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div
              className="h-20 sm:h-24 lg:h-28"
              aria-hidden="true"
            />
          </div>
        ) : null}

        {!danceContest?.dateBar ? (
          <VenueMapWaveBottom className="relative z-[1] -mt-8 sm:-mt-10 lg:-mt-12" />
        ) : null}

        {/* 一時非表示: 食べて、つながる、さばえの輪（わんこそば大会）
        {wankoSoba?.dateBar ? (
          <div className="bg-background-yellow">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
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
            </div>
          </div>
        ) : null}
        */}
      </section>

      {danceContest?.dateBar ? (
        <section className="relative z-[11] -mt-6 bg-background-yellow sm:-mt-8 lg:-mt-px">
          <div className="mx-auto max-w-[1400px] px-4 pt-2 sm:px-6 sm:pt-2 lg:px-8 lg:pt-2">
            <div className="flex flex-col gap-8 lg:gap-10">
              <SpecialStageAreaLabel date="10.18" day="sun" />

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

            <div
              className="h-20 sm:h-24 lg:h-28"
              aria-hidden="true"
            />
          </div>
          <VenueMapWaveBottom className="relative z-[1] -mt-8 sm:-mt-10 lg:-mt-12" />
        </section>
      ) : null}

      <VenueMapSection />
    </>
  );
}
