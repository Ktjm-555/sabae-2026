"use client";

import { useState } from "react";
import Image from "next/image";
import { BoothDetailModal } from "@/components/BoothDetailModal";
import { withBasePath } from "@/lib/basePath";
import type { BoothBooth } from "@/lib/booths";

type ImageSpFit = "width" | "contain" | "cover";

interface BoothBoothCardProps {
  booth: BoothBooth;
  defaultImageSpFit?: ImageSpFit;
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
  align: "center" | "top" = "center",
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
  const topAligned = fit === "cover" && align === "top";
  return {
    x: (fit === "width" ? crop.x * scale : (to.width - width) / 2) - bleed,
    y: topAligned ? 0 : (to.height - height) / 2 - bleed,
    width: width + bleed * 2,
    height: height + bleed * (topAligned ? 1 : 2),
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
  clipFringe = false,
}: {
  src: string;
  alt: string;
  crop: FigmaCrop;
  clip: { width: number; height: number };
  className: string;
  sizes: string;
  backgroundColor?: string;
  clipFringe?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <div className="absolute overflow-hidden" style={cropStyle(crop, clip)}>
        <Image
          src={withBasePath(src)}
          alt={alt}
          fill
          sizes={sizes}
          className={
            clipFringe ? "object-cover scale-[1.04]" : "object-cover"
          }
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

export function BoothBoothCard({
  booth,
  defaultImageSpFit = "width",
}: BoothBoothCardProps) {
  const [open, setOpen] = useState(false);
  const desktopCrop = booth.imageCrop?.desktop;
  const note = booth.note;
  const noteColor = booth.noteColor;
  const exhibitor = booth.exhibitor;
  const hasDetail = booth.detail != null;
  const spFit: ImageSpFit =
    booth.imageSpFit === "contain" || booth.imageSpFit === "cover"
      ? booth.imageSpFit
      : defaultImageSpFit;
  const spAlign = booth.imageSpAlign === "top" ? "top" : "center";

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_0_4px_2px_rgba(0,0,0,0.1)] max-md:h-[157px] max-md:flex-row max-md:pl-4 max-md:[text-size-adjust:100%] ${
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
            clipFringe={booth.imageClipFringe}
          />
          <FigmaCropImage
            src={booth.image}
            alt={booth.imageAlt}
            crop={scaleCropUniform(
              desktopCrop,
              CLIP_DESKTOP,
              CLIP_SP,
              spFit,
              spAlign,
            )}
            clip={CLIP_SP}
            className="hidden h-[157px] w-[150px] min-w-0 shrink rounded-r-[20px] max-md:order-2 max-md:block"
            sizes="150px"
            backgroundColor={
              booth.imageSpFit === "contain" && !booth.imageBackgroundColor
                ? undefined
                : booth.imageBackgroundColor
            }
            clipFringe={booth.imageClipFringe}
          />
        </>
      ) : (
        <>
          <div className="relative aspect-[294/164] shrink-0 rounded-t-[20px] bg-[#D9D9D9] max-md:hidden">
            <div className="flex h-full items-center justify-center">
              <span className="text-lg font-bold text-[#838383]">NO IMAGE</span>
            </div>
          </div>
          <div className="relative hidden h-[157px] w-[150px] min-w-0 shrink rounded-r-[20px] bg-[#D9D9D9] max-md:order-2 max-md:block">
            <div className="flex h-full items-center justify-center">
              <span className="text-lg font-bold text-[#838383]">NO IMAGE</span>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-1 flex-col justify-between gap-[15px] px-[10px] pb-4 pt-2 max-md:order-1 max-md:h-full max-md:min-w-[170px] max-md:flex-1 max-md:gap-0 max-md:overflow-hidden max-md:px-0 max-md:pb-3 max-md:pt-3.5">
        <h3 className="min-h-[49px] text-base font-bold leading-[26px] text-[#4B5563] max-md:min-h-0 max-md:max-h-[72px] max-md:overflow-hidden max-md:pr-[18px] max-md:text-[14px] max-md:leading-[24px] max-md:line-clamp-3">
          {booth.title}
        </h3>

        <div className="max-md:mt-auto max-md:w-full max-md:max-w-[170px] max-md:shrink-0">
          {exhibitor ? (
            <p className="whitespace-pre-line text-right text-sm leading-6 text-[#4B5563] max-md:text-left max-md:text-[11px] max-md:leading-[19px] max-md:line-clamp-2">
              {exhibitor}
            </p>
          ) : null}

          {booth.squareNumber && booth.squareColor ? (
            <div
              className={`flex flex-nowrap items-center justify-end gap-0.5 max-md:justify-start ${exhibitor ? "" : "max-md:mt-auto"}`}
            >
              <span className="text-xs leading-6 text-[#4B5563] max-md:whitespace-nowrap max-md:text-[11px] max-md:leading-[20px]">
                {SQUARE_LABEL}
              </span>
              <SquareBadge number={booth.squareNumber} color={booth.squareColor} />
            </div>
          ) : booth.squarePending ? (
            <div
              className={`flex flex-nowrap items-center justify-end max-md:justify-start ${exhibitor ? "" : "max-md:mt-auto"}`}
            >
              <span className="text-xs leading-6 text-[#4B5563] max-md:whitespace-nowrap max-md:text-[11px] max-md:leading-[20px]">
                {SQUARE_LABEL}ー
              </span>
            </div>
          ) : null}

          {note ? (
            <p
              className="text-right text-xs leading-6 max-md:text-left max-md:text-[10px] max-md:leading-[19px]"
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
