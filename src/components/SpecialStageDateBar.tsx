interface SpecialStageDateBarProps {
  date: string;
  day: string;
  endDate?: string;
  endDay?: string;
  title: string;
  titleHighlight?: string;
  titleSpLine2?: string;
  titleSpCompact?: boolean;
  titleHighlightNoSpace?: boolean;
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

function DateGroup({ date, day }: { date: string; day: string }) {
  return (
    <div className="flex items-baseline gap-1 lg:gap-1.5">
      <span className="text-[32px] font-bold leading-none lg:text-4xl">{date}</span>
      <span className="text-base font-bold leading-none sm:text-xl lg:text-2xl">{day}</span>
    </div>
  );
}

function DateRangeArrow() {
  return (
    <svg
      className="h-[21px] w-[10px] shrink-0 text-white"
      viewBox="0 0 10 21"
      aria-hidden="true"
    >
      <polygon points="0,0 10,10.5 0,21" fill="currentColor" />
    </svg>
  );
}

export function SpecialStageDateBar({
  date,
  day,
  endDate,
  endDay,
  title,
  titleHighlight,
  titleSpLine2,
  titleSpCompact = false,
  titleHighlightNoSpace = false,
}: SpecialStageDateBarProps) {
  const titleSpLine1 =
    titleSpLine2 && title.endsWith(titleSpLine2)
      ? title.slice(0, title.length - titleSpLine2.length)
      : title;
  const fullTitle = titleHighlight
    ? titleHighlightNoSpace
      ? `${title}${titleHighlight}`
      : `${title} ${titleHighlight}`
    : title;
  const spTitleClassName = titleSpCompact
    ? "text-[24px] min-[460px]:text-[28px] font-bold leading-snug"
    : "text-[28px] font-bold leading-snug";

  return (
    <div className="overflow-hidden bg-gradient-to-r from-[#66a8dc] via-[#a688bd] to-[#db99c1] py-4 sm:py-5 lg:flex lg:min-h-14 lg:items-center lg:rounded-[60px] lg:px-8 lg:py-0 lg:h-[76px]">
      <div className="flex shrink-0 items-center justify-center gap-2.5 text-white lg:justify-start lg:gap-3">
        <DateGroup date={date} day={day} />
        {endDate && endDay ? (
          <>
            <DateRangeArrow />
            <DateGroup date={endDate} day={endDay} />
          </>
        ) : null}
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
              <div className="min-[460px]:hidden">
                <p className={spTitleClassName}>{title}</p>
                <p className={`mt-1 ${spTitleClassName} leading-tight`}>{titleHighlight}</p>
              </div>
              <p className={`hidden min-[460px]:block ${spTitleClassName}`}>{fullTitle}</p>
            </>
          ) : titleSpLine2 ? (
            <>
              <div className="min-[460px]:hidden">
                <p className={spTitleClassName}>{titleSpLine1}</p>
                <p className={`mt-1 ${spTitleClassName} leading-tight`}>{titleSpLine2}</p>
              </div>
              <p className={`hidden min-[460px]:block ${spTitleClassName}`}>{title}</p>
            </>
          ) : (
            <p className={spTitleClassName}>{title}</p>
          )}
        </div>

        <p className="hidden font-bold leading-[30px] lg:block lg:text-[30px] @[750px]:text-[34px] @[820px]:text-[36px]">
          {fullTitle}
        </p>
      </div>
    </div>
  );
}
