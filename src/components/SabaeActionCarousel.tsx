"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { withBasePath } from "@/lib/basePath";
import type { SabaeActionItem } from "@/lib/sabaeAction";

const AUTOPLAY_DELAY = 2000;
// 無限スクロールを途切れなく見せるためのスライドのコピー回数
const LOOP_COPIES = 3;
// 1回分の自動スクロールが完了したと判断するまでの目安時間
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
  const lastInteractionRef = useRef(0);
  const normalizeTimerRef = useRef<number | null>(null);

  // 前後に同じスライド群を並べ、中央のコピーを起点にして無限ループを表現する
  const loopItems = useMemo(
    () => Array.from({ length: LOOP_COPIES }, () => items).flat(),
    [items]
  );

  const getTargetScrollLeft = useCallback((slide: HTMLElement) => {
    const container = scrollRef.current;
    if (!container) return 0;

    const centered = window.matchMedia("(max-width: 900px)").matches;
    if (centered) {
      // SP版では対象スライドがコンテナ中央に来る位置を算出する
      return slide.offsetLeft - (container.clientWidth - slide.offsetWidth) / 2;
    }

    // PCではコンテナの左パディング位置にスライドの先頭を揃える
    // カードの枠が左に重なって消えていたので。
    const paddingLeft = Number.parseFloat(
      getComputedStyle(container).paddingLeft
    );
    return slide.offsetLeft - paddingLeft;
  }, []);

  const normalizePosition = useCallback(() => {
    const physical = physicalIndexRef.current;
    const len = items.length;

    if (physical >= len * 2 || physical < len) {
      // 両端のコピーに到達したら、見た目が同じ中央のコピーへ瞬時に移動する
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

  const findNearestPhysicalIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return physicalIndexRef.current;

    let nearestIndex = physicalIndexRef.current;
    let nearestDistance = Infinity;

    // スクロール位置と各スライドの停止位置を比較し、現在地に最も近いものを探す
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;

      const distance = Math.abs(
        container.scrollLeft - getTargetScrollLeft(slide)
      );
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }, [getTargetScrollLeft]);

  const finishProgrammaticScroll = useCallback(() => {
    if (!isTransitioningRef.current) return;

    if (normalizeTimerRef.current !== null) {
      window.clearTimeout(normalizeTimerRef.current);
      normalizeTimerRef.current = null;
    }

    // 実際の停止位置を基準に現在位置を確定してから、必要なら中央コピーへ戻す
    physicalIndexRef.current = findNearestPhysicalIndex();
    normalizePosition();
    isTransitioningRef.current = false;
  }, [findNearestPhysicalIndex, normalizePosition]);

  const syncManualScroll = useCallback(() => {
    if (isTransitioningRef.current) return;

    // 手動操作後の位置を同期し、直後に自動再生が走らないよう操作時刻を記録する
    physicalIndexRef.current = findNearestPhysicalIndex();
    normalizePosition();
    lastInteractionRef.current = Date.now();
  }, [findNearestPhysicalIndex, normalizePosition]);

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
        // scrollend 非対応環境でも後処理できるよう、タイマーをフォールバックにする
        normalizeTimerRef.current = window.setTimeout(() => {
          finishProgrammaticScroll();
        }, SCROLL_DURATION_MS + 100);
      } else {
        window.requestAnimationFrame(() => {
          normalizePosition();
        });
      }
    },
    [finishProgrammaticScroll, getTargetScrollLeft, normalizePosition]
  );

  useEffect(() => {
    // 初期表示は中央のコピーから開始し、左右どちらにもループできる余白を確保する
    const frame = window.requestAnimationFrame(() => {
      scrollToPhysical(items.length, "auto");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [items.length, scrollToPhysical]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (isPausedRef.current || isTransitioningRef.current) return;
      if (Date.now() - lastInteractionRef.current < AUTOPLAY_DELAY) return;
      scrollToPhysical(physicalIndexRef.current + 1, "smooth");
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [scrollToPhysical]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScrollEnd = () => {
      if (isTransitioningRef.current) {
        finishProgrammaticScroll();
      } else {
        syncManualScroll();
      }
    };

    container.addEventListener("scrollend", handleScrollEnd);

    // scrollendの補助として、scrollが止まってから手動操作の終了を判定する
    let scrollTimer: number | null = null;
    const handleScroll = () => {
      if (isTransitioningRef.current) return;

      if (scrollTimer !== null) {
        window.clearTimeout(scrollTimer);
      }
      scrollTimer = window.setTimeout(syncManualScroll, 150);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scrollend", handleScrollEnd);
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimer !== null) {
        window.clearTimeout(scrollTimer);
      }
    };
  }, [finishProgrammaticScroll, syncManualScroll]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleResize = () => {
      // 表示幅に応じて中央揃え/左揃えの停止位置を再計算する
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
        onPointerDown={() => {
          isPausedRef.current = true;
        }}
        onPointerUp={() => {
          isPausedRef.current = false;
        }}
        onPointerCancel={() => {
          isPausedRef.current = false;
        }}
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
