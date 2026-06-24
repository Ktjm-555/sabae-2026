import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { SpecialStage, SpecialStageModel } from "@/lib/specialStages";

interface SpecialStageTgcBlockProps {
  stage: SpecialStage;
}

function TgcModelCard({
  model,
  className,
}: {
  model: SpecialStageModel;
  className?: string;
}) {
  // 画像とイラストの高さを調整（SP版では不要）
  // 画像とイラストで高さを一緒にするとグリットが縦長になる。
  // そのため、イラストの高さを考慮しないようにする必要がある。
  if (model.tall && model.image) {
    const imageAlt = model.imageAlt ?? model.name ?? "TGCモデル";

    return (
      <div className={`relative ${className ?? ""}`}>
        <div className="aspect-[246/227] w-full" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 aspect-[354/396] lg:aspect-[253/309]">
          {model.imageSp ? (
            <Image
              src={withBasePath(model.imageSp)}
              alt={imageAlt}
              fill
              className="object-contain lg:hidden"
              sizes="45vw"
            />
          ) : null}
          <Image
            src={withBasePath(model.image)}
            alt={imageAlt}
            fill
            className={`object-contain ${model.imageSp ? "hidden lg:block" : ""}`}
            sizes="(max-width: 1024px) 45vw, 250px"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className={`relative aspect-[246/227] overflow-hidden rounded-[20px] ${model.noBackground ? "" : "bg-[#f3f2f9]"}`}
      >
        {model.image ? (
          <Image
            src={withBasePath(model.image)}
            alt={model.imageAlt ?? model.name ?? "TGCモデル"}
            fill
            className={model.noBackground ? "object-contain" : "object-cover"}
            sizes="(max-width: 1024px) 45vw, 250px"
          />
        ) : model.comingSoon ? (
          <div className="flex h-full items-center justify-center px-4 text-center font-display text-[24px] font-normal leading-8 whitespace-pre-line text-[#868686] lg:text-[32px] lg:leading-[46px]">
            {"COMING\nSOON"}
          </div>
        ) : null}
      </div>

      {model.name ? (
        <p className="mt-2 text-center text-base font-medium text-foreground sm:text-xl">
          {model.name}
        </p>
      ) : null}
    </div>
  );
}

export function SpecialStageTgcBlock({ stage }: SpecialStageTgcBlockProps) {
  const models = stage.models ?? [];

  return (
    <article
      id={stage.id}
      className="scroll-mt-24 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-14"
    >
      <div className="flex w-full flex-col lg:w-[42%] lg:max-w-[504px] lg:shrink-0">
        {/* <span className="inline-flex h-8 w-fit items-center justify-center rounded-[20px] bg-gold px-4 text-base font-bold text-white">
          {stage.badge}
        </span> */}

        <div className="relative mt-3 lg:mt-4">
          <h3 className="pb-3 font-sans text-[24px] font-bold leading-9 text-primary lg:pb-4 lg:text-[32px] lg:leading-[46px]">
            {stage.title}
            {stage.titleLine2 ? (
              <>
                <br />
                {stage.titleLine2}{" "}
                {stage.producedBy ? (
                  <span className="text-[20px] leading-9 lg:text-2xl lg:leading-[46px]">
                    {stage.producedBy}
                  </span>
                ) : null}
              </>
            ) : null}
          </h3>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 left-0 border-b border-[#dcdcdc]"
          />
        </div>

        <p className="mt-3 text-2xl font-bold leading-tight text-primary sm:text-[28px] lg:mt-4 lg:text-[32px] lg:leading-[46px]">
          {stage.subtitle}
        </p>

        <p className="mt-4 text-base font-medium leading-8 text-foreground sm:text-lg lg:mt-5 lg:text-xl lg:leading-8">
          {stage.description}
        </p>
      </div>

      <div className="w-full lg:w-[58%] lg:max-w-[797px]">
        <div className="grid grid-cols-2 items-start gap-x-4 gap-y-4 overflow-visible sm:grid-cols-3 sm:grid-rows-2 sm:gap-x-6 sm:gap-y-6">
          <TgcModelCard model={models[0]} />
          <TgcModelCard model={models[1]} />
          <TgcModelCard model={models[2]} className="sm:col-start-3 sm:row-start-1" />
          <TgcModelCard model={models[3]} className="sm:col-start-1 sm:row-start-2" />
          <TgcModelCard model={models[4]} className="sm:col-start-2 sm:row-start-2" />
          <TgcModelCard model={models[5]} className="sm:col-start-3 sm:row-start-2" />
        </div>

        <p className="mt-2 text-left text-[13px] font-medium text-foreground lg:text-[14px]">
          ※掲載順は五十音順です。
        </p>
      </div>
    </article>
  );
}
