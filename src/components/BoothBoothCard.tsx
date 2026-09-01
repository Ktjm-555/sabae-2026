"use client";

import { useState } from "react";
import Image from "next/image";
import { BoothDetailModal } from "@/components/BoothDetailModal";
import { withBasePath } from "@/lib/basePath";
import type { BoothBooth } from "@/lib/booths";

interface BoothBoothCardProps {
  booth: BoothBooth;
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

function scaleCropUniform(
  crop: FigmaCrop,
  from: { width: number; height: number },
  to: { width: number; height: number },
  fit: "width" | "contain" | "cover" = "width",
): FigmaCrop {
  const scale =
    fit === "contain"
      ? Math.min(to.width / crop.width, to.height / crop.height)
      : fit === "cover"
        ? Math.max(to.width / crop.width, to.height / crop.height)
        : to.width / from.width;
  const width = crop.width * scale;
  const height = crop.height * scale;
  const bleed = fit === "cover" ? 1 : 0;
  return {
    x: (fit === "width" ? crop.x * scale : (to.width - width) / 2) - bleed,
    y: (to.height - height) / 2 - bleed,
    width: width + bleed * 2,
    height: height + bleed * 2,
  };
}

function FigmaCropImage({
  src,
  alt,
  crop,
  clip,
  className,
  sizes,
  backgroundColor = "#D9D9D9",
}: {
  src: string;
  alt: string;
  crop: FigmaCrop;
  clip: { width: number; height: number };
  className: string;
  sizes: string;
  backgroundColor?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <div className="absolute" style={cropStyle(crop, clip)}>
        <Image
          src={withBasePath(src)}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
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

export function BoothBoothCard({ booth }: BoothBoothCardProps) {
  const [open, setOpen] = useState(false);
  const desktopCrop = booth.imageCrop?.desktop;
  const note = booth.note;
  const noteColor = booth.noteColor;
  const exhibitor = booth.exhibitor;
  const hasDetail = booth.detail != null;
  const spFit =
    booth.imageSpFit === "contain" || booth.imageSpFit === "cover"
      ? booth.imageSpFit
      : "width";

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
      {booth.image && desktopCrop ? (
        <>
          <FigmaCropImage
            src={booth.image}
            alt={booth.imageAlt}
            crop={desktopCrop}
            clip={CLIP_DESKTOP}
            className="aspect-[294/164] shrink-0 rounded-t-[20px] max-md:hidden"
            sizes="(max-width: 1023px) 50vw, 294px"
            backgroundColor={booth.imageBackgroundColor}
          />
          <FigmaCropImage
            src={booth.image}
            alt={booth.imageAlt}
            crop={scaleCropUniform(
              desktopCrop,
              CLIP_DESKTOP,
              CLIP_SP,
              spFit,
            )}
            clip={CLIP_SP}
            className="hidden h-[157px] w-[150px] shrink-0 rounded-r-[20px] max-md:order-2 max-md:block"
            sizes="150px"
            backgroundColor={
              booth.imageSpFit === "contain"
                ? undefined
                : booth.imageBackgroundColor
            }
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
          {exhibitor ? (
            <p className="whitespace-pre-line text-right text-sm leading-6 text-[#4B5563] max-md:text-left max-md:text-[11px] max-md:leading-[18px]">
              {exhibitor}
            </p>
          ) : null}

          {booth.squareNumber && booth.squareColor ? (
            <div
              className={`flex items-center justify-end gap-0.5 max-md:justify-start ${exhibitor ? "" : "max-md:mt-auto"}`}
            >
              <span className="text-xs leading-6 text-[#4B5563] max-md:text-[11px] max-md:leading-6">
                {SQUARE_LABEL}
              </span>
              <SquareBadge number={booth.squareNumber} color={booth.squareColor} />
            </div>
          ) : booth.squarePending ? (
            <div
              className={`flex items-center justify-end max-md:justify-start ${exhibitor ? "" : "max-md:mt-auto"}`}
            >
              <span className="text-xs leading-6 text-[#4B5563] max-md:text-[11px] max-md:leading-6">
                {SQUARE_LABEL}ー
              </span>
            </div>
          ) : null}

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
          booth={booth}
          open={open}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </article>
  );
}
