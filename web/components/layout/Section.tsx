import { cn } from "@/lib/cn";

type SectionTone = "base" | "alt" | "ink" | "laser";

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  /** Overrides the default section paddings when a section needs its own rhythm. */
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
}

const toneClasses: Record<SectionTone, string> = {
  base: "bg-bg",
  alt: "bg-surface-alt border-t border-text/5",
  ink: "bg-ink",
  laser: "bg-linear-to-b from-ink to-laser-end border-t border-laser/12",
};

export function Section({
  id,
  tone = "base",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-section-x py-section-y",
        toneClasses[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
