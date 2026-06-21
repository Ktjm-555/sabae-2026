import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { NewsItem, getCategoryLabel } from "@/lib/news";
import { withBasePath } from "@/lib/basePath";

interface NewsListItemProps {
  news: NewsItem;
}

export const buttonArrowIconSizeClass = "h-[13.5px] w-[7px] lg:h-[17px] lg:w-[10px]";
export const newsArrowIconSizeClass = buttonArrowIconSizeClass;

function ButtonArrowIcon({ className }: { className?: string }) {
  return (
    <Image
      src={withBasePath("/images/btn_arrow.svg")}
      alt=""
      width={12}
      height={20}
      className={className}
      aria-hidden="true"
    />
  );
}

export function NewsArrowIcon({ className }: { className?: string }) {
  return (
    <Image
      src={withBasePath("/images/news_arrow.svg")}
      alt=""
      width={12}
      height={20}
      className={className}
      aria-hidden="true"
    />
  );
}

export function NewsListItem({ news }: NewsListItemProps) {
  const formattedDate = format(new Date(news.date), "yyyy.MM.dd");
  const href = news.externalUrl ?? `/news/${news.slug}`;
  const isExternal = Boolean(news.externalUrl);

  return (
    <Link
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative flex min-h-[83px] flex-col justify-center rounded-[20px] bg-white px-7 py-5 shadow-[var(--shadow-card)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] lg:min-h-[115px] lg:px-7 lg:py-6"
    >
      <time
        dateTime={news.date}
        className="text-sm font-bold text-primary lg:text-lg"
      >
        {formattedDate}
      </time>
      <p className="mt-2 line-clamp-2 pr-8 text-base font-medium text-foreground transition-colors group-hover:text-primary lg:mt-3 lg:pr-10 lg:text-xl lg:font-normal">
        {news.title}
      </p>
      <span className="mt-2 inline-block w-fit self-start rounded-full bg-sky/40 px-2.5 py-0.5 text-xs font-medium text-primary">
        {getCategoryLabel(news.category)}
      </span>
      <NewsArrowIcon
        className={`absolute top-1/2 right-6 -translate-y-1/2 transition-transform group-hover:translate-x-0.5 lg:right-7 ${newsArrowIconSizeClass}`}
      />
    </Link>
  );
}

export function NewsListButton() {
  return (
    <Link
      href="/news"
      className="inline-flex h-[39px] w-[166px] items-center justify-center gap-2 rounded-[80px] bg-primary text-base font-bold text-white transition-colors hover:bg-primary-dark lg:h-[49px] lg:w-[241px] lg:gap-5 lg:text-xl"
    >
      お知らせ一覧
      <ButtonArrowIcon className={`shrink-0 ${buttonArrowIconSizeClass}`} />
    </Link>
  );
}
