import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle";
import { withBasePath } from "@/lib/basePath";
import { getVenueMapConfig } from "@/lib/venueMap";

export function VenueMapSection() {
  const venueMap = getVenueMapConfig();

  return (
    <section
      id="venue-map"
      className="relative z-10 scroll-mt-24 -mt-6 bg-white pb-10 sm:-mt-8 sm:pb-14 lg:-mt-10 lg:pb-16"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 lg:pt-8">
        <SectionTitle title="会場マップ" subtitle="VENUE MAP" />

        <div className="mx-auto w-full overflow-hidden rounded-[20px] bg-white shadow-[0_0_4px_2px_rgba(0,0,0,0.1)] lg:max-w-[1292px]">
          <div className="flex justify-center px-4 pt-4 sm:px-6 sm:pt-5 lg:px-0 lg:pt-[43px]">
            {venueMap.mapImageSp ? (
              <Image
                src={withBasePath(venueMap.mapImageSp)}
                alt={venueMap.mapAlt}
                width={370}
                height={254}
                className="h-auto w-full max-w-[370px] lg:hidden"
                sizes="(max-width: 1024px) 100vw, 370px"
              />
            ) : null}
            <Image
              src={withBasePath(venueMap.mapImage)}
              alt={venueMap.mapAlt}
              width={742}
              height={509}
              className={`h-auto w-full max-w-[742px] ${venueMap.mapImageSp ? "hidden lg:block" : ""}`}
              sizes="742px"
            />
          </div>

          <div className="flex flex-row items-center gap-2 px-4 pb-4 pt-3 sm:gap-2.5 sm:px-6 sm:pb-5 sm:pt-4 lg:gap-5 lg:px-[26px] lg:pb-[30px] lg:pt-0">
            <span className="inline-flex min-h-6 shrink-0 items-center justify-center bg-primary px-2.5 py-1 text-center text-[13px] font-medium leading-tight text-white lg:min-h-[38px] lg:min-w-[143px] lg:px-4 lg:py-0 lg:text-xl lg:leading-8">
              {venueMap.parkingLabel}
            </span>
            <p className="text-[13px] font-medium leading-5 text-foreground lg:text-xl lg:leading-8">
              {venueMap.parkingNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
