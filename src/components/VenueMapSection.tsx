import { SectionTitle } from "@/components/SectionTitle";

export function VenueMapSection() {
  return (
    <section
      id="venue-map"
      className="relative z-10 scroll-mt-24 -mt-6 bg-white pb-10 sm:-mt-8 sm:pb-14 lg:-mt-10 lg:pb-16"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 lg:pt-8">
        <SectionTitle title="会場マップ" subtitle="VENUE MAP" />

        <div
          className="mx-auto flex max-w-[1127px] min-h-[280px] items-center justify-center rounded-[20px] bg-white shadow-[var(--shadow-card)] sm:min-h-[360px] lg:min-h-[440px]"
          aria-label="会場マップ（準備中）"
        >

        </div>
      </div>
    </section>
  );
}
