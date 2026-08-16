import Link from "next/link";
import { format } from "date-fns";
import { NewsArrowIcon, newsArrowIconSizeClass } from "@/components/NewsListItem";
import { NewsItem, getCategoryLabel, getNewsLink } from "@/lib/news";

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const formattedDate = format(new Date(news.date), "yyyy.MM.dd");
  const { href, openInNewTab } = getNewsLink(news);

  return (
    <article className="group relative h-full min-h-[135px] rounded-[20px] bg-white shadow-[var(--shadow-card)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] lg:min-h-[203px]">
      <Link
        href={href}
        {...(openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="relative flex h-full flex-col px-[30px] py-[15px] lg:px-8 lg:py-[27px]"
      >
        <time dateTime={news.date} className="text-sm font-bold text-primary lg:text-lg">
          {formattedDate}
        </time>
        <h3 className="mt-2 pr-8 text-base font-medium leading-[22px] text-foreground group-hover:text-primary lg:mt-3 lg:pr-10 lg:text-xl lg:leading-[30px]">
          {news.title}
        </h3>
        <span className="mt-2 inline-block w-fit rounded-full bg-sky/40 px-2.5 py-0.5 text-xs font-medium text-primary">
          {getCategoryLabel(news.category)}
        </span>
        <NewsArrowIcon
          className={`absolute top-1/2 right-6 -translate-y-1/2 transition-transform group-hover:translate-x-0.5 lg:right-7 ${newsArrowIconSizeClass}`}
        />
      </Link>
    </article>
  );
}
