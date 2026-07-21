"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface ToastProps {
  message: string | null;
}

/** Success toast pinned below the header; auto-hide is driven by the caller. */
export function Toast({ message }: ToastProps) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          role="status"
          initial={reducedMotion ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3 }}
          className="fixed top-22 right-section-x z-500 flex max-w-85 items-center gap-3.25 rounded-card border border-laser/30 bg-ink p-4.5 shadow-media"
        >
          <span className="grid size-8.5 shrink-0 place-items-center rounded-full bg-laser text-ink">
            <Check aria-hidden size={19} strokeWidth={2.4} />
          </span>
          <span className="text-sm leading-snug text-text">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
