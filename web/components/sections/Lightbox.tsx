"use client";

import type { RefObject } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/types/content";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  open: boolean;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const navButtonClasses =
  "absolute top-1/2 z-2 grid size-13 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-text/14 bg-text/6 text-text transition-colors hover:bg-text/16 focus-visible:outline-2 focus-visible:outline-brass";

export function Lightbox({
  items,
  index,
  open,
  closeButtonRef,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const reducedMotion = useReducedMotionSafe();
  const current = items[index] ?? items[0];

  // The photo box gets an explicit CSS size (aspect-ratio from the static
  // import, width capped by viewport and 78vh). Relying on the image's
  // intrinsic size breaks on mobile: with `sizes` guessing wrong, the browser
  // divides the ≤768px originals by the candidate density and the photo
  // collapses to thumbnail size.
  const dims =
    current && typeof current.src === "object"
      ? current.src
      : { width: 3, height: 4 };
  const ratio = dims.width / dims.height;

  // Keep focus cycling inside the dialog — without a trap, the fourth Tab
  // escapes behind the overlay into content the modal visually covers.
  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusables = event.currentTarget.querySelectorAll<HTMLElement>("button");
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    const inside = event.currentTarget.contains(active);
    if (event.shiftKey && (active === first || !inside)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !inside)) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          onKeyDown={trapFocus}
          role="dialog"
          aria-modal="true"
          aria-label={`Podgląd zdjęcia: ${current.caption}`}
          className="fixed inset-0 z-400 flex items-center justify-center bg-[rgba(6,9,12,0.94)] p-[clamp(16px,4vw,56px)] backdrop-blur-sm"
        >
          <div className="absolute top-5 left-6 flex items-center gap-3 font-mono text-[13px] text-muted">
            <span className="rounded-[7px] bg-brass px-2.75 py-1.25 font-bold text-bg">
              {current.tags[0]}
            </span>
            <span>
              {index + 1} / {items.length}
            </span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
            className="absolute top-4 right-5 z-2 grid size-12 cursor-pointer place-items-center rounded-field border border-text/14 bg-text/6 text-text transition-colors hover:bg-text/14 focus-visible:outline-2 focus-visible:outline-brass"
          >
            <X aria-hidden size={22} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Poprzednie"
            className={`${navButtonClasses} left-[clamp(10px,2vw,28px)]`}
          >
            <ChevronLeft aria-hidden size={24} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Następne"
            className={`${navButtonClasses} right-[clamp(10px,2vw,28px)]`}
          >
            <ChevronRight aria-hidden size={24} strokeWidth={1.8} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-w-[min(900px,90vw)] flex-col items-center gap-4"
          >
            <div
              className="relative overflow-hidden rounded-xl shadow-media"
              style={{
                aspectRatio: `${dims.width} / ${dims.height}`,
                width: `min(90vw, 900px, calc(78vh * ${ratio.toFixed(4)}))`,
              }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 900px) 90vw, 900px"
                className="object-cover"
              />
            </div>
            <p className="max-w-[60ch] text-center text-body leading-normal text-text-2">
              {current.caption}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
