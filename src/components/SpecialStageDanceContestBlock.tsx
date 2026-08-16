import Image from "next/image";
import { VenueAreaButton } from "@/components/VenueAreaButton";
import { withBasePath } from "@/lib/basePath";
import type {
  SpecialStage,
  SpecialStageFlyer,
  SpecialStageGuest,
} from "@/lib/specialStages";

interface SpecialStageDanceContestBlockProps {
  stage: SpecialStage;
}

function FlyerPreview({
  flyers,
  className,
}: {
  flyers: SpecialStageFlyer[];
  className?: string;
}) {
  if (flyers.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {flyers.map((flyer) => (
        <div
          key={flyer.image}
          className="overflow-hidden rounded-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.1)]"
        >
          <Image
            src={withBasePath(flyer.image)}
            alt={flyer.imageAlt ?? "チラシ"}
            width={222}
            height={316}
            className="h-auto w-[177px] lg:w-[222px]"
            sizes="(max-width: 1024px) 177px, 222px"
          />
        </div>
      ))}
    </div>
  );
}

function GuestCard({ guest }: { guest: SpecialStageGuest }) {
  const imageAlt = guest.imageAlt ?? `${guest.label} ${guest.name}`;

  return (
    <article className="flex flex-row items-start gap-4 md:gap-6 lg:gap-6">
      <div className="relative aspect-[142/131] w-[142px] shrink-0 self-start overflow-hidden rounded-[20px] md:aspect-[357/330] md:w-[calc((100%-1.5rem)/2)] lg:aspect-[607/496] lg:w-[calc((100cqw-4.5rem)/4)]">
        <Image
          src={withBasePath(guest.image)}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 767px) 142px, (max-width: 1024px) 45vw, 25vw"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-[10px] font-medium leading-none text-foreground md:text-sm md:leading-snug lg:text-xs lg:leading-8">
          {guest.role}
        </p>
        <div className="mt-2 flex items-center md:mt-1.5 lg:mt-0.5">
          <span className="text-base font-bold leading-none text-foreground md:text-xl lg:text-2xl lg:leading-8">
            {guest.label}
          </span>
          <span
            className="mx-2 h-3.5 w-px shrink-0 bg-foreground md:h-4 lg:mx-3 lg:h-[21px]"
            aria-hidden="true"
          />
          <span className="text-base font-bold leading-none text-foreground md:text-xl lg:text-2xl lg:leading-8">
            {guest.name}
          </span>
        </div>
        <span className="mt-3 inline-flex h-4 w-[78px] shrink-0 items-center justify-center self-start rounded-[20px] bg-[#969696] text-[10px] font-bold leading-none text-white lg:mt-2 lg:h-[23px] lg:w-[115px] lg:text-sm">
          プロフィール
        </span>
        <p className="mt-1.5 text-[10px] font-medium leading-4 text-foreground md:mt-2 md:text-base md:leading-7 lg:text-[13px] lg:leading-[21px]">
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
  const flyers = stage.flyers ?? [];
  const buttons =
    stage.buttons ?? (stage.button ? [stage.button] : []);
  const [applicationButton, downloadButton] = buttons;

  return (
    <article id={stage.id} className="@container scroll-mt-24 flex flex-col">
      <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between lg:gap-6">
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="text-[24px] font-bold leading-[46px] text-primary lg:text-[26px]">
            {stage.subtitle}
          </h3>

          <div className="mt-3 border-b border-[#dcdcdc] lg:mt-4" />

          <p className="mt-4 whitespace-pre-line text-base font-medium leading-8 text-foreground sm:text-lg lg:mt-5 lg:max-w-[808px] lg:text-xl lg:leading-8">
            {stage.description}
          </p>

          {buttons.length > 0 ? (
            <div className="mt-5 hidden flex-1 flex-col justify-end lg:flex">
              <div className="flex flex-row items-center justify-start gap-3">
                {applicationButton ? (
                  <VenueAreaButton
                    href={applicationButton.href}
                    label={applicationButton.label}
                    external={applicationButton.external}
                    download={applicationButton.download}
                    className="min-w-[283px]"
                  />
                ) : null}
                {downloadButton ? (
                  <VenueAreaButton
                    href={downloadButton.href}
                    label={downloadButton.label}
                    external={downloadButton.external}
                    download={downloadButton.download}
                    className="min-w-[283px]"
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        {flyers.length > 0 ? (
          <FlyerPreview
            flyers={flyers}
            className="hidden shrink-0 items-start gap-5 self-start lg:flex"
          />
        ) : null}
      </div>

      {buttons.length > 0 ? (
        <div className="mt-4 flex flex-col items-center gap-6 lg:hidden">
          {applicationButton ? (
            <VenueAreaButton
              href={applicationButton.href}
              label={applicationButton.label}
              external={applicationButton.external}
              download={applicationButton.download}
              className="min-w-[223px]"
            />
          ) : null}

          {flyers.length > 0 ? (
            <FlyerPreview
              flyers={flyers}
              className="flex items-start justify-center gap-4"
            />
          ) : null}

          {downloadButton ? (
            <VenueAreaButton
              href={downloadButton.href}
              label={downloadButton.label}
              external={downloadButton.external}
              download={downloadButton.download}
              className="min-w-[223px]"
            />
          ) : null}
        </div>
      ) : null}

      {guests.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
          {guests.map((guest) => (
            <GuestCard key={`${guest.label}-${guest.name}`} guest={guest} />
          ))}
        </div>
      ) : null}
    </article>
  );
}
