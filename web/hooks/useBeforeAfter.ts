"use client";

import { useCallback, useEffect, useRef } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";

const KEYBOARD_STEP = 4;

/**
 * Before/after comparison slider: pointer drag (mouse + touch) and keyboard
 * (←/→/Home/End). The "before" layer's clip-path and the handle position are
 * updated imperatively — no re-render per pointer move.
 */
export function useBeforeAfter(initialPercent = 50) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(initialPercent);
  const dragRectRef = useRef<DOMRect | null>(null);

  const setPosition = useCallback((percent: number) => {
    const clamped = Math.max(0, Math.min(100, percent));
    positionRef.current = clamped;
    if (beforeRef.current) {
      beforeRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${clamped}%`;
      handleRef.current.setAttribute("aria-valuenow", String(Math.round(clamped)));
    }
  }, []);

  useEffect(() => {
    setPosition(initialPercent);
  }, [initialPercent, setPosition]);

  const moveTo = useCallback(
    (clientX: number) => {
      const rect = dragRectRef.current;
      if (!rect) return;
      setPosition(((clientX - rect.left) / rect.width) * 100);
    },
    [setPosition],
  );

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (dragRectRef.current) moveTo(event.clientX);
    };
    const onUp = () => {
      dragRectRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [moveTo]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!wrapRef.current) return;
      dragRectRef.current = wrapRef.current.getBoundingClientRect();
      moveTo(event.clientX);
      event.preventDefault();
    },
    [moveTo],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      let next = positionRef.current;
      if (event.key === "ArrowLeft") next -= KEYBOARD_STEP;
      else if (event.key === "ArrowRight") next += KEYBOARD_STEP;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = 100;
      else return;
      event.preventDefault();
      setPosition(next);
    },
    [setPosition],
  );

  return { wrapRef, beforeRef, handleRef, onPointerDown, onKeyDown };
}
