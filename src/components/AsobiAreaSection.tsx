import { AsobiBoothCard } from "@/components/AsobiBoothCard";
import { SpecialStageDateBar } from "@/components/SpecialStageDateBar";
import { getAsobiBooths } from "@/lib/booths";

export function AsobiAreaSection() {
  const booths = getAsobiBooths();

  return (
    <section id="asobi" className="scroll-mt-24">
      <div className="-mx-4 sm:-mx-6 lg:mx-0">
        <SpecialStageDateBar
          date="10.17"
          day="sat"
          endDate="10.18"
          endDay="sun"
          title="アソビエリア"
        />
      </div>

      <ul className="mt-6 flex flex-col gap-4 md:mt-8 md:grid md:grid-cols-2 md:items-stretch md:gap-x-[18px] md:gap-y-8 lg:mt-10 lg:grid-cols-4">
        {booths.map((booth) => (
          <li key={booth.id} className="h-full">
            <AsobiBoothCard booth={booth} />
          </li>
        ))}
      </ul>
    </section>
  );
}
