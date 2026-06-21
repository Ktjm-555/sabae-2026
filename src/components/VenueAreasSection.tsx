import { AreasWaveBottom } from "@/components/AreasWaveBottom";
import { VenueAreaItem } from "@/components/VenueAreaItem";
import { getVenueAreas } from "@/lib/areas";

export function VenueAreasSection() {
  const areas = getVenueAreas();

  return (
    <div className="relative z-0">
      <section className="-mt-px bg-[#fdfff4] pb-0 pt-0">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-14 pt-[180px] sm:gap-16 lg:gap-20 lg:pt-[100px]">
            {areas.map((area) => (
              <VenueAreaItem key={area.id} area={area} />
            ))}
          </div>
          <div
            className="h-14 sm:h-16 lg:h-18"
            aria-hidden="true"
          />
        </div>
        <AreasWaveBottom className="relative z-[1] -mt-8 sm:-mt-10 lg:-mt-12" />
      </section>
    </div>
  );
}
