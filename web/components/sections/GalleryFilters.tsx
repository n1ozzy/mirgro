"use client";

import { cn } from "@/lib/cn";
import type { GalleryTag } from "@/types/content";

export type GalleryFilter = GalleryTag | "Wszystkie";

interface GalleryFiltersProps {
  filters: GalleryFilter[];
  active: GalleryFilter;
  onChange: (filter: GalleryFilter) => void;
}

export function GalleryFilters({ filters, active, onChange }: GalleryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2.25">
      {filters.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            aria-pressed={isActive}
            className={cn(
              "cursor-pointer rounded-pill border px-4 py-3 text-[13.5px] font-semibold transition-colors duration-200",
              isActive
                ? "border-brass bg-brass text-bg"
                : "border-text/16 bg-transparent text-muted hover:text-text",
            )}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
