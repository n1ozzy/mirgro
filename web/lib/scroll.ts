import type Lenis from "lenis";

/** Height of the fixed site header; scroll targets are offset by it. */
export const HEADER_OFFSET_PX = 74;

/** Active Lenis instance, registered by SmoothScroll (null = native scroll). */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null): void {
  lenis = instance;
}

/** Scroll to an absolute Y position, through Lenis when it drives the page. */
export function scrollToPosition(top: number, reducedMotion: boolean): void {
  if (!reducedMotion && lenis) {
    lenis.scrollTo(top);
    return;
  }
  window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
}

export function scrollToSection(id: string, reducedMotion: boolean): void {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
  scrollToPosition(top, reducedMotion);
}
