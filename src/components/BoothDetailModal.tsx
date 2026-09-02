"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { withBasePath } from "@/lib/basePath";
import type { BoothBooth } from "@/lib/booths";
import { getSabaeActionContent } from "@/lib/sabaeAction";

interface BoothDetailModalProps {
  booth: BoothBooth;
  open: boolean;
  onClose: () => void;
}

type FigmaCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const CLIP_DESKTOP = { width: 294, height: 164 };

function cropStyle(crop: FigmaCrop, clip: { width: number; height: number }) {
  return {
    left: `${(crop.x / clip.width) * 100}%`,
    top: `${(crop.y / clip.height) * 100}%`,
    width: `${(crop.width / clip.width) * 100}%`,
    height: `${(crop.height / clip.height) * 100}%`,
  };
}

function CloseIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="size-[16.67px] md:size-[26px]"
    >
      <path
        d="M0.545486 0.545486C0.717961 0.372574 0.922854 0.235387 1.14843 0.141784C1.37401 0.0481801 1.61583 0 1.86006 0C2.10428 0 2.34611 0.0481801 2.57168 0.141784C2.79726 0.235387 3.00215 0.372574 3.17463 0.545486L13.0005 10.3751L22.8263 0.545486C22.999 0.372854 23.2039 0.235914 23.4295 0.142487C23.655 0.0490589 23.8968 0.000972127 24.1409 0.000972127C24.3851 0.000972127 24.6268 0.0490589 24.8524 0.142487C25.0779 0.235914 25.2829 0.372854 25.4555 0.545486C25.6281 0.718117 25.7651 0.923061 25.8585 1.14862C25.9519 1.37417 26 1.61592 26 1.86006C26 2.1042 25.9519 2.34594 25.8585 2.5715C25.7651 2.79705 25.6281 3.002 25.4555 3.17463L15.6259 13.0005L25.4555 22.8263C25.6281 22.999 25.7651 23.2039 25.8585 23.4295C25.9519 23.655 26 23.8968 26 24.1409C26 24.3851 25.9519 24.6268 25.8585 24.8524C25.7651 25.0779 25.6281 25.2829 25.4555 25.4555C25.2829 25.6281 25.0779 25.7651 24.8524 25.8585C24.6268 25.9519 24.3851 26 24.1409 26C23.8968 26 23.655 25.9519 23.4295 25.8585C23.2039 25.7651 22.999 25.6281 22.8263 25.4555L13.0005 15.6259L3.17463 25.4555C3.002 25.6281 2.79705 25.7651 2.5715 25.8585C2.34594 25.9519 2.1042 26 1.86006 26C1.61592 26 1.37417 25.9519 1.14862 25.8585C0.923061 25.7651 0.718117 25.6281 0.545486 25.4555C0.372854 25.2829 0.235914 25.0779 0.142487 24.8524C0.0490589 24.6268 0.000972127 24.3851 0.000972127 24.1409C0.000972127 23.8968 0.0490589 23.655 0.142487 23.4295C0.235914 23.2039 0.372854 22.999 0.545486 22.8263L10.3751 13.0005L0.545486 3.17463C0.372574 3.00215 0.235387 2.79726 0.141784 2.57168C0.0481801 2.34611 0 2.10428 0 1.86006C0 1.61583 0.0481801 1.37401 0.141784 1.14843C0.235387 0.922854 0.372574 0.717961 0.545486 0.545486Z"
        fill="#888888"
      />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M15.8169 0.335736C15.7097 0.229312 15.5824 0.144877 15.4422 0.0872658C15.302 0.0296548 15.1518 0 15 0C14.8482 0 14.698 0.0296548 14.5578 0.0872658C14.4176 0.144877 14.2903 0.229312 14.1831 0.335736L0.336925 14.0491C0.229844 14.1555 0.144971 14.2817 0.0871596 14.4205C0.029348 14.5593 -0.000268961 14.7081 1.84037e-06 14.8582V30.8572C1.84037e-06 31.1603 0.121567 31.451 0.337955 31.6653C0.554344 31.8796 0.847829 32 1.15385 32H11.5385C11.8445 32 12.138 31.8796 12.3544 31.6653C12.5707 31.451 12.6923 31.1603 12.6923 30.8572V21.7149H17.3077V30.8572C17.3077 31.1603 17.4293 31.451 17.6456 31.6653C17.862 31.8796 18.1555 32 18.4615 32H28.8462C29.1522 32 29.4457 31.8796 29.662 31.6653C29.8784 31.451 30 31.1603 30 30.8572V14.8582C30.0003 14.7081 29.9707 14.5593 29.9128 14.4205C29.855 14.2817 29.7702 14.1555 29.6631 14.0491L26.5385 10.9568V3.4304C26.5385 3.12731 26.4169 2.83664 26.2005 2.62233C25.9841 2.40801 25.6906 2.28761 25.3846 2.28761H23.0769C22.7709 2.28761 22.4774 2.40801 22.261 2.62233C22.0446 2.83664 21.9231 3.12731 21.9231 3.4304V6.38564L15.8169 0.335736ZM2.30769 29.7144V15.3313L15 2.76072L27.6923 15.3313V29.7144H19.6154V20.5722C19.6154 20.2691 19.4938 19.9784 19.2774 19.7641C19.061 19.5498 18.7676 19.4294 18.4615 19.4294H11.5385C11.2324 19.4294 10.939 19.5498 10.7226 19.7641C10.5062 19.9784 10.3846 20.2691 10.3846 20.5722V29.7144H2.30769Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const LINK_ITEMS = [
  { key: "hp", label: "ホームページ", Icon: HomeIcon },
  { key: "twitter", label: "X（Twitter）", Icon: XIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
] as const;

function ActionLabel() {
  return (
    <>
      <p className="hidden text-right text-base font-normal leading-[30px] text-[#4B5563] md:block">
        さばえACTION
        <span className="inline-block translate-y-[0.08em] text-[22px] leading-none">
          ∞
        </span>{" "}
        -エイト-
      </p>
      <p className="text-right text-[9px] font-normal leading-[11px] text-[#4B5563] md:hidden">
        さばえACTION
        <span className="text-[12px] leading-none">∞</span>
        <br />
        -エイト-
      </p>
    </>
  );
}

export function BoothDetailModal({ booth, open, onClose }: BoothDetailModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const action = getSabaeActionContent().items.find(
    (item) => item.num === booth.squareNumber,
  );
  const desktopCrop = booth.imageCrop?.desktop;
  const body = booth.detail?.body;
  const links = booth.detail?.links;
  const socialLinks = LINK_ITEMS.flatMap((item) => {
    const href = links?.[item.key];
    return href ? [{ ...item, href }] : [];
  });
  const showMeta = Boolean(booth.note || booth.exhibitor);
  const showFooter = socialLinks.length > 0 || Boolean(action);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4 max-md:px-4 max-md:py-8"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative my-auto w-full max-w-[370px] isolate overflow-hidden rounded-[20px] bg-white shadow-[0_0_4px_2px_rgba(0,0,0,0.25)] outline-none md:max-w-[900px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain">
          <div className="flex items-start justify-between gap-4 px-[13px] pt-4 md:px-8 md:pt-[19px]">
          <h2
            id={titleId}
            className="min-w-0 flex-1 text-[18px] font-bold leading-[27px] text-[#4B5563] md:text-2xl md:leading-[48px]"
          >
            {booth.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="mt-0.5 shrink-0 rounded-sm md:mt-2.5"
            aria-label="閉じる"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mt-3 border-t border-[#DCDCDC] md:mt-[15px]" />

        <div className="px-[13px] pt-[15px] md:px-8 md:pt-[25px]">
          {booth.image && desktopCrop ? (
            <div
              className="relative aspect-[294/164] overflow-hidden rounded-[20px]"
              style={{ backgroundColor: booth.imageBackgroundColor ?? "#D9D9D9" }}
            >
              <div
                className="absolute overflow-hidden"
                style={cropStyle(desktopCrop, CLIP_DESKTOP)}
              >
                <Image
                  src={withBasePath(booth.image)}
                  alt={booth.imageAlt}
                  fill
                  sizes="(max-width: 767px) 344px, 836px"
                  className={
                    booth.imageClipFringe
                      ? "object-cover scale-[1.04]"
                      : "object-cover"
                  }
                />
              </div>
            </div>
          ) : (
            <div className="flex aspect-[294/164] items-center justify-center rounded-[20px] bg-[#D9D9D9]">
              <span className="text-lg font-bold text-[#838383]">NO IMAGE</span>
            </div>
          )}
        </div>

        {body ? (
          <div
            className={`space-y-1.5 px-[13px] pt-4 text-xs leading-5 text-[#4B5563] md:space-y-2 md:px-8 md:pt-[25px] md:text-base md:leading-7 ${
              showMeta || showFooter ? "" : "pb-4 md:pb-6"
            }`}
          >
            {body.split(/\n\n+/).map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        {showMeta ? (
          <div className="mt-4 flex items-center justify-between gap-3 px-[13px] md:mt-6 md:px-8">
            {booth.note ? (
              <p
                className="shrink-0 text-[13px] leading-[26px] md:text-lg md:leading-[26px]"
                style={{ color: booth.noteColor }}
              >
                {booth.note}
              </p>
            ) : (
              <span />
            )}
            {booth.exhibitor ? (
              <p className="min-w-0 whitespace-pre-line text-right text-[13px] leading-[26px] text-[#4B5563] md:text-lg md:leading-[26px]">
                {booth.exhibitor}
              </p>
            ) : null}
          </div>
        ) : null}

        {showFooter ? (
          <>
            <div className="mt-4 border-t border-[#DCDCDC] md:mt-5" />

            <div className="flex items-center justify-between gap-3 px-[13px] py-2.5 md:px-8 md:py-2.5">
              <div className="flex min-h-5 min-w-0 items-center gap-[7px] md:min-h-8 md:gap-3">
                {socialLinks.map(({ key, href, label, Icon }) => (
                  <Link
                    key={key}
                    href={href}
                    className="shrink-0 text-[#0B5AB1] transition-opacity hover:opacity-80"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="size-5 md:size-8" />
                  </Link>
                ))}
              </div>

              {action ? (
                <div className="flex shrink-0 items-center gap-1.5 md:gap-3">
                  <ActionLabel />
                  <span
                    className="h-7 w-px shrink-0 bg-[#DCDCDC] md:h-[54px]"
                    aria-hidden="true"
                  />
                  <Image
                    src={withBasePath(action.image)}
                    alt=""
                    width={60}
                    height={60}
                    className="size-[31px] shrink-0 md:size-[60px]"
                  />
                  <div className="shrink-0">
                    <p className="text-[13px] font-bold leading-[19.5px] text-[#B8B8B8] md:text-xl md:leading-6">
                      {action.num}
                    </p>
                    <p className="whitespace-nowrap text-[9px] leading-[12.5px] text-[#4B5563] md:text-base md:leading-6">
                      {action.text}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </>
        ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
