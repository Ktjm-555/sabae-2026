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
}

export function VenueAreaButton({ href, label, external = false }: VenueAreaButtonProps) {
  const className =
    "inline-flex h-[39px] min-w-[166px] items-center justify-center gap-2 rounded-[80px] bg-primary px-6 text-base font-bold text-white transition-colors hover:bg-primary-dark lg:h-[49px] lg:min-w-[241px] lg:gap-5 lg:px-8 lg:text-xl";

  const arrow = (
    <ButtonArrowIcon className={`shrink-0 ${buttonArrowIconSizeClass}`} />
  );

  // 別タブで開く場合
  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
      {arrow}
    </Link>
  );
}
