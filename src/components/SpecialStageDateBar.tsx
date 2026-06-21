interface SpecialStageDateBarProps {
  date: string;
  day: string;
  title: string;
  titleHighlight?: string;
}

// セクション区切りの日付とタイトルのバーのV字
function DateBarWaveSeparator() {
  return (
    <svg
      className="h-[18px] w-full text-white"
      viewBox="0 0 390 18"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 2 L195 16 L390 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function SpecialStageDateBar({
  date,
  day,
  title,
  titleHighlight,
}: SpecialStageDateBarProps) {
  const fullTitle = titleHighlight ? `${title} ${titleHighlight}` : title;

  return (
    <div className="overflow-hidden bg-gradient-to-r from-[#66a8dc] via-[#a688bd] to-[#db99c1] py-4 sm:py-5 lg:flex lg:min-h-14 lg:items-center lg:rounded-[60px] lg:px-8 lg:py-0 lg:h-[76px]">
      <div className="flex shrink-0 items-baseline justify-center gap-1.5 text-white sm:gap-2 lg:justify-start">
        <span className="text-2xl font-bold leading-none sm:text-3xl lg:text-4xl">{date}</span>
        <span className="text-base font-bold leading-none sm:text-xl lg:text-2xl">{day}</span>
      </div>

      <div className="my-3 px-4 sm:px-6 lg:hidden">
        <DateBarWaveSeparator />
      </div>

      <div
        className="mx-6 hidden h-[52px] w-0.5 shrink-0 bg-white lg:block"
        aria-hidden="true"
      />

      <div className="@container min-w-0 text-white lg:flex-1">
        <div className="px-4 sm:px-6 lg:hidden">
          {titleHighlight ? (
            <>
              <p className="text-[28px] font-bold leading-snug">{title}</p>
              <p className="mt-1 text-[28px] font-bold leading-tight">{titleHighlight}</p>
            </>
          ) : (
            <p className="text-[28px] font-bold leading-snug">{title}</p>
          )}
        </div>

        <p className="hidden font-bold leading-[30px] lg:block lg:text-[30px] @[750px]:text-[34px] @[820px]:text-[36px]">
          {fullTitle}
        </p>
      </div>
    </div>
  );
}
