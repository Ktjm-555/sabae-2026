import type { Metadata } from "next";
import { M_PLUS_Rounded_1c, Noto_Sans_JP } from "next/font/google";
import { getSiteConfig } from "@/lib/site";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const site = getSiteConfig();

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mplus-rounded",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (basePath === "/sabae-2026"
    ? "https://sabae-2026.mirai-project.workers.dev/sabae-2026"
    : "https://fes.sabae-sdgs.jp/2026");

// 本番 OG 画像はドメイン直下（/2026 配下ではない）に配置
const ogImageUrl =
  basePath === "/sabae-2026"
    ? `${siteUrl}/images/og/sns-og.jpg`
    : "https://fes.sabae-sdgs.jp/images/og/sns-og.jpg";

const ogImage = {
  url: ogImageUrl,
  width: 2400,
  height: 1260,
  alt: site.name,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    locale: "ja_JP",
    siteName: site.name,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSans.variable} ${mPlusRounded.variable} min-h-screen bg-white antialiased`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
