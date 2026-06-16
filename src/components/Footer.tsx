import type { ReactNode } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { getSiteConfig } from "@/lib/site";

function PhoneIcon() {
  return (
    <Image
      src={withBasePath("/images/telephone.svg")}
      alt=""
      width={16}
      height={16}
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    />
  );
}

function MailIcon() {
  return (
    <Image
      src={withBasePath("/images/mail.svg")}
      alt=""
      width={16}
      height={16}
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    />
  );
}

function FooterWave() {
  return (
    <div className="relative -mb-px leading-none text-footer">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
        className="block h-20 w-full sm:h-24 lg:h-24"
        aria-hidden="true"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,100 1200,40 1440,70 L1440,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function FooterSection({
  children,
  className = "",
  showMobileTopBorder = true,
}: {
  children: ReactNode;
  className?: string;
  showMobileTopBorder?: boolean;
}) {
  return (
    <div className={className}>
      <div
        className={`mx-8 py-7 lg:mx-0 lg:border-t-0 lg:py-0 ${
          showMobileTopBorder ? "border-t border-dashed border-white/40" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  const site = getSiteConfig();

  return (
    <footer>
      <FooterWave />
      <div className="bg-footer text-white">
        <div className="mx-auto max-w-[1440px] lg:px-0 lg:pb-10">
          <p className="px-8 py-8 text-center font-sans text-[28px] font-bold leading-none lg:hidden">
            {site.organizer}
          </p>

          <div className="grid lg:grid-cols-[398fr_281fr_383fr_378fr] lg:gap-0 lg:pb-[92px] lg:pt-[54px]">
            <div className="relative hidden lg:block">
              <p className="absolute left-[34.42%] top-[67px] whitespace-nowrap font-sans text-[32px] font-bold">
                {site.organizer}
              </p>
            </div>

            <FooterSection
              showMobileTopBorder={false}
              className="lg:border-l lg:border-dashed lg:border-white/40 lg:pl-[21.7%] lg:pr-4"
            >
              <h3 className="font-display text-xl font-bold lg:text-2xl">
                {site.contact.general.title}
              </h3>
              <div className="mt-4 space-y-1 text-base leading-[2] lg:text-xl">
                <p>{site.contact.general.organization}</p>
                <div className="flex items-center gap-2">
                  <PhoneIcon />
                  <a
                    href={`tel:${site.contact.general.phone.replace(/-/g, "")}`}
                    className="hover:opacity-80"
                  >
                    {site.contact.general.phone}
                  </a>
                </div>
              </div>
            </FooterSection>

            <FooterSection className="lg:border-l lg:border-dashed lg:border-white/40 lg:pl-[17.5%] lg:pr-4">
              <h3 className="font-display text-xl font-bold lg:text-2xl">
                {site.contact.booth.title}
              </h3>
              <div className="mt-4 space-y-1 text-base leading-[2] lg:space-y-2 lg:text-xl lg:leading-[1.6]">
                <p>{site.contact.booth.organization}</p>
                <p className="text-sm leading-relaxed lg:text-base">{site.contact.booth.note}</p>
                <div className="flex items-center gap-2">
                  <PhoneIcon />
                  <a
                    href={`tel:${site.contact.booth.phone.replace(/-/g, "")}`}
                    className="hover:opacity-80"
                  >
                    {site.contact.booth.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon />
                  <a href={`mailto:${site.contact.booth.email}`} className="break-all hover:opacity-80">
                    {site.contact.booth.email}
                  </a>
                </div>
              </div>
            </FooterSection>

            <FooterSection className="lg:border-l lg:border-dashed lg:border-white/40 lg:pl-[15.9%] lg:pr-8">
              <h3 className="font-display text-xl font-bold lg:text-2xl">過去のフェス</h3>
              <p className="mt-4 text-base leading-[2] lg:text-xl">
                {site.pastFestivals.map((fest, i) => (
                  <span key={fest.label}>
                    {i > 0 && " / "}
                    <a
                      href={fest.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-80"
                    >
                      {fest.label}
                    </a>
                  </span>
                ))}
              </p>
            </FooterSection>
          </div>

          <div className="mx-4 border-t border-white/40 py-6 lg:mx-[6.67%] lg:py-6">
            <p className="text-center text-xs leading-relaxed lg:text-xl">
              {site.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
