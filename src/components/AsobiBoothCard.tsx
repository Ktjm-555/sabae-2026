"use client";

import { useState } from "react";
import Image from "next/image";
import { BoothDetailModal } from "@/components/BoothDetailModal";
import { withBasePath } from "@/lib/basePath";
import type { AsobiBooth, BoothBooth } from "@/lib/booths";

interface AsobiBoothCardProps {
  booth: AsobiBooth;
}

type FigmaCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const CLIP_DESKTOP = { width: 294, height: 164 };
const CLIP_SP = { width: 150, height: 157 };

const SQUARE_LABEL = "さばえACTION∞ -エイト-：";

function cropStyle(crop: FigmaCrop, clip: { width: number; height: number }) {
  return {
    left: `${(crop.x / clip.width) * 100}%`,
    top: `${(crop.y / clip.height) * 100}%`,
    width: `${(crop.width / clip.width) * 100}%`,
    height: `${(crop.height / clip.height) * 100}%`,
  };
}

function FigmaCropImage({
  src,
  alt,
  crop,
  clip,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  crop: FigmaCrop;
  clip: { width: number; height: number };
  className: string;
  sizes: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#D9D9D9] ${className}`}>
      <div className="absolute" style={cropStyle(crop, clip)}>
        <Image
          src={withBasePath(src)}
          alt={alt}
          fill
          sizes={sizes}
          className="object-fill"
        />
      </div>
    </div>
  );
}

function SquareBadge({
  number,
  color,
}: {
  number: string;
  color: string;
}) {
  return (
    <span
      className="inline-flex size-[15.63px] shrink-0 items-center justify-center rounded-[4px] text-[9px] leading-[18px] text-white max-md:leading-[18px] md:size-[20.6px] md:text-xs md:leading-[18px]"
      style={{ backgroundColor: color }}
    >
      {number}
    </span>
  );
}

export function AsobiBoothCard({ booth }: AsobiBoothCardProps) {
  const [open, setOpen] = useState(false);
  const desktopCrop = booth.imageCrop?.desktop;
  const spCrop = booth.imageCrop?.sp;
  const note = "note" in booth ? booth.note : undefined;
  const noteColor = "noteColor" in booth ? booth.noteColor : undefined;
  const hasDetail = booth.detail != null;

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_0_4px_2px_rgba(0,0,0,0.1)] max-md:h-[157px] max-md:flex-row max-md:pl-4 ${
        hasDetail
          ? "cursor-pointer transition-shadow hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.16)]"
          : ""
      }`}
    >
      {hasDetail ? (
        <button
          type="button"
          className="absolute inset-0 z-10 cursor-pointer rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={`${booth.title}の詳細`}
        />
      ) : null}
      {booth.image && desktopCrop && spCrop ? (
        <>
          <FigmaCropImage
            src={booth.image}
            alt={booth.imageAlt}
            crop={desktopCrop}
            clip={CLIP_DESKTOP}
            className="aspect-[294/164] shrink-0 rounded-t-[20px] max-md:hidden"
            sizes="(max-width: 1023px) 50vw, 294px"
          />
          <FigmaCropImage
            src={booth.image}
            alt={booth.imageAlt}
            crop={spCrop}
            clip={CLIP_SP}
            className="hidden h-[157px] w-[150px] shrink-0 rounded-r-[20px] max-md:order-2 max-md:block"
            sizes="150px"
          />
        </>
      ) : (
        <>
          <div className="relative aspect-[294/164] shrink-0 rounded-t-[20px] bg-[#D9D9D9] max-md:hidden">
            <div className="flex h-full items-center justify-center">
              <span className="text-lg font-bold text-[#838383]">NO IMAGE</span>
            </div>
          </div>
          <div className="relative hidden h-[157px] w-[150px] shrink-0 rounded-r-[20px] bg-[#D9D9D9] max-md:order-2 max-md:block">
            <div className="flex h-full items-center justify-center">
              <span className="text-lg font-bold text-[#838383]">NO IMAGE</span>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-1 flex-col justify-between gap-[15px] px-[10px] pb-4 pt-2 max-md:order-1 max-md:min-w-0 max-md:gap-0 max-md:px-0 max-md:pb-3 max-md:pt-3.5 max-md:pr-5">
        <h3 className="min-h-[49px] text-base font-bold leading-[26px] text-[#4B5563] max-md:min-h-0 max-md:text-sm max-md:leading-6">
          {booth.title}
        </h3>

        <div>
          <p className="text-right text-sm leading-6 text-[#4B5563] max-md:text-left max-md:text-[11px] max-md:leading-[18px]">
            {booth.exhibitor}
          </p>

          <div className="flex items-center justify-end gap-0.5 max-md:justify-start">
            <span className="text-xs leading-6 text-[#4B5563] max-md:text-[11px] max-md:leading-6">
              {SQUARE_LABEL}
            </span>
            <SquareBadge number={booth.squareNumber} color={booth.squareColor} />
          </div>

          {note ? (
            <p
              className="text-right text-xs leading-6 max-md:text-left max-md:text-[10px] max-md:leading-6"
              style={{ color: noteColor }}
            >
              {note}
            </p>
          ) : null}
        </div>
      </div>
      {hasDetail ? (
        <BoothDetailModal
          booth={booth as BoothBooth}
          open={open}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </article>
  );
}
