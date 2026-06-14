import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-white py-20 pt-[70px] sm:pt-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          <p className="font-display text-6xl font-bold text-primary">404</p>
          <h1 className="mt-4 text-2xl font-bold text-primary">ページが見つかりません</h1>
          <p className="mt-2 text-foreground-muted">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center rounded-full bg-primary px-8 py-3 font-display text-base font-bold text-white transition-colors hover:bg-primary-dark"
          >
            トップページへ戻る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
