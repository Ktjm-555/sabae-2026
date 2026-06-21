import Image from "next/image";
import { VenueAreaButton } from "@/components/VenueAreaButton";
import { withBasePath } from "@/lib/basePath";
import type { SpecialStage } from "@/lib/specialStages";

interface SpecialStageDanceContestBlockProps {
  stage: SpecialStage;
}

export function SpecialStageDanceContestBlock({
  stage,
}: SpecialStageDanceContestBlockProps) {
  const illustration = stage.illustration ? (
    <Image
      src={withBasePath(stage.illustration)}
      alt={stage.illustrationAlt ?? stage.subtitle}
      width={139}
      height={309}
      className="h-auto w-[100px] sm:w-[120px] lg:w-[139px]"
      sizes="139px"
    />
  ) : null;

  return (
    <article id={stage.id} className="scroll-mt-24 flex flex-col">
      <div className="relative">
        <div className="lg:pr-40 xl:pr-44">
          <h3 className="text-2xl font-bold leading-tight text-primary sm:text-[28px] lg:text-[32px] lg:leading-[46px]">
            {stage.subtitle}
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

      {stage.button ? (
        <div className="mt-8 flex justify-center lg:mt-10 lg:justify-start">
          <VenueAreaButton
            href={stage.button.href}
            label={stage.button.label}
            external={stage.button.external}
          />
        </div>
      ) : null}
    </article>
  );
}
