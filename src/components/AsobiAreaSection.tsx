import { SpecialStageDateBar } from "@/components/SpecialStageDateBar";

export function AsobiAreaSection() {
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
    </section>
  );
}
