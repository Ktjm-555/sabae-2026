import Image from "next/image";
import { AreasWaveTop } from "@/components/AreasWaveTop";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VenueAreasSection } from "@/components/VenueAreasSection";
import { NewsListButton, NewsListItem } from "@/components/NewsListItem";
import { SectionTitle } from "@/components/SectionTitle";
import { withBasePath } from "@/lib/basePath";
import { getAllNews } from "@/lib/news";
import { getSiteConfig } from "@/lib/site";

export default function HomePage() {
  const site = getSiteConfig();
  const latestNews = getAllNews().slice(0, 3);
  const newsGridColsClass =
    latestNews.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <>
      <div className="relative">
        <Hero />
        <Header />
      </div>

      <section id="news" className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionTitle title="お知らせ" subtitle="NEWS" />

          <div className={`mx-auto grid max-w-[1127px] gap-3 sm:gap-4 lg:gap-5 ${newsGridColsClass}`}>
            {latestNews.length > 0 ? (
              latestNews.map((news) => <NewsListItem key={news.slug} news={news} />)
            ) : (
              <p className="col-span-full text-center text-foreground-muted">
                お知らせはまだありません。
              </p>
            )}
          </div>

          <div className="mt-8 flex justify-center lg:mt-10">
            <NewsListButton />
          </div>
        </div>
      </section>

      <section id="about" className="relative bg-white pb-0 pt-[85px]">
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionTitle title="ミライフェスとは" subtitle="ABOUT" />

          <div className="relative z-10 mx-auto flex max-w-[1127px] flex-col items-center gap-6 rounded-[20px] bg-white px-6 py-8 shadow-[var(--shadow-card)] sm:px-8 lg:flex-row lg:items-center lg:gap-12 lg:px-12 lg:py-10">
            <div className="shrink-0 lg:w-[273px]">
              <Image
                src={withBasePath("/images/about-logo.png")}
                alt={`めがねのまちさばえ ${site.shortName} - ${site.tagline}`}
                width={546}
                height={250}
                className="mx-auto h-auto w-full max-w-[220px] lg:max-w-[273px]"
              />
            </div>
            <p className="whitespace-pre-line text-base font-medium leading-[1.8] text-foreground lg:flex-1 lg:text-xl lg:font-normal">
              {site.aboutDescription}
            </p>
          </div>
        </div>
        <AreasWaveTop className="relative z-[1] -mt-[200px] lg:-mt-36" />
      </section>

      <VenueAreasSection />

      <Footer />
    </>
  );
}
