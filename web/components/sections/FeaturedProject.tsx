import Image from "next/image";
import { featuredProject } from "@/content/site";
import { Chip } from "@/components/ui/Chip";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedProject() {
  return (
    <Reveal>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-center gap-[clamp(24px,3vw,44px)]">
        <div className="relative aspect-4/5 max-h-[70vh] overflow-hidden rounded-media border border-text/12 shadow-soft">
          <Image
            src={featuredProject.image.src}
            alt={featuredProject.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-overlay/60 to-transparent to-45%" />
        </div>
        <div>
          <Kicker className="mb-4">{featuredProject.kicker}</Kicker>
          <div className="mb-4 inline-block rounded-pill border border-laser/22 bg-laser/8 px-3.25 py-1.5 text-caption font-semibold text-laser">
            {featuredProject.badge}
          </div>
          <h2 className="text-h2 font-extrabold tracking-tight">{featuredProject.title}</h2>
          <p className="mt-4.5 max-w-[52ch] text-base leading-relaxed text-muted">
            {featuredProject.description}
          </p>
          <div className="mt-5.5 font-mono text-caption text-muted">
            {featuredProject.techniques}
          </div>
          <div className="mt-5.5 flex flex-wrap gap-2.5">
            {featuredProject.chips.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
