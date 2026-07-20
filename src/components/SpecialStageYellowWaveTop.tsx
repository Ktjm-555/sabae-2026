import { withBasePath } from "@/lib/basePath";

export function SpecialStageYellowWaveTop({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none h-16 overflow-hidden leading-none sm:h-28 lg:h-32 ${className}`}
      aria-hidden="true"
    >
      <img
        src={withBasePath("/images/special-stage-wave-yellow-top.svg")}
        alt=""
        className="block h-full w-full object-cover object-top"
      />
    </div>
  );
}
