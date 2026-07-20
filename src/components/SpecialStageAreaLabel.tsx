interface SpecialStageAreaLabelProps {
  date: string;
  day: string;
  title?: string;
}

export function SpecialStageAreaLabel({
  date,
  day,
  title = "ステージエリア",
}: SpecialStageAreaLabelProps) {
  return (
    <div className="flex justify-center">
      <span className="inline-flex h-12 items-center rounded-[40px] bg-gold px-6 font-display font-bold text-white sm:h-14 sm:px-7 lg:h-[62px] lg:px-8">
        <span className="inline-flex items-baseline leading-none">
          <span className="text-[24px] lg:text-[32px]">[{date}</span>
          <span className="ml-1 text-lg lg:ml-1.5 lg:text-2xl">{day}</span>
          <span className="text-[24px] lg:text-[29px]">]</span>
        </span>
        <span className="ml-3 text-[24px] leading-none sm:ml-4 lg:text-[32px]">{title}</span>
      </span>
    </div>
  );
}
