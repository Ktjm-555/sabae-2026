import Image from "next/image";
import { VenueAreaButton } from "@/components/VenueAreaButton";
import { withBasePath } from "@/lib/basePath";
import type { VenueArea } from "@/lib/areas";

interface VenueAreaItemProps {
  area: VenueArea;
}

export function VenueAreaItem({ area }: VenueAreaItemProps) {
  const imageFirst = area.imagePosition === "left";
  const textInset = imageFirst
    ? "lg:pl-10 xl:pl-16"
    : "lg:pr-10 xl:pr-16";

  const imageBlock = (
    <div
      className={`relative order-2 mt-6 w-full lg:mt-0 lg:w-[48%] lg:max-w-[687px] lg:shrink-0 ${
        imageFirst ? "lg:order-1" : "lg:order-2"
      }`}
    >
      <Image
        src={withBasePath(area.image)}
        alt={area.imageAlt}
        width={1374}
        height={550}
        className="h-auto w-full"
        sizes="(max-width: 1024px) 100vw, 687px"
      />
    </div>
  );

  const textBlock = (
    <div
      className={`order-1 flex w-full flex-col lg:w-[52%] lg:max-w-[653px] lg:justify-center ${
        imageFirst ? "lg:order-2" : "lg:order-1"
      }`}
    >
      <div className="border-b border-[#dcdcdc]">
        <h3
          className={`pb-3 text-center font-display text-[28px] font-bold leading-tight text-primary sm:text-[32px] lg:pb-4 lg:text-left lg:text-[40px] lg:leading-[50px] ${textInset}`}
        >
          {area.title}
        </h3>
      </div>
      <p
        className={`mt-3 text-center font-display text-sm font-bold tracking-wide text-primary-light sm:text-base lg:mt-4 lg:text-left ${textInset}`}
      >
        {area.subtitle}
      </p>
      <p
        className={`mt-4 text-base font-medium leading-8 text-foreground sm:text-lg lg:mt-5 lg:text-xl lg:leading-8 ${textInset}`}
      >
        {area.description}
      </p>
    </div>
  );

  return (
    <article
      id={area.id}
      className="scroll-mt-24 flex flex-col lg:flex-row lg:items-center"
    >
      {imageBlock}
      {textBlock}
    </article>
  );
}
