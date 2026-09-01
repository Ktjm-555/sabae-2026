import { GourmetBoothCard } from "@/components/GourmetBoothCard";
import { SpecialStageDateBar } from "@/components/SpecialStageDateBar";
import { getGourmetBooths } from "@/lib/booths";

export function GourmetAreaSection() {
  const booths = getGourmetBooths();

  return (
    <section id="gourmet" className="scroll-mt-28 lg:scroll-mt-32">
      <div className="-mx-4 sm:-mx-6 lg:mx-0">
        <SpecialStageDateBar
          date="10.17"
          day="sat"
          endDate="10.18"
          endDay="sun"
          title="グルメエリア"
        />
      </div>

      <ul className="mt-6 flex flex-col gap-4 md:mt-8 md:grid md:grid-cols-2 md:items-stretch md:gap-x-[18px] md:gap-y-8 lg:mt-10 lg:grid-cols-4">
        {booths.map((booth) => (
          <li key={booth.id} className="h-full">
            <GourmetBoothCard booth={booth} />
          </li>
        ))}
      </ul>
    </section>
  );
}
