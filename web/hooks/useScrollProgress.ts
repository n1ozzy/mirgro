"use client";

import { useEffect, type RefObject } from "react";

/**
 * Drives a progress-bar element's width from whole-page scroll progress.
 * Updates imperatively inside rAF to avoid re-renders per scroll frame.
 */
export function useScrollProgress(barRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const scrolled = window.scrollY || document.documentElement.scrollTop || 0;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? (scrolled / total) * 100 : 0;
        if (barRef.current) barRef.current.style.width = `${progress}%`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [barRef]);
}
