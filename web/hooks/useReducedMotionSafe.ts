"use client";

import { useReducedMotion } from "framer-motion";

/** `useReducedMotion` narrowed to a boolean (`null` during SSR → `false`). */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
