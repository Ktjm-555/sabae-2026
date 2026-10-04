"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

interface NewsItemLinkProps {
  href: string;
  openInNewTab?: boolean;
  className?: string;
  children: ReactNode;
}

function parseNewsHref(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    return { path: href, hash: null as string | null };
  }

  return {
    path: href.slice(0, hashIndex) || "/",
    hash: href.slice(hashIndex + 1),
  };
}

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/$/, "");
}

export function NewsItemLink({
  href,
  openInNewTab = false,
  className,
  children,
}: NewsItemLinkProps) {
  const pathname = usePathname();
  const { path, hash } = parseNewsHref(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!hash || openInNewTab) {
      return;
    }

    if (normalizePathname(pathname) !== normalizePathname(path)) {
      return;
    }

    const target = document.getElementById(hash);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `${path}#${hash}`);
  };

  return (
    <Link
      href={href}
      scroll={!hash}
      onClick={handleClick}
      {...(openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {children}
    </Link>
  );
}
