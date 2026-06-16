import type { ReactNode } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";

export function NewsPageBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative bg-white lg:bg-sky">
      {/* SP — bg_sp.jpg（804×1680） */}
      <div
        className="pointer-events-none absolute inset-0 bg-top bg-no-repeat lg:hidden"
        style={{
          backgroundImage: `url('${withBasePath("/images/bg_sp.jpg")}')`,
          backgroundSize: "100% auto",
        }}
        aria-hidden="true"
      />

      {/* PC — bg.jpg（3490×2146） */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Image
          src={withBasePath("/images/bg.jpg")}
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-top"
          aria-hidden="true"
        />
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}
