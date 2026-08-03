import Image from "next/image";
import { VenueAreaButton } from "@/components/VenueAreaButton";
import { withBasePath } from "@/lib/basePath";
import type { SpecialStage, SpecialStageGuest } from "@/lib/specialStages";

interface SpecialStageDanceContestBlockProps {
  stage: SpecialStage;
}

function GuestCard({ guest }: { guest: SpecialStageGuest }) {
  const imageAlt = guest.imageAlt ?? `${guest.label} ${guest.name}`;

  return (
    <article className="flex flex-col gap-4 min-[1061px]:flex-row min-[1061px]:gap-0">
      <div className="w-full shrink-0 min-[1061px]:w-[304px]">
        <Image
          src={withBasePath(guest.image)}
          alt={imageAlt}
          width={607}
          height={454}
          className="h-auto w-full rounded-[20px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1060px) 45vw, 304px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col min-[1061px]:ml-8 min-[1061px]:border-l min-[1061px]:border-foreground min-[1061px]:pl-8">
        <p className="text-xs font-medium leading-8 text-foreground">{guest.role}</p>
        <p className="text-xl font-bold leading-8 text-foreground sm:text-2xl">
          {guest.label}　{guest.name}
        </p>
        <span className="mt-1 inline-flex h-[23px] w-[115px] items-center justify-center rounded-[20px] bg-[#969696] text-sm font-bold text-white">
          プロフィール
        </span>
        <p className="mt-3 text-[13px] font-medium leading-[21px] text-foreground">
          {guest.bio}
        </p>
      </div>
    </article>
  );
}

export function SpecialStageDanceContestBlock({
  stage,
}: SpecialStageDanceContestBlockProps) {
  const guests = stage.guests ?? [];

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

      {guests.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-6 min-[1061px]:mt-14 min-[1061px]:gap-x-16 min-[1061px]:gap-y-12">
          {guests.map((guest) => (
            <GuestCard key={`${guest.label}-${guest.name}`} guest={guest} />
          ))}
        </div>
      ) : null}
    </article>
  );
}
