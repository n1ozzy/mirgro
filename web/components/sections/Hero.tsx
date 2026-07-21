"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { hero } from "@/content/site";
import { scrollToSection } from "@/lib/scroll";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Decorative floating particles: [top%, left%, size, color class, duration s, delay s] */
const PARTICLES = [
  { top: "28%", left: "16%", size: 5, color: "bg-brass shadow-brass", duration: 9, delay: 0 },
  { top: "62%", left: "40%", size: 3, color: "bg-laser shadow-laser", duration: 11, delay: 0.8 },
  { top: "44%", left: "74%", size: 4, color: "bg-brass shadow-brass", duration: 8, delay: 1.6 },
  { top: "74%", left: "63%", size: 3, color: "bg-brass-deep shadow-brass-deep", duration: 12, delay: 0.4 },
] as const;

export function Hero() {
  const reducedMotion = useReducedMotionSafe();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, (value) =>
    reducedMotion ? 0 : value * 0.1,
  );

  return (
    <section
      id="home"
      className="relative overflow-hidden px-section-x pt-hero-top pb-[clamp(52px,6vw,80px)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -inset-x-[20%] -inset-y-[10%] animate-grain-drift bg-[repeating-linear-gradient(96deg,rgba(182,125,70,0)_0px,rgba(182,125,70,0.05)_2px,rgba(182,125,70,0)_5px,rgba(182,125,70,0)_46px)] [mask-image:radial-gradient(120%_90%_at_70%_20%,#000,transparent_75%)]" />
        {PARTICLES.map((particle) => (
          <span
            key={`${particle.top}-${particle.left}`}
            className={`absolute animate-float rounded-full shadow-[0_0_10px] ${particle.color}`}
            style={{
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
        <div className="absolute top-[-25%] left-[-15%] h-[150%] w-30 animate-hero-sweep bg-linear-to-r from-transparent via-laser/10 to-transparent" />
        <div className="absolute inset-0 bg-radial-[90%_70%_at_80%_0%] from-brass/10 to-transparent to-60%" />
      </div>

      <div className="relative mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(26px,3.5vw,52px)]">
        <Reveal>
          <span className="inline-flex items-center gap-2.25 rounded-pill border border-brass/30 bg-brass/10 px-3.75 py-2 font-mono text-[11.5px] uppercase tracking-pill text-brass">
            <span className="size-1.5 rounded-full bg-brass shadow-[0_0_8px] shadow-brass" />
            {hero.pill}
          </span>
          {/* Smaller size/tracking below sm keeps the kicker on one line. */}
          <p className="mt-6.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:text-xs sm:tracking-[0.28em]">
            {hero.kicker}
          </p>
          {/* Two balanced blocks — a <br> inside one block disables text-balance. */}
          <h1 className="mt-3.5 text-display font-extrabold tracking-tight">
            <span className="block text-balance">{hero.headline}</span>
            <span className="block bg-linear-100 from-brass to-gold bg-clip-text text-balance text-transparent">
              {hero.headlineAccent}
            </span>
          </h1>
          <p className="mt-6 max-w-[56ch] text-[clamp(15px,1.15vw,17px)] leading-relaxed text-muted text-pretty">
            {hero.lead}
          </p>
          {/* Full-width stacked CTAs below sm — ragged left-aligned pair reads messy. */}
          <div className="mt-8.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3.5">
            <Button
              variant="primary"
              icon={ArrowRight}
              className="w-full sm:w-auto"
              onClick={() => scrollToSection("kontakt", reducedMotion)}
            >
              {hero.ctaPrimary}
            </Button>
            <Button
              variant="ghost"
              className="w-full sm:w-auto"
              onClick={() => scrollToSection("realizacje", reducedMotion)}
            >
              {hero.ctaSecondary}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative min-h-[clamp(300px,42vh,480px)] overflow-hidden rounded-[22px] border border-text/12 shadow-media">
            <motion.div style={{ y: parallaxY }} className="absolute inset-x-0 -top-[6%] h-[112%]">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 560px"
                className="scale-108 object-cover object-[center_40%]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-t from-overlay/90 via-overlay/5 via-42% to-overlay/25" />
            <div className="absolute inset-0 bg-linear-to-r from-overlay/55 to-transparent to-34%" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3.5">
              <div>
                <div className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-laser">
                  {hero.imageKicker}
                </div>
                <div className="text-base font-bold text-text">{hero.imageTitle}</div>
              </div>
              <div className="rounded-[9px] border border-text/12 bg-overlay/55 px-2.75 py-1.75 font-mono text-[11px] text-muted backdrop-blur-xs">
                {hero.imageBadge}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
