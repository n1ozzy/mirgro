import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AccentTone } from "@/types/content";

type IconTileTone = AccentTone | "neutral";

interface IconTileProps {
  icon: LucideIcon;
  tone?: IconTileTone;
  className?: string;
}

const toneClasses: Record<IconTileTone, string> = {
  brass: "bg-brass/10 border-brass/30 text-brass",
  laser: "bg-laser/10 border-laser/25 text-laser",
  neutral: "bg-text/5 border-text/10 text-muted",
};

/** 42px square icon tile used across cards, rails and contact links. */
export function IconTile({ icon: Icon, tone = "brass", className }: IconTileProps) {
  return (
    <span
      className={cn(
        "grid size-10.5 shrink-0 place-items-center rounded-field border",
        toneClasses[tone],
        className,
      )}
    >
      <Icon aria-hidden size={21} strokeWidth={1.6} />
    </span>
  );
}
