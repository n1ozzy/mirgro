"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { renovationStory } from "@/content/site";
import { scrollToPosition } from "@/lib/scroll";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** Total scroll distance of the pinned story (in viewport heights). */
const STORY_HEIGHT_VH = 280;

/*
 * Documentary timeline of one real renovation: three photographs of the SAME
 * staircase (skim-coated → finishing → snow-white) shown in a scanner-style
 * panel at near-native resolution. Scroll drives a laser line down the panel
 * and the next stage's photo is revealed behind it, so the frame advances like
 * a scan. Every state is a genuine job-site photo — no synthetic color grading.
 *
 * All per-frame updates (clips, line, counter, segments, active markers) are
 * imperative ref writes — the component never re-renders after mount.
 */

/** Scroll-progress windows in which the laser sweeps to the next stage. */
const TRANSITIONS = [
  { start: 0.28, end: 0.39 },
  { start: 0.61, end: 0.72 },
] as const;

/** Scroll targets of the three stage holds (for the stage-list buttons). */
const STAGE_TARGETS = [0.14, 0.5, 0.86] as const;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export function RenovationScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const backdropRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const segRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const applyProgress = (progress: number) => {
    const p = clamp01(progress);
    const reveals = TRANSITIONS.map(({ start, end }) =>
      clamp01((p - start) / (end - start)),
    );

    reveals.forEach((t, index) => {
      const layer = layerRefs.current[index + 1];
      if (layer) {
        layer.style.clipPath = `inset(0 0 ${((1 - t) * 100).toFixed(2)}% 0)`;
      }
    });

    const sweeping = reveals.find((t) => t > 0.002 && t < 0.998);
    if (scanRef.current) {
      scanRef.current.style.top = `${((sweeping ?? 0) * 100).toFixed(2)}%`;
      scanRef.current.style.opacity = sweeping === undefined ? "0" : "1";
    }

    const active = p < 1 / 3 ? 0 : p < 2 / 3 ? 1 : 2;
    if (counterRef.current) {
      counterRef.current.textContent = `0${active + 1}`;
    }

    segRefs.current.forEach((seg, index) => {
      if (seg) {
        seg.style.width = `${(clamp01(p * 3 - index) * 100).toFixed(1)}%`;
      }
    });

    listRefs.current.forEach((el, index) => {
      if (el) {
        el.dataset.active = String(index === active);
        el.setAttribute("aria-pressed", String(index === active));
      }
    });
    backdropRefs.current.forEach((el, index) => {
      if (el) el.dataset.active = String(index === active);
    });
    overlayRefs.current.forEach((el, index) => {
      if (el) el.dataset.active = String(index === active);
    });
  };

  useMotionValueEvent(scrollYProgress, "change", applyProgress);

  // Restore mid-pass state when a reload lands inside the pinned range.
  useEffect(() => {
    applyProgress(scrollYProgress.get());
  });

  const scrollToStage = (index: number) => {
    const node = containerRef.current;
    if (!node) return;
    const top = node.getBoundingClientRect().top + window.scrollY;
    const range = node.offsetHeight - window.innerHeight;
    scrollToPosition(top + STAGE_TARGETS[index] * range, reducedMotion);
  };

  return (
    <section aria-label="Etapy renowacji schodów" className="relative bg-ink">
      <div ref={containerRef} className="relative" style={{ height: `${STORY_HEIGHT_VH}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Ambient backdrop — blurred photo of the active stage */}
          {renovationStory.stages.map((stage, index) => (
            <div
              key={stage.name}
              ref={(el) => {
                backdropRefs.current[index] = el;
              }}
              data-active={index === 0 ? "true" : "false"}
              className="absolute inset-0 opacity-0 transition-opacity duration-700 data-[active=true]:opacity-100"
            >
              <Image
                src={stage.src}
                alt=""
                fill
                sizes="100vw"
                className="scale-110 object-cover blur-2xl brightness-[0.3] saturate-[0.85]"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-linear-to-b from-ink/75 via-transparent to-ink/85" />

          <div className="relative mx-auto grid h-full max-w-content grid-rows-[auto_minmax(0,1fr)] gap-y-5 px-section-x pt-[92px] pb-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-1 lg:items-center lg:gap-x-20 lg:py-20">
            {/* Copy + stage list */}
            <div>
              <span className="font-mono text-[11px] uppercase tracking-kicker text-laser">
                {renovationStory.kicker}
              </span>
              <h2 className="mt-3.5 max-w-[24ch] text-h2 font-extrabold tracking-tight text-text">
                {renovationStory.title}
              </h2>
              <p className="mt-3 hidden max-w-[52ch] text-lead text-text-2 sm:block">
                {renovationStory.description}
              </p>

              <div className="mt-9 hidden lg:block">
                {renovationStory.stages.map((stage, index) => (
                  <button
                    key={stage.name}
                    type="button"
                    onClick={() => scrollToStage(index)}
                    ref={(el) => {
                      listRefs.current[index] = el;
                    }}
                    data-active={index === 0 ? "true" : "false"}
                    aria-pressed={index === 0}
                    className="group block w-full cursor-pointer border-l-2 border-text/12 py-3.5 pl-5 text-left transition-colors duration-300 data-[active=true]:border-laser"
                  >
                    <span className="flex items-baseline gap-3.5">
                      <span className="font-mono text-[11px] text-dim transition-colors duration-300 group-data-[active=true]:text-laser">
                        0{index + 1}
                      </span>
                      <span className="text-ui font-bold text-muted transition-colors duration-300 group-data-[active=true]:text-text">
                        {stage.name}
                      </span>
                    </span>
                    <span className="mt-1 block max-w-[46ch] text-caption text-dim">
                      {stage.detail}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scanner panel — photos at near-native resolution (768×1024) */}
            <div className="relative mx-auto h-full min-h-0 lg:h-[min(74vh,840px)]">
              <div className="relative mx-auto aspect-[3/4] h-full max-w-[88vw]">
                <span className="absolute -top-1.5 -left-1.5 size-3.5 border-t border-l border-laser/40" />
                <span className="absolute -top-1.5 -right-1.5 size-3.5 border-t border-r border-laser/40" />
                <span className="absolute -bottom-1.5 -left-1.5 size-3.5 border-b border-l border-laser/40" />
                <span className="absolute -right-1.5 -bottom-1.5 size-3.5 border-r border-b border-laser/40" />

                <div className="relative size-full overflow-hidden rounded-media border border-text/12 shadow-media">
                  {renovationStory.stages.map((stage, index) => (
                    <div
                      key={stage.name}
                      ref={(el) => {
                        layerRefs.current[index] = el;
                      }}
                      className="absolute inset-0"
                      style={index > 0 ? { clipPath: "inset(0 0 100% 0)" } : undefined}
                    >
                      <Image
                        src={stage.src}
                        alt={stage.alt}
                        fill
                        sizes="(max-width: 1024px) 88vw, 640px"
                        className="object-cover"
                      />
                    </div>
                  ))}

                  {/* Laser line sweeping the panel between stages */}
                  <div
                    ref={scanRef}
                    className="pointer-events-none absolute inset-x-0 top-0 z-3 h-0 opacity-0 transition-opacity duration-300"
                  >
                    <div className="absolute inset-x-0 -top-10 h-10 bg-linear-to-b from-transparent to-[rgba(226,207,149,0.14)]" />
                    <div className="absolute inset-x-0 top-0 h-12 bg-linear-to-b from-laser/18 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-[2.5px] -translate-y-[1.25px] animate-beam-flicker bg-[linear-gradient(90deg,transparent,var(--color-laser)_8%,#d8f6ff_50%,var(--color-laser)_92%,transparent)] shadow-[0_0_18px_4px_rgba(85,217,255,0.6),0_0_50px_12px_rgba(85,217,255,0.28)]" />
                    <span className="absolute -top-0.5 left-[26%] size-[3px] animate-spark-l rounded-full bg-[#d8f6ff] opacity-0 shadow-[0_0_5px] shadow-laser" />
                    <span
                      className="absolute -top-0.5 left-[58%] size-0.5 animate-spark-r rounded-full bg-white opacity-0 shadow-[0_0_5px] shadow-laser"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <span
                      className="absolute -top-0.5 left-[80%] size-0.5 animate-spark-l rounded-full bg-[#8be7ff] opacity-0 shadow-[0_0_5px] shadow-laser"
                      style={{ animationDelay: "0.9s", animationDuration: "1.1s" }}
                    />
                  </div>

                  <span className="absolute top-3.5 right-3.5 z-4 rounded-[7px] border border-laser/25 bg-overlay/70 px-2.75 py-1.25 font-mono text-[11px] tracking-label text-laser backdrop-blur-sm">
                    ETAP <span ref={counterRef}>01</span>/03
                  </span>

                  {/* Mobile: active stage label inside the panel */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-4 h-24 bg-linear-to-t from-overlay/85 to-transparent lg:hidden">
                    {renovationStory.stages.map((stage, index) => (
                      <span
                        key={stage.name}
                        ref={(el) => {
                          overlayRefs.current[index] = el;
                        }}
                        data-active={index === 0 ? "true" : "false"}
                        className="absolute bottom-4 left-4 font-mono text-[11px] tracking-label text-text opacity-0 transition-opacity duration-500 data-[active=true]:opacity-100"
                      >
                        0{index + 1} · {stage.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Segmented progress — one cell per stage */}
          <div className="absolute inset-x-0 bottom-0 z-5 flex h-1 gap-px bg-text/10">
            {renovationStory.stages.map((stage, index) => (
              <div key={stage.name} className="h-full flex-1 overflow-hidden">
                <div
                  ref={(el) => {
                    segRefs.current[index] = el;
                  }}
                  className="h-full w-0 bg-linear-to-r from-brass to-laser shadow-[0_0_12px] shadow-laser/60"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
