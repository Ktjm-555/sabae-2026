import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsPageBackground } from "@/components/NewsPageBackground";
import { SpecialStageDateBar } from "@/components/SpecialStageDateBar";

export const metadata: Metadata = {
  title: "ブース一覧",
  description: "ミライフェス 2026 のブース一覧",
};

export default function BoothsPage() {
  return (
    <>
      <Header overlay />
      <NewsPageBackground>
        <main className="min-h-[calc(100dvh-18rem)] pb-8 pt-28 lg:min-h-[calc(100dvh-8rem)] lg:pb-20 lg:pt-32">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1310px]">
              <nav className="mb-4 lg:mb-5">
                <Link
                  href="/"
                  className="inline-flex items-center font-display text-base font-bold text-primary transition-colors hover:text-primary-dark"
                >
                  <span aria-hidden="true" className="mr-1">
                    ‹
                  </span>
                  トップに戻る
                </Link>
              </nav>

              <div className="overflow-hidden rounded-[20px] bg-white lg:rounded-[40px]">
                <div className="px-4 pb-4 pt-5 sm:px-6 lg:px-[42px] lg:pb-6 lg:pt-8">
                  <section id="gourmet" className="scroll-mt-24">
                    <div className="-mx-4 sm:-mx-6 lg:mx-0">
                      <SpecialStageDateBar
                        date="10.17"
                        day="sat"
                        endDate="10.18"
                        endDay="sun"
                        title="グルメエリア"
                      />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </NewsPageBackground>
    </>
  );
}
