"use client";

import { useEffect, useState } from "react";

/** Breakpoint below which the mobile nav / sticky CTA are used. */
export const NARROW_BREAKPOINT_PX = 1024;

export function useIsNarrow(): boolean {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${NARROW_BREAKPOINT_PX - 1}px)`);
    const update = () => setIsNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isNarrow;
}
