import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { SpecialStage, SpecialStageModel } from "@/lib/specialStages";

interface SpecialStageTgcBlockProps {
  stage: SpecialStage;
}

function splitModelName(name: string): { main: string; suffix?: string } {
  const match = name.match(/^(.+?)（(.+)）$/);
  if (!match) return { main: name };
  return { main: match[1], suffix: `（${match[2]}）` };
}

function ModelName({ name }: { name: string }) {
  const { main, suffix } = splitModelName(name);

  if (!suffix) {
    return <>{name}</>;
  }

  return (
    <>
      <span className="block @[300px]:inline">{main}</span>
      <span className="block @[300px]:inline">{suffix}</span>
    </>
  );
}

function TgcModelCard({ model }: { model: SpecialStageModel }) {
  const imageAlt = model.imageAlt ?? model.name ?? "TGCモデル";

  if (!model.image) {
    return null;
  }

  return (
    <div className="@container">
      <div className="relative aspect-[357/330] w-full lg:aspect-[607/497]">
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

      {model.name ? (
        <p className="mt-2 text-center text-base font-medium text-foreground sm:text-xl">
          <ModelName name={model.name} />
        </p>
      ) : null}
    </div>
  );
}

export function SpecialStageTgcBlock({ stage }: SpecialStageTgcBlockProps) {
  const models = stage.models ?? [];

  return (
    <article id={stage.id} className="scroll-mt-24 flex flex-col">
      <div className="relative mt-3 lg:mt-4">
        <h3 className="pb-3 font-sans text-[24px] font-bold leading-9 text-primary lg:pb-4 lg:text-[32px] lg:leading-[46px]">
          <span className="lg:hidden">
            {stage.title}
            {stage.titleLine2 ? (
              <>
                <br />
                {stage.titleLine2}{" "}
                {stage.producedBy ? (
                  <span className="text-[20px] leading-9">{stage.producedBy}</span>
                ) : null}
              </>
            ) : null}
          </span>
          <span className="hidden lg:inline">
            {stage.title}
            {stage.titleLine2 ? stage.titleLine2 : ""}{" "}
            {stage.producedBy ? (
              <span className="text-2xl leading-[46px]">{stage.producedBy}</span>
            ) : null}
          </span>
        </h3>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 left-0 border-b border-[#dcdcdc]"
        />
      </div>

      <p className="mt-3 text-[20px] font-bold leading-[46px] text-primary lg:mt-4 lg:text-[26px]">
        {stage.subtitle}
      </p>

      <p className="mt-4 text-base font-medium leading-8 text-foreground sm:text-lg lg:mt-5 lg:text-xl lg:leading-8">
        {stage.description}
      </p>

      <p className="mt-2 text-right text-[13px] font-medium text-foreground lg:mt-3 lg:text-[14px]">
        ※掲載順は五十音順です。
      </p>

      <div className="mt-4 grid grid-cols-2 items-start gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6 lg:mt-5 lg:grid-cols-4">
        {models.map((model, index) => (
          <TgcModelCard
            key={`${model.name ?? model.image ?? "model"}-${index}`}
            model={model}
          />
        ))}
      </div>
    </article>
  );
}
