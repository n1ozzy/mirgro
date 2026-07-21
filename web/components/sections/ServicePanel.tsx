"use client";

import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Service } from "@/types/content";
import { useServiceRequest } from "@/components/providers/ServiceRequestProvider";

interface ServicePanelProps {
  service: Service;
}

/** Detail panel for the active service category. */
export function ServicePanel({ service }: ServicePanelProps) {
  const { requestService } = useServiceRequest();
  const isLaser = service.accent === "laser";
  const accentText = isLaser ? "text-laser" : "text-brass";

  return (
    <div className="relative min-h-85 overflow-hidden rounded-panel border border-text/12 bg-surface p-[clamp(20px,2.4vw,30px)]">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-0 right-0 size-50 bg-radial-[circle_at_70%_30%] to-transparent to-70%",
          isLaser ? "from-laser/10" : "from-brass/10",
        )}
      />
      <p
        className={cn(
          "relative mb-3.5 font-mono text-[11.5px] uppercase tracking-[0.24em]",
          accentText,
        )}
      >
        Usługa
      </p>
      <h3 className="relative text-[clamp(19px,2.1vw,25px)] leading-tight font-extrabold tracking-tight">
        {service.name}
      </h3>
      <p className="relative mt-4 max-w-[52ch] text-btn leading-relaxed text-muted">
        {service.description}
      </p>
      <ul className="relative mt-6.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-5 gap-y-2.5">
        {service.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.75 border-b border-text/5 py-1.5"
          >
            <Check aria-hidden size={16} strokeWidth={2} className={cn("shrink-0", accentText)} />
            <span className="text-ui text-text-2">{item}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => requestService(service.id)}
        className={cn(
          "relative mt-7 inline-flex cursor-pointer items-center gap-2.25 rounded-pill border bg-transparent px-6 py-3.25 text-ui font-bold transition-colors duration-200 hover:bg-white/5",
          accentText,
          isLaser ? "border-laser" : "border-brass",
        )}
      >
        Zapytaj o tę usługę
        <ArrowRight aria-hidden size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
