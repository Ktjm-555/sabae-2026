import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsPageBackground } from "@/components/NewsPageBackground";
import { TicketPageContent } from "@/components/TicketPageContent";
import { getTicketContent } from "@/lib/ticket";
import { getSiteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "スペシャルステージ入場券申込概要",
  description: "ミライフェス 2026 スペシャルステージ入場券の申込概要・エリア区分・入場方法",
  openGraph: {
    title: "スペシャルステージ入場券申込概要",
    description: "ミライフェス 2026 スペシャルステージ入場券の申込概要・エリア区分・入場方法",
    type: "article",
    publishedTime: "2026-08-20",
    siteName: getSiteConfig().name,
  },
};

export default function TicketPage() {
  const content = getTicketContent();
  const formattedDate = format(new Date(content.date), "yyyy.MM.dd");

  return (
    <>
      <Header overlay />
      <NewsPageBackground>
        <main className="min-h-[calc(100dvh-18rem)] pb-8 pt-28 lg:min-h-[calc(100dvh-8rem)] lg:pb-20 lg:pt-32">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1310px]">
              <nav className="mb-4 lg:mb-5">
                <Link
                  href="/news"
                  className="inline-flex items-center font-display text-base font-bold text-primary transition-colors hover:text-primary-dark"
                >
                  <span aria-hidden="true" className="mr-1">
                    ‹
                  </span>
                  お知らせ一覧に戻る
                </Link>
              </nav>

              <div className="overflow-hidden rounded-[20px] bg-white lg:rounded-[40px]">
                <header className="px-4 pb-5 pt-5 sm:px-6 lg:px-[42px] lg:pb-6 lg:pt-8">
                  <div className="mb-2 flex flex-wrap items-center gap-3 lg:mb-3">
                    <time dateTime={content.date} className="font-display text-base font-bold text-primary">
                      {formattedDate}
                    </time>
                    <span className="inline-flex h-5 min-w-[67px] items-center justify-center rounded-[20px] bg-[#E1F2FC] px-3 text-xs font-medium text-primary">
                      {content.category}
                    </span>
                  </div>
                  <p className="font-display text-base font-bold leading-6 text-primary lg:text-2xl lg:leading-8">
                    {content.projectLabel}
                  </p>
                  <h1 className="mt-2 font-display text-[22px] font-bold leading-8 text-primary lg:mt-4 lg:text-[40px]">
                    {content.title}
                  </h1>
                </header>

                <TicketPageContent content={content} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </NewsPageBackground>
    </>
  );
}
