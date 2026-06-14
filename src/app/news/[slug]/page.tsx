import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ExternalRedirect } from "@/components/ExternalRedirect";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsPageBackground } from "@/components/NewsPageBackground";
import { getAllNewsSlugs, getCategoryLabel, getNewsBySlug } from "@/lib/news";
import { getSiteConfig } from "@/lib/site";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    return { title: "お知らせが見つかりません" };
  }

  return {
    title: news.title,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      type: "article",
      publishedTime: news.date,
      siteName: getSiteConfig().name,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  if (news.externalUrl) {
    return <ExternalRedirect url={news.externalUrl} />;
  }

  const formattedDate = format(new Date(news.date), "yyyy.MM.dd");

  return (
    <>
      <Header overlay />
      <NewsPageBackground>
        <main className="min-h-[calc(100dvh-18rem)] pb-8 pt-28 lg:min-h-[calc(100dvh-8rem)] lg:pb-20 lg:pt-32">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1127px]">
              <nav className="mb-6">
                <Link
                  href="/news"
                  className="inline-flex items-center text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                >
                  <span aria-hidden="true" className="mr-1">
                    ‹
                  </span>
                  お知らせ一覧に戻る
                </Link>
              </nav>

              <article className="rounded-[20px] bg-white p-6 shadow-[var(--shadow-card)] sm:p-8 lg:p-10">
                <header className="mb-8 border-b border-border pb-6">
                  <div className="mb-3 flex items-center gap-3">
                    <time dateTime={news.date} className="text-sm font-bold text-primary lg:text-lg">
                      {formattedDate}
                    </time>
                    <span className="rounded-full bg-sky/40 px-3 py-0.5 text-xs font-medium text-primary">
                      {getCategoryLabel(news.category)}
                    </span>
                  </div>
                  <h1 className="font-display text-2xl font-bold text-primary sm:text-[32px] lg:text-4xl">
                    {news.title}
                  </h1>
                </header>

                <div
                  className="prose-news text-base lg:text-xl"
                  dangerouslySetInnerHTML={{ __html: news.contentHtml }}
                />
              </article>
            </div>
          </div>
        </main>
        <Footer />
      </NewsPageBackground>
    </>
  );
}
