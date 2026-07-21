"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/** 3px page-scroll progress bar pinned above the header. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useScrollProgress(barRef);

  return (
    <div aria-hidden className="fixed top-0 left-0 z-200 h-0.75 w-full bg-text/5">
      <div
        ref={barRef}
        className="h-full w-0 bg-linear-to-r from-brass-deep via-brass via-55% to-laser shadow-[0_0_12px] shadow-brass/50"
      />
    </div>
  );
}
