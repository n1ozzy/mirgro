"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollToPosition, scrollToSection, setLenis } from "@/lib/scroll";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/*
 * Lenis smooth scrolling for the whole page: wheel input is eased (lerp), so
 * the page "glides" to a stop instead of jumping — which also smooths every
 * scroll-scrubbed section (filmstrip, renovation story, reveals).
 *
 * Touch keeps native momentum scrolling (Lenis default) and the instance is
 * skipped entirely under prefers-reduced-motion. Nav/CTA handlers already go
 * through scrollToSection(); the click listener below catches only the plain
 * `href="#…"` anchors (footer) that no React handler claimed — Lenis's own
 * `anchors` option is not used, as it would stack the element's
 * scroll-margin-top on top of our header offset.
 */
export function SmoothScroll() {
  const reducedMotion = useReducedMotionSafe();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ lerp: 0.1 });
    setLenis(lenis);

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const id = anchor.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (id && !target) return;
      event.preventDefault();
      if (id && target) {
        scrollToSection(id, false);
        // preventDefault above also suppressed the native focus move — restore
        // it so keyboard users (skip link!) land where the page scrolled.
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      } else {
        scrollToPosition(0, false);
      }
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return null;
}
