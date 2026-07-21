"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { companyPhoneHref } from "@/content/site";
import { scrollToSection } from "@/lib/scroll";
import { useIsNarrow } from "@/hooks/useIsNarrow";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** Fraction of the viewport height after which the bar appears. */
const SHOW_AFTER_VIEWPORT_FRACTION = 0.75;

export function MobileStickyCta() {
  const isNarrow = useIsNarrow();
  const reducedMotion = useReducedMotionSafe();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setPastHero(window.scrollY > window.innerHeight * SHOW_AFTER_VIEWPORT_FRACTION);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <AnimatePresence>
      {isNarrow && pastHero && (
        <motion.div
          initial={reducedMotion ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-140 flex gap-3 border-t border-text/10 bg-overlay/95 px-[clamp(14px,4vw,20px)] py-3 backdrop-blur-md"
        >
          <a
            href={companyPhoneHref}
            className="flex flex-1 items-center justify-center gap-2.25 rounded-xl border border-text/25 p-3.5 text-body font-bold text-text"
          >
            <Phone aria-hidden size={18} strokeWidth={1.8} />
            Zadzwoń
          </a>
          <button
            type="button"
            onClick={() => scrollToSection("kontakt", reducedMotion)}
            className="flex flex-[1.2] cursor-pointer items-center justify-center gap-2 rounded-xl bg-brass p-3.5 text-body font-bold text-bg"
          >
            Wycena
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
