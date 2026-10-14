import Image from "next/image";
import { ReactNode } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { StageScheduleSection } from "@/components/StageScheduleSection";
import { VenueAreaButton } from "@/components/VenueAreaButton";
import { buttonArrowIconSizeClass } from "@/components/NewsListItem";
import { withBasePath } from "@/lib/basePath";
import { getVenueMapConfig } from "@/lib/venueMap";

const cardClassName =
  "h-full rounded-[20px] bg-white shadow-[0_0_4px_2px_rgba(0,0,0,0.1)]";

function MapPinLink({ href, address }: { href: string; address: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline text-sm leading-7 text-foreground underline decoration-1 underline-offset-2 hover:text-primary"
    >
      <Image
        src={withBasePath("/images/access/icon-pin.svg")}
        alt=""
        width={12}
        height={16}
        className="mr-0.5 inline-block h-4 w-3 align-[-2px]"
      />
      {address}
    </a>
  );
}

function AccessButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-[39px] max-w-full items-center justify-center gap-2 rounded-[80px] bg-primary px-5 text-base font-bold whitespace-nowrap text-white transition-colors hover:bg-primary-dark lg:h-[49px] lg:gap-3 lg:px-6 lg:text-xl"
    >
      <span>{children}</span>
      <Image
        src={withBasePath("/images/btn_arrow.svg")}
        alt=""
        width={12}
        height={20}
        className={`shrink-0 ${buttonArrowIconSizeClass}`}
        aria-hidden="true"
      />
    </a>
  );
}

function ParkingBadge({
  label,
  tone,
}: {
  label: string;
  tone: "free" | "paid";
}) {
  const toneClassName = tone === "free" ? "bg-[#00508E]" : "bg-[#E60012]";

  return (
    <span
      className={`inline-flex h-[22px] min-w-[46px] items-center justify-center px-1.5 text-sm font-bold leading-none text-white ${toneClassName}`}
    >
      {label}
    </span>
  );
}

export function VenueMapSection() {
  const venueMap = getVenueMapConfig();
  const access = venueMap.access;

  return (
    <section className="relative z-[12] -mt-6 bg-white pb-10 sm:-mt-8 sm:pb-14 lg:-mt-10 lg:pb-16">
      <StageScheduleSection />

      <div className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pt-16 sm:px-6 lg:px-8 lg:pt-[77px]">
        <div
          id="venue-map"
          className="mx-auto grid max-w-[1294px] scroll-mt-24 gap-12 lg:grid-cols-2 lg:items-start lg:gap-11"
        >
          <div>
            <SectionTitle title="会場マップ" subtitle="VENUE MAP" />
            <div className={`${cardClassName} overflow-hidden`}>
              <div className="flex items-center justify-center px-4 pt-5 sm:px-6 sm:pt-6 lg:px-6 lg:pt-8">
                {venueMap.mapImageSp ? (
                  <Image
                    src={withBasePath(venueMap.mapImageSp)}
                    alt={venueMap.mapAlt}
                    width={708}
                    height={448}
                    className="h-auto w-full lg:hidden"
                    sizes="(max-width: 1024px) 100vw, 625px"
                  />
                ) : null}
                <Image
                  src={withBasePath(venueMap.mapImage)}
                  alt={venueMap.mapAlt}
                  width={1151}
                  height={729}
                  className={`h-auto w-full ${venueMap.mapImageSp ? "hidden lg:block" : ""}`}
                  sizes="625px"
                />
              </div>
              <div className="flex justify-center px-4 pt-5 pb-6 sm:pt-6 lg:pt-7 lg:pb-8">
                <VenueAreaButton
                  href={venueMap.detailButton.href}
                  label={venueMap.detailButton.label}
                  download
                />
              </div>
            </div>
          </div>

          <div>
            <SectionTitle title="アクセス" subtitle="ACCESS" />
            <div className={`${cardClassName} px-4 py-5 text-foreground sm:px-6 lg:px-[23px] lg:py-5`}>
              <p className="text-base leading-7">
                <span className="font-bold">{access.placeName}</span>
                <span className="text-sm">（</span>
                <MapPinLink href={access.mapUrl} address={access.address} />
                <span className="text-sm">）</span>
              </p>

              <ul className="mt-1">
                {access.routes.map((route) => (
                  <li key={route.text} className="flex items-start gap-1.5 text-base leading-7">
                    <Image
                      src={withBasePath(route.icon)}
                      alt=""
                      width={18}
                      height={18}
                      className="mt-[5px] h-[18px] w-[18px] shrink-0"
                    />
                    <span>{route.text}</span>
                  </li>
                ))}
              </ul>

              <div className="my-4 h-px bg-[#DCDCDC]" aria-hidden="true" />

              <h3 className="text-base font-bold leading-7">{access.parkingTitle}</h3>

              <div className="mt-3">
                <ParkingBadge label={access.freeLabel} tone="free" />
                <ul className="mt-2">
                  {access.freePlaces.map((place) => (
                    <li key={place.name} className="flex items-start gap-1 text-base leading-7">
                      <span className="shrink-0 text-xs leading-7" aria-hidden="true">
                        ●
                      </span>
                      <span>
                        {place.name}
                        <span className="text-sm">（</span>
                        <MapPinLink href={place.mapUrl} address={place.address} />
                        <span className="text-sm">）{place.suffix}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <AccessButton href={access.locationButton.href}>
                  {access.locationButton.label}
                  <span className="text-xs font-bold lg:text-sm">
                    {access.locationButton.note}
                  </span>
                </AccessButton>
              </div>

              <div className="mt-5">
                <ParkingBadge label={access.paidLabel} tone="paid" />
                <p className="mt-2 text-base leading-7">{access.paidFee}</p>
                <ul>
                  {access.paidPlaces.map((place) => (
                    <li key={place.name} className="flex items-start gap-1 text-base leading-7">
                      <span className="shrink-0 text-xs leading-7" aria-hidden="true">
                        ●
                      </span>
                      <span>
                        {place.name}
                        <span className="text-sm">（</span>
                        <MapPinLink href={place.mapUrl} address={place.address} />
                        <span className="text-sm">）</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <AccessButton href={access.availabilityButton.href}>
                  {access.availabilityButton.label}
                </AccessButton>
              </div>

              <div className="mt-4 space-y-0 text-xs leading-5">
                {access.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
