import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AccentTone } from "@/types/content";
import { IconTile } from "@/components/ui/IconTile";

interface ContactCardProps {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: AccentTone;
  external?: boolean;
}

export function ContactCard({
  href,
  icon,
  label,
  value,
  tone = "brass",
  external = false,
}: ContactCardProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className={cn(
        "flex items-center gap-3.75 rounded-[14px] border border-text/12 bg-surface p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5",
        tone === "laser" ? "hover:border-laser/40" : "hover:border-brass/45",
      )}
    >
      <IconTile icon={icon} tone={tone} />
      <span>
        <span className="block font-mono text-xs tracking-tag text-muted">{label}</span>
        <span className="mt-0.75 block text-base font-bold text-text">{value}</span>
      </span>
    </a>
  );
}
