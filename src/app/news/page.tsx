import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsPageBackground } from "@/components/NewsPageBackground";
import { SectionTitle } from "@/components/SectionTitle";
import { NewsCard } from "@/components/NewsCard";
import { getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "お知らせ一覧",
  description: "ミライフェス 2026 の最新お知らせ一覧",
};

export default function NewsPage() {
  const allNews = getAllNews();
  const newsGridColsClass =
    allNews.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <>
      <Header overlay />
      <NewsPageBackground>
        <main className="min-h-[calc(100dvh-18rem)] pb-8 pt-28 lg:min-h-[calc(100dvh-8rem)] lg:pb-20 lg:pt-32">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mt-10 lg:mt-12">
              <SectionTitle title="お知らせ一覧" subtitle="NEWS" />
            </div>

            {allNews.length > 0 ? (
              <div className={`mx-auto grid max-w-[1127px] gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5 ${newsGridColsClass}`}>
                {allNews.map((news) => (
                  <NewsCard key={news.slug} news={news} />
                ))}
              </div>
            ) : (
              <p className="text-center text-foreground-muted">お知らせはまだありません。</p>
            )}
          </div>
        </main>
        <Footer />
      </NewsPageBackground>
    </>
  );
}
