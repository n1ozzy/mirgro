"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { navItems } from "@/content/site";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface MobileMenuProps {
  /** Stable element id — target of the toggle button's aria-controls. */
  id: string;
  open: boolean;
  activeSection: string;
  ctaLabel: string;
  onNavigate: (id: string) => void;
}

export function MobileMenu({ id, open, activeSection, ctaLabel, onNavigate }: MobileMenuProps) {
  const reducedMotion = useReducedMotionSafe();

  // The wrapper keeps the id in the DOM even while the drawer is unmounted,
  // so aria-controls always points at an existing element.
  return (
    <div id={id}>
      <AnimatePresence>
      {open && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.26 }}
          className="border-t border-text/7 bg-overlay/97 px-[clamp(18px,4vw,40px)] pt-3 pb-5.5 lg:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
              }}
              aria-current={activeSection === item.id ? "true" : undefined}
              className={cn(
                "block border-b border-text/6 px-1.5 py-3.25 text-[17px] font-semibold",
                activeSection === item.id ? "text-text" : "text-muted",
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("kontakt");
            }}
            className="mt-4 block rounded-pill bg-brass p-3.5 text-center text-base font-bold text-bg"
          >
            {ctaLabel}
          </a>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
