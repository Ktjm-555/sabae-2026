import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { SpecialStage } from "@/lib/specialStages";

interface SpecialStageWankoSobaBlockProps {
  stage: SpecialStage;
}

export function SpecialStageWankoSobaBlock({
  stage,
}: SpecialStageWankoSobaBlockProps) {
  const illustration = stage.illustration ? (
    <Image
      src={withBasePath(stage.illustration)}
      alt={stage.illustrationAlt ?? stage.subtitle}
      width={314}
      height={242}
      className="h-auto w-[200px] sm:w-[240px] lg:w-[314px]"
      sizes="314px"
    />
  ) : null;

  return (
    <article id={stage.id} className="scroll-mt-24 flex flex-col">
      <div className="relative">
        <div className="lg:pr-[340px] xl:pr-[360px]">
          <h3 className="text-2xl font-bold leading-tight text-primary sm:text-[28px] lg:text-[32px] lg:leading-[46px]">
            <span className="lg:hidden">
              鯖江青年会議所イベント
              <br />
              わんこそば大会
            </span>
            <span className="hidden lg:inline">{stage.subtitle}</span>
          </h3>

          <div className="mt-3 border-b border-[#dcdcdc] lg:mt-4" />

          <p className="mt-4 whitespace-pre-line text-base font-medium leading-8 text-foreground sm:text-lg lg:mt-5 lg:text-xl lg:leading-8">
            {stage.description}
          </p>
        </div>

        {illustration ? (
          <div className="pointer-events-none absolute top-0 right-0 hidden lg:block">
            {illustration}
          </div>
        ) : null}
      </div>
    </article>
  );
}
