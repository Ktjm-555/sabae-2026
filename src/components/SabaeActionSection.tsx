import Image from "next/image";
import { SabaeActionCarousel } from "@/components/SabaeActionCarousel";
import { VenueAreaButton } from "@/components/VenueAreaButton";
import { withBasePath } from "@/lib/basePath";
import { getSabaeActionContent } from "@/lib/sabaeAction";

const titleHeadingClassName =
  "inline-flex items-end font-sans font-bold leading-none text-primary";
const titleSuffixClassName =
  "translate-y-[0.2em] text-[1.43em] leading-none max-[638px]:translate-y-[0.14em] sm:text-[1.5625em]";
const titleRubyClassName =
  "font-sans font-bold leading-[39px] text-primary";

export function SabaeActionSection() {
  const content = getSabaeActionContent();

  return (
    <section
      id="sabae-action"
      className="relative z-10 scroll-mt-24 bg-white pb-10 pt-6 sm:pb-14 sm:pt-8 lg:pb-16 lg:pt-10"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1326px]">
          <div className="hidden lg:flex lg:items-start lg:gap-8 xl:gap-10">
            <div className="shrink-0 lg:w-[383px]">
              <Image
                src={withBasePath(content.logo)}
                alt={content.logoAlt}
                width={766}
                height={428}
                className="h-auto w-full"
                sizes="383px"
              />
            </div>

            <div className="min-w-0 flex-1 pt-1.5">
              <p className="font-sans text-2xl font-bold leading-tight text-foreground">
                {content.eyebrow}
              </p>
              <div className="mt-0 flex flex-wrap items-baseline gap-x-2">
                <h2 className={`${titleHeadingClassName} text-[32px]`}>
                  <span>{content.title}</span>
                  <span className={titleSuffixClassName}>{content.titleSuffix}</span>
                </h2>
                <span className={`${titleRubyClassName} text-2xl`}>
                  {content.titleRuby}
                </span>
              </div>
              <div className="mt-3 border-b border-[#dcdcdc] lg:mt-4" />
              <p className="mt-4 max-w-[923px] text-xl font-medium leading-8 text-foreground lg:mt-5">
                {content.description}
              </p>
              <div className="mt-6">
                <VenueAreaButton
                  href={content.buttonHref}
                  label={content.buttonLabel}
                  external
                />
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <p className="font-sans text-xl font-bold leading-tight text-foreground sm:text-2xl">
              {content.eyebrow}
            </p>
            <div className="mt-0 flex flex-wrap items-baseline gap-x-2">
              <h2 className={`${titleHeadingClassName} text-[28px] sm:text-[32px]`}>
                <span>{content.title}</span>
                <span className={titleSuffixClassName}>{content.titleSuffix}</span>
              </h2>
              <span className={`${titleRubyClassName} text-xl sm:text-2xl`}>
                {content.titleRuby}
              </span>
            </div>
            <div className="mt-3 border-b border-[#dcdcdc] lg:mt-4" />
            <p className="mt-4 text-base font-medium leading-8 text-foreground sm:text-lg lg:mt-5">
              {content.description}
            </p>

            <div className="mt-6 flex flex-col items-center">
              <VenueAreaButton
                href={content.buttonHref}
                label={content.buttonLabel}
                external
              />
              <Image
                src={withBasePath(content.logo)}
                alt={content.logoAlt}
                width={766}
                height={428}
                className="mt-6 h-auto w-full max-w-[360px] sm:max-w-[383px]"
                sizes="(max-width: 640px) 100vw, 383px"
              />
            </div>
          </div>

          <div className="mt-10 sm:mt-12 lg:mt-14">
            <SabaeActionCarousel items={content.items} />
          </div>
        </div>
      </div>
    </section>
  );
}
