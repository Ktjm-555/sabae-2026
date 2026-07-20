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
      <span className="inline-flex h-11 items-center rounded-[40px] bg-gold px-5 font-display font-bold text-white sm:h-14 sm:px-7 lg:h-[62px] lg:px-8">
        <span className="inline-flex items-baseline leading-none">
          <span className="text-[20px] sm:text-[24px] lg:text-[32px]">[{date}</span>
          <span className="ml-1 text-base sm:text-lg lg:ml-1.5 lg:text-2xl">{day}</span>
          <span className="text-[20px] sm:text-[24px] lg:text-[29px]">]</span>
        </span>
        <span className="ml-2.5 text-[20px] leading-none sm:ml-4 sm:text-[24px] lg:text-[32px]">{title}</span>
      </span>
    </div>
  );
}
