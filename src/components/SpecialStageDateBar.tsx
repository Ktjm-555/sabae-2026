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
      className="h-[22px] w-full text-white"
      viewBox="0 0 390 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 2 L195 22 L390 2"
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
    <div className="overflow-hidden bg-gradient-to-r from-[#66a8dc] via-[#a688bd] to-[#db99c1] pt-[10px] pb-4 sm:pt-3 sm:pb-5 lg:flex lg:min-h-14 lg:items-center lg:rounded-[60px] lg:px-8 lg:py-0 lg:h-[76px]">
      <div className="relative lg:hidden">
        <div className="relative z-10 flex items-baseline justify-center gap-1.5 px-4 text-white sm:gap-2 sm:px-6">
          <span className="text-[32px] font-bold leading-none">{date}</span>
          <span className="text-base font-bold leading-none sm:text-xl">{day}</span>
        </div>
        <div
          className="pointer-events-none absolute inset-x-4 top-[calc(26px-2px)] z-0 sm:inset-x-6"
          aria-hidden="true"
        >
          <DateBarWaveSeparator />
        </div>
        <div className="h-3.5" aria-hidden="true" />
      </div>

      <div className="hidden shrink-0 items-baseline gap-1.5 text-white lg:flex lg:justify-start lg:gap-2">
        <span className="text-4xl font-bold leading-none">{date}</span>
        <span className="text-2xl font-bold leading-none">{day}</span>
      </div>

      <div
        className="mx-6 hidden h-[52px] w-0.5 shrink-0 bg-white lg:block"
        aria-hidden="true"
      />

      <div className="@container min-w-0 text-white lg:flex-1">
        <div className="mt-2 px-4 sm:mt-3 sm:px-6 lg:hidden">
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
