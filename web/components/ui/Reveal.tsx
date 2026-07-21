"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface RevealProps {
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/** Reveal-on-scroll wrapper; renders content statically under reduced motion. */
export function Reveal({ delay = 0, className, children }: RevealProps) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.08 }}
      transition={{
        duration: 0.7,
        ease: [0.2, 0.7, 0.2, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
