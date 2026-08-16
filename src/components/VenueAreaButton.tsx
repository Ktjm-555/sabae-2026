import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { buttonArrowIconSizeClass } from "@/components/NewsListItem";

function ButtonArrowIcon({ className }: { className?: string }) {
  return (
    <Image
      src={withBasePath("/images/btn_arrow.svg")}
      alt=""
      width={12}
      height={20}
      className={className}
      aria-hidden="true"
    />
  );
}

interface VenueAreaButtonProps {
  href: string;
  label: string;
  external?: boolean;
  download?: boolean;
  className?: string;
}

export function VenueAreaButton({
  href,
  label,
  external = false,
  download = false,
  className,
}: VenueAreaButtonProps) {
  const resolvedHref = external ? href : withBasePath(href);
  const buttonClassName = [
    "inline-flex h-[39px] min-w-[166px] items-center justify-center gap-2 rounded-[80px] bg-primary px-6 text-base font-bold text-white transition-colors hover:bg-primary-dark lg:h-[49px] lg:min-w-[241px] lg:gap-5 lg:px-8 lg:text-xl",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const arrow = (
    <ButtonArrowIcon className={`shrink-0 ${buttonArrowIconSizeClass}`} />
  );

  if (download) {
    return (
      <a href={resolvedHref} className={buttonClassName} download>
        {label}
        {arrow}
      </a>
    );
  }

  // 別タブで開く場合
  if (external) {
    return (
      <a
        href={resolvedHref}
        className={buttonClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={resolvedHref} className={buttonClassName}>
      {label}
      {arrow}
    </Link>
  );
}
