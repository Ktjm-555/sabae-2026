import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsPageBackground } from "@/components/NewsPageBackground";
import { SectionTitle } from "@/components/SectionTitle";

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
            <div className="mt-8 sm:mt-10 lg:mt-12">
              <SectionTitle title="ブース一覧" subtitle="BOOTHS" />
            </div>
          </div>
        </main>
        <Footer />
      </NewsPageBackground>
    </>
  );
}
