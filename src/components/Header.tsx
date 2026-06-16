"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { withBasePath } from "@/lib/basePath";
import { getSiteConfig } from "@/lib/site";

function SocialIcon({
  type,
  className = "h-5 w-5",
}: {
  type: "twitter" | "instagram" | "facebook";
  className?: string;
}) {
  if (type === "twitter") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface HeaderProps {
  overlay?: boolean;
}

export function Header({ overlay }: HeaderProps) {
  const site = getSiteConfig();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = pathname === "/";
  const isOverlay = overlay ?? isHome;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="mx-auto max-w-[1400px] px-[14px] lg:px-6">
        <div
          className={`flex items-center justify-between backdrop-blur-sm ${
            isOverlay
              ? "mt-[21px] h-[70px] rounded-[40px] bg-white/90 px-4 shadow-[0_0_8px_rgba(0,0,0,0.25)] lg:mt-[23px] lg:h-20 lg:px-6"
              : "h-[70px] border-b border-border/50 bg-white/90 lg:h-20"
          }`}
        >
          <Link href="/" className="ml-2 shrink-0 lg:ml-6">
            <Image
              src={withBasePath("/images/logo-header.svg")}
              alt="めがねのまちさばえ ミライフェス 2026"
              width={270}
              height={53}
              priority
              className="h-10 w-auto max-w-[200px] lg:h-[53px] lg:max-w-none lg:w-[270px]"
            />
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="メインナビゲーション"
          >
            {site.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-bold transition-colors ${
                  pathname === item.href ? "text-primary" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-1 flex items-center gap-4 border-l border-border pl-6">
              <Link
                href={site.social.twitter}
                className="text-primary transition-opacity hover:opacity-70"
                aria-label="X（Twitter）"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon type="twitter" className="h-8 w-8" />
              </Link>
              <Link
                href={site.social.instagram}
                className="text-primary transition-opacity hover:opacity-70"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon type="instagram" className="h-8 w-8" />
              </Link>
              <Link
                href={site.social.facebook}
                className="text-primary transition-opacity hover:opacity-70"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon type="facebook" className="h-8 w-8" />
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href={site.social.instagram}
              className="flex min-w-[44px] flex-col items-center gap-0.5 text-primary"
              aria-label="公式SNS Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon type="instagram" className="h-7 w-7" />
              <span className="font-display text-[10px] font-bold leading-none tracking-wide">
                公式SNS
              </span>
            </Link>
            <button
              type="button"
              className="flex size-11 shrink-0 flex-col items-center justify-center gap-[3px]"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="block h-[3px] w-6 rounded-full bg-primary" aria-hidden="true" />
              <span className="block h-[3px] w-6 rounded-full bg-primary" aria-hidden="true" />
              <span className="block h-[3px] w-6 rounded-full bg-primary" aria-hidden="true" />
            </button>
          </div>
        </div>

        {isOpen && (
          <nav
            id="mobile-menu"
            className="mt-2 rounded-[20px] bg-white/90 px-5 py-4 shadow-[0_0_8px_rgba(0,0,0,0.25)] backdrop-blur-sm lg:hidden"
            aria-label="モバイルナビゲーション"
          >
            <div className="flex flex-col gap-3">
              {site.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base font-bold transition-colors ${
                    pathname === item.href ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
