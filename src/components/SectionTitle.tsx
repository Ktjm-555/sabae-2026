import Image from "next/image";

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5L10 0z" />
    </svg>
  );
}

export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8 flex flex-col items-center sm:mb-10">
      <div className="flex items-center gap-2 sm:gap-3">
        <SparkleIcon className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
        <h2 className="font-display text-[32px] font-bold leading-tight text-primary lg:text-[40px]">
          {title}
        </h2>
        <SparkleIcon className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
      </div>
      <p className="mt-1 font-display text-base font-bold tracking-[0.2em] text-primary-light">
        {subtitle}
      </p>
    </div>
  );
}
