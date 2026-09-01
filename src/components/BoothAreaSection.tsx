import { BoothBoothCard } from "@/components/BoothBoothCard";
import { BoothSubsectionHeading } from "@/components/BoothSubsectionHeading";
import { SpecialStageDateBar } from "@/components/SpecialStageDateBar";
import type { BoothBooth } from "@/lib/booths";
import { getHighSchoolBooths, getPartnerBooths } from "@/lib/booths";

function BoothSubsectionGrid({
  title,
  booths,
  defaultImageSpFit,
}: {
  title: string;
  booths: BoothBooth[];
  defaultImageSpFit?: "cover";
}) {
  return (
    <div>
      <BoothSubsectionHeading title={title} />

      <ul className="mt-5 flex flex-col gap-4 md:grid md:grid-cols-2 md:items-stretch md:gap-x-[18px] md:gap-y-8 lg:grid-cols-4">
        {booths.map((booth) => (
          <li key={booth.id} className="h-full">
            <BoothBoothCard
              booth={booth}
              defaultImageSpFit={defaultImageSpFit}
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
    <section id="booth" className="scroll-mt-24">
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
        <BoothSubsectionGrid title="鯖江高校生ブース" booths={highSchoolBooths} />
      </div>
    </section>
  );
}
