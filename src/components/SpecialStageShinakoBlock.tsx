import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { SpecialStage } from "@/lib/specialStages";

interface SpecialStageShinakoBlockProps {
  stage: SpecialStage;
}

export function SpecialStageShinakoBlock({ stage }: SpecialStageShinakoBlockProps) {
  const imageAlt = stage.imageAlt ?? "しなこ";
  const illustrationAlt = stage.illustrationAlt ?? "しなこワールドLIVE";

  const photo = stage.image ? (
    <div className="relative aspect-[356/329] w-[calc((100%-1rem)/2)] shrink-0 sm:w-[calc((100%-1.5rem)/2)] lg:aspect-[607/496] lg:w-[calc((100cqw-4.5rem)/4)]">
      {stage.imageSp ? (
        <Image
          src={withBasePath(stage.imageSp)}
          alt={imageAlt}
          fill
          className="object-contain lg:hidden"
          sizes="45vw"
        />
      ) : null}
      <Image
        src={withBasePath(stage.image)}
        alt={imageAlt}
        fill
        className={`object-contain ${stage.imageSp ? "hidden lg:block" : ""}`}
        sizes="(max-width: 1024px) 45vw, 25vw"
      />
    </div>
  ) : null;

  const illustration = stage.illustration ? (
    <Image
      src={withBasePath(stage.illustration)}
      alt={illustrationAlt}
      width={147}
      height={325}
      className="h-auto w-[100px] sm:w-[120px] lg:w-[147px]"
      sizes="147px"
    />
  ) : null;

  return (
    <article id={stage.id} className="@container scroll-mt-24 flex flex-col">
      {stage.subtitle ? (
        <>
          <h3 className="text-[24px] font-bold leading-[46px] text-primary lg:text-[26px] lg:leading-[39px]">
            {stage.subtitle}
          </h3>
          <div className="mt-3 border-b border-[#dcdcdc] lg:mt-4" />
        </>
      ) : null}

      <div
        className={`flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8 ${
          stage.subtitle ? "mt-4 lg:mt-5" : ""
        }`}
      >
        <p className="order-1 whitespace-pre-line text-base font-medium leading-8 text-foreground sm:text-lg lg:order-2 lg:min-w-0 lg:flex-1 lg:text-xl lg:leading-8">
          {stage.description}
        </p>

        {photo ? (
          <div className="order-2 flex w-full justify-center lg:order-1 lg:w-auto lg:justify-start">
            {photo}
          </div>
        ) : null}

        {illustration ? (
          <div className="order-3 hidden shrink-0 justify-end lg:flex">
            {illustration}
          </div>
        ) : null}
      </div>
    </article>
  );
}
