"use client";

import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { beforeAfter } from "@/content/site";
import { useBeforeAfter } from "@/hooks/useBeforeAfter";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";

const LEGEND = [
  { label: "PRZED", swatchClass: "bg-muted", textClass: "text-muted" },
  { label: "PO", swatchClass: "bg-brass", textClass: "text-brass" },
] as const;

export function BeforeAfter() {
  const { wrapRef, beforeRef, handleRef, onPointerDown, onKeyDown } = useBeforeAfter();

  return (
    <Reveal className="mt-[clamp(44px,5vw,72px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-[clamp(24px,3vw,44px)]">
        <div>
          <Kicker className="mb-4">{beforeAfter.kicker}</Kicker>
          <h2 className="text-h2 font-extrabold tracking-tight">{beforeAfter.title}</h2>
          <p className="mt-4.5 max-w-[46ch] text-base leading-relaxed text-muted">
            {beforeAfter.description}
          </p>
          <div className="mt-6.5 flex gap-5.5">
            {LEGEND.map((entry) => (
              <div key={entry.label} className="flex items-center gap-2.25">
                <span className={`size-2.75 rounded-[3px] ${entry.swatchClass}`} />
                <span className={`font-mono text-[13px] ${entry.textClass}`}>
                  {entry.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="justify-self-center">
          <div
            ref={wrapRef}
            onPointerDown={onPointerDown}
            className="relative aspect-[576/1024] w-[min(420px,88vw)] cursor-ew-resize touch-none overflow-hidden rounded-panel border border-text/10 shadow-soft select-none"
          >
            <Image
              src={beforeAfter.after.src}
              alt={beforeAfter.after.alt}
              fill
              draggable={false}
              sizes="(max-width: 1024px) 88vw, 420px"
              className="pointer-events-none object-cover"
            />
            <span className="pointer-events-none absolute top-3.5 right-3.5 z-4 rounded-[7px] bg-brass px-2.75 py-1.25 font-mono text-[11px] tracking-label text-bg">
              PO
            </span>
            <div ref={beforeRef} className="pointer-events-none absolute inset-0">
              <Image
                src={beforeAfter.before.src}
                alt={beforeAfter.before.alt}
                fill
                draggable={false}
                sizes="(max-width: 1024px) 88vw, 420px"
                className="object-cover"
              />
              <span className="absolute top-3.5 left-3.5 rounded-[7px] border border-text/18 bg-nav/82 px-2.75 py-1.25 font-mono text-[11px] tracking-label text-text">
                PRZED
              </span>
            </div>
            <div
              ref={handleRef}
              role="slider"
              tabIndex={0}
              aria-label="Suwak porównania przed i po"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={50}
              onKeyDown={onKeyDown}
              className="absolute inset-y-0 left-1/2 z-5 w-0.5 -translate-x-px cursor-ew-resize bg-text/90 outline-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              <span className="absolute top-1/2 left-1/2 grid size-11.5 -translate-1/2 place-items-center rounded-full border-2 border-text bg-overlay/85 shadow-handle">
                <ChevronsLeftRight aria-hidden size={22} strokeWidth={1.8} className="text-text" />
              </span>
            </div>
          </div>
          <p className="mt-3.5 text-center text-caption text-dim">{beforeAfter.hint}</p>
        </div>
      </div>
    </Reveal>
  );
}
