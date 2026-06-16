import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { getSiteConfig } from "@/lib/site";

export function Hero() {
  const site = getSiteConfig();

  return (
    <section className="relative w-full overflow-hidden bg-sky">
      {/* Mobile — hero_sp.jpg（804×1680） */}
      <div className="leading-none lg:hidden">
        <Image
          src={withBasePath("/images/hero-sp.jpg")}
          alt={`めがねのまちさばえ ${site.shortName} - ${site.eventDate} ${site.eventLocation}`}
          width={804}
          height={1680}
          priority
          quality={100}
          sizes="100vw"
          className="block h-auto w-full"
        />
      </div>

      {/* PC — hero_pc2.jpg（3490×2146） */}
      <div className="hidden leading-none lg:block">
        <Image
          src={withBasePath("/images/hero-pc2.jpg")}
          alt={`めがねのまちさばえ ${site.shortName} - ${site.eventDate} ${site.eventLocation}`}
          width={3490}
          height={2146}
          priority
          quality={100}
          sizes="100vw"
          className="block h-auto w-full"
        />
      </div>
    </section>
  );
}
