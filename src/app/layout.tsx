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

export const metadata: Metadata = {
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
