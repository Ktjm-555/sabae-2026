import Link from "next/link";
import { format } from "date-fns";
import { NewsArrowIcon, newsArrowIconSizeClass } from "@/components/NewsListItem";
import { NewsItem, getCategoryLabel } from "@/lib/news";

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const formattedDate = format(new Date(news.date), "yyyy.MM.dd");
  const href = news.externalUrl ?? `/news/${news.slug}`;
  const isExternal = Boolean(news.externalUrl);

  return (
    <article className="group relative min-h-[83px] rounded-[20px] bg-white shadow-[var(--shadow-card)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] lg:min-h-[115px]">
      <Link
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="relative block px-7 py-5 lg:py-6"
      >
        <time dateTime={news.date} className="text-sm font-bold text-primary lg:text-lg">
          {formattedDate}
        </time>
        <h3 className="mt-2 line-clamp-2 pr-8 text-base font-medium text-foreground group-hover:text-primary lg:mt-3 lg:pr-10 lg:text-xl lg:font-normal">
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
