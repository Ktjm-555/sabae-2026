import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { SpecialStage } from "@/lib/specialStages";

interface SpecialStageFukuiBlockProps {
  stage: SpecialStage;
}

export function SpecialStageFukuiBlock({ stage }: SpecialStageFukuiBlockProps) {
  if (!stage.image) {
    return null;
  }

  // 画像が左で、ボーダーと文字列の余白をいい感じ（ボーダーは画像につける、文字は余白あり）に。
  const textInset = "lg:pl-10 xl:pl-16";
  // 楕円画像の右余白（1200px幅で約10.5%）分だけボーダーを伸ばす。文字位置は変えない。
  const borderAttach = "lg:-left-[calc(48/52*10.5%)]";

  return (
    <article
      id={stage.id}
      className="scroll-mt-24 flex flex-col lg:flex-row lg:items-center"
    >
      <div className="relative z-10 order-2 mt-6 w-full shrink-0 lg:order-1 lg:mt-0 lg:w-[48%] lg:max-w-[600px]">
        <Image
          src={withBasePath(stage.image)}
          alt={stage.imageAlt ?? stage.title ?? stage.subtitle}
          width={1200}
          height={624}
          className="h-auto w-full"
          sizes="(max-width: 1024px) 100vw, 600px"
        />
      </div>

      <div className="order-1 flex w-full flex-col lg:order-2 lg:w-[52%] lg:max-w-[653px] lg:justify-center">
        {/* <div className={textInset}>
          <span className="inline-flex h-8 w-fit items-center justify-center rounded-[20px] bg-gold px-4 text-base font-bold text-white">
            {stage.badge}
          </span>
        </div> */}

        <div className="relative mt-0 lg:mt-4">
          <h3
            className={`pb-3 font-display text-[28px] font-bold leading-tight text-primary sm:text-[32px] lg:pb-4 lg:text-[32px] lg:leading-[46px] ${textInset}`}
          >
            {stage.title}
          </h3>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute right-0 bottom-0 left-0 border-b border-[#dcdcdc] ${borderAttach}`}
          />
        </div>

        <p
          className={`mt-3 text-2xl font-bold leading-tight text-primary sm:text-[28px] lg:mt-4 lg:text-[32px] lg:leading-[46px] ${textInset}`}
        >
          {stage.subtitle}
        </p>

        <p
          className={`mt-4 whitespace-pre-line text-base font-medium leading-8 text-foreground sm:text-lg lg:mt-5 lg:text-xl lg:leading-8 ${textInset}`}
        >
          {stage.description}
        </p>
      </div>
    </article>
  );
}
