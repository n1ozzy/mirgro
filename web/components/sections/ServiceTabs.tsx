"use client";

import { cn } from "@/lib/cn";
import type { Service } from "@/types/content";

interface ServiceTabsProps {
  services: Service[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

/** Vertical rail of service category tabs. */
export function ServiceTabs({ services, activeIndex, onSelect }: ServiceTabsProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {services.map((service, index) => {
        const isActive = index === activeIndex;
        const accentText = service.accent === "laser" ? "text-laser" : "text-brass";
        const accentBorder =
          service.accent === "laser" ? "border-l-laser" : "border-l-brass";
        const Icon = service.icon;
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-pressed={isActive}
            className={cn(
              "flex cursor-pointer items-center gap-3.75 rounded-[14px] border border-text/11 border-l-3 px-4.5 py-4 text-left transition-colors duration-200 hover:bg-white/5",
              isActive ? cn("bg-white/5", accentBorder) : "border-l-transparent",
            )}
          >
            <span
              className={cn(
                "grid size-10.5 shrink-0 place-items-center rounded-field border border-text/11 bg-white/4",
                isActive ? accentText : "text-muted",
              )}
            >
              <Icon aria-hidden size={21} strokeWidth={1.6} />
            </span>
            <span className="min-w-0">
              <span className="block text-body leading-tight font-bold text-text">
                {service.name}
              </span>
              <span
                className={cn(
                  "mt-0.75 block font-mono text-caption tracking-wide",
                  isActive ? accentText : "text-muted",
                )}
              >
                {service.tagline}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
