import Image from "next/image";
import { VenueAreaButton } from "@/components/VenueAreaButton";
import { withBasePath } from "@/lib/basePath";
import type { VenueArea } from "@/lib/areas";

interface VenueAreaItemProps {
  area: VenueArea;
}

export function VenueAreaItem({ area }: VenueAreaItemProps) {
  // 画像が左か右かでボーダーと他の文字列の余白を調整
  const imageFirst = area.imagePosition === "left";
  const textInset = imageFirst
    ? "lg:pl-10 xl:pl-16"
    : "lg:pr-10 xl:pr-16";
  // 謎解きラリーは、画面幅が狭いと楕円画像の透明部分に隙間が見えるため、線を画像の下まで伸ばす。
  const borderAttach =
    area.id === "mystery-rally" ? "lg:-right-[calc(48/52*12%)]" : "";

  const imageBlock = (
    // SPでは画像は下に固定、PCでは、左右交互になる
    <div
      className={`relative z-10 order-2 mt-6 w-full lg:mt-0 lg:w-[48%] lg:max-w-[687px] lg:shrink-0 ${
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
      <div className="relative">
        <h3
          className={`pb-3 text-center font-display text-[28px] font-bold leading-tight text-primary sm:text-[32px] lg:pb-4 lg:text-left lg:text-[40px] lg:leading-[50px] ${textInset}`}
        >
          {area.title}
        </h3>
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-0 bottom-0 left-0 border-b border-[#dcdcdc] ${borderAttach}`}
        />
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
