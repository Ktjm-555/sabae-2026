import Image from "next/image";
import { BoothBoothCard } from "@/components/BoothBoothCard";
import { BoothSubsectionHeading } from "@/components/BoothSubsectionHeading";
import { SpecialStageDateBar } from "@/components/SpecialStageDateBar";
import { withBasePath } from "@/lib/basePath";
import type { BoothBooth } from "@/lib/booths";
import { getHighSchoolBooths, getPartnerBooths } from "@/lib/booths";

const HIGH_SCHOOL_PHOTOS = [
  {
    src: "/images/booths/high-school/section-photo-1.png",
    alt: "芝生の会場でストラックアウトをする高校生",
  },
  {
    src: "/images/booths/high-school/section-photo-2.png",
    alt: "テントのブースで飲み物を用意する高校生",
  },
  {
    src: "/images/booths/high-school/section-photo-3.png",
    alt: "ペットボトルで工作する子どもと高校生",
  },
] as const;

function BoothSubsectionGrid({
  title,
  booths,
  defaultImageSpFit,
  variant = "default",
}: {
  title: string;
  booths: BoothBooth[];
  defaultImageSpFit?: "cover";
  variant?: "default" | "compact";
}) {
  return (
    <div>
      <BoothSubsectionHeading title={title} />

      {variant === "compact" ? (
        <ul className="mt-10 grid grid-cols-1 gap-[19px] md:grid-cols-3">
          {HIGH_SCHOOL_PHOTOS.map((photo) => (
            <li key={photo.src}>
              <Image
                src={withBasePath(photo.src)}
                alt={photo.alt}
                width={795}
                height={319}
                sizes="(max-width: 767px) 100vw, 33vw"
                className="h-auto w-full"
              />
            </li>
          ))}
        </ul>
      ) : null}

      <ul
        className={
          variant === "compact"
            ? "mt-10 grid grid-cols-1 items-stretch gap-x-[18px] gap-y-[22px] md:grid-cols-2 lg:grid-cols-4"
            : "mt-5 flex flex-col gap-4 md:grid md:grid-cols-2 md:items-stretch md:gap-x-[18px] md:gap-y-8 lg:grid-cols-4"
        }
      >
        {booths.map((booth) => (
          <li key={booth.id} className="h-full">
            <BoothBoothCard
              booth={booth}
              defaultImageSpFit={defaultImageSpFit}
              variant={variant}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BoothAreaSection() {
  const partnerBooths = getPartnerBooths();
  const highSchoolBooths = getHighSchoolBooths();

  return (
    <section id="booth" className="scroll-mt-28 lg:scroll-mt-32">
      <div className="-mx-4 sm:-mx-6 lg:mx-0">
        <SpecialStageDateBar
          date="10.17"
          day="sat"
          endDate="10.18"
          endDay="sun"
          title="ブースエリア"
        />
      </div>

      <div className="mt-6 flex flex-col gap-10 md:mt-8 lg:mt-10 lg:gap-14">
        <BoothSubsectionGrid
          title="企業･団体パートナーズブース"
          booths={partnerBooths}
          defaultImageSpFit="cover"
        />
        <BoothSubsectionGrid
          title="鯖江高校生ブース"
          booths={highSchoolBooths}
          variant="compact"
        />
      </div>
    </section>
  );
}
