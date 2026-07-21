"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { processStrip } from "@/content/site";
import type { StripFrame } from "@/types/content";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Total scroll distance of the pinned filmstrip (in viewport heights). */
const STRIP_HEIGHT_VH = 300;

/*
 * Job-site filmstrip: a pinned section where vertical scroll drives a
 * horizontal track of real in-progress photos, one stage of the work per
 * frame. The transform is written imperatively on the track ref, so the
 * component never re-renders while scrubbing.
 *
 * Reduced motion falls back to a plain horizontal scroller with snap.
 */

// `wide` is width-capped below sm: at track height a 4/3 card grows wider
// than the phone screen and its caption could never be seen in full.
const RATIO_CLASSES: Record<StripFrame["ratio"], string> = {
  portrait: "aspect-[3/4]",
  tall: "aspect-[9/16]",
  wide: "aspect-[4/3] max-w-[88vw] sm:max-w-none",
};

function FrameCard({ frame, index }: { frame: StripFrame; index: number }) {
  return (
    <figure
      className={cn(
        "relative h-full shrink-0 snap-start overflow-hidden rounded-media border border-text/12 bg-surface shadow-media",
        RATIO_CLASSES[frame.ratio],
      )}
    >
      <Image
        src={frame.src}
        alt={frame.alt}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 78vw, 520px"
        className="object-cover"
      />
      <span className="absolute top-3.5 left-3.5 rounded-[7px] border border-text/15 bg-overlay/85 px-2.5 py-1 font-mono text-[11px] tracking-label text-brass backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")}
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-overlay/95 from-45% to-transparent px-4.5 pt-14 pb-4.5">
        <span className="block text-ui font-bold text-text">{frame.stage}</span>
        <span className="mt-1 block max-w-[38ch] text-caption leading-relaxed text-text-2">
          {frame.detail}
        </span>
      </figcaption>
    </figure>
  );
}

export function Filmstrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const applyProgress = (progress: number) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const p = Math.max(0, Math.min(1, progress));
    const maxShift = Math.max(0, track.scrollWidth - viewport.clientWidth);
    track.style.transform = `translate3d(${(-p * maxShift).toFixed(1)}px, 0, 0)`;
    if (barRef.current) barRef.current.style.width = `${(p * 100).toFixed(2)}%`;
  };

  useMotionValueEvent(scrollYProgress, "change", applyProgress);

  // Restore mid-strip state when a reload lands inside the pinned range.
  useEffect(() => {
    if (!reducedMotion) applyProgress(scrollYProgress.get());
  });

  if (reducedMotion) {
    return (
      <section aria-label="Kulisy prac na budowie" className="border-t border-text/5 bg-bg py-section-y">
        <div className="mx-auto max-w-content px-section-x">
          <SectionHeading
            kicker={processStrip.kicker}
            title={processStrip.title}
            description={processStrip.description}
            className="max-w-160"
          />
        </div>
        <div className="mt-10 flex h-[min(58vh,540px)] snap-x snap-mandatory gap-4 overflow-x-auto px-section-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {processStrip.frames.map((frame, index) => (
            <FrameCard key={frame.stage} frame={frame} index={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Kulisy prac na budowie" className="relative border-t border-text/5 bg-bg">
      <div ref={containerRef} className="relative" style={{ height: `${STRIP_HEIGHT_VH}vh` }}>
        <div
          ref={viewportRef}
          className="sticky top-0 flex h-screen flex-col justify-center gap-y-[clamp(20px,3.5vh,40px)] overflow-hidden pt-[76px] pb-6"
        >
          <div className="mx-auto w-full max-w-content px-section-x">
            <SectionHeading
              kicker={processStrip.kicker}
              title={processStrip.title}
              description={processStrip.description}
              className="max-w-160"
            />
          </div>

          <div
            ref={trackRef}
            className="flex h-[min(44vh,360px)] w-max gap-[clamp(14px,2vw,24px)] px-section-x will-change-transform sm:h-[min(52vh,520px)]"
          >
            {processStrip.frames.map((frame, index) => (
              <FrameCard key={frame.stage} frame={frame} index={index} />
            ))}
          </div>

          <div className="mx-auto w-full max-w-content px-section-x">
            <div className="h-0.5 bg-text/10">
              <div
                ref={barRef}
                className="h-full w-0 bg-linear-to-r from-brass to-laser shadow-[0_0_10px] shadow-laser/50"
              />
            </div>
            <p className="mt-2.5 font-mono text-[10.5px] tracking-label text-dim">
              PRZEWIŃ, ABY PRZEJŚĆ PRZEZ BUDOWĘ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
