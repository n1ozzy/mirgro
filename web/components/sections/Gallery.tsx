"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Maximize } from "lucide-react";
import { gallery, gallerySection } from "@/content/site";
import type { GalleryTag } from "@/types/content";
import { useLightbox } from "@/hooks/useLightbox";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryFilters, type GalleryFilter } from "@/components/sections/GalleryFilters";
import { Lightbox } from "@/components/sections/Lightbox";

/** Display order of tag filters; only tags present in the data are shown. */
const FILTER_ORDER: GalleryTag[] = [
  "Schody",
  "Malowanie",
  "Wnętrza",
  "Podłogi",
  "Stolarka",
  "Elewacje",
  "Laser",
];

export function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>(gallerySection.allFilterLabel);

  const filters = useMemo<GalleryFilter[]>(
    () => [
      gallerySection.allFilterLabel,
      ...FILTER_ORDER.filter((tag) => gallery.some((item) => item.tags.includes(tag))),
    ],
    [],
  );

  const visibleItems = useMemo(
    () =>
      filter === gallerySection.allFilterLabel
        ? gallery
        : gallery.filter((item) => item.tags.includes(filter as GalleryTag)),
    [filter],
  );

  const lightbox = useLightbox(visibleItems.length);

  const changeFilter = (next: GalleryFilter) => {
    if (lightbox.isOpen) lightbox.close();
    setFilter(next);
  };

  return (
    <Reveal className="mt-[clamp(44px,5vw,72px)]">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <Kicker className="mb-4">{gallerySection.kicker}</Kicker>
          <h2 className="text-h2 font-extrabold tracking-tight">{gallerySection.title}</h2>
        </div>
        <GalleryFilters filters={filters} active={filter} onChange={changeFilter} />
      </div>

      {/* Two columns below sm — full-width tiles made the gallery a 7000px scroll. */}
      <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] sm:gap-3.5">
        {visibleItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => lightbox.open(index)}
            aria-label={`Powiększ: ${item.caption}`}
            className="group relative aspect-4/5 cursor-pointer overflow-hidden rounded-[14px] bg-surface transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1160px) 50vw, 280px"
              className="object-cover"
            />
            <span className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-overlay/90 from-4% to-transparent to-44% p-4 text-left">
              <span className="mb-auto self-start rounded-[6px] bg-brass px-2.25 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-bg">
                {item.tags[0]}
              </span>
              {/* Captions need room — on small tiles they live in the lightbox. */}
              <span className="hidden text-[13.5px] leading-normal font-semibold text-text text-pretty sm:block">
                {item.caption}
              </span>
            </span>
            <span className="absolute top-3 right-3 hidden size-8 place-items-center rounded-[9px] border border-text/15 bg-overlay/60 text-text backdrop-blur-xs sm:grid">
              <Maximize aria-hidden size={15} strokeWidth={1.8} />
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        items={visibleItems}
        index={lightbox.index}
        open={lightbox.isOpen}
        closeButtonRef={lightbox.closeButtonRef}
        onClose={lightbox.close}
        onPrev={lightbox.prev}
        onNext={lightbox.next}
      />
    </Reveal>
  );
}
