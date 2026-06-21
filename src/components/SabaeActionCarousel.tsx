"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { withBasePath } from "@/lib/basePath";
import type { SabaeActionItem } from "@/lib/sabaeAction";

const AUTOPLAY_DELAY = 2000;
const LOOP_COPIES = 3;
const SCROLL_DURATION_MS = 350;

interface SabaeActionCarouselProps {
  items: SabaeActionItem[];
}

export function SabaeActionCarousel({ items }: SabaeActionCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const physicalIndexRef = useRef(items.length);
  const isTransitioningRef = useRef(false);
  const isPausedRef = useRef(false);
  const normalizeTimerRef = useRef<number | null>(null);

  const loopItems = useMemo(
    () => Array.from({ length: LOOP_COPIES }, () => items).flat(),
    [items]
  );

  const getTargetScrollLeft = useCallback((slide: HTMLElement) => {
    const container = scrollRef.current;
    if (!container) return 0;

    const centered = window.matchMedia("(max-width: 900px)").matches;
    if (centered) {
      return slide.offsetLeft - (container.clientWidth - slide.offsetWidth) / 2;
    }

    const paddingLeft = Number.parseFloat(
      getComputedStyle(container).paddingLeft
    );
    return slide.offsetLeft - paddingLeft;
  }, []);

  const normalizePosition = useCallback(() => {
    const physical = physicalIndexRef.current;
    const len = items.length;

    if (physical >= len * 2 || physical < len) {
      const normalized = len + (physical % len);
      const container = scrollRef.current;
      const slide = slideRefs.current[normalized];
      if (!container || !slide) return;

      physicalIndexRef.current = normalized;
      container.scrollTo({
        left: getTargetScrollLeft(slide),
        behavior: "auto",
      });
    }
  }, [getTargetScrollLeft, items.length]);

  const scrollToPhysical = useCallback(
    (physicalIndex: number, behavior: ScrollBehavior = "smooth") => {
      const container = scrollRef.current;
      const slide = slideRefs.current[physicalIndex];
      if (!container || !slide) return;

      if (normalizeTimerRef.current !== null) {
        window.clearTimeout(normalizeTimerRef.current);
        normalizeTimerRef.current = null;
      }

      physicalIndexRef.current = physicalIndex;

      container.scrollTo({
        left: getTargetScrollLeft(slide),
        behavior,
      });

      if (behavior === "smooth") {
        isTransitioningRef.current = true;
        normalizeTimerRef.current = window.setTimeout(() => {
          isTransitioningRef.current = false;
          normalizeTimerRef.current = null;
          normalizePosition();
        }, SCROLL_DURATION_MS);
      }
    },
    [getTargetScrollLeft, normalizePosition]
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      scrollToPhysical(items.length, "auto");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [items.length, scrollToPhysical]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (isPausedRef.current || isTransitioningRef.current) return;
      scrollToPhysical(physicalIndexRef.current + 1, "smooth");
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [scrollToPhysical]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleResize = () => {
      scrollToPhysical(physicalIndexRef.current, "auto");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollToPhysical]);

  useEffect(() => {
    return () => {
      if (normalizeTimerRef.current !== null) {
        window.clearTimeout(normalizeTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
    >
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-[25px] overflow-x-auto scroll-pl-3 scroll-pr-3 px-3 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loopItems.map((item, index) => (
          <div
            key={`${item.num}-${index}`}
            ref={(element) => {
              slideRefs.current[index] = element;
            }}
            className="shrink-0 snap-center p-1.5 max-[900px]:snap-center min-[901px]:snap-start"
          >
            <article className="w-[280px] rounded-[20px] bg-white p-[15px] shadow-[0_0_4px_2px_rgba(0,0,0,0.1)]">
              <p className="mb-2 text-[36px] font-bold leading-none text-[#b8b8b8]">
                {item.num}
              </p>
              <div className="flex flex-col items-center">
                <Image
                  src={withBasePath(item.image)}
                  alt={item.text}
                  width={241}
                  height={241}
                  className="h-auto w-full max-w-[241px]"
                />
                <p className="mt-2 text-center text-base leading-6 text-foreground">
                  {item.text}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
