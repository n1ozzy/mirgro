"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Lightbox state over a filtered list: open/close, wrapping prev/next,
 * ←/→/Esc keys, focus moved to the close button on open and returned to
 * the triggering element on close.
 */
export function useLightbox(itemCount: number) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback((at: number) => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIndex(at);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    returnFocusRef.current?.focus();
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % itemCount);
  }, [itemCount]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowLeft") prev();
      else if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, prev, next]);

  return { isOpen, index, open, close, prev, next, closeButtonRef };
}
