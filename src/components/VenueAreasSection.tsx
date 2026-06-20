import { VenueAreaItem } from "@/components/VenueAreaItem";
import { getVenueAreas } from "@/lib/areas";

export function VenueAreasSection() {
  const areas = getVenueAreas();

  return (
    <div className="relative z-0">
      <section className="-mt-px bg-[#fdfff4] pb-10 sm:pb-14 lg:pb-16 pt-0">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-14 pt-[100px] sm:gap-16 lg:gap-20">
            {areas.map((area) => (
              <VenueAreaItem key={area.id} area={area} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
