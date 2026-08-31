import { BoothBoothCard } from "@/components/BoothBoothCard";
import { BoothSubsectionHeading } from "@/components/BoothSubsectionHeading";
import { SpecialStageDateBar } from "@/components/SpecialStageDateBar";
import { getHighSchoolBooths } from "@/lib/booths";

export function BoothAreaSection() {
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

      <div className="mt-6 md:mt-8 lg:mt-10">
        <BoothSubsectionHeading title="鯖江高校生ブース" />

        <ul className="mt-5 flex flex-col gap-4 md:grid md:grid-cols-2 md:items-stretch md:gap-x-[18px] md:gap-y-8 lg:grid-cols-4">
          {highSchoolBooths.map((booth) => (
            <li key={booth.id} className="h-full">
              <BoothBoothCard booth={booth} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
