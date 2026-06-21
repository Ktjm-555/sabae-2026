import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { SpecialStage, SpecialStagePerformer } from "@/lib/specialStages";

interface SpecialStageLdhBlockProps {
  stage: SpecialStage;
}

function splitPerformerName(name: string): { main: string; suffix?: string } {
  const match = name.match(/^(.+?)（(.+)）$/);
  if (!match) return { main: name };
  return { main: match[1], suffix: `（${match[2]}）` };
}

function PerformerName({ name }: { name: string }) {
  const { main, suffix } = splitPerformerName(name);

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

function PerformerCard({ performer }: { performer: SpecialStagePerformer }) {
  const imageAlt = performer.imageAlt ?? performer.name ?? "LDHダンスワークショップ";

  return (
    <div className="@container">
      <div className="relative aspect-[178/164] overflow-hidden rounded-[20px] bg-[#f3f2f9] lg:aspect-[304/227]">
        {performer.comingSoon ? (
          <div className="flex h-full items-center justify-center px-4 text-center font-display text-[32px] font-medium leading-[46px] whitespace-pre-line text-[#868686]">
            {"COMING\nSOON"}
          </div>
        ) : performer.image ? (
          <>
            {performer.imageSp ? (
              <Image
                src={withBasePath(performer.imageSp)}
                alt={imageAlt}
                width={356}
                height={329}
                className="h-full w-full object-cover lg:hidden"
                sizes="45vw"
              />
            ) : null}
            <Image
              src={withBasePath(performer.image)}
              alt={imageAlt}
              width={609}
              height={454}
              className={`h-full w-full object-cover ${performer.imageSp ? "hidden lg:block" : ""}`}
              sizes="(max-width: 1024px) 45vw, 305px"
            />
          </>
        ) : null}
      </div>

      {performer.name ? (
        <p className="mt-2 text-center text-base font-medium text-foreground sm:text-xl">
          <PerformerName name={performer.name} />
        </p>
      ) : null}
    </div>
  );
}

export function SpecialStageLdhBlock({ stage }: SpecialStageLdhBlockProps) {
  const performers = stage.performers ?? [];

  return (
    <article id={stage.id} className="scroll-mt-24 flex flex-col">
      <h3 className="text-2xl font-bold leading-tight text-primary sm:text-[28px] lg:text-[32px] lg:leading-[46px]">
        {stage.subtitle}
      </h3>

      <div className="mt-3 border-b border-[#dcdcdc] lg:mt-4" />

      <p className="mt-4 whitespace-pre-line text-base font-medium leading-8 text-foreground sm:text-lg lg:mt-5 lg:text-xl lg:leading-8">
        {stage.description}
      </p>

      {performers.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-10 lg:grid-cols-4">
          {performers.map((performer, index) => (
            <PerformerCard key={`${performer.name ?? performer.image ?? "performer"}-${index}`} performer={performer} />
          ))}
        </div>
      ) : null}
    </article>
  );
}
